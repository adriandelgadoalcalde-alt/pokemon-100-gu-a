// Pruebas sintéticas del motor común de hitos y secretos (paquete de la 4.ª generación).
const test=require('node:test'),assert=require('node:assert/strict');
const guide=require('../src/engine/event-guide.js'),gen4=require('../src/saves/gen4-data.js');
const F=gen4.families.HGSS;
const events=(flags=[],vars={})=>{const work=new Array(400).fill(0);for(const [k,v]of Object.entries(vars))work[F.vars[k]]=v;return {activeFlags:flags.map(f=>F.flags[f]),work};};

test('los índices resueltos de HGSS coinciden con los documentados en la investigación previa',()=>{
 assert.equal(F.flags.FLAG_CAUGHT_ZAPDOS,0x14A);assert.equal(F.flags.FLAG_CAUGHT_MOLTRES,0x16D);assert.equal(F.flags.FLAG_CAUGHT_GROUDON,0x179);
 assert.equal(F.vars.VAR_UNK_40FD,253);assert.equal(F.vars.VAR_UNK_4131,305);assert.equal(F.vars.VAR_SCENE_EMBEDDED_TOWER,249);
});

test('la historia usa medallas y banderas, y el siguiente hito es el primero pendiente',()=>{
 const a=guide.analyze({events:events(['FLAG_GOT_STARTER']),badgesTotal:3,caught:[]},'SOULSILVER');
 assert.equal(a.story.rows[3].state,'direct');assert.equal(a.story.next.id,'SOULSILVER-05');
});

test('sin lectura de medallas el hito queda sin dato, no como cero',()=>{
 const a=guide.analyze({events:events(),caught:[]},'HEARTGOLD');
 assert.equal(a.story.rows[1].set,null);
});

test('errantes: capturado, derrotado (en curso) y sin resolver se distinguen',()=>{
 const a=guide.analyze({events:events([],{VAR_ROAMER_RAIKOU_STATUS:1,VAR_ROAMER_ENTEI_STATUS:2}),caught:[]},'HEARTGOLD');
 const s=id=>a.secrets.find(x=>x.id===id).status;
 assert.equal(s('hgss.raikou'),'completado');assert.equal(s('hgss.entei'),'en curso');assert.equal(s('hgss.latias'),'pendiente');
});

test('cada edición solo ve sus exclusivas',()=>{
 const ids=g=>guide.analyze({events:events(),caught:[]},g).secrets.map(x=>x.id);
 assert.ok(ids('SOULSILVER').includes('hgss.groudon'));assert.ok(!ids('SOULSILVER').includes('hgss.kyogre'));
 assert.ok(ids('HEARTGOLD').includes('hgss.latias'));assert.ok(!ids('HEARTGOLD').includes('hgss.latios'));
});

test('tener la especie en la Pokédex no completa el encuentro original',()=>{
 const a=guide.analyze({events:events(),caught:[145]},'SOULSILVER');
 const z=a.secrets.find(x=>x.id==='hgss.zapdos');
 assert.equal(z.status,'pendiente');assert.equal(z.species[0].caught,true);
});

test('el regalo de Oak se acredita desde la fase 3 de su variable',()=>{
 const s=v=>guide.analyze({events:events([],{VAR_UNK_4131:v}),caught:[]},'SOULSILVER').secrets.find(x=>x.id==='hgss.oak_kanto_starter').status;
 assert.equal(s(2),'pendiente');assert.equal(s(3),'completado');assert.equal(s(6),'completado');
});

test('Platino: Regis por estado de las ruinas, con no capturado como definitivo',()=>{
 const P=gen4.families.PT,work=new Array(400).fill(0);
 const regi=require('../src/saves/gen4-data.js').secrets.find(s=>s.id==='pt.regirock').conditions.PT;
 work[P.vars.VAR_ROCK_PEAK_RUINS_STATE]=regi.lostVar[0].equals;
 const a=guide.analyze({events:{activeFlags:[],work},caught:[]},'PLATINUM');
 assert.equal(a.secrets.find(x=>x.id==='pt.regirock').status,'perdido');
 work[P.vars.VAR_ROCK_PEAK_RUINS_STATE]=regi.doneVar.equals;
 assert.equal(guide.analyze({events:{activeFlags:[],work},caught:[]},'PLATINUM').secrets.find(x=>x.id==='pt.regirock').status,'completado');
});

test('Platino: la Liga se lee de su bandera de juego completado',()=>{
 const P=gen4.families.PT;
 const a=guide.analyze({events:{activeFlags:[P.flags.FLAG_GAME_COMPLETED],work:[]},badgesTotal:8,caught:[]},'PLATINUM');
 assert.equal(a.story.next,null);assert.equal(a.story.rows.at(-1).state,'direct');
});

