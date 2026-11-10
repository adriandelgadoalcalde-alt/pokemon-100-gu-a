/* Stored stamp bits from pinned PKHeX Misc7.Stamps / Stamp7. No scene reconstruction. */
(function(root){
 'use strict';
 const games=['SUN','MOON','ULTRASUN','ULTRAMOON'];
 const labels=['Entrenador Pokémon oficial','Gran prueba de Melemele','Gran prueba de Akala','Gran prueba de Ula-Ula','Gran prueba de Poni','Recorrido insular y Liga','Pokédex de Melemele','Pokédex de Akala','Pokédex de Ula-Ula','Pokédex de Poni','Pokédex de Alola','50 victorias individuales','50 victorias dobles','50 victorias múltiples','Pokévisor Pro'];
 // Historical mastery IDs put Poké Finder before Multi; preserve those IDs and checkboxes.
 const goalToBit=[0,1,2,3,4,5,6,7,8,9,10,11,12,14,13];
 function snapshot(d){
  if(!games.includes(d?.game))return null;
  const mask=Number.isInteger(d.passport?.mask)&&d.passport.mask>=0&&d.passport.mask<=0x7fff?d.passport.mask:null;
  const entries=labels.map((label,index)=>({index,label,registered:mask===null?null:!!(mask&(1<<index))}));
  return {entries,registered:mask===null?null:entries.filter(e=>e.registered).length,total:15};
 }
 function factForGoal(game,id){
  if(!games.includes(game)||!/^card-\d+$/.test(id))return null;
  const index=+id.slice(5);return index<goalToBit.length?'passport.stamp.'+goalToBit[index]:null;
 }
 function render(d,esc){
  const data=snapshot(d);if(!data)return '';
  return `<section class="panel" data-passport><h3>Sellos registrados en tu pasaporte</h3><p><b>${data.registered===null?'Sin lectura de sellos':data.registered+'/15 sellos registrados'}</b></p><p>Se consulta el registro del pasaporte. Cumplir una lista de Pokédex y tener su sello son datos distintos; no se concede un sello por completar casillas. Estos registros no certifican legitimidad, todos los encuentros ni una cronología completa.</p><ol>${data.entries.map(e=>`<li data-passport-index="${e.index}" data-passport-state="${e.registered===null?'unknown':e.registered?'registered':'absent'}">${esc(e.label)} · ${e.registered===null?'Sin lectura disponible':e.registered?'Registrado':'No consta en este guardado'}</li>`).join('')}</ol></section>`;
 }
 const api={snapshot,factForGoal,render};if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonPassport=api;
})(globalThis);
