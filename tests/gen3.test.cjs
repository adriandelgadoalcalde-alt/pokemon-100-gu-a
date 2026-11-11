// Pruebas sintéticas del lector de campo y del motor de la 3.ª generación. Ningún dato procede de partidas reales.
const test=require('node:test'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const data=require('../src/saves/gen3-data.js'),gen3=require('../src/saves/gen3.js'),guide=require('../src/engine/gen3-guide.js');
const SECTOR=0x1000,USED=0xF80;
function checksum(b,o){let s=0;for(let i=0;i<USED;i+=4)s=(s+(b[o+i]|b[o+i+1]<<8|b[o+i+2]<<16|b[o+i+3]<<24))>>>0;return ((s&0xFFFF)+(s>>>16))&0xFFFF;}
function encryptMon(view,o,pid,otid,species,egg=false){
 view.setUint32(o,pid,true);view.setUint32(o+4,otid,true);view.setUint8(o+0x13,2|(egg?4:0));
 const dec=new Uint8Array(48),growth=[0,0,0,0,0,0,1,1,2,3,2,3,1,1,2,3,2,3,1,1,2,3,2,3][pid%24];
 new DataView(dec.buffer).setUint16(growth*12,species,true);
 let sum=0;for(let i=0;i<48;i+=2)sum=(sum+(dec[i]|dec[i+1]<<8))&0xFFFF;view.setUint16(o+0x1C,sum,true);
 const key=(pid^otid)>>>0,dv=new DataView(dec.buffer);for(let i=0;i<48;i+=4)view.setUint32(o+0x20+i,(dv.getUint32(i,true)^key)>>>0,true);
}
// Construye un guardado de 128 KiB con dos copias; cada copia recibe sus bloques small/large/storage.
function build({family='E',counters=[1,2],flags=[],vars={},party=[],box=[],map=[0,9],corrupt=null}={}){
 const bytes=new Uint8Array(0x20000);
 counters.forEach((counter,slot)=>{
  const small=new Uint8Array(USED),large=new Uint8Array(4*USED),storage=new Uint8Array(9*USED);
  const sv=new DataView(small.buffer),lv=new DataView(large.buffer),st=new DataView(storage.buffer);
  if(family==='FRLG')sv.setUint32(0xAC,1,true);else if(family==='E'){sv.setUint32(0xAC,0x12345678,true);small[0x900]=1;}
  const L=gen3.LAYOUT[family];
  large[4]=map[0];large[5]=map[1];lv.setInt16(0,7,true);lv.setInt16(2,9,true);
  for(const n of flags)large[L.flags+(n>>3)]|=1<<(n&7);
  for(const [i,v]of Object.entries(vars))lv.setUint16(L.vars+i*2,v,true);
  large[L.party]=party.length;party.forEach((m,i)=>encryptMon(lv,L.party+4+i*100,m.pid,m.otid||0x1234,m.species,m.egg));
  box.forEach((m,i)=>encryptMon(st,4+i*80,m.pid,m.otid||0x1234,m.species));
  for(let id=0;id<14;id++){
   const o=slot*14*SECTOR+id*SECTOR;
   const src=id===0?small:id<=4?large.subarray((id-1)*USED,id*USED):storage.subarray((id-5)*USED,(id-4)*USED);
   bytes.set(src,o);const v=new DataView(bytes.buffer);
   v.setUint16(o+0xFF4,id,true);v.setUint32(o+0xFF8,0x08012025,true);v.setUint32(o+0xFFC,counter,true);
   v.setUint16(o+0xFF6,checksum(bytes,o),true);
  }
 });
 if(corrupt!==null)bytes[corrupt]^=0xFF;
 return bytes;
}
const E=data.families.E,RS=data.families.RS,FRLG=data.families.FRLG;
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');

test('elige la copia con el contador más reciente y lee ubicación, equipo y especies nacionales',()=>{
 const bytes=build({counters:[5,9],party:[{pid:0xAB12CD34,species:280},{pid:7,species:25}],map:[0,9]});
 const before=hash(bytes),r=gen3.read(bytes,data);
 assert.equal(hash(bytes),before);
 assert.equal(r.family,'E');assert.equal(r.integrity.activeSlot,1);assert.equal(r.integrity.saveCounter,9);
 // Especie interna 280 = Torchic (#255) según la tabla fijada de PKHeX.
 assert.deepEqual(r.party.map(p=>p.species),[255,25]);
 assert.equal(r.party[0].pidLow,0xCD34);
 assert.equal(r.location.name,data.locationNames[E.maps['0.9'][0]]);
 assert.equal(r.location.x,7);
});

test('rechaza la copia más reciente con un sector alterado y no recurre a progreso antiguo',()=>{
 const bytes=build({counters:[1,2],corrupt:14*SECTOR+5*SECTOR+10});
 assert.throws(()=>gen3.read(bytes,data),e=>e.code==='GEN3_FIELD_UNAVAILABLE'&&/checksum/.test(e.message));
});

test('acepta los 16 bytes de reloj añadidos por emuladores y avisa',()=>{
 const base=build(),bytes=new Uint8Array(0x20010);bytes.set(base);
 const r=gen3.read(bytes,data);
 assert.equal(r.family,'E');assert.match(r.warnings[0],/16 bytes/);
});

test('distingue Rubí/Zafiro y Rojo Fuego/Verde Hoja por el bloque pequeño',()=>{
 assert.equal(gen3.read(build({family:'RS'}),data).family,'RS');
 assert.equal(gen3.read(build({family:'FRLG'}),data).family,'FRLG');
});

test('las medallas resueltas desde pret coinciden con el inicio de PKHeX en cada familia',()=>{
 assert.equal(E.flags.FLAG_BADGE01_GET,0x867);assert.equal(RS.flags.FLAG_BADGE01_GET,0x807);assert.equal(FRLG.flags.FLAG_BADGE01_GET,0x820);
 assert.equal(E.vars.VAR_MIRAGE_RND_H,0x24);assert.equal(FRLG.vars.VAR_MIRAGE_RND_H,undefined);
});

test('Isla Espejismo: hoy, desde la caja y en días futuros con el generador del juego',()=>{
 let rnd=0x1234ABCD>>>0;const future=[];for(let d=1;d<=3;d++){rnd=guide.nextRnd(rnd);future.push(rnd>>>16);}
 const vars={[E.vars.VAR_MIRAGE_RND_H]:0x1234,[E.vars.VAR_MIRAGE_RND_L]:0xABCD};
 const r=gen3.read(build({vars,party:[{pid:0x00001234,species:25}],box:[{pid:0x0000FFFF&future[2],species:1}]}),data);
 const m=guide.mirage(r,data);
 assert.equal(m.today,0x1234);assert.equal(m.visibleToday.length,1);assert.equal(m.fromBoxToday.length,0);
 assert.ok(m.upcoming.some(u=>u.day===3&&u.mons.some(x=>x.box===1)));
 assert.equal(guide.nextRnd(0),12345);
});

test('Rubí/Zafiro: ocultar al Regi cuenta como encuentro consumido; Esmeralda exige la bandera de resultado',()=>{
 const rs=gen3.read(build({family:'RS',flags:[RS.flags.FLAG_HIDE_REGIROCK]}),data);
 assert.equal(guide.analyze(rs,'RUBY').secrets.find(s=>s.id==='gen3.regirock').status,'completado');
 const e=gen3.read(build({flags:[E.flags.FLAG_SYS_REGIROCK_PUZZLE_COMPLETED]}),data);
 assert.equal(guide.analyze(e,'EMERALD').secrets.find(s=>s.id==='gen3.regirock').status,'en curso');
});

test('Rojo Fuego: derrotar a Deoxys lo marca como perdido, no como capturado',()=>{
 const r=gen3.read(build({family:'FRLG',flags:[FRLG.flags.FLAG_DEOXYS_FLEW_AWAY]}),data);
 assert.equal(guide.analyze(r,'FIRERED').secrets.find(s=>s.id==='gen3.frlg.birth_island').status,'perdido');
});

test('historia: un hito posterior deduce los anteriores y el siguiente pendiente es el primero sin bandera',()=>{
 const r=gen3.read(build({flags:[E.flags.FLAG_SYS_POKEMON_GET,E.flags.FLAG_BADGE03_GET]}),data);
 const s=guide.analyze(r,'EMERALD').story;
 assert.equal(s.rows[1].state,'derived');assert.equal(s.rows[3].state,'direct');
 assert.equal(s.next.id,'EMERALD-05');
});

test('una lectura de otra familia no se aplica a la edición elegida',()=>{
 const r=gen3.read(build({family:'FRLG'}),data);
 assert.equal(guide.analyze(r,'EMERALD').mismatch,true);
});

test('el recomendador usa la bandera de historia del guardado',()=>{
 const route=require('../src/engine/route.js');
 const r=gen3.read(build({flags:[E.flags.FLAG_SYS_POKEMON_GET,E.flags.FLAG_BADGE01_GET]}),data);
 const game={id:'EMERALD',mainStoryLastMission:'EMERALD-12',missions:Array.from({length:14},(_,i)=>({id:'EMERALD-'+String(i+1).padStart(2,'0'),section:i<12?'Historia':'Postgame',steps:['x']}))};
 const next=route.nextMission(game,{field:r,caught:[]},()=>false,()=>false);
 assert.equal(next.mission.id,'EMERALD-03');assert.match(next.reason,/Medalla Puño/);
});

test('Salón de la Fama: cuenta equipos con suma válida y no inventa con sectores dañados',()=>{
 const bytes=build({flags:[E.flags.FLAG_SYS_GAME_CLEAR]}),v=new DataView(bytes.buffer);
 for(const [o,teams] of [[0x1C000,[0,1,2]],[0x1D000,[]]]){for(const t of teams)v.setUint16(o+t*120+8,280,true);v.setUint16(o+0xFF4,checksum(bytes,o),true);}
 const r=gen3.read(bytes,data);assert.equal(r.hallOfFame.teams,3);
 assert.equal(guide.analyze(r,'EMERALD').secrets.find(s=>s.id==='gen3.hall_of_fame').status,'completado');
 bytes[0x1C010]^=1;assert.equal(gen3.read(bytes,data).hallOfFame,null);
});

test('Frente Batalla: los símbolos se resuelven como base + instalación × 2',()=>{
 assert.equal(E.flags.FLAG_SYS_DOME_SILVER,E.flags.FLAG_SYS_TOWER_SILVER+2);
 assert.equal(E.flags.FLAG_SYS_PYRAMID_GOLD,E.flags.FLAG_SYS_TOWER_GOLD+12);
});
