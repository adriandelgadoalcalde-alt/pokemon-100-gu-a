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
  if(snapshot?.gameClear===true){
   const afterStory=pending.find(m=>m.section!=='Historia'&&
    !(['SOULSILVER','HEARTGOLD'].includes(game.id)&&snapshot.badgesTotal===16&&m.id===game.id+'-12'));
   if(afterStory)return {mission:afterStory,reason:'El final de la historia consta en el diagnóstico. Se prioriza contenido posterior sin marcar por hechas las escenas anteriores.'};
  }
  return {mission:pending[0],reason:snapshot?'Siguiente objetivo sin evidencia suficiente; consulta sus requisitos antes de desplazarte.':'Puedes consultar la guía desde el inicio o cargar un guardado compatible.'};
 }
 const api={nextMission};if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonRoute=api;
})(typeof globalThis==='object'?globalThis:this);
