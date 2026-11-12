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

test('posición X/Y y ROZA: bloque Situation con suma de su tabla y zonas con nombre',()=>{
 const L=require('../src/saves/ds-location.js'),I=require('../src/saves/hgss-integrity.js');
 const make=(size,zone)=>{const b=new Uint8Array(size),v=new DataView(b.buffer),bo=size-0x200,info=bo+0x14+4*8;
  v.setUint32(bo+0x10,0x42454546,true);v.setUint16(info+4,4,true);v.setUint16(0x1402,zone,true);v.setFloat32(0x1410,12.4,true);v.setFloat32(0x1418,7.6,true);
  v.setUint16(info+6,I.crc16(b.subarray(0x1400,0x1550)),true);return b;};
 const xy=make(0x65600,53),r=L.read(xy,'Y');assert.equal(r.name,'Ciudad Novarte');assert.equal(r.x,12);assert.equal(r.y,8);
 assert.equal(L.read(make(0x76000,0),'ALPHASAPPHIRE').name,'Villa Raíz');
 assert.equal(L.read(xy,'OMEGARUBY'),null);
 xy[0x1400]^=1;assert.equal(L.read(xy,'X'),null);
});

test('posición Ultrasol/Ultraluna: CRC16 invertido del bloque Situation y otra tabla en Sol/Luna',()=>{
 const L=require('../src/saves/ds-location.js'),size=0x6CC00,b=new Uint8Array(size),v=new DataView(b.buffer),bo=size-0x200,info=bo+0x14+8;
 v.setUint32(bo+0x10,0x42454546,true);v.setUint16(info+4,1,true);v.setUint16(0x1000,22,true);v.setFloat32(0x1008,2400,true);v.setFloat32(0x1010,2160,true);
 v.setUint16(info+6,L.crc16inv(b.subarray(0x1000,0x107C)),true);
 const r=L.read(b,'ULTRASUN');assert.equal(r.name,'Ruinas de la Guerra');assert.equal(r.x,2400);
 assert.equal(L.read(b,'SUN'),null);
 b[0x1001]^=1;assert.equal(L.read(b,'ULTRAMOON'),null);
});

test('posición Sol/Luna: bloque Situation en 0xE00, su propia tabla de zonas y subtítulo del lugar',()=>{
 const L=require('../src/saves/ds-location.js'),size=0x6BE00,b=new Uint8Array(size),v=new DataView(b.buffer),bo=size-0x200,info=bo+0x14+8;
 v.setUint32(bo+0x10,0x42454546,true);v.setUint16(info+4,1,true);
 const put=zone=>{v.setUint16(0xE00,zone,true);v.setUint16(info+6,L.crc16inv(b.subarray(0xE00,0xE7C)),true);};
 put(80);assert.equal(L.read(b,'SUN').name,'Ruinas de la Vida');
 put(7);assert.equal(L.read(b,'MOON').name,'Ciudad Hauoli (Paseo Marítimo)');
 assert.equal(L.read(b,'ULTRASUN'),null);
 b[0xE01]^=1;assert.equal(L.read(b,'SUN'),null);
});

test('posición BDSP por zona = ubicación y región de Escarlata/Púrpura por bloques',()=>{
 const L=require('../src/saves/ds-location.js'),b=new Uint8Array(0xEDC20),v=new DataView(b.buffer);
 v.setInt16(0x5634,350,true);assert.equal(L.read(b,'BD').name,'Orilla Valor');
 v.setInt16(0x5634,0,true);assert.equal(L.read(b,'SP').name,'Ciudad Jubileo');
 assert.equal(L.read(new Uint8Array(0x1000),'BD'),null);
 assert.equal(L.read(null,'VIOLET',undefined,undefined,{KPlayerCurrentFieldID:2}).name,'Academia Arándano');
 assert.equal(L.read(null,'SCARLET',undefined,undefined,{KPlayerCurrentFieldID:0}).precision,'region');
 assert.equal(L.read(null,'SCARLET',undefined,undefined,{}),null);
});

