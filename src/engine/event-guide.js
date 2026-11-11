// SPDX-License-Identifier: GPL-3.0-or-later
/* Motor común de hitos y secretos a partir de banderas y variables del guardado.
   Cada paquete de datos (src/saves/*-data.js) declara familias de ediciones,
   banderas resueltas desde fuentes fijadas, hitos de historia y secretos.
   Nunca convierte un registro de Pokédex en un evento completado. */
(function(root){
 'use strict';
 const isNode=typeof module==='object'&&module.exports;
 function packs(){
  if(isNode)return ['gen3','gen12','gen4','pkhex'].map(n=>{try{return require('../saves/'+n+'-data.js');}catch{return null;}}).filter(Boolean);
  return [root.PokemonGen3Data,...(root.PokemonEventPacks||[])].filter(Boolean);
 }
 function locate(game){
  for(const pack of packs())for(const [family,games]of Object.entries(pack.gameFamilies))if(games.includes(game))return {pack,family};
  return null;
 }
 function sourceOf(e){
  if(e?.field&&Array.isArray(e.field.flags))return {flags:e.field.flags,vars:e.field.vars||[],location:e.field.location||null,kind:'field'};
  if(e?.events&&Array.isArray(e.events.activeFlags))return {flags:e.events.activeFlags,vars:Array.isArray(e.events.work)?e.events.work:[],location:e.location||null,kind:'events'};
  return null;
 }
 function evaluate(pack,family,game,flags,vars,dex,meta={}){
  const set=new Set(flags),fam=pack.families[family];
  const has=name=>{const n=fam.flags[name];return n===undefined?null:set.has(n);};
  const varValue=name=>{const i=fam.vars?.[name];return i===undefined?null:vars[i]??null;};
  const check=c=>Array.isArray(c.flags)?(c.flags.some(f=>has(f)===null)?null:c.flags.every(f=>has(f))):c.badgesAtLeast!==undefined?(Number.isInteger(meta.badges)?meta.badges>=c.badgesAtLeast:null):c.flag?has(c.flag):c.var?(()=>{const v=varValue(c.var);return v===null?null:c.atLeast!==undefined?v>=c.atLeast:v===c.equals;})():null;
  const rows=(pack.story[family]||[]).map(r=>({...r,id:game+'-'+r.mission,set:check(r)}));
  let later=false;
  for(let i=rows.length-1;i>=0;i--){rows[i].state=rows[i].set?'direct':later?'derived':'pending';if(rows[i].set)later=true;}
  const secrets=pack.secrets.filter(s=>s.families.includes(family)&&(!s.games||s.games.includes(game))).map(s=>{
   const c=s.conditions?.[family]||{},place=s.placeName?.[family]||s.placeName?.[game]||'';
   if(s.computed)return {...s,place,status:'calculado'};
   const done=[c.done,c.doneAlso,...(c.doneAll||[])].filter(Boolean).map(f=>({flag:f,set:has(f)})).concat(c.doneAny?[{flag:c.doneAny.join('|'),set:c.doneAny.some(f=>has(f))}]:[]);
   const doneVar=c.doneVar?[{var:c.doneVar.var,set:check(c.doneVar)}]:[];
   const all=[...done,...doneVar];
   const lost=[...(c.lost||[]).filter(f=>has(f)),...(c.lostVar||[]).filter(v=>check(v)).map(v=>v.var)];
   const progress=(c.progress||[]).map(p=>({...p,set:check(p)}));
   const species=(s.species||[]).map(id=>({id,caught:Array.isArray(dex)?dex.includes(id):null}));
   let status;
   if(all.length&&all.every(d=>d.set))status='completado';
   else if(lost.length)status='perdido';
   else if(all.some(d=>d.set)||progress.some(p=>p.set))status='en curso';
   else status=s.legacy?'legado':'pendiente';
   return {...s,place,status,done:all,lost,progress,species,meaning:c.meaning};
  });
  return {story:{rows,next:rows.find(r=>r.state==='pending')||null},secrets};
 }
 function analyze(e,game){
  const where=locate(game),src=sourceOf(e);
  if(!where||!src)return null;
  if(Number.isInteger(e.languageId)&&(where.pack.excludeLanguages||[]).includes(e.languageId))return null;
  if(src.kind==='field'&&e.field.family&&e.field.family!==where.family)return {mismatch:true};
  const result=evaluate(where.pack,where.family,game,src.flags,src.vars,e.caught,{badges:e.badgesTotal});
  return {...result,storyPartial:Boolean(where.pack.storyPartial),family:where.family,location:src.location,sourceKind:src.kind,revisions:where.pack.revisions,
   confidence:where.pack.confidence||'documentado en código'};
 }
 const api={analyze,evaluate,locate};
 if(isNode)module.exports=api;else root.PokemonEventGuide=api;
})(globalThis);
