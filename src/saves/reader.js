/* Archivo Maestro Pokemon – importador LOCAL y de SOLO LECTURA.
 * Estructuras contrastadas contra PKHeX.Core (SAV4HGSS, SAV5B2W2,
 * SaveBlockAccessor6XY/6AO/7USUM, Zukan4/5/6/7, MyStatus6/7).
 * Sin redes, sin modificar el guardado, sin convertir estados manuales en datos leidos.
 */
(function(root){
 'use strict';
 const LENGTHS={XY:0x65600,ORAS:0x76000,USUM:0x6CC00,NDS:0x80000};
 const GAME_NAMES={7:'HeartGold',8:'SoulSilver',20:'Blanco',21:'Negro',22:'Blanco 2',23:'Negro 2',24:'X',25:'Y',26:'Zafiro Alfa',27:'Rubí Omega',30:'Sol',31:'Luna',32:'Ultrasol',33:'Ultraluna'};
 const MYTHICAL4=new Set([151,251,385,386,489,490,491,492,493]);
 const MYTHICAL5=new Set([...MYTHICAL4,494,647,648,649]);
 const NAME_BY_ID={144:'Articuno',145:'Zapdos',146:'Moltres',150:'Mewtwo',151:'Mew',243:'Raikou',244:'Entei',245:'Suicune',249:'Lugia',250:'Ho-Oh',251:'Celebi',377:'Regirock',378:'Regice',379:'Registeel',380:'Latias',381:'Latios',382:'Kyogre',383:'Groudon',384:'Rayquaza',385:'Jirachi',386:'Deoxys',480:'Uxie',481:'Mesprit',482:'Azelf',483:'Dialga',484:'Palkia',485:'Heatran',486:'Regigigas',487:'Giratina',488:'Cresselia',489:'Phione',490:'Manaphy',491:'Darkrai',492:'Shaymin',493:'Arceus',494:'Victini',638:'Cobalion',639:'Terrakion',640:'Virizion',641:'Tornadus',642:'Thundurus',643:'Reshiram',644:'Zekrom',645:'Landorus',646:'Kyurem',647:'Keldeo',648:'Meloetta',649:'Genesect',716:'Xerneas',717:'Yveltal',718:'Zygarde',719:'Diancie',720:'Hoopa',721:'Volcanion',785:'Tapu Koko',786:'Tapu Lele',787:'Tapu Bulu',788:'Tapu Fini',789:'Cosmog',790:'Cosmoem',791:'Solgaleo',792:'Lunala',793:'Nihilego',794:'Buzzwole',795:'Pheromosa',796:'Xurkitree',797:'Celesteela',798:'Kartana',799:'Guzzlord',800:'Necrozma',801:'Magearna',802:'Marshadow',803:'Poipole',804:'Naganadel',805:'Stakataka',806:'Blacephalon',807:'Zeraora'};
 const LEGENDARY={SOULSILVER:[243,244,245,249,250,144,145,146,150,380,381,382,383,384,493],BLACK2:[638,639,640,480,481,482,488,485,486,377,378,379,380,381,643,644,646,647,648,649],WHITE2:[638,639,640,480,481,482,488,485,486,377,378,379,380,381,486,643,644,646,648,649],Y:[144,145,146,150,716,717,718,719,720,721],OMEGARUBY:[377,378,379,380,381,382,383,384,386,483,484,493,719,720,721],ULTRASUN:[785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,801,802,803,804,805,806,807]};
 LEGENDARY.HEARTGOLD=LEGENDARY.SOULSILVER;LEGENDARY.X=LEGENDARY.Y;LEGENDARY.ALPHASAPPHIRE=LEGENDARY.OMEGARUBY;LEGENDARY.ULTRAMOON=LEGENDARY.ULTRASUN;
 function fail(msg){throw Error(msg);}
 function unsupported(msg){throw Object.assign(Error(msg),{code:'UNSUPPORTED_SAVE_FORMAT'});}
 function u8(b,i){if(i<0||i>=b.length)fail('Bloque fuera de límites');return b[i]}
 function u16(b,i){return u8(b,i)|(u8(b,i+1)<<8)}
 function u32(b,i){return (u16(b,i)|(u16(b,i+2)<<16))>>>0}
 function bits(v){let n=0;while(v){v&=v-1;n++}return n}
 function fl(b,ofs,idx){return !!(u8(b,ofs+(idx>>3))&(1<<(idx&7)))}
 function str(b,ofs,max){let s='';for(let i=0;i<max;i+=2){const ch=u16(b,ofs+i);if(!ch||ch===0xffff)break;if(ch<32||ch>=0xE000&&ch<=0xF8FF)continue;s+=String.fromCharCode(ch)}return s.replace(/[^\p{L}\p{N}\s.'’_\-]/gu,'').trim().slice(0,24)}
 // Gen 4 uses an internal character table, not Unicode code points.
 // Western alphabet: 0x012B–0x0144 (A-Z), 0x0145–0x015E (a-z).
 // Latin diacritics/digits use game glyph values, not their Unicode byte values.
 // Reference: pinned PKHeX StringConverter4Util.TableINT (encoding data).
 // Kana glyph correspondence from the documented Gen 4 character encoding; not UTF-16 values.
 const KANA4='　ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろわをんァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロワヲン';
 function str4(b,ofs,max){let out='';for(let i=0;i<max;i+=2){const ch=u16(b,ofs+i);
  if(ch===0||ch===0xffff)break;
  if(ch>=1&&ch<=0xA1)out+=KANA4[ch-1];
  else if(ch>=0xA2&&ch<=0xAB)out+=String.fromCharCode(0xFF10+ch-0xA2);
  else if(ch>=0xAC&&ch<=0xC5)out+=String.fromCharCode(0xFF21+ch-0xAC);
  else if(ch>=0xC6&&ch<=0xDF)out+=String.fromCharCode(0xFF41+ch-0xC6);
  else if(ch===0xF1)out+='ー';
  else if(ch===0xEE||ch===0x1BB)out+='♂';
  else if(ch===0xEF||ch===0x1BC)out+='♀';
  else if(ch>=0x12B&&ch<=0x144)out+=String.fromCharCode(65+ch-0x12B);
  else if(ch>=0x145&&ch<=0x15E)out+=String.fromCharCode(97+ch-0x145);
  else if(ch>=0x121&&ch<=0x12A)out+=String.fromCharCode(48+ch-0x121);
  else if(ch>=0x15F&&ch<=0x19E&&ch!==0x176&&ch!==0x196)out+=String.fromCharCode(0xC0+ch-0x15F);
  else if(ch===0x1DE)out+=' ';
  else if(ch===0x1AE)out+='.';
  else if(ch===0x1BE)out+='-';
  else if(ch===0x1E9)out+='_';
  else if(ch===0x1B3)out+="'";
  else out+='?';
 }return out.slice(0,24)}
 function time(b,ofs){const h=u16(b,ofs),m=u8(b,ofs+2),s=u8(b,ofs+3);return m<60&&s<60&&h<65535?`${h} h ${String(m).padStart(2,'0')} min`:null}
 function dex(b,{ofs,caught,seen,region,regions,max}){const got=[],saw=[];for(let id=1;id<=max;id++){if(fl(b,ofs+caught,id-1))got.push(id);if(seen!==null){for(let j=0;j<regions;j++){if(fl(b,ofs+seen+j*region,id-1)){saw.push(id);break}}}}return {caught:got,seen:saw};}
 function validateVersion(v,want){if(!want.includes(v)){const actual=GAME_NAMES[v]||`código ${v}`;fail(`Este guardado parece de Pokémon ${actual}. Este apartado admite ${want.map(n=>GAME_NAMES[n]).join(' / ')}.`)}}

/* Módulo de lectura forense de indicadores de eventos. Ninguna escritura.
 * Offsets: PKHeX.Core SAV4HGSS, SaveBlockAccessor5B2W2, SaveBlockAccessor6XY/6AO,
 * SaveBlockAccessor7USUM, EventWork5/6/7. Descripciones: FlagsEditorEXPlugin.
 * IMPORTANTE: un flag de desaparición no demuestra captura, ni un flag reiniciable
 * demuestra que nunca se haya librado el combate.
 */
const FLAG_SOURCES={
 SOULSILVER:'https://raw.githubusercontent.com/fattard/FlagsEditorEXPlugin/main/flagslist/flags_gen4hgss_en.txt',
 WHITE2:'https://raw.githubusercontent.com/fattard/FlagsEditorEXPlugin/main/flagslist/flags_gen5b2w2_en.txt',
 BLACK2:'https://raw.githubusercontent.com/fattard/FlagsEditorEXPlugin/main/flagslist/flags_gen5b2w2_en.txt',
 Y:'https://raw.githubusercontent.com/fattard/FlagsEditorEXPlugin/main/flagslist/flags_gen6xy_en.txt',
 OMEGARUBY:'https://raw.githubusercontent.com/fattard/FlagsEditorEXPlugin/main/flagslist/flags_gen6oras_en.txt',
 ULTRASUN:'https://raw.githubusercontent.com/fattard/FlagsEditorEXPlugin/main/flagslist/flags_gen7usum_en.txt'
};
// id, nombre, categoría, lectura: 1 activo, 0 no confirmado.  Nunca 0 = misión sin hacer.
const EVIDENCE={
 SOULSILVER:[
 [0x1CB,'Suicune salió de la Torre Quemada','Suicune'],
 [0x1E1,'Suicune: encuentro de Ciudad Orquídea','Suicune'],
 [0x29E,'Suicune: aparición en Ruta 42','Suicune'],
 [0x29F,'Suicune: aparición en Ciudad Carmín','Suicune'],
 [0x2A0,'Suicune: aparición en Ruta 14','Suicune'],
 [0x2A1,'Suicune desapareció de Ruta 25 (combate resuelto)','Suicune','desapareció; no equivale a captura'],
 [0x175,'Registro de Suicune obtenido','Suicune'],
 [0x242,'Ho-Oh desapareció de la Torre Campana','Legendarios','desapareció; captura/derrota no diferenciadas'],
 [0x243,'Lugia desapareció de Islas Remolino','Legendarios','desapareció; captura/derrota no diferenciadas'],
 [0x297,'Zapdos desapareció de la Central de Energía','Legendarios','desapareció; captura/derrota no diferenciadas'],
 [0x305,'Mewtwo desapareció de Cueva Celeste','Legendarios','desapareció; captura/derrota no diferenciadas'],
 [0x306,'Articuno desapareció de Islas Espuma','Legendarios','desapareció; captura/derrota no diferenciadas'],
 [0x307,'Moltres desapareció del Monte Plateado','Legendarios','desapareció; captura/derrota no diferenciadas'],
 [0x25F,'Rojo desapareció de la cima del Monte Plateado','Historia','puede reflejar estado del encuentro, verificar victoria'],
 [0x654,'Bandera de combate frente a Rojo','Combates','un 0 NO descarta victoria anterior; reinicios/reciclos'],
 [0x655,'Bandera de combate frente a Azul','Combates','un 0 NO descarta victoria; usa la medalla Tierra'],
 [0x21B,'Ruinas Alfa: cámara de la Cuerda Huida','Ruinas Alfa'],
 [0x21D,'Ruinas Alfa: cámara de Destello','Ruinas Alfa'],
 [0x21F,'Ruinas Alfa: cámara de Piedra Agua','Ruinas Alfa'],
 [0x221,'Ruinas Alfa: cámara de Ho-Oh','Ruinas Alfa'],
 [0x095,'Eevee recibido de Bill','Regalos'],
 [0x177,'Inicial de Hoenn recibido de Máximo','Regalos'],
 [0x2B5,'Revancha contra Blanca','Revanchas','flag de sesión; no historial de todas las victorias'],
 [0x2B6,'Revancha contra Sachiko','Revanchas','flag de sesión'],
 [0x2B7,'Revancha contra Débora','Revanchas','flag de sesión'],
 [0x2B8,'Revancha contra Erika','Revanchas','flag de sesión'],
 [0x2B9,'Revancha contra Misty','Revanchas','flag de sesión'],
 [0x2BA,'Revancha contra Blaine','Revanchas','flag de sesión'],
 [0x2BB,'Revancha contra Azul','Revanchas','flag de sesión'],
 [0x2BC,'Revancha contra Aníbal','Revanchas','flag de sesión'],
 [0x2BD,'Revancha contra Brock','Revanchas','flag de sesión'],
 [0x2BE,'Revancha contra Antón','Revanchas','flag de sesión'],
 [0x2BF,'Revancha contra Sabrina','Revanchas','flag de sesión'],
 [0x2C0,'Revancha contra Pegaso','Revanchas','flag de sesión'],
 [0x2C1,'Revancha contra Teniente Surge','Revanchas','flag de sesión'],
 [0x2C2,'Revancha contra Morti','Revanchas','flag de sesión'],
 [0x2C3,'Revancha contra Yasmina','Revanchas','flag de sesión'],
 [0x2C4,'Revancha contra Fredo','Revanchas','flag de sesión'],
 ],
 WHITE2:[
 [0x960,'Entrada en el Hall de la Fama','Historia'],[0x29B,'Reshiram/Zekrom desapareció de la zona del encuentro','Legendarios','no demuestra captura'],
 [0x396,'Uxie desapareció del lugar de encuentro','Legendarios','captura/derrota no diferenciadas'],
 [0x397,'Mesprit desapareció del lugar de encuentro','Legendarios','captura/derrota no diferenciadas'],
 [0x398,'Azelf desapareció del lugar de encuentro','Legendarios','captura/derrota no diferenciadas'],
 [0x399,'Regice desapareció de la cámara','Legendarios','captura/derrota no diferenciadas'],
 [0x39A,'Regirock desapareció de la cámara','Legendarios','captura/derrota no diferenciadas'],
 [0x39B,'Registeel desapareció de la cámara','Legendarios','captura/derrota no diferenciadas'],
 [0x39C,'Regigigas desapareció','Legendarios','captura/derrota no diferenciadas'],
 [0x3A0,'Volcarona desapareció del Castillo Ancestral','Legendarios','captura/derrota no diferenciadas'],
 [0x08D,'Registro de Pokédex regional vista','Pokédex','no equivale a todas las capturas'],
 [0x1C0,'Casco Dentado recibido en el exterior del PWT','Objetos']
 ],
 Y:[
 [0xA50,'Entraste en el Hall de la Fama','Historia'],
 [0xA55,'Patines desbloqueados','Historia'],
 [0xA59,'Indicador nacional de Pokédex completo','Pokédex','requiere contrastar la entrega del reconocimiento'],
 [0xA5A,'Indicador Pokédex Kalos centro','Pokédex'],[0xA5B,'Indicador Pokédex Kalos costa','Pokédex'],[0xA5C,'Indicador Pokédex Kalos montaña','Pokédex'],
 [0xA5D,'Indicador de Pokédex general completa','Pokédex'],
 [0xA5E,'Amuleto Oval concedido','Recompensas'],[0xA5F,'Amuleto Iris concedido','Recompensas'],
 [0x0D2,'Zygarde capturado en evento del juego','Legendarios'],
 [0x0D3,'Mewtwo capturado en evento del juego','Legendarios'],
 [0x423,'Mewtwo derrotado en encuentro','Legendarios','no demuestra captura'],
 [0x376,'Zygarde derrotado en encuentro','Legendarios','no demuestra captura']
 ],
 OMEGARUBY:[
 [0xAA0,'Entrada en Hall de la Fama','Historia'],[0xAA9,'Indicador de Episodio Delta desbloqueado','Episodio Delta','puede indicar acceso, no escena final completada'],
 [0xAAD,'Indicador de Pokédex completa','Pokédex'],
 [0xAAE,'Amuleto Oval concedido','Recompensas'],[0xAAF,'Amuleto Iris concedido','Recompensas'],
 [0xB74,'Regirock capturado en su encuentro','Legendarios'],[0xB75,'Regice capturado en su encuentro','Legendarios'],[0xB76,'Registeel capturado en su encuentro','Legendarios'],
 [0xB77,'Groudon capturado en el encuentro de Rubí Omega','Legendarios'],[0xB79,'Rayquaza capturado en evento','Legendarios'],[0xB7A,'Deoxys capturado en el Pilar Celeste','Episodio Delta'],
 [0x411,'Deoxys desapareció del Pilar Celeste','Episodio Delta','desaparecer no equivale a capturar'],
 [0x41C,'Regirock derrotado','Legendarios','derrota no equivale a captura'],[0x41D,'Regice derrotado','Legendarios','derrota no equivale a captura'],[0x41E,'Registeel derrotado','Legendarios','derrota no equivale a captura']
 ],
 ULTRASUN:[
 [0x0FDC,'Campeón de Alola / Liga completada','Historia'],[0x0FDF,'Indicador de Pokédex regional completa','Pokédex'],
 [0x0FE0,'Amuleto Oval obtenido','Recompensas'],[0x0FE1,'Amuleto Iris obtenido','Recompensas'],
 [0x0FE9,'Monturas Poké desbloqueadas','Historia'],[0x0FEA,'Tauros desbloqueado','Monturas'],[0x0FEB,'Stoutland desbloqueado','Monturas'],
 [0x0FEC,'Machamp desbloqueado','Monturas'],[0x0FED,'Mudsdale desbloqueado','Monturas'],
 [0x0FEE,'Lapras desbloqueado','Monturas'],[0x0FEF,'Sharpedo desbloqueado','Monturas'],[0x0FF0,'Charizard desbloqueado','Monturas'],
 [0x0610,'Necrozma capturado en encuentro propio','Legendarios'],
 [0x0612,'Indicador asociado a Team Rainbow Rocket','Postgame','NO certifica por sí solo el episodio completo'],
 [0x115F,'Magearna recibido mediante regalo QR','Eventos'],
 [0x11D2,'Activado el evento QR de Pikachu con gorra','Eventos'],
 [0x11D3,'Pikachu con gorra recibido','Eventos'],
 [0x11D4,'Evento de los siete misterios de la Escuela','Secretos']
 ]
};
EVIDENCE.BLACK2=EVIDENCE.WHITE2;
function bitSet(b,offset,n){return !!(u8(b,offset+(n>>3))&(1<<(n&7)))}
function eventAudit(o,b){let off,workBase,flagBase,flagCount,workCount;
 if(o.game==='SOULSILVER'||o.game==='HEARTGOLD'){
  const base=o.saveBase??0;workBase=base+0xDE4;flagBase=base+0x10C4;flagCount=0xB60;workCount=(0x10C4-0xDE4)/2;
 }else if(o.game==='WHITE2'||o.game==='BLACK2'){
  const base=o.saveBase??0;workBase=base+0x1FF00;flagBase=workBase+0x1AF*2;flagCount=0xBF8;workCount=0x1AF;
 }else if(['X','Y','OMEGARUBY','ALPHASAPPHIRE'].includes(o.game)){
  workBase=0x14A00;flagBase=workBase+0x178*2;flagCount=0xD00;workCount=0x178;
 }else if(['ULTRASUN','ULTRAMOON'].includes(o.game)){
  workBase=0x01E00;flagBase=workBase+1000*2;flagCount=4960;workCount=1000;
 }else return null;
 if(flagBase+Math.ceil(flagCount/8)>b.length||workBase+workCount*2>b.length)return null;
 const active=[];for(let i=0;i<flagCount;i++)if(bitSet(b,flagBase,i))active.push(i);
 const work=[];for(let i=0;i<workCount;i++)work.push(u16(b,workBase+i*2));
 const labeled=(EVIDENCE[o.game]||[]).map(([index,label,group,caveat])=>({index,label,group,caveat:caveat||'',active:active.includes(index)}));
 return {flagCount,workCount,activeCount:active.length,nonzeroWorkCount:work.filter(x=>x!==0).length,activeFlags:active,work,labeled,source:FLAG_SOURCES[o.game],offsets:{flagBase,workBase},method:'Lectura de indicadores documentados; no reconstruye un historial fechado de acciones'};
}

 function keyItemsHGSS(b,base){const items=[];for(let i=0;i<38;i++){const id=u16(b,base+0x8D8+i*4),count=u16(b,base+0x8DA+i*4);if(id>0&&id<=536&&count>0)items.push({id,count});}return items;}
 function details(o,b,dexData){o.caught=dexData.caught;o.seen=dexData.seen;o.caughtCount=o.caught.length;o.seenCount=o.seen.length;o.legendary=(LEGENDARY[o.game]||[]).map(id=>({id,name:NAME_BY_ID[id]||`#${id}`,caught:o.caught.includes(id),seen:o.seen.includes(id)}));o.readonly=true;o.events=eventAudit(o,b);return o;}
 function ensureReal(b){let n=0;for(const v of b){if(v!==0&&v!==255&&++n>=3)return;}fail('El archivo no contiene datos de una partida reconocible (vacío o sin descifrar).')}
 // Torre Batalla (FrontierSave de pokeheartgold, u16 unk_000[112]): récords de las cinco modalidades en las estadísticas
 // 0, 2, 4, 6 y 8, como las lee la tarjeta (sub_020691E8). El bloque empieza en 0x5264 de la partición general, 4 bytes tras
 // el grito de Chatot de PKHeX (0x4E74 + 0x3EC); contrastado con una partida pública (Torre 105/105 y Fábrica 49/39).
 // Formas de Unown registradas (Zukan4 de PKHeX: lista de 28 bytes en Pokédex+0x10C, 0xFF = fin).
 function unownHGSS(b,base){const seen=new Set();for(let i=0;i<28;i++){const v=u8(b,base+0x12B8+0x10C+i);if(v===0xFF)break;if(v<28)seen.add(v);}return [...seen].sort((x,y)=>x-y);}
 function tryHGSS(b,base){const end=base+0xF628;
  if(end>b.length)return null;
  const magic=u32(b,end-8),sz=u32(b,end-12),v=u8(b,base+0x64+0x1c);
  if(![0x20060623,0x20070903].includes(magic)||sz!==0xF628||![7,8].includes(v))return null;
  return {base,v,magic};
 }

 // Medallero B2/N2: PKHeX.Core Medal5 / MedalList5, bloque 68, 0x25300, 255 entradas x 4 bytes.
 // Un estado 4 significa obtenido; 3 significa listo para recoger, NO obtenido.
 function parseMedals5(b,base){
  const start=base+0x25300, groups=[['Especial',0,7],['Aventura',7,105],['Combate',105,161],['Entretenimiento',161,236],['Desafío',236,255]];
  if(start+0x3ff>b.length)return null;
  const medals=[];let obtained=0,ready=0,unknown=0;
  for(let index=0;index<255;index++){
   const offset=start+index*4, rawDate=u16(b,offset),state=u8(b,offset+2)&7;
   const group=groups.find(g=>index>=g[1]&&index<g[2])[0];
   const year=2000+(rawDate&127),month=(rawDate>>7)&15,day=(rawDate>>11)&31;
   const calendar=new Date(Date.UTC(year,month-1,day));
   const valid=rawDate&&[2,3,4].includes(state)&&month>=1&&month<=12&&day>=1&&calendar.getUTCFullYear()===year&&calendar.getUTCMonth()===month-1&&calendar.getUTCDate()===day;
   const date=valid?`${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`:null;
   if(state===4)obtained++;if(state===3)ready++;if(state>4)unknown++;
   medals.push({id:index+1,group,state,obtained:state===4,ready:state===3,unread:!!(u8(b,offset+2)&8),date});
  }
  const categories=groups.map(([name,a,z])=>({name,obtained:medals.slice(a,z).filter(x=>x.obtained).length,total:z-a}));
  const dates={};medals.filter(m=>m.obtained&&m.date).forEach(m=>dates[m.date]=(dates[m.date]||0)+1);
  const topDate=Object.entries(dates).sort((a,z)=>z[1]-a[1])[0]||null;
  return {obtained,ready,unknown,total:255,remaining:255-obtained,categories,medals,rank:u8(b,start+0x3FD),tutorialCompleted:!!u8(b,start+0x3FE),mostCommonDate:topDate?topDate[0]:null,mostCommonDateCount:topDate?topDate[1]:0,source:'PKHeX.Core SaveBlockAccessor5B2W2 (bloque 68), MedalList5 y Medal5',interpretation:'Recibidas en el guardado, no comprobación de consecución jugando.'};
 }
 // Datos de Pokéathlon de HGSS: registros informativos de solo lectura.
 // Offsets del trabajo de investigación de Project Pokémon y SAV4HGSS.Pokeathlon.
 // Las puntuaciones por sí solas NO permiten certificar las diez pruebas para la estrella.
 function parsePokeathlon4(b,base){
  const events=['Carrera de obstáculos','Atrapa la bandera','Círculo empuje','Rompeladrillos','Atrapa discos','Salto lámparas','Carrera de relevos','Caída de anillos','Lanzamiento de nieve','Fútbol'];
  const records=events.map((name,i)=>{const raw=u16(b,base+0xDCA0+44*i);return {name,score:raw===0xffff?null:raw};});
  const courses=[['Velocidad',0xD9DA],['Fuerza',0xDA06],['Técnica',0xDA32],['Resistencia',0xDA5E],['Salto',0xDA8A]].map(([name,ofs])=>({name,score:u16(b,base+ofs)}));
  return {events:records,courses,recordedEvents:records.filter(x=>x.score!==null&&x.score>0).length,method:'Puntuaciones internas, no valoración de umbrales ni estrellas'};
 }
 function parsePokewalker4(b,base){const flags=u32(b,base+0xE70C);return {steps:u32(b,base+0xE704),watts:u32(b,base+0xE708),unlockedCourses:bits(flags),unlockedMask:flags,source:'SAV4HGSS PokewalkerSteps/Watts/GetPokewalkerCoursesUnlocked'};}
 // Árbol de Combate de USUM: PKHeX.Core BattleTree7.GetTreeStreak.
 // Cada categoría usa 8 bytes: normal actual/super actual/normal máximo/super máximo.
 function parseBattleTree7(b){const ofs=0x6B800;const labels=['Combates individuales','Combates dobles','Combates múltiples','Registro adicional'];const modes=[];
  for(let i=0;i<4;i++){const a=ofs+8*i;const raw=[u16(b,a),u16(b,a+2),u16(b,a+4),u16(b,a+6)];
   modes.push({name:labels[i],normalCurrent:raw[0]===0xffff?null:raw[0],superCurrent:raw[1]===0xffff?null:raw[1],normalBest:raw[2]===0xffff?null:raw[2],superBest:raw[3]===0xffff?null:raw[3]});}
  return {modes,source:'PKHeX.Core BattleTree7.GetTreeStreak; bloque 32, offset 0x6B800',note:'El cuarto registro puede estar reservado. Una racha guardada no acredita una escena concreta.'};
 }

 function parseHGSS(b){let variants=[0,0x40000].map(base=>tryHGSS(b,base)).filter(Boolean);
  if(!variants.length)return null;
  const integrity=root.PokemonHGSSIntegrity.inspect(b);
  const a=variants.find(v=>v.base===integrity?.base);
  if(!a)fail('La copia más reciente de HGSS no identifica una edición compatible. No se ha importado progreso.');
  const base=a.base, ver=a.v;
  validateVersion(ver,[7,8]);
  const johto=u8(b,base+0x64+0x1a),kanto=u8(b,base+0x64+0x1f),prog=u8(b,base+0x64+0x1d);
  const d=dex(b,{ofs:base+0x12B8,caught:4,seen:0x44,region:0x40,regions:1,max:493});
  const required=Array.from({length:493},(_,i)=>i+1).filter(i=>!MYTHICAL4.has(i));
  const missing=required.filter(i=>!d.caught.includes(i));
  return details({game:ver===7?'HEARTGOLD':'SOULSILVER',keyItems:keyItemsHGSS(b,base),unownForms:unownHGSS(b,base),tower4:{records:[0,2,4,6,8].map(i=>u16(b,base+0x5264+i*2))},integrity,version:ver,generation:4,format:'DS 512 KiB',trainer:str4(b,base+0x64,16),tid:u16(b,base+0x74),sid:u16(b,base+0x76),playtime:time(b,base+0x86),firstHallOfFameSeconds:u32(b,base+0x3C),badgesJohto:bits(johto),badgesKanto:bits(kanto),badgesJohtoMask:johto,badgesKantoMask:kanto,badgesTotal:bits(johto)+bits(kanto),gameClear:!!(prog&1),nationalDex:!!(prog&2),missingRequired:missing,requiredCount:required.length,requiredCaught:required.length-missing.length,pokeathlon:parsePokeathlon4(b,base),pokewalker:parsePokewalker4(b,base),saveBase:base,slotInfo:`Ranura de guardado ${base?'secundaria':'principal'}`,notes:['Pokédex: «capturado» incluye intercambios; no acredita dónde apareció ni si completaste la escena.','Bloque general seleccionado por contadores mayor/menor y comprobado por CRC. Cajas y bloques adicionales aún no tienen validación de integridad en este lector.']},b,d);
 }
 function tryB2W2(b,base){if(base+0x26000>b.length)return null;const v=u8(b,base+0x1941F);if(![22,23].includes(v))return null;return {base,v};}
 function parseB2W2(b){const candidate=tryB2W2(b,0);if(!candidate)return null;const {base,v}=candidate;validateVersion(v,[22,23]);const integrity=root.PokemonSaveIntegrity.b2w2(b);
  const d=dex(b,{ofs:base+0x21400,caught:8,seen:0x5c,region:0x54,regions:4,max:649});
  const required=Array.from({length:649},(_,i)=>i+1).filter(i=>!MYTHICAL5.has(i));const missing=required.filter(i=>!d.caught.includes(i));
  const toFameLow=u32(b,base+0x1D900+0x3C),toFameHigh=u32(b,base+0x1D900+0x40);
  // Metro Batalla: bloque 57 «Battle Subway Score Info» (0x21B00 + base; BattleSubway5 de PKHeX).
  const sw=base+0x21B00,subway5={singleRecord:u16(b,sw+0x1A),doubleRecord:u16(b,sw+0x1C),superSingleRecord:u16(b,sw+0x24),superDoubleRecord:u16(b,sw+0x26),superMultiNpcRecord:u16(b,sw+0x28)};
  // Musical (bloque 42, Musical5 de PKHeX): 100 bits de complementos en +0x258. PWT (bloque 63, PWTBlock5): u16 por torneo en +0x5C.
  const mus=base+0x1F700+0x258,musical5={props:Array.from({length:100},(_,i)=>(u8(b,mus+(i>>3))>>(i&7))&1).reduce((a,x)=>a+x,0),total:100};
  // Zona Nexo (bloque 53, Entralink5 de PKHeX): niveles blanco (+0x0C) y negro (+0x0E).
  // Objetos clave (bloque 25, PlayerBag5B2W2 de PKHeX: bolsillo KeyItems en +0x4D8, entradas u16 id + u16 cantidad).
  const keyItems=[];for(let i=0;i<(0x624-0x4D8)/4;i++){const id=u16(b,base+0x18400+0x4D8+i*4),count=u16(b,base+0x18400+0x4DA+i*4);if(id>0&&id<1000&&count>0)keyItems.push({id,count});}
  // Estudios Cinematográficos Pokéwood (bloque 71 de SaveBlockAccessor5B2W2, 0x25A00): 40 registros de 20 bytes desde +0x28 (mejor puntuación
  // u32, −9999 si nunca se rodó; u16 en +16 = 1 al completar la película). Contrastado con las partidas del propietario.
  const ps=base+0x25A00,pokestar5={completed:Array.from({length:40},(_,i)=>u16(b,ps+0x28+i*20+16)===1).filter(Boolean).length,total:40};
  const entralink5={white:u16(b,base+0x21200+0x0C),black:u16(b,base+0x21200+0x0E)};
  const pwt5={records:Array.from({length:29},(_,i)=>u16(b,base+0x23700+0x5C+i*2))};
  return details({game:v===22?'WHITE2':'BLACK2',subway5,musical5,pwt5,entralink5,keyItems,pokestar5,integrity,version:v,generation:5,format:'DS 512 KiB',trainer:str(b,base+0x19404,16),tid:u16(b,base+0x19414),sid:u16(b,base+0x19416),playtime:time(b,base+0x19424),badges:bits(u8(b,base+0x21104)),badgesMask:u8(b,base+0x21104),gameClear:!!(toFameLow||toFameHigh),nationalDex:!!(u32(b,base+0x21404)&1),missingRequired:missing,requiredCount:required.length,requiredCaught:required.length-missing.length,medals:parseMedals5(b,base),saveBase:base,slotInfo:'Bloques nativos de quinta generación; no se seleccionan por horas jugadas',notes:['Guardado detectado como '+(v===22?'Blanco 2':'Negro 2')+'. Las especies, premios y escenarios exclusivos cambian según la edición.','La Pokédex registra posesión histórica, no necesariamente especies presentes en las cajas.']},b,d);
 }
 // PKHeX PlayerBag6XY/AO, InventoryPouch4 and SaveBlockAccessor6XY/AO at the pinned revision.
 // Pocket slot counts follow the API, not the unused padding between pockets.
 function inventory6(b,oras){
  const layout=oras?[['Items',0,305],['KeyItems',0x640,47],['TMHMs',0x7c0,107],['Medicine',0x970,54],['Berries',0xa70,67]]:
   [['Items',0,289],['KeyItems',0x640,32],['TMHMs',0x7c0,105],['Medicine',0x968,51],['Berries',0xa68,67]];
  return layout.map(([pocket,offset,slots])=>{
   const items=[];for(let i=0;i<slots;i++){const pos=0x400+offset+i*4,id=u16(b,pos),count=u16(b,pos+2);if(id>0&&count>0)items.push({id,count});}
   return {pocket,items};
  });
 }
 // PKHeX PlayerBag7USUM and InventoryItem7: packed 10-bit IDs/counts, not two u16s.
 function inventory7(b){
  const layout=[['Items',0,427],['Medicine',0xb74,60],['TMHMs',0x9c4,108],['Berries',0xc64,67],['KeyItems',0x6ac,198],['ZCrystals',0xd70,35],['BattleItems',0xdfc,11]];
  return layout.map(([pocket,offset,slots])=>{const items=[];for(let i=0;i<slots;i++){
   const value=u32(b,offset+i*4),id=value&0x3ff,count=(value>>>10)&0x3ff;if(id>0&&count>0)items.push({id,count});
  }return {pocket,items};});
 }
 function beef(b){return u32(b,b.length-0x1f0)===0x42454546}
 function parseXY(b){const v=u8(b,0x14004);validateVersion(v,[24,25]);if(!beef(b))fail('No se encuentra la firma BEEF de un guardado 3DS descifrado. Exporta el archivo main del emulador o de Checkpoint.');const d=dex(b,{ofs:0x15000,caught:8,seen:0x68,region:0x60,regions:4,max:721});
  const integrity=root.PokemonSaveIntegrity.beef(b,55,'ccitt'),inventory=inventory6(b,false);
  // Castillo Batalla: bloque 42 «SubEvent Log» (0x1D800); rango en los 4 bits bajos del u16 (BattleChateauRank6 de
  // PKHeX: 0 Barón … 5 Gran Duque) y puntos en los 12 altos.
  const chateau={rank:u16(b,0x1D800)&0xF,points:u16(b,0x1D800)>>>4};
  return details({game:v===24?'X':'Y',chateau,inventory,keyItems:inventory.find(p=>p.pocket==='KeyItems').items,integrity,version:v,generation:6,format:'3DS main descifrado',trainer:str(b,0x14048,26),tid:u16(b,0x14000),sid:u16(b,0x14002),playtime:time(b,0x1800),badges:bits(u8(b,0x420C)),badgesMask:u8(b,0x420C),gameClear:u32(b,0x1220)>0,secondsToFame:u32(b,0x1220),nationalDex:!!(u32(b,0x15004)&1),requiredCount:null,missingRequired:null,notes:['La tarjeta de Y exige registrar avistamientos de la Pokédex regional de Kalos: el conteo nacional por sí solo no permite validarla.','No se puede demostrar que un legendario fuera capturado en su encuentro original usando solamente la Pokédex.']},b,d);
 }
 function parseORAS(b){const v=u8(b,0x14004);validateVersion(v,[26,27]);if(!beef(b))fail('Guardado 3DS sin firma BEEF. Necesitamos el archivo main descifrado.');const d=dex(b,{ofs:0x15000,caught:8,seen:0x68,region:0x60,regions:4,max:721});
  const integrity=root.PokemonSaveIntegrity.beef(b,58,'ccitt'),inventory=inventory6(b,true);
  return details({game:v===26?'ALPHASAPPHIRE':'OMEGARUBY',inventory,keyItems:inventory.find(p=>p.pocket==='KeyItems').items,integrity,version:v,generation:6,format:'3DS main descifrado',trainer:str(b,0x14048,26),tid:u16(b,0x14000),sid:u16(b,0x14002),playtime:time(b,0x1800),badges:bits(u8(b,0x420C)),badgesMask:u8(b,0x420C),gameClear:u32(b,0x1220)>0,secondsToFame:u32(b,0x1220),nationalDex:!!(u32(b,0x15004)&1),requiredCount:null,missingRequired:null,notes:['El requisito de tarjeta se basa en la Pokédex regional de Hoenn. No se deduce únicamente del total de especies nacionales vistas.','Episodio Delta, concursos y bases secretas requieren revisar registros adicionales.']},b,d);
 }
 function parseUSUM(b){const v=u8(b,0x1404);validateVersion(v,[32,33]);if(!beef(b))fail('Guardado 3DS sin firma BEEF. Exporta main sin cifrar.');const d=dex(b,{ofs:0x2C00,caught:0x88,seen:0xF0,region:0x8C,regions:4,max:807});
  const integrity=root.PokemonSaveIntegrity.beef(b,39,'usb'),inventory=inventory7(b);
  return details({game:v===33?'ULTRAMOON':'ULTRASUN',passport:{mask:(u32(b,0x4408)>>>4)&0x7fff},inventory,keyItems:inventory.find(p=>p.pocket==='KeyItems').items,integrity,version:v,generation:7,format:'3DS main descifrado',trainer:str(b,0x1438,26),tid:u16(b,0x1400),sid:u16(b,0x1402),playtime:time(b,0x41000),battleTree:parseBattleTree7(b),gameClear:u32(b,0x4A30)>0,secondsToFame:u32(b,0x4A30),nationalDex:null,requiredCount:null,missingRequired:null,notes:['El pasaporte utiliza la Pokédex regional de Alola y 15 sellos; el total de especies nacionales aquí es informativo.','Pruebas de islas, sellos y eventos concretos no se certifican automáticamente sin mapear sus registros.']},b,d);
 }
 function parseArray(input){const b=input instanceof Uint8Array?input:new Uint8Array(input);ensureReal(b);if(b.length===LENGTHS.XY)return parseXY(b);if(b.length===LENGTHS.ORAS)return parseORAS(b);if(b.length===LENGTHS.USUM)return parseUSUM(b);
  if(b.length===LENGTHS.NDS){const h=parseHGSS(b);if(h)return h;const b2=parseB2W2(b);if(b2)return b2;unsupported('Guardado DS de 512 KiB, pero no corresponde de forma reconocible a HeartGold/SoulSilver, Blanco 2 ni Negro 2. Puede estar cifrado, ser otra edición o tener un formato no compatible.');}
  if(b.length>LENGTHS.NDS&&b.length<=LENGTHS.NDS+0x1000){return parseArray(b.slice(0,LENGTHS.NDS));}
  unsupported(`Tamaño no reconocido: ${b.length.toLocaleString('es-ES')} bytes. DS: 524.288 bytes; Y: ${LENGTHS.XY}; Rubí Omega: ${LENGTHS.ORAS}; Ultrasol: ${LENGTHS.USUM}. Si es un estado rápido, exporta el guardado interno del juego.`);
 }
 function missingLabel(id){const name=root.PokemonSpecies?.name(id)||NAME_BY_ID[id];return name?`#${String(id).padStart(3,'0')} ${name}`:`#${String(id).padStart(3,'0')}`}
 root.PokemonSaveReader={parse:parseArray,missingLabel,names:NAME_BY_ID,version:'5.4-shared' };
})(typeof window!=='undefined'?window:globalThis);
