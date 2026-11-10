/* Unova originals and sequels have separate chronology and field-move gifts. */
(function(root){
 'use strict';
 const routes=[
  {
    "games": [
      "BLACK",
      "WHITE"
    ],
    "mission": "01",
    "location": "Pueblo Arcilla → Terracota → Ruta 2 → Ciudad Gres",
    "requires": [],
    "steps": [
      "Abre el regalo de Encina en tu habitación de Pueblo Arcilla y elige Snivy, Tepig u Oshawott. Completa los primeros combates con Bel y Cheren, baja para hablar con tu madre y visita a Bel en su casa antes de ir al laboratorio.",
      "En el laboratorio acepta la Pokédex de Encina. Recibe el Mapa de tu madre y ve a Ruta 1 para la demostración de captura y las Poké Balls; sigue hasta Pueblo Terracota.",
      "Aprende el uso del Centro Pokémon, atiende el discurso de Ghechis en la plaza y supera el primer combate con N. Después sal al oeste hacia Ruta 2; tu madre entrega las Deportivas.",
      "Continúa hacia Ciudad Gres y supera el combate con Bel de la ruta. Busca a Cheren en la Escuela de Entrenadores y resuelve su combate antes de dirigirte al gimnasio.",
      "Puedes visitar el exterior del Solar de los Sueños para recibir el mono elemental que ayuda contra el líder correspondiente a tu inicial. El líder de Gres cambia según tu elección: no se combaten los tres hermanos para obtener la medalla.",
      "En el gimnasio pisa el símbolo que vence al tipo mostrado en cada cortina para abrir el camino. Vence al hermano que te corresponde y recibe Medalla Trío y MT83 Avivar."
    ],
    "check": "Pokédex y primera medalla; encuentro con Oryza disponible.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_and_White/Part_1",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_and_White/Part_2"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK",
      "WHITE"
    ],
    "mission": "02",
    "location": "Solar de los Sueños → Ruta 3 → Cueva Manantial → Ciudad Esmalte",
    "requires": [
      "Medalla Trío"
    ],
    "steps": [
      "Conoce a Oryza al salir del gimnasio y recibe MO01 Corte en su laboratorio de Gres. Vuelve al Solar de los Sueños, corta el árbol y ayuda a Bel a proteger a Munna de los dos reclutas Plasma.",
      "Completa la aparición de Musharna y vuelve al laboratorio de Oryza para recibir el C-Gear y las entregas de esta introducción. La misión de la Niebla Onírica se resuelve dentro del juego; sus funciones de red son contenido separado.",
      "Sigue Ruta 3 por la zona de la Guardería y supera el combate con Cheren. Cuando el Equipo Plasma huya con un Pokémon robado, ve con Cheren a Cueva Manantial y completa los combates para recuperarlo.",
      "Continúa por Ruta 3 hasta Ciudad Esmalte y supera el encuentro con N ante el museo. Entra en el museo y ve al gimnasio de Aloe situado en su interior.",
      "Resuelve las pistas de las estanterías leyendo los libros indicados y hablando con la entrenadora que bloquea el acceso final. Baja por la escalera que aparece y derrota a Aloe para recibir Medalla Base y MT67 Represalia."
    ],
    "check": "Segunda medalla y rescate de Munna; museo de Esmalte preparado para la siguiente escena.",
    "pitfalls": [
      "No tomes el paso hacia Puente Saeta desde Ciudad Gres: primero se completa Esmalte y el incidente del bosque."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_and_White/Part_2",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_and_White/Part_3",
      "https://www.serebii.net/blackwhite/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK",
      "WHITE"
    ],
    "mission": "03",
    "location": "Bosque Azulejo → Puente Saeta → Porcelana → Camus",
    "requires": [
      "Medalla Base e incidente del museo"
    ],
    "steps": [
      "Tras el robo de la calavera en el museo de Esmalte, sigue a Camus hacia Bosque Azulejo. Entra en la zona interior del bosque y persigue a los Plasma hasta recuperar la pieza; la zona exterior de entrenamiento no resuelve ese encargo.",
      "Completa la devolución a Aloe y continúa al norte por el bosque hasta Puente Saeta. Cruza el puente para llegar a Ciudad Porcelana.",
      "Busca a Camus y acude al muelle para reunirte con Bel e Iris por el robo de Munna. Sigue a Camus hasta el edificio situado frente al gimnasio y ayuda a expulsar al Equipo Plasma.",
      "Ve al gimnasio de Camus y atraviesa las paredes de miel, utilizando los interruptores que despejan los pasos. Véncelo para recibir la Medalla Élitro y MT76 Estoicismo.",
      "Atiende el desafío de Bel y ve a la salida norte de Porcelana para combatir. Continúa por Ruta 4, donde Cheren también comprueba tus avances, antes de ir hacia Mayólica."
    ],
    "check": "Tercera medalla y Munna de Bel recuperada; salida por Ruta 4.",
    "pitfalls": [
      "Las Cloacas Porcelana de Negro 2/Blanco 2 no son la ruta de este encargo original."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_and_White/Part_4",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_and_White/Part_5"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK",
      "WHITE"
    ],
    "mission": "04",
    "location": "Ruta 4 → Zona Desierto → Ciudad Mayólica → Camila",
    "requires": [
      "Medalla Élitro"
    ],
    "steps": [
      "Sigue la vía de Ruta 4 hacia el norte hasta Ciudad Mayólica. El desvío occidental lleva a Zona Desierto y Castillo Ancestral; no es necesario descender todo el castillo para acceder a Mayólica.",
      "En la primera visita al castillo puedes elegir entre los fósiles Tapa y Pluma para sus respectivas especies. Conserva la elección y llévala al museo de Esmalte para revivirla; la otra especie puede requerir intercambio.",
      "Al entrar en Mayólica ayuda al hombre de la Guardería frente a los Plasma para recibir la Bicicleta. Visita el edificio del Musical durante la escena de Bel y completa la conversación con su padre y Camila.",
      "En el recinto de atracciones encuentra a N, sube a la noria durante la escena y supera su combate. Después entra en el gimnasio de Camila, que en estos originales utiliza vagonetas y cambios de vía.",
      "Vence a Camila y recibe Medalla Voltio y MT72 Voltiocambio. Revisa MO04 Fuerza en la casa del noroeste de Mayólica antes de tomar Ruta 5 hacia el oeste."
    ],
    "check": "Cuarta medalla, Bicicleta y ubicación de Fuerza revisadas.",
    "pitfalls": [
      "El gimnasio de pasarela de las secuelas no sustituye al recorrido de vagonetas de Negro/Blanco."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_and_White/Part_5",
      "https://www.serebii.net/blackwhite/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK",
      "WHITE"
    ],
    "mission": "05",
    "location": "Ruta 5 → Puente Fayenza → Almacenes Frigoríficos → Yakón",
    "requires": [
      "Medalla Voltio"
    ],
    "steps": [
      "Ve al oeste por Ruta 5, supera el encuentro con Cheren y completa la presentación de Mirto. Camila facilita la bajada del Puente Fayenza; crúzalo hasta la ciudad.",
      "Yakón exige resolver la presencia del Equipo Plasma en los Almacenes Frigoríficos, al sur de Fayenza. Recorre el hielo del almacén para llegar al contenedor donde se esconden y participa en la captura de los reclutas.",
      "Después de la intervención de Ghechis vuelve al gimnasio. Utiliza los ascensores para bajar por sus niveles y alcanza a Yakón en la plataforma del fondo.",
      "Derrota a Yakón y recibe la Medalla Temblor. Su entrega de MT78 Terratemblor se completa en la entrada de Cueva Electrorroca, cuando retire el obstáculo.",
      "Al salir hacia Ruta 6 supera el combate con Bel y recibe MO02 Vuelo. Enséñala para volver a las ciudades visitadas y continúa hacia Cueva Electrorroca."
    ],
    "check": "Quinta medalla, acceso a la cueva y Vuelo recibido.",
    "pitfalls": [
      "El torneo inicial del PWT pertenece a Negro 2/Blanco 2; no bloquea esta salida de Fayenza en los originales."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_and_White/Part_6",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_and_White/Part_7",
      "https://www.serebii.net/blackwhite/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK",
      "WHITE"
    ],
    "mission": "06",
    "location": "Ruta 6 → Cueva Electrorroca → Loza → Torre de los Cielos",
    "requires": [
      "Medalla Temblor"
    ],
    "steps": [
      "Cruza Ruta 6 y reúnete con Yakón en la entrada de Cueva Electrorroca para que retire la telaraña y entregue MT78 Terratemblor si aún no la recibiste.",
      "Dentro de la cueva mueve las piedras pequeñas hacia las rocas eléctricas grandes para despejar el paso. Habla con Encina y Bel cerca del comienzo y recibe el Huevo Suerte.",
      "Avanza por los puentes y sótanos de la cueva hasta superar el encuentro con N próximo a la salida. Llega a Ciudad Loza y habla con Gerania para conocer su visita a Torre de los Cielos.",
      "Sube por Ruta 7 hasta la torre, recorre sus plantas y toca la campana de la cima tras hablar con Gerania. Regresa a Loza para desafiar su gimnasio.",
      "Utiliza los cañones del gimnasio para recorrer sus plataformas y llegar a Gerania. Véncela para recibir Medalla Jet y MT62 Acróbata; después vuelve a Ruta 7 hacia la entrada de Monte Tuerca."
    ],
    "check": "Sexta medalla, campana y Huevo Suerte; continuación a Monte Tuerca.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_and_White/Part_7"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK",
      "WHITE"
    ],
    "mission": "07",
    "location": "Monte Tuerca → Ciudad Teja → Junco → Torre Duodraco",
    "requires": [
      "Medalla Jet"
    ],
    "steps": [
      "Ve a la entrada de Monte Tuerca desde Ruta 7 y supera el combate con Cheren. Tras la conversación con Mirto recibe MO03 Surf, que abre nuevos desvíos de exploración.",
      "Atraviesa Monte Tuerca hasta Ciudad Teja; su aspecto y algunos caminos laterales cambian con la estación. El objetivo de historia está en la salida hacia la ciudad, no en agotar todos los desvíos de invierno.",
      "Entra en el gimnasio de Junco y usa los tramos de hielo y mecanismos de giro para llegar al líder. Recibe Medalla Estalactita y MT79 Vaho Gélido al vencer.",
      "Ve al norte hacia Torre Duodraco cuando se produzca la invasión Plasma. Sube por sus plataformas rotas y plantas interiores, superando los reclutas que bloquean el paso.",
      "En la cima presencia cómo N despierta a su dragón y habla con los personajes que investigan la leyenda. El siguiente destino de la trama es Castillo Ancestral en Zona Desierto; el dragón de tu edición se resuelve más adelante."
    ],
    "check": "Séptima medalla, Surf y escena de Torre Duodraco.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_and_White/Part_9",
      "https://www.serebii.net/blackwhite/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK",
      "WHITE"
    ],
    "mission": "08",
    "location": "Castillo Ancestral → museo de Esmalte → Ciudad Caolín",
    "requires": [
      "Escena de Torre Duodraco"
    ],
    "steps": [
      "Regresa a Zona Desierto y desciende por Castillo Ancestral siguiendo las zonas de arenas movedizas hacia los sótanos. Reúnete al fondo con Mirto, Cheren y Ghechis; la búsqueda del orbe continúa fuera del castillo.",
      "Atiende la llamada de Encina y vuelve al museo de Esmalte. Aloe entrega el Orbe Claro en Negro o el Orbe Oscuro en Blanco; no esperes conseguirlo derrotando más reclutas dentro del castillo.",
      "Continúa desde Teja por Ruta 8 y Puente Axial hacia Ruta 9 y Ciudad Caolín. Completa las conversaciones sobre la leyenda del dragón antes de ir al gimnasio.",
      "Recorre el gimnasio activando los mecanismos de sus dragones. En Negro el líder es Lirio; en Blanco es Iris. Vence al líder de tu edición para recibir Medalla Leyenda y MT82 Cola Dragón.",
      "Al salir atiende a Encina para recibir la Master Ball cerca de la salida norte. Con ocho medallas puedes entrar en Ruta 10 y preparar el acceso a Calle Victoria."
    ],
    "check": "Ocho medallas, orbe de edición y Master Ball revisados.",
    "pitfalls": [
      "La ciudad de Caolín cambia de aspecto según edición, pero no se cambia el orden de la misión ni se traslada la Liga de las secuelas a este desenlace."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_and_White/Part_10",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_and_White/Part_11"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK",
      "WHITE"
    ],
    "mission": "09",
    "location": "Ruta 10 → Calle Victoria → Alto Mando → castillo de N",
    "requires": [
      "Ocho medallas y orbe de edición"
    ],
    "steps": [
      "Avanza por Ruta 10, supera el combate con Cheren y cruza los controles de las ocho medallas. Atraviesa Calle Victoria alternando cuevas y laderas hasta la Liga Pokémon.",
      "Prepara curación y supera a Anís, Lotto, Catleya y Aza en el orden que elijas. Utiliza la estatua central para continuar hacia Mirto; en esta primera visita N interrumpe el desenlace y emerge su castillo.",
      "Entra en el castillo y usa sus habitaciones para curarte y revisar el equipo. Prepara Poké Balls y espacio en las cajas antes de acercarte a N y al dragón.",
      "En Negro se despierta Reshiram del Orbe Claro; en Blanco, Zekrom del Orbe Oscuro. Resuelve su encuentro y prepara el combate contra N con el equipo elegido.",
      "Tras derrotar a N afronta a Ghechis y completa el desenlace y los créditos. No se registra aquí una victoria contra Mirto: su combate por el título queda para la Liga del postgame."
    ],
    "check": "Desenlace de N/Ghechis resuelto; Mirto pendiente como objetivo de postgame.",
    "pitfalls": [
      "Capturar por intercambio al dragón no acredita la escena de este castillo. Mantén separado el primer final de la revancha de Liga contra Mirto."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_and_White/Part_11",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_and_White/Part_12"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK2",
      "WHITE2"
    ],
    "mission": "01",
    "location": "Ciudad Engobe → Pueblo Ocre → Rancho Ocre → gimnasio de Cheren",
    "requires": [],
    "steps": [
      "Habla con tu madre en Engobe y busca a Bel en el mirador del norte. Elige tu inicial, recibe la Pokédex y supera el primer combate con tu rival; continúa con la introducción del Centro Pokémon.",
      "Sal por Ruta 19 con las Poké Balls y las Deportivas y sigue a Mirto hasta Pueblo Ocre. Para entregar el segundo Mapa a tu rival, cruza Ruta 20 hasta Rancho Ocre.",
      "Encuentra al rival en el rancho y ayúdalo a buscar al Herdier desaparecido. Recorre el sector norte hasta el recluta Plasma y resuelve el rescate antes de regresar a Ocre.",
      "Completa el entrenamiento de la casa de Mirto y la presentación del Señor Insignio. Recibir la Caja Medallas inicia el medallero; no significa haber recibido sus 255 reconocimientos.",
      "Regresa a Engobe y entra en el gimnasio situado detrás de la Escuela de Entrenadores. Supera sus combates obligatorios y vence a Cheren para obtener Medalla Base y MT83 Avivar.",
      "Al salir recibe las entregas de Bel, incluida MT27 Retroceso y el C-Gear. Retoma Ruta 20 hacia el este para llegar a Ciudad Hormigón."
    ],
    "check": "Primera medalla y salida hacia Hormigón.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_1",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_2"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK2",
      "WHITE2"
    ],
    "mission": "02",
    "location": "Ciudad Hormigón → Hiedra → Pokéwood → barco a Porcelana",
    "requires": [
      "Medalla Base"
    ],
    "steps": [
      "En Hormigón entra en el gimnasio musical y derrota a los dos miembros de la banda para poder desafiar a Hiedra. Gana la Medalla Ponzoña y MT09 Cargatóxica.",
      "Ve a Pokéwood y completa el rodaje introductorio siguiendo el guion que ofrece el juego; estrena la película para resolver la introducción. El resto del catálogo de películas es un objetivo posterior.",
      "Regresa al muelle y ayuda a Hiedra y al rival en el enfrentamiento con Plasma. Hiedra entrega MO01 Corte durante esta secuencia: no procede del laboratorio de Oryza de los juegos originales.",
      "Persigue a la recluta que huye a Ruta 20 y búscala en el pequeño claro del sector sur. Resuelve el combate y vuelve al muelle de Hormigón.",
      "Con el incidente y el estreno resueltos, habla con el capitán para embarcar hacia Ciudad Porcelana. Si no zarpa, revisa ambos pasos antes de buscar otra ruta terrestre."
    ],
    "check": "Acceso en barco a Porcelana y Corte recibido.",
    "pitfalls": [
      "El estreno introductorio no acredita completar Pokéwood ni sus reconocimientos."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_3",
      "https://www.serebii.net/black2white2/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK2",
      "WHITE2"
    ],
    "mission": "03",
    "location": "Ciudad Porcelana → cloacas → Camus",
    "requires": [
      "Llegada desde Hormigón"
    ],
    "steps": [
      "Busca al rival y sigue la investigación hacia las Cloacas Porcelana desde el muelle. Entra acompañado por él y avanza por el recorrido principal hacia el oeste y las escaleras del norte.",
      "Derrota a los dos reclutas Plasma junto al rival. Completa la aparición de Camus y Acromo; el rival te entrega MO04 Fuerza después de este enfrentamiento.",
      "Las escaleras al sur de esta zona conducen al parque interior de Porcelana, útil para buscar especies como Eevee. El agua estacional cambia accesos laterales de las cloacas, pero no convierte todos los desvíos en requisitos de la medalla.",
      "Vuelve al gimnasio de Camus y usa los capullos y sus conexiones para ascender hasta el líder. Obtén Medalla Élitro y MT76 Estoicismo.",
      "Sal al norte por Ruta 4, atiende el encuentro de Acromo y continúa hacia la avenida que conecta con Mayólica."
    ],
    "check": "Tercera medalla y Fuerza; salida norte despejada.",
    "pitfalls": [
      "Las paredes de miel pertenecen al gimnasio de los originales; aquí se avanza mediante capullos."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_4",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_5",
      "https://www.serebii.net/black2white2/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK2",
      "WHITE2"
    ],
    "mission": "04",
    "location": "Ruta 4 → Galería Unión → Mayólica → Camila",
    "requires": [
      "Medalla Élitro"
    ],
    "steps": [
      "Recorre Ruta 4 y completa el encuentro con Acromo que despeja los Crustle del paso. Puedes desviarte a Zona Desierto y Castillo Ancestral antes de seguir al norte.",
      "Entra en Galería Unión y completa la presentación de su gestión; luego continúa hasta Ciudad Mayólica. Sus comercios y crecimiento son un sistema propio que se revisa por separado.",
      "En el recinto de atracciones busca a Camila en el nuevo gimnasio de pasarela. Sigue la pasarela y sus combates obligatorios hasta la líder para conseguir Medalla Voltio y MT72 Voltiocambio.",
      "Para continuar la historia toma la salida occidental hacia Ruta 5. El edificio de vagonetas corresponde al antiguo gimnasio: no busques allí el combate de Camila de esta edición."
    ],
    "check": "Cuarta medalla y salida occidental hacia Ruta 5.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_5",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_6"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK2",
      "WHITE2"
    ],
    "mission": "05",
    "location": "Ruta 5 → Fayenza → Yakón → PWT → primera Fragata",
    "requires": [
      "Medalla Voltio"
    ],
    "steps": [
      "En Ruta 5 encuentra a Bel para recibir MO02 Vuelo y la demostración del Claro Oculto. Cruza Puente Fayenza para llegar a la ciudad.",
      "Visita el grupo del antiguo Equipo Plasma y completa el encuentro que permite recibir el Zorua de N si tienes espacio. Este regalo no exige haber enlazado un guardado de Negro/Blanco.",
      "En el gimnasio de Yakón avanza por las cintas transportadoras y plataformas oscuras hasta el líder. Gana Medalla Temblor y MT78 Terratemblor.",
      "Sigue a Yakón hasta el Pokémon World Tournament al sur. Completa el torneo introductorio de Fayenza ganando sus tres rondas, contra el rival, Cheren y Acromo.",
      "Después del torneo ve al muelle con Cheren y el rival y sube a la Fragata Plasma. Resuelve los combates de esta primera incursión hasta que el grupo sea expulsado; entonces continúa hacia Ruta 6."
    ],
    "check": "Quinta medalla, Vuelo y torneo introductorio; primera incursión en la Fragata resuelta.",
    "pitfalls": [
      "Ganar este torneo introductorio no equivale a desbloquear ni ganar el Torneo de Campeones."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_7",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_8",
      "https://www.serebii.net/black2white2/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK2",
      "WHITE2"
    ],
    "mission": "06",
    "location": "Ruta 6 → Electrorroca → Loza → Gerania",
    "requires": [
      "Primera incursión en la Fragata resuelta"
    ],
    "steps": [
      "Sigue Ruta 6 hasta el laboratorio estacional y habla con Cheren para recibir MO03 Surf. En esta edición no la entrega Mirto en Monte Tuerca.",
      "Cruza Cueva Electrorroca empujando las piedras pequeñas hacia los grandes imanes y sigue el paso hasta Ciudad Loza. Revisa los encuentros de Bel y Acromo durante el recorrido.",
      "Para conseguir el Huevo Suerte visita a Encina en la planta de entrada de Torre de los Cielos, en Ruta 7. Esta entrega está en la torre, a diferencia de Negro/Blanco.",
      "En el gimnasio de Gerania protégete de las ráfagas tras los muros y avanza entre los cambios de viento. Derrota a la líder para conseguir Medalla Jet y MT62 Acróbata.",
      "Con la medalla prepara el viaje en avión con Gerania, Encina y Bel hacia Pueblo Chamota. La siguiente etapa cruza Montaña Reversia; Monte Tuerca no es la ruta de la sexta medalla de estas secuelas."
    ],
    "check": "Sexta medalla, Surf y acceso al viaje hacia Chamota.",
    "pitfalls": [
      "Los cañones de aire del gimnasio original no son el puzle de las ráfagas de estas ediciones."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_9",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_10",
      "https://www.serebii.net/black2white2/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK2",
      "WHITE2"
    ],
    "mission": "07",
    "location": "Chamota → Montaña Reversia → Arenisca → Ladrillo → Caolín",
    "requires": [
      "Medalla Jet y vuelo a Chamota"
    ],
    "steps": [
      "Desde Chamota entra en Montaña Reversia y recórrela con Bel, que acompaña y cura al equipo. Busca la salida a Pueblo Arenisca; la distribución interior cambia entre Negro 2 y Blanco 2.",
      "Desde Arenisca continúa al norte por Ruta 13 hasta Pueblo Ladrillo. Cobalion aparece en esta etapa como encuentro único; guarda antes de afrontarlo y distingue el encuentro de una especie recibida por intercambio.",
      "En Ladrillo completa la explicación de la leyenda y ayuda al rival contra los Plasma al oeste del Centro Pokémon. Después sigue Ruta 12, Puente Villa y Ruta 11 hasta Ciudad Caolín.",
      "Virizion aparece en Ruta 11 como otro encuentro separado. Estos desvíos de captura no sustituyen el acceso a Caolín ni acreditan automáticamente la historia de Plasma.",
      "En Caolín entra en el gimnasio de Lirio y utiliza las plataformas de los dragones para ascender. Vence al líder para obtener Medalla Leyenda y MT82 Cola Dragón."
    ],
    "check": "Séptima medalla y episodio de la invasión de Caolín disponible.",
    "pitfalls": [
      "En estas secuelas Lirio es el líder de Caolín en ambas ediciones; Iris ocupa otro papel en la Liga."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_11",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_12",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_13"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK2",
      "WHITE2"
    ],
    "mission": "08",
    "location": "Caolín → Marga → Ruta 22 → Fragata → Boquete Gigante",
    "requires": [
      "Medalla Leyenda"
    ],
    "steps": [
      "Resuelve la invasión de Caolín y el robo de la Punta ADN. Regresa a Arenisca y cruza el Acuatúnel hasta Ciudad Marga; busca a Ciprián por el muelle para que vuelva al gimnasio.",
      "Cruza los nenúfares del gimnasio y vence a Ciprián para obtener la octava medalla. En Ruta 22 habla con Acromo cerca de Terrakion y recibe la Acromáquina, necesario para despejar el Crustle de Cueva Costera.",
      "Ve por Ruta 21 a Cueva Costera, usa la Acromáquina ante Crustle y llega al barco. Ciprián facilita el embarque. Esta incursión es distinta de la del muelle del PWT.",
      "En la primera barrera de esta incursión, Negro 2 requiere cuatro interruptores: desde las habitaciones noroeste, este y suroeste usa el teletransportador superior izquierdo; desde la sureste, el inferior derecho. Blanco 2 requiere Tarjeta Plasma y la contraseña de las pistas de los reclutas; recoge la tarjeta de la recluta del comedor.",
      "Tras superar esa barrera y combatir junto al rival, sigue la nave hasta Boquete Gigante. En su interior vuelve a cambiar el puzle: Negro 2 pide tarjeta y contraseña; Blanco 2, cuatro interruptores mediante teletransportadores. No repitas la solución de la barrera anterior.",
      "En los puzles con contraseña consigue primero la Tarjeta Plasma y reúne las pistas de esa partida. La clave puede contener cifras o el nombre de un dragón; no existe una contraseña única válida para todos los idiomas y partidas.",
      "Continúa por la prisión de Kyurem, Acromo y la sala de Ghechis, resuelve los encuentros del Trío Sombrío y entra en la cueva interior. Vence a Kyurem Negro en Negro 2 o Kyurem Blanco en Blanco 2 y después a Ghechis.",
      "El Kyurem fusionado de este desenlace no se puede capturar. La captura de los dragones y la obtención de Punta ADN se resuelven en el postgame, sin gastar aquí las Poké Balls intentando atrapar esta fusión."
    ],
    "check": "Ocho medallas y desenlace de Plasma; acceso hacia Ruta 23.",
    "pitfalls": [
      "Las dos barreras intercambian su tipo de puzle según edición y etapa. Comprueba en qué incursión y planta estás antes de seguir una solución."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_13",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_14",
      "https://bulbapedia.bulbagarden.net/wiki/Plasma_Frigate",
      "https://www.serebii.net/black2white2/teamplasma.shtml",
      "https://www.serebii.net/pokearth/unova/plasmafrigate.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK2",
      "WHITE2"
    ],
    "mission": "09",
    "location": "Ruta 23 → Calle Victoria → Alto Mando → Iris",
    "requires": [
      "Ocho medallas y desenlace de Plasma"
    ],
    "steps": [
      "Sal de Boquete Gigante hacia Ruta 23 y alcanza la entrada de Calle Victoria. N entrega MO05 Cascada antes del control de las ocho medallas.",
      "Revisa el equipo para Surf, Fuerza y los desvíos de Corte/Cascada antes de recorrer Calle Victoria. Usa el Centro Pokémon de la entrada para preparar el tramo final; las conexiones y posiciones de entrenadores presentan diferencias entre las dos ediciones.",
      "Avanza por cuevas, valle y laderas hasta la salida superior y supera el combate con el rival antes de la Liga. Los atajos de Fuerza facilitan volver, pero no abras huecos empujando desde un lado que te deje sin acceso.",
      "En la Liga vence a Anís, Aza, Catleya y Lotto en el orden que prefieras y utiliza la estatua central tras superar las cuatro salas.",
      "Derrota a Iris para entrar en el Hall de la Fama y completar los créditos. La campeona inicial de estas secuelas es Iris; no se sustituye esta victoria por el desenlace de N del juego anterior."
    ],
    "check": "Hall de la Fama tras vencer a Iris y postgame disponible.",
    "pitfalls": [
      "Los retos de medallas de Liga con un tipo concreto o un único Pokémon tienen requisitos propios. Una victoria normal no los acredita todos."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2/Part_15",
      "https://www.serebii.net/black2white2/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  }
];
 if(typeof module==='object'&&module.exports)module.exports=routes;else root.PokemonUnovaRoutes=routes;
})(globalThis);
