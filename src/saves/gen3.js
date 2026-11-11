// SPDX-License-Identifier: GPL-3.0-or-later
/* Lector de campo de la tercera generación: solo lectura y en el dispositivo.
   Estructura y offsets según PKHeX.Core 96e33e7 (SAV3, SaveBlock3Large*, PokeCrypto)
   y pret (struct SaveBlock1/WarpData). Nunca modifica los bytes recibidos. */
(function(root){
 'use strict';
 const SECTOR=0x1000,USED=0xF80,MAIN=14*SECTOR,SIGNATURE=0x08012025;
 const LAYOUT={
  E:{party:0x234,flags:0x1270,flagCount:2400,vars:0x139C},
  RS:{party:0x234,flags:0x1220,flagCount:2304,vars:0x1340},
  FRLG:{party:0x034,flags:0x0EE0,flagCount:2304,vars:0x1000}
 };
 // Posición del subbloque de crecimiento (especie) según PID % 24; PKHeX PokeCrypto.BlockPosition[sv*4].
 const GROWTH=[0,0,0,0,0,0,1,1,2,3,2,3,1,1,2,3,2,3,1,1,2,3,2,3];
 const u16=(b,o)=>b[o]|b[o+1]<<8,u32=(b,o)=>(b[o]|b[o+1]<<8|b[o+2]<<16|b[o+3]<<24)>>>0;
 const s8=v=>v>127?v-256:v;
 function fail(message){const e=Error(message);e.code='GEN3_FIELD_UNAVAILABLE';return e;}
 function checksum(b,o){let sum=0;for(let i=0;i<USED;i+=4)sum=(sum+u32(b,o+i))>>>0;return ((sum&0xFFFF)+(sum>>>16))&0xFFFF;}
 function slot(b,index){
  const start=index*MAIN,ids=new Map();let counter=null;
  for(let s=0;s<14;s++){
   const o=start+s*SECTOR,id=u16(b,o+0xFF4);
   if(id>=14||ids.has(id))return null;
   ids.set(id,{offset:o,valid:u32(b,o+0xFF8)===SIGNATURE&&u16(b,o+0xFF6)===checksum(b,o)});
   if(id===0)counter=u32(b,o+0xFFC);
  }
  return {index,ids,counter,valid:[...ids.values()].every(x=>x.valid)};
 }
 function newer(a,b){
  // SAV3BlockDetection.CompareCounters: el contador mayor es más reciente; 0xFFFFFFFF solo vale como desbordamiento.
  if(a.counter===0xFFFFFFFF&&b.counter!==0xFFFFFFFE)return b;
  if(b.counter===0xFFFFFFFF&&a.counter!==0xFFFFFFFE)return a;
  return b.counter>a.counter?b:a;
 }
 function join(b,ids,from,to){
  const out=new Uint8Array((to-from+1)*USED);
  for(let id=from;id<=to;id++)out.set(b.subarray(ids.get(id).offset,ids.get(id).offset+USED),(id-from)*USED);
  return out;
 }
 function family(small){
  const key=u32(small,0xAC);
  if(key===1)return 'FRLG';
  if(key===0)return 'RS';
  for(let i=0x890;i<0xF2C;i++)if(small[i])return 'E';
  return 'RS';
 }
 function nationalSpecies(raw,data){
  const t=data.species;
  if(raw<t.aligned)return raw;
  const shift=raw-t.firstUnaligned;
  return shift>=0&&shift<t.deltas.length?raw+t.deltas[shift]:0;
 }
 function mon(b,o,data){
  const pid=u32(b,o),otid=u32(b,o+4),flags=b[o+0x13];
  if(!pid&&!otid&&!(flags&2))return null;
  const hasSpecies=!!(flags&2),egg=!!(flags&4),bad=!!(flags&1);
  if(!hasSpecies||bad)return null;
  const key=(pid^otid)>>>0,dec=new Uint8Array(48);
  for(let i=0;i<48;i+=4){const v=(u32(b,o+0x20+i)^key)>>>0;dec[i]=v&255;dec[i+1]=v>>>8&255;dec[i+2]=v>>>16&255;dec[i+3]=v>>>24;}
  let sum=0;for(let i=0;i<48;i+=2)sum=(sum+u16(dec,i))&0xFFFF;
  const valid=sum===u16(b,o+0x1C);
  const raw=u16(dec,GROWTH[pid%24]*12);
  return {species:valid?nationalSpecies(raw,data):null,pidLow:pid&0xFFFF,egg,checksumValid:valid};
 }
 function read(input,data=root.PokemonGen3Data){
  if(!(input instanceof Uint8Array))throw fail('Entrada no válida.');
  if(!data)throw fail('Faltan los datos de la tercera generación.');
  const warnings=[];let b=input;
  if(b.length>0x20000&&b.length<=0x20000+0x40){warnings.push('Se ignoran '+(b.length-0x20000)+' bytes añadidos por el emulador al final del archivo.');b=b.subarray(0,0x20000);}
  if(b.length!==0x20000&&b.length!==0x10000)throw fail('No es un guardado de GBA de 64 o 128 KiB.');
  const slots=[slot(b,0),b.length===0x20000?slot(b,1):null].filter(Boolean);
  const complete=slots.filter(s=>s.ids.size===14);
  if(!complete.length)throw fail('No hay una copia completa de la partida.');
  const active=complete.length===2?newer(complete[0],complete[1]):complete[0];
  if(!active.valid)throw fail('La copia más reciente tiene sectores con checksum inválido. No se interpreta para no mostrar datos falsos.');
  const small=join(b,active.ids,0,0),large=join(b,active.ids,1,4),storage=join(b,active.ids,5,13);
  const fam=family(small),L=LAYOUT[fam];
  const party=[],count=Math.min(large[L.party],6);
  for(let i=0;i<count;i++){const m=mon(large,L.party+4+i*100,data);if(m)party.push({slot:i+1,...m});}
  const boxes=[];
  for(let box=0;box<14;box++)for(let s=0;s<30;s++){
   const m=mon(storage,4+(box*30+s)*80,data);if(m)boxes.push({box:box+1,slot:s+1,...m});
  }
  // Salón de la Fama: sectores extra 0x1C000/0x1D000 (pret SECTOR_ID_HOF_1/2), suma comprobada como
  // PKHeX IsSectorValidExtra. Equipos de 6×20 bytes; se cuentan los que tienen especie en el primer hueco.
  let hallOfFame=null;
  if(b.length===0x20000){
   const valid=[0x1C000,0x1D000].every(o=>u16(b,o+0xFF4)===checksum(b,o));
   if(valid){
    const hof=new Uint8Array(2*USED);hof.set(b.subarray(0x1C000,0x1C000+USED));hof.set(b.subarray(0x1D000,0x1D000+USED),USED);
    let teams=0;for(let t=0;t<50;t++)if(u16(hof,t*120+8)&0x1FF)teams++;
    hallOfFame={teams,max:50};
   }
  }
  const activeFlags=[];for(let n=0;n<L.flagCount;n++)if(large[L.flags+(n>>3)]&1<<(n&7))activeFlags.push(n);
  const vars=[];for(let i=0;i<256;i++)vars.push(u16(large,L.vars+i*2));
  const fam3=data.families[fam];
  const mapKey=s8(large[4])+'.'+s8(large[5]),mapEntry=fam3.maps[mapKey];
  return {
   schema:'gen3-field/1',family:fam,games:data.gameFamilies[fam],
   integrity:{activeSlot:active.index,saveCounter:active.counter,sectorsValid:true,copies:complete.length},
   location:{mapGroup:s8(large[4]),mapNum:s8(large[5]),x:u16(large,0)<<16>>16,y:u16(large,2)<<16>>16,
    name:mapEntry?data.locationNames[mapEntry[0]]:null,map:mapEntry?mapEntry[1]:null},
   party,boxes,flags:activeFlags,vars,warnings,hallOfFame
  };
 }
 const api={read,LAYOUT};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonGen3Field=api;
})(globalThis);
