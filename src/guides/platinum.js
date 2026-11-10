/* Platinum-specific story; source review does not certify historical save events. */
(function(root){
 'use strict';
 const routes=[
  {
    "games": [
      "PLATINUM"
    ],
    "mission": "01",
    "location": "Pueblo Hojaverde → Ruta 201 → Lago Veraz → Pueblo Arena → Ciudad Jubileo",
    "requires": [],
    "steps": [
      "Ve a casa de tu rival en Pueblo Hojaverde, sube a su habitación y después reúnete con él en la salida norte. En Ruta 201, Serbal detiene vuestro intento de cruzar la hierba y ofrece la elección de Turtwig, Chimchar o Piplup; combate con tu rival.",
      "Vuelve a casa para hablar con tu madre y recibir las Deportivas. Acompaña a tu rival al Lago Veraz y completa la escena con Helio; después recorre Ruta 201 hacia el este hasta Pueblo Arena.",
      "Entra en el laboratorio de Serbal en Pueblo Arena, acepta su encargo y recibe la Pokédex. Regresa a Hojaverde: tu madre y la madre de tu rival dejan preparado el paquete que debes entregarle.",
      "Vuelve por Pueblo Arena y toma Ruta 202 al norte. Sigue la demostración de captura de Maya/León y recoge las Poké Balls antes de subir a Ciudad Jubileo.",
      "En Jubileo, entrega el paquete a tu rival en la Escuela de Entrenadores para recibir el Mapa. Encuentra a los tres payasos: junto a la tienda, ante Poké-reloj S. A. y ante Jubileo TV. Responde sí a sus preguntas, reúne los cupones y canjéalos con el presidente por el Poké-reloj.",
      "Antes de salir por Ruta 203 hacia Pirita, puedes recoger la Caña Vieja en el edificio de acceso occidental a Ruta 218. Es una herramienta de colección, no una medalla ni una recompensa de la Liga."
    ],
    "check": "Inicial, Pokédex, Mapa y Poké-reloj disponibles; salida hacia Ruta 203.",
    "pitfalls": [
      "En Platino recibes el inicial en Ruta 201, antes de ir al Lago Veraz. No sigas la secuencia del maletín de Diamante/Perla."
    ],
    "sources": [
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/route_201/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/twinleaf_town_player_house_1f/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/lake_verity/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/sandgem_town_pokemon_research_lab/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/trainers_school/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/jubilife_city/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/route_218_gate_to_jubilife_city/scripts.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "PLATINUM"
    ],
    "mission": "02",
    "location": "Ruta 203 → Puerta Pirita → Mina Pirita → gimnasio de Roco",
    "requires": [
      "Inicial y Pokédex"
    ],
    "steps": [
      "Sal al este de Jubileo por Ruta 203, supera el combate con tu rival y llega a Puerta Pirita. Habla con el montañero de la entrada para recibir MO06 Golpe Roca; todavía necesitas la primera medalla para usarla fuera de combate.",
      "Cruza la planta de entrada y sal a Ciudad Pirita. El gimnasio está esperando a Roco: baja al sur de la ciudad y entra en la Mina Pirita.",
      "Desciende hasta la zona inferior de la mina y habla con Roco junto a las rocas. Espera a que se dirija al gimnasio; visitar el edificio sin hablar con él no resuelve su ausencia.",
      "Vuelve al gimnasio y derrota a Roco. Recoge la Medalla Lignito y la MT76 Trampa Rocas; comprueba que ahora puedes romper las rocas pequeñas con un Pokémon que conozca Golpe Roca.",
      "Regresa por Puerta Pirita y Ruta 203 a Jubileo. La pendiente de Ruta 207 al norte de Pirita exige Bicicleta; no es la salida de la primera medalla."
    ],
    "check": "Medalla Lignito y Golpe Roca habilitado fuera de combate.",
    "pitfalls": [],
    "sources": [
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/route_203/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/oreburgh_gate_1f/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/oreburgh_mine_b2f/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/oreburgh_city_gym/scripts.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "PLATINUM"
    ],
    "mission": "03",
    "location": "Jubileo → Aromaflor → Valle Eólico → Bosque Vetusto → Ciudad Vetusta",
    "requires": [
      "Medalla Lignito y Golpe Roca"
    ],
    "steps": [
      "En Jubileo ayuda a Maya/León contra el Equipo Galaxia y sal al norte por Ruta 204. Cruza Senda Desolada usando Golpe Roca y continúa hasta Pueblo Aromaflor.",
      "Sal al este por Ruta 205 y acércate al Valle Eólico. Vence al recluta de la puerta: se encerrará dentro. Vuelve a Aromaflor y entra en el Prado Aromaflor por el acceso noroeste, ahora libre.",
      "Derrota a los dos reclutas del prado y recoge la Llave Central. Regresa al Valle Eólico, abre la puerta y derrota a Venus dentro. Esta liberación permite seguir Ruta 205 al norte.",
      "Cruza el Bosque Vetusto con Malta hasta su salida oriental; su curación facilita el trayecto. Sigue Ruta 205 hasta Ciudad Vetusta y recoge de Cintia la MO01 Corte al acercarte al edificio Galaxia.",
      "Vence primero a Gardenia en el gimnasio: en Platino la plataforma del reloj avanza al derrotar a las entrenadoras que controlan su mecanismo. Recoge la Medalla Bosque y MT86 Hierba Lazo; ahora puedes usar Corte fuera de combate.",
      "Corta el arbusto de entrada del edificio Galaxia, sube por las plantas y derrota a Júpiter para liberar al dueño de la tienda de bicicletas. Habla con él en su tienda para recibir la Bicicleta.",
      "Con espacio en el equipo acepta de Cintia el Huevo de Togepi al continuar esta cadena en Vetusta. Visita también al Hombre Topo para recibir el Kit Explorador: abre la colección del Subsuelo. Sal al sur por el edificio de la Ruta Ciclista."
    ],
    "check": "Medalla Bosque, edificio liberado, Bicicleta, Corte y Kit Explorador revisados.",
    "pitfalls": [
      "Gardenia va antes de rescatar al dueño de la tienda: necesitas su medalla para cortar el acceso. No confundas el reloj de Platino con el gimnasio de Diamante/Perla."
    ],
    "sources": [
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/jubilife_city/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/floaroma_meadow/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/valley_windworks_building/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/eterna_forest/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/eterna_city/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/eterna_city_gym/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/team_galactic_eterna_building_4f/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/cycle_shop/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/eterna_city_underground_man_house/scripts.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "PLATINUM"
    ],
    "mission": "04",
    "location": "Ruta Ciclista → Monte Corona → Ciudad Corazón → Sosiego → Ciudad Rocavelo",
    "requires": [
      "Medalla Bosque y Bicicleta"
    ],
    "steps": [
      "Baja por Ruta 206 y gira al este por Ruta 207. Recibe de Maya/León el Buscapelea y la aplicación Zahorí; cruza el paso de Monte Corona hacia Ruta 208 y Ciudad Corazón.",
      "Entra en el edificio de concursos para la escena con tu madre y Fantina. Revisa después el gimnasio de Ciudad Corazón: en Platino Fantina es la tercera líder, antes de Brega y Mananti.",
      "En las salas oscuras del gimnasio encuentra la baldosa azul, reconoce su símbolo y entra por la puerta roja con ese mismo símbolo. Evita elegir por una dirección fija: el símbolo es la referencia. Derrota a Fantina y recoge Medalla Reliquia y MT65 Garra Umbría.",
      "En Ciudad Corazón puedes recibir a Eevee de Tecla en su casa con un hueco libre, sin esperar a la Nacional como en Diamante/Perla. Sal al este por Ruta 209, cruza Pueblo Sosiego y sigue Ruta 210 hasta el desvío oriental hacia Ruta 215 y Ciudad Rocavelo.",
      "Para la MO05 Despejar de Platino explora las Ruinas Sosiego al este del pueblo: sigue las indicaciones de la inscripción hasta la cámara inferior de cuatro objetos y recoge la MO. No busques esta MO en el Gran Pantano.",
      "En Rocavelo resuelve el gimnasio desplazando los sacos para despejar los neumáticos y abrir los pasillos. Derrota a Brega, cuarta líder, y recoge Medalla Adoquín y MT60 Puño Drenaje.",
      "Ayuda a Maya/León contra los dos reclutas del almacén Galaxia, sigue la intervención de Handsome y entra en el almacén accesible para recoger MO02 Vuelo. La medalla de Brega permite utilizarla fuera de combate."
    ],
    "check": "Medallas Reliquia y Adoquín, Vuelo y ubicación de Despejar comprobadas.",
    "pitfalls": [
      "El orden de Platino es Fantina → Brega → Mananti. La Torre Perdida no entrega Fuerza en esta edición; la recibe el jugador de Quinoa en Isla Hierro."
    ],
    "sources": [
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/route_207/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/hearthome_city_gym_leader_room/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/hearthome_city_northwest_house/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/solaceon_ruins_room_7/events.json",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/veilstone_city_gym/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/veilstone_city/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/veilstone_city_galactic_warehouse/events.json"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "PLATINUM"
    ],
    "mission": "05",
    "location": "Rocavelo → Ruta 214 → Orilla Valor → Pradera → persecución Galaxia",
    "requires": [
      "Medallas Reliquia y Adoquín"
    ],
    "steps": [
      "Baja de Rocavelo por Ruta 214 hasta Orilla Valor. El acceso al lago sigue controlado; continúa al sur y luego al oeste por Ruta 213 hasta Ciudad Pradera.",
      "Prepara el combate con tu rival junto al gimnasio y entra después al de Mananti. Los interruptores amarillos bajan el agua, los verdes la dejan al nivel intermedio y los azules la suben: utiliza los cambios para acceder a pasarelas y plataformas antes separadas.",
      "Vence a Mananti, quinto líder de Platino, y recoge la Medalla Ciénaga y MT55 Salmuera. La medalla permite Surf fuera de combate, pero la MO la recibirás más adelante en Pueblo Caelestis.",
      "Al salir continúa la escena del Equipo Galaxia en la entrada del Gran Pantano. Persigue al recluta hacia el este, por Ruta 213 hasta Orilla Valor, hablando con él cuando se detenga. Sigue las escenas de Handsome y vence al recluta cuando finalmente combate.",
      "Habla con Cintia en Orilla Valor para recibir la Poción Secreta. Su destino es el grupo de Psyduck que bloquea el norte de Ruta 210, cerca del Café Rodeo; el lago no se abre mediante ese objeto."
    ],
    "check": "Medalla Ciénaga y Poción Secreta para los Psyduck.",
    "pitfalls": [],
    "sources": [
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/pastoria_city/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/pastoria_city_gym/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/route_213/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/valor_lakefront/scripts.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "PLATINUM"
    ],
    "mission": "06",
    "location": "Ruta 210 → Pueblo Caelestis → Ciudad Canal → Isla Hierro",
    "requires": [
      "Poción Secreta y Medalla Ciénaga"
    ],
    "steps": [
      "Vuelve al tramo sur de Ruta 210 y usa la Poción Secreta con los Psyduck. Cuando despejen el camino habla con Cintia para recibir el Talismán que debes entregar a su abuela en Pueblo Caelestis.",
      "Sigue al norte por la zona de niebla de Ruta 210. Despejar mejora la visibilidad; continúa hacia el oeste hasta Caelestis. Derrota al recluta ante la cueva, entrega el Talismán y examina la pintura del interior.",
      "Completa el enfrentamiento de Helio de esta edición y vuelve a hablar con la abuela para recibir MO03 Surf. Enséñala a un Pokémon: la Medalla Ciénaga ya permite cruzar agua.",
      "Vuelve a Jubileo y navega al oeste por Ruta 218 hasta Ciudad Canal. Cruza el puente, supera el combate con tu rival y toma el barco del puerto hacia Isla Hierro.",
      "En la entrada de la cueva de Isla Hierro habla con Quinoa para recibir MO04 Fuerza. Puedes recorrer el interior con él y, tras derrotar a los Galaxia, recoger el Huevo de Riolu si tienes espacio en el equipo.",
      "Regresa a Canal y vence a Acerón en el gimnasio. Recoge Medalla Mina y MT91 Foco Resplandor; Fuerza queda utilizable fuera de combate. Reúnete después con tu rival y Serbal en la planta superior de la biblioteca."
    ],
    "check": "Surf obtenido, Fuerza obtenida y habilitada, Medalla Mina y reunión de biblioteca.",
    "pitfalls": [
      "En Platino Quinoa entrega Fuerza en Isla Hierro, antes de completar su recorrido interior. Despejar y Fuerza no tienen la ubicación de Diamante/Perla."
    ],
    "sources": [
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/route_210_south/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/celestic_town/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/celestic_town_cave/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/canalave_city/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/iron_island/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/iron_island_b2f_left_room/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/canalave_city_gym/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/canalave_library_3f/scripts.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "PLATINUM"
    ],
    "mission": "07",
    "location": "Lago Valor → Lago Veraz → Monte Corona → Ruta 217 → Puntaneva",
    "requires": [
      "Medalla Mina, Surf y Fuerza"
    ],
    "steps": [
      "Después de la reunión y la explosión, dirígete al Lago Valor desde Orilla Valor. Cruza el lecho drenado, entra en la caverna y derrota a Saturno. Vuelve después al Lago Veraz, junto a Hojaverde, para ayudar a Maya/León y derrotar a Venus.",
      "Para llegar al norte vuelve a Monte Corona por Ruta 211 desde Vetusta o Caelestis y atraviesa el paso hacia Ruta 216. Lleva Fuerza y Golpe Roca; Despejar ayuda en la planta con niebla.",
      "Sigue Ruta 216 hacia el oeste y sube por Ruta 217. Recoge la MO08 Trepar como objeto en la nieve al norte de la casa del montañero del lado occidental de la ruta; no es una recompensa por vencer a Inverna.",
      "Sigue hacia Orilla Agudeza y gira al este hasta Ciudad Puntaneva. Antes de usar Trepar fuera de combate necesitas la Medalla Carámbano, así que visita primero el gimnasio.",
      "En el gimnasio toma impulso desde las rampas para romper las bolas de nieve que bloquean el acceso al tramo central; una aproximación corta se detiene sin romperlas. Prepara respuestas al equipo de Inverna y recoge Medalla Carámbano y MT72 Alud al vencer.",
      "Regresa a Orilla Agudeza, usa Trepar para alcanzar el acceso al Lago Agudeza y completa la escena de tu rival con Júpiter. El siguiente objetivo está en la sede Galaxia de Rocavelo, no en Columna Lanza todavía."
    ],
    "check": "Tres lagos investigados, MO08 recogida, Medalla Carámbano y escena de Agudeza.",
    "pitfalls": [
      "Guardar después de una medalla no demuestra que recogiste una MO del suelo. Revisa Trepar en la bolsa si el acceso sigue bloqueado."
    ],
    "sources": [
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/valor_cavern/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/lake_verity/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/route_217/events.json",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/snowpoint_city_gym/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/lake_acuity/scripts.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "PLATINUM"
    ],
    "mission": "08",
    "location": "Rocavelo → sede Galaxia → Monte Corona → Columna Lanza → Mundo Distorsión",
    "requires": [
      "Medalla Carámbano, Surf, Fuerza y Trepar"
    ],
    "steps": [
      "Ve a la sede Galaxia de Rocavelo y habla con el recluta de fuera. Sigue a Handsome al almacén y utiliza el acceso que abre para atravesar el sótano. Busca la Llave Galaxia antes de volver a las puertas de la sede principal.",
      "Entra en el edificio principal, abre las puertas con la Llave Galaxia y utiliza las escaleras y teletransportadores para alcanzar a Helio. Véncelo y recoge la Master Ball; continúa al laboratorio, derrota a Saturno y pulsa el botón que libera a Uxie, Mesprit y Azelf.",
      "Para subir al clímax entra en Monte Corona desde Ruta 207. En la primera sala utiliza Surf y Trepar para alcanzar las escaleras hacia las plantas superiores; continúa por los túneles y los tramos nevados hasta Columna Lanza.",
      "En Columna Lanza supera a los reclutas y el combate doble de Venus/Júpiter junto a tu rival. En Platino el desenlace abre un portal al Mundo Distorsión; no termina con una captura de Dialga o Palkia como en Diamante/Perla.",
      "Entra con Cintia y sigue el recorrido específico de la misión Mundo Distorsión. Necesitas resolver sus tres rocas, vencer a Helio y terminar la escena de Giratina antes de salir por el portal hacia Fuente Despedida.",
      "De vuelta en Sinnoh, visita a Serbal en el laboratorio de Pueblo Arena y continúa hacia Ciudad Marina por Ruta 222, al este de Orilla Valor."
    ],
    "check": "Guardianes liberados y clímax de Platino resuelto; continuación hacia Marina.",
    "pitfalls": [
      "No confundas la llave del almacén con la Llave Galaxia. Una Master Ball en la bolsa no acredita la liberación de los guardianes ni el final del Mundo Distorsión."
    ],
    "sources": [
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/veilstone_city/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/veilstone_city_galactic_warehouse/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/galactic_hq_b2f/events.json",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/galactic_hq_4f/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/galactic_hq_laboratory/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/spear_pillar/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/distortion_world_b7f/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/distortion_world_giratina_room/scripts.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "PLATINUM"
    ],
    "mission": "09",
    "location": "Ruta 222 → Ciudad Marina → Faro Visión → gimnasio → Yasmina",
    "requires": [
      "Desenlace del Mundo Distorsión"
    ],
    "steps": [
      "Cruza Ruta 222 desde Orilla Valor hacia Ciudad Marina. Habla con Fausto en la entrada y busca a Lectro en el Faro Visión, al sureste de la ciudad.",
      "Sube al mirador del faro y habla con Lectro para que regrese al gimnasio. Después dirígete al gimnasio del extremo noroeste: encontrar la puerta no sustituye esta conversación.",
      "Dentro gira las plataformas pulsando sus interruptores para conectar los caminos entre puertas. Completa las salas en orden y derrota a Lectro en la última.",
      "Recoge Medalla Faro y MT57 Rayo Carga. Vuelve a la playa del norte de Marina y habla con Yasmina para recibir MO07 Cascada.",
      "Prepara un Pokémon con Surf y Cascada para Ruta 223. Las ocho medallas habilitan Cascada fuera de combate; si tienes las medallas pero no la MO, vuelve a hablar con Yasmina antes de ir a la Liga."
    ],
    "check": "Ocho medallas y MO07 Cascada recibida.",
    "pitfalls": [],
    "sources": [
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/sunyshore_city/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/vista_lighthouse/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/sunyshore_city_gym_room_3/scripts.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "PLATINUM"
    ],
    "mission": "10",
    "location": "Ruta 223 → Calle Victoria → Liga Pokémon",
    "requires": [
      "Ocho medallas, Surf, Cascada, Fuerza, Golpe Roca y Trepar"
    ],
    "steps": [
      "Sal al norte de Marina con Surf y cruza Ruta 223 hacia la cascada. Utiliza Cascada para alcanzar el Centro Pokémon junto a la entrada de Calle Victoria y prepara allí curación y movimientos de campo.",
      "Entra en Calle Victoria y avanza por sus plantas usando Trepar, Fuerza y Golpe Roca para los desniveles y obstáculos. La salida principal lleva al lado norte de la ruta; las ampliaciones de postgame no son necesarias para alcanzar la Liga.",
      "Fuera de la cueva cruza el agua y sube la cascada final hasta la sede de la Liga. Reorganiza el equipo y repón objetos antes de entrar al control del Alto Mando.",
      "Supera el combate con tu rival de la antesala. El desafío oficial encadena a Alecrán, Gaia, Fausto y Delos, seguido de Cintia; revisa la vida y los usos de movimientos entre salas.",
      "Vence a Cintia y completa la inscripción del Hall de la Fama. Al cargar la partida, continúa con los objetivos de postgame y la revisión de la Pokédex; no des por completados los concursos, el Subsuelo ni el Frente Batalla por haber ganado la Liga."
    ],
    "check": "Hall de la Fama registrado; postgame separado de la historia.",
    "pitfalls": [
      "Los equipos y niveles de la Liga de Platino no coinciden con Diamante/Perla ni con las revanchas posteriores."
    ],
    "sources": [
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/pokemon_league/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/pokemon_league_aaron_room/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/pokemon_league_bertha_room/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/pokemon_league_flint_room/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/pokemon_league_lucian_room/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/pokemon_league_champion_room/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/pokemon_league_hall_of_fame/scripts.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "PLATINUM"
    ],
    "mission": "DETAIL1",
    "location": "Mundo Distorsión: plataformas, tres rocas, Helio y Giratina",
    "requires": [
      "Portal de Columna Lanza abierto; Surf y Fuerza"
    ],
    "steps": [
      "Entra por el portal de Columna Lanza con Cintia. Avanza por las plataformas que se activan al pisar sus puntos de enlace; cuando cambie la orientación, sigue el suelo sobre el que está apoyado el personaje, aunque parezca una pared.",
      "Sigue las apariciones de los guardianes y los tramos de plataformas hasta encontrar las rocas. Usa Fuerza para empujar las tres al nivel inferior por los huecos disponibles; no basta con mover una sola roca.",
      "En la planta de los guardianes empuja cada roca al hueco señalado por Uxie, Mesprit o Azelf. La confirmación es su grito y desaparición tras colocar su roca; si uno sigue allí, su colocación todavía no está resuelta.",
      "Cuando los tres hayan desaparecido, habla con Cintia para habilitar el enlace de plataformas y bajar hacia Helio. El script distingue el puzle terminado de haber hablado después con ella; vuelve a Cintia si la salida parece no abrirse.",
      "Vence a Helio en el tramo final. Cintia cura al equipo después del combate; prepara las Poké Balls y guarda antes de dirigirte a Giratina.",
      "Resuelve el encuentro con Giratina y atraviesa el portal de salida hacia Fuente Despedida. Si quieres conservar esta captura original, no sustituyas el encuentro por un registro recibido por intercambio.",
      "La vuelta posterior por Cueva Retorno permite revisar el Orbe Griseo y el acceso de postgame. Separa ese objeto de haber terminado la historia y de la forma actual de un Giratina intercambiado."
    ],
    "check": "Tres guardianes retirados, conversación de desbloqueo, combate y salida diferenciados.",
    "pitfalls": [
      "Esta ruta corresponde a Platino. Las propiedades del registro en Pokédex no prueban por sí solas el puzle, la conversación de Cintia o la captura original."
    ],
    "sources": [
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/distortion_world_b1f/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/distortion_world_b6f/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/distortion_world_b7f/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/distortion_world_giratina_room/scripts.s",
      "https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/res/field/maps/distortion_world_turnback_cave_room/scripts.s"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  }
];
 if(typeof module==='object'&&module.exports)module.exports=routes;else root.PokemonPlatinumRoutes=routes;
})(globalThis);
