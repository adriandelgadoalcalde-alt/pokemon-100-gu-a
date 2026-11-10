const test=require('node:test'),assert=require('node:assert/strict');
const {dexStatus}=require('../src/engine/completion.js');
const engine=require('../src/engine/objectives.js');
const excluded=new Set([151,249,250,251,385,386]);
const full=Array.from({length:386},(_,i)=>i+1).filter(id=>!excluded.has(id));
test('FRLG completion requires its exact species sets, not equal totals or event species',()=>{
 for(const game of ['FIRERED','LEAFGREEN']){
  const good=dexStatus({game,caught:full});assert.equal(good.kanto.required,150);assert.equal(good.national.required,380);
  assert.equal(good.kanto.complete,true);assert.equal(good.national.complete,true);
  const sameCount=dexStatus({game,caught:full.filter(id=>id!==16).concat(151)});
  assert.equal(sameCount.national.complete,false);assert.deepEqual(sameCount.national.missing,[16]);
  assert.equal(sameCount.kanto.complete,false);
  assert.equal(dexStatus({game,caught:full.concat([...excluded],full)}).national.registered,380);
 }
 assert.equal(dexStatus({game:'RED',caught:full}),null);
 assert.equal(dexStatus({game:'FIRERED',caught:null}),null);
});
test('a complete FRLG registration needs validated read fields and never creates encounter or prize facts',()=>{
 const d={game:'FIRERED',caught:full,seen:full,integrity:{checksumsValid:true}};
 const nodes=[{id:'national',gameId:d.game,verification:{fact:'pokedex.completion.national'}}];
 const facts=engine.fromDiagnosis(d);
 assert.equal(engine.evaluate(nodes,facts,d.game)[0].status,'COMPLETED_VERIFIED');
 assert.equal(engine.evaluate(nodes,engine.fromDiagnosis({...d,integrity:{}}),d.game)[0].status,'PARTIAL_EVIDENCE');
 assert.ok(!facts.some(f=>/encounter|reward|original|star/i.test(f.id)));
 assert.ok(!engine.fromDiagnosis({...d,caught:null}).some(f=>f.id==='pokedex.completion.national'));
});
