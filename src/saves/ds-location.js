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
 // Negro/Blanco: el mismo bloque 28 «Trainer Position» con 0x9C bytes y CRC16 en 0x1959E (SaveBlockAccessor5BW).
 const GEN5={BLACK2:{block:0x19500,len:0xA8,chk:0x195AA,maps:'B2W2'},WHITE2:{block:0x19500,len:0xA8,chk:0x195AA,maps:'B2W2',swap:{50:51}},
  BLACK:{block:0x19500,len:0x9C,chk:0x1959E,maps:'BW'},WHITE:{block:0x19500,len:0x9C,chk:0x1959E,maps:'BW',swap:{50:51}}};
 function readGen5(bytes,game){
  const G=GEN5[game],D=data(),I=integrity();if(!G||!D||!I||bytes.length<0x26000)return null;
  const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
  if(I.crc16(bytes.subarray(G.block,G.block+G.len))!==v.getUint16(G.chk,true))return null;
  const mapId=v.getInt32(G.block+0x80,true),entry=D[G.maps].maps[mapId];if(!entry)return null;
  const index=G.swap?.[entry[0]]??entry[0];
  return {mapId,map:entry[1],name:D[G.maps].names[index],x:v.getUint16(G.block+0x86,true),y:v.getUint16(G.block+0x8E,true),source:'ds-location'};
 }
 // X/Y y ROZA: bloque 4 «Situation» (0x1400, 0x150 bytes); suma CRC16-CCITT en la tabla de bloques del final
 // (tamaño-0x200 + 0x14 + id*8 + 6), como BlockInfo6 de PKHeX. Situation6: mapa u16 en +2, X float en +0x10, Y en +0x18.
 const GEN6={X:{size:0x65600,maps:'XY'},Y:{size:0x65600,maps:'XY'},OMEGARUBY:{size:0x76000,maps:'ORAS'},ALPHASAPPHIRE:{size:0x76000,maps:'ORAS'}};
 function readGen6(bytes,game){
  const G=GEN6[game],D=data(),I=integrity();if(!G||!D||!I||bytes.length!==G.size)return null;
  const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),block=0x1400,info=G.size-0x200+0x14+4*8;
  if(v.getUint32(G.size-0x200+0x10,true)!==0x42454546||v.getUint16(info+4,true)!==4)return null;
  if(I.crc16(bytes.subarray(block,block+0x150))!==v.getUint16(info+6,true))return null;
  const mapId=v.getUint16(block+2,true),entry=D[G.maps].maps[mapId];if(!entry)return null;
  return {mapId,map:entry[1],name:D[G.maps].names[entry[0]],x:Math.round(v.getFloat32(block+0x10,true)),y:Math.round(v.getFloat32(block+0x18,true)),source:'ds-location'};
 }
 // Ultrasol/Ultraluna: bloque 1 «Situation» (0x1000, 0x7C bytes); suma CRC16 reflejada e invertida (BlockInfo7 de PKHeX)
 // en la tabla de bloques del final. Situation7: mapa u16 en +0, X float en +8, Y en +0x10. Zonas: research/gen7/usum-zones.json.
 // Sol/Luna numeran sus zonas de otra forma y no hay copia de esos juegos: sin ubicación.
 const GEN7={ULTRASUN:{size:0x6CC00,maps:'USUM'},ULTRAMOON:{size:0x6CC00,maps:'USUM'}};
 const CRC7=(()=>{const t=[];for(let i=0;i<256;i++){let c=i;for(let k=0;k<8;k++)c=c&1?(c>>>1)^0xA001:c>>>1;t.push(c);}return t;})();
 const crc16inv=d=>{let c=0xFFFF;for(const b of d)c=CRC7[(b^c)&0xFF]^(c>>>8);return (~c)&0xFFFF;};
 function readGen7(bytes,game){
  const G=GEN7[game],D=data();if(!G||!D||bytes.length!==G.size)return null;
  const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),block=0x1000,info=G.size-0x200+0x14+1*8;
  if(v.getUint32(G.size-0x200+0x10,true)!==0x42454546||v.getUint16(info+4,true)!==1)return null;
  if(crc16inv(bytes.subarray(block,block+0x7C))!==v.getUint16(info+6,true))return null;
  const mapId=v.getUint16(block,true),entry=D[G.maps].maps[mapId];if(!entry)return null;
  return {mapId,map:entry[1],name:D[G.maps].names[entry[0]],x:Math.round(v.getFloat32(block+8,true)),y:Math.round(v.getFloat32(block+0x10,true)),source:'ds-location'};
 }
 // Diamante Brillante/Perla Reluciente: ZoneID int16 en 0x5634 (SAV8BS de PKHeX). En BDSP el número de zona es el
 // mismo identificador que la ubicación de encuentro, así que su nombre es el de gen8b/text_bdsp_00000_es.txt.
 // Solo se llama tras aceptar PKHeX.Core el archivo (integridad MD5 del propio formato).
 const BDSP_SIZES=[0xE9828,0xEDC20,0xEED8C,0xEF0A4];
 function readBDSP(bytes){
  const D=data();if(!D||!BDSP_SIZES.includes(bytes.length))return null;
  const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),mapId=v.getInt16(0x5634,true),entry=D.BDSP.maps[mapId];
  if(!entry)return null;
  return {mapId,map:entry[1],name:D.BDSP.names[entry[0]],source:'ds-location'};
 }
 // Escarlata/Púrpura: el motor exporta KPlayerCurrentFieldID (PlayerSave_CurrentFieldId; 0 = Paldea, 1 = Noroteo,
 // 2 = Academia Arándano, según SaveBlockAccessor9SV de PKHeX). Solo da la región, no el lugar exacto.
 const SV_FIELDS=['Paldea','Noroteo','Academia Arándano'];
 function fromBlocks(game,blocks){
  if(!['SCARLET','VIOLET'].includes(game)||!blocks||typeof blocks!=='object')return null;
  const f=blocks.KPlayerCurrentFieldID;if(!Number.isInteger(f)||!SV_FIELDS[f])return null;
  return {mapId:f,map:'FIELD_'+f,name:SV_FIELDS[f],precision:'region',source:'named-blocks'};
 }
 // FNV-1a de 64 bits (los hashes de zona de Espada/Escudo), con BigInt.
 const fnv64=t=>{let h=0xCBF29CE484222645n;for(const c of t){h^=BigInt(c.charCodeAt(0));h=(h*0x100000001B3n)&0xFFFFFFFFFFFFFFFFn;}return h.toString(16).toUpperCase().padStart(16,'0');};
 let swshCache=null;
 function swshZones(){if(swshCache)return swshCache;swshCache={};const S=data()?.SWITCH;if(S)for(const code of Object.keys(S.SWSH))swshCache[fnv64(code)]=code;return swshCache;}
 let lgpeCache=null;
 function lgpeAreas(){if(lgpeCache)return lgpeCache;lgpeCache={};const S=data()?.SWITCH;if(S)for(const code of Object.keys(S.LGPE))lgpeCache[fnv64(code)]=code;return lgpeCache;}
 // Posición que exporta el motor (switchPosition, NamedBlocks.Position): Escarlata/Púrpura dan el identificador de
 // ubicación (int32 LE en el bloque PlayerSave_CurrentLocationId); Leyendas Arceus y Z-A, el nombre interno del mapa.
 function fromPosition(game,pos,blocks){
  const D=data(),S=D&&D.SWITCH;if(!S||!pos||typeof pos!=='object')return null;
  if(['SCARLET','VIOLET'].includes(game)){
   const m=/^hex:([0-9A-F]{8})/i.exec(String(pos.currentLocationId||''));
   const id=m?new DataView(Uint8Array.from(m[1].match(/../g),h=>parseInt(h,16)).buffer).getInt32(0,true):Number.isInteger(pos.currentLocationId)?pos.currentLocationId:null;
   if(id!==null&&S.SV[id])return {mapId:id,map:pos.lastRoomMapName||'LOCATION_'+id,name:S.SV[id],source:'switch-position'};
   return null;
  }
  if(game==='ARCEUS'){
   const m=/^(ha_area0[0-5])(?:_(.+))?$/.exec(String(pos.map||''));if(!m||!S.LA[m[1]])return null;
   return {mapId:m[1],map:pos.map,name:S.LA[m[1]],detail:m[2]?'dentro de un edificio o zona interior':'',source:'switch-position'};
  }
  if(['SWORD','SHIELD'].includes(game)){
   const code=swshZones()[String(pos.mapHash||'').toUpperCase()];if(!code)return null;const [name,detail]=S.SWSH[code];
   return {mapId:code,map:code,name,detail,source:'switch-position'};
  }
  if(['LETGOP','LETGOE'].includes(game)){
   const code=lgpeAreas()[String(pos.mapHash||'').toUpperCase()];if(!code)return null;const [name,detail]=S.LGPE[code];
   return {mapId:code,map:code,name,detail,source:'switch-position'};
  }
  if(game==='ZA'){
   const m=/^(t1)(?:_.*)?$/.exec(String(pos.map||''));if(!m)return null;
   return {mapId:m[1],map:pos.map,name:S.ZA[m[1]],source:'switch-position'};
  }
  return null;
 }
 function read(bytes,game,base,languageId,blocks,position){
  if(['SCARLET','VIOLET','ARCEUS','ZA','SWORD','SHIELD','LETGOP','LETGOE'].includes(game))return fromPosition(game,position,blocks)||fromBlocks(game,blocks);
  if(['BD','SP'].includes(game))return bytes instanceof Uint8Array?readBDSP(bytes):null;
  if(GEN7[game])return bytes instanceof Uint8Array?readGen7(bytes,game):null;
  if(GEN6[game])return bytes instanceof Uint8Array?readGen6(bytes,game):null;
  if(GEN5[game])return bytes instanceof Uint8Array?readGen5(bytes,game):null;
  if(GB[game])return bytes instanceof Uint8Array?readGB(bytes,game,languageId):null;
  const L=LAYOUT[game],D=data();if(!L||!D||!(bytes instanceof Uint8Array))return null;
  const b=Number.isInteger(base)?base:activeBase(bytes,L.size,L.footer);if(b===null||b===undefined)return null;
  const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),o=b+L.pos;
  const mapId=v.getInt32(o,true),entry=D[L.maps].maps[mapId];
  if(!entry)return null;
  return {mapId,map:entry[1],name:D[L.maps].names[entry[0]],x:v.getInt32(o+8,true),y:v.getInt32(o+12,true),source:'ds-location'};
 }
 const api={read,fromBlocks,fromPosition,fnv64,LAYOUT,GEN5,GEN6,GEN7,crc16inv};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonDSLocation=api;
})(globalThis);
