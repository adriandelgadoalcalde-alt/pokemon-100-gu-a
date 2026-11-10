const test=require('node:test'),assert=require('node:assert/strict');
const passport=require('../src/saves/passport.js'),completion=require('../src/engine/completion.js'),dex=require('../src/engine/alola-dex.js'),objectives=require('../src/engine/objectives.js'),diagnosis=require('../src/saves/diagnosis.js');
test('Alola compares exact regional and island registration sets by family',()=>{
 for(const [game,family,total,islandTotals]of [['SUN','original',300,[120,130,130,100]],['ULTRAMOON','ultra',400,[150,160,160,130]]]){
  const required=dex[family].alola;assert.equal(required.length,total);assert.equal(new Set(required).size,total);
  assert.equal(completion.dexStatus({game,caught:required}).alola.complete,true);
  const swapped=required.filter(id=>id!==19).concat(801),result=completion.dexStatus({game,caught:swapped,seen:required});
  assert.equal(swapped.length,total);assert.equal(result.alola.registered,total-1);assert.deepEqual(result.alola.missing,[19]);
  assert.equal(completion.dexStatus({game,caught:[],seen:required}).alola.registered,0);
  assert.deepEqual(['melemele','akala','ulaula','poni'].map(k=>dex[family][k].length),islandTotals);
  assert.ok(!required.includes(801)&&!required.includes(802)&&!required.includes(807));
 }
});
test('stored passport stamps remain separate from fulfilled dex requirements and manual marks',()=>{
 const d=diagnosis.normalize({game:'ULTRASUN',caught:dex.ultra.alola,seen:[],passport:{mask:0},integrity:{checksumsValid:true}});
 const facts=objectives.fromDiagnosis(d),nodes=[{id:'dex',gameId:d.game,verification:{fact:'pokedex.completion.alola'}},{id:'stamp',gameId:d.game,verification:{fact:passport.factForGoal(d.game,'card-10')}}];
 const results=objectives.evaluate(nodes,facts,d.game);
 assert.equal(results[0].status,'COMPLETED_VERIFIED');assert.equal(results[1].status,'AVAILABLE');
 assert.equal(passport.snapshot(d).registered,0);
 const received={...d,caught:[],passport:{mask:1<<10}};
 assert.equal(objectives.evaluate(nodes,objectives.fromDiagnosis(received),d.game)[1].status,'COMPLETED_VERIFIED');
 assert.equal(completion.dexStatus(received).alola.complete,false);
});
test('historic Finder and Multi mastery IDs map to their real distinct stored stamp bits',()=>{
 for(const game of ['SUN','MOON','ULTRASUN','ULTRAMOON']){
  const finder=passport.snapshot({game,passport:{mask:1<<14}}),multi=passport.snapshot({game,passport:{mask:1<<13}});
  assert.match(finder.entries.find(e=>e.registered).label,/Pokévisor/);assert.match(multi.entries.find(e=>e.registered).label,/múltiples/);
  assert.equal(passport.factForGoal(game,'card-13'),'passport.stamp.14');assert.equal(passport.factForGoal(game,'card-14'),'passport.stamp.13');
  assert.equal(passport.snapshot({game,passport:{mask:32767}}).registered,15);
 }
 assert.equal(passport.factForGoal('X','card-13'),null);assert.equal(passport.factForGoal('SUN','card-15'),null);
});
test('unknown or unverified passport and caught fields cannot certify each other',()=>{
 for(const mask of [undefined,-1,32768,1.5,'32767'])assert.equal(passport.snapshot({game:'SUN',passport:{mask}}).registered,null);
 const game='ULTRASUN',d={game,caught:dex.ultra.alola,seen:[],passport:{mask:32767},integrity:{verifiedFields:['seen']}};
 const nodes=[{id:'dex',gameId:game,verification:{fact:'pokedex.completion.alola'}},{id:'stamp',gameId:game,verification:{fact:'passport.stamp.14'}}];
 assert.ok(objectives.evaluate(nodes,objectives.fromDiagnosis(d),game).every(r=>r.status==='PARTIAL_EVIDENCE'));
 const onlyPassport={...d,integrity:{verifiedFields:['passport']}};
 assert.deepEqual(objectives.evaluate(nodes,objectives.fromDiagnosis(onlyPassport),game).map(r=>r.status),['PARTIAL_EVIDENCE','COMPLETED_VERIFIED']);
});
