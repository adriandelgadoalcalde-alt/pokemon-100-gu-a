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
test('catalogue story boundaries do not send a champion back to their first League',()=>{
 const fs=require('node:fs'),{catalogue}=require('../scripts/audit.cjs');
 const games=catalogue(fs.readFileSync(require('node:path').join(__dirname,'../atlas.html'),'utf8')).games;
 for(const [id,next]of [['BLACK','10'],['SUN','09'],['PLATINUM','11'],['SOULSILVER','10']]){
  const edition=games.find(g=>g.id===id),result=nextMission(edition,{gameClear:true},()=>false,()=>false);
  assert.equal(result.mission.id,id+'-'+next);
 }
 const ss=games.find(g=>g.id==='SOULSILVER');
 assert.equal(nextMission(ss,{gameClear:true,badgesTotal:16},()=>false,()=>false).mission.id,'SOULSILVER-13');
});
test('a positive documented Paldea signal directs the route without certifying checkboxes',()=>{
 const edition={id:'SCARLET',mainStoryLastMission:'SCARLET-07',missions:[{id:'SCARLET-01',section:'Historia'},{id:'SCARLET-07',section:'Historia'},{id:'SCARLET-08',section:'Postgame y 100%'}]};
 const positive={gameClear:null,progressSignals:[{id:'story.paldea.clear',value:true}]};
 assert.equal(nextMission(edition,positive,()=>false,()=>false).mission.id,'SCARLET-08');
 for(const value of [false,null])assert.equal(nextMission(edition,{progressSignals:[{id:'story.paldea.clear',value}]},()=>false,()=>false).mission.id,'SCARLET-01');
 assert.equal(nextMission(edition,{...positive,gameClear:false},()=>false,()=>false).mission.id,'SCARLET-01');
});
