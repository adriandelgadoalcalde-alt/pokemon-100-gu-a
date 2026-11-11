// SPDX-License-Identifier: GPL-3.0-or-later
/* Posición actual del jugador en HeartGold/SoulSilver, Diamante/Perla y Platino (solo lectura).
   HGSS: LocalFieldData.currentPosition tras SaveVarsFlags (0xDE4 + 0x44C + 4 de suma) = 0x1234 (pokeheartgold).
   Platino: FieldOverworldState.player tras SaveVarsFlags y Poké-reloj = 0x1280 (pokeplatinum).
   Diamante/Perla: el mismo bloque de situación en 0x1238 (M/X/Y de SAV4DP.cs); mapas de sMapHeaders (pokediamond).
   La copia activa se elige como en hgss-integrity.js: contadores del pie y suma CRC válida. */
(function(root){
 'use strict';
 // footer: bytes del pie excluidos de la suma (HGSS 0x10; Platino 0x14, como SAV4.cs de PKHeX); contadores en end-0x14 y end-0x10.
 const LAYOUT={HEARTGOLD:{size:0xF628,pos:0x1234,maps:'HGSS',footer:0x10},SOULSILVER:{size:0xF628,pos:0x1234,maps:'HGSS',footer:0x10},PLATINUM:{size:0xCF2C,pos:0x1280,maps:'PT',footer:0x14},
  DIAMOND:{size:0xC100,pos:0x1238,maps:'DP',footer:0x14},PEARL:{size:0xC100,pos:0x1238,maps:'DP',footer:0x14}};
 const data=()=>root.PokemonDSMaps||(typeof module==='object'&&module.exports?require('./ds-maps-data.js'):null);
 const integrity=()=>root.PokemonHGSSIntegrity||(typeof module==='object'&&module.exports?require('./hgss-integrity.js'):null);
 function activeBase(bytes,size,footer){
  const I=integrity();if(!I||bytes.length!==0x80000)return null;
  const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),u32=o=>v.getUint32(o,true);
  const c=[0,0x40000].map(base=>{const end=base+size;
   const ok=u32(end-12)===size&&I.crc16(bytes.subarray(base,end-footer))===v.getUint16(end-2,true);
   return {base,ok,major:u32(end-20),minor:u32(end-16)};}).filter(x=>x.ok);
  if(!c.length)return null;
  return c.reduce((a,b)=>(I.counterOrder(a.major,b.major)||I.counterOrder(a.minor,b.minor))<0?b:a).base;
 }
 // Game Boy (versiones internacionales): pokered wCurMap/wYCoord/wXCoord tras wMapPalOffset (badges 0x2602 de PKHeX);
 // pokegold/pokecrystal wMapGroup..wXCoord: 4 + 30 bytes (wScreenSave) antes del equipo (Party de PKHeX).
 const GB={RED:{maps:'RB',map:0x260A,y:0x260D,x:0x260E},BLUE:{maps:'RB',map:0x260A,y:0x260D,x:0x260E},YELLOW:{maps:'Y',map:0x260A,y:0x260D,x:0x260E},
  GOLD:{maps:'GS',group:0x2868},SILVER:{maps:'GS',group:0x2868},CRYSTAL:{maps:'C',group:0x2843}};
 function readGB(bytes,game,languageId){
  const G=GB[game],D=data();if(!G||!D||bytes.length<0x8000||languageId===1||languageId===8)return null;
  if(G.group){const key=bytes[G.group]+'.'+bytes[G.group+1],entry=D[G.maps].maps[key];if(!entry)return null;
   return {mapId:key,map:entry[1],name:D[G.maps].names[entry[0]],x:bytes[G.group+3],y:bytes[G.group+2],source:'gb-location'};}
  const id=bytes[G.map],entry=D[G.maps].maps[id];if(!entry)return null;
  return {mapId:id,map:entry[1],name:D[G.maps].names[entry[0]],x:bytes[G.x],y:bytes[G.y],source:'gb-location'};
 }
 // Negro 2/Blanco 2: bloque 28 «Trainer Position» de SaveBlockAccessor5B2W2 (0x19500, 0xA8 bytes, CRC16 en 0x195AA);
 // PlayerPosition5: mapa int32 en +0x80, X en +0x86, Y en +0x8E. Zonas: research/gen5/b2w2-zones.json.
 // La zona de Ciudad Negra es la misma en Blanco 2, donde el lugar es el Bosque Blanco (índice 51).
 const GEN5={BLACK2:{block:0x19500,len:0xA8,chk:0x195AA,maps:'B2W2'},WHITE2:{block:0x19500,len:0xA8,chk:0x195AA,maps:'B2W2',swap:{50:51}}};
 function readGen5(bytes,game){
  const G=GEN5[game],D=data(),I=integrity();if(!G||!D||!I||bytes.length<0x26000)return null;
  const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
  if(I.crc16(bytes.subarray(G.block,G.block+G.len))!==v.getUint16(G.chk,true))return null;
  const mapId=v.getInt32(G.block+0x80,true),entry=D[G.maps].maps[mapId];if(!entry)return null;
  const index=G.swap?.[entry[0]]??entry[0];
  return {mapId,map:entry[1],name:D[G.maps].names[index],x:v.getUint16(G.block+0x86,true),y:v.getUint16(G.block+0x8E,true),source:'ds-location'};
 }
 function read(bytes,game,base,languageId){
  if(GEN5[game])return bytes instanceof Uint8Array?readGen5(bytes,game):null;
  if(GB[game])return bytes instanceof Uint8Array?readGB(bytes,game,languageId):null;
  const L=LAYOUT[game],D=data();if(!L||!D||!(bytes instanceof Uint8Array))return null;
  const b=Number.isInteger(base)?base:activeBase(bytes,L.size,L.footer);if(b===null||b===undefined)return null;
  const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),o=b+L.pos;
  const mapId=v.getInt32(o,true),entry=D[L.maps].maps[mapId];
  if(!entry)return null;
  return {mapId,map:entry[1],name:D[L.maps].names[entry[0]],x:v.getInt32(o+8,true),y:v.getInt32(o+12,true),source:'ds-location'};
 }
 const api={read,LAYOUT,GEN5};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonDSLocation=api;
})(globalThis);
