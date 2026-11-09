const test=require('node:test'),assert=require('node:assert/strict');
const engine=require('../src/engine/objectives.js');
const gameId='SOULSILVER';
const direct=(id,value)=>({id,value,gameId,type:'direct',validation:'verified'});
const node=(id,verification,prerequisites)=>({id,gameId,verification,prerequisites});
test('Pokédex acquisition and original encounter are independent objectives',()=>{
 const nodes=[node('obtain-zapdos',{fact:'pokedex.caught.145'}),node('original-zapdos',{fact:'encounter.zapdos.original'})];
 const results=engine.evaluate(nodes,[direct('pokedex.caught.145',true)],gameId);
 assert.equal(results[0].status,'COMPLETED_VERIFIED');assert.equal(results[1].status,'UNKNOWN');
 assert.equal(engine.next(results).action,'inspect-evidence');
});
test('missing Oak gift blocks the orb despite sixteen badges and a Red victory',()=>{
 const nodes=[node('oak',{fact:'oak.gift'}),node('orb',{fact:'orb.received'},
  {all:[{fact:'badges',atLeast:16},{fact:'red.won'},{objective:'oak'}]})];
 const result=engine.evaluate(nodes,[direct('badges',16),direct('red.won',true),direct('oak.gift',false),direct('orb.received',false)],gameId);
 assert.equal(result[1].status,'BLOCKED_BY_PREREQUISITE');
});
test('unknown or documented-only flags cannot certify a mission',()=>{
 const nodes=[node('red',{fact:'red.won'})];
 assert.equal(engine.evaluate(nodes,[],gameId)[0].status,'UNKNOWN');
 assert.equal(engine.evaluate(nodes,[{...direct('red.won',true),validation:'script-documented'}],gameId)[0].status,'PARTIAL_EVIDENCE');
});
test('manual completions stay manual through prerequisite chains',()=>{
 const facts=[{...direct('oak.gift',true),type:'manual'},direct('orb.received',false)];
 const results=engine.evaluate([node('oak',{fact:'oak.gift'}),node('orb',{fact:'orb.received'},{objective:'oak'})],facts,gameId);
 assert.equal(results[0].status,'COMPLETED_MANUAL');assert.equal(results[1].prerequisites.proof,'manual');
});
test('conflicting facts remain unknown; another edition cannot provide a fact',()=>{
 const nodes=[node('test',{fact:'f'})];
 assert.equal(engine.evaluate(nodes,[direct('f',true),direct('f',false)],gameId)[0].status,'UNKNOWN');
 assert.equal(engine.evaluate(nodes,[{...direct('f',true),gameId:'HEARTGOLD'}],gameId)[0].status,'UNKNOWN');
});
test('DAG rejects duplicates, absent prerequisites, cycles and implicit cross-edition dependencies',()=>{
 assert.throws(()=>engine.order([node('a'),node('a')]),/duplicado/);
 assert.throws(()=>engine.order([node('a',null,{objective:'missing'})]),/inexistente/);
 assert.throws(()=>engine.order([node('a',null,{objective:'b'}),node('b',null,{objective:'a'})]),/Ciclo/);
 assert.throws(()=>engine.order([node('a',null,{objective:'b'}),{...node('b'),gameId:'Y'}]),/ediciones/);
});
test('editorial reorder cannot mutate facts or change evidence results',()=>{
 const facts=[direct('a',true),direct('b',false)],original=structuredClone(facts);
 const nodes=[node('a',{fact:'a'}),node('b',{fact:'b'},{objective:'a'})];
 const first=engine.evaluate(nodes,facts,gameId),second=engine.evaluate([...nodes].reverse(),facts,gameId);
 assert.deepEqual(first,second);assert.deepEqual(facts,original);assert.equal(engine.next(first).objective,'b');
});
test('a direct alternative is sufficient; unknowns do not silently become false',()=>{
 const nodes=[node('a',{any:[{fact:'unknown'},{fact:'known'}]})];
 assert.equal(engine.evaluate(nodes,[direct('known',true)],gameId)[0].status,'COMPLETED_VERIFIED');
 assert.equal(engine.evaluate(nodes,[direct('known',false)],gameId)[0].status,'UNKNOWN');
});
test('expired events, edition exclusions and unpurchased DLC remain distinct',()=>{
 const nodes=[{...node('a'),available:false},{...node('b'),historicalUnavailable:true},{...node('c'),dlcPurchased:false}];
 assert.deepEqual(engine.evaluate(nodes,[],gameId).map(x=>x.status),['UNAVAILABLE_THIS_VERSION','UNAVAILABLE_HISTORICAL_EVENT','OPTIONAL_NOT_PURCHASED_DLC']);
});
test('reading a diagnosis never manufactures original-capture facts',()=>{
 const facts=engine.fromDiagnosis({game:gameId,caught:[145],seen:[381],integrity:{generalChecksumValid:true}});
 assert.ok(facts.some(f=>f.id==='pokedex.caught.145'));assert.ok(!facts.some(f=>f.id.includes('original')));
});
test('a manual confirmation is distinguishable from a weaker inferred signal',()=>{
 const result=engine.evaluate([node('a',{any:[{fact:'signal'},{fact:'manual'}]})],
  [{...direct('signal',true),validation:'unverified'},{...direct('manual',true),type:'manual'}],gameId);
 assert.equal(result[0].status,'COMPLETED_MANUAL');
});
test('a key item alone is partial evidence for a composite delivery-and-possession goal',()=>{
 const result=engine.evaluate([node('orb',{all:[{fact:'orb.present'},{fact:'orb.originalDelivery'}]})],[direct('orb.present',true)],gameId);
 assert.equal(result[0].status,'PARTIAL_EVIDENCE');
});