test('posición Switch desde el motor: SV por identificador de lugar, Leyendas por mapa interno',()=>{
 const L=require('../src/saves/ds-location.js');
 assert.equal(L.read(null,'SCARLET',0,0,{KPlayerCurrentFieldID:0},{currentLocationId:'hex:82000000',lastRoomMapName:'a_sch_entrance01'}).name,'Academia Naranja');
 assert.equal(L.read(null,'VIOLET',0,0,{},{currentLocationId:'hex:0A000000'}).name,'Liga Pokémon');
 assert.equal(L.read(null,'VIOLET',0,0,{KPlayerCurrentFieldID:1},{currentLocationId:'hex:FFFF0000'}).name,'Noroteo');
 const la=L.read(null,'ARCEUS',0,0,{},{map:'ha_area00_s02'});assert.equal(la.name,'Villa Jubileo');assert.match(la.detail,/interior/);
 assert.equal(L.read(null,'ARCEUS',0,0,{},{map:'ha_area05'}).name,'Tundra Alba');
 assert.equal(L.read(null,'ARCEUS',0,0,{},{map:'ha_area09'}),null);
 assert.equal(L.read(null,'ZA',0,0,{},{map:'t1'}).name,'Ciudad Luminalia');
 const gg=L.read(null,'LETGOE',0,0,{},{mapHash:'C575D7D020856017'});assert.equal(gg.name,'Pueblo Paleta');assert.equal(gg.detail,'dentro de un edificio');
 assert.equal(L.read(null,'LETGOP',0,0,{},{mapHash:L.fnv64('t011gym')}).detail,'gimnasio');
 assert.equal(L.read(null,'LETGOP',0,0,{},{mapHash:L.fnv64('r023d01')}).name,'Calle Victoria');
 assert.equal(L.read(null,'LETGOP',0,0,{},{mapHash:L.fnv64('s001r01')}),null);
 assert.equal(L.read(null,'ZA',0,0,{},{map:'d9'}),null);
 assert.equal(L.fnv64('a_t0101_i0101'),'B6F6DA200E8FFE23');assert.equal(L.fnv64('a_wr0201'),'5EA5C3539AB81C81');
 const sw=L.read(null,'SWORD',0,0,{},{mapHash:'B6F6DA200E8FFE23'});assert.equal(sw.name,'Pueblo Yarda');assert.equal(sw.detail,'dentro de un edificio');
 assert.equal(L.read(null,'SHIELD',0,0,{},{mapHash:'5EA5C3539AB81C81'}).name,'Isla de la Armadura');
 assert.equal(L.read(null,'SHIELD',0,0,{},{mapHash:'23F8A2E146592267'}),null);
 assert.equal(L.read(null,'SWORD',0,0,{},{mapHash:L.fnv64('a_t0501_g0101')}).name,'Pueblo Ladera');
 assert.equal(L.read(null,'SWORD',0,0,{},{mapHash:L.fnv64('a_wr0301_i0101')}).name,'Nieves de la Corona');
 assert.equal(L.read(null,'SWORD',0,0,{},{mapHash:L.fnv64('a_wr0101')}).name,'Área Silvestre');
 assert.equal(L.read(null,'SWORD',0,0,{},{mapHash:L.fnv64('a_btl24_c0301')}).name,'Ciudad Artejo');
 assert.equal(L.read(null,'SWORD',0,0,{},{mapHash:L.fnv64('a_r0501_i0101')}).name,'Ruta 5');
 // Áreas con varias zonas: la posición elige la del punto colocado más cercano (plano X/Y del guardado).
 const maps=require('../src/saves/ds-maps-data.js'),a0101=maps.SWITCH.SWSH.a_0101,r1=a0101.find(r=>r[0]==='Ruta 1')[2];
 assert.equal(L.read(null,'SHIELD',0,0,{},{mapHash:L.fnv64('a_0101'),x:19456.9,y:54360.2,z:1549.6}).name,'Pueblo Yarda');
 assert.equal(L.read(null,'SHIELD',0,0,{},{mapHash:L.fnv64('a_0101'),x:r1[0],y:r1[1],z:0}).name,'Ruta 1');
 assert.equal(L.read(null,'SWORD',0,0,{},{mapHash:L.fnv64('a_0401'),x:12407.1,y:8118,z:-366.2}).name,'Pueblo Amura');
 const sinPos=L.read(null,'SWORD',0,0,{},{mapHash:L.fnv64('a_0101')});assert.equal(sinPos.precision,'region');assert.match(sinPos.name,/Pueblo Yarda \/ Ruta 1/);
 const lake=maps.SWITCH.SWSH.a_wr0101.find(r=>r[0]==='Lago Milotic (norte)')[2];
 const wr=L.read(null,'SWORD',0,0,{},{mapHash:L.fnv64('a_wr0101'),x:lake[0],y:lake[1]});
 assert.equal(wr.name,'Lago Milotic (norte)');assert.equal(wr.detail,'Área Silvestre');
});