test('Game Boy: eventos con nombre y exclusión de idiomas sin fuente',()=>{
 const gb=require('../src/saves/gen12-data.js'),C=gb.families.C;
 const ev={activeFlags:[C.flags.EVENT_GOT_A_POKEMON_FROM_ELM,C.flags.EVENT_BEAT_FALKNER],work:[]};
 const a=guide.analyze({events:ev,caught:[]},'CRYSTAL');
 assert.equal(a.story.next.id,'CRYSTAL-03');
 assert.equal(guide.analyze({events:ev,caught:[],languageId:1},'CRYSTAL'),null);
 const ho=a.secrets.find(s=>s.id==='gen2.hooh.c');assert.match(ho.requires,/Raikou, Entei y Suicune/);
});

test('Game Boy: el Dojo acredita cualquiera de los dos regalos',()=>{
 const gb=require('../src/saves/gen12-data.js'),R=gb.families.RB;
 const a=guide.analyze({events:{activeFlags:[R.flags.EVENT_GOT_HITMONCHAN],work:[]},caught:[]},'RED');
 assert.equal(a.secrets.find(s=>s.id==='gen1.dojo').status,'completado');
});

test('PKHeX: las exclusivas siguen la etiqueta de versión y la historia por medallas guía desde el principio',()=>{
 const pk=require('../src/saves/pkhex-data.js'),O=pk.families.ORAS;
 const ids=g=>guide.analyze({events:{activeFlags:[],work:[]},caught:[]},g).secrets.map(s=>s.title);
 assert.ok(ids('OMEGARUBY').includes('Groudon'));assert.ok(!ids('OMEGARUBY').includes('Kyogre'));
 const route=require('../src/engine/route.js');
 const game={id:'BLACK',mainStoryLastMission:'BLACK-09',missions:Array.from({length:11},(_,i)=>({id:'BLACK-'+String(i+1).padStart(2,'0'),section:i<9?'Historia':'Postgame',steps:['x']}))};
 const r=route.nextMission(game,{events:{activeFlags:[],work:[]},badgesTotal:0,caught:[]},()=>false,()=>false);
 assert.equal(r.mission.id,'BLACK-02');
 const u=route.nextMission({...game,id:'SUN',mainStoryLastMission:'SUN-08',missions:game.missions.map(m=>({...m,id:m.id.replace('BLACK','SUN')}))},{events:{activeFlags:[],work:[]},caught:[]},()=>false,()=>false);
 assert.equal(u.mission.id,'SUN-01');
 const B=pk.families.BW,hall=pk.story.BW.find(r=>r.flag).flag;
 const r2=route.nextMission(game,{events:{activeFlags:[B.flags[hall]],work:[]},caught:[]},()=>false,()=>false);
 assert.equal(r2.mission.id,'BLACK-10');
});

test('BDSP: banderas int32, medallas y Liga desde las banderas de sistema; valores raros se descartan',()=>{
 const B=require('../src/saves/bdsp-flags.js'),bytes=new Uint8Array(0x4+5500*4+16),v=new DataView(bytes.buffer);
 const sys=i=>v.setInt32(0x4+(500+4000+i)*4,1,true);[124,125,126].forEach(sys);sys(5);v.setInt32(0x4+(500+1283)*4,1,true);
 const r=B.read(bytes);assert.equal(r.badgesTotal,3);assert.equal(r.gameClear,true);assert.ok(r.events.activeFlags.includes(1283));
 const a=guide.analyze({events:r.events,caught:[]},'BD');assert.equal(a.secrets.find(s=>s.title==='Regirock').status,'completado');
 v.setInt32(0x4+(500+10)*4,7,true);assert.equal(B.read(bytes),null);
});

test("Let's Go: gimnasios como historia, capturas y títulos de Maestro contados",()=>{
 const sys=i=>128+i,ev=i=>2176+i;
 const all=[0,12,13,14,15,16,17,18,19].map(sys);
 const a=guide.analyze({events:{activeFlags:all,work:[],titles:Array.from({length:153},(_,i)=>i+1)},caught:[]},'LETGOE');
 assert.equal(a.story.next,null);assert.equal(a.storyPartial,false);
 assert.equal(a.secrets.find(s=>s.id==='pkhex.lgpe.masters').status,'completado');
 const b=guide.analyze({events:{activeFlags:[ev(192)],work:[],titles:[1,2]},caught:[]},'LETGOP');
 assert.equal(b.secrets.find(s=>s.id==='pkhex.lgpe.masters').status,'pendiente');
 assert.equal(b.secrets.find(s=>s.id==='pkhex.lgpe.snorlax').status,'en curso');
 assert.equal(b.story.next.id,'LETGOP-02');
});

