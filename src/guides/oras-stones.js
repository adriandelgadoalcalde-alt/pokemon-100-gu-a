// SPDX-License-Identifier: GPL-3.0-or-later
// Item names/IDs: pinned PKHeX.Core; complete corresponding sources and license in engine/.
// Acquisition instructions: independently worded facts with per-item references.
(function(root){
 'use strict';
 const stones=[
 {
  "id": 656,
  "name": "Gengarita",
  "place": "Resort Batalla",
  "phase": "Delta",
  "steps": [
   "Termina el Episodio Delta y usa el Ticket del Barco para llegar al Resort Batalla.",
   "Rodea la isla por el nivel de la playa hasta la cabaña del encargado, en el lado norte. Dentro, recoge el objeto del extremo izquierdo junto a la pared del fondo."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Gengarite",
   "https://bulbapedia.bulbagarden.net/wiki/Battle_Resort"
  ]
 },
 {
  "id": 657,
  "name": "Gardevoirita",
  "place": "Pueblo Verdegal",
  "phase": "Primigenio",
  "steps": [
   "Despeja con Golpe Roca las rocas que separan a la pareja del Túnel Fervergal.",
   "Después del episodio de Groudon/Kyogre, vuelve a la casa de la prima de Blasco en Verdegal y habla con ella para recibir la piedra."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Gardevoirite",
   "https://bulbapedia.bulbagarden.net/wiki/Verdanturf_Town"
  ]
 },
 {
  "id": 658,
  "name": "Ampharosita",
  "place": "Malvalanova",
  "phase": "Primigenio",
  "steps": [
   "Habla con Erico en la plaza central de Malvalona tras resolver la crisis primigenia. Visítalo en su apartamento para obtener acceso a Malvalanova.",
   "Ve con Surf desde Ruta 110 a la instalación. En la sala del generador busca el brillo en el sector sureste."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Ampharosite",
   "https://bulbapedia.bulbagarden.net/wiki/New_Mauville"
  ]
 },
 {
  "id": 659,
  "name": "Venusaurita",
  "place": "Ruta 119",
  "phase": "Primigenio",
  "steps": [
   "Vuelve a la parte sur de Ruta 119 tras enfrentarte a Groudon/Kyogre.",
   "Busca en la hierba alta situada al sur de la casa de descanso, cerca de la entrada desde Ruta 118."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Venusaurite",
   "https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_119"
  ]
 },
 {
  "id": 660,
  "name": "Charizardita X",
  "place": "Senda Ígnea",
  "phase": "Primigenio",
  "steps": [
   "Regresa tras la crisis primigenia con Fuerza utilizable fuera de combate.",
   "Mueve la roca que bloquea el sector occidental y busca el brillo al este de la Piedra Fuego, en la parte suroeste de la cueva."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Charizardite_X",
   "https://bulbapedia.bulbagarden.net/wiki/Fiery_Path"
  ]
 },
 {
  "id": 661,
  "name": "Blastoisita",
  "place": "S.S. Marea",
  "phase": "Delta",
  "steps": [
   "Recibe el Ticket del Barco después del Episodio Delta y embarca en el S.S. Marea.",
   "Sal a la cubierta delantera y examina su esquina superior derecha."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Blastoisinite",
   "https://bulbapedia.bulbagarden.net/wiki/S.S._Tidal"
  ]
 },
 {
  "id": 662,
  "name": "Mewtwoita X",
  "place": "Villa Raíz",
  "phase": "Primigenio",
  "steps": [
   "Regresa después del episodio de Groudon/Kyogre.",
   "Busca al suroeste del laboratorio del profesor Abedul, en la esquina suroeste del pueblo."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Mewtwonite_X",
   "https://bulbapedia.bulbagarden.net/wiki/Littleroot_Town"
  ]
 },
 {
  "id": 663,
  "name": "Mewtwoita Y",
  "place": "Liga Pokémon",
  "phase": "Historia",
  "steps": [
   "Alcanza el exterior del edificio de la Liga, después de Calle Victoria.",
   "Antes de entrar, examina el brillo del suelo a la izquierda de la puerta principal."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Mewtwonite_Y",
   "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_League_(Hoenn)"
  ]
 },
 {
  "id": 664,
  "name": "Blazikenita",
  "place": "Ruta 120 / Ruta 114",
  "phase": "Inicial",
  "steps": [
   "Si elegiste a Torchic como inicial, Máximo entrega esta piedra en Ruta 120 al resolver el Kecleon que bloquea el puente.",
   "Si elegiste otro inicial, vuelve al vendedor de piedras de Ruta 114 después del episodio primigenio. Compra la oferta correspondiente por 1.500 ₽; las otras piedras baratas son las de los iniciales que no elegiste."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Blazikenite",
   "https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_114"
  ]
 },
 {
  "id": 665,
  "name": "Medichamita",
  "place": "Monte Pírico",
  "phase": "Historia",
  "steps": [
   "Entra en el edificio del Monte Pírico y sube por las escaleras hasta la cuarta planta.",
   "Examina el brillo de la esquina superior derecha de esa planta; no es el objeto de la ladera exterior."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Medichamite",
   "https://bulbapedia.bulbagarden.net/wiki/Mt._Pyre"
  ]
 },
 {
  "id": 666,
  "name": "Houndoomita",
  "place": "Pueblo Lavacalda",
  "phase": "Primigenio",
  "steps": [
   "Vuelve al pueblo después del episodio primigenio.",
   "Busca junto a los baños de arena, entre la zona de aguas termales y el gimnasio."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Houndoominite",
   "https://bulbapedia.bulbagarden.net/wiki/Lavaridge_Town"
  ]
 },
 {
  "id": 667,
  "name": "Aggronita",
  "place": "Túnel Fervergal",
  "phase": "Historia",
  "steps": [
   "Consigue Golpe Roca en Malvalona y habilita su uso con la medalla correspondiente.",
   "Rompe las rocas que separan a la pareja del túnel. El hombre entrega la Aggronita: aquí no se recibe Fuerza como en los juegos de GBA."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Aggronite",
   "https://bulbapedia.bulbagarden.net/wiki/Rusturf_Tunnel"
  ]
 },
 {
  "id": 668,
  "name": "Banettita",
  "place": "Monte Pírico",
  "phase": "Historia",
  "steps": [
   "Sal del edificio al sendero exterior y asciende hacia la cima.",
   "Examina el sector sureste con lápidas y ruinas, al este de las primeras escaleras de la cima."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Banettite",
   "https://bulbapedia.bulbagarden.net/wiki/Mt._Pyre"
  ]
 },
 {
  "id": 669,
  "name": "Tyranitarita",
  "place": "Desfiladero",
  "phase": "Primigenio",
  "steps": [
   "Regresa al Desfiladero después del episodio primigenio.",
   "Busca junto a la hierba situada al noreste de la entrada sur, antes de abandonar la zona hacia Ruta 112."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Tyranitarite",
   "https://bulbapedia.bulbagarden.net/wiki/Jagged_Pass"
  ]
 },
 {
  "id": 670,
  "name": "Scizorita",
  "place": "Bosque Petalia",
  "phase": "Primigenio",
  "steps": [
   "Lleva Corte y vuelve al bosque tras enfrentarte a Groudon/Kyogre.",
   "Abre el sendero del noreste cortando el arbusto. En esa zona oriental busca al sur de la Roca Musgo."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Scizorite",
   "https://bulbapedia.bulbagarden.net/wiki/Petalburg_Woods"
  ]
 },
 {
  "id": 671,
  "name": "Pinsirita",
  "place": "Ruta 124",
  "phase": "Primigenio",
  "steps": [
   "Vuelve después de la crisis primigenia con Surf y Buceo. Sumérgete en el punto al suroeste de la pareja de hermanos de la ruta.",
   "Recorre la conexión submarina y emerge por el punto del noroeste; recoge la piedra en el banco de arena aislado del lado occidental."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Pinsirite",
   "https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_124",
  "https://www.serebii.net/pokearth/hoenn/route124.shtml"
  ]
 },
 {
  "id": 672,
  "name": "Aerodactylita",
  "place": "Cascada Meteoro",
  "phase": "Historia",
  "steps": [
   "Lleva Surf y Cascada utilizables. Remonta la cascada y entra en las cámaras interiores.",
   "En la cámara interior de la primera planta, baja por la serie occidental de desniveles hasta el brillo."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Aerodactylite",
   "https://bulbapedia.bulbagarden.net/wiki/Meteor_Falls"
  ]
 },
 {
  "id": 673,
  "name": "Lucarita",
  "place": "Auditorios de concursos",
  "phase": "Concursos",
  "steps": [
   "Gana las cinco categorías de concursos en nivel Maestro para que Ariana participe.",
   "Vence a Ariana en un concurso de ese rango y habla con el personaje que entrega la recompensa tras el resultado. La recompensa la entrega Liano tras vencer a Ariana, no en la Liga."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Lucarionite",
   "https://oraswiki.com/items/mega-stones/lucarionite/",
  "https://bulbapedia.bulbagarden.net/wiki/Chaz_(game)",
  "https://bulbapedia.bulbagarden.net/wiki/Lisia",
  "https://www.pkparaiso.com/rubi-omega-zafiro-alfa/concursos.php"
  ]
 },
 {
  "id": 674,
  "name": "Abomasnowita",
  "place": "Ruta 123",
  "phase": "Primigenio",
  "steps": [
   "Regresa al jardín del Bayólogo después del episodio primigenio.",
   "Busca cerca de la parcela del noreste de su jardín."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Abomasite",
   "https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_123"
  ]
 },
 {
  "id": 675,
  "name": "Kangaskhanita",
  "place": "Pueblo Oromar",
  "phase": "Primigenio",
  "steps": [
   "Después del episodio primigenio llega a Oromar y lleva Surf.",
   "Rodea por el agua la plataforma del Centro Pokémon y examina su lado occidental, junto al cartel."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Kangaskhanite",
   "https://bulbapedia.bulbagarden.net/wiki/Pacifidlog_Town"
  ]
 },
 {
  "id": 676,
  "name": "Gyaradosita",
  "place": "Ruta 123",
  "phase": "Historia",
  "steps": [
   "Accede a la cabaña de pesca junto al estanque de Ruta 123; lleva Corte para el acceso.",
   "Habla con el Poochyena del interior y acepta rascarlo para recibir la piedra."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Gyaradosite",
   "https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_123"
  ]
 },
 {
  "id": 677,
  "name": "Absolita",
  "place": "Zona Safari",
  "phase": "Historia",
  "steps": [
   "Entra con la Bici Acrobática y usa los raíles para alcanzar el acantilado occidental.",
   "Busca la esquina noreste de ese acantilado, al sur de la zona de hierba alta. La Bici de Carreras no sustituye los saltos laterales."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Absolite",
   "https://bulbapedia.bulbagarden.net/wiki/Hoenn_Safari_Zone"
  ]
 },
 {
  "id": 678,
  "name": "Charizardita Y",
  "place": "Gruta Solar",
  "phase": "Primigenio",
  "steps": [
   "Vuelve a Gruta Solar, en Ruta 120, tras resolver el episodio primigenio; usa Surf para llegar a la entrada.",
   "Baja hasta el segundo sótano y busca cerca de la esquina suroeste."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Charizardite_Y",
   "https://bulbapedia.bulbagarden.net/wiki/Scorched_Slab"
  ]
 },
 {
  "id": 679,
  "name": "Alakazamita",
  "place": "Ciudad Portual",
  "phase": "Historia",
  "steps": [
   "Entra al mercado al aire libre de Portual.",
   "Examina el brillo en la esquina suroeste, junto al puesto de ese extremo."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Alakazite",
   "https://bulbapedia.bulbagarden.net/wiki/Slateport_City"
  ]
 },
 {
  "id": 680,
  "name": "Heracrossita",
  "place": "Ruta 127",
  "phase": "Historia",
  "steps": [
   "Usa Surf para llegar a la isla del sector suroriental donde hay un Karateka.",
   "Busca en la parte suroeste de esa isla, al oeste del entrenador."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Heracronite",
   "https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_127"
  ]
 },
 {
  "id": 681,
  "name": "Mawilita",
  "place": "Pueblo Verdegal",
  "phase": "Historia",
  "steps": [
   "Desde Ruta 117 toma el sendero del extremo suroeste que entra en la zona aislada de Verdegal.",
   "Sigue hasta el rincón sureste del pueblo y recoge el brillo. No está en el paso principal hacia el túnel."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Mawilite",
   "https://bulbapedia.bulbagarden.net/wiki/Verdanturf_Town"
  ]
 },
 {
  "id": 682,
  "name": "Manectricita",
  "place": "Ruta 110 · Carril Bici",
  "phase": "Historia",
  "steps": [
   "Entra en el Carril Bici por el acceso norte de Ruta 110, con una bicicleta.",
   "Busca al lado derecho del extremo norte, junto a la entrenadora; examina el brillo del suelo."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Manectite",
   "https://bulbapedia.bulbagarden.net/wiki/Seaside_Cycling_Road"
  ]
 },
 {
  "id": 683,
  "name": "Garchompita",
  "place": "Ciudad Arborada · gremio",
  "phase": "Bases",
  "steps": [
   "Reúne 1.000 banderas de otras bases para alcanzar rango Platino. Los QR ayudan a encontrar bases; sus banderas no están disponibles inmediatamente el primer día.",
   "Vuelve al gremio de bases secretas en Arborada y habla con Perico para actualizar tu rango y recibir la Garchompita."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Garchompite",
   "https://bulbapedia.bulbagarden.net/wiki/Secret_Base"
  ]
 },
 {
  "id": 684,
  "name": "Latiasita",
  "place": "Isla del Sur / Villa Raíz",
  "phase": "Eón",
  "steps": [
   "Consulta la entrega de tu edición. Tener a Latias registrado en la Pokédex no demuestra haber recibido esta piedra."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Latiasite"
  ],
  "variants": {
   "OMEGARUBY": [
    "Completa el Episodio Delta y habla con tu madre en casa, en Villa Raíz, para recibir la Latiasita."
   ],
   "ALPHASAPPHIRE": [
    "En la visita de historia a Isla del Sur, Latias se incorpora al equipo con la Latiasita equipada. Si no está en la bolsa, revisa su objeto."
   ]
  }
 },
 {
  "id": 685,
  "name": "Latiosita",
  "place": "Isla del Sur / Villa Raíz",
  "phase": "Eón",
  "steps": [
   "Consulta la entrega de tu edición. Una piedra equipada no aparece en el bolsillo de objetos."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Latiosite"
  ],
  "variants": {
   "OMEGARUBY": [
    "En la visita de historia a Isla del Sur, Latios se incorpora al equipo con la Latiosita equipada. Revisa su objeto antes de buscar otra entrega."
   ],
   "ALPHASAPPHIRE": [
    "Completa el Episodio Delta y habla con tu madre en casa, en Villa Raíz, para recibir la Latiosita."
   ]
  }
 },
 {
  "id": 752,
  "name": "Swampertita",
  "place": "Ruta 120 / Ruta 114",
  "phase": "Inicial",
  "steps": [
   "Si elegiste a Mudkip como inicial, Máximo entrega esta piedra en Ruta 120 al resolver el Kecleon que bloquea el puente.",
   "Si elegiste otro inicial, vuelve al vendedor de piedras de Ruta 114 después del episodio primigenio. Compra la oferta correspondiente por 1.500 ₽; las otras piedras baratas son las de los iniciales que no elegiste."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Swampertite",
   "https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_114"
  ]
 },
 {
  "id": 753,
  "name": "Sceptilita",
  "place": "Ruta 120 / Ruta 114",
  "phase": "Inicial",
  "steps": [
   "Si elegiste a Treecko como inicial, Máximo entrega esta piedra en Ruta 120 al resolver el Kecleon que bloquea el puente.",
   "Si elegiste otro inicial, vuelve al vendedor de piedras de Ruta 114 después del episodio primigenio. Compra la oferta correspondiente por 1.500 ₽; las otras piedras baratas son las de los iniciales que no elegiste."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Sceptilite",
   "https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_114"
  ]
 },
 {
  "id": 754,
  "name": "Sableynita",
  "place": "Ciudad Arrecípolis",
  "phase": "Historia",
  "steps": [
   "Alcanza Arrecípolis por la conexión de Buceo desde Ruta 126 y lleva Surf.",
   "En el área que conduce a Cueva Ancestral, cruza hacia el lado este del gran árbol y examina el sector sureste."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Sablenite",
   "https://bulbapedia.bulbagarden.net/wiki/Sootopolis_City"
  ]
 },
 {
  "id": 755,
  "name": "Altarianita",
  "place": "Ciudad Calagua",
  "phase": "Historia",
  "steps": [
   "Lleva un Altaria en el equipo. No basta con verlo o tenerlo guardado en una caja.",
   "Muéstralo al Coleccionista que espera fuera del club de fans de concursos, al este del Centro Pokémon."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Altarianite",
   "https://bulbapedia.bulbagarden.net/wiki/Lilycove_City"
  ]
 },
 {
  "id": 756,
  "name": "Galladita",
  "place": "Pueblo Pardal",
  "phase": "Delta",
  "steps": [
   "Completa el Episodio Delta.",
   "Vuelve a la casa del profesor Cozmo en Pardal y habla con él para recibir la Galladita."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Galladite",
   "https://bulbapedia.bulbagarden.net/wiki/Fallarbor_Town"
  ]
 },
 {
  "id": 757,
  "name": "Audinita",
  "place": "Resort Batalla",
  "phase": "Delta",
  "steps": [
   "Accede al Resort después del Episodio Delta. Investiga al hombre amnésico de la playa, Handsome.",
   "Después de la escena vuelve a hablar con él en la casa donde lo han acogido para recibir la Audinita."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Audinite",
   "https://bulbapedia.bulbagarden.net/wiki/Battle_Resort"
  ]
 },
 {
  "id": 758,
  "name": "Metagrossita",
  "place": "Liga Pokémon",
  "phase": "Revancha",
  "steps": [
   "Termina el Episodio Delta y prepara la revancha de la Liga con los equipos mejorados.",
   "Vence de nuevo a Máximo: entrega la Metagrossita tras la primera revancha. El Beldum de su casa no sustituye este requisito."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Metagrossite",
   "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_League_(Hoenn)"
  ]
 },
 {
  "id": 759,
  "name": "Sharpedonita",
  "place": "Guarida Aqua / Resort Batalla",
  "phase": "Delta",
  "steps": [
   "Sigue la entrega de tu edición; ambas permiten conseguir la piedra sin intercambiarla."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Sharpedonite"
  ],
  "variants": {
   "OMEGARUBY": [
    "En la primera visita al Resort Batalla, recibe la Sharpedonita del Team Aqua."
   ],
   "ALPHASAPPHIRE": [
    "Durante el Episodio Delta, vuelve a la Guarida Aqua de Calagua y recibe la Sharpedonita de Aquiles."
   ]
  }
 },
 {
  "id": 760,
  "name": "Slowbronita",
  "place": "Cueva Cardumen",
  "phase": "Mareas",
  "steps": [
   "Recoge cuatro Conchas Cardumen con marea alta (09:00–14:59 o 21:00–02:59) y cuatro Sales Cardumen con marea baja (03:00–08:59 o 15:00–20:59). Usa el reloj del juego.",
   "Entrega los ocho materiales al anciano de la entrada para fabricar por primera vez una Campana Concha; esa primera fabricación da también la Slowbronita."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Slowbronite",
   "https://bulbapedia.bulbagarden.net/wiki/Shoal_Cave",
  "https://www.serebii.net/pokearth/hoenn/shoalcave.shtml"
  ]
 },
 {
  "id": 761,
  "name": "Steelixita",
  "place": "Cueva Granito",
  "phase": "Historia",
  "steps": [
   "Vuelve con la Bici de Carreras y supera las pendientes para bajar al segundo sótano.",
   "Busca a la derecha de la gran roca aislada de esa planta. No necesitas la antigua demo de distribución."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Steelixite",
   "https://bulbapedia.bulbagarden.net/wiki/Granite_Cave"
  ]
 },
 {
  "id": 762,
  "name": "Pidgeotita",
  "place": "Verdegal → Devon",
  "phase": "Historia",
  "steps": [
   "Ayuda a la niña de Verdegal a encontrar su Shroomish: examina el cartel donde se esconde y recibe la Piedra Insólita.",
   "Lleva esa piedra al presidente de Devon en Ciudad Férrica. Al identificarla se convierte en Pidgeotita."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Pidgeotite",
   "https://bulbapedia.bulbagarden.net/wiki/Intriguing_Stone"
  ]
 },
 {
  "id": 763,
  "name": "Glalita",
  "place": "Cueva Cardumen",
  "phase": "Mareas",
  "steps": [
   "Visita la cueva con marea baja (03:00–08:59 o 15:00–20:59 del reloj del juego). Lleva la Bici de Carreras o Fuerza para acceder a la cámara de hielo.",
   "Resuelve los deslizamientos y alcanza la plataforma elevada del lado norte, donde está el brillo. No depende de conservar la demo."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Glalitite",
   "https://bulbapedia.bulbagarden.net/wiki/Shoal_Cave",
  "https://www.serebii.net/pokearth/hoenn/shoalcave.shtml"
  ]
 },
 {
  "id": 764,
  "name": "Diancita",
  "place": "Centro Pokémon",
  "phase": "Legado",
  "steps": [
   "Necesitas un Diancie de evento con el atributo de encuentro fatídico en el equipo; no se captura durante la historia normal de estos juegos.",
   "Entra en un Centro Pokémon y completa la escena de entrega. La distribución histórica de Diancie se trata aparte y no se exige para la tarjeta oficial."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Diancite"
  ],
  "legacy": true
 },
 {
  "id": 767,
  "name": "Cameruptita",
  "place": "Guarida Magma / Resort Batalla",
  "phase": "Delta",
  "steps": [
   "Sigue la entrega de tu edición; no confundas esta recompensa con la del equipo contrario."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Cameruptite"
  ],
  "variants": {
   "OMEGARUBY": [
    "Durante el Episodio Delta, vuelve a la Guarida Magma de Calagua y recibe la Cameruptita de Magno."
   ],
   "ALPHASAPPHIRE": [
    "En la primera visita al Resort Batalla, recibe la Cameruptita del Team Magma."
   ]
  }
 },
 {
  "id": 768,
  "name": "Lopunnita",
  "place": "Malvalona · apartamentos",
  "phase": "Primigenio",
  "steps": [
   "Tras la crisis primigenia habla con Erico en la plaza y visita su apartamento para conseguir acceso al piso residencial.",
   "En el pasillo este presencia la escena del hombre de traje ante el apartamento 12. Sal y vuelve más tarde; habla con él fuera de la vivienda para recibir la piedra."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Lopunnite",
   "https://bulbapedia.bulbagarden.net/wiki/Mauville_City"
  ]
 },
 {
  "id": 769,
  "name": "Salamencita",
  "place": "Cascada Meteoro",
  "phase": "Delta",
  "steps": [
   "Completa el Episodio Delta. Lleva Surf y Cascada para volver a las cámaras interiores.",
   "Busca a la abuela de Tristana y habla con ella para recibir la Salamencita."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Salamencite",
   "https://bulbapedia.bulbagarden.net/wiki/Meteor_Falls"
  ]
 },
 {
  "id": 770,
  "name": "Beedrillita",
  "place": "Malvamar · almacén",
  "phase": "Historia",
  "steps": [
   "Lleva Surf y Buceo. Cruza al pasillo seco del otro lado y pide la llave 1 a la niña. Entra en la sala 1: la llave 2 está en el archivador.",
   "Abre la sala 2 y habla con sus ocupantes para recibir la llave 6. Desde la sala 6 sal al exterior y habla con el pescador para la llave 4.",
   "Abre la sala 4, recoge la Llave Almacén junto a la cama y accede al almacén desde el exterior norte. La Beedrillita está en la esquina inferior izquierda de la pantalla."
  ],
  "sources": [
   "https://bulbapedia.bulbagarden.net/wiki/Beedrillite",
   "https://bulbapedia.bulbagarden.net/wiki/Sea_Mauville"
  ]
 }
];
 const games=['OMEGARUBY','ALPHASAPPHIRE'];
 const searchable=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 function snapshot(game,d){
  if(!games.includes(game))return null;
  const pockets=d?.game===game&&d.integrity?.checksumsValid===true&&Array.isArray(d.inventory)?d.inventory.filter(p=>p?.pocket==='Items'):[];
  const bag=pockets.length===1&&Array.isArray(pockets[0].items)?pockets[0].items:null;
  const quantities=new Map(),invalid=new Set();
  if(bag)for(const item of bag){
   if(!Number.isInteger(item?.id)||item.id<1||item.id>65535)continue;
   if(quantities.has(item.id)||!Number.isInteger(item.count)||item.count<1||item.count>65535)invalid.add(item.id);
   quantities.set(item.id,item.count);
  }
  const entries=stones.map(s=>({...s,steps:[...s.steps,...(s.variants?.[game]||[])],
   state:!bag||invalid.has(s.id)?'unknown':quantities.has(s.id)?'present':'not-in-bag',
   count:bag&&!invalid.has(s.id)?quantities.get(s.id)||0:null}));
  return {entries,inBag:entries.filter(s=>s.state==='present').length,readable:!!bag,total:47};
 }
 function render(game,d,esc){
  const data=snapshot(game,d);if(!data)return '';
  return `<section class="panel" data-oras-stones><h3>Las 47 megapiedras de Hoenn</h3><p>46 se consiguen con las actividades de estos juegos; la Diancita requiere un Diancie de evento. Rayquaza megaevoluciona mediante Ascenso Draco y no tiene megapiedra. Los Prismas Rojo y Azul corresponden a la regresión primigenia y van aparte.</p><p data-stone-summary><b>${data.readable?data.inBag+'/47 tipos presentes en la bolsa':'Inventario sin lectura comprobada'}</b>. ${data.readable?'Solo se compara el bolsillo de objetos de este diagnóstico.':'Importa un guardado compatible actualizado para comparar su bolsa con esta guía.'} Una piedra ausente puede estar equipada en un Pokémon o haber sido intercambiada: no significa que nunca la obtuvieras. Esta lista no marca misiones ni acredita su entrega original.</p><div style="display:grid;grid-template-columns:minmax(0,1fr);gap:8px"><input style="width:100%;min-width:0" data-stone-query type="search" placeholder="Buscar piedra, lugar o requisito" aria-label="Buscar megapiedra"><select style="width:100%;min-width:0" data-stone-filter aria-label="Filtrar megapiedras"><option value="all">Todas</option><option value="present">Presentes en bolsa</option><option value="not-in-bag">No constan en bolsa</option><option value="unknown">Sin lectura comprobada</option><option value="legacy">Legado: Diancita</option></select></div><p data-stone-count role="status"></p>${data.entries.map(s=>`<details data-stone-item="${s.id}" data-stone-state="${s.state}" data-stone-legacy="${!!s.legacy}" data-stone-search="${esc([s.name,s.place,s.phase,...s.steps].join(' '))}" style="padding:10px 0;overflow-wrap:anywhere"><summary><b>${esc(s.name)}</b> · ${s.state==='present'?'En bolsa ×'+s.count:s.state==='not-in-bag'?'No consta en bolsa':'Sin lectura comprobada'}</summary><p><b>${esc(s.place)}</b> · ${esc(s.phase)}${s.legacy?' · Opcional de legado':''}</p><ol>${s.steps.map(step=>`<li>${esc(step)}</li>`).join('')}</ol><p class="small">Fuentes: ${s.sources.map((url,i)=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">Referencia ${i+1}</a>`).join(' · ')}. Los requisitos de la ruta no se dan por cumplidos por poseer el objeto.</p></details>`).join('')}</section>`;
 }
 function wire(container){
  for(const panel of container.querySelectorAll('[data-oras-stones]')){
   const query=panel.querySelector('[data-stone-query]'),filter=panel.querySelector('[data-stone-filter]');
   const update=()=>{let visible=0;const term=searchable(query.value.trim());
    for(const row of panel.querySelectorAll('[data-stone-item]')){
     const mode=filter.value,status=mode==='all'||mode===row.dataset.stoneState||mode==='legacy'&&row.dataset.stoneLegacy==='true';
     row.hidden=!(status&&searchable(row.dataset.stoneSearch).includes(term));if(!row.hidden)visible++;
    }
    panel.querySelector('[data-stone-count]').textContent=visible+(visible===1?' megapiedra visible':' megapiedras visibles');
   };query.oninput=update;filter.onchange=update;update();
  }
 }
 const api={stones,snapshot,render,wire};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonOrasStones=api;

})(globalThis);
