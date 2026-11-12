// SPDX-License-Identifier: GPL-3.0-or-later
/* Interpreta la lectura de campo de la 3.ª generación: ubicación, hitos de historia,
   secretos y la Isla Espejismo. Solo usa banderas con nombre de pret; el nivel de
   confianza es «documentado en código» y la Pokédex nunca sustituye a una bandera. */
(function(root){
 'use strict';
 const DATA=()=>root.PokemonGen3Data||(typeof module==='object'&&module.exports?require('../saves/gen3-data.js'):null);
 function familyOf(game,data){for(const [f,games]of Object.entries(data.gameFamilies))if(games.includes(game))return f;return null;}
 function nextRnd(rnd){return (Math.imul(1103515245,rnd)+12345)>>>0;}
 function mirage(field,data,horizon=365){
  const vars=data.families[field.family].vars;
  if(vars.VAR_MIRAGE_RND_H===undefined)return null;
  let rnd=((field.vars[vars.VAR_MIRAGE_RND_H]<<16)|field.vars[vars.VAR_MIRAGE_RND_L])>>>0;
  const today=rnd>>>16,owned=[...field.party.map(p=>({...p,where:'equipo'})),...field.boxes.map(p=>({...p,where:'caja'}))];
  const visibleToday=field.party.filter(p=>p.pidLow===today);
  const fromBoxToday=field.boxes.filter(p=>p.pidLow===today);
  const byLow=new Map();for(const p of owned){if(!byLow.has(p.pidLow))byLow.set(p.pidLow,[]);byLow.get(p.pidLow).push(p);}
  const upcoming=[];
  for(let day=1;day<=horizon&&upcoming.length<5;day++){
   rnd=nextRnd(rnd);const match=byLow.get(rnd>>>16);
   if(match)upcoming.push({day,value:rnd>>>16,mons:match});
  }
  return {today,visibleToday,fromBoxToday,upcoming,horizon,
   daysVar:vars.VAR_DAYS!==undefined?field.vars[vars.VAR_DAYS]:null};
 }
 function has(field,data,name){const n=data.families[field.family].flags[name];return n===undefined?null:field.flags.includes(n);}
 function story(field,game,data){
  const rows=data.story[field.family].map(r=>({...r,id:game+'-'+r.mission,set:has(field,data,r.flag)}));
  let laterSet=false;
  for(let i=rows.length-1;i>=0;i--){
   rows[i].state=rows[i].set?'direct':laterSet?'derived':'pending';
   if(rows[i].set)laterSet=true;
  }
  return {rows,next:rows.find(r=>r.state==='pending')||null};
 }
 function secrets(field,game,data,dex){
  return data.secrets.filter(s=>s.families.includes(field.family)).map(s=>{
   const c=s.conditions?.[field.family],place=s.placeName[field.family];
   if(s.computed==='mirage')return {...s,place,status:'calculado',mirage:mirage(field,data)};
   if(s.computed==='hallOfFame'){
    const h=field.hallOfFame,n=h?.teams;
    return {...s,place,status:n==null?'pendiente':n>=2?'completado':n===1?'en curso':'pendiente',
     meaning:n==null?'El registro del Salón de la Fama no está disponible o no supera su comprobación.':`Equipos registrados en el Salón de la Fama: ${n}${n>=h.max?' (máximo que guarda el juego)':''}. Cada uno corresponde a una victoria en la Liga.`,done:[],lost:[],progress:[],species:[]};
   }
   const done=[c.done,c.doneAlso].filter(Boolean).map(f=>({flag:f,set:has(field,data,f)}));
   const lost=(c.lost||[]).filter(f=>has(field,data,f));
   const progress=(c.progress||[]).map(p=>({...p,set:has(field,data,p.flag)}));
   const species=(s.species||[]).map(id=>({id,caught:Array.isArray(dex)?dex.includes(id):null}));
   let status;
   if(done.every(d=>d.set))status='completado';
   else if(lost.length)status='perdido';
   else if(done.some(d=>d.set)||progress.some(p=>p.set))status='en curso';
   else status=s.legacy?'legado':'pendiente';
   const result={...s,place,status,done,lost,progress,species,meaning:c.meaning};
   if(s.abnormalWeather&&status!=='completado'){
    const v=data.families[field.family].vars.VAR_ABNORMAL_WEATHER_LOCATION;
    const value=v===undefined?null:field.vars[v];
    result.weather=value?data.families[field.family].abnormalWeather[value]||null:null;
   }
   return result;
  });
 }
 function analyze(field,game,dex){
  const data=DATA();if(!field||!data||!data.families[field.family])return null;
  if(familyOf(game,data)!==field.family)return {mismatch:true};
  return {location:field.location,story:story(field,game,data),secrets:secrets(field,game,data,dex),
   integrity:field.integrity,revisions:data.revisions};
 }
 const api={analyze,mirage,nextRnd,familyOf};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonGen3Guide=api;
})(globalThis);
