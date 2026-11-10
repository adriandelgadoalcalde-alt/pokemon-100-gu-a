/* Separate chronology and trials for the original Alola games and Ultra editions. */
(function(root){
 'use strict';
 const routes=[
  {
    "games": [
      "SUN",
      "MOON"
    ],
    "mission": "01",
    "location": "Ruta 1 → Pueblo Lilii → Senda Mahalo → escuela → Hauoli",
    "requires": [],
    "steps": [
      "Sigue a Kukui desde tu casa hasta Pueblo Lilii. Como Kaudan no está, sube por Senda Mahalo, ayuda a Lylia y a Cosmog en el puente y recoge la piedra que deja Tapu Koko.",
      "Vuelve al pueblo y elige Rowlet, Litten o Popplio con Kaudan. Completa el primer combate contra Tilo; no se elige el inicial en medio de Ruta 1 como en las versiones Ultra.",
      "Participa en el festival del pueblo y combate de nuevo contra Tilo. Recibe la Pulsera Z antes de continuar con el recorrido insular.",
      "Visita el laboratorio de Kukui, recibe la RotomDex y sigue a Lylia hacia la escuela. Allí vence a los tres primeros alumnos, al cuarto que espera en el patio y después a la profesora.",
      "Cuando Tauros permita pasar, entra en Ciudad Hauoli. Dirígete al embarcadero, resuelve el encuentro con el Team Skull y supera el combate de Liam.",
      "Continúa hacia la salida norte de Hauoli. La prueba de Liam se celebra en Cueva Sotobosque, por Ruta 2; su combate del embarcadero no sustituye al dominante."
    ],
    "check": "Inicial, Pulsera Z, RotomDex y salida hacia Ruta 2.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_1",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_2",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_3"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SUN",
      "MOON"
    ],
    "mission": "02",
    "location": "Ruta 2 → Cueva Sotobosque → Ruta 3 → Jardines → Lilii",
    "requires": [
      "Escuela y encuentro de Hauoli completados"
    ],
    "steps": [
      "Sube por Ruta 2 hasta la entrada de Cueva Sotobosque y habla con Liam. Durante la prueba no puedes capturar a sus Pokémon ni salir sin terminar.",
      "Examina las guaridas para vencer a los tres Pokémon de la prueba. Para el que cambia de escondite, sigue las guaridas hasta activar la intervención de los reclutas: al vencerlos bloquean dos salidas y permiten acorralarlo.",
      "Accede a la sala del dominante y examina el pedestal. Vence a Gumshoos dominante en Sol o Raticate de Alola dominante en Luna y recibe Normastal Z.",
      "Sal por el acceso que Liam despeja hacia Ruta 3. Entra en Jardines de Melemele y alcanza a Cosmog entre las flores para devolverlo a Lylia; después combate con Tilo.",
      "Completa el circuito de Ruta 3 y vuelve a Pueblo Lilii para la gran prueba de Kaudan. Prepara respuesta al tipo Lucha y vence su equipo para recibir Lizastal Z.",
      "Recibe la montura de Tauros y usa su embestida para rocas agrietadas. Para ir a Akala vuelve al embarcadero de Hauoli y embarca con Kukui y Tilo; Colina Dequilate es un desvío, no otra gran prueba."
    ],
    "check": "Primera gran prueba y Tauros; salida hacia Akala.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_4",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_5",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_6"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SUN",
      "MOON"
    ],
    "mission": "03",
    "location": "Kantai → Ohana → Colina Saltagua → Área Volcánica Wela → Jungla Umbría",
    "requires": [
      "Llegada a Akala"
    ],
    "steps": [
      "En Kantai completa el encuentro con Dexio y Sina y recibe el Arca de Zygarde. Sigue Ruta 4 hasta Ohana; después del combate con Tilo, entra en el rancho y recibe la montura de Stoutland de Lulú.",
      "Sube por Ruta 5 hasta Colina Saltagua. Nereida registra a Lapras para cruzar el agua: investiga las salpicaduras sucesivas hasta llegar a la guarida del dominante.",
      "Vence al Wishiwashi dominante de Sol/Luna y recibe Hidrostal Z. Revisa la MT55 Escaldar en la colina cuando puedas explorar libremente.",
      "Por Ruta 6 llega a Avenida Royale y participa en la presentación del Estadio Royale. Continúa por Ruta 7 hasta Área Volcánica Wela para la prueba de Kiawe.",
      "Compara las danzas: observa el cambio de Marowak, después al Montañero y finalmente al Pokémon que se incorpora. Resuelve los combates y vence al Salazzle dominante; recibe Pirostal Z y la montura de Charizard para viajar a lugares visitados.",
      "Cruza Ruta 8 hacia el acceso norte de Ruta 5 y entra en Jungla Umbría. Lulú pide cuatro ingredientes: Baya Ango, Miniseta, Hierba Revivir y Semilla Milagro.",
      "Usa Stoutland para localizar los ingredientes por los sectores de la jungla. Examina los puntos de la prueba, resuelve las emboscadas y utiliza Tauros en las rocas agrietadas del sector oriental para la Semilla Milagro.",
      "Vuelve a la entrada, participa en la preparación del plato y vence al Lurantis dominante. Recibe Fitostal Z y la MT67 Cuerno Certero de Kukui; el laboratorio de investigación dimensional es el siguiente destino.",
      "El orden de las pruebas de Akala es Nereida → Kiawe → Lulú. Los dominantes y los ingredientes de Ultra no se trasladan a estas ediciones."
    ],
    "check": "Tres pruebas de Akala y acceso a la preparación de la gran prueba.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_7",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_8",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_9",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_10"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SUN",
      "MOON"
    ],
    "mission": "04",
    "location": "Kantai → Túnel Diglett → Konikoni → Ruinas de la Vida → Hanohano → Paraíso Æther",
    "requires": [
      "Pruebas de Akala superadas"
    ],
    "steps": [
      "Vuelve al laboratorio de investigación dimensional de Kantai y sigue las escenas con Kukui y la profesora Pimpinela. Después entra en Túnel Diglett para cruzar hacia Ruta 9.",
      "Resuelve el encuentro del Team Skull en el túnel y llega a Konikoni. Entra en la joyería de Mayla: su Probopass entrega una carta que cambia el punto de reunión a las Ruinas de la Vida.",
      "Sal por Colina del Recuerdo y Afueras de Akala. Supera el encuentro con Francine y continúa hasta Mayla para la gran prueba de tipo Roca.",
      "Vence a Mayla y recibe Litostal Z y el reconocimiento de Akala. No hace falta vencer ni capturar a Tapu Lele para esta gran prueba.",
      "Acude al Resort Hanohano y acepta la invitación de Fabio. La visita inicial a Paraíso Æther sucede ahora, antes de llegar a Ula-Ula.",
      "Sigue la visita del santuario y el encuentro con la Ultracriatura. No es una captura de la operación del postgame. Tras las escenas recibe la MT29 Psíquico de Zyra y viaja con ella a Ula-Ula."
    ],
    "check": "Gran prueba de Mayla y primera visita a Æther; llegada a Malíe.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_11",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_12",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_13"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SUN",
      "MOON"
    ],
    "mission": "05",
    "location": "Malíe → Hokulani → Aldea Tapu → Pueblo Po → puerto de Malíe",
    "requires": [
      "Llegada a Ula-Ula"
    ],
    "steps": [
      "Ve al Parque de Malíe y encuentra a Kukui junto a la casa de té. Después toma Ruta 10 hasta la parada de autobús y sube al Monte Hokulani.",
      "En el observatorio completa el encuentro con Lario y comienza la prueba de Chris. Las respuestas de sonido son Centro Pokémon, RotomDex, Charjabug y Pokémon dominante; resuelve los combates entre preguntas.",
      "Vence al Vikavolt dominante. Levitación lo protege de ataques de tipo Tierra: prepara Fuego o Roca. Recibe Electrostal Z de Chris, Metalostal Z de Lario y la máscara que debes devolver a Kukui.",
      "Regresa al Parque de Malíe, entrega la máscara y completa el encuentro con Guzmán. Por Ruta 11 alcanza Ruta 12; Hela registra a Mudsdale para cruzar el terreno rocoso.",
      "Continúa por Ruta 13 hasta Aldea Tapu y visita la Casa Æther. Sigue a Zarala hacia Ruta 14 y el supermercado abandonado para su prueba Fantasma.",
      "Fotografía con el Pokévisor las apariciones de Gastly, Haunter y Gengar en las cajas, carro y muñecos que se mueven. Tras cada fotografía vence al Pokémon y sigue al Pikachu hacia el fondo.",
      "Fotografía a Mimikyu en la sala final y vence al dominante para recibir Espectrostal Z. La capitana es Zarala; Nereida pertenece a la prueba de Agua de Akala.",
      "Vuelve a la Casa Æther y resuelve la intervención del Team Skull. En Ruta 15 habla con Aza, responde a su moneda y recibe a Sharpedo; rompe las rocas del mar para seguir por Ruta 16, Jardines de Ula-Ula y Ruta 17.",
      "Entra en Pueblo Po y atraviesa la Mansión Misteriosa. Lee las notas y da las respuestas españolas Paliza, Golisopod, Skittolate y ¡Nanay! para alcanzar la habitación de Guzmán.",
      "Vence a Guzmán, recupera el Yungoos y vuelve a la Casa Æther. Lylia ha sido secuestrada; supera el combate con Gladio y reúnete con él en el puerto de Malíe.",
      "Antes de embarcar vence a Denio en la gran prueba de Ula-Ula y recibe Nictostal Z. Después parte con Gladio y Tilo hacia Paraíso Æther."
    ],
    "check": "Dos pruebas, rescate de Yungoos y gran prueba de Denio; viaje de rescate.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_14",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_15",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_16",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_17",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_18",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_19",
      "https://www.wikidex.net/wiki/Observatorio_de_Hokulani",
      "https://www.wikidex.net/wiki/Mansi%C3%B3n_Misteriosa"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SUN",
      "MOON"
    ],
    "mission": "06",
    "location": "Paraíso Æther: muelle → laboratorios → mansión de Samina",
    "requires": [
      "Gran prueba de Denio y viaje con Gladio"
    ],
    "steps": [
      "Desde el muelle cruza los empleados que bloquean el camino y usa el ascensor. Vence a Fabio para abrir la investigación de los laboratorios inferiores.",
      "Baja al segundo sótano. Supera a los investigadores del pasillo y entra en el laboratorio indicado; combate junto a Tilo y examina los documentos de la sala sobre Cosmog.",
      "Regresa a la planta de conservación. Supera los combates con Gladio y Tilo contra los empleados y Fabio para abrir el acceso a la mansión.",
      "Fuera de la mansión resuelve el combate con Guzmán. Dentro, sigue a Samina hasta la estancia de los Pokémon preservados y vence a su equipo.",
      "Completa la escena del Ultraumbral: Samina y Guzmán parten y Cosmog queda transformado. No se captura a Solgaleo/Lunala en esta visita.",
      "Después de las escenas recibe la Master Ball de Gladio y acompaña a Lylia al muelle. El barco a Poni sale de Paraíso Æther; la exploración del altar continúa allí."
    ],
    "check": "Rescate de Lylia, transformación de Cosmog y salida hacia Poni.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_20"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SUN",
      "MOON"
    ],
    "mission": "07",
    "location": "Aldea Marina → Ruinas del Tránsito → Isla Exeggutor → Cañón de Poni → altar",
    "requires": [
      "Trama de Æther resuelta"
    ],
    "steps": [
      "En Aldea Marina busca al jefe y continúa por Prado de Poni hacia Antiguo Paso de Poni. Habla con Hela; su abuela registra a Machamp para mover grandes bloques.",
      "Sigue por Costa de Poni hasta Ruinas del Tránsito. Usa Machamp para despejar el puzle de bloques y presencia la designación de Hela como kahuna.",
      "Vuelve a Aldea Marina y pide el viaje a Isla Exeggutor. Acompaña a Lylia hasta el pedestal del punto más alto: recoges la Flauta Solar en Sol o la Flauta Lunar en Luna; Lylia lleva la complementaria.",
      "Regresa al acceso a Cañón de Poni y supera la intervención de los reclutas y Francine. Vence a Hela antes de internarte en el cañón: en Sol/Luna esta gran prueba precede a la prueba del dragón.",
      "Recorre cuevas y puentes del cañón usando Tauros y Machamp en los obstáculos. La prueba sin capitán está en el tramo final: investiga el camino y vence al Kommo-o dominante para recibir Dracostal Z.",
      "Alcanza el altar y toca las dos flautas en los puntos indicados. Cosmog evoluciona y el legendario abre el acceso al Ultraespacio.",
      "Sigue a Lylia, encuentra a Guzmán y llega hasta Samina. Vence de nuevo al equipo de Samina, cuyos Pokémon tienen auras aumentadas; este desenlace no utiliza a Ultra-Necrozma.",
      "De vuelta al altar, Lylia pide que captures a Nebulilla: Solgaleo en Sol y Lunala en Luna. Guarda y prepara Poké Balls antes de interactuar con él.",
      "Tras resolver el episodio, regresa a Ula-Ula para Monte Lanakila. No hay una prueba obligatoria de Rika con Ribombee en estos juegos."
    ],
    "check": "Gran prueba de Hela, Dracostal Z y episodio de Samina/legendario.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_21",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_22",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_23",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_24"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SUN",
      "MOON"
    ],
    "mission": "08",
    "location": "Monte Lanakila → Liga Pokémon → Kukui",
    "requires": [
      "Episodio del altar y cuatro grandes pruebas resueltos"
    ],
    "steps": [
      "Viaja a Aldea Tapu y acércate al ascensor del Monte Lanakila. Supera el combate contra Gladio antes de iniciar la subida.",
      "Sube por el monte y sus cuevas hasta el Centro Pokémon de la cima. Prepara curación de estados, PP y un equipo con cobertura para cinco combates de Liga.",
      "Entra en la Liga y vence, en el orden que prefieras, a Kaudan (Lucha), Mayla (Roca), Zarala (Fantasma) y Kahili (Volador). No podrás usar el Centro Pokémon entre sus salas.",
      "Tras vencer a los cuatro, accede a la cámara central y toma el puesto de campeón. Kukui plantea el combate final por el primer título; conserva recursos para su equipo completo.",
      "Vence a Kukui y sigue la celebración. Durante el cierre visita con Lylia las Ruinas de la Guerra para el encuentro con Tapu Koko; el registro de Liga no acredita por sí solo su captura.",
      "Después de los créditos comienza la investigación de Handsome y Destra, además de las visitas a otros guardianes. Las defensas del título pertenecen a visitas posteriores a la Liga."
    ],
    "check": "Primer título registrado y acceso al postgame.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_25",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_26",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_27",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Sun_and_Moon/Part_28"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ULTRASUN",
      "ULTRAMOON"
    ],
    "mission": "01",
    "location": "Ruta 1 → Pueblo Lilii → Senda Mahalo → escuela → Hauoli",
    "requires": [],
    "steps": [
      "Sal de casa y entra en Ruta 1. Los tres iniciales te protegen de un Yungoos: elige Rowlet, Litten o Popplio con Kukui y vence a Tilo antes de entrar en Pueblo Lilii.",
      "En el pueblo busca a Kaudan por Senda Mahalo, ayuda a Lylia y Cosmog en el puente y recoge la piedra de Tapu Koko. Aquí el inicial ya está contigo, a diferencia de Sol/Luna.",
      "Regresa a casa y, al día siguiente, participa en el festival de Lilii. Recibe la Superpulsera Z tras combatir con Tilo.",
      "Visita el laboratorio de Kukui para la RotomDex y continúa hacia la escuela con Lylia. Vence a los cuatro alumnos y a la profesora; ella usa el inicial con ventaja frente al tuyo.",
      "Avanza a Hauoli, sigue las escenas de Liam y el Team Skull y recorre la zona comercial hasta la salida hacia Ruta 2.",
      "Las pegatinas dominantes que Liam presenta son una colección de Ultra; no sustituyen a las pruebas ni a los cristales Z."
    ],
    "check": "Inicial, Superpulsera Z y ruta hacia la primera prueba.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_1",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_2"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ULTRASUN",
      "ULTRAMOON"
    ],
    "mission": "02",
    "location": "Ruta 2 → Playa Big Wave → Cueva Sotobosque → Ruta 3 → Lilii",
    "requires": [
      "Acceso norte de Hauoli"
    ],
    "steps": [
      "Recorre Ruta 2 y resuelve el encuentro del Team Skull en Playa Big Wave. Sigue hasta la Cueva Sotobosque y habla con Liam para iniciar su prueba.",
      "Vence a los tres Pokémon de las guaridas. Cuando uno cambie de escondite, persíguelo hasta activar a los reclutas y vencerlos: sus posiciones bloquean salidas y permiten alcanzarlo.",
      "Accede al pedestal y vence a Gumshoos dominante en Ultrasol o Raticate de Alola dominante en Ultraluna. Recibe Normastal Z y continúa por Ruta 3.",
      "Sigue a Cosmog por Jardines de Melemele hasta el pasaje de Gruta Unemar. Completa el encuentro con la Unidad Ultra y vuelve con Lylia; después prosigue el circuito de Ruta 3.",
      "Regresa a Pueblo Lilii y vence a Kaudan en la gran prueba de Lucha. Recibe Lizastal Z y a Tauros para romper rocas agrietadas.",
      "Visita el Fotoclub de Alola en Hauoli y después ve a Playa Big Wave, al oeste de Ruta 2. Habla con el encargado y cruza a Akala mediante el Surf de Mantine."
    ],
    "check": "Gran prueba, Tauros y acceso a Akala mediante Mantine.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_3",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_4",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_5"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ULTRASUN",
      "ULTRAMOON"
    ],
    "mission": "03",
    "location": "Kantai → Ohana → Colina Saltagua → Wela → Jungla Umbría",
    "requires": [
      "Llegada a Akala"
    ],
    "steps": [
      "En Kantai combate con Dexio en Ultrasol o Sina en Ultraluna y sigue Ruta 4 hasta Ohana. Resuelve el encuentro con Tilo y recibe a Stoutland en el rancho para buscar objetos.",
      "Ve por Ruta 5 a Colina Saltagua. Nereida registra a Lapras y pide reunir a los Wishiwashi: examina las salpicaduras y vence a los Wishiwashi necesarios para que avancen hacia la guarida.",
      "Vence al Araquanid dominante y recibe Hidrostal Z. El dominante de estas ediciones no es el Wishiwashi de Sol/Luna.",
      "Por Ruta 6 accede a Avenida Royale, participa en la presentación del Estadio Royale y sigue Ruta 7 hasta Área Volcánica Wela.",
      "Resuelve las diferencias de las danzas de Kiawe y sus combates. El enfrentamiento final es contra Marowak de Alola dominante, con Salazzle de apoyo. Recibe Pirostal Z y la montura de Charizard.",
      "Sigue el Túnel Divisorio y Ruta 8 hasta Jungla Umbría. Lulú guía la búsqueda de Baya Ango, Miel y Raíz Grande, un sector cada vez; no se usan los cuatro ingredientes de Sol/Luna.",
      "Examina los puntos de los ingredientes y resuelve las emboscadas que provoque tu elección. En el sector oriental distingue los árboles de los Sudowoodo para la raíz.",
      "Vuelve con Lulú y vence al Lurantis dominante tras preparar el plato. Recibe Fitostal Z y la MT67 Cuerno Certero de Kukui; después vuelve al laboratorio de investigación dimensional de Kantai."
    ],
    "check": "Pruebas de Nereida, Kiawe y Lulú de las versiones Ultra.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_7",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_8",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_9",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_10"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ULTRASUN",
      "ULTRAMOON"
    ],
    "mission": "04",
    "location": "Laboratorio dimensional → Konikoni → Ruinas de la Vida → Hanohano → Æther",
    "requires": [
      "Pruebas de Akala completadas"
    ],
    "steps": [
      "Visita el laboratorio de investigación dimensional y sigue la escena con Kukui y Pimpinela. Cruza Túnel Diglett hasta Ruta 9, resolviendo el encuentro del Team Skull.",
      "Entra en la joyería de Mayla en Konikoni. Lee la carta de su Probopass: la reunión es en Ruinas de la Vida, más allá de Colina del Recuerdo y Afueras de Akala.",
      "Supera el encuentro con Francine y vence a Mayla en la gran prueba de Roca. Recibe Litostal Z antes de ir al Resort Hanohano.",
      "En Hanohano acepta la visita a Paraíso Æther que propone Fabio. Sigue el recorrido del santuario, el encuentro con la Ultracriatura y las explicaciones de Samina y la Unidad Ultra.",
      "Recibe la MT29 Psíquico de Zyra y embarca hacia Ula-Ula. La visita de rescate a los laboratorios de Æther ocurre más adelante y no se da por concluida aquí."
    ],
    "check": "Gran prueba de Akala y primera visita de Æther.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_11",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_12",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_13",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_14"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ULTRASUN",
      "ULTRAMOON"
    ],
    "mission": "05",
    "location": "Malíe → Hokulani → Aldea Tapu → Pueblo Po → gran prueba de Denio",
    "requires": [
      "Llegada a Ula-Ula"
    ],
    "steps": [
      "Vence a Tilo al llegar y recibe Lycanrostal Z. Busca a Kukui en Parque de Malíe y continúa por Ruta 10 hasta el autobús que sube a Hokulani.",
      "En el observatorio ayuda a reunir los Charjabug y usa el mecanismo de paneles giratorios para alinearlos de tres en tres. Supera las rondas con Elekid y Electabuzz antes del dominante.",
      "Vence al Togedemaru dominante y recibe Electrostal Z y la máscara de Kukui. La prueba de sonidos y Vikavolt corresponden a Sol/Luna; aquí los paneles giran en sentido antihorario.",
      "Vuelve al Parque de Malíe, entrega la máscara y vence a Guzmán. Continúa por Ruta 11 y recoge la montura de Mudsdale de Hela en Ruta 12 para atravesar el terreno rocoso.",
      "Por Ruta 13 llega a Aldea Tapu y la Casa Æther. Zarala dirige la prueba de Ruta 14, en el supermercado abandonado; fotografía los Pokémon de los fenómenos y supera sus combates.",
      "Sigue las apariciones hasta la sala de Mimikyu y fotografía al dominante para combatir. Su Disfraz absorbe el primer impacto: prepara otro ataque después de romperlo y recibe Espectrostal Z al vencer.",
      "Regresa a la Casa Æther y resuelve la visita del Team Skull. En Ruta 15 recibe a Sharpedo de Aza para cruzar las rocas del mar; sigue Ruta 16, Jardines de Ula-Ula y Ruta 17 hasta Pueblo Po.",
      "En Mansión Misteriosa examina las notas y responde Paliza, Golisopod, Skittolate y ¡Nanay! al guardia. Alcanza a Guzmán, vence su equipo y recupera al Yungoos.",
      "Vuelve a la Casa Æther y sigue el rescate de Lylia con Gladio. Reúnete con él y Tilo en Malíe; antes de partir hacia Paraíso Æther, vence a Denio y recibe Nictostal Z."
    ],
    "check": "Pruebas de Chris/Zarala, rescate y gran prueba de Denio.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_15",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_16",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_17",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_18",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_19",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_20",
      "https://www.serebii.net/ultrasunultramoon/teamskull.shtml",
      "https://www.wikidex.net/wiki/Mansi%C3%B3n_Misteriosa"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ULTRASUN",
      "ULTRAMOON"
    ],
    "mission": "06",
    "location": "Paraíso Æther: laboratorios → Fabio → Guzmán → Samina",
    "requires": [
      "Gran prueba de Denio"
    ],
    "steps": [
      "Avanza por el muelle de Æther y usa el ascensor. Vence a Fabio y baja a los laboratorios secretos del segundo sótano.",
      "Supera a los investigadores, entra en los laboratorios y revisa los documentos junto a Tilo y Gladio. Regresa por el ascensor cuando termine la investigación.",
      "Abre camino con tus compañeros a través de los empleados y Fabio. Continúa al exterior y vence a Guzmán para alcanzar la mansión de Samina.",
      "Vence a Samina y completa la escena de Cosmog y el Ultraumbral. La Unidad Ultra explica la amenaza de Necrozma y cómo puede ayudar el legendario de Alola.",
      "Tras pasar la noche recibe la Master Ball de Gladio y viaja desde el muelle con Lylia a Poni. Este combate no reemplaza el episodio de Necrozma ni implica que ya capturaste al legendario."
    ],
    "check": "Laboratorios y mansión resueltos; viaje a Poni con Master Ball.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_21"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ULTRASUN",
      "ULTRAMOON"
    ],
    "mission": "07",
    "location": "Poni → altar → Ultrópolis → prueba de Rika → gran prueba de Hela",
    "requires": [
      "Rescate de Æther y llegada a Poni"
    ],
    "steps": [
      "En Aldea Marina habla con el jefe y recorre Prado de Poni hasta Antiguo Paso. Habla con Hela y su abuela para registrar a Machamp y mover grandes bloques.",
      "Ve por Costa de Poni a Ruinas del Tránsito, despeja los bloques y presencia la designación de Hela. Regresa al barco de Aldea Marina para viajar a Isla Exeggutor.",
      "Ayuda a los Exeggutor y sube hasta el pedestal para recoger la Flauta Solar en Ultrasol o la Flauta Lunar en Ultraluna. Lylia lleva la otra; vuelve al acceso de Cañón de Poni.",
      "Supera a los reclutas y continúa por el cañón con Tauros y Machamp. En la prueba sin capitán vence al Kommo-o dominante y recoge Dracostal Z. Hela todavía no celebra su gran prueba aquí.",
      "Toca las dos flautas en el altar. Resuelve el combate contra Necrozma fusionado: Melena Crepuscular en Ultrasol o Alas del Alba en Ultraluna. Esa forma no se puede capturar en este encuentro.",
      "Acepta la montura de la Unidad Ultra y entra por un Ultraumbral blanco para llegar a Ultrópolis. En esta primera travesía los blancos conducen a la ciudad de la historia.",
      "Sube a la Torre Megalo y vence a Ultra-Necrozma de nivel 60. No se captura ni permite huir: prepara el equipo antes de subir y ten en cuenta su aura, velocidad y ataques Psíquico, Dragón, Acero y Roca.",
      "Tras restaurar la luz puedes recibir a Poipole. Vuelve a Aldea Marina para la prueba de Rika; el combate contra Ultra-Necrozma no completa todavía todas las pruebas de Poni.",
      "En el barco con forma de Whiscash vence a Rika y recibe el Pétalo Rosa. Ve al Cementerio de Hauoli, vence a Liam y recoge el Pétalo Naranja.",
      "En Jungla Umbría vence a Lulú en Ultrasol o Nereida en Ultraluna: allí recibes los pétalos Verde y Azul. En Wela vence a Kiawe y al Montañero para el Rojo.",
      "En Hokulani consigue el Amarillo de Chris; solo combate en Ultrasol. En Casa Æther Denio entrega el Violeta en lugar de Zarala; solo combate en Ultraluna.",
      "Vuelve a Rika con los siete pétalos para la Flor Irisada y vence al Ribombee dominante. Recibe Feeristal Z antes de viajar de nuevo a Isla Exeggutor.",
      "Vence a Hela en la gran prueba de Tierra de Isla Exeggutor y recibe Geostal Z. Solo después de esta secuencia continúa la ruta hacia Monte Lanakila."
    ],
    "check": "Necrozma, prueba de Rika y gran prueba de Hela diferenciados.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_22",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_23",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_24",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_25",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_26",
      "https://www.serebii.net/ultrasunultramoon/legendary.shtml",
      "https://www.serebii.net/ultrasunultramoon/islandtrials.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ULTRASUN",
      "ULTRAMOON"
    ],
    "mission": "08",
    "location": "Monte Lanakila → Necrozma → Liga Pokémon → Tilo",
    "requires": [
      "Prueba de Rika y gran prueba de Hela superadas"
    ],
    "steps": [
      "Viaja a Aldea Tapu, supera el encuentro con Gladio y sube por Monte Lanakila. Explora el camino del monte antes de entrar en la Liga.",
      "Encuentra al Necrozma debilitado en el recorrido del monte y habla con él para el combate de captura. No se captura en su forma Ultra de la torre; Acromo entrega Necrosol y Necroluna después de este encuentro.",
      "Alcanza el Centro Pokémon de la cima y prepara curación de estados, PP y cobertura para cinco combates. Entra en la Liga cuando el equipo esté listo.",
      "Vence en cualquier orden a Lario (Acero), Mayla (Roca), Zarala (Fantasma) y Kahili (Volador). Lario ocupa la plaza que Kaudan tiene en la Liga de Sol/Luna.",
      "Tras los cuatro combates entra en la cámara central y vence a Tilo para obtener el primer título de Campeón. El combate de Kukui del desenlace original no ocupa este lugar.",
      "Tras el combate con Gladio del monte, puedes volver a Senda Mahalo para el encuentro con Lylia y Solgaleo/Lunala; no exige terminar la Liga. Después de los créditos revisa las nuevas zonas de Poni y el Episodio RR. Las visitas posteriores a la Liga son defensas del título y no se suman como otra primera conquista."
    ],
    "check": "Primer título y apertura del postgame Ultra.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_27",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Ultra_Sun_and_Ultra_Moon/Part_28",
      "https://www.serebii.net/ultrasunultramoon/legendary.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  }
];
 if(typeof module==='object'&&module.exports)module.exports=routes;else root.PokemonAlolaRoutes=routes;
})(globalThis);
