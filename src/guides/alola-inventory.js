// SPDX-License-Identifier: GPL-3.0-or-later
// Crystal IDs/names: pinned PKHeX ItemStorage7SM/USUM and text_Items_es.txt.
// Complete corresponding sources and license are distributed in engine/.
(function(root){
 'use strict';
 const names={"807": "Normastal Z", "808": "Pirostal Z", "809": "Hidrostal Z", "810": "Electrostal Z", "811": "Fitostal Z", "812": "Criostal Z", "813": "Lizastal Z", "814": "Toxistal Z", "815": "Geostal Z", "816": "Aerostal Z", "817": "Psicostal Z", "818": "Insectostal Z", "819": "Litostal Z", "820": "Espectrostal Z", "821": "Dracostal Z", "822": "Nictostal Z", "823": "Metalostal Z", "824": "Feeristal Z", "825": "Pikastal Z", "826": "Dueyestal Z", "827": "Incinostal Z", "828": "Primastal Z", "829": "Tapistal Z", "830": "Marshastal Z", "831": "Alo-Raistal Z", "832": "Snorlastal Z", "833": "Eeveestal Z", "834": "Mewstal Z", "835": "Ash-Pikastal Z", "927": "Solgaleostal Z", "928": "Lunalastal Z", "929": "Ultranecrostal Z", "930": "Mimikyustal Z", "931": "Lycanrostal Z", "932": "Kommostal Z"};
 const originals=Array.from({length:29},(_,i)=>807+i),ultra=[...originals,927,928,929,930,931,932];
 const games=['SUN','MOON','ULTRASUN','ULTRAMOON'];
 function snapshot(d){
  if(!games.includes(d?.game))return null;
  const pockets=d.integrity?.checksumsValid===true&&Array.isArray(d.inventory)?d.inventory.filter(p=>p?.pocket==='ZCrystals'):[];
  const items=pockets.length===1&&Array.isArray(pockets[0].items)?pockets[0].items:null;
  const byId=new Map(),invalid=new Set();
  if(items)for(const item of items){
   if(!Number.isInteger(item?.id))continue;
   if(byId.has(item.id)||!Number.isInteger(item.count)||item.count<1||item.count>1023)invalid.add(item.id);
   byId.set(item.id,item.count);
  }
  const ids=d.game.startsWith('ULTRA')?ultra:originals;
  const entries=ids.map(id=>({id,name:names[id],state:!items||invalid.has(id)?'unknown':byId.has(id)?'present':'absent'}));
  return {entries,present:entries.filter(e=>e.state==='present').length,unknown:entries.filter(e=>e.state==='unknown').length,total:ids.length,readable:!!items};
 }
 function render(d,esc){
  const data=snapshot(d);if(!data)return '';
  return `<section class="panel" data-alola-crystals><h3>Cristales Z en la bolsa</h3><p><b>${data.readable?data.present+'/'+data.total+' tipos presentes':'Bolsillo sin lectura comprobada'}</b>${data.unknown?' · '+data.unknown+' sin lectura inequívoca':''}</p><p>Esta lista describe el bolsillo de cristales Z del diagnóstico. Los objetos equipables tienen otros identificadores y no sustituyen a los de la bolsa. Un cristal presente no certifica por sí solo una prueba, su entrega original ni un sello del pasaporte. Los cristales ligados a distribuciones o Pokémon de evento no se exigen para acreditar la historia.</p><details><summary>Ver cristales presentes, ausentes y sin lectura</summary><ul>${data.entries.map(e=>`<li data-crystal-id="${e.id}" data-crystal-state="${e.state}">${esc(e.name)} · ${e.state==='present'?'En bolsa':e.state==='absent'?'No consta en este bolsillo':'Sin lectura comprobada'}</li>`).join('')}</ul></details></section>`;
 }
 const api={names,snapshot,render};if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonAlolaInventory=api;
})(globalThis);
