const test=require('node:test'),assert=require('node:assert/strict');
const {migrateClassic,restoreClassic,restoreAtlas}=require('../src/saves/progress.js');
const {normalize}=require('../src/saves/diagnosis.js');
const legacy=()=>({game:'SOULSILVER',view:'quiz',checked:{'soulsilver-34#0':true,'soulsilver-36#2':true,'soulsilver-1#0':true},
 notes:{'soulsilver-34':'Mi nota original'},history:[{title:'Anterior'}],quiz:{SOULSILVER:{red:'yes'}},
 v8Manual:{profile:{value:true}},v8Profiles:{profile:{checked:{x:true}}},v8TaskAnswers:{x:true},futureField:{keep:true}});
test('V7 migration preserves every mark, note, response, and unknown export field',()=>{
 const input=legacy(),original=structuredClone(input),data=migrateClassic(input,'2026-11-09');
 for(const k of ['checked','notes','quiz','v8Manual','v8Profiles','v8TaskAnswers','futureField'])assert.deepEqual(data[k],input[k]);
 assert.deepEqual(input,original);
 assert.equal(data.legacyStepReview['soulsilver-36#2'],true);
 assert.deepEqual(data.migrationBackups.v7.checked,{'soulsilver-34#0':true,'soulsilver-36#2':true});
 assert.deepEqual(data.history.slice(1),input.history);
 assert.deepEqual(migrateClassic(data,'2027'),data);
});
test('export restore retains full history and profile state without copying unrelated local snapshots',()=>{
 const input=legacy();input.history=Array.from({length:1301},(_,i)=>({title:String(i)}));
 const data=restoreClassic({game:'Y',snapshots:{Y:{caught:[1]}}},input,['SOULSILVER','Y'],'2026-11-09');
 assert.equal(data.history.length,1302);
 assert.deepEqual(data.snapshots,{});
 assert.deepEqual(data.futureField,{keep:true});
 assert.equal(data.view,'save');
 assert.deepEqual(data.v8TaskAnswers,{x:true});
});
test('invalid restore is rejected before mutating existing progress',()=>{
 const current=legacy(),before=structuredClone(current);
 assert.throws(()=>restoreClassic(current,{...legacy(),snapshots:[]},['SOULSILVER']),/snapshots/);
 assert.deepEqual(current,before);
});
test('Atlas restore preserves diagnosis history and future fields as well as current checks',()=>{
 const input={game:'Y',checks:{a:true},evidence:{Y:{game:'Y',caught:[145],seen:[145]}},
  evidenceArchive:{Y:[{caught:[1],seen:[1]}]},futureField:{keep:true}};
 const restored=restoreAtlas({game:'SOULSILVER'},input,['Y','SOULSILVER'],normalize);
 assert.deepEqual(restored.evidenceArchive,input.evidenceArchive);
 assert.deepEqual(restored.futureField,input.futureField);
 assert.deepEqual(restored.evidence.Y.caught,[145]);
});
test('an imported diagnosis cannot silently attach another game to an edition',()=>{
 assert.throws(()=>restoreAtlas({game:'Y'},{checks:{},evidence:{Y:{game:'X',caught:[145],seen:[145]}}},['X','Y'],normalize),/no coincide/);
});
