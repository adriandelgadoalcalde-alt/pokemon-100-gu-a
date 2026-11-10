/* Switch Kanto story, with secret techniques and remake-specific access requirements. */
(function(root){
 'use strict';
 const routes=[
  {
    "games": [
      "LETGOP",
      "LETGOE"
    ],
    "mission": "01",
    "location": "Pueblo Paleta → Ciudad Verde → Bosque Verde → Ciudad Plateada",
    "requires": [],
    "steps": [
      "Busca al profesor Oak por la salida norte de Paleta y completa la captura del compañero: Pikachu en su edición o Eevee en la suya. La edición fija el compañero; no eliges entre ambos en el laboratorio.",
      "En el laboratorio recibe a tu compañero y la Pokédex de Oak. Al salir habla con tu madre para el mapa y sube por Ruta 1 hasta Ciudad Verde.",
      "Recibe el paquete de Oak en Ciudad Verde y vuelve al laboratorio para entregarlo. Oak explica las bayas y entrega las Frambu; la Pokédex ya se obtuvo antes del paquete.",
      "Regresa a Ciudad Verde con Poké Balls y continúa por Ruta 2 hasta Bosque Verde. Las capturas normales usan lanzamiento y bayas, sin debilitar primero al Pokémon con ataques.",
      "Cruza el bosque hasta Ciudad Plateada. Conserva un Pokémon de tipo Planta o Agua en el equipo para demostrar el requisito de entrada al gimnasio de Brock; un ataque de ese tipo en otro Pokémon no basta."
    ],
    "check": "Compañero, Pokédex, paquete entregado y llegada a Plateada.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_1",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_2",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_3"
    ],
    "pitfalls": [],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "LETGOP",
      "LETGOE"
    ],
    "mission": "02",
    "location": "Los ocho gimnasios y las técnicas secretas de Kanto",
    "requires": [
      "Llegada a Ciudad Plateada; completar los accesos intercalados del recorrido Rocket"
    ],
    "steps": [
      "Brock, Plateada: muestra un Pokémon de tipo Planta o Agua para entrar y vence al líder. Continúa por Ruta 3 y Monte Moon, elige Helix o Domo tras el científico y sal por Ruta 4 hacia Celeste.",
      "Misty, Celeste: presenta un Pokémon de nivel 15 o superior. Cruza también Puente Pepita y las rutas 24–25 para ayudar a Bill con su teletransportador y recibir el ticket del S.S. Anne.",
      "Baja por Ruta 5 y el túnel subterráneo a Ruta 6 hasta Carmín. Entra al S.S. Anne con el ticket, vence al rival y ayuda al capitán para que enseñe Tala al compañero. No se ocupa una casilla de sus movimientos.",
      "Lt. Surge, Carmín: usa Tala en el arbusto del gimnasio. Encuentra dos interruptores en cubos adyacentes; la pista del cubo azul ayuda, y ninguno junto al rojo sirve. Fallar el segundo reinicia la búsqueda.",
      "Cruza Cueva Diglett desde Ruta 11 y visita al ayudante de Oak en la casa de Ruta 2. Con diez especies diferentes capturadas enseña Fulgor al compañero. Regresa a Celeste, cruza las rutas 9–10 y atraviesa Túnel Roca hasta Lavanda.",
      "Ve por Ruta 8 y el túnel subterráneo de las rutas 8–7 hasta Azulona. Erika exige mostrar un Pokémon adorable: tu compañero satisface la entrada. Usa Tala para el acceso y recorre sus jardines hasta vencerla.",
      "Intercala ahora el recorrido Rocket de la misión 03: consigue Visor Silph en la guarida de Azulona, rescata al Sr. Fuji en la Torre y recibe Poké Flauta. También recoge el Té de Brock en Azulona para los guardias de Azafrán.",
      "Despierta un Snorlax con Poké Flauta para abrir las rutas hacia Fucsia. Puedes ir por las rutas 16–18 o 12–15. Koga exige cincuenta especies capturadas distintas; el total de ejemplares repetidos no cumple la entrada.",
      "En Fucsia habla con el hombre del Lapras, junto al área del GO Park, para Surcaaguas. Baja a la playa de Ruta 19: Jessie y James entregan la Dentadura de Oro. Devuélvela al guarda de su casa de Fucsia para aprender Empuje.",
      "Libera Silph S.A. en Azafrán siguiendo la misión 03. Sabrina requiere un Pokémon de nivel 45 o superior; recorre los teletransportadores hasta su plataforma y vence su equipo.",
      "Con Surcaaguas y Empuje puedes cruzar Islas Espuma hacia Isla Canela. Otra ruta es navegar al sur de Pueblo Paleta por Ruta 21. En Canela explora Mansión Pokémon y recoge la Llave Secreta del sótano para abrir el gimnasio.",
      "Blaine presenta cinco preguntas. Las respuestas son Magmar, ocho medallas, poco eficaz para Acero contra Fuego, falso en la afirmación sobre MT28 y cualquiera de los nombres ofrecidos en la última. Vence a Blaine después de reunir sus muñecos.",
      "Con siete medallas vuelve al gimnasio de Ciudad Verde. Si sigue cerrado, habla con el rival y visita el laboratorio de Oak en Paleta: Azul entrega la Piedra Activadora y las megapiedras de los iniciales de Kanto.",
      "Regresa a Ciudad Verde, recorre las baldosas de giro y vence a Giovanni para la octava medalla. Con las ocho, sigue Ruta 22 hacia la entrada de la Liga."
    ],
    "check": "Ocho medallas, cinco técnicas secretas y accesos a Liga.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_3",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_4",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_5",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_6",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_7",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_8",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_11",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_12",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_13",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_14",
      "https://www.serebii.net/letsgopikachueevee/gyms.shtml",
      "https://www.serebii.net/letsgopikachueevee/secrettechniques.shtml"
    ],
    "pitfalls": [
      "Esta misión y la misión 03 se intercalan. La Torre y Silph desbloquean pasos de los gimnasios: no intentes obtener las ocho medallas antes de resolver sus bloqueos.",
      "Las rutas de teletransportadores, giros, corrientes y muros invisibles todavía no tienen aquí un mapa casilla por casilla certificado."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "LETGOP",
      "LETGOE"
    ],
    "mission": "03",
    "location": "Lavanda → guarida de Azulona → Torre Pokémon → Silph S.A.",
    "requires": [
      "Acceso por Túnel Roca y Ciudad Azulona"
    ],
    "steps": [
      "En la primera visita a la Torre de Lavanda sigue las escenas con el rival y Cubone. Los fantasmas no se resuelven aún: necesitas Visor Silph de la guarida Rocket de Azulona.",
      "En el salón de juegos de Azulona vence al recluta que protege el póster y activa el interruptor de detrás para abrir la escalera secreta.",
      "Baja por la guarida, supera las baldosas de giro y llega al recluta de la Llave Ascensor. Tras vencerlo, examina dónde la lanza y la rejilla de ventilación; mueve la silla azul bajo la rejilla.",
      "Controla a Pikachu o Eevee por la ventilación y las pasarelas superiores para recoger la llave. Regresa al ascensor y baja al sector del despacho; vence a Jessie y James, al ejecutivo Rocket y finalmente a Giovanni para el Visor Silph.",
      "Al salir, habla con el hombre del vehículo de globos junto al salón: enseña Surcacielos. Regresa a la Torre de Lavanda con Visor Silph para identificar a los fantasmas y resolver la escena de Marowak y Cubone.",
      "Llega a la planta superior, supera la intervención del Team Rocket y rescata al Sr. Fuji. Habla con él en su casa para recibir Poké Flauta, necesaria para despertar a los Snorlax de las rutas 12 y 16.",
      "En Azulona recoge el Té que entrega Brock delante del edificio de apartamentos. Llévalo a uno de los guardias de las entradas a Azafrán para que abran el paso; no se utiliza una bebida de las máquinas de los originales.",
      "En Silph S.A. vence a Azul en el encuentro inicial y sube hasta la quinta planta. Combate junto al rival contra el ejecutivo Rocket y el recluta; tras el combate recibes la Tarjeta Llave. No se recoge sola del suelo como en otros Kanto.",
      "Con la tarjeta vuelve a la tercera planta, abre la habitación central y usa su teletransportador a la sala noroeste de la séptima. El rival retiene al ejecutivo para que uses el panel hacia el ala oeste de la undécima.",
      "Vence a Jessie y James en el pasillo y a Giovanni junto al presidente. Habla después con el presidente para recibir la Master Ball. Silph queda liberada y puedes continuar con el gimnasio de Sabrina."
    ],
    "check": "Visor, Poké Flauta, técnicas de desplazamiento, Silph liberada y Master Ball.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_9",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_10",
      "https://www.serebii.net/letsgopikachueevee/secrettechniques.shtml",
      "https://www.serebii.net/letsgopikachueevee/teamrocket.shtml"
    ],
    "pitfalls": [],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "LETGOP",
      "LETGOE"
    ],
    "mission": "04",
    "location": "Ruta 22 → Ruta 23 → Calle Victoria → Meseta Añil",
    "requires": [
      "Ocho medallas, Surcaaguas y Empuje"
    ],
    "steps": [
      "Ve desde Ciudad Verde a Ruta 22 y supera al rival. Continúa por los controles de medallas de Ruta 23 y usa Surcaaguas en los pasos acuáticos para llegar a Calle Victoria.",
      "En la primera planta usa Empuje: el primer bloque se mueve una casilla al este sobre el interruptor. Al bajar el muro central puedes seguir por el relieve y alcanzar la escalera del noroeste.",
      "En la segunda planta, el bloque inicial del sur llega al interruptor con izquierda 1, abajo 1 e izquierda 2. Recorre la zona elevada hasta la escalera de la siguiente planta.",
      "En la tercera planta localiza a la agente que cura el equipo. Desde el bloque cercano, con las posiciones iniciales, sigue arriba 1, izquierda 2, abajo 1, izquierda 4, abajo 3 y derecha 1 para el interruptor del noroeste.",
      "Sigue por las zonas elevadas hasta el bloque junto al agujero del sector oriental. Empújalo al agujero, baja tras él y muévelo al oeste hasta el interruptor. Usa el camino que abre para subir y llegar a las escaleras de salida.",
      "Alcanza Meseta Añil y prepara curaciones de estados y PP antes de entrar. Vence en orden a Lorelei, Bruno, Agatha y Lance; no se usan las alineaciones de las revanchas del postgame.",
      "El campeón es tu rival, que abre con Mega-Pidgeot. Conserva recursos para su equipo completo y vence para registrar el Hall de la Fama.",
      "Tras los créditos se abren Cueva Celeste y los Entrenadores Maestros. Consulta las misiones 05 y 06 para Mewtwo, la escena posterior de la cueva, títulos y Rojo."
    ],
    "check": "Primer Hall de la Fama y accesos al postgame.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_15",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_and_Let%27s_Go,_Eevee!/Part_16"
    ],
    "pitfalls": [
      "Los recorridos de bloques parten de sus posiciones iniciales. Los desvíos de objetos y Moltres deben consultarse aparte; la ampliación no declara cerrados todos los mapas interiores."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  }
];
 if(typeof module==='object'&&module.exports)module.exports=routes;else root.PokemonLetsGoRoutes=routes;
})(globalThis);
