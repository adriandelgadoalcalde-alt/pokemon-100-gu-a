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
  const documentedClear=['SCARLET','VIOLET'].includes(game.id)&&snapshot?.gameClear==null&&snapshot?.progressSignals?.some(s=>s.id==='story.paldea.clear'&&s.value===true);
  if(snapshot?.gameClear===true||documentedClear){
   const endIndex=game.missions.findIndex(m=>m.id===game.mainStoryLastMission);
   const johtoComplete=['GOLD','SILVER','CRYSTAL','SOULSILVER','HEARTGOLD'].includes(game.id)&&snapshot.badgesTotal===16;
   const kantoEnd=johtoComplete?game.missions.findIndex(m=>m.id===game.id+'-12'):-1;
   const boundary=Math.max(endIndex,kantoEnd);
   const afterStory=pending.find(m=>boundary>=0?game.missions.indexOf(m)>boundary:m.section!=='Historia');
   if(afterStory)return {mission:afterStory,reason:documentedClear?'El indicador documentado de final de Paldea está activo. Se prioriza el postgame sin certificar todas las escenas previas.':'El final de la historia consta en el diagnóstico. Se prioriza contenido posterior sin marcar por hechas las escenas anteriores.'};
  }
  return {mission:pending[0],reason:snapshot?'Siguiente objetivo sin evidencia suficiente; consulta sus requisitos antes de desplazarte.':'Puedes consultar la guía desde el inicio o cargar un guardado compatible.'};
 }
 const api={nextMission};if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonRoute=api;
})(typeof globalThis==='object'?globalThis:this);
