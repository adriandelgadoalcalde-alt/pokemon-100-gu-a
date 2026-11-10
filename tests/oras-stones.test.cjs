const test=require('node:test'),assert=require('node:assert/strict');
const guide=require('../src/guides/oras-stones.js'),diagnosis=require('../src/saves/diagnosis.js');
const game='OMEGARUBY',bag=items=>({game,caught:[],seen:[],integrity:{checksumsValid:true},inventory:[{pocket:'Items',items}]});
test('ORAS covers all 47 stone item IDs with per-item references and external legacy separated',()=>{
 const expected=[...Array.from({length:30},(_,i)=>656+i),...Array.from({length:13},(_,i)=>752+i),767,768,769,770];
 assert.deepEqual(guide.stones.map(s=>s.id),expected);
 for(const s of guide.stones){assert.ok(s.steps.length&&s.sources.every(url=>url.startsWith('https://')));assert.ok(s.name&&s.place&&s.phase);}
 assert.deepEqual(guide.stones.filter(s=>s.legacy).map(s=>s.id),[764]);
 assert.equal(guide.snapshot('X',bag([])),null);
});
test('bag presence is current possession without interpreting absence as collection history',()=>{
 const source=bag([{id:656,count:2},{id:758,count:1},{id:765,count:1}]),before=JSON.stringify(source);
 const normalized=diagnosis.normalize(source),data=guide.snapshot(game,normalized);
 assert.equal(data.inBag,2);assert.equal(data.entries.find(s=>s.id===656).count,2);
 assert.equal(data.entries.find(s=>s.id===684).state,'not-in-bag');
 assert.equal(data.entries.find(s=>s.id===758).state,'present');
 assert.equal(data.complete,undefined);assert.equal(JSON.stringify(source),before);
 assert.match(guide.render(game,source,s=>s),/puede estar equipada/);
 assert.equal(guide.snapshot(game,bag([])).readable,true);
});
test('missing, corrupt, wrong-edition or ambiguous pocket data stays unknown',()=>{
 for(const d of [null,{...bag([]),game:'ALPHASAPPHIRE'},{...bag([]),integrity:{}},{...bag([]),inventory:null},{...bag([]),inventory:[{pocket:'Items',items:[]},{pocket:'Items',items:[]}]}]){
  const data=guide.snapshot(game,d);assert.equal(data.readable,false);assert.ok(data.entries.every(s=>s.state==='unknown'));
 }
 const data=guide.snapshot(game,bag([{id:656,count:1},{id:656,count:1},{id:758,count:NaN},{id:684,count:-1},{id:685,count:65536}]));
 for(const id of [656,758,684,685])assert.equal(data.entries.find(s=>s.id===id).state,'unknown');
 assert.equal(data.inBag,0);
});
test('eon and team-stone deliveries keep OR/AS differences and rematch rewards explicit',()=>{
 const omega=guide.snapshot(game,null),alpha=guide.snapshot('ALPHASAPPHIRE',null);
 const text=(data,id)=>data.entries.find(s=>s.id===id).steps.join(' ');
 assert.match(text(omega,684),/madre/);assert.match(text(alpha,684),/equipada/);
 assert.match(text(omega,685),/equipada/);assert.match(text(alpha,685),/madre/);
 assert.match(text(omega,759),/Resort Batalla/);assert.match(text(alpha,759),/Aquiles/);
 assert.match(text(omega,767),/Magno/);assert.match(text(alpha,767),/Resort Batalla/);
 assert.match(text(omega,758),/primera revancha/);assert.match(text(omega,764),/encuentro fatídico/);
});

test('ORAS contests use their own Spanish ranks and ice chamber access includes a traversal requirement',()=>{
 const fs=require('node:fs'),routes=fs.readFileSync('src/guides/oras.js','utf8');
 assert.match(routes,/Normal, Alto, Avanzado y Maestro/);assert.doesNotMatch(routes,/Súper, Híper y Experto/);
 const text=guide.stones.find(s=>s.id===763).steps.join(' ');assert.match(text,/Bici de Carreras o Fuerza/);
 assert.match(guide.stones.find(s=>s.id===673).steps.join(' '),/Liano/);
});
