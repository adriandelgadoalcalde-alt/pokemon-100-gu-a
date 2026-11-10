/* Differences observed between imports, never a fabricated timeline of in-game actions. */
(function(root){
 'use strict';
 function profile(s){
  if(s?.profileId)return `${s.game}|${s.profileId}`;
  return s&&(s.tid!==undefined||s.trainer)?`${s.game}|${s.trainer||'?'}|${s.tid??'?'}|${s.sid??'?'}`:null;
 }
 function compare(a,b){
  if(!a||!b||a.game!==b.game||!profile(a)||profile(a)!==profile(b))return null;
  const skipped=[];
  function delta(before,after,name){
   if(!Array.isArray(before)||!Array.isArray(after)){skipped.push(name);return {added:[],removed:[]};}
   const old=new Set(before),fresh=new Set(after);
   return {added:[...fresh].filter(x=>!old.has(x)),removed:[...old].filter(x=>!fresh.has(x))};
  }
  const caught=delta(a.caught,b.caught,'caught'),seen=delta(a.seen,b.seen,'seen');
  const flags=delta(a.events?.activeFlags,b.events?.activeFlags,'flags');
  const keys=delta(a.keyItems?.filter(i=>i.count>0).map(i=>i.id),b.keyItems?.filter(i=>i.count>0).map(i=>i.id),'keyItems');
  const works=[];
  if(Array.isArray(a.events?.work)&&Array.isArray(b.events?.work)){
   for(let i=0;i<Math.min(a.events.work.length,b.events.work.length);i++)
    if(a.events.work[i]!==b.events.work[i])works.push({index:i,from:a.events.work[i],to:b.events.work[i]});
   if(a.events.work.length!==b.events.work.length)skipped.push('work-length-changed');
  }else skipped.push('work');
  const badgesA=a.badgesTotal??a.badges,badgesB=b.badgesTotal??b.badges;
  const medals=Array.isArray(a.medals?.medals)&&Array.isArray(b.medals?.medals)?
   b.medals.medals.filter(m=>m.obtained&&a.medals.medals.some(old=>old.id===m.id&&old.obtained===false)).map(m=>m.id):[];
  const names=new Map((b.events?.labeled||[]).map(x=>[x.index,x.label]));
  return {game:b.game,from:a.readAt||'',to:b.readAt||'',before:a.playtime||'',after:b.playtime||'',
   fromSnapshot:a.sha256||null,toSnapshot:b.sha256||null,eventTimestamp:null,orderWithinInterval:'unknown',
   badgeChange:Number.isInteger(badgesA)&&Number.isInteger(badgesB)?badgesB-badgesA:null,
   medalsBefore:a.medals?.obtained??null,medalsAfter:b.medals?.obtained??null,newlyObtainedMedals:medals,
   newlyCaught:caught.added,newlySeen:seen.added,lostCaught:caught.removed,newFlags:flags.added,clearedFlags:flags.removed,
   changedWorks:works,newKeyItems:keys.added,noLongerPresentKeyItems:keys.removed,uncomparedFields:skipped,
   flagNames:Object.fromEntries([...flags.added,...flags.removed].filter(i=>names.has(i)).map(i=>[i,names.get(i)]))};
 }
 const api={profile,compare};if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonChronology=api;
})(typeof globalThis==='object'?globalThis:this);
