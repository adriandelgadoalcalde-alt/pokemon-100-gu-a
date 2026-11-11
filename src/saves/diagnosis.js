/* Shared browser-only import and normalization. Binary bytes never leave the device. */
(function(root){
 'use strict';
 const supported=['HEARTGOLD','SOULSILVER','WHITE2','BLACK2','X','Y','OMEGARUBY','ALPHASAPPHIRE','ULTRASUN','ULTRAMOON'];
 const tri=x=>typeof x==='boolean'?x:null;
 const integer=x=>Number.isInteger(x)&&x>=0?x:null;
 const species=list=>[...new Set(Array.isArray(list)?list.filter(x=>Number.isInteger(x)&&x>=1&&x<=65535):[])].sort((a,b)=>a-b);
 function normalize(e){
  if(!e||typeof e!=='object'||Array.isArray(e)||!Array.isArray(e.caught)||!Array.isArray(e.seen))return null;
  const caught=species(e.caught),seen=species(e.seen);
  const result={game:String(e.game||''),trainer:String(e.trainer||''),playtime:String(e.playtime||''),caught,seen,
   caughtCount:caught.length,seenCount:seen.length,gameClear:tri(e.gameClear),nationalDex:tri(e.nationalDex),
   badgesTotal:integer(e.badgesTotal??e.badges),format:String(e.format||''),readAt:typeof e.readAt==='string'?e.readAt:'',
   sourceType:e.sourceType==='local-save'?'local-save':'imported-diagnosis'};
  for(const key of ['sha256','quickFingerprint','profileId'])if(typeof e[key]==='string')result[key]=e[key];
  if(e.editionIdentification==='selected-in-atlas')result.editionIdentification=e.editionIdentification;
  for(const key of ['unparsed','warnings','gameCandidates'])if(Array.isArray(e[key]))result[key]=e[key].filter(x=>typeof x==='string');
  for(const key of ['revision','region','detectedVersion','schemaVersion'])if(typeof e[key]==='string'||e[key]===null)result[key]=e[key];
  if(integer(e.languageId)!==null)result.languageId=e.languageId;
  if(Array.isArray(e.progressSignals))result.progressSignals=e.progressSignals.filter(s=>s&&typeof s.id==='string').map(s=>({id:s.id,label:typeof s.label==='string'?s.label:s.id,value:tri(s.value),validation:'documented',source:s.source&&typeof s.source==='object'?JSON.parse(JSON.stringify(s.source)):null}));
  if(Array.isArray(e.inventory))result.inventory=JSON.parse(JSON.stringify(e.inventory));
  for(const key of ['tid','sid','generation','version','badgesMask'])if(integer(e[key])!==null)result[key]=e[key];
  if(Array.isArray(e.keyItems))result.keyItems=e.keyItems.filter(i=>i&&Number.isInteger(i.id)&&i.id>0&&Number.isInteger(i.count)&&i.count>0)
   .map(i=>({id:i.id,count:i.count}));
  if(e.extractor&&typeof e.extractor==='object')result.extractor={engine:String(e.extractor.engine||''),engineCommit:String(e.extractor.engineCommit||'')};
  for(const key of ['integrity','events','medals','passport','battleTree','pokeathlon','pokewalker','field','namedBlocks','location','switchPosition'])
   if(e[key]&&typeof e[key]==='object'&&!Array.isArray(e[key]))result[key]=JSON.parse(JSON.stringify(e[key]));
  return result;
 }
 function documentedClear(e){
  const id=['RUBY','SAPPHIRE','EMERALD','FIRERED','LEAFGREEN'].includes(e?.game)?'story.gba.gameClear':['SCARLET','VIOLET'].includes(e?.game)?'story.paldea.clear':null;
  const signal=id?e?.progressSignals?.find(s=>s.id===id):null;
  return typeof signal?.value==='boolean'?signal:null;
 }
 function profile(e){
  if(!e)return null;
  if(e.profileId)return `${e.game}|${e.profileId}`;
  if(Number.isInteger(e.tid)&&e.trainer)return `${e.game}|${e.trainer}|${e.tid}|${e.sid??'unknown'}`;
  return null;
 }
 async function read(file,parser=root.PokemonSaveReader,options={}){
  if(!file||file.size>8*1024*1024)throw Error('Selecciona el guardado interno .sav o main, de hasta 8 MiB; no una ROM ni un estado rápido.');
  if(!parser?.parse)throw Error('El lector local no está disponible. Recarga la página con conexión antes de usarla offline.');
  const bytes=new Uint8Array(await file.arrayBuffer());let parsed;
  try{parsed=parser.parse(bytes);}catch(error){
   if(error.code!=='UNSUPPORTED_SAVE_FORMAT'||!root.PokemonCoreBrowser?.read)throw error;
   parsed=await root.PokemonCoreBrowser.read(bytes);
  }
  if(!parsed.game&&Array.isArray(parsed.gameCandidates)){
   if(!parsed.gameCandidates.includes(options.selectedGame))throw Error('El formato no distingue la edición. Selecciona primero una edición de su familia en el Atlas e importa de nuevo.');
   parsed={...parsed,game:options.selectedGame,editionIdentification:'selected-in-atlas'};
  }
  if(root.PokemonBDSPFlags&&['BD','SP'].includes(parsed.game)&&!parsed.events){
   const extra=root.PokemonBDSPFlags.read(bytes);
   if(extra)parsed={...parsed,events:extra.events,badgesTotal:parsed.badgesTotal??extra.badgesTotal,gameClear:parsed.gameClear??extra.gameClear};
  }
  if(root.PokemonDSLocation&&!parsed.location){
   try{const location=root.PokemonDSLocation.read(bytes,parsed.game,parsed.saveBase,parsed.languageId,parsed.namedBlocks,parsed.switchPosition);if(location)parsed={...parsed,location};}catch{}
  }
  if(root.PokemonGen3Field&&bytes.length>=0x10000&&bytes.length<=0x20040){
   // Lectura de campo complementaria (ubicación, equipo, cajas, banderas). Si falla, el diagnóstico sigue igual.
   try{const field=root.PokemonGen3Field.read(bytes);if(field.games.includes(parsed.game))parsed={...parsed,field};}catch{}
  }
  const result=normalize({...parsed,readAt:new Date().toISOString(),sourceType:'local-save'});
  if(!result)throw Error('El lector no devolvió un diagnóstico compatible. No se ha cambiado el progreso.');
  if(root.crypto?.subtle){const hash=await root.crypto.subtle.digest('SHA-256',bytes);
   result.sha256=Array.from(new Uint8Array(hash),x=>x.toString(16).padStart(2,'0')).join('');}
  return result;
 }
 function apply(store,diagnosis){
  const next=JSON.parse(JSON.stringify(store)),game=diagnosis.game;
  next.evidence=next.evidence||{};const old=next.evidence[game];
  next.profileProgress=next.profileProgress||{};next.profileAliases=next.profileAliases||{};
  const key=e=>profile(e)||`${game}|snapshot|${e.sha256||e.readAt||'unidentified'}`;
  const resolve=id=>{const seen=new Set();while(next.profileAliases[id]&&!seen.has(id)){seen.add(id);id=next.profileAliases[id];}return id;};
  const oldKey=old?resolve(key(old)):null,newKey=resolve(key(diagnosis));
  const identical=old?.sha256&&diagnosis.sha256&&old.sha256===diagnosis.sha256;
  next.profileNotice=Boolean(old&&oldKey!==newKey&&!identical);
  if(old&&identical&&oldKey!==newKey){
   // The same binary may arrive from the browser reader or the local Core extractor.
   const canonical=diagnosis.profileId?newKey:oldKey;
   if(oldKey!==canonical)next.profileAliases[oldKey]=canonical;
   if(newKey!==canonical)next.profileAliases[newKey]=canonical;
  }else if(old&&oldKey!==newKey){
   const take=(record,prefix)=>Object.fromEntries(Object.entries(record||{}).filter(([k])=>k.startsWith(prefix)));
   const current={checks:take(next.checks,game+'-'),goalChecks:take(next.goalChecks,game+':'),masterChecks:take(next.masterChecks,game+':')};
   next.profileProgress[oldKey]=current;
   const saved=next.profileProgress[newKey]||Object.entries(next.profileProgress).find(([k])=>resolve(k)===newKey)?.[1];
   for(const [field,prefix]of [['checks',game+'-'],['goalChecks',game+':'],['masterChecks',game+':']]){
    next[field]=next[field]||{};for(const k of Object.keys(next[field]))if(k.startsWith(prefix))delete next[field][k];
    Object.assign(next[field],saved?.[field]||{});
   }
  }
  if(old&&!identical){next.evidenceArchive=next.evidenceArchive||{};next.evidenceArchive[game]=[old,...(next.evidenceArchive[game]||[])];}
  next.evidence[game]=diagnosis;next.game=game;return next;
 }
 const api={normalize,read,profile,apply,supported,documentedClear};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonDiagnosis=api;
})(typeof globalThis==='object'?globalThis:this);
