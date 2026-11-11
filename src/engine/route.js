/* Recommendations may use known milestones without marking every earlier scene complete. */
(function(root){
 'use strict';
 function nextMission(game,snapshot,isDone,isAcquired){
  const pending=game.missions.filter(m=>!isDone(m)&&!isAcquired(m));
  if(!pending.length)return null;
  if(game.id==='SOULSILVER'&&snapshot?.keyItems?.some(i=>i.id===534&&i.count>0)){
   const tower=pending.find(m=>m.id==='SOULSILVER-E02');
   if(tower&&!snapshot.caught?.includes(383))return {mission:tower,reason:'El Orbe Rojo ya está en tu bolsa. Continúa con el acceso a la Torre Oculta; no repitas su entrega.'};
  }
  const guide=snapshot&&(root.PokemonEventGuide||(typeof module==='object'&&module.exports?require('./event-guide.js'):null));
  const g3=guide?guide.analyze(snapshot,game.id):null;
  if(g3&&!g3.mismatch){
   const where=g3.location?.name?` Tu partida está guardada en ${g3.location.name}.`:'';
   const last=[...g3.story.rows].reverse().find(r=>r.state!=='pending');
   if(g3.story.next){
    const mission=pending.find(m=>m.id===g3.story.next.id)||game.missions.find(m=>m.id===g3.story.next.id);
    const post=game.missions.indexOf(mission)>game.missions.findIndex(x=>x.id===game.mainStoryLastMission)?' Se prioriza contenido posterior sin marcar por hechas las escenas anteriores.':'';
    if(mission)return {mission,reason:`Según los datos del guardado${last?', último hito: '+last.label:''}. Falta: ${g3.story.next.label}.${where}${post}`};
   }else{
    const after=pending.find(m=>game.missions.indexOf(m)>game.missions.findIndex(x=>x.id===game.mainStoryLastMission));
    if(after)return {mission:after,reason:`El guardado registra la Liga superada.${where} Consulta también «Secretos y eventos» en el diagnóstico.`};
   }
  }
  const signal=(typeof module==='object'&&module.exports?require('../saves/diagnosis.js'):root.PokemonDiagnosis)?.documentedClear({...snapshot,game:snapshot?.game||game.id});
  const documentedClear=snapshot?.gameClear==null&&signal?.value===true;
  if(snapshot?.gameClear===true||documentedClear){
   const endIndex=game.missions.findIndex(m=>m.id===game.mainStoryLastMission);
   const johtoComplete=['GOLD','SILVER','CRYSTAL','SOULSILVER','HEARTGOLD'].includes(game.id)&&snapshot.badgesTotal===16;
   const kantoEnd=johtoComplete?game.missions.findIndex(m=>m.id===game.id+'-12'):-1;
   const boundary=Math.max(endIndex,kantoEnd);
   const afterStory=pending.find(m=>boundary>=0?game.missions.indexOf(m)>boundary:m.section!=='Historia');
   if(afterStory)return {mission:afterStory,reason:documentedClear?(['SCARLET','VIOLET'].includes(game.id)?'El indicador documentado de final de Paldea está activo.':'El indicador documentado de Liga superada está activo.')+' Se prioriza el postgame sin certificar todas las escenas previas.':'El final de la historia consta en el diagnóstico. Se prioriza contenido posterior sin marcar por hechas las escenas anteriores.'};
  }
  return {mission:pending[0],reason:snapshot?'Siguiente objetivo sin evidencia suficiente; consulta sus requisitos antes de desplazarte.':'Puedes consultar la guía desde el inicio o cargar un guardado compatible.'};
 }
 const api={nextMission};if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonRoute=api;
})(typeof globalThis==='object'?globalThis:this);