test('Espada/Escudo: historia por medallas y título solo con prueba de la Torre Batalla',()=>{
 const a=guide.analyze({namedBlocks:{KBattleTowerSinglesVictory:0,KBattleTowerDoublesVictory:0},badgesTotal:3,caught:[]},'SWORD');
 assert.equal(a.storyPartial,true);assert.equal(a.story.next.label,'4.ª medalla (Pueblo Ladera: Lucha en Espada, Fantasma en Escudo)');
 const b=guide.analyze({namedBlocks:{KBattleTowerSinglesVictory:0,KBattleTowerDoublesVictory:0},badgesTotal:8,caught:[]},'SHIELD');
 assert.match(b.story.next.label,/Campeón de Galar/);
 const c=guide.analyze({namedBlocks:{KBattleTowerSinglesVictory:6},badgesTotal:8,caught:[]},'SHIELD');
 assert.equal(c.story.next,null);
});

test('Diamante Brillante/Perla Reluciente: historia por medallas con las misiones de su guía',()=>{
 const a=guide.analyze({events:{activeFlags:[],work:[]},badgesTotal:3,caught:[]},'BD');
 assert.equal(a.storyPartial,false);assert.equal(a.story.next.label,'Medalla Ciénaga');assert.equal(a.story.next.mission,'05');
 assert.equal(guide.analyze({events:{activeFlags:[],work:[]},badgesTotal:8,caught:[]},'SP').story.next.label,'Salón de la Fama registrado');
});

test('posición Negro/Blanco: bloque 28 de 0x9C bytes, tabla de zonas propia y Bosque Blanco en Blanco',()=>{
 const L=require('../src/saves/ds-location.js'),I=require('../src/saves/hgss-integrity.js');
 const b=new Uint8Array(0x80000),v=new DataView(b.buffer),seal=()=>v.setUint16(0x1959E,I.crc16(b.subarray(0x19500,0x1959C)),true);
 v.setInt32(0x19580,278,true);seal();assert.equal(L.read(b,'BLACK').name,'Palacio de N');
 v.setInt32(0x19580,6,true);seal();assert.equal(L.read(b,'WHITE').name,'Ciudad Gres');
 v.setInt32(0x19580,0,true);seal();assert.equal(L.read(b,'BLACK').name,'Ciudad Negra');assert.equal(L.read(b,'WHITE').name,'Bosque Blanco');
 assert.equal(L.read(b,'BLACK2'),null);
});

test('posición Game Boy: Kanto y Johto con nombres oficiales; japonés y coreano excluidos',()=>{
 const L=require('../src/saves/ds-location.js'),bytes=new Uint8Array(0x8000);
 bytes[0x260A]=40;bytes[0x260D]=3;bytes[0x260E]=5;
 const r=L.read(bytes,'RED');assert.equal(r.name,'Pueblo Paleta');assert.equal(r.map,'OAKS_LAB');assert.equal(r.x,5);
 assert.equal(L.read(bytes,'RED',undefined,1),null);
 bytes[0x2843]=26;bytes[0x2844]=3;const c=L.read(bytes,'CRYSTAL');assert.equal(c.name,'Ciudad Cerezo');
 bytes[0x2843]=99;assert.equal(L.read(bytes,'CRYSTAL'),null);
});

test('coleccionables del guardado: Diglett, huellas, vatios, combates restringidos y fuegos fatuos',()=>{
 const O=require('../src/engine/objectives.js'),get=(d,id)=>O.fromDiagnosis(d).find(f=>f.id===id)?.value;
 const sh={game:'SHIELD',namedBlocks:{KAlolanDiglettFound:1,KFootprintPercentageCobalion:100,KFootprintPercentageTerrakion:100,KFootprintPercentageVirizion:100,KDojoWattDonationProgress:1,KRecordSparringTypesCleared:0}};
 assert.equal(get(sh,'collection.swsh.footprints'),true);assert.equal(get(sh,'collection.swsh.alolanDiglett'),false);
 assert.equal(get({game:'SWORD',namedBlocks:{KAlolanDiglettFound:150}},'collection.swsh.alolanDiglett'),true);
 assert.equal(get({game:'SWORD',namedBlocks:{KDojoWattDonationProgress:15}},'collection.swsh.dojoWatts'),true);
 assert.equal(get({game:'SWORD',namedBlocks:{KRecordSparringTypesCleared:18}},'battle.swsh.restrictedSparring'),true);
 const la=n=>({game:'ARCEUS',namedBlocks:{KWispsFoundArea00:7,KWispsFoundArea01:20,KWispsFoundArea02:20,KWispsFoundArea03:20,KWispsFoundArea04:20,KWispsFoundArea05:n}});
 assert.equal(get(la(20),'collection.la.wisps'),true);assert.equal(get(la(19),'collection.la.wisps'),false);
 assert.equal(get({game:'SWORD',namedBlocks:{}},'collection.swsh.footprints'),undefined);
});

