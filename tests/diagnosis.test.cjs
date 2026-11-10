const test=require('node:test'),assert=require('node:assert/strict');
const {normalize,read,profile,apply}=require('../src/saves/diagnosis.js');
const {fixture,reader}=require('./helpers.cjs');
test('normalization preserves unknown values, counts actual species and retains provenance',()=>{
 const d=normalize({game:'Y',caught:[145,145,-1,'146'],seen:[146],caughtCount:999});
 assert.deepEqual(d.caught,[145]);assert.equal(d.caughtCount,1);
 assert.equal(d.gameClear,null);assert.equal(d.nationalDex,null);assert.equal(d.badgesTotal,null);
 assert.equal(d.sourceType,'imported-diagnosis');assert.equal(profile(d),null);
});
test('shared binary read returns a normalized local diagnosis without input changes',async()=>{
 const bytes=fixture({caught:[145,146],seen:[381]}),before=Buffer.from(bytes);
 const d=await read({size:bytes.length,arrayBuffer:async()=>bytes.buffer},reader());
 assert.deepEqual(d.caught,[145,146]);assert.equal(d.sourceType,'local-save');
 assert.equal(d.integrity.generalChecksumValid,true);assert.deepEqual(Buffer.from(bytes),before);
});
test('a malformed diagnosis or oversized binary cannot be accepted as valid progress',async()=>{
 assert.equal(normalize({caught:[],seen:'all'}),null);
 await assert.rejects(read({size:9*1024*1024}),/8 MiB/);
});
test('Atlas profile changes archive all checklist layers and restore them on return',()=>{
 const a={game:'SOULSILVER',trainer:'SYNTH',tid:1,caught:[],seen:[],sha256:'a'},b={...a,tid:2,sha256:'b'};
 const original={game:a.game,checks:{'SOULSILVER-01-0':true},goalChecks:{'SOULSILVER:0':true},masterChecks:{'SOULSILVER:story':true},evidence:{SOULSILVER:a}};
 const second=apply(original,b);assert.deepEqual(second.checks,{});assert.deepEqual(second.masterChecks,{});
 const returned=apply(second,a);for(const k of ['checks','goalChecks','masterChecks'])assert.deepEqual(returned[k],original[k]);
 assert.equal(original.evidence.SOULSILVER.tid,1);
});
test('an identical binary can join browser and Core identities without erasing progress',()=>{
 const a={game:'SOULSILVER',trainer:'SYNTH',tid:1,caught:[],seen:[],sha256:'same'},core={game:a.game,profileId:'core-profile',caught:[],seen:[],sha256:'same'};
 const store={game:a.game,checks:{'SOULSILVER-01-0':true},evidence:{SOULSILVER:a}};
 const joined=apply(store,core);assert.deepEqual(joined.checks,store.checks);
 const updated=apply(joined,{...a,sha256:'later'});assert.deepEqual(updated.checks,store.checks);
});
test('Core diagnostics retain limitations, inventory, language and revision across normalization',()=>{
 const raw={game:'Y',caught:[],seen:[],languageId:7,revision:'1.0',region:null,
  warnings:['Estado actual'],unparsed:['Historia incompleta'],inventory:[{pocket:'Items',items:[{id:50,count:2}]}]};
 const result=normalize(raw);for(const key of ['languageId','revision','region','warnings','unparsed','inventory'])assert.deepEqual(result[key],raw[key]);
 result.inventory[0].items[0].count=99;assert.equal(raw.inventory[0].items[0].count,2);
});
test('documented event signals retain unknowns and cannot claim verified validation',()=>{
 const d=normalize({game:'SCARLET',caught:[],seen:[],progressSignals:[{id:'story.paldea.clear',value:true,validation:'verified'},{id:'story.tealMask.clear',value:'false'}]});
 assert.equal(d.progressSignals[0].validation,'documented');assert.equal(d.progressSignals[0].value,true);assert.equal(d.progressSignals[1].value,null);
});
test('local Core fallback only handles explicitly unsupported formats, never integrity failures',async()=>{
 let calls=0;const bytes=new Uint8Array(100);
 globalThis.PokemonCoreBrowser={read:async()=>{calls++;return {game:'SCARLET',caught:[],seen:[]};}};
 try{
  const file={size:bytes.length,arrayBuffer:async()=>bytes.buffer};
  const d=await read(file,{parse(){throw Object.assign(Error('Unsupported'),{code:'UNSUPPORTED_SAVE_FORMAT'});}});
  assert.equal(d.game,'SCARLET');assert.equal(calls,1);
  await assert.rejects(read(file,{parse(){throw Error('Invalid integrity');}}),/Invalid integrity/);
  assert.equal(calls,1);
  globalThis.PokemonCoreBrowser.read=async()=>({game:null,gameCandidates:['RED','BLUE'],caught:[],seen:[]});
  const unsupported={parse(){throw Object.assign(Error('Unsupported'),{code:'UNSUPPORTED_SAVE_FORMAT'});}};
  await assert.rejects(read(file,unsupported,{selectedGame:'GREEN'}),/no distingue/);
  const family=await read(file,unsupported,{selectedGame:'BLUE'});
  assert.equal(family.game,'BLUE');assert.equal(family.editionIdentification,'selected-in-atlas');
 }finally{delete globalThis.PokemonCoreBrowser;}
});
