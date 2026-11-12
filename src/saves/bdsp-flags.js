// SPDX-License-Identifier: GPL-3.0-or-later
/* Banderas de Diamante Brillante/Perla Reluciente (solo lectura). Estructura de PKHeX.Core 96e33e7,
   FlagWork8b: en el desplazamiento 0x4 del guardado hay 500 variables int32, 4000 banderas int32 y
   1000 banderas de sistema int32. Se usa solo tras aceptar PKHeX.Core el archivo (integridad MD5). */
(function(root){
 'use strict';
 const BASE=0x4,WORK=500,FLAGS=4000,SYSTEM=1000,SYS_OFFSET=4000;
 const BADGES=[124,125,126,127,128,129,130,131],GAME_CLEAR=5;
 function read(bytes){
  const need=BASE+(WORK+FLAGS+SYSTEM)*4;
  if(!(bytes instanceof Uint8Array)||bytes.length<need)return null;
  const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
  const work=[],activeFlags=[];let odd=0;
  for(let i=0;i<WORK;i++)work.push(v.getInt32(BASE+i*4,true));
  const flag=(i,ofs)=>{const x=v.getInt32(ofs,true);if(x!==0&&x!==1)odd++;return x===1;};
  for(let i=0;i<FLAGS;i++)if(flag(i,BASE+(WORK+i)*4))activeFlags.push(i);
  const system=[];for(let i=0;i<SYSTEM;i++)if(flag(i,BASE+(WORK+FLAGS+i)*4)){system.push(i);activeFlags.push(SYS_OFFSET+i);}
  // Las banderas son 0 o 1; otros valores indican que la estructura no corresponde y la lectura se descarta.
  if(odd>0)return null;
  return {events:{flagCount:FLAGS+SYSTEM,activeFlags,work,systemOffset:SYS_OFFSET,method:'FlagWork8b de PKHeX: banderas y sistema como int32'},
   badgesTotal:BADGES.filter(i=>system.includes(i)).length,gameClear:system.includes(GAME_CLEAR)};
 }
 const api={read,SYS_OFFSET};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonBDSPFlags=api;
})(globalThis);