test('Esmeralda: estrella del Frente Batalla con las 14 banderas de símbolos y solo en la familia E',()=>{
 const O=require('../src/engine/objectives.js'),G=require('../src/saves/gen3-data.js'),F=G.families.E.flags;
 const all=['TOWER','DOME','PALACE','ARENA','FACTORY','PIKE','PYRAMID'].flatMap(n=>['FLAG_SYS_'+n+'_SILVER','FLAG_SYS_'+n+'_GOLD']).map(n=>F[n]);
 const get=(field,game='EMERALD')=>O.fromDiagnosis({game,field}).find(f=>f.id==='card.emerald.frontierSymbols')?.value;
 assert.equal(get({family:'E',flags:all}),true);
 assert.equal(get({family:'E',flags:all.slice(0,-1)}),false);
 assert.equal(get({family:'RS',flags:all}),undefined);
});

test('Rubí/Zafiro/Esmeralda: estrella de los cinco cuadros del museo; Rojo Fuego excluido',()=>{
 const O=require('../src/engine/objectives.js'),get=(field)=>O.fromDiagnosis({game:'RUBY',field}).find(f=>f.id==='card.hoenn.paintings')?.value;
 assert.equal(get({family:'RS',flags:[0xA0,0xA1,0xA2,0xA3,0xA4]}),true);
 assert.equal(get({family:'E',flags:[0xA0,0xA1,0xA2,0xA3]}),false);
 assert.equal(get({family:'FRLG',flags:[0xA0,0xA1,0xA2,0xA3,0xA4]}),undefined);
});

test('Gen. III con el lector nativo: fin de la historia por FLAG_SYS_GAME_CLEAR de cada familia',()=>{
 const O=require('../src/engine/objectives.js'),clear=(game,family,flags,extra={})=>O.fromDiagnosis({game,field:{family,flags},...extra}).find(f=>f.id==='story.gameClear')?.value;
 assert.equal(clear('EMERALD','E',[2148]),true);assert.equal(clear('EMERALD','E',[2052]),false);
 assert.equal(clear('RUBY','RS',[2052]),true);assert.equal(clear('FIRERED','FRLG',[2092]),true);assert.equal(clear('LEAFGREEN','FRLG',[]),false);
 assert.equal(clear('EMERALD','E',[2148],{gameClear:false}),false); // manda el dato directo
});

test('Espada/Escudo: fin de la historia por victorias en la Torre Batalla o el Torneo de las Estrellas, nunca falso por un cero',()=>{
 const O=require('../src/engine/objectives.js'),clear=nb=>O.fromDiagnosis({game:'SWORD',namedBlocks:nb}).find(f=>f.id==='story.gameClear')?.value;
 assert.equal(clear({KBattleTowerSinglesVictory:9,KBattleTowerDoublesVictory:0}),true);
 assert.equal(clear({KBattleTowerSinglesVictory:0,KBattleTowerDoublesVictory:0,KGSTVictoriesTotal:1}),true);
 assert.equal(clear({KBattleTowerSinglesVictory:0,KBattleTowerDoublesVictory:0}),undefined);
});

test("Let's Go: áreas exteriores por rectángulos de zona (el menor gana si se solapan)",()=>{
 const L=require('../src/saves/ds-location.js'),at=(area,x,y)=>L.read(null,'LETGOE',0,0,{},{mapHash:L.fnv64(area),x,y});
 assert.equal(at('area07',2450,6300).name,'Ciudad Azafrán'); // partida del propietario
 assert.equal(at('area02',2000,1000).name,'Pueblo Paleta');assert.equal(at('area02',2000,-2000).name,'Ruta 1');
 const sin=L.read(null,'LETGOP',0,0,{},{mapHash:L.fnv64('area02')});assert.equal(sin.precision,'region');assert.match(sin.name,/Pueblo Paleta/);
 assert.equal(L.read(null,'LETGOP',0,0,{},{mapHash:L.fnv64('t001r01')}).name,'Pueblo Paleta');
});
