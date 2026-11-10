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
test('Sinnoh excludes Lugia/Ho-Oh while HGSS requires them; event species cannot fill a gap',()=>{
 const mythical=new Set([151,251,385,386,489,490,491,492,493]);
 const all=Array.from({length:493},(_,i)=>i+1).filter(id=>!mythical.has(id));
 const sinnoh=all.filter(id=>id!==249&&id!==250);
 for(const game of ['DIAMOND','PEARL','PLATINUM']){
  const complete=dexStatus({game,caught:sinnoh});assert.equal(complete.national.required,482);assert.equal(complete.national.complete,true);
  const gap=dexStatus({game,caught:sinnoh.filter(id=>id!==16).concat(151,249,250)});
  assert.deepEqual(gap.national.missing,[16]);assert.equal(gap.national.complete,false);
 }
 for(const game of ['HEARTGOLD','SOULSILVER']){
  assert.equal(dexStatus({game,caught:all}).national.complete,true);
  const old=dexStatus({game,caught:sinnoh});assert.equal(old.national.required,484);assert.deepEqual(old.national.missing,[249,250]);
  const gap=dexStatus({game,caught:all.filter(id=>id!==16).concat(151)});assert.equal(gap.national.complete,false);assert.deepEqual(gap.national.missing,[16]);
  assert.equal(dexStatus({game,caught:null}),null);
 }
});
test('a Gen4 exact registration proves no awarded star, original encounter or reward',()=>{
 const excluded=new Set([151,251,385,386,489,490,491,492,493]);
 const caught=Array.from({length:493},(_,i)=>i+1).filter(id=>!excluded.has(id));
 for(const game of ['DIAMOND','PEARL','PLATINUM','HEARTGOLD','SOULSILVER']){
  const d={game,caught,seen:caught,integrity:{checksumsValid:true}},facts=engine.fromDiagnosis(d);
  const nodes=[{id:'national',gameId:game,verification:{fact:'pokedex.completion.national'}}];
  assert.equal(engine.evaluate(nodes,facts,game)[0].status,'COMPLETED_VERIFIED');
  assert.equal(engine.evaluate(nodes,engine.fromDiagnosis({...d,integrity:{}}),game)[0].status,'PARTIAL_EVIDENCE');
  assert.ok(!facts.some(f=>/encounter|reward|original|star/i.test(f.id)));
 }
});

test('Unova National registration requires all 636 ordinary species, including Lugia/Ho-Oh',()=>{
 const exclusions=new Set([151,251,385,386,489,490,491,492,493,494,647,648,649]);
 const required=Array.from({length:649},(_,i)=>i+1).filter(id=>!exclusions.has(id));
 for(const game of ['BLACK','WHITE','BLACK2','WHITE2']){
  const d={game,caught:required,seen:required,integrity:{verifiedFields:['caught']}};
  const full=dexStatus(d).national;assert.equal(full.required,636);assert.equal(full.complete,true);
  const swapped=dexStatus({...d,caught:required.filter(id=>![249,250,646].includes(id)).concat(151,494,647,required[0])}).national;
  assert.equal(swapped.complete,false);assert.deepEqual(swapped.missing,[249,250,646]);
  const nodes=[{id:'national',gameId:game,verification:{fact:'pokedex.completion.national'}}];
  assert.equal(engine.evaluate(nodes,engine.fromDiagnosis(d),game)[0].status,'COMPLETED_VERIFIED');
  assert.equal(engine.evaluate(nodes,engine.fromDiagnosis({...d,integrity:{}}),game)[0].status,'PARTIAL_EVIDENCE');
  assert.equal(dexStatus({...d,caught:null}),null);
  assert.ok(!engine.fromDiagnosis(d).some(f=>/encounter|reward|original|star|permit|charm/i.test(f.id)));
 }
});
test('XY recognition uses 450 exact seen entries and validates seen independently of caught',()=>{
 const {required}=require('../src/engine/kalos-dex.js');
 assert.equal(required.length,450);assert.equal(new Set(required).size,450);
 for(const id of [144,145,146,150,719,720,721])assert.ok(!required.includes(id));
 for(const id of [650,653,656,716,717,718])assert.ok(required.includes(id));
 for(const game of ['X','Y']){
  const d={game,caught:[],seen:required,integrity:{verifiedFields:['seen']}};
  assert.equal(dexStatus(d).kalos.complete,true);assert.equal(dexStatus(d).kalos.field,'seen');
  const gap=dexStatus({...d,seen:required.filter(id=>id!==650).concat(719),caught:required}).kalos;
  assert.equal(gap.complete,false);assert.equal(gap.registered,449);assert.deepEqual(gap.missing,[650]);
  assert.equal(dexStatus({...d,seen:[],caught:required}).kalos.complete,false);
  assert.equal(dexStatus({...d,seen:null}),null);
  const nodes=[{id:'kalos',gameId:game,verification:{fact:'pokedex.completion.kalos'}}];
  assert.equal(engine.evaluate(nodes,engine.fromDiagnosis(d),game)[0].status,'COMPLETED_VERIFIED');
  assert.equal(engine.evaluate(nodes,engine.fromDiagnosis({...d,integrity:{verifiedFields:['caught']}}),game)[0].status,'PARTIAL_EVIDENCE');
  assert.ok(!engine.fromDiagnosis(d).some(f=>/encounter|reward|star|diploma/i.test(f.id)));
 }
});
test('ORAS card recognition uses its 208 seen species, excluding Rayquaza without excluding ordinary Hoenn species',()=>{
 const {required}=require('../src/engine/hoenn-dex.js');assert.equal(required.length,208);
 for(const id of [384,385,386])assert.ok(!required.includes(id));
 for(const id of [252,255,258,382,383,475,478])assert.ok(required.includes(id));
 for(const game of ['OMEGARUBY','ALPHASAPPHIRE']){
  const d={game,caught:[],seen:required,integrity:{verifiedFields:['seen']}};
  assert.equal(dexStatus(d).hoenn.complete,true);assert.equal(dexStatus(d).hoenn.field,'seen');
  const replaced=dexStatus({...d,seen:required.filter(id=>id!==252).concat(384),caught:required}).hoenn;
  assert.deepEqual(replaced.missing,[252]);assert.equal(replaced.complete,false);
  assert.equal(dexStatus({...d,seen:[],caught:required}).hoenn.complete,false);
  assert.equal(dexStatus({...d,seen:null}),null);
  const nodes=[{id:'hoenn',gameId:game,verification:{fact:'pokedex.completion.hoenn'}}];
  assert.equal(engine.evaluate(nodes,engine.fromDiagnosis(d),game)[0].status,'COMPLETED_VERIFIED');
  assert.equal(engine.evaluate(nodes,engine.fromDiagnosis({...d,integrity:{verifiedFields:['caught']}}),game)[0].status,'PARTIAL_EVIDENCE');
  assert.ok(!engine.fromDiagnosis(d).some(f=>/encounter|reward|star|diploma/i.test(f.id)));
 }
});
