/* Sinnoh remakes use Poketch field actions and their own collection achievements. */
(function(root){
 'use strict';
 const routes=[
  {
    "games": [
      "BD",
      "SP"
    ],
    "mission": "01",
    "location": "Pueblo Hojaverde → Lago Veraz → Pueblo Arena",
    "requires": [],
    "steps": [
      "Visita a tu rival en su casa de Hojaverde y síguelo por Ruta 201 hacia Lago Veraz. Después de que Serbal y su ayudante dejen el maletín, los Starly os atacan.",
      "Escoge Turtwig, Chimchar o Piplup del maletín para ese combate. La elección se hace en el lago, no en Ruta 201 como en Platino.",
      "Tras devolver el maletín y hablar en casa, dirígete al este por Ruta 201 hasta Pueblo Arena. Entra al laboratorio: Serbal confirma el regalo de tu inicial y te entrega la Pokédex.",
      "Vuelve a informar a tu madre en Hojaverde y recoge el paquete para el rival. Regresa a Arena y sigue al norte por Ruta 202 para la demostración de captura del ayudante.",
      "Con Poké Balls disponibles registra tus primeras capturas y llega a Ciudad Jubileo. Tener un inicial no acredita haber capturado al legendario del lago."
    ],
    "check": "Inicial, Pokédex y comienzo del registro de capturas.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_1",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_2"
    ],
    "pitfalls": [],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BD",
      "SP"
    ],
    "mission": "02",
    "location": "Ciudad Jubileo → Ruta 203 → Puerta Pirita → Ciudad Pirita",
    "requires": [
      "Pokédex y paquete para el rival"
    ],
    "steps": [
      "En Jubileo entrega el paquete al rival en la Escuela de Entrenadores. Encuentra a los tres payasos del evento del Poké-reloj, responde sí a sus preguntas y entrega los cupones al presidente para recibirlo.",
      "Sal al este por Ruta 203 y vence al rival. En Puerta Pirita habla con el montañero para registrar Golpe Roca y recibir MT98; su uso de campo se habilita después de la primera medalla.",
      "Llega a Pirita y baja a la mina del sureste. Busca a Roco en la parte profunda, habla con él y deja que regrese al gimnasio.",
      "Vence a Roco y a su Cranidos para la Medalla Lignito. Con ella puedes romper las rocas mediante el Poké-reloj; no hace falta enseñar Golpe Roca a un Pokémon del equipo. Las MT de combate se gastan al enseñarlas, pero el uso de campo no exige consumirlas.",
      "Vuelve a Jubileo por Puerta Pirita. Al norte ayuda a Serbal y a su ayudante contra el Equipo Galaxia para abrir la continuación por Ruta 204."
    ],
    "check": "Medalla Lignito, Poké-reloj y Golpe Roca de campo habilitado.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_2",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_3",
      "https://www.serebii.net/brilliantdiamondshiningpearl/poketch.shtml",
      "https://www.serebii.net/brilliantdiamondshiningpearl/tms.shtml"
    ],
    "pitfalls": [],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BD",
      "SP"
    ],
    "mission": "03",
    "location": "Ruta 204 → Pueblo Aromaflor → Valle Eólico → Bosque Vetusto → Ciudad Vetusta",
    "requires": [
      "Medalla Lignito y Golpe Roca"
    ],
    "steps": [
      "Cruza Senda Desolada rompiendo las rocas y llega a Aromaflor. Investiga Valle Eólico al este y vence al recluta de la puerta: se encierra dentro y necesitas la llave.",
      "Vuelve a Prado Aromaflor, por la entrada antes bloqueada del noroeste del pueblo. Derrota a los dos reclutas y recibe la Llave Central antes de regresar al edificio del Valle Eólico.",
      "Abre la central y vence a Venus para liberar al padre de la niña. Continúa al norte por Ruta 205 y cruza Bosque Vetusto acompañado por Malta.",
      "En Ciudad Vetusta recibe el Kit de Explorador del Hombre del Subsuelo si vas a explorar y registra Corte con la MT93 de Cintia. Su uso exige la medalla de Gardenia.",
      "En el gimnasio encuentra y vence a sus cuatro entrenadoras escondidas: noroeste, suroeste, centro y noreste. Después vence a Gardenia para la Medalla Bosque.",
      "Con Corte abre el acceso al edificio Galaxia, sube hasta Ceres y libera a los Pokémon robados. Visita después la tienda del dueño rescatado para recibir la Bicicleta.",
      "Sal al sur por la Ruta Ciclista y Ruta 207. Cruza el tramo inferior de Monte Corona hacia Ruta 208 y Ciudad Corazón; no se exige subir todavía a Columna Lanza."
    ],
    "check": "Medalla Bosque, edificio liberado, Corte y Bicicleta.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_3",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_4",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_5",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_7",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_8",
      "https://www.serebii.net/brilliantdiamondshiningpearl/grandunderground.shtml"
    ],
    "pitfalls": [],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BD",
      "SP"
    ],
    "mission": "04",
    "location": "Ciudad Corazón → Ruta 209 → Pueblo Sosiego → rutas 210/215 → Ciudad Rocavelo",
    "requires": [
      "Bicicleta y dos medallas"
    ],
    "steps": [
      "En Ciudad Corazón sigue la escena del Pokémon que se escapa y visita el edificio de Superconcursos para encontrarte con tu madre y Fantina. Fantina todavía no se combate: es la quinta líder de estos remakes.",
      "Después del encuentro con el rival continúa por Ruta 209. Sube Torre Perdida y habla con la anciana de la planta superior para recibir MT96 Fuerza; su uso de campo llegará con la Medalla Mina.",
      "Pasa por Pueblo Sosiego. Si visitas las ruinas, la escalera de la ruta principal sigue arriba derecha, abajo izquierda, arriba derecha, arriba izquierda, arriba izquierda y abajo izquierda.",
      "Sube por Ruta 210 hasta el grupo de Psyduck y toma el desvío de Ruta 215 hacia Rocavelo. Los Psyduck se retiran más tarde con la medicina de Cintia.",
      "En el gimnasio de Brega desplaza los paneles para conectar los corredores con la pasarela central. Vence a su equipo de tipo Lucha, incluido Lucario, para obtener la Medalla Adoquín.",
      "Ayuda a Maya o León a recuperar su Pokédex ante el almacén Galaxia. Entra en el almacén accesible después y recoge MT94 Vuelo; la medalla de Brega permite usarlo desde el Poké-reloj."
    ],
    "check": "Medalla Adoquín, Vuelo y Fuerza registrada para más adelante.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_9",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_10",
      "https://www.serebii.net/brilliantdiamondshiningpearl/tms.shtml"
    ],
    "pitfalls": [
      "La misión conserva su ID anterior, pero no ordena combatir a Fantina junto a Brega. Los paneles de Rocavelo todavía necesitan un plano completo."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BD",
      "SP"
    ],
    "mission": "05",
    "location": "Ruta 214 → Orilla Valor → Ruta 213 → Ciudad Pradera",
    "requires": [
      "Medalla Adoquín"
    ],
    "steps": [
      "Sal al sur de Rocavelo por Ruta 214, pasa Orilla Valor y la zona del hotel, y sigue Ruta 213 al oeste hasta Ciudad Pradera.",
      "Entra en Gran Pantano y habla con el personaje junto a la entrada para registrar Despejar con MT97. No se obtiene de Ruinas Sosiego como en Platino.",
      "El gimnasio de Mananti usa tres alturas de agua. Los botones amarillos bajan el nivel, verdes lo dejan intermedio y azules lo suben; alterna pasarelas y flotadores hasta el líder.",
      "Vence a Mananti para la Medalla Ciénaga y habilitar Despejar fuera de combate. Después habla con el recluta junto al Gran Pantano y persíguelo hacia el este.",
      "Supera al rival cuando te intercepte y sigue al recluta por Ruta 213 y Orilla Valor, hablando con él cada vez que se detenga. Véncelo cuando por fin combata.",
      "Encuentra a Cintia cerca del acceso al Lago Valor para recibir la Poción Secreta. Vuelve a los Psyduck de Ruta 210 y usa la medicina para abrir el paso al norte."
    ],
    "check": "Medalla Ciénaga, Despejar y Psyduck retirados.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_11",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_12",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_13",
      "https://www.serebii.net/brilliantdiamondshiningpearl/tms.shtml"
    ],
    "pitfalls": [
      "El orden completo de botones y posiciones del gimnasio de Pradera sigue pendiente de un plano verificado."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BD",
      "SP"
    ],
    "mission": "06",
    "location": "Ruta 210 → Pueblo Caelestis → Ciudad Corazón → Ciudad Canal",
    "requires": [
      "Cuatro medallas y Poción Secreta utilizada"
    ],
    "steps": [
      "Tras retirar a los Psyduck recibe de Cintia el amuleto para su abuela. Recorre el tramo norte de Ruta 210, usando Despejar para ver sus caminos, hasta Pueblo Caelestis.",
      "Derrota al recluta ante las ruinas y entrega el amuleto a la anciana. Examina el mural del interior y recibe MT95 Surf después de la explicación.",
      "Vuelve a Corazón y desafía ahora a Fantina. Sus puertas correctas corresponden a 15, 40, 39 y 15; no se usa el gimnasio de linternas y símbolos de Platino.",
      "Vence a Fantina para la Medalla Reliquia y habilitar Surf desde el Poké-reloj. Vuelve a Jubileo y navega al oeste por Ruta 218 hasta Ciudad Canal.",
      "Supera al rival al cruzar el puente de Canal. Puedes tomar el barco a Isla Hierro, acompañar a Quinoa y resolver el incidente Galaxia para recibir el Huevo de Riolu; Fuerza ya se recibió en Torre Perdida.",
      "En el gimnasio de Acerón usa los elevadores y plataformas para alcanzar la planta superior. Vence a su equipo de tipo Acero para la Medalla Mina, que permite usar Fuerza con los bloques.",
      "Sube a la tercera planta de la biblioteca de Canal para reunirte con Serbal y los demás. Atiende la explosión y el encargo de investigar los lagos."
    ],
    "check": "Medallas Reliquia y Mina, Surf/Fuerza habilitados y reunión de la biblioteca.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_13",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_15",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_16",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_17",
      "https://www.serebii.net/brilliantdiamondshiningpearl/tms.shtml"
    ],
    "pitfalls": [
      "El orden completo de elevadores de Canal todavía necesita su propio plano; no se presenta el de otro remake como equivalente."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BD",
      "SP"
    ],
    "mission": "07",
    "location": "Lagos Valor/Veraz → Monte Corona → rutas 216/217 → Ciudad Puntaneva",
    "requires": [
      "Medalla Mina y Fuerza"
    ],
    "steps": [
      "Ve a Lago Valor tras la explosión de la biblioteca. Cruza el lecho vaciado y entra en la cueva central para vencer a Saturno.",
      "Vuelve a Lago Veraz, junto a Hojaverde, y ayuda a Serbal y a su ayudante venciendo a Venus. El siguiente destino es Lago Agudeza, al norte.",
      "Entra en Monte Corona por Ruta 211 y toma el paso norte utilizando Fuerza para los bloques. Cruza las rutas 216 y 217 hacia el paisaje nevado.",
      "En Ruta 217 recoge MT100 Treparrocas detrás de la casa del montañero. Si el muro del lago sigue sin poder escalarse, continúa primero hasta Puntaneva: falta la medalla que habilita ese movimiento.",
      "En el gimnasio de Inverna usa los desniveles de hielo para ganar impulso y romper las bolas de nieve que bloquean el camino central. Véncela para obtener la Medalla Carámbano y habilitar Treparrocas.",
      "Vuelve a la Orilla Agudeza y escala el muro para llegar al lago. Tras el encuentro con el rival y Ceres, regresa a Rocavelo para investigar la sede Galaxia."
    ],
    "check": "Medalla Carámbano, Treparrocas y los tres incidentes de los lagos.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_17",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_18",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_19",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_20",
      "https://www.serebii.net/brilliantdiamondshiningpearl/tms.shtml"
    ],
    "pitfalls": [
      "La solución completa de nieve/hielo aún está pendiente de mapa propio. No se recomienda saltarse el puzle mediante fallos de versiones antiguas."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BD",
      "SP"
    ],
    "mission": "08",
    "location": "Rocavelo → Monte Corona → Columna Lanza",
    "requires": [
      "Siete medallas, Surf, Fuerza y Treparrocas"
    ],
    "steps": [
      "Ante la sede Galaxia de Rocavelo habla con el recluta que abandona la Llave Almacén. Abre con ella el almacén del noroeste y entra en sus sótanos.",
      "Desde el paso subterráneo sube hacia la habitación de dos teletransportadores. El izquierdo continúa; pasa por el siguiente panel y sigue las escaleras hasta volver al sector cerrado del sótano donde está la Llave Galaxia.",
      "Con la Llave Galaxia entra por el edificio principal, abre las puertas y toma el panel al norte de la sala de reclutas para llegar a las camas. Sube y elige el panel izquierdo del grupo de tres para alcanzar a Helio.",
      "Vence a Helio y recibe la Master Ball. Continúa hasta el laboratorio, derrota a Saturno y pulsa el botón que libera a Uxie, Mesprit y Azelf antes de abandonar la sede.",
      "Entra en Monte Corona desde Ruta 207 o 208. Usa Surf y Treparrocas para acceder a las plantas altas, atraviesa los pasos de montaña nevados y sigue a los reclutas hasta Columna Lanza.",
      "En la cima vence al primer bloqueo y combate junto al rival contra Venus y Ceres. Después derrota a Helio para detener su plan y acceder a Dialga en Diamante Brillante o Palkia en Perla Reluciente.",
      "Guarda y prepara la captura del legendario propio. Tras resolver la escena y hablar con Serbal se abre la continuación hacia Ciudad Marina; no se entra en Mundo Distorsión durante este clímax."
    ],
    "check": "Trío liberado, plan de Helio detenido y encuentro propio de Columna Lanza resuelto.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_21",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_22",
      "https://www.serebii.net/brilliantdiamondshiningpearl/teamgalactic.shtml"
    ],
    "pitfalls": [
      "La sede usa dos llaves diferentes. Los teletransportadores se describen para la ruta principal, sin certificar todos los desvíos del edificio ni todos los pasos del monte."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BD",
      "SP"
    ],
    "mission": "09",
    "location": "Ruta 222 → Ciudad Marina",
    "requires": [
      "Incidente de Columna Lanza resuelto"
    ],
    "steps": [
      "Desde Orilla Valor toma Ruta 222 al este hasta Ciudad Marina. La ruta se mantiene bloqueada mientras siga pendiente el clímax del Equipo Galaxia.",
      "Busca a Lectro en el faro del sureste de Marina y habla con él para que vuelva al gimnasio. Después ve al edificio del gimnasio, donde Fausto deja libre la entrada.",
      "Activa los botones de engranajes para crear pasarelas entre las plataformas del gimnasio. No confíes solo en Tierra: el equipo de Lectro incluye Pokémon que no son de tipo Eléctrico.",
      "Vence a Lectro para la Medalla Faro. Habla con Yasmina en la playa del norte de la ciudad para recibir MT99 Cascada y registrarla en el Poké-reloj.",
      "Con las ocho medallas, Surf y Cascada puedes navegar al norte por Ruta 223 hacia la Liga. Guarda recursos de curación, estados y PP para Calle Victoria y los cinco combates finales."
    ],
    "check": "Ocho medallas y Cascada habilitada.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_22",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_23",
      "https://www.serebii.net/brilliantdiamondshiningpearl/tms.shtml"
    ],
    "pitfalls": [
      "El plano completo de engranajes sigue pendiente. La medalla y recibir MT99 son pasos distintos."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BD",
      "SP"
    ],
    "mission": "10",
    "location": "Ruta 223 → Calle Victoria → Liga de Sinnoh",
    "requires": [
      "Ocho medallas y movimientos de campo habilitados"
    ],
    "steps": [
      "Navega al norte por Ruta 223 desde Marina y asciende la cascada hasta el primer Centro Pokémon de la Liga. Entra en Calle Victoria con Surf, Fuerza, Golpe Roca, Treparrocas y Cascada disponibles en el Poké-reloj.",
      "Recorre los pisos principales de Calle Victoria usando los accesos de bloques, paredes escalables y agua. El paso lateral hacia Ruta 224 permanece para el postgame; no es la salida al primer desafío de Liga.",
      "Por la salida norte vuelve a ascender la cascada y llega al edificio principal. Cura y prepara el equipo antes del último combate con el rival junto al acceso.",
      "Vence en orden a Alecrán, Gaia, Fausto y Delos. Prepara respuestas a Bicho, Tierra, los equipos variados de Fausto y Psíquico; estos remakes cambian movimientos, habilidades y objetos respecto a DS.",
      "Cintia completa el desafío con Spiritomb, Roserade, Gastrodon, Lucario, Milotic y Garchomp. No confíes únicamente en Hielo: la Baya Rimoya de Garchomp reduce el primer ataque eficaz de ese tipo.",
      "Vence a Cintia y deja registrar el Hall de la Fama y los créditos. Después revisa los 150 vistos exigidos de Sinnoh para la Nacional: Manaphy no es necesario para ese desbloqueo."
    ],
    "check": "Primer Hall de la Fama y continuación hacia la Pokédex Nacional.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_23",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_24",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_25",
      "https://www.serebii.net/brilliantdiamondshiningpearl/elitefour.shtml"
    ],
    "pitfalls": [
      "El recorrido completo de bloques y plantas de Calle Victoria aún necesita un mapa propio. Las revanchas tienen equipos distintos del primer desafío."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BD",
      "SP"
    ],
    "mission": "12",
    "location": "Sinnoh: Gran Subsuelo, Superconcursos, Nacional y tarjeta",
    "requires": [
      "Kit de Explorador; campeón y Nacional para las partes que lo exigen"
    ],
    "steps": [
      "Para desbloquear la Nacional registra como vistos los 150 Pokémon de Sinnoh que no son Manaphy y habla con Serbal en Pueblo Arena. La abuela de Cintia en Caelestis muestra la imagen del legendario de la otra edición si te falta verlo.",
      "Recibe la Nacional y el Pokéradar en el laboratorio. Ver especies para este desbloqueo y obtenerlas para el reconocimiento nacional son condiciones diferentes; un mítico excluido no sustituye una especie normal ausente.",
      "Usa el Kit de Explorador de Vetusta para entrar al Gran Subsuelo. Excava los destellos de las paredes y recoge cajas con estatuas; busca cien variantes distintas para su objetivo de tarjeta. No se piden las cincuenta banderas de los originales de DS.",
      "Abre y decora tu base con el Taladro que proporciona la progresión del Hombre del Subsuelo. Las estatuas colocadas influyen en los tipos de Pokémon de las guaridas, mientras las variantes obtenidas cuentan para el reconocimiento; no son el mismo contador.",
      "En Superconcursos de Corazón prepara condición con Pokochos, cápsula con sellos y un movimiento apropiado. El espectáculo combina evaluación visual y ritmo; progresa por los rangos inferiores hasta Maestro.",
      "Una victoria de rango Maestro en una categoría ordinaria sirve para su estrella. Para la Cinta Estrella debes completar las cinco categorías con el mismo Pokémon; después de Liga se abre el concurso Brillante o Reluciente propio de la edición, con sus condiciones y cinta adicionales.",
      "En Torre Batalla la estrella exige cien victorias consecutivas en una modalidad: Individual, Doble, Individual Maestro o Doble Maestro. No sumes rachas independientes ni lo confundas con cien victorias totales.",
      "La tarjeta reúne cinco requisitos separados: primer título, registro Nacional exigido, cien variantes de estatuas, un concurso Maestro y una racha de cien. El diagnóstico de registros no acredita entregar un diploma, una estrella concreta ni todas las actividades de la partida."
    ],
    "check": "Nacional, estatuas, concurso y Torre comprobados por separado.",
    "sources": [
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_25",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_26",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_28",
      "https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl/Part_30",
      "https://www.serebii.net/brilliantdiamondshiningpearl/grandunderground.shtml",
      "https://www.serebii.net/brilliantdiamondshiningpearl/supercontests.shtml",
      "https://www.serebii.net/brilliantdiamondshiningpearl/trainercard.shtml"
    ],
    "pitfalls": [
      "Siguen pendientes el inventario individual de MT/objetos, todos los NPC de Spiritomb, formas, sellos, regalos y las rutas exhaustivas de encuentros. Los eventos distribuidos por tiempo y los regalos por otras partidas requieren sus condiciones propias."
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  }
];
 if(typeof module==='object'&&module.exports)module.exports=routes;else root.PokemonBDSPRoutes=routes;
})(globalThis);
