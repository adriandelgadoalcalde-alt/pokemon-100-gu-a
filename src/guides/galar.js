/* Galar routes retain edition-specific gyms and separate first title from the postgame. */
(function(root){
 'use strict';
 const routes=[
  {
    "games": [
      "SWORD",
      "SHIELD"
    ],
    "mission": "01",
    "location": "Pueblo Yarda → Pueblo Par → Ruta 2 → Área Silvestre → Ciudad Pistón",
    "requires": [],
    "steps": [
      "En Pueblo Yarda recoge mochila y gorra, visita a Paul y ve con él a la estación de Pueblo Par para recibir a Lionel. Regresa a Yarda: allí eliges Grookey, Scorbunny o Sobble.",
      "Combate con Paul y entra en Bosque Oniria para buscar al Wooloo que escapó. El encuentro entre la niebla no es una captura disponible; continúa hasta que Lionel os rescate.",
      "Ve al laboratorio de Pueblo Par para recibir la Pokédex de Sonia. Continúa por Ruta 2, completa la explicación de capturas de Lionel y llega a casa de la profesora Magnolia.",
      "Vence otra vez a Paul ante la casa: Lionel entrega la carta de recomendación. Después de la estrella caída y la noche en casa de Magnolia recibes la Muñequera Dinamax.",
      "Vuelve a la estación de Pueblo Par y viaja con Paul. El tren se detiene antes de Pistón: atraviesa el Área Silvestre desde la estación hacia la ciudad. No necesitas completar todas sus incursiones ni capturas para seguir.",
      "En Ciudad Pistón sigue a Sonia por el Centro Pokémon y acude al estadio para inscribirte con la carta de recomendación y escoger dorsal. Pasa la noche en el hotel después de resolver el bloqueo del Team Yell.",
      "A la mañana siguiente participa en la ceremonia del estadio. Recibe acceso al taxi volador y sal al oeste por Ruta 3, después del encuentro con Paul."
    ],
    "check": "Pokédex, recomendación, Muñequera Dinamax e inscripción en el desafío.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_1",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_2",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_3",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_4"
    ],
    "pitfalls": [],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SWORD",
      "SHIELD"
    ],
    "mission": "02",
    "location": "Ruta 3 → Mina de Galar → Ruta 4 → Pueblo Hoyuelo",
    "requires": [
      "Ceremonia de Ciudad Pistón completada"
    ],
    "steps": [
      "Recorre Ruta 3 desde Pistón y entra en Mina de Galar. Avanza por el camino de las vías hasta Berto; supera su combate para salir al norte hacia Ruta 4.",
      "Cruza Ruta 4 hacia Pueblo Hoyuelo. Sigue a Yamper hasta el mirador de los geoglifos para la explicación de Sonia, y después dirígete al estadio.",
      "En la prueba de Percy empuja al grupo de veinte Wooloo caminando por detrás de ellos hasta cada zona de llegada. Repite el avance por las tres secciones sin dejar ovejas rezagadas.",
      "Los Yamper desvían el rebaño. Vencer al entrenador de esa sección detiene su interferencia y facilita reunir a los veinte; esos combates son parte de resolver la prueba.",
      "Vence a Percy, de tipo Planta. Su Eldegoss usa Dinamax; conserva respuestas de Fuego, Volador o Bicho y recursos para resistir sus turnos de gran tamaño.",
      "Con la medalla puedes capturar hasta nivel 25. Sigue por Ruta 5: el siguiente acceso importante es la Bici Rotom, no una exploración completa obligatoria del Área Silvestre."
    ],
    "check": "Medalla Planta y salida hacia Ruta 5.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_5",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_6",
      "https://www.serebii.net/swordshield/gyms.shtml"
    ],
    "pitfalls": [],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SWORD",
      "SHIELD"
    ],
    "mission": "03",
    "location": "Ruta 5 → Pueblo Amura → Mina de Galar n.º 2 → Ciudad Pistón",
    "requires": [
      "Medalla Planta"
    ],
    "steps": [
      "En Ruta 5 entra en Cuidados Pokémon si quieres recibir a Toxel. En el puente ayuda al hombre acosado por el Team Yell para obtener la Bici Rotom; supera a Paul y llega a Pueblo Amura.",
      "Antes de entrar al estadio de Amura busca a Cathy junto al faro. Regresa al estadio cuando haya vuelto para iniciar su prueba de compuertas.",
      "En las compuertas de Cathy, desde el inicio, pulsa rojo, amarillo y otra vez el primer rojo. En la segunda plataforma llega al amarillo del fondo y luego activa el rojo de su entrada. En la tercera baja hacia la entrenadora, pulsa amarillo, vuelve al rojo de la plataforma anterior y alcanza el azul. Queda abierto el camino central al estadio.",
      "Vence a Cathy y su Drednaw Dinamax. Al terminar atiende la reunión del restaurante con Rose y Sonia antes de continuar hacia Mina de Galar n.º 2.",
      "En la segunda mina vence a Berto y supera el combate contra el Team Yell junto a Paul. Encuentra a Naboru entrenando y sal por las afueras de Pistón; vuelve al hotel para el encuentro con Roxy y descansar.",
      "La prueba de Naboru exige cinco puntos: debilitar un Pokémon da uno y capturarlo da dos. Hay otros entrenadores que pueden interferir; prepara capturas antes de entrar y revisa el marcador tras cada resultado.",
      "Vence a Naboru y su Centiskorch Gigamax. Con tres medallas cruza de nuevo el Área Silvestre hacia el norte hasta la puerta de Ciudad Artejo."
    ],
    "check": "Medallas Agua y Fuego, Bici Rotom y acceso a Ciudad Artejo.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_6",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_7",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_8",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_9",
      "https://www.wikidex.net/wiki/Gu%C3%ADa_de_Pok%C3%A9mon_Espada_y_Pok%C3%A9mon_Escudo/Medalla_Agua_y_Medalla_Fuego"
    ],
    "pitfalls": [
      "La secuencia de compuertas parte de los interruptores iniciales; si has pulsado otros, revisa los chorros o reinicia la prueba antes de seguirla."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SWORD"
    ],
    "mission": "04",
    "location": "Ciudad Artejo → Pueblo Ladera → Bosque Lumirinto → Pueblo Plié → Pueblo Auriga",
    "requires": [
      "Tres medallas y entrada a Ciudad Artejo"
    ],
    "steps": [
      "Visita el estadio de Artejo para la explicación energética de Rose y después la cámara de los tapices, al oeste, para hablar con Roy y Sonia. El gimnasio de Roy se reserva para la octava medalla.",
      "Sal por Ruta 6 hacia Pueblo Ladera y supera el encuentro con Paul. En esta edición el cuarto gimnasio lo dirige Judith: gira el control para orientar la taza y aprovecha los puños que la impulsan hasta cada salida.",
      "Vence a Judith y a su Machamp Gigamax. Al salir sube las escaleras del mural y derrota a Berto; completa la escena de las estatuas con Sonia antes de entrar al bosque.",
      "Cruza Bosque Lumirinto: toma la derecha en el primer cruce y continúa pegado al lado derecho por el camino que lleva a Pueblo Plié. Las setas iluminan el entorno, aunque algunas provocan encuentros.",
      "En la prueba de Sally las respuestas que favorecen tus estadísticas son Veneno o Acero, Amelia y huevos revueltos. Durante su combate responde La Hechicera, violeta y 16 años. Prepara también el combate contra Alcremie Gigamax.",
      "Vuelve a Ciudad Artejo con Sally, termina el encuentro con Berto y sal al este por las rutas 7–8. Supera a Paul y cruza el tramo de ruinas y el paso nevado hasta Pueblo Auriga.",
      "El sexto gimnasio es el de Morris. Usa el detector de trampillas: cuando la señal aumente cambia el rumbo antes de avanzar, y busca las plataformas seguras. Vence a su Coalossal Gigamax para reunir seis medallas."
    ],
    "check": "Medallas de Lucha y Roca, Hada y escena del mural resuelta.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_10",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_11",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_12",
      "https://www.wikidex.net/wiki/Gu%C3%ADa_de_Pok%C3%A9mon_Espada_y_Pok%C3%A9mon_Escudo/Medalla_Hada"
    ],
    "pitfalls": [
      "Los giros de taza y el detector se explican como mecánicas; todavía no se ofrece un plano de todas las posiciones seguras. Las respuestas de Sally usan la localización española, no los nombres de entrenadoras ingleses."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SHIELD"
    ],
    "mission": "04",
    "location": "Ciudad Artejo → Pueblo Ladera → Bosque Lumirinto → Pueblo Plié → Pueblo Auriga",
    "requires": [
      "Tres medallas y entrada a Ciudad Artejo"
    ],
    "steps": [
      "Visita el estadio de Artejo para la explicación energética de Rose y después la cámara de los tapices, al oeste, para hablar con Roy y Sonia. El gimnasio de Roy se reserva para la octava medalla.",
      "Sal por Ruta 6 hacia Pueblo Ladera y supera el encuentro con Paul. En esta edición el cuarto gimnasio lo dirige Alistair: gira el control para orientar la taza y aprovecha los puños que la impulsan hasta cada salida.",
      "Vence a Alistair y a su Gengar Gigamax. Al salir sube las escaleras del mural y derrota a Berto; completa la escena de las estatuas con Sonia antes de entrar al bosque.",
      "Cruza Bosque Lumirinto: toma la derecha en el primer cruce y continúa pegado al lado derecho por el camino que lleva a Pueblo Plié. Las setas iluminan el entorno, aunque algunas provocan encuentros.",
      "En la prueba de Sally las respuestas que favorecen tus estadísticas son Veneno o Acero, Amelia y huevos revueltos. Durante su combate responde La Hechicera, violeta y 16 años. Prepara también el combate contra Alcremie Gigamax.",
      "Vuelve a Ciudad Artejo con Sally, termina el encuentro con Berto y sal al este por las rutas 7–8. Supera a Paul y cruza el tramo de ruinas y el paso nevado hasta Pueblo Auriga.",
      "El sexto gimnasio es el de Mel. Usa el detector de trampillas: cuando la señal aumente cambia el rumbo antes de avanzar, y busca las plataformas seguras. Vence a su Lapras Gigamax para reunir seis medallas."
    ],
    "check": "Medallas de Fantasma y Hielo, Hada y escena del mural resuelta.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_10",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_11",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_12",
      "https://www.wikidex.net/wiki/Gu%C3%ADa_de_Pok%C3%A9mon_Espada_y_Pok%C3%A9mon_Escudo/Medalla_Hada"
    ],
    "pitfalls": [
      "Los giros de taza y el detector se explican como mecánicas; todavía no se ofrece un plano de todas las posiciones seguras. Las respuestas de Sally usan la localización española, no los nombres de entrenadoras ingleses."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SWORD",
      "SHIELD"
    ],
    "mission": "05",
    "location": "Pueblo Auriga → Ruta 9 → Pueblo Crampón → Ciudad Artejo",
    "requires": [
      "Seis medallas y Bici Rotom"
    ],
    "steps": [
      "Después del gimnasio visita el restaurante de Auriga con Sonia y Paul, sigue la conversación de los héroes y el combate junto a las termas. Luego sal al sur por Ruta 9.",
      "Ayuda otra vez al técnico de la Bici Rotom frente al Team Yell. Su mejora permite pedalear sobre el agua: úsala para cruzar la bahía hasta las afueras de Pueblo Crampón.",
      "La entrada principal está cerrada. Busca a Roxy junto al acceso lateral, vence su combate y entra por el paso que te muestra.",
      "Recorre la calle superando los bloqueos del Team Yell y las barreras de Mr. Mime. Vence a Nerio para la medalla Siniestro; este gimnasio no permite Dinamax.",
      "Tras los incidentes vuelve por Túnel Ruta 9 y Ruta 7 a Ciudad Artejo. Habla con los personajes ante el estadio para activar el último desafío.",
      "La prueba de Roy consiste en tres combates dobles en la cámara de los tapices, con lluvia, sol y granizo. Prepara dos Pokémon que funcionen juntos y vence después a Roy, que usa arena y Duraludon Gigamax."
    ],
    "check": "Ocho medallas y mejora acuática de la bicicleta.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_12",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_13",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_14"
    ],
    "pitfalls": [
      "El combate de gimnasio de Roy es doble. Su combate posterior en la Copa tiene otro equipo y formato; no se reutiliza el mismo plan automáticamente."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SWORD",
      "SHIELD"
    ],
    "mission": "06",
    "location": "Ruta 10 → Ciudad Puntera → Torre Rose → Bosque Oniria → Planta de Artejo",
    "requires": [
      "Ocho medallas"
    ],
    "steps": [
      "Desde la estación de Artejo viaja hacia Ruta 10, cruza la ruta nevada y llega a Ciudad Puntera. Inscríbete en el estadio cuando tu equipo esté preparado.",
      "Las semifinales son contra Roxy y después Paul. No hay un Alto Mando de cuatro salas; el torneo y sus interrupciones forman el desenlace de Galar.",
      "Cuando Lionel no llega a la reunión, sigue la investigación con Nerio. El empleado de Macro Cosmos se esconde sucesivamente junto a la pared a la derecha de la estación, en la conversación al oeste de la estatua y en la cabina telefónica.",
      "Supera sus combates para recuperar la llave del monorraíl. Viaja a Torre Rose, asciende con Paul por los enfrentamientos del ascensor y vence a Olivia en lo alto.",
      "Al volver al estadio, vence la intervención de Berto y después a Cathy, Judith en Espada o Alistair en Escudo, y Roy. Este encuentro de Roy es individual y usa varios climas.",
      "El anuncio de Rose interrumpe el combate con Lionel. Vuelve a Bosque Oniria desde Pueblo Yarda: en su tramo profundo toma izquierda, derecha y después izquierda para alcanzar el santuario. Recoge Espada Oxidada en Espada o Escudo Oxidado en Escudo.",
      "Regresa al estadio de Ciudad Artejo, baja a la planta eléctrica y vence a Rose. Sube a la azotea: primero debes derrotar a Eternatus en su forma normal, sin poder capturarlo todavía.",
      "En la fase Eternamax intenta actuar hasta que la escena permita usar los objetos del santuario. Zacian y Zamazenta se suman a Paul y a ti: supera el combate conjunto y captura a Eternatus al terminar. Esta captura está garantizada con la Ball elegida.",
      "Tras resolver el Día Oscuro vuelve a Ciudad Puntera para el combate aplazado contra Lionel. Prepara su equipo completo, que cambia con tu inicial, y una respuesta para Charizard Gigamax.",
      "Vence a Lionel y deja terminar los créditos. La captura del legendario de portada se desbloquea en el episodio posterior; no ocurre durante la primera visita al santuario."
    ],
    "check": "Primer título de Campeón y Eternatus obtenido en su escena.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_15",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_16",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_17",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_18",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_19",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_20"
    ],
    "pitfalls": [],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SWORD",
      "SHIELD"
    ],
    "mission": "07",
    "location": "Pueblo Yarda → Bosque Oniria → estadios de Galar → Ciudad Artejo",
    "requires": [
      "Primer título de Campeón"
    ],
    "steps": [
      "En casa recibe la Master Ball de Magnolia. En la habitación de Lionel, en casa de Paul, recoge al Charmander con factor Gigamax para cuando evolucione a Charizard.",
      "Vuelve al santuario de Bosque Oniria y vence a Paul. Se presentan Tizonio y Dargo: combates contra Tizonio en Espada o Dargo en Escudo; recuperas tu objeto oxidado, pero Paul pierde el suyo.",
      "Visita el laboratorio de Sonia en Pueblo Par. Empieza por el estadio de Hoyuelo y derrota al Tsareena Dinamax con los aliados. Continúa en Amura contra Gyarados y Pistón contra Torkoal; estos dos pueden resolverse en cualquier orden.",
      "Cuando Sonia te llame vuelve al laboratorio de Pueblo Par. Vence a los hermanos en el combate doble junto a Paul y completa la escena de la ayudante antes de perseguirlos.",
      "Revisa los otros estadios: en Ladera afrontas Conkeldurr en Espada o Dusknoir en Escudo; en Plié Berto ya resolvió el incidente, pero debes vencerlo; en Auriga afrontas Gigalith en Espada o Froslass en Escudo.",
      "En Artejo vence al Haxorus descontrolado. Una vez resueltos los incidentes necesarios, habla con Sonia junto al ascensor para abrir el acceso a la planta y derrota otra vez a Tizonio o Dargo.",
      "En la azotea derrota al legendario opuesto, Zamazenta en Espada o Zacian en Escudo: está descontrolado y no es capturable en ese combate.",
      "El siguiente encuentro sí permite capturar a Zacian en Espada o Zamazenta en Escudo, al nivel 70. Prepara Balls y estados o usa tu Master Ball; a diferencia de Eternatus, una Ball normal no tiene éxito garantizado.",
      "Atiende la llamada de Paul y vuelve al santuario de Oniria. Allí Paul ya ha calmado y capturado al legendario opuesto: vence su último equipo para cerrar el episodio. Necesitas intercambio para registrar ese otro legendario en tu partida."
    ],
    "check": "Legendario propio capturado y último combate de Paul terminado.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_21",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_22",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_23",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sword_and_Shield/Part_24",
      "https://www.wikidex.net/wiki/Gu%C3%ADa_de_Pok%C3%A9mon_Espada_y_Pok%C3%A9mon_Escudo/Despu%C3%A9s_de_la_Liga_Pok%C3%A9mon"
    ],
    "pitfalls": [
      "Las tarjetas de Liga poco comunes son recompensas concretas del episodio. Ni tener la especie por intercambio ni acabar la Liga demuestra resolver cada incidente."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SWORD",
      "SHIELD"
    ],
    "mission": "10",
    "location": "Galar: Torre Batalla, Copa, Pokédex y premios",
    "requires": [
      "Campeón para Torre Batalla; requisitos particulares de cada premio"
    ],
    "steps": [
      "Visita Torre Batalla, en la antigua Torre Rose de Ciudad Puntera. Puedes usar equipos de préstamo para empezar; los recorridos Individual y Doble mantienen sus propios rangos.",
      "Progresa por los rangos de cada modalidad hasta el rango máximo que quieras registrar. Vencer a Lionel para ascender al rango Poké Ball desbloquea la función Juez de las cajas; no exige una racha clásica de cincuenta victorias consecutivas.",
      "En la torre habla con la empleada que ofrece a Código Cero y sus memorias. Evolucionarlo a Silvally por amistad es otro paso distinto del regalo y de sus formas según memoria equipada.",
      "Para entrenar, recuerda movimientos gratis en el mostrador izquierdo de los Centros Pokémon. El entrenamiento extremo de la torre exige nivel 100 y Chapas en estos juegos; mejora el efecto de los IV y no cambia los IV hereditarios.",
      "Vuelve al estadio de Ciudad Puntera para las revanchas de la Copa: cada participación requiere ganar tres combates. Tras derrotar a Lionel en Torre Batalla podrás invitarlo; no es el Torneo de Estrellas de Galar del DLC.",
      "Completa los registros de la Pokédex de Galar con exclusivos, los otros iniciales, fósiles y evoluciones por intercambio. Consulta al director en el hotel de Auriga para el diploma y el Amuleto Iris cuando estén obtenidas las cuatrocientas especies exigidas.",
      "Isla de la Armadura y Nieves de la Corona tienen listas regionales y recompensas distintas. Continúa por las misiones 08 y 09 si dispones de la expansión; una victoria online o el catálogo base completo no acredita terminar esos episodios."
    ],
    "check": "Rangos, Juez, regalos, diploma y Copa comprobados por separado.",
    "sources": [
      "https://www.serebii.net/swordshield/battletower.shtml",
      "https://www.serebii.net/swordshield/championcuprematch.shtml",
      "https://www.serebii.net/swordshield/gift.shtml",
      "https://www.serebii.net/swordshield/useful.shtml",
      "https://bulbapedia.bulbagarden.net/wiki/Shiny_Charm"
    ],
    "pitfalls": [
      "Los rangos online se separan de la torre local. Este recorrido no enumera aún todo el CurriDex, tarjetas, regalos, formas, MT/DT ni premios de las expansiones."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  }
];
 if(typeof module==='object'&&module.exports)module.exports=routes;else root.PokemonGalarRoutes=routes;
})(globalThis);
