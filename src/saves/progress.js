/* Version-compatible local progress. Never infer game completion during migration. */
(function(root){
 'use strict';
 const record=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
 const clone=x=>JSON.parse(JSON.stringify(x));
 const affected=[...Array.from({length:5},(_,i)=>`soulsilver-34#${i}`),
   'soulsilver-36#1','soulsilver-36#2','soulsilver-36#3'];
 function migrateClassic(input,now=new Date().toISOString()){
  const data=clone(input);
  if(data.v7ChainMigration)return data;
  const marked=Object.fromEntries(affected.filter(k=>data.checked?.[k]).map(k=>[k,data.checked[k]]));
  data.legacyStepReview={...(record(data.legacyStepReview)?data.legacyStepReview:{}),
    ...Object.fromEntries(Object.keys(marked).map(k=>[k,true]))};
  data.migrationBackups=record(data.migrationBackups)?data.migrationBackups:{};
  if(Object.keys(marked).length&&!data.migrationBackups.v7){
   data.migrationBackups.v7={at:now,checked:marked,reason:'Instrucciones de Oak y Orbe Rojo revisadas; marcas originales conservadas.'};
   data.history=Array.isArray(data.history)?data.history:[];
   data.history.unshift({game:'SOULSILVER',title:'Marcas anteriores conservadas',
    step:'Las instrucciones de Oak y Orbe Rojo cambiaron. Tus marcas y notas se conservan; los pasos afectados requieren revisión antes de acreditar nuevos requisitos.',
    action:'migración reversible',date:now});
  }
  data.v7ChainMigration=true;
  return data;
 }
 function restoreClassic(current,input,allowedGames,now){
  if(!record(input)||!record(input.checked)||!record(input.notes)||!Array.isArray(input.history))
   throw Error('Formato de respaldo no válido. Se necesita progreso con casillas, notas e historial.');
  for(const key of ['snapshots','comparisons','quiz','v8Manual','v8Profiles','v8TaskAnswers',
    'certifications','manualCounts','prereqAnswers','legacyStepReview','migrationBackups'])
   if(input[key]!==undefined&&!record(input[key]))throw Error(`El campo ${key} del respaldo no es válido.`);
  const data={...clone(current),...clone(input)};
  for(const key of ['snapshots','comparisons','quiz','v8Manual','v8Profiles','v8TaskAnswers',
    'certifications','manualCounts','prereqAnswers','legacyStepReview','migrationBackups'])
   data[key]=clone(input[key]||{});
  data.game=allowedGames.includes(input.game)?input.game:current.game;
  data.view=input.view==='quiz'?'save':input.view||'save';
  return migrateClassic(data,now);
 }
 function reviewRequired(data,key){return data.legacyStepReview?.[key]===true;}
 function restoreAtlas(current,input,allowedGames,normalize){
  if(!record(input)||!record(input.checks))throw Error('Archivo de progreso del Atlas incompatible.');
  for(const key of ['masterChecks','goalChecks','evidence','evidenceArchive','profileProgress','profileAliases'])
   if(input[key]!==undefined&&!record(input[key]))throw Error(`El campo ${key} del respaldo no es válido.`);
  if(input.history!==undefined&&!Array.isArray(input.history))throw Error('El historial no es válido.');
  const data={...clone(current),...clone(input)};
  if(input.evidence!==undefined)data.evidence=Object.fromEntries(Object.entries(input.evidence)
   .filter(([id,e])=>allowedGames.includes(id)&&normalize(e)).map(([id,e])=>{
    if(e.game&&e.game!==id)throw Error('La edición del diagnóstico no coincide con su expediente.');
    return [id,normalize({...e,game:id})];
   }));
  data.game=allowedGames.includes(input.game)?input.game:current.game;
  return data;
 }
 const api={migrateClassic,restoreClassic,restoreAtlas,reviewRequired,affected};
 if(typeof module==='object'&&module.exports)module.exports=api;
 else root.PokemonProgress=api;
})(typeof globalThis==='object'?globalThis:this);
