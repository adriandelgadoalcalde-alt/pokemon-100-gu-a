/* Hisui story, mounted traversal and capture requirements stay distinct from research perfection. */
(function(root){
 'use strict';
 const routes=[
  {
    "games": [
      "ARCEUS"
    ],
    "mission": "01",
    "location": "Playa del Albor → Villa Jubileo → Pradera Obsidiana",
    "requires": [],
    "steps": [
      "Sigue al profesor Lavender por Playa del Albor y captura los tres Pokémon que se escaparon usando las Poké Balls del tutorial. Recoge el Arceusmóvil y acompáñalo a Villa Jubileo.",
      "Completa la reunión y el alojamiento de la primera noche. A la mañana siguiente habla con Selena en la sede del Equipo Galaxia para aceptar la prueba de ingreso.",
      "Elige a Rowlet, Cyndaquil u Oshawott en el laboratorio. Antes de salir de la villa vence a Volus (Volo en la versión inglesa).",
      "En Pradera Obsidiana captura Bidoof, Starly y Shinx para la prueba. Acércate agachado al Starly para que no huya; Shinx exige aprender a iniciar el combate cuando está alerta.",
      "Regresa con el resultado de las tres capturas y recibe el uniforme del equipo. Preséntate ante Sorbus para terminar el ingreso oficial.",
      "Aprende la artesanía en la villa: combina materiales en una mesa para fabricar Poké Balls. Recibe la Pokédex y el equipo de elaboración; recoger materiales y registrar tareas sostiene la progresión posterior."
    ],
    "check": "Ingreso, inicial, Pokédex y elaboración de objetos habilitados.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Legends:_Arceus/Part_1",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Legends:_Arceus/Part_2",
      "https://www.serebii.net/legendsarceus/missions/thegalaxyteam'sentrytrial.shtml",
      "https://www.serebii.net/legendsarceus/missions/thebasicsofcrafting.shtml"
    ],
    "pitfalls": [],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ARCEUS"
    ],
    "mission": "02",
    "location": "Pradera Obsidiana: Loma del Venado → Arena del Gran Árbol",
    "requires": [
      "Ingreso en el Equipo Galaxia"
    ],
    "steps": [
      "Completa tareas de investigación en Pradera y presenta el informe a Lavender. Cuando alcances los puntos de la primera estrella vuelve a Selena para recibir el ascenso; los puntos sin entregar no bastan para cambiar de rango.",
      "Vence a Kira o Luka en el combate de instrucción y habla con Lina, guardiana de Wyrdeer, para seguir la investigación de Loma del Venado.",
      "Resuelve el encuentro con el Kricketune alfa de la loma y habilita el campamento de esa zona. Un alfa puede combatirse o capturarse cuando el encuentro lo permite; no todos son objetivos señoriales.",
      "Acude a la Arena del Gran Árbol y habla con Nambo y Nákara para investigar a Kleavor. Después consulta con Lavender la forma de convertir su comida preferida en calmasferas.",
      "Obtén la Flauta Celestial y la ayuda de Wyrdeer para desplazarte. Regresa a la arena y completa el combate con Nákara antes del desafío señorial.",
      "Calma a Kleavor lanzando calmasferas y esquivando sus cargas. Usa el árbol o los obstáculos para que choque; cuando quede expuesto puedes enviar un Pokémon y abrir una oportunidad de más lanzamientos.",
      "Agota su barra de furia y recibe la tabla correspondiente. Vuelve a la villa para informar a Sorbus. Calmar al Kleavor señorial no lo añade automáticamente como captura a la Pokédex."
    ],
    "check": "Kleavor calmado, Wyrdeer disponible y misión informada.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Legends:_Arceus/Part_3",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Legends:_Arceus/Part_4",
      "https://www.serebii.net/legendsarceus/missions/arequestfrommai.shtml",
      "https://www.serebii.net/legendsarceus/missions/thefrenzyofthelordofthewoods.shtml",
      "https://www.wikidex.net/wiki/Guardi%C3%A1n"
    ],
    "pitfalls": [],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ARCEUS"
    ],
    "mission": "03",
    "location": "Pantanal Carmesí: Ruinas Sosiego → Loma Lodosa → Arena del Escenario",
    "requires": [
      "Kleavor calmado y segunda estrella de investigación"
    ],
    "steps": [
      "Acepta el encargo de Sera y entra en Pantanal Carmesí con el rango exigido. Visita a Genara en Ruinas Sosiego y supera el encuentro con Volus.",
      "Sigue la investigación del fragmento robado de las ruinas. Busca al trío de hermanas, recupera el fragmento después del combate y devuélvelo a Genara para que lea la inscripción.",
      "Ve a Loma Lodosa y supera el combate con Ursaluna. Genara atiende a la montura; recibes su ayuda para rastrear olores y excavar objetos, no un Ursaluna capturado para el equipo.",
      "Regresa a la sede de la villa cuando te llamen por la desaparición de Sera. Vuelve al pantanal y usa el rastro azul de Ursaluna para encontrarla; no sigas solo las señales de objetos enterrados.",
      "Continúa hasta la Arena del Escenario y prepara el desafío de Lilligant de Hisui. Esquiva sus saltos y ondas de choque, y lanza calmasferas en las pausas de su danza.",
      "Cuando aparezca una ocasión de combate, úsala para aturdirla y aumentar los lanzamientos. Completa la barra de furia y vuelve a informar a Sorbus para abrir la siguiente investigación."
    ],
    "check": "Lilligant calmada, Ursaluna disponible y encargo de Sera terminado.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Legends:_Arceus/Part_5",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Legends:_Arceus/Part_6",
      "https://www.serebii.net/legendsarceus/missions/arezu'spredicament.shtml",
      "https://www.wikidex.net/wiki/Guardi%C3%A1n"
    ],
    "pitfalls": [],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ARCEUS"
    ],
    "mission": "04",
    "location": "Costa Cobalto: Cabo Rocavelo → Playa Ginkgo → Isla Escupefuego",
    "requires": [
      "Lilligant calmada y tercera estrella"
    ],
    "steps": [
      "Acepta investigar Costa Cobalto y supera el encuentro con Nákara. Habla con Nina junto a los Growlithe para conocer el problema de la isla sin señor y el paso hacia el mar.",
      "Visita a Erio en su casa. Para elaborar el cebo de Basculegion necesita la ayuda de un Dusclops: captura uno en el área de barcos abandonados de la costa, buscándolo de noche si no aparece.",
      "Vuelve con Dusclops, completa la preparación del cebo y acompaña a Erio para ofrecérselo a Basculegion. Recibe la montura marina, que permite navegar y lanzar Balls desde el agua.",
      "Después del secuestro del Growlithe por las hermanas, cruza el mar hasta Isla Escupefuego. Sigue el camino del volcán y supera los tres enfrentamientos para rescatarlo.",
      "Presencia la evolución y el nuevo estado de furia de Arcanine de Hisui. En la arena usa las franjas seguras para esquivar sus cargas sin caer en las zonas de fuego.",
      "Cuando cargue su gran ataque y aparezcan esferas de fuego sobre él, acierta con calmasferas para interrumpirlo. Aprovecha sus pausas y ocasiones de combate hasta vaciar la barra.",
      "Recibe la tabla del desafío y vuelve a la villa para informar. Basculegion montura y Arcanine señorial calmado se distinguen de obtener esas especies en tu propio equipo."
    ],
    "check": "Arcanine calmado y desplazamiento marítimo habilitado.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Legends:_Arceus/Part_7",
      "https://www.serebii.net/legendsarceus/missions/thelordlessisland.shtml",
      "https://www.wikidex.net/wiki/Guardi%C3%A1n"
    ],
    "pitfalls": [],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ARCEUS"
    ],
    "mission": "05",
    "location": "Ladera Corona: Cueva Extravío → Risco Riscoso → Arena de la Luna",
    "requires": [
      "Arcanine calmado y cuarta estrella"
    ],
    "steps": [
      "Acepta el encargo de Ladera Corona, supera el combate con Adamas y sigue a Fero. Recorre Cueva Extravío siguiendo sus indicaciones; si te separas, regresa hacia su voz y los puntos de reunión en lugar de atravesar la cueva a ciegas.",
      "Completa los encuentros de Fero y Kameri durante el ascenso. La ayuda de Sneasler permite escalar los muros marcados, sin enseñar Treparrocas ni llevar una MO.",
      "Continúa por las ruinas y el ascenso hasta la Arena de la Luna. Vence a Kameri y atiende la intervención de Adamas para que pueda prepararse el desafío de Electrode.",
      "En la Arena de la Luna mantente en movimiento mientras Electrode de Hisui te persigue con electricidad y caen Voltorb. No te detengas bajo las explosiones para lanzar calmasferas.",
      "Cuando Electrode prepare su explosión de gran radio, sal del área marcada; al agotarse queda una oportunidad para enviar un Pokémon y abrir lanzamientos más seguros.",
      "Completa la barra de furia y vuelve a Sorbus con el informe. El desbloqueo de Sneasler montura no acredita haber evolucionado un Sneasel de Hisui para la colección."
    ],
    "check": "Electrode calmado y Sneasler disponible.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Legends:_Arceus/Part_8",
      "https://www.serebii.net/legendsarceus/missions/scalingperilousheights.shtml",
      "https://www.wikidex.net/wiki/Guardi%C3%A1n"
    ],
    "pitfalls": [],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ARCEUS"
    ],
    "mission": "06",
    "location": "Tundra Alba: Témpano Avalugg → Templo Puntaneva → Arena del Glaciar",
    "requires": [
      "Electrode calmado y quinta estrella"
    ],
    "steps": [
      "Habla con Sorbus y viaja a Tundra Alba. Encuentra a Rauko cerca del Témpano Avalugg y véncelo para continuar con la búsqueda del Hielo Eterno.",
      "Sigue las apariciones de Wasabi por la tundra hasta Templo Puntaneva. Dentro, cada estatua mira hacia la siguiente; observa sus símbolos de Roca, Acero e Hielo para formar las contraseñas.",
      "Abre la primera puerta con Roca → Acero → Hielo. En la segunda introduce Hielo → Roca → Acero → Roca → Hielo.",
      "Para la tercera puerta usa Acero → Hielo → Roca → Hielo → Acero → Roca. Continúa por la planta superior hasta el combate con Wasabi.",
      "Vence a Wasabi y después al Braviary de Hisui que te espera fuera. Obtén su ayuda como montura aérea y vuela hasta la parte superior del Témpano Avalugg.",
      "Recoge el Hielo Eterno y llévalo a Rauko para preparar las calmasferas. Entra en la Arena del Glaciar cuando tengas recursos para el desafío.",
      "Ante Avalugg de Hisui esquiva las oleadas, carámbanos y el gran rayo. Aprovecha los huecos entre ataques para lanzar; cuando quede expuesto puedes iniciar combate para crear otra apertura.",
      "Vacía la barra de furia y vuelve a la villa. Los cinco señoriales calmados no equivalen todavía a resolver la crisis de la grieta."
    ],
    "check": "Avalugg calmado, Braviary y cinco desafíos señoriales terminados.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Legends:_Arceus/Part_9",
      "https://www.serebii.net/legendsarceus/missions/theslumberinglordofthetundra.shtml",
      "https://www.wikidex.net/wiki/Guardi%C3%A1n"
    ],
    "pitfalls": [],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ARCEUS"
    ],
    "mission": "07",
    "location": "Villa Jubileo → Retiro Antiguo → tres lagos → Templo de Sinnoh",
    "requires": [
      "Cinco Pokémon señoriales calmados"
    ],
    "steps": [
      "Tras el cambio del cielo y la expulsión de la villa sigue las instrucciones de Selena. Busca ayuda en Pradera y continúa con Volus hasta Metis en Retiro Antiguo.",
      "Elige el apoyo de Adamas o Nákara. Esto decide el orden de Dialga y Palkia: con Adamas capturas primero a Dialga; con Nákara, primero a Palkia. Ambos se consiguen en la historia.",
      "En Lago Veraz supera al Goodra alfa de Hisui y responde a Mesprit para recibir su prueba. No es todavía su captura de postgame.",
      "En Lago Valor supera al Overqwil alfa y persevera en la prueba de Azelf. Sigue intentando alcanzarlo y no aceptes abandonar hasta recibir el objeto de su prueba.",
      "En Lago Agudeza supera al Zoroark alfa de Hisui. Uxie pide los ojos de Combee, Zubat, Unown, Magneton y Dusclops: introduce 60131.",
      "Con las tres pruebas vuelve a Retiro Antiguo para forjar la Cadena Roja y regresar a la villa. Sube al Monte Corona, supera al cocinero que se revela como ninja y vence a Sorbus antes del Templo de Sinnoh.",
      "En el templo combate y captura al primer legendario con tu equipo y Poké Balls. Tras la aparición del segundo, retrocede y sigue el encargo para preparar una captura diferente.",
      "Busca la Mena Origen en la Gruta Inmemorial y supera la intervención de las hermanas. Llévala a la villa para fabricar la Origen Ball.",
      "Regresa al templo llevando al primer legendario. El segundo adopta Forma Origen: esquiva meteoros y ondas, y usa las calmasferas hasta resolver la captura con la Origen Ball.",
      "Deja terminar la resolución y los créditos. Continúa con las tablas y Volus en el postgame; los créditos no equivalen al encuentro de Arceus."
    ],
    "check": "Dialga y Palkia obtenidos en su secuencia de historia; grieta resuelta.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Legends:_Arceus/Part_10",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Legends:_Arceus/Part_11",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Legends:_Arceus/Part_12",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Legends:_Arceus/Part_13",
      "https://www.serebii.net/legendsarceus/missions/disasterlooming.shtml",
      "https://www.serebii.net/legendsarceus/missions/seekingtheredchain.shtml",
      "https://www.serebii.net/legendsarceus/missions/thetrialoflakeverity.shtml",
      "https://www.serebii.net/legendsarceus/missions/thetrialoflakevalor.shtml",
      "https://www.serebii.net/legendsarceus/missions/thetrialoflakeacuity.shtml",
      "https://www.serebii.net/legendsarceus/missions/atopmountcoronet.shtml",
      "https://www.serebii.net/legendsarceus/missions/thecounterpart.shtml",
      "https://www.wikidex.net/wiki/Lista_de_objetos_clave_de_la_octava_generaci%C3%B3n"
    ],
    "pitfalls": [],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ARCEUS"
    ],
    "mission": "08",
    "location": "Hisui: tablas → Retiro Antiguo → Ruinas Celestiales → Templo de Sinnoh",
    "requires": [
      "Créditos de la historia principal"
    ],
    "steps": [
      "Habla con Volus y sigue la nueva investigación de los mitos, incluido el combate con Vespiquen en la Pradera. Visita a Metis en Retiro Antiguo para recibir las pistas de las tablas.",
      "Completa la pista de los lagos: vuelve a las cuevas de Veraz, Valor y Agudeza para capturar a Mesprit, Azelf y Uxie. No uses los objetos de las pruebas anteriores como prueba de esas capturas.",
      "En Isla Escupefuego entra en la cueva del volcán para Heatran. Recoge bolas de lodo del suelo y lánzalas para romper su barrera de fuego antes de iniciar el combate y capturarlo.",
      "En la Arena de la Luna habla primero con Kameri y sigue la pista de Cresselia. Su campo invierte los controles; acércate con cuidado para iniciar el encuentro y capturarla.",
      "Completa el combate de Sorbus en Playa del Albor para la tabla de esa pista. Antes del acceso a Regigigas necesitas reunir las tablas Pétrea, Helada y Acero.",
      "Con esas tres tablas abre la puerta del sótano de Templo Puntaneva y captura a Regigigas. Aquí el acceso no pide llevar a Regirock, Regice y Registeel, como en los juegos de Sinnoh de otra época.",
      "Regresa a Metis con las pistas resueltas. Entrega tres unidades de madera para recibir su tabla y sigue a Volus hacia Ruinas Celestiales antes de subir de nuevo al templo.",
      "Prepara un equipo y curaciones para una cadena continua. Vence los seis Pokémon de Volus y después las dos fases de Giratina; entre las dos fases no se reinicia todo tu equipo como si fueran combates aislados.",
      "Al resolver la cadena recibes la tabla que faltaba y la Flauta Celestial se transforma en Flauta Azur. La aparición de Giratina en este combate no es su captura original.",
      "Continúa la petición de Giratina en Cueva Retorno, en Costa Cobalto: captúralo y presenta el informe. La Gran Griseosfera que se obtiene permite alternar su forma.",
      "Los encargos de los tesoros de Adamas y Nákara dan Gran Diamansfera y Gran Lustresfera para las formas de Dialga/Palkia. Sus objetos y combates son objetivos separados del orden inicial de captura."
    ],
    "check": "Volus y las dos fases vencidos; Flauta Azur; Giratina y objetos de forma revisados aparte.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Legends:_Arceus/Part_14",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Legends:_Arceus/Part_15",
      "https://www.serebii.net/legendsarceus/missions/theresearcherofmyths.shtml",
      "https://www.serebii.net/legendsarceus/missions/theplateofthelakes.shtml",
      "https://www.serebii.net/legendsarceus/missions/theplateoffirespitisland.shtml",
      "https://www.serebii.net/legendsarceus/missions/theplateofmoonviewarena.shtml",
      "https://www.serebii.net/legendsarceus/missions/theplateofpreludebeach.shtml",
      "https://www.serebii.net/legendsarceus/missions/theplateofsnowpointtemple.shtml",
      "https://www.serebii.net/legendsarceus/missions/seekingtheremainingplates.shtml",
      "https://www.serebii.net/legendsarceus/legendary.shtml",
      "https://www.serebii.net/legendsarceus/formchange.shtml"
    ],
    "pitfalls": [
      "El conjunto de tablas determina accesos. No basta con llegar físicamente al templo, ni tener una especie por intercambio demuestra completar su escena."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ARCEUS"
    ],
    "mission": "10",
    "location": "Hisui: Unown, volutas, distorsiones y desafíos posteriores",
    "requires": [
      "Monturas, zonas y peticiones correspondientes habilitadas"
    ],
    "steps": [
      "Reúne las 28 formas de Unown siguiendo sus notas del abecedario y signos. Son capturas del mapa con Poké Balls; después de reunirlas aparecen también en las ruinas, donde puedes buscar ejemplares distintos.",
      "Para Spiritomb completa la petición de las volutas de luz: hay 107 para reunir por la región antes de la escena final, con contadores por villa y por zona. Visita de noche los lugares donde no distingas bien su brillo. Con las 107 reunidas, habla con Alma y acude a Ruinas de la Niebla de noche para la última escena y el encuentro de Spiritomb.",
      "En las distorsiones espacio-temporales espera a que la zona se active de verdad antes de buscar sus encuentros especiales. Permanecer en una región deja correr su temporizador; cambiar a la villa o descansar para cambiar de hora reinicia la espera.",
      "Busca Porygon y sus evoluciones en las distorsiones del Pantanal, Magnemite/Magneton en Costa, Cranidos/Shieldon y sus evoluciones en Ladera, y las especies restantes de esas listas. No todas aparecen en cualquier distorsión de cualquier zona.",
      "La petición de Manaphy requiere Buizel, Mantyke y Overqwil en el equipo: al atardecer cruza los dos pilares marinos de la costa y después explora Cueva Costera para sus encuentros de Manaphy y Phione.",
      "Tras Volus sigue la petición de las fuerzas de la naturaleza: Tornadus aparece en Tundra con ventisca, Thundurus en Costa con tormenta y Landorus en la isla de Pradera. Rompe sus barreras antes de iniciar la captura.",
      "Presenta a Metis las tres entradas del trío a nivel de investigación 10 y continúa hacia Enamorus en el Pantanal. Capturarlos y subir sus investigaciones son pasos separados del acceso a ese cuarto encuentro.",
      "En la actualización gratuita El despertar de Hisui, después de los créditos, completa la cadena de apariciones supermasivas y revisa los desafíos de Fero, vía perseverante y vía solitaria. El reto onírico exige completar todas las encomiendas principales, incluido Arceus, y dormir en tu residencia.",
      "Las capturas variocolor, colección de alfas y entradas perfectas son objetivos ampliados: no se imponen como requisito para llegar a Arceus. Mantén separados captura de especies, formas, peticiones, nivel de investigación y tareas perfectas."
    ],
    "check": "Colecciones, especies de distorsión y actividades posteriores distinguidas por requisito.",
    "sources": [
      "https://www.serebii.net/legendsarceus/unownlocations.shtml",
      "https://www.serebii.net/legendsarceus/spiritombwisp.shtml",
      "https://www.serebii.net/legendsarceus/space-timedistortions.shtml",
      "https://www.serebii.net/legendsarceus/legendary.shtml",
      "https://legends.arceus.pokemon.com/es-es/update/",
      "https://www.serebii.net/legendsarceus/requests/thesea'slegend.shtml",
      "https://www.serebii.net/legendsarceus/requests/incarnateforcesofhisui.shtml"
    ],
    "pitfalls": [
      "Faltan todavía todas las coordenadas de Unown/volutas, el inventario de peticiones y sus recompensas, poemas, formas y retos individuales. El recorrido actual no declara esas colecciones cerradas."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  }
];
 if(typeof module==='object'&&module.exports)module.exports=routes;else root.PokemonHisuiRoutes=routes;
})(globalThis);
