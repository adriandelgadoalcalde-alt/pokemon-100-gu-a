// SPDX-License-Identifier: GPL-3.0-or-later
// Spanish names: PKHeX.Core text_medals_es.txt, pinned engine revision.
// Corresponding complete sources and license are distributed in engine/.
(function(root){
 'use strict';
 const names=["Primer Paso", "Finalista", "Aspirante", "Profesional", "Maestría", "Leyenda", "Gurú de las Insignias", "Paseante", "Excursionista", "Nómada", "Trotamundos", "Cronista Novel", "Cronista Habitual", "Cronista Tenaz", "Cronista Eminente", "Fan de Centro Pokémon", "Primeras Pistas", "Todas las Pistas", "Curiosidad Artística", "Ciclista Novel", "Ciclista Ocasional", "Ciclista Habitual", "Ciclista Profesional", "Debut Pesca", "Buena Pesca", "Superpesca", "As de la Pesca", "Colección Normal", "Colección Fuego", "Colección Agua", "Colección Eléctrico", "Colección Planta", "Colección Hielo", "Colección Lucha", "Colección Veneno", "Colección Tierra", "Colección Volador", "Colección Psíquico", "Colección Bicho", "Colección Roca", "Colección Fantasma", "Colección Dragón", "Colección Siniestro", "Colección Acero", "Colección Teselia", "Colección Nacional", "Caja 30", "Caja 120", "Caja 360", "Caja a Tope", "Captura Masiva", "Sed Insaciable", "Bebida Extra", "Evolución Incipiente", "Evolución Prometedora", "Evolución Magistral", "Evolución Suprema", "Piloto Magistral", "Empujarrocas", "Curiosidad Banal", "Estreno del Zahorí", "Aprendiz del Zahorí", "Profesional del Zahorí", "As del Zahorí", "Inventamotes", "Caja Tonta", "Cliente Regular", "Cliente Comedido", "Cliente Desprendido", "Cliente Millonario", "Cliente Multimillonario", "Cliente Sabio", "Hogar, Dulce Hogar", "Primer Encuentro", "30 Conocidos", "100 Conocidos", "1000 Conocidos", "Poder Regalo +", "Poder Regalo ++", "Poder Regalo +++", "Poder Regalo MAX", "Cabezada", "Siesta", "Primer Sueño", "Sueño Profundo", "Alma Exploradora", "Huevo I", "Huevo X", "Huevo L", "Huevo C", "Viva la Guardería", "Paleontología", "Corazón Puro", "Color de la Suerte", "Cazapokérus", "Cabecilla Porcelana", "Entusiasta de Trenes", "Avistamiento Wailord", "Fotorrecuerdo", "Fan de la Mecánica", "Submarinista", "Prismas de Hielo", "Entusiasta de Puentes", "Teselia Entera", "Espíritu Aventurero", "Cinturón Amarillo", "Cinturón Verde", "Cinturón Azul", "Cinturón Negro", "Debut en Combate", "Afición al Combate", "Pericia en Combate", "Maestría en Combate", "Complejo Magikarp", "Inquebrantable", "Acción Fútil", "Eficacia Extrema", "Pase Diario", "Pase Semanal", "Pase Mensual", "Pase Anual", "Exprés Individual", "Exprés Doble", "Exprés Múltiple", "1 Test", "10 Test", "30 Test", "50 Test", "Experiencia Millonaria", "PB de Honor", "Caza Oportuna", "Afición Deportiva", "Crucero Vespertino", "Trofeo Fayenza", "Trofeo Préstamo", "Trofeo Trueque", "Trofeo Teselia", "Trofeo Kanto", "Trofeo Johto", "Trofeo Hoenn", "Trofeo Sinnoh", "Trofeo Líderes", "Trofeo Campeones", "Supertrofeo Préstamo", "Supertrofeo Trueque", "Supertrofeo Tipos", "Mitad Rascacielos", "Ático Rascacielos", "Cavernogal Profundo", "Cavernogal Abismal", "Victorias contra 20", "Victorias contra 50", "Victorias contra 100", "Victorias contra 1000", "Victoria Fácil", "Victoria Difícil", "Tumbajefes Fácil", "Tumbajefes Difícil", "Santiamén Fácil", "Santiamén Difícil", "Espíritu Combativo", "1 Intercambio", "10 Intercambios", "50 Intercambios", "100 Intercambios", "Intercambio Mixto", "Correo Postal", "Portento Artístico", "Artista Amateur", "Artista Revelación", "Estrella en Ciernes", "Ídolo de Musicales", "Gurú de la Moda", "Club de Admiradores", "Primera Amistad", "Cuadrilla", "Pandilla", "Círculo Internacional", "Intercambio Giro", "Fan Compatibilidad", "Gran Compatibilidad", "Vueltas en la Noria", "Guía Novel", "Guía Júnior", "Guía Sénior", "Guía Estrella", "Alma de Emprendedor", "Alma de Comerciante", "Alma de Negociante", "Alma de Magnate", "10 Regalos", "30 Regalos", "50 Regalos", "100 Regalos", "Mi Avenida", "Fan del Minijuego", "Amante del Minijuego", "Fiebre del Minijuego", "Hacha del Minijuego", "50 Globopuntos", "200 Globopuntos", "500 Globopuntos", "1000 Globopuntos", "Estreno Superhéroes", "Superhéroes", "Acción", "Extraterrestres", "Monstruos", "Ciencia Ficción", "Romance", "Fantasía", "Comedia", "Thriller", "Robots", "Terror", "Final Heroico", "Estrella del Celuloide", "Intérprete Sublime", "Taquillazo", "Debut Culto", "Culto Consagrado", "Festigrupo", "Festigentío", "Puntuacién", "Puntuamil", "Festianfitrión 10", "Festianfitrión 50", "Participante Nivel 1", "Participante Nivel 2", "Proeza Nivel 1", "Proeza Nivel 2", "Proeza Nivel 3", "Dulces Sueños", "Primeros Recuerdos", "Buena Memoria", "Espíritu Divertido", "As Normal", "As Fuego", "As Agua", "As Eléctrico", "As Planta", "As Hielo", "As Lucha", "As Veneno", "As Tierra", "As Volador", "As Psíquico", "As Bicho", "As Roca", "As Fantasma", "As Dragón", "As Siniestro", "As Acero", "Victoria en Solitario", "Espíritu Desafiante"];
 const groups=[['Especial',0,7],['Aventura',7,105],['Combate',105,161],['Entretenimiento',161,236],['Desafío',236,255]];
 const labels=['Sin pista','Pista disponible','Pista recibida','Lista para recoger','Recibida'];
 function validDate(value){
  if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return null;
  const [y,m,d]=value.split('-').map(Number),date=new Date(Date.UTC(y,m-1,d));
  return y>=2000&&y<=2127&&date.getUTCFullYear()===y&&date.getUTCMonth()===m-1&&date.getUTCDate()===d?value:null;
 }
 function snapshot(d){
  if(!['BLACK2','WHITE2'].includes(d?.game)||!Array.isArray(d.medals?.medals))return null;
  const byId=new Map();
  for(const medal of d.medals.medals){
   if(!medal||!Number.isInteger(medal.id)||medal.id<1||medal.id>255)continue;
   byId.set(medal.id,byId.has(medal.id)?null:medal);
  }
  const entries=names.map((name,index)=>{
   const m=byId.get(index+1),state=Number.isInteger(m?.state)&&m.state>=0&&m.state<=4?m.state:null;
   return {id:index+1,name,group:groups.find(g=>index>=g[1]&&index<g[2])[0],state,
    label:state===null?'Estado sin interpretar':labels[state],obtained:state===4,ready:state===3,
    date:[2,3,4].includes(state)?validDate(m?.date):null};
  });
  const obtained=entries.filter(m=>m.obtained).length,ready=entries.filter(m=>m.ready).length,unknown=entries.filter(m=>m.state===null).length;
  return {entries,obtained,ready,unknown,total:255,complete:unknown?null:obtained===255};
 }
 function render(d,esc){
  if(!['BLACK2','WHITE2'].includes(d?.game))return '';
  const data=snapshot(d);
  if(!data)return '<section class="panel"><h3>Medallero</h3><p>Este diagnóstico no contiene el Medallero. Carga el guardado con el lector actualizado para consultar sus estados.</p></section>';
  return `<section class="panel medal-book" data-medal-book><h3>Tu Medallero de Teselia</h3><p><b>${data.obtained}/255 recibidas</b> · ${data.ready} ${data.ready===1?'lista':'listas'} para recoger${data.unknown?' · '+data.unknown+' sin interpretar':''}</p><p>Una pista o una medalla lista para recoger todavía no cuenta como recibida. Habla con el personaje que entrega medallas en el Centro Pokémon para recibir las que estén listas. Las fechas son las registradas en la partida; no reconstruyen el momento de cada acción.</p><div class="actions" style="display:grid;grid-template-columns:minmax(0,1fr);gap:8px"><input style="width:100%;min-width:0" data-medal-query type="search" placeholder="Buscar medalla" aria-label="Buscar medalla"><select style="width:100%;min-width:0" data-medal-filter aria-label="Filtrar medallas"><option value="pending">Pendientes y sin interpretar</option><option value="ready">Listas para recoger</option><option value="obtained">Recibidas</option><option value="unknown">Sin interpretar</option><option value="all">Todas</option></select></div><p data-medal-count role="status"></p><ol style="padding-left:24px">${data.entries.map(m=>`<li value="${m.id}" data-medal-id="${m.id}" data-medal-state="${m.state===null?'unknown':m.state}" data-medal-name="${esc(m.name)}" style="padding:10px 0;overflow-wrap:anywhere"><b>${esc(m.name)}</b><br><span class="small">${esc(m.group)} · ${esc(m.label)}${m.date?' · '+esc(m.date.split('-').reverse().join('/')):''}</span></li>`).join('')}</ol><p class="small"><a href="https://www.serebii.net/black2white2/medals.shtml" target="_blank" rel="noopener noreferrer">Consultar los requisitos de las medallas</a>. El estado describe lo que conserva este guardado.</p></section>`;
 }
 const searchable=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 function wire(container){
  for(const panel of container.querySelectorAll('[data-medal-book]')){
   const query=panel.querySelector('[data-medal-query]'),filter=panel.querySelector('[data-medal-filter]');
   const update=()=>{
    const term=searchable(query.value.trim());let visible=0;
    for(const row of panel.querySelectorAll('[data-medal-id]')){
     const state=row.dataset.medalState,mode=filter.value;
     const status=mode==='all'||mode==='pending'&&state!=='4'||mode==='ready'&&state==='3'||mode==='obtained'&&state==='4'||mode==='unknown'&&state==='unknown';
     row.hidden=!(status&&searchable(row.dataset.medalName).includes(term));if(!row.hidden)visible++;
    }
    panel.querySelector('[data-medal-count]').textContent=visible+(visible===1?' medalla visible':' medallas visibles');
   };
   query.oninput=update;filter.onchange=update;update();
  }
 }
 const api={snapshot,render,wire};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonMedalBook=api;
})(globalThis);
