/* HGSS-specific progression; original G/S mechanics must not be inherited. */
(function(root){
 'use strict';
 const routes=[
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "01",
    "location": "Primavera → Cerezo → casa del Sr. Pokémon → laboratorio Elm",
    "requires": [],
    "steps": [
      "Visita a Elm en el laboratorio de Pueblo Primavera y elige Chikorita, Cyndaquil o Totodile. Después habla con tu madre para recibir el Pokégear y sal al oeste por Ruta 29.",
      "En Ciudad Cerezo sigue la visita del anciano para recibir las Deportivas. Al salir hacia Ruta 30 vuelve a atenderlo para obtener la Tarjeta Mapa del Pokégear.",
      "Sube por Ruta 30 y entra en la casa del Sr. Pokémon. Recibe el Huevo Misterioso para Elm y la Pokédex de Oak. Atiende la llamada de Elm y regresa hacia Pueblo Primavera.",
      "Supera el primer combate con el rival a la salida de Cerezo y vuelve al laboratorio. Entrega el Huevo Misterioso y comunica el nombre del rival durante la investigación del robo.",
      "Habla con tu madre para decidir si guarda parte del dinero. Al salir de Primavera sigue la demostración de captura de Lira/Eco y recibe las Poké Balls; después continúa por Ruta 30 y Ruta 31 hacia Ciudad Malva."
    ],
    "check": "Pokédex y encargo inicial completos; acceso a Malva.",
    "pitfalls": [
      "Primero entrega a Elm el Huevo Misterioso del encargo. Después de la primera medalla su ayudante te lo devuelve como Huevo de Togepi para llevarlo en el equipo."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_1",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_2",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0843_T20R0101.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "02",
    "location": "Malva → Torre Bellsprout → Pegaso → tienda",
    "requires": [
      "Pokédex e inicial"
    ],
    "steps": [
      "En Ciudad Malva sube por Torre Bellsprout hasta la planta superior. Supera a los monjes y al anciano para recibir MT70 Destello; el gimnasio necesita que completes esta visita.",
      "Entra después en el gimnasio de Malva, sube por su plataforma y derrota a Pegaso. Recibe la Medalla Céfiro y MT51 Respiro; queda habilitado Golpe Roca fuera de combate cuando recojas su MO.",
      "Atiende la llamada de Elm y entra en la tienda de Malva. Con un hueco libre en el equipo, habla con su ayudante para recibir el Huevo de Togepi.",
      "Puedes recoger MO06 Golpe Roca del hombre de Ruta 36, junto al acceso a Ruinas Alfa. No necesitas apartar primero a Sudowoodo para visitar ese lado de la ruta.",
      "Continúa al sur de Malva por Ruta 32, recoge la Caña Vieja en el Centro Pokémon próximo a Cueva Unión y cruza la cueva hacia Ruta 33 y Pueblo Azalea."
    ],
    "check": "Primera medalla, Togepi y herramientas de exploración revisadas.",
    "pitfalls": [
      "En estos remakes Torre Bellsprout entrega una MT de Destello; no copies la lista de MO de Oro/Plata."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_3",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_4",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0018_D15R0103.s",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0243_R36.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "03",
    "location": "Azalea → Pozo Slowpoke → Antón → Encinar",
    "requires": [
      "Medalla Céfiro"
    ],
    "steps": [
      "Habla con César en su casa de Azalea para iniciar el rescate del Pozo Slowpoke. Entra en el pozo, derrota a los Rocket y termina con Protón; regresa con César para completar la liberación.",
      "Vence a Antón en el gimnasio, utilizando las plataformas de Spinarak y sus interruptores para alcanzar al líder. Recibe Medalla Colmena y MT89 Ida y Vuelta.",
      "Al intentar salir al oeste supera el combate con tu rival y entra en Encinar. Debes recuperar dos Farfetch’d para el carbonero: usa el ruido de las ramas del suelo para que miren hacia otra dirección y acércate por detrás.",
      "Cuando estén reunidos recibe MO01 Corte y enséñala a un Pokémon. La Medalla Colmena permite cortar el árbol que bloquea el paso hacia el norte del bosque.",
      "Puedes pedir al tutor de Encinar que enseñe Golpe Cabeza: sirve para buscar Pokémon en árboles. Continúa por Ruta 34, visita la Guardería durante la escena de Lira/Eco y llega a Ciudad Trigal."
    ],
    "check": "Medalla Colmena y Corte; salida de Encinar hacia Trigal.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_5",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0060_D26R0102.s",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0092_D36R0101.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "04",
    "location": "Trigal → Torre Radio → Blanca → floristería",
    "requires": [
      "Medalla Colmena"
    ],
    "steps": [
      "En Trigal visita la tienda de bicicletas para recibir la Bicicleta y entra en la planta baja de Torre Radio. Completa el concurso de la Tarjeta Radio del Pokégear: las cinco respuestas son sí, sí, no, sí y no. Blanca, que está allí, volverá a su gimnasio.",
      "Ve al gimnasio y derrota a Blanca. Cuando se ponga a llorar habla con la entrenadora cercana y vuelve a hablar con Blanca para recibir Medalla Planicie y MT45 Atracción.",
      "Con la medalla visita la floristería al noreste de la ciudad y recibe la Regadera. Es el objeto que necesitas para despejar a Sudowoodo en Ruta 36.",
      "Sal al norte por Ruta 35 hacia Parque Nacional y Ruta 36. Si todavía no tienes Caja Bonguri, revisa la casa del hombre de Ruta 30."
    ],
    "check": "Medalla Planicie, Tarjeta Radio y Regadera.",
    "pitfalls": [
      "El Pokégear de radio será importante también en Kanto. Ganar el combate con Blanca sin volver a hablar con ella no entrega la medalla."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_6",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_7",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0228_R30R0101.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "05",
    "location": "Ruta 36 → Sudowoodo → Iris → teatro y Torre Quemada",
    "requires": [
      "Regadera y Medalla Planicie"
    ],
    "steps": [
      "Usa la Regadera junto a Sudowoodo de Ruta 36 y prepara su encuentro; guarda antes si quieres capturarlo en esta escena. Después de despejarlo recibe el Plantabayas y las bayas de la joven próxima al lugar.",
      "Sigue Ruta 37 hasta Ciudad Iris. Entra en el teatro y derrota al recluta que molesta a una Kimono; habla después con el hombre del público para recibir MO03 Surf.",
      "Visita Torre Quemada, habla con Eusine y Morti y supera el combate con tu rival. Baja al sótano para liberar a Raikou, Entei y Suicune; sus recorridos quedan diferenciados.",
      "Vence a Morti en el gimnasio siguiendo el camino iluminado entre plataformas. Recibe Medalla Niebla y MT30 Bola Sombra; ahora puedes usar Surf fuera de combate.",
      "En el Centro Pokémon de Iris habla con Bill y vuelve luego a su casa de Trigal con un hueco libre para recibir a Eevee. Continúa desde Iris hacia el oeste por Ruta 38 y Ruta 39 hasta Olivo."
    ],
    "check": "Medalla Niebla, Surf y bestias liberadas.",
    "pitfalls": [
      "La MO de Surf llega tras el recluta del teatro; la serie de cinco combates contra las Kimono se hace más adelante, antes de la primera Liga."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_8",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0928_T27R0501.s",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0024_D18R0102.s",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0922_T27GYM0101.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "06",
    "location": "Olivo → Faro → Orquídea → Aníbal → medicina → Yasmina",
    "requires": [
      "Surf habilitado por Morti"
    ],
    "steps": [
      "Sube al Faro de Olivo hasta encontrar a Yasmina junto a Amphy enfermo. Habla con ella para iniciar la búsqueda de medicina y utiliza después el acceso abierto para volver sin repetir todas las plantas.",
      "Navega por Ruta 40 y Ruta 41 hasta Ciudad Orquídea. En la farmacia recoge la Poción Secreta para el faro; recibirla no cura a Amphy hasta entregársela a Yasmina.",
      "En el gimnasio de Orquídea recorre el lateral hasta el mecanismo que corta el agua sobre Aníbal. Desactívalo, habla con él y vence para obtener Medalla Tormenta y MT01 Puño Certero.",
      "Al salir habla con la mujer de Aníbal para recibir MO02 Vuelo. Vuelve al Faro de Olivo y entrega la medicina a Yasmina; espera a que regrese al gimnasio.",
      "Vence a Yasmina y recoge Medalla Mineral y MT23 Cola Férrea. Si todavía no tienes MO04 Fuerza, sal de Iris hacia Ruta 42: el montañero junto a Monte Mortero la entrega en estos remakes.",
      "La Medalla Planicie ya permite usar Fuerza. No la busques en la cafetería de Olivo como en Oro/Plata. Desde Ruta 42 continúa hacia Pueblo Caoba."
    ],
    "check": "Amphy curado, medallas Tormenta/Mineral, Vuelo y Fuerza revisados.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_9",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_10",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0881_T24R0501.s",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0875_T24.s",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0252_R42.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "07",
    "location": "Caoba → Lago de la Furia → refugio Rocket → Fredo",
    "requires": [
      "Surf y avance por Ruta 42"
    ],
    "steps": [
      "Desde Caoba sube por Ruta 43 y navega al centro del Lago de la Furia para resolver el encuentro con Gyarados rojo. Recoge la Escama Roja y habla con Lance en la orilla.",
      "Vuelve a la tienda de recuerdos de Caoba y acompaña a Lance al refugio. Desactiva el sistema de vigilancia en el ordenador del primer sótano para evitar repetir los combates de las estatuas.",
      "Obtén las dos contraseñas de los reclutas del interior y abre la sala de Petrel. Después del combate sigue a Murkrow hasta la puerta del generador: su intervención abre un acceso distinto de las contraseñas anteriores.",
      "Supera el combate junto a Lance contra Atenea y su acompañante. Detén los tres Electrode de tu lado del generador para completar la liberación y recibir MO05 Torbellino de Lance.",
      "Vence a Fredo en el gimnasio de Caoba desplazando los bloques de hielo para alcanzar las salidas entre salas. Recibe Medalla Glaciar y MT07 Granizo; Torbellino queda habilitado fuera de combate.",
      "Conserva la Escama Roja para cambiarla por el Repartir Exp. del Sr. Pokémon en Ruta 30. La llamada sobre Torre Radio conduce de nuevo a Trigal antes de poder seguir al este por Ruta 44."
    ],
    "check": "Refugio desactivado, Torbellino y Medalla Glaciar.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_11",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0088_D35R0101.s",
      "https://www.serebii.net/heartgoldsoulsilver/teamrocket.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "08",
    "location": "Torre Radio → túnel de Trigal → Camino Helado → Endrino",
    "requires": [
      "Crisis de radio y Medalla Glaciar"
    ],
    "steps": [
      "En Trigal recoge el disfraz Rocket del fotógrafo del túnel y ve a Torre Radio. Tras la intervención de tu rival vence a los reclutas y llega al falso director, Petrel; obtén su Llave Sótano.",
      "Abre con ella el acceso subterráneo, supera el combate con tu rival y resuelve el conjunto de interruptores para llegar al almacén. Rescata al director auténtico y recibe la Tarjeta Llave.",
      "Vuelve a Torre Radio y abre con la tarjeta la puerta cerrada de las plantas superiores. Supera a los ejecutivos hasta Atlas. El director entrega Ala Arcoíris en HeartGold o Ala Plateada en SoulSilver.",
      "Regresa a Caoba y cruza Ruta 44 hacia Camino Helado. Recoge MO07 Cascada en el primer nivel: es un objeto del camino de hielo, no una recompensa de Débora.",
      "Empuja con Fuerza las rocas por los agujeros para que sirvan de topes en la planta inferior. Antes de salir ayuda a la Kimono atrapada empujándola por detrás; continúa hasta Ciudad Endrino.",
      "Derrota a Débora y entra en Guarida Dragón por el lago al norte del gimnasio. Usa Surf y Torbellino para llegar al santuario y responder al anciano; Débora concede entonces la Medalla Dragón. Recoge también su MT59 Pulso Dragón al salir.",
      "Con espacio en el equipo vuelve al anciano para el Dratini de regalo; para Velocidad Extrema evita respuestas rechazadas desde el primer intento: puedes elegir las posiciones 1, 1, 3, 1 y 2, respectivamente, en las cinco preguntas. Regresa a Elm en Primavera para recibir la Master Ball y seguir el encargo de las Kimono."
    ],
    "check": "Radio recuperada, ala de edición, Cascada, ocho medallas y encargo de Elm.",
    "pitfalls": [
      "Ganar a Débora no basta para recibir la medalla. La prueba del santuario y la entrega de Cascada son requisitos separados."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_12",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_13",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0112_D44R0103.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "09",
    "location": "Teatro de Iris → legendario de portada → Cataratas Tohjo → Liga",
    "requires": [
      "Ocho medallas, ala de edición, Surf, Torbellino y Cascada"
    ],
    "steps": [
      "Visita a Elm tras la prueba de Guarida Dragón y recoge la Master Ball. Ve al teatro de Ciudad Iris y prepara cinco combates seguidos contra las Kimono; recibes Campana Clara en HeartGold o Campana Oleaje en SoulSilver.",
      "En HeartGold lleva Ala Arcoíris y Campana Clara al Campanario de Iris, sube sus plantas y completa la invocación y encuentro de Ho-Oh.",
      "En SoulSilver lleva Ala Plateada y Campana Oleaje a Islas Remolino, entre Olivo y Orquídea. Usa Torbellino y desciende hasta el guardián que comprueba el ala; continúa hacia la cámara de Lugia y completa su escena.",
      "Después del encuentro obligatorio de la edición vuelve a Primavera. Navega al este por Ruta 27 y cruza Cataratas Tohjo con Cascada; continúa por Ruta 27 y Ruta 26 hasta el control de la Liga.",
      "Cruza Calle Victoria y supera el combate con tu rival junto a la salida. No necesitas ganar las ocho medallas de Kanto para este primer acceso a Meseta Añil.",
      "Prepara la secuencia de Mento, Koga, Bruno, Karen y Lance. Completa el Hall de la Fama y carga la partida para iniciar el viaje a Kanto."
    ],
    "check": "Escena del legendario de portada y primera Liga terminadas.",
    "pitfalls": [
      "Las cinco Kimono y la escena del legendario van antes de la primera Liga en HGSS. No apliques el acceso temprano de los originales de Game Boy."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_14",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_15",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_16",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0928_T27R0501.s",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0113_D45R0101.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "10",
    "location": "Elm → puerto de Olivo → S.S. Aqua → Ciudad Carmín",
    "requires": [
      "Primera Liga"
    ],
    "steps": [
      "Ve al laboratorio de Elm para recibir el Ticket Barco tras el Hall de la Fama. Dirígete al puerto de Olivo; Oak actualiza la Pokédex a Nacional antes de embarcar.",
      "Sube al S.S. Aqua y atiende al abuelo que busca a su nieta. Para avanzar por la cubierta inferior localiza al marinero que no ha vuelto a su puesto y despiértalo en su camarote.",
      "Encuentra a la niña en la zona del capitán y sigue su juego hasta devolverla al abuelo. Completa la conversación para que termine el primer viaje y puedas desembarcar.",
      "En Ciudad Carmín puedes empezar el gimnasio de Lt. Surge. A partir de aquí el recorrido de medallas de Kanto admite variaciones; la avería de la Central y Snorlax condicionan varias conexiones entre ciudades.",
      "Conserva el Ticket Barco para los viajes posteriores; el Magnetotrén requiere reparar la Central y conseguir por separado el Abono de la Copiona."
    ],
    "check": "Nacional y primer desembarco en Kanto.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_17"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "11",
    "location": "Central → gimnasio de Celeste → Ruta 24 → componente → Misty",
    "requires": [
      "Acceso a Kanto"
    ],
    "steps": [
      "Llega a Ciudad Celeste por las conexiones de Kanto y toma Ruta 9 hacia el este. Usa Surf por Ruta 10 para bajar hasta la Central y habla con su responsable sobre el robo; atiende el aviso al intentar salir.",
      "Regresa al gimnasio de Celeste para hacer salir al Rocket. Síguelo al Puente Pepita de Ruta 24 y derrótalo; te revela que escondió la pieza en los flotadores del gimnasio.",
      "Vuelve al gimnasio y examina los flotadores de la zona norte para recoger el Componente. En HGSS no uses la ubicación de la piscina de Oro/Plata.",
      "Lleva el Componente al responsable de la Central. La reparación restablece la energía; después ve a Ruta 25, cerca de la casa de Bill, y habla con Misty para que vuelva a su gimnasio.",
      "En Ciudad Azafrán habla con la Copiona sobre su muñeca perdida. Recógela del hombre del Club de Fans Pokémon de Carmín y devuélvela para recibir el Abono del Magnetotrén.",
      "Visita Torre Radio de Pueblo Lavanda después de reparar la Central y habla con su responsable para ampliar las emisoras del Pokégear. Necesitarás la emisión Pokéflauta para Snorlax."
    ],
    "check": "Central reparada, Misty de vuelta, Abono y ampliación de radio diferenciados.",
    "pitfalls": [
      "La reparación no entrega automáticamente el Abono. En HGSS la Pokéflauta es una emisora, no un objeto que tengas que comprar."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_18",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_19",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_20",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0760_T04GYM0101.s",
      "https://www.serebii.net/heartgoldsoulsilver/teamrocket.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "12",
    "location": "Kanto: ocho gimnasios, Snorlax, Islas Espuma y Azul",
    "requires": [
      "Kanto accesible; Central reparada para radio y conexiones"
    ],
    "steps": [
      "Puedes comenzar por Lt. Surge en Carmín, Sabrina en Azafrán y Erika en Azulona. En el gimnasio de Surge hay dos interruptores consecutivos en papeleras contiguas: si fallas el segundo, se reinicia la búsqueda.",
      "Vence a Misty cuando haya vuelto de Ruta 25. En Ciudad Fucsia encuentra a Sachiko entre las imitaciones de su gimnasio; completar la búsqueda de líderes requiere distinguirla de Koga, que ahora está en el Alto Mando.",
      "Para llegar al oeste por Cueva Diglett, sitúate junto a Snorlax en Ruta 11, abre la radio ampliada del Pokégear y mueve el dial hasta Pokéflauta en la parte superior. Cierra el menú y habla con Snorlax para iniciar el encuentro.",
      "Cruza Cueva Diglett y usa Corte por Ruta 2 para alcanzar Ciudad Plateada; vence a Brock. Habla con el anciano de Plateada para obtener el ala del legendario contrario a tu edición.",
      "Baja por Ciudad Verde y Pueblo Paleta y usa Surf hacia Isla Canela. Habla con Azul en la isla y ve a Islas Espuma por Ruta 20: Blaine tiene allí su gimnasio, porque el de Canela fue destruido.",
      "Con las otras siete medallas de Kanto vuelve a hablar con Azul si aún no regresó y desafíalo en el gimnasio de Ciudad Verde. Comprueba las ocho medallas de Johto y las ocho de Kanto antes de visitar a Oak."
    ],
    "check": "Dieciséis medallas; Snorlax y conexiones de Kanto revisados.",
    "pitfalls": [
      "El paso entre Fucsia y la costa puede seguir en obras; utiliza el acceso occidental por Paleta/Canela. La emisión de radio requiere haber restaurado la Central."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_17",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_18",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_20",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_21",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_22",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_24",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_26",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_27",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_28"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "13",
    "location": "Oak → Trepar → Ruta 28 → Monte Plateado → Rojo",
    "requires": [
      "Dieciséis medallas"
    ],
    "steps": [
      "Visita a Oak en Pueblo Paleta con las dieciséis medallas. Recibe MO08 Trepar y el permiso de acceso a Monte Plateado; estos desbloqueos van antes del combate con Rojo.",
      "Dirigete al control de rutas al oeste de Ciudad Verde y toma la salida occidental hacia Ruta 28 y el Centro Pokémon de Monte Plateado. Prepara Trepar para alcanzar la ruta a la cima.",
      "Asciende por las cuevas y laderas del monte hasta Rojo. Su equipo y el granizo de la cima exigen preparar curación y coberturas; no es una revancha del rival de Calle Victoria.",
      "Derrota a Rojo y completa el nuevo cierre. Después visita otra vez a Oak para elegir el inicial de Kanto; es una entrega separada de la MO y del acceso al monte.",
      "Para la cadena de Kyogre/Groudon continúa con la misión del orbe: primero el inicial de Oak y después el Sr. Pokémon. Una victoria contra Rojo no sustituye recoger ese regalo."
    ],
    "check": "Acceso, Trepar, victoria y regalo de Oak diferenciados.",
    "pitfalls": [
      "Surf y Cascada sirven para los ramales de exploración, incluido Moltres; no confundas esos desvíos con el requisito de Trepar para llegar a Rojo."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_28",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_29",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_30"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "14",
    "location": "Encuentros de Johto y Kanto; aves, Mewtwo y errantes",
    "requires": [
      "Acceso según encuentro; dieciséis medallas para varias capturas de Kanto"
    ],
    "steps": [
      "Tras la escena de Torre Quemada sigue a Raikou y Entei con el mapa del Pokégear. Suicune utiliza una cadena de apariciones y una ubicación fija final; consulta su misión independiente.",
      "Para el legendario contrario a tu edición consigue su ala del anciano de Ciudad Plateada. En HeartGold revisa Lugia en Islas Remolino; en SoulSilver, Ho-Oh en Campanario. No necesitas repetir la entrega de campana de las Kimono.",
      "Busca Articuno en la zona inferior de Islas Espuma. Para Zapdos junto a la Central de Ruta 10 y la apertura de Cueva Celeste hacia Mewtwo, completa antes las dieciséis medallas.",
      "Para Moltres explora el ramal interior de Monte Plateado que necesita Surf y Cascada; prepara también Trepar según el acceso. No lo busques en Calle Victoria ni en la cima de Rojo.",
      "Al salir del Club de Fans de Carmín durante la cadena de la muñeca perdida se activa la conversación con Máximo sobre el errante de Kanto: Latias en HeartGold y Latios en SoulSilver. Se sigue con el mapa, no con la posición del evento de Ciudad Plateada.",
      "La Piedra Enigma pertenece a una distribución histórica distinta y permite el otro Lati en Plateada. Separa ese acceso del errante normal, y utiliza la misión del orbe para Kyogre/Groudon y la condición adicional de Rayquaza."
    ],
    "check": "Encuentros fijos, errantes y accesos históricos diferenciados.",
    "pitfalls": [
      "Una especie recibida por intercambio puede completar su registro sin demostrar el encuentro original. No presentes la Piedra Enigma como requisito del errante normal."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_24",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_27",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_29",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_30",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_31",
      "https://www.serebii.net/heartgoldsoulsilver/legends.shtml",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0014_D11R0105.s",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0743_T02GYM0101.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "15",
    "location": "Colecciones y reconocimientos propios de HGSS",
    "requires": [
      "Acceso variable por actividad"
    ],
    "steps": [
      "Separa los cinco criterios de tarjeta: Liga, Nacional, Corona de Hojas, récords de las diez disciplinas del Pokéathlon y racha de cien victorias de Torre Batalla. Ninguno se sustituye por un porcentaje general del catálogo.",
      "Para la Nacional revisa las 484 especies requeridas: se excluyen Mew, Celebi, Jirachi, Deoxys, Phione, Manaphy, Darkrai, Shaymin y Arceus. Una especie excluida no reemplaza otra ausente.",
      "Para la Corona reúne cinco Hojas Doradas en un mismo Pokémon y habla con Lira/Eco en Pueblo Primavera. Las rutas posibles dependen de la naturaleza del Pokémon; no basta con repartir las hojas entre varios.",
      "En Pokéathlon supera los récords exigidos de las diez disciplinas y revisa sus registros. En Frente Batalla separa la racha de cien de Torre Batalla de las estampas y retos de Fábrica, Arcade, Castillo y Escenario.",
      "Revisa regalos y elecciones: Togepi, Eevee, Dratini, Tyrogue de Monte Mortero, Shuckle de Orquídea y los iniciales de Oak y Máximo, además de los intercambios del juego. Comprueba espacio en el equipo antes de pedir un Huevo o regalo.",
      "Para la Zona Safari completa los encargos de Baoba y distingue especies que requieren bloques y días de maduración. Pokéwalker, eventos históricos y conectividad tienen requisitos propios; no se convierten en progreso acreditado por ganar la Liga."
    ],
    "check": "Criterios de tarjeta y familias de colección separados; inventario individual en revisión.",
    "pitfalls": [
      "Los concursos de D/P no son un criterio de tarjeta de HGSS. Esta misión agrupada no cierra por sí sola todos los regalos, cintas, formas, trofeos o actividades."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_30",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_31",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_32",
      "https://www.serebii.net/heartgoldsoulsilver/trainercard.shtml",
      "https://www.serebii.net/heartgoldsoulsilver/shiningleaf.shtml",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/src/pokedex.c"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "E01",
    "location": "Torre Quemada → Orquídea → Ruta 42 → Carmín → Ruta 14 → Ruta 25",
    "requires": [
      "Bestias liberadas en Torre Quemada"
    ],
    "steps": [
      "Después del sótano de Torre Quemada busca a Suicune en el extremo norte de Ciudad Orquídea y completa la escena de Eusine.",
      "En Ruta 42 usa Corte para acceder a la zona de los árboles de bonguris y atiende la siguiente aparición. El orden de esta cadena no se sustituye por ver a Suicune intercambiado en el equipo.",
      "Al llegar a Kanto visita el puerto de Ciudad Carmín para su aparición. Continúa después hacia Ruta 14, donde se desarrolla otra escena con Eusine.",
      "Completa la devolución del Componente y la conversación de Misty en Ruta 25 para despejar la zona próxima a la casa de Bill.",
      "Vuelve a Ruta 25 tras las apariciones anteriores y encuentra a Suicune cerca de la casa de Bill. Prepara el equipo y guarda antes de iniciar este encuentro fijo."
    ],
    "check": "Cadena y encuentro final de Suicune separados del registro de especie.",
    "pitfalls": [
      "En HGSS Suicune no es un tercer errante idéntico a Raikou y Entei. Revisar solo su entrada en la Pokédex no revela qué aparición falta."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_8",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_10",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_17",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_20",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_23",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_30",
      "https://www.serebii.net/heartgoldsoulsilver/legends.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD",
      "SOULSILVER"
    ],
    "mission": "E03",
    "location": "Ruinas Alfa: cuatro puzles, cámaras y formas Unown",
    "requires": [
      "Herramientas de cada cámara; Surf para accesos por Cueva Unión"
    ],
    "steps": [
      "Entra en la primera cámara del noreste de Ruinas Alfa, completa el panel de Kabuto y revisa la sala principal de Unown. Habla con los investigadores para recibir el Bloc Unown y actualizar sus páginas.",
      "Abre los otros tres paneles de Omanyte, Aerodactyl y Ho-Oh. Dos accesos exigen recorrer Cueva Unión con las MO correspondientes; no todos se alcanzan desde las entradas exteriores iniciales.",
      "Examina la inscripción posterior de cada cámara antes de actuar: la pista de huida pide usar Cuerda Huida; la de luz, Destello; la de Ho-Oh, llevarlo primero en el equipo; la de agua, usar una Piedra Agua desde la bolsa frente a la pared.",
      "Entra en las cámaras abiertas, recoge sus objetos y examina las inscripciones de las salas inferiores. Regresa al investigador para que queden reflejados los descubrimientos en el Bloc Unown.",
      "Completa los cuatro paneles y captura las veintiséis formas de letras. Habla de nuevo con el investigador para abrir la ampliación de la entrada principal y busca allí las formas ! y ?.",
      "Comprueba las veintiocho formas y las páginas de investigación del Bloc. Registrar una sola especie Unown en la Pokédex no equivale a tener todas sus formas ni todas las cámaras abiertas."
    ],
    "check": "Cuatro paneles, cuatro cámaras y veintiocho formas revisados por separado.",
    "pitfalls": [
      "Para la cámara de agua en HGSS selecciona usar la Piedra Agua después de examinar la pared; no copies el método de equiparla de otras ediciones."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_HeartGold_and_SoulSilver/Part_4",
      "https://www.serebii.net/heartgoldsoulsilver/ruinsofalph.shtml",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/src/field_use_item.c",
      "https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/src/alph_checks.c"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  }
];
 if(typeof module==='object'&&module.exports)module.exports=routes;else root.PokemonHGSSRoutes=routes;
})(globalThis);
