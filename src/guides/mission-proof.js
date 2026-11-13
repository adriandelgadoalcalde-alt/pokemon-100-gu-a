// SPDX-License-Identifier: GPL-3.0-or-later
/* Qué demuestra la partida en cada misión de la ruta.
   - Las misiones de historia con fila en los paquetes de eventos usan esa fila (event-guide.js).
   - Una misión de historia queda hecha si la partida demuestra un hito de historia posterior o el final de la historia.
   - Las misiones posteriores a la Liga quedan hechas cuando lo están los objetivos de maestría que resumen (la lista de
     abajo, con los mismos identificadores que MASTER_DATA de atlas.html); «no» si alguno de ellos es un «no» de la
     partida; si falta algún dato, la guía lo pregunta.
   Una misión sin entrada aquí y sin fila de historia se marca a mano. */
(function(root){
 'use strict';
 const sp=(...ids)=>ids.map(i=>'pokemon-'+i),cards=n=>Array.from({length:n},(_,i)=>'card-'+i);
 const gen1={'15':sp(144,145,146,150),'16':['pokedex','medal-type'],'DETAIL1':sp(144,145,146,150)};
 const gen2={'13':['postgame'],'14':sp(243,244,245,249,250),'15':['pokedex','collect-unown']};
 const hoenn={'13':['postgame'],'14':['battle0','battle1']};
 const frlg={'15':sp(144,145,146,150),'16':['pokedex','card-1','card-2'],'E01':['sevii-gems']};
 const sinnoh={'11':['postgame'],'12':['pokedex','card-2','card-3']};
 const hgss=(legend,orb)=>({'14':[...sp(243,244,245,249,250),...sp(...legend)],'15':['pokedex','collect-unown'],'E01':sp(245),
  'E02':['orb-red-blue',...sp(orb)],'E03':['unown'],'DETAIL1':['orb-red-blue']});
 const bw={'10':['postgame'],'11':['card-1','card-2','card-3','card-4']};
 const b2w2=tower=>({'10':['postgame'],'11':['medals','pokedex'],'E01':['medals'],'E02':['card-2','pwt'],'N2':[tower,...sp(377,378,379)],'N3':['oval-charm']});
 const kalos={'10':['postgame','items0'],'11':['card-1','card-2'],'DETAIL1':['postgame']};
 const oras={'13':['postgame'],'14':['battle0','battle1'],'E01':sp(384,386),'DETAIL1':sp(384,386)};
 const alola={'09':['postgame'],'10':[...cards(15),'zygarde-cells','zygarde-cores']};
 const ultra={'09':['postgame'],'10':[...cards(15),'stickers'],'E01':['rocket'],'DETAIL1':['rocket','stickers']};
 const lgpe={'05':sp(144,145,146,150),'06':['battle0','pokedex']};
 const galar={'07':['postgame'],'08':sp(891,892),'09':['event-1'],'10':['pokedex','battle0']};
 const bdsp={'11':['postgame'],'12':['pokedex','card-2','card-3']};
 const sv={'08':['battle0'],'09':['dlc-ogerpon'],'10':['dlc-terapagos'],'11':['pecharunt'],'12':['pokedex'],'DETAIL1':['dlc-terapagos']};
 const byFamily={RED:gen1,GREEN:gen1,BLUE:gen1,YELLOW:gen1,GOLD:gen2,SILVER:gen2,CRYSTAL:{...gen2,'DETAIL1':sp(243,244,245)},
  RUBY:hoenn,SAPPHIRE:hoenn,EMERALD:{...hoenn,'DETAIL1':sp(377,378,379),'DETAIL2':['card-3']},FIRERED:frlg,LEAFGREEN:frlg,
  DIAMOND:sinnoh,PEARL:sinnoh,PLATINUM:{...sinnoh,'DETAIL1':sp(487)},HEARTGOLD:hgss([382,380],382),SOULSILVER:hgss([383,381],383),
  BLACK:bw,WHITE:bw,BLACK2:b2w2('black-tower'),WHITE2:b2w2('treehollow'),X:kalos,Y:kalos,OMEGARUBY:oras,ALPHASAPPHIRE:oras,
  SUN:alola,MOON:alola,ULTRASUN:ultra,ULTRAMOON:ultra,LETGOP:lgpe,LETGOE:lgpe,SWORD:galar,SHIELD:galar,BD:bdsp,SP:bdsp,
  ARCEUS:{'08':['postgame'],'09':['pokedex',...sp(493)],'10':['wisps','unown'],'DETAIL1':sp(493)},SCARLET:sv,VIOLET:sv,
  ZA:{'07':['mega-dimension'],'08':['pokedex','medal-type'],'DETAIL1':['mega-dimension']}};
 // Objetivos de maestría que resume una misión (null si la misión no tiene regla).
 function goalsFor(gameId,missionId){
  const key=missionId.slice(gameId.length+1);
  return byFamily[gameId]?.[key]||null;
 }
 // Combina el estado de la partida de cada objetivo: true si todos son true, false si alguno es false, null si no se sabe.
 function combine(values){
  if(!values.length)return null;
  if(values.some(v=>v===false))return false;
  return values.every(v=>v===true)?true:null;
 }
 // Estado de cada misión según la partida. storyRows: filas de event-guide (id, state); goalSays(id): true/false/null;
 // storyClear: true/false/null (final de la historia según la partida).
 function evaluate(game,{storyRows=[],goalSays=()=>null,storyClear=null}={}){
  const out=new Map(),rows=new Map(storyRows.map(r=>[r.id,r]));
  for(const m of game.missions){
   const row=rows.get(m.id);
   if(row){out.set(m.id,{value:row.state!=='pending',why:row.state==='direct'?'Hito leído en tu partida: '+row.label:row.state==='derived'?'Tu partida tiene un hito posterior':'Tu partida aún no tiene este hito: '+row.label});continue;}
   const goals=goalsFor(game.id,m.id);
   if(goals){const v=combine(goals.map(goalSays));out.set(m.id,{value:v,why:v===true?'Lo demuestra tu partida':v===false?'Según tu partida, aún falta':'Tu partida no guarda todo lo que pide esta misión'});}
  }
  // Historia: un hito posterior o el final de la historia demuestran las misiones anteriores.
  const story=game.missions.filter(m=>m.section==='Historia');
  for(let i=story.length-1;i>=0;i--){
   const m=story[i],cur=out.get(m.id);if(cur?.value===true)continue;
   const later=story.slice(i+1).some(x=>out.get(x.id)?.value===true&&rows.get(x.id)?.state!=='pending');
   if(storyClear===true||later)out.set(m.id,{value:true,why:storyClear===true?'Tu partida tiene la historia terminada':'Tu partida tiene un hito posterior'});
  }
  return out;
 }
 const api={goalsFor,evaluate,byFamily};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonMissionProof=api;
})(typeof globalThis==='object'?globalThis:this);
