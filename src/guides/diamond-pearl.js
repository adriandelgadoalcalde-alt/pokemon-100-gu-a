/* Original DS Diamond/Pearl; do not substitute Platinum or Switch remake mechanics. */
(function(root){
 'use strict';
 const routes=[
  {
    "games": [
      "DIAMOND",
      "PEARL"
    ],
    "mission": "01",
    "location": "Hojaverde → Lago Veraz → Arena → Jubileo",
    "requires": [],
    "steps": [
      "Ve a casa de tu rival y reúnete con él al norte de Pueblo Hojaverde. Seguid Ruta 201 hacia el oeste hasta Lago Veraz; tras la escena de Serbal, elige una Poké Ball del maletín para defenderte del Starly.",
      "Vuelve a casa y recibe las Deportivas de tu madre. Recorre Ruta 201 hacia el este y visita el laboratorio de Serbal en Pueblo Arena: acepta el encargo de la Pokédex.",
      "Regresa a Hojaverde para recoger el paquete destinado a tu rival. Vuelve a Pueblo Arena y sube por Ruta 202; completa con Maya/León la demostración de captura y recibe las Poké Balls.",
      "En Ciudad Jubileo entrega el paquete a tu rival dentro de la Escuela de Entrenadores para recibir el Mapa. Reúne los cupones de los payasos detrás del Centro Pokémon, ante Poké-reloj S. A. y ante Jubileo TV, respondiendo sí; canjéalos con el presidente por el Poké-reloj.",
      "Revisa la Caña Vieja en el edificio de salida occidental hacia Ruta 218 y después toma la salida oriental de Jubileo hacia Ruta 203."
    ],
    "check": "Pokédex, Mapa y Poké-reloj; ruta hacia Pirita.",
    "pitfalls": [
      "Esta es la secuencia del maletín de Diamante/Perla para DS. En Platino el inicial se recibe antes, en Ruta 201; en estos originales no interviene Handsome."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_1",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_2",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_3"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "DIAMOND",
      "PEARL"
    ],
    "mission": "02",
    "location": "Ruta 203 → Puerta Pirita → Mina Pirita → Roco",
    "requires": [
      "Pokédex e inicial"
    ],
    "steps": [
      "Supera el combate con tu rival en Ruta 203 y alcanza Puerta Pirita. Habla con el montañero de entrada para recibir MO06 Golpe Roca y cruza la planta de entrada hacia Ciudad Pirita.",
      "Si el gimnasio sigue esperando a Roco, entra en la Mina Pirita al sur de la ciudad y baja hasta encontrarlo junto a las rocas. Habla con él para que regrese al gimnasio.",
      "Vence a Roco y recibe Medalla Lignito y MT76 Trampa Rocas. La medalla permite usar Golpe Roca fuera de combate, pero debes enseñarlo a un Pokémon compatible.",
      "Regresa a Jubileo por Puerta Pirita y Ruta 203. La pendiente de Ruta 207 exige Bicicleta y no permite continuar hacia el norte en esta primera visita."
    ],
    "check": "Medalla Lignito y Golpe Roca habilitado.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_3",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_4"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "DIAMOND",
      "PEARL"
    ],
    "mission": "03",
    "location": "Jubileo → Aromaflor → Valle Eólico → Bosque Vetusto → Vetusta",
    "requires": [
      "Medalla Lignito y Golpe Roca"
    ],
    "steps": [
      "Ayuda a Maya/León contra los Galaxia de Jubileo y sal al norte por Ruta 204. Usa Golpe Roca en Senda Desolada para continuar hasta Pueblo Aromaflor.",
      "Ve al Valle Eólico por Ruta 205 y vence al recluta de la puerta. Cuando se encierre, vuelve al Prado Aromaflor por el noroeste del pueblo: derrota a los dos reclutas y recibe la Llave Central.",
      "Abre el edificio del Valle Eólico y derrota a Venus. Sigue Ruta 205 hacia el norte y cruza Bosque Vetusto acompañado de Malta; sal al este hacia Ciudad Vetusta.",
      "Recoge MO01 Corte de Cintia y derrota a Gardenia antes de intentar entrar al edificio Galaxia. En este gimnasio las entrenadoras están escondidas: sigue las pistas de cada una hasta derrotar a las cuatro y hacer aparecer a Gardenia.",
      "Con la Medalla Bosque puedes usar Corte en el acceso del edificio Galaxia. Sube, derrota a Júpiter y libera al dueño de la tienda de bicicletas; recoge después la Bicicleta en su tienda.",
      "Visita al Hombre Topo para recoger el Kit Explorador antes de bajar por la Ruta Ciclista. No esperes el Huevo de Togepi de Cintia: esa entrega corresponde a Platino."
    ],
    "check": "Medalla Bosque, Corte, Bicicleta y Kit Explorador revisados.",
    "pitfalls": [
      "La liberación del edificio necesita Corte habilitado por Gardenia. El gimnasio de D/P no utiliza el reloj giratorio de Platino."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_4",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_5",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_6",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_7"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "DIAMOND",
      "PEARL"
    ],
    "mission": "04",
    "location": "Ruta Ciclista → Corazón → Torre Perdida → Sosiego → Rocavelo",
    "requires": [
      "Medalla Bosque y Bicicleta"
    ],
    "steps": [
      "Baja por Ruta 206 hacia Ruta 207, recibe el Buscapelea y la aplicación Zahorí de Maya/León y cruza Monte Corona hacia Ruta 208 y Ciudad Corazón.",
      "Visita el edificio de concursos para la escena con tu madre y Fantina. En Diamante/Perla aún no puedes desafiar a Fantina: continúa hacia Rocavelo para la tercera medalla.",
      "Con espacio en el equipo, el montañero junto a la salida sureste de Corazón entrega un Huevo de Happiny. En Ruta 209 visita Torre Perdida: sube a la quinta planta y habla con la anciana de la izquierda para recibir MO04 Fuerza; la de la derecha entrega Amuleto.",
      "Cruza Pueblo Sosiego, sigue Ruta 210 hacia el norte hasta el Café Rodeo y toma el desvío oriental de Ruta 215 hasta Ciudad Rocavelo.",
      "Resuelve el gimnasio desplazando las pantallas y abriendo los pasillos hasta Brega. Véncela para recibir la tercera medalla, Adoquín, y MT60 Puño Drenaje.",
      "Ayuda a Maya/León contra los dos reclutas frente al almacén Galaxia. Entra en la parte accesible del almacén y recoge MO02 Vuelo; la Medalla Adoquín ya habilita su uso fuera de combate."
    ],
    "check": "Medalla Adoquín, Vuelo recogido y Fuerza obtenida para más adelante.",
    "pitfalls": [
      "Fuerza todavía necesita la Medalla Mina para usarse fuera de combate. Eevee de Tecla exige la Nacional en D/P; no apliques la entrega temprana de Platino."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_7",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_8",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_9",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_10"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "DIAMOND",
      "PEARL"
    ],
    "mission": "05",
    "location": "Rocavelo → Orilla Valor → Pradera → persecución Galaxia",
    "requires": [
      "Medalla Adoquín"
    ],
    "steps": [
      "Baja por Ruta 214 desde Rocavelo hasta Orilla Valor. Continúa al sur y al oeste por Ruta 213 hasta Ciudad Pradera; el acceso al lago sigue restringido.",
      "Entra en el Gran Pantano y habla con el entrenador del Área 6, al noreste de la entrada, para recibir MO05 Despejar. No está en Ruinas Sosiego en Diamante/Perla.",
      "En el gimnasio alterna interruptores amarillos, verdes y azules para cambiar el nivel del agua y alcanzar a Mananti. Véncelo para obtener la cuarta medalla, Ciénaga, y MT55 Salmuera; queda habilitado Despejar fuera de combate.",
      "Habla con el Galaxia situado cerca del Gran Pantano y síguelo hacia Ruta 213. Supera el combate con tu rival que interrumpe la persecución y continúa hablando con el recluta en sus paradas hasta Orilla Valor, donde finalmente combate.",
      "Después habla con Cintia para recibir la Poción Secreta. Debes llevarla a los Psyduck del tramo sur de Ruta 210; la Medalla Ciénaga de D/P todavía no permite usar Surf."
    ],
    "check": "Cuarta medalla, Despejar y Poción Secreta para Ruta 210.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_11",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_12"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "DIAMOND",
      "PEARL"
    ],
    "mission": "06",
    "location": "Ruta 210 → Caelestis → Fantina → Canal e Isla Hierro",
    "requires": [
      "Poción Secreta y Medalla Ciénaga"
    ],
    "steps": [
      "Aplica la Poción Secreta a los Psyduck de Ruta 210, habla con Cintia y acepta llevar el Talismán a su abuela. Cruza la zona norte con Despejar y sigue al oeste hasta Pueblo Caelestis.",
      "Derrota al recluta de la cueva de Caelestis, entrega el Talismán y examina la pintura. Habla con la abuela para recibir MO03 Surf; todavía debes ganar la quinta medalla para usarla fuera de combate.",
      "Regresa a Ciudad Corazón y desafía ahora a Fantina. Las respuestas de las cuatro salas de su gimnasio son 15, 40, 39 y 15: puertas derecha, central, izquierda y derecha, respectivamente.",
      "Vence a Fantina para recibir Medalla Reliquia y MT65 Garra Umbría. Ahora sí puedes usar Surf. Desde Jubileo navega al oeste por Ruta 218 hasta Ciudad Canal.",
      "Supera el combate con tu rival en el puente de Canal. Puedes visitar Isla Hierro en barco y acompañar a Quinoa hasta liberar el interior de los Galaxia; deja espacio en el equipo para recibir el Huevo de Riolu. Aquí no te entrega Fuerza: ya la recogiste en Torre Perdida.",
      "Regresa a Canal, derrota a Acerón y recibe Medalla Mina y MT91 Foco Resplandor. Esta sexta medalla habilita Fuerza. Reúnete con tu rival y Serbal en la planta superior de la biblioteca."
    ],
    "check": "Surf recibido y habilitado por Fantina; seis medallas y Fuerza habilitada.",
    "pitfalls": [
      "Poseer la MO de Surf no basta para navegar en D/P. La batalla de Helio dentro de las ruinas de Caelestis corresponde a Platino, no a esta escena original."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_13",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_14"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "DIAMOND",
      "PEARL"
    ],
    "mission": "07",
    "location": "Lagos Valor y Veraz → Monte Corona → Ruta 217 → Puntaneva",
    "requires": [
      "Medalla Mina, Surf, Fuerza, Golpe Roca y Despejar"
    ],
    "steps": [
      "Tras la reunión de la biblioteca y la explosión, entra en Lago Valor desde Orilla Valor. Cruza el lecho drenado hasta la caverna y derrota a Saturno.",
      "Regresa a Lago Veraz junto a Hojaverde y ayuda a Maya/León contra Venus. El tercer lago está al norte; accede al tramo de Monte Corona desde Ruta 211 y atraviesa el paso hacia Ruta 216.",
      "Cruza Ruta 216 y sube por Ruta 217. Recoge MO08 Trepar en la nieve detrás de la casa del montañero del lado occidental: no la entrega Inverna. Continúa por Orilla Agudeza hasta Ciudad Puntaneva.",
      "Resuelve el gimnasio tomando suficiente impulso desde las rampas para romper las bolas de nieve que bloquean el camino central. Vence a Inverna y recoge Medalla Carámbano y MT72 Alud; queda habilitado Trepar fuera de combate.",
      "Regresa al acceso del Lago Agudeza y completa la escena de tu rival y Júpiter. Continúa hacia la sede Galaxia de Rocavelo para recuperar a los guardianes."
    ],
    "check": "Tres lagos investigados, Trepar recogido y siete medallas.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_15",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_16",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_17"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "DIAMOND",
      "PEARL"
    ],
    "mission": "08",
    "location": "Rocavelo → almacén y sede Galaxia → Monte Corona → Columna Lanza",
    "requires": [
      "Siete medallas, Surf, Fuerza, Golpe Roca y Trepar"
    ],
    "steps": [
      "Habla con el recluta de fuera de la sede Galaxia de Rocavelo y recoge la Llave Almacén que deja al huir. Úsala en el almacén occidental: no abre la puerta electrónica de la sede principal.",
      "Cruza los sótanos y sus conexiones hasta recoger la Llave Galaxia. Vuelve a la entrada principal, abre las puertas y sube por escaleras y teletransportadores hasta Helio.",
      "Derrota a Helio y recoge la Master Ball. Continúa al laboratorio, vence a Saturno y pulsa el botón que libera a Uxie, Mesprit y Azelf.",
      "Entra en Monte Corona desde Ruta 207. Usa Surf y Trepar para alcanzar las escaleras de la primera sala y sigue subiendo por túneles y laderas nevadas hasta Columna Lanza.",
      "Supera los combates Galaxia, el doble contra Venus/Júpiter junto a tu rival y el combate con Helio. En Diamante te espera Dialga; en Perla, Palkia. Guarda antes del encuentro si quieres conservar su captura original.",
      "Después de resolver el encuentro revisa el extremo posterior de la plataforma para recoger Diamansfera en Diamante o Lustresfera en Perla. Regresa a Orilla Valor y sigue Ruta 222 hacia Ciudad Marina."
    ],
    "check": "Guardianes libres y clímax del legendario de la edición resuelto.",
    "pitfalls": [
      "En estos originales no entras en Mundo Distorsión. Una especie intercambiada no demuestra haber hecho el encuentro de Columna Lanza."
    ],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_17",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_18",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_19"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "DIAMOND",
      "PEARL"
    ],
    "mission": "09",
    "location": "Ruta 222 → Ciudad Marina → Faro Visión → Lectro → Yasmina",
    "requires": [
      "Clímax de Columna Lanza resuelto"
    ],
    "steps": [
      "Cruza Ruta 222 hasta Ciudad Marina y atiende la conversación con Fausto. Busca a Lectro en Faro Visión, al sureste, y habla con él para que vuelva al gimnasio.",
      "Dirígete al gimnasio del noroeste y utiliza los interruptores para girar engranajes y conectar las pasarelas entre salas. Derrota a Lectro en la sala final.",
      "Recibe Medalla Faro y MT57 Rayo Carga. Acércate a la playa del norte de la ciudad y habla con Yasmina para obtener MO07 Cascada.",
      "Enseña Cascada y prepara Surf antes de salir por Ruta 223 hacia la Liga. Revisa la bolsa: la octava medalla habilita Cascada, pero no sustituye recoger su MO."
    ],
    "check": "Ocho medallas y Cascada disponible.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_19"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "DIAMOND",
      "PEARL"
    ],
    "mission": "10",
    "location": "Ruta 223 → Calle Victoria → Liga Pokémon",
    "requires": [
      "Ocho medallas; Surf, Cascada, Fuerza, Golpe Roca y Trepar"
    ],
    "steps": [
      "Navega al norte de Marina por Ruta 223 y sube la cascada hasta el Centro Pokémon de la entrada de Calle Victoria. Prepara curación y movimientos de campo antes de entrar.",
      "Atraviesa las plantas de Calle Victoria con Fuerza, Golpe Roca y Trepar. Busca la salida principal hacia la Liga; el ramal oriental y Ruta 224 son contenido posterior.",
      "Fuera de la cueva usa Surf y Cascada para llegar al edificio de la Liga. Repón objetos y prepara tu equipo antes de superar el combate con tu rival de la antesala.",
      "Completa la secuencia de Alecrán, Gaia, Fausto y Delos, y después vence a Cintia. Revisa puntos de salud y usos de movimientos entre salas; los equipos no coinciden con Platino.",
      "Termina la inscripción en el Hall de la Fama y carga la partida para continuar con el postgame. La Liga no completa por sí sola concursos, Subsuelo, Torre Batalla ni los registros de la Nacional."
    ],
    "check": "Hall de la Fama y continuación de postgame diferenciados.",
    "pitfalls": [],
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_20",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Diamond_and_Pearl/Part_21"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  }
];
 if(typeof module==='object'&&module.exports)module.exports=routes;else root.PokemonDiamondPearlRoutes=routes;
})(globalThis);
