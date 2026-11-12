/* Kalos XY chronology, separate from ORAS and Legends Z-A. */
(function(root){
 'use strict';
 const routes=[
  {
    "games": [
      "X",
      "Y"
    ],
    "mission": "01",
    "location": "Pueblo Boceto → Pueblo Acuarela → Ruta 2 → Bosque Novarte",
    "requires": [],
    "steps": [
      "Baja de tu habitación, habla con tu madre y sal de Pueblo Boceto por Ruta 1. En Pueblo Acuarela reúnete con los amigos en la mesa para elegir Chespin, Fennekin o Froakie y recibir la Pokédex.",
      "Recibe la carta del profesor, completa el primer combate con Xana y vuelve a Pueblo Boceto para entregársela a tu madre. Recoge el Mapa antes de retomar Pueblo Acuarela.",
      "En Ruta 2 participa en la demostración de captura y recibe las Poké Balls. Entra en Bosque Novarte y sigue el recorrido con Xana, que puede curar al equipo durante este tramo.",
      "Sal por el norte hacia Ruta 3 y continúa hasta Ciudad Novarte. La primera medalla se obtiene allí; el acceso lateral de Ruta 22 no lleva al primer gimnasio."
    ],
    "check": "Pokédex y llegada a Novarte.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_1",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_2"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "X",
      "Y"
    ],
    "mission": "02",
    "location": "Ciudad Novarte → Viola → Ruta 4",
    "requires": [
      "Pokédex recibida"
    ],
    "steps": [
      "Cura al equipo en el Centro Pokémon y visita la entrada del gimnasio de Novarte. Supera el combate de la patinadora para recibir los Patines y acceder al gimnasio.",
      "Baja a la telaraña y sigue sus conexiones hasta la plataforma de Viola. Prepara una respuesta a sus tipos Bicho y al Surskit de Agua/Bicho: no todos los rivales comparten las mismas debilidades.",
      "Derrota a Viola para recibir Medalla Insecto y MT83 Acoso. Vuelve a la ciudad y toma la salida hacia Ruta 4.",
      "Habla con Alexia junto a esa salida para recibir el Repartir Exp. Puedes activarlo o desactivarlo desde la bolsa. Sigue los jardines de Ruta 4 hasta encontrarte con los ayudantes de Ciprés y entrar en Luminalia."
    ],
    "check": "Primera medalla y Repartir Exp.; acceso al laboratorio de Ciprés.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_2"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "X",
      "Y"
    ],
    "mission": "03",
    "location": "Luminalia → Vánitas → Palacio Cénit → Petroglifo",
    "requires": [
      "Medalla Insecto"
    ],
    "steps": [
      "En Luminalia visita el laboratorio de Ciprés y completa su combate de demostración. Elige Bulbasaur, Charmander o Squirtle y recibe su megapiedra; todavía necesitas el Mega-Aro para usarla. La Charizardita entregada cambia entre X e Y.",
      "Atiende las conversaciones del café y continúa por Ruta 5 hasta Pueblo Vánitas. Visita el castillo y sigue la investigación del Snorlax que bloquea Ruta 7.",
      "Ve por Ruta 6 hasta Palacio Cénit para recuperar la Poké Flauta. En los jardines recoge MO01 Corte del laberinto suroeste y ayuda a localizar al Furfrou del propietario.",
      "Para acorralarlo, deja a Xana en la entrada del laberinto cuando se ofrezca a bloquearlo y acércate a Furfrou por el oeste para que corra al norte. Recoloca a Xana en el lado este y rodéalo desde el oeste hasta encerrarlo.",
      "Ve al balcón del palacio para los fuegos artificiales y recibe del mayordomo la Poké Flauta y MT17 Protección. Regresa a Ruta 7 para despertar al Snorlax y resolver su encuentro.",
      "Continúa por Ruta 7, completa los encuentros del grupo y atraviesa Galería Unión hasta la zona alta de Ruta 8. Baja hacia Pueblo Petroglifo y acude al laboratorio de fósiles para conocer el encargo de Cueva Brillante.",
      "Desde Ruta 9 utiliza el Rhyhorn para cruzar el terreno rocoso hasta Cueva Brillante. Avanza al interior, resuelve el incidente del Team Flare y elige Fósil Mandíbula para Tyrunt o Fósil Aleta para Amaura.",
      "Regresa al laboratorio para revivir el fósil y baja a la costa de Ruta 8 hacia Ciudad Relieve. Las elecciones de inicial y fósil no permiten conseguir sus alternativas por repetir el diálogo."
    ],
    "check": "Segundo inicial, Corte, Snorlax y fósil; llegada a Relieve.",
    "pitfalls": [
      "La Ruta 10 se recorre después de la segunda medalla. No es el acceso desde Petroglifo al gimnasio de Lino."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_3",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_4",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_5",
      "https://www.serebii.net/xy/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "X",
      "Y"
    ],
    "mission": "04",
    "location": "Ciudad Relieve → Lino → salida a Ruta 10",
    "requires": [
      "Llegada por la costa de Ruta 8"
    ],
    "steps": [
      "Visita la tienda de bicicletas de Relieve y consigue la Bicicleta. Sigue después la carretera que sube por la ladera para encontrarte con Lino.",
      "Recibe MO04 Fuerza de Lino en la carretera junto al circuito. Recibirla no permite usarla todavía fuera de combate: hace falta la medalla de su gimnasio.",
      "Entra en el gimnasio y escala las paredes rocosas hasta la cima. Derrota a Lino para obtener Medalla Muro y MT39 Tumba Rocas; desde entonces puedes usar Fuerza en el campo.",
      "Cura al equipo y sal hacia Ruta 10, que conduce a Pueblo Crómlech. Puedes volver a Galería Unión para abrir con Fuerza los atajos que antes estaban bloqueados."
    ],
    "check": "Segunda medalla, Bicicleta y uso de Fuerza desbloqueado.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_5",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_6",
      "https://www.serebii.net/xy/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "X",
      "Y"
    ],
    "mission": "05",
    "location": "Ruta 10 → Crómlech → Cueva Reflejos → Yantra",
    "requires": [
      "Medalla Muro"
    ],
    "steps": [
      "Cruza Ruta 10 y resuelve los combates del Team Flare para llegar a Pueblo Crómlech. Atiende la escena de la localidad y continúa por Ruta 11 hasta Cueva Reflejos.",
      "Recorre las plantas de Cueva Reflejos hasta su salida a Ciudad Yantra. Usa los reflejos para reconocer conexiones y conserva Fuerza para los desvíos y atajos que la necesitan.",
      "Ve a Torre Maestra y escucha la explicación sobre megaevolución. Gana el combate con Serena o Kalm para determinar quién opta al Mega-Aro; aún debes superar a Corelia en el gimnasio.",
      "En el gimnasio de patinaje busca y vence a los cuatro patinadores que rodean la pista para poder desafiar a Corelia. Gana Medalla Lid y MT98 Puño Incremento.",
      "Regresa a la cima de Torre Maestra para recibir el Mega-Aro y completar el combate de demostración con Lucario. Activa su megaevolución y acepta el Lucario con Lucarita si quieres conservar este regalo.",
      "Antes de salir por el este de Yantra habla con Serena o Kalm para recibir MO03 Surf. La medalla permite usarla en el campo y abre el paso por Ruta 12."
    ],
    "check": "Tercera medalla, Mega-Aro, regalo de Lucario y Surf revisados.",
    "pitfalls": [
      "El inicial de Kanto o una megapiedra en la bolsa no prueban haber completado la entrega del Mega-Aro."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_6",
      "https://www.serebii.net/xy/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "X",
      "Y"
    ],
    "mission": "06",
    "location": "Ruta 12 → Témpera → Central de Kalos → Luminalia",
    "requires": [
      "Medalla Lid y Surf"
    ],
    "steps": [
      "Sigue Ruta 12 hacia Témpera. Puedes recibir un Lapras del personaje junto al agua si tienes espacio en el equipo; prepara Surf para el trayecto y revisa la Bahía Azul como desvío separado.",
      "En Témpera encuentra a Ciprés en la zona costera para recibir MO02 Vuelo. Utiliza el monorraíl para llegar al sector del gimnasio y completa el combate con Serena o Kalm antes de enfrentarte al líder.",
      "Recorre las cuerdas y plataformas del gimnasio de Amaro y gana Medalla Planta y MT86 Hierba Lazo. La medalla habilita Vuelo fuera de combate.",
      "Sal por Ruta 13 y busca el Pase Central oculto en una roca del sector suroeste, junto al puente metálico. Usa el Zahorí y derrota al recluta de la entrada para acceder a la Central de Kalos.",
      "Recorre la central hasta sus mandos del Team Flare y derrota a la científica del fondo para restablecer la energía. Vuelve a Ruta 13 y entra en el norte de Luminalia, ahora accesible.",
      "Ve a Torre Prisma tras la escena de iluminación. En sus preguntas escoge los ascensores 3, 1, 3 y 2: corresponden a Pikachu, Fletchling, Panpour y Vivillon. Cada respuesta exige vencer al entrenador que bloquea su ascensor.",
      "Derrota a Lem para obtener Medalla Voltaje y MT24 Rayo. Atiende las conversaciones posteriores y prepara la salida hacia Ruta 14."
    ],
    "check": "Cuarta y quinta medallas, Vuelo y energía de Luminalia restablecida.",
    "pitfalls": [
      "El Pase Central es un objeto oculto relevante para avanzar; no se omite como los objetos sueltos triviales."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_7",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_8",
      "https://www.serebii.net/xy/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "X",
      "Y"
    ],
    "mission": "07",
    "location": "Ruta 14 → Romantis → Fábrica de Poké Balls → Fluxus",
    "requires": [
      "Medalla Voltaje"
    ],
    "steps": [
      "Cruza Ruta 14 con el grupo y completa la visita a la casa del relato antes de entrar en Ciudad Romantis. En su gimnasio usa los teletransportadores para llegar a Valeria y ganar Medalla Hada y MT99 Brillo Mágico.",
      "Ve al norte de Romantis para investigar la Fábrica de Poké Balls. Entra por sus cintas transportadoras y resuelve el enfrentamiento con los mandos Flare junto a Serena o Kalm; el incidente debe quedar resuelto antes de continuar la historia.",
      "Sigue Ruta 15 hacia Pueblo Fresco. El Hotel Desolación y Ruta 16 son desvíos; para abrir el paso nevado de historia dirígete desde Fresco a Gruta Helada.",
      "Recorre el hielo de la gruta y rescata a Abomasnow de los reclutas y la científica Flare. Habla después con Abomasnow para recibir Abomasnowita.",
      "Vuelve a Ruta 17 y monta en Mamoswine para cruzar la nieve y romper los obstáculos del camino hasta Ciudad Fluxus.",
      "Completa el encuentro con Serena o Kalm y entra en el gimnasio de Ástrid. Usa la plataforma que revela el interior y sigue los caminos hasta la líder para ganar Medalla Psique y MT04 Paz Mental.",
      "Tras la séptima medalla atiende el mensaje de Lysson. El siguiente destino es su laboratorio en Luminalia; no busques todavía la octava medalla."
    ],
    "check": "Sexta y séptima medallas, fábrica y Gruta Helada resueltas.",
    "pitfalls": [
      "La líder psíquica se llama Ástrid en español. Primero se completa Valeria en Romantis y después Ástrid en Fluxus."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_9",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_10"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "X",
      "Y"
    ],
    "mission": "08",
    "location": "Café Lysson → laboratorios → base de Crómlech",
    "requires": [
      "Medalla Psique y anuncio de Lysson"
    ],
    "steps": [
      "Regresa al Café Lysson de Luminalia. Derrota a los dos empleados Flare y utiliza la contraseña recibida ante la estantería para entrar en los laboratorios.",
      "Vence a Lysson en la entrada y recorre las baldosas de giro y teletransportadores del laboratorio. Derrota a la científica que entrega la Llave Ascensor; sin ella no puedes completar las plantas inferiores.",
      "Usa el ascensor para resolver las escenas inferiores y el combate con Xero. La elección de botón no evita la activación del arma: el rojo la activa y, si eliges el azul, Xero utiliza su mando.",
      "Ve a Pueblo Crómlech y entra en el cuartel oculto al noroeste. Supera el encuentro con Lysson, desciende acompañado por los amigos y derrota a los mandos que bloquean la cámara del legendario.",
      "Prepara Poké Balls y guarda antes de interactuar con Xerneas en X o Yveltal en Y. Resuelve su captura y organiza el equipo para el combate final.",
      "Derrota a Lysson y su equipo con megaevolución para completar la salida de la base y el desenlace del arma. Tener a Xerneas o Yveltal por intercambio no acredita haber resuelto estas escenas."
    ],
    "check": "Desenlace de Flare y arma; continuación por Ruta 18.",
    "pitfalls": [
      "El laboratorio de Luminalia y la base de Crómlech son dos ubicaciones consecutivas; la Llave Ascensor pertenece al primero."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_11",
      "https://www.serebii.net/xy/flare.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "X",
      "Y"
    ],
    "mission": "09",
    "location": "Ruta 18 → Mosaico → Fractal → Villa Pokémon → Liga",
    "requires": [
      "Desenlace de Flare"
    ],
    "steps": [
      "Desde Fluxus cruza Ruta 18 hasta Pueblo Mosaico y completa el combate con Ciprés. Cueva Desenlace es un desvío de exploración; el encuentro con Zygarde queda para después de la Liga.",
      "Sigue Ruta 19 y supera los combates del grupo de amigos en el puente. Xana entrega MO05 Cascada, cuyo uso en el campo requiere la octava medalla.",
      "Llega a Ciudad Fractal y busca al líder en Villa Pokémon, al sur por Bosque Errantes. Desde la roca musgosa de entrada toma sur, oeste, norte y el paso suroeste junto a la entrenadora de cuento hasta el claro con forma de J.",
      "En el claro en J ve al este hasta el fondo y vuelve al oeste para aparecer en el claro en T. Sal al sur; continúa al oeste hacia las escaleras y, tras bajar las escaleras, cortar el árbol, ir al fondo oeste y volver al este, estarás de nuevo en el claro en J. Toma su salida suroeste hacia Villa Pokémon.",
      "Habla con Édel para que regrese al gimnasio de Fractal. Resuelve sus plataformas giratorias y véncelo para obtener Medalla Iceberg y MT13 Rayo Hielo.",
      "Prepara Surf y Fuerza para recorrer Ruta 21 y Calle Victoria. Supera el control de las ocho medallas, atraviesa las cuevas y laderas y completa el combate con Serena o Kalm cerca del final.",
      "En la Liga vence a Malva, Narciso, Tileo y Drácena en el orden que prefieras y después a Dianta. Completa el Hall de la Fama y la ceremonia posterior, incluido el combate con AZ, para cerrar el desenlace."
    ],
    "check": "Hall de la Fama y ceremonia; postgame de Kalos disponible.",
    "pitfalls": [
      "La cueva de Villa Pokémon está reservada a Campeones. Hablar con Édel abre su gimnasio; no necesitas entrar en esa cueva para obtener la octava medalla."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_12",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_13",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_14",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_15",
      "https://www.serebii.net/xy/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "X",
      "Y"
    ],
    "mission": "11",
    "location": "Pokédex de Kalos → tarjeta → Mansión Batalla",
    "requires": [
      "Hall de la Fama para Ciudad Batik y modalidades posteriores"
    ],
    "steps": [
      "Comprueba por separado los tres logros de tarjeta de X/Y: Hall de la Fama, especies vistas exigidas de Kalos y victoria contra una Dama de Combate en el combate 50 de una modalidad Súper de la Mansión.",
      "Para la condición de vistas de Kalos se excluyen Articuno, Zapdos, Moltres, Mewtwo, Diancie, Hoopa y Volcanion. Registrar especies obtenidas de otros juegos puede ayudar a la Pokédex, pero no acredita sus encuentros originales.",
      "En la Mansión Batalla de Ciudad Batik elige una modalidad y completa sus veinte combates normales para abrir la variante Súper correspondiente. Prepara un equipo admitido por sus reglas antes de empezar la racha.",
      "Gana cincuenta combates consecutivos de una modalidad Súper y derrota a la Dama de Combate de ese hito para el logro de tarjeta. Las victorias de modalidades distintas no se suman para formar esa racha.",
      "Para las estatuas adicionales de la Mansión revisa por separado las cinco modalidades Súper. La mejora de tarjeta no exige fingir que todas estén superadas por ganar una sola.",
      "Comprueba el color de la tarjeta dentro del juego después de cumplir sus requisitos. Los diplomas de Pokédex y otros premios tienen su propia condición de evaluación y entrega."
    ],
    "check": "Tres logros oficiales y desafíos adicionales distinguidos.",
    "pitfalls": [
      "X/Y tiene tres mejoras de tarjeta, no una tarjeta genérica de cinco estrellas. La Nacional no sustituye automáticamente el requisito regional de vistas."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y/Part_16",
      "https://bulbapedia.bulbagarden.net/wiki/Trainer_Card_level#X_and_Y",
      "https://www.serebii.net/xy/battlemaison.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  }
];
 if(typeof module==='object'&&module.exports)module.exports=routes;else root.PokemonKalosRoutes=routes;
})(globalThis);
