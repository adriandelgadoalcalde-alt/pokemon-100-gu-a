const test=require('node:test'),assert=require('node:assert/strict'),{compare}=require('../src/saves/chronology.js');
const snapshot=()=>({game:'SOULSILVER',trainer:'SYNTH',tid:1,caught:[145],seen:[145],readAt:'import-A'});
test('new parser fields do not become invented observed progress',()=>{
 const old=snapshot(),fresh={...snapshot(),readAt:'import-B',events:{activeFlags:[20],work:[5]},keyItems:[{id:534,count:1}]};
 const diff=compare(old,fresh);
 assert.deepEqual(diff.newFlags,[]);assert.deepEqual(diff.changedWorks,[]);assert.deepEqual(diff.newKeyItems,[]);
 assert.ok(diff.uncomparedFields.includes('work'));assert.equal(diff.badgeChange,null);
});
test('diff reports actual additions, removals and work changes without event timestamps',()=>{
 const old={...snapshot(),events:{activeFlags:[1],work:[0,2]},keyItems:[]};
 const fresh={...snapshot(),readAt:'import-B',caught:[145,146],events:{activeFlags:[2],work:[1,2]},keyItems:[{id:534,count:1}]};
 const a=structuredClone(old),b=structuredClone(fresh),diff=compare(old,fresh);
 assert.deepEqual(diff.newlyCaught,[146]);assert.deepEqual(diff.newFlags,[2]);assert.deepEqual(diff.clearedFlags,[1]);
 assert.deepEqual(diff.changedWorks,[{index:0,from:0,to:1}]);assert.deepEqual(diff.newKeyItems,[534]);
 assert.equal(diff.eventTimestamp,null);assert.equal(diff.orderWithinInterval,'unknown');
 assert.deepEqual(old,a);assert.deepEqual(fresh,b);
});
test('different or unidentifiable profiles cannot produce a shared chronology',()=>{
 assert.equal(compare(snapshot(),{...snapshot(),tid:2}),null);
 assert.equal(compare({game:'Y',caught:[]},{game:'Y',caught:[145]}),null);
});
