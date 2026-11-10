const test=require('node:test'),assert=require('node:assert/strict'),inventory=require('../src/guides/alola-inventory.js');
const snapshot=(items,game='ULTRASUN')=>({game,inventory:[{pocket:'ZCrystals',items}],integrity:{checksumsValid:true}});
test('Alola crystal lists compare bag IDs, not the corresponding held objects',()=>{
 const d=snapshot([{id:807,count:1},{id:927,count:1},{id:776,count:1},{id:921,count:1}]),before=JSON.stringify(d),data=inventory.snapshot(d);
 assert.equal(data.total,35);assert.equal(data.present,2);assert.equal(data.unknown,0);assert.equal(data.complete,undefined);
 assert.equal(inventory.snapshot(snapshot([], 'SUN')).total,29);assert.equal(inventory.snapshot(snapshot([{id:927,count:1}], 'MOON')).present,0);
 assert.equal(JSON.stringify(d),before);
 assert.match(inventory.render(d,s=>s),/otros identificadores/);
});
test('absent inventory and conflicting crystal entries stay unknown rather than completed',()=>{
 for(const d of [{game:'ULTRAMOON'}, {...snapshot([]),integrity:{}},{...snapshot([]),inventory:[{pocket:'ZCrystals',items:[]},{pocket:'ZCrystals',items:[]}]}]){
  const data=inventory.snapshot(d);assert.equal(data.readable,false);assert.equal(data.unknown,35);
 }
 const d=inventory.snapshot(snapshot([{id:807,count:1},{id:807,count:1},{id:927,count:0},{id:928,count:1024}]));
 assert.equal(d.unknown,3);assert.equal(d.present,0);
 assert.equal(inventory.snapshot({game:'X'}),null);
});
