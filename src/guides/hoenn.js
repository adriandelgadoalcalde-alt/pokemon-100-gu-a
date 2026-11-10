/* Recorridos de Hoenn GBA: redacción propia con scripts y referencias por edición. */
(function(root){
 'use strict';
 const routes=[
  {
    "games": [
      "RUBY",
      "SAPPHIRE",
      "EMERALD"
    ],
    "mission": "01",
    "location": "Villa Raíz → rutas 101 y 103 → laboratorio de Abedul",
    "requires": [],
    "steps": [
      "En tu casa de Villa Raíz ajusta el reloj y habla con tu madre. Visita la casa vecina y sube para conocer a tu rival antes de salir por el norte.",
      "En Ruta 101 acércate a la mochila del profesor Abedul, elige a Treecko, Torchic o Mudkip y termina el combate de rescate. El profesor confirma después el regalo en el laboratorio.",
      "Sube por Ruta 101 hasta Pueblo Escaso y continúa al norte por Ruta 103 para combatir con tu rival. Regresa después al laboratorio de Villa Raíz: allí recibes la Pokédex y las primeras Poké Balls.",
      "Antes de abandonar Villa Raíz completa la despedida de tu madre para recibir las Deportivas. Desde Pueblo Escaso toma ahora Ruta 102 hacia Ciudad Petalia."
    ],
    "check": "Inicial recibido, Pokédex en el menú y paso hacia Ciudad Petalia disponible.",
    "pitfalls": [
      "El reloj afecta a mecanismos diarios; una pila agotada puede detenerlos sin impedir la historia principal."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/LittlerootTown_BrendansHouse_1F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/LittlerootTown_BrendansHouse_1F/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/LittlerootTown_MaysHouse_1F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/LittlerootTown_MaysHouse_1F/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/Route101/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/Route101/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/Route103/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/Route103/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/LittlerootTown_ProfessorBirchsLab/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/LittlerootTown_ProfessorBirchsLab/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RUBY",
      "SAPPHIRE",
      "EMERALD"
    ],
    "mission": "02",
    "location": "Ciudad Petalia → Bosque Petalia → Ciudad Férrica → Túnel Fervergal",
    "requires": [
      "Pokédex recibida"
    ],
    "steps": [
      "En el gimnasio de Ciudad Petalia habla con Norman y acompaña la demostración de captura de Blasco. La medalla de Norman corresponde a una visita posterior; continúa por Ruta 104.",
      "Cruza Bosque Petalia hacia el norte. Ayuda al investigador de Devon frente al recluta que lo amenaza y sal por el extremo que conduce a Ciudad Férrica.",
      "En Ciudad Férrica recoge la MO01 Corte en la casa del cortador y vence a Petra en el gimnasio. Obtienes la Medalla Piedra, necesaria para usar Corte fuera de combate.",
      "Tras el robo de los objetos Devon, sal por Ruta 116 y entra en Túnel Fervergal. Derrota al recluta que retiene a Peeko, recupera las mercancías y vuelve a hablar con el empleado de Devon en Ciudad Férrica.",
      "Acepta los encargos del presidente en Devon: la carta para Máximo y el envío para el capitán Babor. Con Peeko rescatado puedes volver a la casa del Sr. Arenque en Ruta 104 y pedir el viaje a Pueblo Azuliza."
    ],
    "check": "Primera medalla, carta y mercancías Devon; transporte del Sr. Arenque habilitado.",
    "pitfalls": [
      "No intentes atravesar aún todas las rocas del túnel: necesitarás Golpe Roca y su medalla. La entrega a Devon abre el viaje que sigue."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/PetalburgCity_Gym/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/PetalburgCity_Gym/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/PetalburgWoods/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/PetalburgWoods/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/RustboroCity_Gym/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/RustboroCity_Gym/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/RusturfTunnel/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/RusturfTunnel/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/RustboroCity_DevonCorp_3F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/RustboroCity_DevonCorp_3F/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RUBY",
      "SAPPHIRE",
      "EMERALD"
    ],
    "mission": "03",
    "location": "Pueblo Azuliza → Cueva Granito → gimnasio de Marcial",
    "requires": [
      "Carta de Devon para Máximo y barco del Sr. Arenque"
    ],
    "steps": [
      "Viaja con el Sr. Arenque a Pueblo Azuliza. Al norte, por Ruta 106, entra en Cueva Granito y habla con el montañero de la entrada para recibir la MO05 Destello.",
      "Derrota a Marcial en el gimnasio de Pueblo Azuliza. La Medalla Puño permite usar Destello fuera de combate; ilumina con él los sótanos de la cueva si no quieres recorrerlos a oscuras.",
      "En Cueva Granito baja al primer sótano, sigue hacia el este y baja de nuevo por la escalera del sureste. En el siguiente sótano avanza al oeste, sube al nivel elevado y busca la escalera del noreste; las escaleras siguientes devuelven a la parte alta de la planta de entrada.",
      "Sigue el pasillo hasta la cámara de Máximo y entrégale la carta; recibes la MT47 Ala de Acero. Vuelve al barco del Sr. Arenque y elige Ciudad Portual para continuar con las mercancías Devon."
    ],
    "check": "Medalla Puño y carta entregada a Máximo; viaje hacia Portual disponible.",
    "pitfalls": [
      "No confundas esta cueva de GBA con su rediseño de Rubí Omega/Zafiro Alfa. Marcial y Máximo son objetivos diferentes."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/DewfordTown_Gym/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/DewfordTown_Gym/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/GraniteCave_1F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/GraniteCave_1F/scripts.inc",
      "https://bulbapedia.bulbagarden.net/wiki/Appendix:Ruby_and_Sapphire_walkthrough/Section_4"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RUBY",
      "SAPPHIRE",
      "EMERALD"
    ],
    "mission": "04",
    "location": "Ciudad Portual → Ruta 110 → Ciudad Malvalona → Túnel Fervergal",
    "requires": [
      "Mercancías Devon recuperadas"
    ],
    "steps": [
      "En Ciudad Portual visita primero el astillero y habla con el ayudante del capitán Babor. Después entra en el Museo Oceánico y sube para entregar las mercancías al capitán; resuelve los combates y la escena del equipo enemigo.",
      "Sal por el norte y recorre Ruta 110. El combate con tu rival corta el avance hacia Ciudad Malvalona; cura al equipo antes de llegar al puente.",
      "En Malvalona entra en la tienda de bicicletas de Anacleto y recoge una bici. La Bici Carrera sirve para pendientes y suelos frágiles; la Bici Acrobática sirve para saltos. Puedes cambiarlas gratis en la tienda.",
      "Recoge la MO06 Golpe Roca en su casa de Ciudad Malvalona. Completa el combate de Blasco ante el gimnasio y vence a Erico para obtener la Medalla Dinamo, que permite usar Golpe Roca fuera de combate.",
      "Haz el desvío oeste por Ruta 117 hasta Pueblo Verdegal y entra en Túnel Fervergal. Rompe las rocas que separan a la pareja y recoge la MO04 Fuerza como recompensa; su uso exterior se habilita con la siguiente medalla.",
      "Regresa a Malvalona y toma Ruta 111 hacia el norte. Rompe las rocas del camino para acceder a Ruta 112 y la Senda Ígnea."
    ],
    "check": "Medalla Dinamo, bicicleta, Golpe Roca y Fuerza recibidos; paso norte abierto.",
    "pitfalls": [
      "El ingreso al museo depende de avanzar el encargo del astillero. Una bicicleta no sustituye a la otra para todos los puzles."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/SlateportCity_SternsShipyard_1F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/SlateportCity_SternsShipyard_1F/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/SlateportCity_OceanicMuseum_2F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/SlateportCity_OceanicMuseum_2F/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/Route110/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/Route110/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/MauvilleCity_Gym/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/MauvilleCity_Gym/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/MauvilleCity_BikeShop/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/MauvilleCity_BikeShop/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/RusturfTunnel/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/RusturfTunnel/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/MauvilleCity_House1/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/MauvilleCity_House1/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RUBY",
      "SAPPHIRE",
      "EMERALD"
    ],
    "mission": "05",
    "location": "Senda Ígnea → Pueblo Pardal → Cascada Meteoro → Monte Cenizo → Pueblo Lavacalda",
    "requires": [
      "Medalla Dinamo y Golpe Roca"
    ],
    "steps": [
      "Cruza la Senda Ígnea desde Ruta 112, continúa por la zona norte de Ruta 111 y Ruta 113 hasta Pueblo Pardal. Desde allí sigue por Ruta 114 para entrar en Cascada Meteoro.",
      "Completa la escena del meteorito con los equipos enemigos en Cascada Meteoro. Después regresa al teleférico de Ruta 112: el acceso que antes estaba bloqueado ya permite subir al Monte Cenizo.",
      "En la cima avanza hasta la máquina del meteorito y vence al jefe enemigo: Magno en Rubí/Esmeralda o Aquiles en Zafiro. Retira el Meteorito de la máquina cuando termine la escena; puedes devolverlo al profesor Cozmo en Pueblo Pardal para su recompensa.",
      "Desciende por el Desfiladero y sal al sur hacia Pueblo Lavacalda. Cura al equipo y entra en el gimnasio de Candela; sus agujeros comunican las dos alturas del edificio.",
      "Vence a Candela y recoge la Medalla Calor. Al salir completa el encuentro con tu rival para recibir las Gafas Aislantes: permiten explorar el desierto de Ruta 111. Con esta medalla también puedes usar Fuerza fuera de combate."
    ],
    "check": "Medalla Calor y Gafas Aislantes; Fuerza habilitada.",
    "pitfalls": [
      "El desierto se abre con las gafas, no con Golpe Roca. En Esmeralda la guarida del Desfiladero es una visita posterior que requiere el Emblema Magma."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/MeteorFalls_1F_1R/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/MeteorFalls_1F_1R/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/MtChimney/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/MtChimney/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/LavaridgeTown_Gym_1F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/LavaridgeTown_Gym_1F/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/LavaridgeTown/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/LavaridgeTown/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RUBY",
      "SAPPHIRE",
      "EMERALD"
    ],
    "mission": "06",
    "location": "Regreso a Ciudad Petalia → gimnasio de Norman → casa de Blasco",
    "requires": [
      "Cuatro medallas de Hoenn"
    ],
    "steps": [
      "Regresa a Ciudad Petalia tras conseguir las cuatro primeras medallas. Habla con Norman en el gimnasio y entra en la cadena de salas: cada puerta indica una estrategia del rival; escoge una salida de cada pareja para ascender.",
      "Prepara el combate contra sus Pokémon de tipo Normal, especialmente los turnos de Truant/Ausente de Slaking. Guarda las curaciones para los turnos en los que puede atacar y evita depender de una sola criatura debilitada.",
      "Derrota a Norman y recoge la Medalla Equilibrio. Completa después la entrega de Surf en la casa de Blasco, situada junto al gimnasio: el padre de Blasco te da la MO03.",
      "Enseña Surf a un Pokémon compatible y vuelve a Ciudad Malvalona. Dirígete al este por Ruta 118 y cruza el agua para abrir el recorrido hacia Ruta 119."
    ],
    "check": "Quinta medalla, Surf recibido y cruce de Ruta 118 accesible.",
    "pitfalls": [
      "Derrotar a Norman y recibir Surf son dos pasos distintos. Si no tienes la MO03, vuelve a la casa de Blasco antes de buscar otra ruta."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/PetalburgCity_Gym/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/PetalburgCity_Gym/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/PetalburgCity_WallysHouse/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/PetalburgCity_WallysHouse/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/Route118/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/Route118/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RUBY",
      "SAPPHIRE",
      "EMERALD"
    ],
    "mission": "07",
    "location": "Ruta 118 → Ruta 119 e Instituto Meteorológico → Arborada → Ruta 120",
    "requires": [
      "Surf y Medalla Equilibrio"
    ],
    "steps": [
      "Cruza Ruta 118 desde Malvalona y toma Ruta 119 hacia el norte. El Instituto Meteorológico está junto al puente bloqueado: entra y resuelve la ocupación enemiga antes de seguir hacia Arborada.",
      "Tras vencer al responsable del instituto habla con los investigadores y recoge a Castform; necesitas un hueco libre en el equipo. Al salir cruza el puente y supera el combate con tu rival para recibir la MO02 Vuelo.",
      "Llega a Ciudad Arborada. El gimnasio está bloqueado por una criatura invisible: sal hacia Ruta 120, busca a Máximo en el puente y participa en la demostración del Detector Devon.",
      "Recoge el Detector Devon y vuelve a la entrada del gimnasio de Arborada. Úsalo sobre el obstáculo para revelar a Kecleon y despejar el acceso.",
      "Dentro del gimnasio orienta las barreras giratorias entrando desde sus lados libres y avanza hasta Alana. Tras vencerla obtienes la Medalla Pluma y puedes usar Vuelo fuera de combate."
    ],
    "check": "Castform revisado, Vuelo y Detector Devon recibidos; Medalla Pluma.",
    "pitfalls": [
      "El problema de acceso al gimnasio se resuelve en Ruta 120. La Pokédex por sí sola no demuestra haber recibido Castform de este regalo."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/Route119_WeatherInstitute_2F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/Route119_WeatherInstitute_2F/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/Route119/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/Route119/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/Route120/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/Route120/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/FortreeCity/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/FortreeCity/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/FortreeCity_Gym/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/FortreeCity_Gym/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RUBY",
      "SAPPHIRE"
    ],
    "mission": "08",
    "location": "Monte Pírico → puerto de Portual → guarida de Ciudad Calagua",
    "requires": [
      "Surf y acceso a rutas 120–122"
    ],
    "steps": [
      "Desde Arborada recorre Ruta 120 y Ruta 121. Usa Surf en Ruta 122 para entrar en Monte Pírico; desde la planta de entrada toma la salida exterior y asciende por la ladera hasta la cima.",
      "Completa la escena del equipo enemigo y habla con los custodios de los orbes. En Rubí se roba el Orbe Azul y te entregan el Rojo; en Zafiro se roba el Rojo y te entregan el Azul.",
      "Vuela a Ciudad Portual y acude al puerto del noreste. Habla con el capitán Babor y presencia el robo del submarino antes de volver a Ciudad Calagua.",
      "En Calagua entra en la guarida costera del equipo enemigo: Magma en Rubí y Aqua en Zafiro. Explora los teletransportadores y recoge la Master Ball de la sala de objetos; algunas de las otras esferas son Electrode.",
      "Llega al muelle interior y vence al administrador que protege la huida del submarino. Al salir comprueba que los Wailmer que bloqueaban la ruta marítima oriental ya se han retirado; navega por Ruta 124 hacia Algaria."
    ],
    "check": "Orbe correspondiente, escena del submarino y guarida resueltas; ruta a Algaria abierta.",
    "pitfalls": [
      "Recoge la Master Ball antes de que la guarida deje de estar accesible en estas ediciones. La base de Rubí GBA no está en el Desfiladero como en Esmeralda."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/MtPyre_Summit/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/MtPyre_Summit/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/SlateportCity_Harbor/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/SlateportCity_Harbor/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/LilycoveCity/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/LilycoveCity/scripts.inc",
      "https://www.serebii.net/rubysapphire/items.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "EMERALD"
    ],
    "mission": "08",
    "location": "Monte Pírico → Desfiladero y Guarida Magma → Portual → Guarida Aqua",
    "requires": [
      "Surf; acceso a Monte Pírico; Fuerza utilizable"
    ],
    "steps": [
      "Desde Ruta 121 usa Surf en Ruta 122 y entra en Monte Pírico. Toma la salida exterior de la planta baja y asciende hasta los custodios de la cima. Tras la escena del Team Aqua habla con la anciana y recibe el Emblema Magma.",
      "Vuelve al teleférico de Monte Cenizo y desciende por el Desfiladero. Al pasar frente a la pared que custodiaba el recluta, el Emblema Magma hace aparecer la entrada de la guarida.",
      "Entra con Fuerza, avanza hasta la cámara de Groudon y resuelve el combate con Magno. Esta visita despierta a Groudon; no es todavía su encuentro de captura.",
      "Ve al puerto de Ciudad Portual, habla con Babor y presencia el robo del submarino por el Team Aqua. Después regresa a Ciudad Calagua y entra en la Guarida Aqua de la costa noreste.",
      "Explora sus teletransportadores y recoge la Master Ball en la sala de objetos, vigilando las esferas que son Electrode. Continúa al muelle, vence al administrador y completa la huida del submarino.",
      "Sal a la costa y comprueba que los Wailmer han dejado libre el mar al este. Usa Surf por Ruta 124 para llegar a Ciudad Algaria."
    ],
    "check": "Emblema Magma recibido y ambas guaridas completadas; mar oriental abierto.",
    "pitfalls": [
      "En Esmeralda son dos guaridas y una escena de puerto entre ambas. El flag upstream que conserva un nombre relacionado con orbes no sustituye la comprobación de qué objeto entrega realmente esta escena."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/MtPyre_Summit/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/MtPyre_Summit/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/JaggedPass/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/JaggedPass/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/MagmaHideout_4F/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/SlateportCity_Harbor/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/SlateportCity_Harbor/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/AquaHideout_B2F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/AquaHideout_B2F/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RUBY",
      "SAPPHIRE"
    ],
    "mission": "09",
    "location": "Ciudad Algaria → gimnasio de Vito y Leti → casa de Máximo",
    "requires": [
      "Guarida enemiga resuelta y Ruta 124 accesible"
    ],
    "steps": [
      "Cruza el mar de Ruta 124 y registra el Centro Pokémon de Ciudad Algaria para regresar con Vuelo. Prepara dos Pokémon capaces de combatir: Vito y Leti se enfrentan a ti en combate doble.",
      "Recorre las baldosas direccionales del gimnasio y ajusta los interruptores que cambian el recorrido. Antes del líder cura a ambos miembros que vayan a salir primero.",
      "Derrota a Vito y Leti para recibir la Medalla Mente. Después visita a Máximo en su casa de Algaria y recoge la MO08 Buceo.",
      "Enseña Buceo a un Pokémon compatible. Con la séptima medalla puedes usarlo en las manchas de agua oscura; sal por el sur hacia las rutas 127 y 128 para buscar el submarino."
    ],
    "check": "Medalla Mente y Buceo recibidos.",
    "pitfalls": [
      "La secuencia del Team Magma en el Centro Espacial pertenece a Esmeralda y no es requisito de Rubí/Zafiro."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/MossdeepCity_Gym/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/MossdeepCity_Gym/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/MossdeepCity_StevensHouse/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/MossdeepCity_StevensHouse/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "EMERALD"
    ],
    "mission": "09",
    "location": "Ciudad Algaria → gimnasio → Centro Espacial → casa de Máximo",
    "requires": [
      "Guaridas completadas y Ruta 124 accesible"
    ],
    "steps": [
      "En Ciudad Algaria derrota a Vito y Leti en el gimnasio. El combate es doble y su equipo es más amplio que en Rubí/Zafiro; lleva dos primeras posiciones preparadas y revisa los interruptores de las plataformas.",
      "Con la Medalla Mente vuelve al Centro Espacial, ocupado por el Team Magma. Resuelve los combates de la planta baja y sube para superar también el grupo que bloquea la segunda planta.",
      "Habla con Máximo en la segunda planta. Escoge tres Pokémon para colaborar con él contra Magno y su administrador; termina esta batalla y la retirada del equipo.",
      "Después visita la casa de Máximo en Ciudad Algaria. Allí te entrega la MO08 Buceo; enséñala a un Pokémon y utiliza las zonas de agua oscura de las rutas 127–128 para continuar."
    ],
    "check": "Séptima medalla, Centro Espacial liberado y MO08 recibida.",
    "pitfalls": [
      "La Medalla Mente permite Buceo, pero no entrega por sí sola la MO. Si Máximo no te la da, termina primero la crisis del Centro Espacial."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/MossdeepCity_Gym/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/MossdeepCity_Gym/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/MossdeepCity_SpaceCenter_1F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/MossdeepCity_SpaceCenter_1F/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/MossdeepCity_SpaceCenter_2F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/MossdeepCity_SpaceCenter_2F/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/MossdeepCity_StevensHouse/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/MossdeepCity_StevensHouse/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RUBY"
    ],
    "mission": "10",
    "location": "Ruta 128 y Caverna Abisal → Ruta 126 → Arrecípolis y Cueva Ancestral",
    "requires": [
      "Medalla Mente; Buceo, Surf, Fuerza y Golpe Roca"
    ],
    "steps": [
      "Desde Ciudad Algaria navega hacia el sur por Ruta 127 y continúa a Ruta 128. Usa Buceo en la zona oscura, entra en la cueva submarina donde está el submarino robado y vuelve a la superficie dentro: es la entrada de Caverna Abisal.",
      "Lleva Surf, Golpe Roca y Fuerza. Avanza por las salas con rocas y corrientes hasta el fondo; salir de una sala y volver a entrar devuelve las rocas a su posición inicial si has bloqueado un paso.",
      "En la última cámara vence a Magno y completa el despertar de Groudon. La alteración climática obliga a desplazarse a Arrecípolis; no buscas aquí un combate de captura en Caverna Abisal.",
      "Desde Ruta 126 usa Buceo junto a la gran isla circular, entra por la abertura submarina de su pared sur y emerge dentro de Arrecípolis. Busca a Máximo y Plubio en la orilla para continuar hacia Cueva Ancestral.",
      "Entra en Cueva Ancestral llevando el Orbe Rojo. Recoge la MO07 Cascada durante el descenso y guarda antes de acercarte a Groudon; debilítalo, aplica un estado si puedes y captura al legendario.",
      "Regresa a Arrecípolis después de resolver el encuentro y comprueba que el gimnasio ha quedado accesible. La octava medalla se obtiene en el siguiente tramo."
    ],
    "check": "Encuentro de Groudon resuelto, MO07 recibida y gimnasio de Arrecípolis abierto.",
    "pitfalls": [
      "Guarda antes del encuentro fijo. Haber recibido la especie por intercambio no significa haber resuelto la crisis local."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/SeafloorCavern_Room9/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/SeafloorCavern_Room9/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/SootopolisCity/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/SootopolisCity/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/CaveOfOrigin_B4F/scripts.inc",
      "https://www.serebii.net/rubysapphire/legendary.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SAPPHIRE"
    ],
    "mission": "10",
    "location": "Ruta 128 y Caverna Abisal → Ruta 126 → Arrecípolis y Cueva Ancestral",
    "requires": [
      "Medalla Mente; Buceo, Surf, Fuerza y Golpe Roca"
    ],
    "steps": [
      "Desde Ciudad Algaria navega hacia el sur por Ruta 127 y continúa a Ruta 128. Usa Buceo en la zona oscura, entra en la cueva submarina donde está el submarino robado y vuelve a la superficie dentro: es la entrada de Caverna Abisal.",
      "Lleva Surf, Golpe Roca y Fuerza. Avanza por las salas con rocas y corrientes hasta el fondo; salir de una sala y volver a entrar devuelve las rocas a su posición inicial si has bloqueado un paso.",
      "En la última cámara vence a Aquiles y completa el despertar de Kyogre. La alteración climática obliga a desplazarse a Arrecípolis; no buscas aquí un combate de captura en Caverna Abisal.",
      "Desde Ruta 126 usa Buceo junto a la gran isla circular, entra por la abertura submarina de su pared sur y emerge dentro de Arrecípolis. Busca a Máximo y Plubio en la orilla para continuar hacia Cueva Ancestral.",
      "Entra en Cueva Ancestral llevando el Orbe Azul. Recoge la MO07 Cascada durante el descenso y guarda antes de acercarte a Kyogre; debilítalo, aplica un estado si puedes y captura al legendario.",
      "Regresa a Arrecípolis después de resolver el encuentro y comprueba que el gimnasio ha quedado accesible. La octava medalla se obtiene en el siguiente tramo."
    ],
    "check": "Encuentro de Kyogre resuelto, MO07 recibida y gimnasio de Arrecípolis abierto.",
    "pitfalls": [
      "Guarda antes del encuentro fijo. Haber recibido la especie por intercambio no significa haber resuelto la crisis local."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/SeafloorCavern_Room9/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/SeafloorCavern_Room9/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/SootopolisCity/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/SootopolisCity/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/CaveOfOrigin_B4F/scripts.inc",
      "https://www.serebii.net/rubysapphire/legendary.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "EMERALD"
    ],
    "mission": "10",
    "location": "Caverna Abisal → Arrecípolis → Pilar Celeste → Arrecípolis",
    "requires": [
      "Medalla Mente, crisis del Centro Espacial resuelta; Buceo, Surf, Fuerza y Golpe Roca"
    ],
    "steps": [
      "Desde Ciudad Algaria navega hacia el sur por Ruta 127 y continúa a Ruta 128. Usa Buceo en la zona oscura, entra en la cueva submarina donde está el submarino robado y vuelve a la superficie dentro: es la entrada de Caverna Abisal.",
      "En la primera sala rompe la roca del noroeste y aparta las dos rocas grandes: la primera hacia el sur y la segunda hacia el este. Toma la puerta noroeste para llegar directamente a la cuarta sala.",
      "En la cuarta sala despeja el paso con Fuerza/Golpe Roca y toma la salida noroeste hacia las corrientes. Busca sucesivamente los remansos del noreste, vuelve a avanzar al este y deja que la corriente te lleve al oeste; desde allí alcanza la puerta noroeste.",
      "En la sala siguiente puedes avanzar por el corredor oeste combatiendo con la administradora. Llegarás al gran puzle de doce rocas que precede al fondo.",
      "En ese puzle empuja un paso al norte la roca central de la fila inferior y separa hacia fuera las dos rocas de sus lados. Desplaza luego aquella primera roca a la izquierda; empuja al norte la siguiente roca central, aparta sus vecinas y lleva hasta el muro norte las dos rocas superiores oblicuas. Aparta la última roca central para abrir la puerta.",
      "Recoge la MT26 Terremoto en la zona alta de la cámara final antes de bajar hacia Kyogre. Si bloqueas una roca, sal de su sala y vuelve a entrar para reiniciar el puzle.",
      "Vence a Aquiles en la cámara final y completa el despertar de Kyogre. Dirígete después a Ruta 126: bucea ante la gran isla circular, entra por la abertura submarina de la pared sur y emerge dentro de Arrecípolis.",
      "En Arrecípolis habla con Máximo y entra en Cueva Ancestral para conversar con Plubio. Indica el Pilar Celeste cuando pregunte por el paradero de Rayquaza; sigue la cadena hasta que Plubio se desplace allí.",
      "Navega hacia Ruta 131 desde la zona de Pueblo Oromar y busca el acceso norte al Pilar Celeste. Sube por el recorrido habilitado para esta visita y despierta a Rayquaza en la cima.",
      "Regresa a Arrecípolis y presencia la intervención de Rayquaza. Habla con los personajes que quedan junto al gimnasio y con Plubio para recibir la MO07 Cascada; el combate por la octava medalla ya puede hacerse."
    ],
    "check": "Clima restaurado, Cascada recibida y gimnasio abierto.",
    "pitfalls": [
      "Despertar a Rayquaza y capturarlo son escenas distintas. Groudon y Kyogre se capturan después por las cuevas climáticas, no en Cueva Ancestral."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/SeafloorCavern_Room9/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/SeafloorCavern_Room9/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/SootopolisCity/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/SootopolisCity/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/CaveOfOrigin_B1F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/CaveOfOrigin_B1F/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/SkyPillar_Top/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/SkyPillar_Top/scripts.inc",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Emerald/Part_15"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RUBY",
      "SAPPHIRE"
    ],
    "mission": "11",
    "location": "Gimnasio de Arrecípolis",
    "requires": [
      "Crisis climática resuelta y acceso al gimnasio"
    ],
    "steps": [
      "Cura al equipo y entra en el gimnasio de Arrecípolis. Sus escaleras se activan al pisar una vez todas las baldosas de hielo de cada plataforma; repetir una baldosa rompe el suelo y te envía al sótano.",
      "Colócate en la casilla de hielo central del borde inferior de cada plataforma y sigue el mapa numerado de abajo. La entrada ya cuenta como casilla 1; cada pulsación del visor corresponde a un movimiento de una casilla. Al terminar, espera a que aparezcan las escaleras y sube por el centro a la plataforma siguiente.",
      "Alcanza al líder y derrota a Plubio. Su equipo es de Agua: la cobertura Planta/Eléctrico ayuda, pero revisa las inmunidades y resistencias de sus tipos secundarios.",
      "Recoge la Medalla Lluvia y comprueba la MO07 Cascada. Con las ocho medallas ya puedes remontar la cascada de Ciudad Colosalia y preparar la entrada a la Liga."
    ],
    "check": "Ocho medallas y Cascada utilizable fuera de combate.",
    "pitfalls": [
      "En Rubí/Zafiro el líder es Plubio; en Esmeralda es Galano. La MO07 se obtiene en lugares diferentes según la edición."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/SootopolisCity_Gym_1F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/SootopolisCity_Gym_1F/scripts.inc",
      "https://bulbapedia.bulbagarden.net/wiki/Sootopolis_Gym",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/layouts/SootopolisCity_Gym_1F/map.bin",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/tilesets/secondary/sootopolis_gym/metatile_attributes.bin",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/src/field_tasks.c"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10",
    "puzzleVersion": "RUBY_SAPPHIRE"
  },
  {
    "games": [
      "EMERALD"
    ],
    "mission": "11",
    "location": "Gimnasio de Arrecípolis",
    "requires": [
      "Crisis climática resuelta y acceso al gimnasio"
    ],
    "steps": [
      "Cura al equipo y entra en el gimnasio de Arrecípolis. Sus escaleras se activan al pisar una vez todas las baldosas de hielo de cada plataforma; repetir una baldosa rompe el suelo y te envía al sótano.",
      "Colócate en la casilla de hielo central del borde inferior de cada plataforma y sigue el mapa numerado de abajo. La entrada ya cuenta como casilla 1; cada pulsación del visor corresponde a un movimiento de una casilla. Al terminar, espera a que aparezcan las escaleras y sube por el centro a la plataforma siguiente.",
      "Alcanza al líder y derrota a Galano. Su equipo es de Agua: la cobertura Planta/Eléctrico ayuda, pero revisa las inmunidades y resistencias de sus tipos secundarios.",
      "Recoge la Medalla Lluvia y comprueba la MO07 Cascada. Con las ocho medallas ya puedes remontar la cascada de Ciudad Colosalia y preparar la entrada a la Liga."
    ],
    "check": "Ocho medallas y Cascada utilizable fuera de combate.",
    "pitfalls": [
      "En Rubí/Zafiro el líder es Plubio; en Esmeralda es Galano. La MO07 se obtiene en lugares diferentes según la edición."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/SootopolisCity_Gym_1F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/SootopolisCity_Gym_1F/scripts.inc",
      "https://bulbapedia.bulbagarden.net/wiki/Sootopolis_Gym",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/layouts/SootopolisCity_Gym_1F/map.bin",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/tilesets/secondary/sootopolis_gym/metatile_attributes.bin",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/src/field_tasks.c"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10",
    "puzzleVersion": "EMERALD"
  },
  {
    "games": [
      "RUBY",
      "SAPPHIRE"
    ],
    "mission": "12",
    "location": "Ruta 128 → Ciudad Colosalia → Calle Victoria → Liga de Hoenn",
    "requires": [
      "Ocho medallas; Surf, Cascada, Fuerza y Golpe Roca; Destello recomendado"
    ],
    "steps": [
      "Desde Ruta 128 navega hacia el este hasta la cascada de Ciudad Colosalia. Usa Cascada, cura al equipo en el Centro Pokémon y entra en Calle Victoria por el acceso norte de esa zona.",
      "Lleva Fuerza y Golpe Roca para las rocas interiores, Surf para los pasos de agua y Destello para orientarte en los sótanos. Conserva un medio de regresar o una Cuerda Huida si necesitas preparar el equipo.",
      "Avanza hasta la salida norte de Calle Victoria y supera el combate obligatorio con Blasco cuando se active en tu edición. Ya fuera, sigue hasta el edificio de la Liga y reorganiza el equipo antes de cruzar el control.",
      "Compra curaciones, antídotos y recuperadores de PP que tengas disponibles. El Alto Mando es Sixto (Siniestro), Fátima (Fantasma), Nívea (Hielo) y Dracón (Dragón); hay que completar la secuencia sin volver a la tienda entre combates.",
      "El Campeón de esta edición es Máximo, especializado en Acero, con otros tipos de cobertura. Tras vencerlo, deja terminar el registro del Hall de la Fama y los créditos, y guarda el progreso de postgame cuando el juego lo permita.",
      "Al retomar la partida vuelve a tu casa de Villa Raíz para completar las escenas de televisión y el Billete Barco. Revisa los regalos del laboratorio y las nuevas rutas de postgame por separado."
    ],
    "check": "Hall de la Fama registrado y partida de postgame iniciada.",
    "pitfalls": [
      "No apliques el equipo del Campeón de Rubí/Zafiro a Esmeralda. Las especies registradas por intercambio no equivalen a haber superado la Liga."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/VictoryRoad_1F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/VictoryRoad_1F/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/EverGrandeCity_ChampionsRoom/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/EverGrandeCity_ChampionsRoom/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/LittlerootTown_BrendansHouse_1F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/LittlerootTown_BrendansHouse_1F/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/LittlerootTown_MaysHouse_1F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/LittlerootTown_MaysHouse_1F/scripts.inc",
      "https://www.serebii.net/rubysapphire/elitefour.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "EMERALD"
    ],
    "mission": "12",
    "location": "Ruta 128 → Ciudad Colosalia → Calle Victoria → Liga de Hoenn",
    "requires": [
      "Ocho medallas; Surf, Cascada, Fuerza y Golpe Roca; Destello recomendado"
    ],
    "steps": [
      "Desde Ruta 128 navega hacia el este hasta la cascada de Ciudad Colosalia. Usa Cascada, cura al equipo en el Centro Pokémon y entra en Calle Victoria por el acceso norte de esa zona.",
      "Lleva Fuerza y Golpe Roca para las rocas interiores, Surf para los pasos de agua y Destello para orientarte en los sótanos. Conserva un medio de regresar o una Cuerda Huida si necesitas preparar el equipo.",
      "Avanza hasta la salida norte de Calle Victoria y supera el combate obligatorio con Blasco cuando se active en tu edición. Ya fuera, sigue hasta el edificio de la Liga y reorganiza el equipo antes de cruzar el control.",
      "Compra curaciones, antídotos y recuperadores de PP que tengas disponibles. El Alto Mando es Sixto (Siniestro), Fátima (Fantasma), Nívea (Hielo) y Dracón (Dragón); hay que completar la secuencia sin volver a la tienda entre combates.",
      "El Campeón de esta edición es Plubio, especializado en Agua. Tras vencerlo, deja terminar el registro del Hall de la Fama y los créditos, y guarda el progreso de postgame cuando el juego lo permita.",
      "Al retomar la partida vuelve a tu casa de Villa Raíz para completar las escenas de televisión y el Billete Barco. Revisa los regalos del laboratorio y las nuevas rutas de postgame por separado."
    ],
    "check": "Hall de la Fama registrado y partida de postgame iniciada.",
    "pitfalls": [
      "No apliques el equipo del Campeón de Rubí/Zafiro a Esmeralda. Las especies registradas por intercambio no equivalen a haber superado la Liga."
    ],
    "sources": [
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/VictoryRoad_1F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/VictoryRoad_1F/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/EverGrandeCity_ChampionsRoom/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/EverGrandeCity_ChampionsRoom/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/LittlerootTown_BrendansHouse_1F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/LittlerootTown_BrendansHouse_1F/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/LittlerootTown_MaysHouse_1F/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/LittlerootTown_MaysHouse_1F/scripts.inc",
      "https://www.serebii.net/emerald/elite.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RUBY",
      "SAPPHIRE"
    ],
    "mission": "14",
    "location": "Torre Batalla → concursos de Hoenn → Museo de Calagua → Pokédex",
    "requires": [
      "Hall de la Fama y Billete Barco para la Torre"
    ],
    "steps": [
      "En el puerto de Portual o Calagua utiliza el Billete Barco y habilita el viaje a Torre Batalla. Prepara un equipo legal para su modalidad de nivel 50 o 100: en estos juegos no se reduce automáticamente el nivel de tus Pokémon.",
      "Para la estrella de combate registra al menos 50 victorias consecutivas en Torre Batalla. Las tandas se agrupan en siete; revisa el récord de racha de la tarjeta y no confundas victorias acumuladas con consecutivas.",
      "Recoge el Tubo Pokécubos en el edificio de concursos de Ciudad Portual. Prepara condición y movimientos de concurso y progresa por los rangos de las cinco categorías hasta Experto.",
      "En el museo de Ciudad Calagua habla con el responsable de la galería superior. Gana un concurso Experto con al menos 800 puntos internos de cada categoría para que el pintor ofrezca el retrato; completa las cinco pinturas, no solo las cintas de victoria. Acepta que el artista lleve la pintura al museo cuando lo pregunte.",
      "Completa las 200 entradas exigidas de la Pokédex de Hoenn. Necesitarás intercambios por iniciales, evoluciones y exclusivos; Jirachi y Deoxys se mantienen separados como distribuciones históricas.",
      "Comprueba las cuatro estrellas oficiales: Hall de la Fama, Pokédex de Hoenn, cinco pinturas y racha de Torre. Colección de objetos, MT, regalos y otros retos forman objetivos adicionales que no se certifican por ese color de tarjeta."
    ],
    "check": "Requisitos de las cuatro estrellas revisados por separado; pendientes de colección identificados.",
    "pitfalls": [
      "Esmeralda reemplaza el objetivo de Torre por los símbolos de oro del Frente. Una victoria de concurso con puntuación insuficiente puede no generar pintura."
    ],
    "sources": [
      "https://www.serebii.net/rubysapphire/trainercard.shtml",
      "https://www.serebii.net/rubysapphire/battletower.shtml",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/SlateportCity_ContestLobby/scripts.inc",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/src/trainer_card.c",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/src/contest_util.c"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "EMERALD"
    ],
    "mission": "14",
    "location": "Frente Batalla → concursos de Calagua → galería del museo → Pokédex",
    "requires": [
      "Hall de la Fama; completar la invitación de Treto y los trayectos del barco"
    ],
    "steps": [
      "Tras la Liga completa las escenas de tu casa, recoge el Billete Barco y sigue la invitación de Treto. Visita el S.S. Marea y habilita el destino Frente Batalla desde los puertos.",
      "Recorre las siete instalaciones del Frente y registra sus símbolos por separado. La estrella de combate exige los siete símbolos de oro; una racha de 50 de Rubí/Zafiro no sustituye este requisito. Abre el recorrido específico de los siete símbolos para sus umbrales.",
      "En Ciudad Calagua entra en el edificio de concursos para obtener el Tubo Pokécubos. En Esmeralda todos los rangos se celebran aquí; los edificios de otras ciudades son Tiendas Batalla.",
      "Habla con el responsable de la planta superior del museo de Calagua. Progresa en las cinco categorías hasta Experto y gana con al menos 800 puntos internos para que el pintor cree los cinco retratos que completan la galería. Acepta que el artista lleve la pintura al museo cuando lo pregunte.",
      "Completa las 200 entradas requeridas de Hoenn mediante capturas, cría, evolución e intercambios; no exijas Jirachi ni Deoxys para esta estrella. Visita a Abedul para las recompensas que correspondan a los hitos de la Pokédex.",
      "Comprueba por separado Liga, Pokédex de Hoenn, galería y todos los oros del Frente. Conserva como extras los regalos, la ampliación de Safari, el fósil restante, las MT y los eventos históricos; la tarjeta dorada no acredita por sí sola ese inventario."
    ],
    "check": "Cuatro requisitos de tarjeta distinguidos de los extras y del progreso manual.",
    "pitfalls": [
      "Una Pokédex preparada o una especie intercambiada no demuestra el encuentro local ni que se hayan obtenido todas las recompensas de postgame."
    ],
    "sources": [
      "https://www.serebii.net/emerald/frontier.shtml",
      "https://www.serebii.net/emerald/contest.shtml",
      "https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/data/maps/LilycoveCity_ContestLobby/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/maps/LilycoveCity_ContestLobby/scripts.inc",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/src/trainer_card.c",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/src/contest_util.c",
      "https://github.com/pret/pokeemerald/blob/731ad5bfd6e6f265508d0efcca0ba42f9dcf5881/data/scripts/contest_hall.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  }
];
 if(typeof module==='object'&&module.exports)module.exports=routes;else root.PokemonHoennRoutes=routes;
})(globalThis);
