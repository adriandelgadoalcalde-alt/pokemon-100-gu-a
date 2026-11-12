/* Kanto GBA remakes: edition-specific progression, not the original GB guide. */
(function(root){
 'use strict';
 const routes=[
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "01",
    "location": "Pueblo Paleta → Ciudad Verde → laboratorio de Oak",
    "requires": [],
    "steps": [
      "Acércate a la salida norte de Pueblo Paleta para que Oak te lleve a su laboratorio. Elige a Bulbasaur, Charmander o Squirtle y supera el primer combate contra tu rival.",
      "Sube por Ruta 1 y entra en la tienda de Ciudad Verde. Recoge el paquete para Oak y regresa a su laboratorio en Pueblo Paleta.",
      "Entrega el paquete y completa la entrega de la Pokédex y las Poké Balls. Habla después con la hermana de tu rival en su casa para recoger el Mapa.",
      "Vuelve a Ciudad Verde, completa la demostración del anciano si corta el paso y continúa al norte hacia Ruta 2 y Bosque Verde."
    ],
    "check": "Pokédex y acceso a Bosque Verde disponibles.",
    "pitfalls": [
      "Esta es la cadena de Rojo Fuego/Verde Hoja; no se recibe el Pikachu inicial de Amarillo."
    ],
    "sources": [
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/PalletTown_ProfessorOaksLab/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/ViridianCity_Mart/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/PalletTown_RivalsHouse/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/ViridianCity/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "02",
    "location": "Bosque Verde → Ciudad Plateada → gimnasio de Brock",
    "requires": [
      "Pokédex recibida"
    ],
    "steps": [
      "Cruza Ruta 2 y entra en Bosque Verde. Recorre sus caminos hacia la salida norte para llegar a Ciudad Plateada; cura al equipo antes del gimnasio.",
      "Prepara ataques Agua o Planta para los tipos Roca/Tierra de Brock. Si escogiste a Charmander, en estos remakes puede aprender Garra Metal al nivel 13; también puedes capturar apoyo en las rutas iniciales.",
      "Derrota a Brock y recoge la Medalla Roca. Al abandonar Ciudad Plateada por el este, el ayudante de Oak te entrega las Deportivas.",
      "Continúa por Ruta 3 hasta el Centro Pokémon que precede a Monte Moon. El acceso posterior del museo para Ámbar Viejo requiere Corte: déjalo anotado para volver."
    ],
    "check": "Primera medalla y salida a Monte Moon.",
    "pitfalls": [
      "Las reglas y movimientos disponibles de Rojo/Azul originales no son idénticos a estos remakes."
    ],
    "sources": [
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/PewterCity_Gym/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/PewterCity/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/PewterCity_Museum_1F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/src/data/pokemon/level_up_learnsets.h"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "03",
    "location": "Monte Moon → Ruta 4 → Ciudad Celeste",
    "requires": [
      "Medalla Roca y acceso desde Ruta 3"
    ],
    "steps": [
      "Entra en Monte Moon y sigue el recorrido de escaleras que desciende a la gran planta inferior. Los ramales que acaban en objetos son desvíos; el camino de historia termina junto al científico y los dos fósiles.",
      "Recoge las Piedras Lunares que quieras reservar para las evoluciones de Kanto: son objetos relevantes de colección, no una condición para atravesar la cueva.",
      "Vence al científico que custodia los fósiles. Elige Fósil Helix para Omanyte o Fósil Domo para Kabuto y conserva el objeto para el laboratorio de Isla Canela.",
      "Sal por el lado de Ruta 4 y baja los desniveles hacia Ciudad Celeste. Tras saltar los salientes no podrás desandar directamente ese tramo; registra el Centro Pokémon y continúa la historia."
    ],
    "check": "Fósil elegido y Ciudad Celeste alcanzada.",
    "pitfalls": [
      "El otro fósil necesita intercambio u otra partida. No se transforma en Pokémon al recogerlo."
    ],
    "sources": [
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/MtMoon_B2F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/Route4/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/MtMoon_1F/map.json"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "04",
    "location": "Ciudad Celeste → Puente Pepita → Ruta 25 y casa de Bill",
    "requires": [
      "Salida de Monte Moon"
    ],
    "steps": [
      "En Ciudad Celeste derrota a Misty en el gimnasio para obtener la Medalla Cascada, que permite usar Corte fuera de combate cuando recibas la MO.",
      "Sal al norte, supera a tu rival y atraviesa el Puente Pepita. Continúa por Ruta 24 y Ruta 25 hasta la casa costera de Bill.",
      "Dentro de la casa habla con Bill, utiliza el ordenador cuando entre en su máquina y vuelve a hablar con él una vez restaurado. Recibirás el Billete Barco para el S.S. Anne.",
      "Regresa a Ciudad Celeste y atraviesa la casa robada cuando se haya retirado el bloqueo. Vence al Rocket del patio y continúa por Ruta 5; el paso directo a Azafrán sigue cerrado, así que usa la Vía Subterránea hacia Ruta 6 y Ciudad Carmín."
    ],
    "check": "Medalla Cascada, Billete Barco y ruta hacia Carmín.",
    "pitfalls": [
      "La entrada al barco depende del billete de Bill. La medalla y la escena de la casa son objetivos distintos."
    ],
    "sources": [
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/CeruleanCity_Gym/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/Route25_SeaCottage/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/CeruleanCity/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/Route5/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "05",
    "location": "Ciudad Carmín → S.S. Anne → capitán → retorno a Celeste",
    "requires": [
      "Billete Barco y Medalla Cascada"
    ],
    "steps": [
      "En Ciudad Carmín visita el Club de Fans Pokémon y acepta escuchar al presidente para recibir el Bono Bici. Cámbialo por la Bicicleta en la tienda de Ciudad Celeste cuando regreses.",
      "Entra en el S.S. Anne por el puerto y utiliza el Billete Barco. Revisa sus camarotes y los objetos que quieras conservar antes de terminar la visita; una habitación permite curar al equipo.",
      "Sube al pasillo que conduce al capitán y supera el combate contra tu rival. Entra en el despacho, ayuda al capitán con su mareo y recibe la MO01 Corte.",
      "Enseña Corte a un Pokémon compatible. Al salir del barco tras la entrega, el S.S. Anne parte; usa Corte sobre el árbol que cierra el gimnasio de Ciudad Carmín."
    ],
    "check": "MO01 recibida y gimnasio de Carmín accesible.",
    "pitfalls": [
      "Completa los desvíos relevantes del barco antes de la despedida. La MO no se recibe por derrotar al rival: hay que hablar con el capitán."
    ],
    "sources": [
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/VermilionCity_PokemonFanClub/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/CeruleanCity_BikeShop/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SSAnne_2F_Corridor/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SSAnne_CaptainsOffice/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SSAnne_Exterior/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "06",
    "location": "Gimnasio de Ciudad Carmín → Cueva Diglett → Ruta 2",
    "requires": [
      "Corte utilizable"
    ],
    "steps": [
      "Corta el árbol de acceso y entra en el gimnasio de Lt. Surge. Busca el primer interruptor entre las papeleras; el segundo está en una papelera contigua.",
      "Si el segundo intento falla, se reinicia la combinación: vuelve a localizar el primer interruptor y no sigas usando la posición anterior como si fuera fija.",
      "Tras abrir ambas barreras derrota a Lt. Surge y recoge la Medalla Trueno. Revisa las técnicas y el equipo antes del siguiente túnel.",
      "Entra en Cueva Diglett al este de Carmín y cruza hasta Ruta 2. Con Corte puedes llegar al edificio del ayudante de Oak: al registrar diez especies capturadas te entrega la MO05 Destello. Regresa después a Celeste, cambiando el Bono Bici si aún no lo has hecho."
    ],
    "check": "Tercera medalla; Destello disponible si cumples diez capturas.",
    "pitfalls": [
      "Destello ilumina Túnel Roca y hace más sencillo seguir su recorrido. Diez especies vistas no sustituyen diez especies capturadas."
    ],
    "sources": [
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/VermilionCity_Gym/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/Route2_EastBuilding/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/DiglettsCave_B1F/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "07",
    "location": "Ruta 9 → Ruta 10 y Túnel Roca → Lavanda → Azulona",
    "requires": [
      "Corte; Destello recomendado"
    ],
    "steps": [
      "Desde Ciudad Celeste corta el árbol de la salida oriental y recorre Ruta 9 hasta Ruta 10. Cura al equipo en el Centro Pokémon que está antes de Túnel Roca.",
      "Entra en el túnel y utiliza Destello para ver sus pasillos. Recorre las conexiones entre la planta de entrada y el sótano hasta alcanzar la salida del sur; lleva curaciones y una Cuerda Huida si necesitas retirarte.",
      "Desde la salida continúa hacia Pueblo Lavanda. Puedes explorar Torre Pokémon, pero la escena que bloquea el acceso superior se resuelve después de conseguir el Scope Silph.",
      "Sal de Lavanda por Ruta 8 y utiliza la Vía Subterránea hacia Ruta 7. Desde allí entra en Ciudad Azulona; no intentes forzar todavía los controles de Azafrán."
    ],
    "check": "Lavanda y Azulona accesibles; Torre pendiente del Scope Silph.",
    "pitfalls": [
      "Los fantasmas no se resuelven únicamente con tipos Siniestro/Fantasma: la historia requiere el Scope Silph."
    ],
    "sources": [
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/RockTunnel_1F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/RockTunnel_B1F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/Route8/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/Route7/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/PokemonTower_6F/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "08",
    "location": "Ciudad Azulona → gimnasio de Erika → Casino y Guarida Rocket",
    "requires": [
      "Acceso a Azulona y Corte"
    ],
    "steps": [
      "En el gran edificio de viviendas de Azulona habla con la anciana de la primera planta para recibir el Té. Entregarlo a uno de los guardias abrirá los controles de Ciudad Azafrán; el agua o la limonada de los originales no sustituyen este objeto.",
      "Para el gimnasio usa Corte en la zona sur y sigue hasta Erika. Derrotarla proporciona la Medalla Arcoíris; gimnasio y casino pueden resolverse en el orden que te resulte cómodo.",
      "En el Casino combate con el Rocket ante el cartel y examina después el cartel para abrir la escalera. Desciende por la guarida y utiliza los paneles de movimiento para avanzar hacia los sótanos inferiores.",
      "En el cuarto sótano vence al recluta de la Llave Ascensor y vuelve a hablar con él si todavía no la ha dejado caer. Recoge la llave y usa el ascensor para llegar al sector de Giovanni.",
      "Supera a los guardias, vence a Giovanni y recoge el Scope Silph. Antes de volver a Lavanda, toma la salida oeste de Azulona: usando Corte en Ruta 16 puedes entrar en la casa donde entregan la MO02 Vuelo."
    ],
    "check": "Té, Scope Silph y Medalla Arcoíris; Vuelo revisado.",
    "pitfalls": [
      "El Té es específico de los remakes. Obtener el Scope no marca por sí solo el rescate del Sr. Fuji."
    ],
    "sources": [
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/CeladonCity_Condominiums_1F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/CeladonCity_Gym/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/CeladonCity_GameCorner/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/RocketHideout_B4F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/Route16_House/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "09",
    "location": "Torre Pokémon de Lavanda → Sr. Fuji → Snorlax de rutas 12/16",
    "requires": [
      "Scope Silph recibido"
    ],
    "steps": [
      "Regresa a Torre Pokémon. Sube sus plantas, supera el combate con tu rival y utiliza la zona de curación si necesitas recomponer el equipo.",
      "En la sexta planta, el Scope Silph permite identificar al fantasma que protege la escalera. Derrota a Marowak para calmar su espíritu; este encuentro no es una captura normal.",
      "Llega a la planta superior y resuelve los combates Rocket que bloquean al Sr. Fuji. Habla con él para volver a su casa y vuelve a conversar allí hasta recibir la Poké Flauta.",
      "Guarda antes de uno de los Snorlax que cierran Ruta 12 o Ruta 16. Usa la Poké Flauta, completa el encuentro y continúa por el camino que abre: ruta costera oriental o Camino de Bicis occidental.",
      "Si todavía te falta Bicicleta, cambia el Bono Bici del presidente de Carmín en Ciudad Celeste antes de intentar Camino de Bicis."
    ],
    "check": "Poké Flauta y al menos una salida hacia Fucsia.",
    "pitfalls": [
      "La Poké Flauta despierta a Snorlax; una especie recibida por intercambio no retira el bloqueo físico de estas rutas."
    ],
    "sources": [
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/PokemonTower_6F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/PokemonTower_7F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/LavenderTown_VolunteerPokemonHouse/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/Route12/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/Route16/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "10",
    "location": "Ciudad Fucsia → Zona Safari → casa del guarda → gimnasio de Koga",
    "requires": [
      "Ruta 12 o 16 despejada"
    ],
    "steps": [
      "Llega a Ciudad Fucsia desde la costa oriental o Camino de Bicis. Entra en Zona Safari con espacio para objetos y planifica el recorrido antes de gastar sus pasos.",
      "Desde el área central avanza por la salida oriental, cruza el área este y sigue las conexiones del norte hacia el área norte y después el oeste. Busca allí la Casa Secreta y habla con su ocupante para recibir la MO03 Surf.",
      "En esa zona oeste recoge también los Dientes de Oro. Si se acaba la visita antes de reunir ambos objetivos, vuelve a entrar: la entrega de Surf y la recogida de dientes son pasos separados.",
      "Regresa a Ciudad Fucsia y entrega los Dientes de Oro al guarda en su casa, al sureste. Recoge la MO04 Fuerza como recompensa.",
      "Derrota a Koga en el gimnasio de muros invisibles para obtener la Medalla Alma, que habilita Surf fuera de combate. Fuerza utiliza la Medalla Arcoíris de Erika; puedes volver a por la recompensa tras la roca de la casa del guarda."
    ],
    "check": "Surf, Fuerza y Medalla Alma recibidos.",
    "pitfalls": [
      "No uses la distribución de las MO de otros remakes. En GBA Surf se recibe en Casa Secreta; Fuerza, al devolver los dientes."
    ],
    "sources": [
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SafariZone_SecretHouse/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/FuchsiaCity_WardensHouse/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/FuchsiaCity_Gym/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SafariZone_West/map.json"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "11",
    "location": "Té para los controles de Azafrán → Silph S.A. → Sabrina",
    "requires": [
      "Té de las viviendas de Azulona"
    ],
    "steps": [
      "Entrega el Té a un guardia de los accesos a Azafrán. La autorización se comparte entre los controles; entra en la ciudad y dirígete a Silph S.A.",
      "Sube a la quinta planta y recoge la Llave Magnética del pasillo inferior. En el tramo del teletransportador puedes pisarlo y volver por el mismo punto para rodear el bloqueo del pasillo y alcanzar la llave.",
      "Vuelve a la tercera planta, abre la puerta de la zona central con la Llave Magnética y usa el teletransportador interior hacia la sala de la séptima planta. Supera allí el combate con tu rival y habla con el empleado que regala a Lapras si tienes un hueco libre.",
      "Usa el otro teletransportador de esa sala para llegar a la planta del presidente. Abre la última puerta, derrota a Giovanni y habla con el presidente para recibir la Master Ball.",
      "Tras liberar Silph entra en el gimnasio de Sabrina. Desde la entrada usa el único teletransportador. En las cuatro salas siguientes elige estas esquinas, por orden: superior derecha → inferior derecha → inferior izquierda → inferior izquierda. Llegarás a la sala de Sabrina; derrota su equipo Psíquico y recoge la Medalla Pantano.",
      "Para salir de la sala de Sabrina toma su único teletransportador y, después, las esquinas inferior derecha → superior izquierda → superior derecha → inferior derecha. Regresarás a la zona de entrada del gimnasio.",
      "El Dojo Karate de Azafrán es un reto separado: vencer al maestro permite escoger a Hitmonlee o Hitmonchan. No entrega la Medalla Pantano ni sustituye a Sabrina."
    ],
    "check": "Silph liberada, Master Ball revisada y Medalla Pantano.",
    "pitfalls": [
      "Recoge expresamente la recompensa del presidente. Tener la especie Lapras en la Pokédex no acredita haber hablado con ese empleado."
    ],
    "sources": [
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SilphCo_5F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SilphCo_3F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SilphCo_7F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SilphCo_11F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SaffronCity_Gym/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SaffronCity_Dojo/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SaffronCity_Gym/map.json",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/layouts/SaffronCity_Gym/map.bin"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "12",
    "location": "Surf hacia Isla Canela → Mansión Pokémon → Blaine → primera visita a Archi7",
    "requires": [
      "Surf y Medalla Alma"
    ],
    "steps": [
      "La ruta más directa desde Pueblo Paleta es navegar hacia el sur por Ruta 21 hasta Isla Canela. Si vienes por Islas Espuma, su recorrido también requiere mover rocas con Fuerza.",
      "En el laboratorio de Canela entrega el fósil elegido en Monte Moon o el Ámbar Viejo recibido por la entrada trasera del Museo de Plateada con Corte. Sal y vuelve después para recoger al Pokémon revivido.",
      "Entra en Mansión Pokémon y explora sus plantas utilizando los interruptores de las estatuas para alternar puertas. El descenso desde la planta superior permite acceder a la escalera del sótano; allí recoge la Llave Secreta que abre el gimnasio.",
      "Con la Llave Secreta entra en el gimnasio de Blaine. Usa sus cuestionarios de puertas como mecanismo del propio juego o resuelve los combates que permiten pasar; derrota al líder y recoge la Medalla Volcán.",
      "Al salir aparece Bill y propone viajar a Isla Prima. Si aceptas, conoce a Celio y recibe Tri-Ticket y Meteorito; visita el Salón Recreativo de Isla Secunda y resuelve la búsqueda de Pedrita en Bosque Baya de Isla Tera para completar el encargo.",
      "Habla de nuevo con los personajes del encargo y regresa con Bill a Canela. Si aplazaste el viaje inicial, puedes buscar después a Bill en el Centro Pokémon de Canela."
    ],
    "check": "Llave Secreta, séptima medalla y primera cadena de las islas revisados.",
    "pitfalls": [
      "La primera visita a las islas no equivale a completar la red de Celio: Rubí/Zafiro es una cadena posterior que necesita Liga y Pokédex Nacional."
    ],
    "sources": [
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/CinnabarIsland_PokemonLab_ExperimentRoom/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/PokemonMansion_B1F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/CinnabarIsland_Gym/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/CinnabarIsland/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/OneIsland_PokemonCenter_1F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/TwoIsland_JoyfulGameCorner/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/ThreeIsland_BerryForest/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "13",
    "location": "Ciudad Verde → Giovanni → Ruta 22 → control de Ruta 23",
    "requires": [
      "Siete medallas"
    ],
    "steps": [
      "Regresa a Ciudad Verde con las siete medallas. El gimnasio que estaba cerrado al comienzo ya permite entrar; prepara respuestas frente a los Pokémon de tipo Tierra de Giovanni.",
      "Recorre el gimnasio y vence a Giovanni para obtener la Medalla Tierra. Revisa que la ficha del entrenador muestra las ocho medallas antes de dirigirte a la Liga.",
      "Sal por Ruta 22, prepara el combate con tu rival y continúa hasta el control de acceso de Ruta 23. Cada tramo comprueba una medalla distinta.",
      "Lleva Surf para el control de la ruta y Fuerza para el interior de Calle Victoria. Si todavía no recibiste la Master Ball, vuelve al presidente de Silph antes de cerrar los preparativos."
    ],
    "check": "Ocho medallas y acceso a Calle Victoria.",
    "pitfalls": [
      "Moltres no está en Calle Victoria en Rojo Fuego/Verde Hoja: su encuentro está en Monte Ascuas, en Isla Prima."
    ],
    "sources": [
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/ViridianCity_Gym/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/Route22/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/Route23/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SilphCo_11F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/MtEmber_Summit/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "14",
    "location": "Ruta 23 → Calle Victoria → Meseta Añil → Hall de la Fama",
    "requires": [
      "Ocho medallas, Surf y Fuerza"
    ],
    "steps": [
      "Desde el control de Ruta 23 atraviesa los tramos de tierra y agua hasta la entrada de Calle Victoria. Cura al equipo y lleva Fuerza para mover las rocas de los interruptores.",
      "Dentro coloca las rocas sobre los pulsadores del suelo para retirar las barreras. En las plantas superiores una roca debe caer por un agujero para poder llevarla al interruptor de la planta inferior; reinicia una sala entrando de nuevo si bloqueas una roca.",
      "Sal por el extremo norte hacia Meseta Añil. Prepara curaciones, estados y PP antes de cruzar la puerta del Alto Mando; es una secuencia de cinco combates.",
      "Los miembros son Lorelei (Hielo), Bruno (Lucha), Agatha (Fantasma/Veneno) y Lance (Dragón). Tu rival es el Campeón y su equipo cambia según el inicial que elegiste.",
      "Tras vencer al Campeón deja registrar el Hall de la Fama y terminar los créditos. Al continuar la partida revisa con Oak la ampliación a Pokédex Nacional: se requieren al menos 60 especies capturadas, además de haber superado la Liga.",
      "Con la Pokédex Nacional vuelve a Celio en Isla Prima y abre el recorrido del Rubí y el Zafiro. Esa cadena habilita funciones y encuentros que la primera victoria en Liga no abre por sí sola.",
      "Si juegas a la reedición oficial de Switch, revisa Ori-Ticket y Misti-Ticket después del Hall de la Fama: permiten los accesos a Isla Origen y Roca Ombligo. Esta entrega no existe en los cartuchos GBA originales; consulta la misión de las islas para las condiciones de esa revisión."
    ],
    "check": "Hall de la Fama y requisito de Pokédex Nacional revisados.",
    "pitfalls": [
      "Un total de especies vistas no cumple las 60 capturadas. El acceso a Mewtwo depende también del cierre de la red de Celio."
    ],
    "sources": [
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/src/post_battle_event_funcs.c",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/VictoryRoad_1F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/VictoryRoad_2F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/VictoryRoad_3F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/PokemonLeague_LoreleisRoom/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/PokemonLeague_ChampionsRoom/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/PalletTown_ProfessorOaksLab/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/OneIsland_PokemonCenter_1F/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "15",
    "location": "Islas Espuma → Central de Energía → Monte Ascuas → Cueva Celeste y errante",
    "requires": [
      "Surf; Fuerza para Espuma/Ascuas; red de Celio completada para Mewtwo y errante"
    ],
    "steps": [
      "Para Articuno navega hacia Islas Espuma. Empuja las rocas por sus agujeros y síguelas entre plantas hasta bloquear las corrientes del nivel inferior; usa Surf para alcanzar la plataforma de Articuno y guarda antes del encuentro.",
      "Para Zapdos vuelve a Ruta 10, al norte de Túnel Roca. Utiliza Surf por el río hasta la Central de Energía; recorre su interior hasta la sala de Zapdos y no confundas las esferas que son Electrode con objetos seguros.",
      "Para Moltres viaja a Isla Prima y recorre Camino Candente hacia Monte Ascuas. En las termas del camino puedes recoger la MO06 Golpe Roca. Sube por las cuevas del monte y usa Fuerza en el tramo de rocas de la cima antes de acercarte al ave.",
      "Para Mewtwo completa primero la entrega de Rubí y Zafiro a Celio. Esto retira al guardia de Cueva Celeste: desde Ciudad Celeste sube hacia el puente, navega por el agua del noroeste y entra en la cueva. Explora sus plantas hasta el encuentro final y guarda antes de combatir.",
      "La entrega de Zafiro a Celio activa también el errante de Kanto: Entei si elegiste Bulbasaur, Suicune si elegiste Charmander y Raikou si elegiste Squirtle. Registra el primer avistamiento y utiliza la Pokédex para seguir sus cambios de ruta.",
      "Distingue los encuentros de esta partida de las especies obtenidas por intercambio. Mew, Lugia/Ho-Oh y Deoxys corresponden a métodos o distribuciones separados; no se abren por capturar estas cuatro especies."
    ],
    "check": "Ubicaciones y accesos de las cuatro capturas fijas y del errante identificados.",
    "pitfalls": [
      "Moltres está en Monte Ascuas, no en Calle Victoria. Una especie registrada no prueba que se haya resuelto su escena original. Conserva una copia antes de encuentros únicos.",
      "En GBA original, Entei/Raikou pueden desaparecer definitivamente si Rugido termina el combate: considera reservar la Master Ball para ese errante. La reedición oficial de Switch corrige ese fallo. No confundas esta diferencia de revisión con la huida normal del errante."
    ],
    "sources": [
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SeafoamIslands_B4F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/PowerPlant/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/MtEmber_Summit/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/OneIsland_KindleRoad_EmberSpa/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/OneIsland_PokemonCenter_1F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/CeruleanCave_B1F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/src/roamer.c",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/src/battle_main.c"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "16",
    "location": "Regalos, recompensas de Oak, colecciones y tarjeta oficial",
    "requires": [
      "Accesos de historia y postgame según cada objetivo"
    ],
    "steps": [
      "Revisa los regalos permanentes: Eevee en la habitación de la azotea del edificio de viviendas de Azulona (entrada trasera), Lapras en la séptima planta de Silph y la elección Hitmonlee/Hitmonchan del Dojo. Los otros iniciales y la alternativa del dojo necesitan intercambio u otra partida.",
      "Recoge el Ámbar Viejo por la entrada trasera del Museo de Plateada con Corte y revive fósiles en Canela. Revisa las MT relevantes y evoluciones con objetos sin exigir cada objeto suelto ni cada entrenador secundario.",
      "Los ayudantes de Oak tienen recompensas por especies capturadas: Destello con 10 en Ruta 2, Piedra Eterna con 20 en el Centro Pokémon de Ruta 10, Buscaobjetos con 30 en la entrada oriental de Ruta 11 y Repartir Exp. con 50 en la entrada de Ruta 15. Visita al ayudante concreto; la cifra por sí sola no entrega el objeto.",
      "Si una evolución hacia una especie de otra región se detiene (por ejemplo Golbat a Crobat), consigue primero la Pokédex Nacional. No necesitas repetir la amistad sin resolver ese bloqueo de la edición.",
      "Completa la Pokédex de Kanto exigida para su estrella: las 150 especies, excluyendo Mew. Para el reconocimiento nacional se comprueban 380 entradas: no se exigen Mew, Lugia, Ho-Oh, Celebi, Jirachi ni Deoxys. El conteo total aislado no sustituye la lista correcta de especies.",
      "Para la estrella de los minijuegos registra al menos 200 saltos consecutivos en Salto Pokémon y 200 bayas recogidas en una partida en el juego de Dodrio. Requieren multijugador y adaptadores inalámbricos compatibles; no se sustituyen por los retos de Hoenn.",
      "Comprueba las cuatro estrellas por separado: Hall de la Fama, Kanto, Nacional y ambos minijuegos. Los eventos históricos y las colecciones adicionales se mantienen en su propia lista; una tarjeta dorada no certifica haber realizado cada escena."
    ],
    "check": "Recompensas y cuatro requisitos de tarjeta separados de extras y legado.",
    "pitfalls": [
      "Los objetos ya gastados pueden no seguir en la bolsa. No se exige un evento caducado para una estrella cuyo código excluye esa especie."
    ],
    "sources": [
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/CeladonCity_Condominiums_RoofRoom/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SilphCo_7F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SaffronCity_Dojo/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/PewterCity_Museum_1F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/Route2_EastBuilding/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/Route10_PokemonCenter_1F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/Route11_EastEntrance_2F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/Route15_WestEntrance_2F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/src/trainer_card.c",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/src/pokedex.c",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/src/evolution_scene.c",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/src/dodrio_berry_picking.c"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  }
];
 if(typeof module==='object'&&module.exports)module.exports=routes;else root.PokemonFRLGRoutes=routes;
})(globalThis);
