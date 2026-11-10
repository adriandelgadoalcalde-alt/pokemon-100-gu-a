const test=require('node:test'),assert=require('node:assert/strict');
const book=require('../src/guides/medals.js'),engine=require('../src/engine/objectives.js');
const diagnosis=(entries,extra={})=>({game:'BLACK2',caught:[],seen:[],medals:{medals:entries,...extra}});
const full=state=>Array.from({length:255},(_,i)=>({id:i+1,state}));
test('medal receipts, ready rewards and hints remain distinct despite contradictory aggregate counts',()=>{
 const input=full(0);input[0]={id:1,state:4,date:'2026-02-31'};input[1]={id:2,state:3,date:'2000-02-29'};input[2]={id:3,state:2,date:'2026-11-10'};
 const result=book.snapshot(diagnosis(input,{obtained:255,ready:255}));
 assert.equal(result.obtained,1);assert.equal(result.ready,1);assert.equal(result.complete,false);
 assert.equal(result.entries[0].date,null);assert.equal(result.entries[1].date,'2000-02-29');
 assert.equal(result.entries[2].obtained,false);assert.equal(result.entries.length,255);
 assert.equal(result.entries[0].name,'Primer Paso');assert.equal(result.entries[254].name,'Espíritu Desafiante');
});
test('partial, duplicate and unsupported medal states remain unknown rather than a complete collection',()=>{
 for(const entries of [[],full(4).slice(1),full(4).concat({id:1,state:4}),full(4).map(m=>m.id===255?{...m,state:7}:m)]){
  const s=book.snapshot(diagnosis(entries));assert.ok(s.unknown>0);assert.equal(s.complete,null);
 }
 assert.equal(book.snapshot({...diagnosis(full(4)),game:'BLACK'}),null);
 assert.equal(book.snapshot({game:'WHITE2'}),null);
 assert.equal(book.snapshot({...diagnosis(full(4)),game:'WHITE2'}).complete,true);
});
test('all-received facts require validated medal fields and never imply individual challenge history',()=>{
 const d={...diagnosis(full(4)),integrity:{verifiedFields:['medals']}},nodes=[{id:'all',gameId:'BLACK2',verification:{fact:'medals.b2w2.allReceived'}}];
 const facts=engine.fromDiagnosis(d);assert.equal(engine.evaluate(nodes,facts,d.game)[0].status,'COMPLETED_VERIFIED');
 assert.equal(engine.evaluate(nodes,engine.fromDiagnosis({...d,integrity:{}}),d.game)[0].status,'PARTIAL_EVIDENCE');
 assert.ok(!facts.some(f=>/original|challenge|timestamp/.test(f.id)));
 assert.equal(engine.fromDiagnosis({...d,medals:{medals:[]}}).find(f=>f.id==='medals.b2w2.allReceived').value,null);
});