test('posición DS: HGSS y Platino eligen la copia válida y descartan mapas inexistentes',()=>{
 const L=require('../src/saves/ds-location.js'),I=require('../src/saves/hgss-integrity.js'),maps=require('../src/saves/ds-maps-data.js');
 const bytes=new Uint8Array(0x80000),v=new DataView(bytes.buffer);
 const write=(base,major,map,x,y)=>{const size=0xCF2C,end=base+size;v.setInt32(base+0x1280,map,true);v.setInt32(base+0x1288,x,true);v.setInt32(base+0x128C,y,true);
  v.setUint32(end-20,major,true);v.setUint32(end-12,size,true);v.setUint16(end-2,I.crc16(bytes.subarray(base,end-0x14)),true);};
 write(0,5,65,10,20);write(0x40000,9,418,1,2);
 assert.equal(L.read(bytes,'PLATINUM').name,maps.PT.names[maps.PT.maps[418][0]]);
 bytes[0x40010]^=1;assert.equal(L.read(bytes,'PLATINUM').map,'ETERNA_CITY');
 v.setInt32(0x1280,99999,true);v.setUint16(0xCF2C-2,I.crc16(bytes.subarray(0,0xCF2C-0x14)),true);
 assert.equal(L.read(bytes,'PLATINUM'),null);
 assert.equal(maps.HGSS.names[maps.HGSS.maps[280][0]],'Carpa Pokéathlon');
});

test('posición DS: Diamante/Perla leen su bloque de 0xC100 y no confunden Platino',()=>{
 const L=require('../src/saves/ds-location.js'),I=require('../src/saves/hgss-integrity.js'),maps=require('../src/saves/ds-maps-data.js');
 const bytes=new Uint8Array(0x80000),v=new DataView(bytes.buffer),size=0xC100;
 v.setInt32(0x1238,65,true);v.setInt32(0x1240,7,true);v.setInt32(0x1244,9,true);
 v.setUint32(size-20,1,true);v.setUint32(size-12,size,true);v.setUint16(size-2,I.crc16(bytes.subarray(0,size-0x14)),true);
 const r=L.read(bytes,'PEARL');assert.equal(r.name,'Ciudad Vetusta');assert.equal(r.map,'ETERNA');assert.equal(r.x,7);assert.equal(r.y,9);
 assert.equal(L.read(bytes,'PLATINUM'),null);
 assert.equal(maps.DP.names[maps.DP.maps[3][0]],'Ciudad Jubileo');
});

test('posición Negro 2/Blanco 2: bloque con suma válida, zona con nombre y Bosque Blanco en Blanco 2',()=>{
 const L=require('../src/saves/ds-location.js'),I=require('../src/saves/hgss-integrity.js');
 const bytes=new Uint8Array(0x80000),v=new DataView(bytes.buffer),seal=()=>v.setUint16(0x195AA,I.crc16(bytes.subarray(0x19500,0x195A8)),true);
 v.setInt32(0x19580,427,true);v.setUint16(0x19586,48,true);v.setUint16(0x1958E,740,true);seal();
 const r=L.read(bytes,'BLACK2');assert.equal(r.name,'Ciudad Engobe');assert.equal(r.x,48);assert.equal(r.y,740);
 v.setInt32(0x19580,0,true);seal();
 assert.equal(L.read(bytes,'BLACK2').name,'Ciudad Negra');assert.equal(L.read(bytes,'WHITE2').name,'Bosque Blanco');
 bytes[0x19500]^=1;assert.equal(L.read(bytes,'BLACK2'),null);
});

test('posición Game Boy: Kanto y Johto con nombres oficiales; japonés y coreano excluidos',()=>{
 const L=require('../src/saves/ds-location.js'),bytes=new Uint8Array(0x8000);
 bytes[0x260A]=40;bytes[0x260D]=3;bytes[0x260E]=5;
 const r=L.read(bytes,'RED');assert.equal(r.name,'Pueblo Paleta');assert.equal(r.map,'OAKS_LAB');assert.equal(r.x,5);
 assert.equal(L.read(bytes,'RED',undefined,1),null);
 bytes[0x2843]=26;bytes[0x2844]=3;const c=L.read(bytes,'CRYSTAL');assert.equal(c.name,'Ciudad Cerezo');
 bytes[0x2843]=99;assert.equal(L.read(bytes,'CRYSTAL'),null);
});
