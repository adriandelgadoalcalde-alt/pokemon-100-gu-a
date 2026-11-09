const test=require('node:test'),assert=require('node:assert/strict'),{nextMission}=require('../src/engine/route.js');
const game={id:'SOULSILVER',missions:[{id:'start',section:'Historia'},{id:'later',section:'Postgame y 100%'},{id:'SOULSILVER-E02',section:'Especiales de edición'}]};
test('a champion is directed towards postgame without changing earlier checkboxes',()=>{
 const before=structuredClone(game),result=nextMission(game,{gameClear:true},()=>false,()=>false);
 assert.equal(result.mission.id,'later');assert.deepEqual(game,before);
});
test('an orb already in the bag directs the route to the tower rather than repeated delivery',()=>{
 assert.equal(nextMission(game,{keyItems:[{id:534,count:1}],caught:[]},()=>false,()=>false).mission.id,'SOULSILVER-E02');
});
test('acquired species never reappear through a fallback recommendation',()=>{
 assert.equal(nextMission(game,{},()=>false,()=>true),null);
});
