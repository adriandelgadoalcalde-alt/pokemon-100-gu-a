/* Guías redactadas en español a partir de referencias públicas; lectura, no certificación de guardados. */
(function(root){
 'use strict';
 const routes=[
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "01",
    "location": "Pueblo Paleta → Ciudad Verde → laboratorio de Oak",
    "requires": [],
    "steps": [
      "Acércate a la salida norte de Pueblo Paleta para activar la intervención de Oak y sigue la escena del laboratorio. En Rojo, Verde y Azul escoges entre tres iniciales; en Amarillo recibes a Pikachu.",
      "Sube por Ruta 1 hasta Ciudad Verde y entra en la tienda para recibir el paquete destinado al profesor.",
      "Vuelve al laboratorio de Pueblo Paleta, entrega el paquete y recibe la Pokédex. Habla después con la hermana de tu rival para conseguir el mapa.",
      "Regresa a Ciudad Verde con Poké Balls. La demostración del anciano permite continuar hacia Ruta 2 y Bosque Verde."
    ],
    "check": "Pokédex disponible y salida norte de Ciudad Verde accesible.",
    "pitfalls": [
      "El gimnasio de Ciudad Verde corresponde a la octava medalla; no esperes poder completarlo al comenzar."
    ],
    "sources": [
      "https://www.serebii.net/rb/gift.shtml",
      "https://www.serebii.net/yellow/gift.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "02",
    "location": "Ruta 2 → Bosque Verde → Ciudad Plateada",
    "requires": [
      "Pokédex recibida"
    ],
    "steps": [
      "Desde Ciudad Verde cruza Ruta 2 y entra en Bosque Verde. Sigue el camino hasta su salida norte y alcanza Ciudad Plateada.",
      "Cura al equipo y prepara cobertura contra Roca/Tierra para el gimnasio. En Amarillo no dependas de los ataques eléctricos de Pikachu frente a los Pokémon de Brock.",
      "Derrota a Brock y conserva la MT que entrega. Después sal por el este de Ciudad Plateada para recorrer Ruta 3 hacia Monte Moon."
    ],
    "check": "Medalla Roca en la ficha del entrenador.",
    "pitfalls": [
      "Las MT se consumen al enseñarlas en esta generación. Escoge su destinatario antes de usarlas."
    ],
    "sources": [
      "https://www.serebii.net/rb/gyms.shtml",
      "https://www.serebii.net/rb/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "03",
    "location": "Ruta 3 → Monte Moon → Ruta 4",
    "requires": [
      "Acceso al este de Ciudad Plateada"
    ],
    "steps": [
      "Entra en Monte Moon desde Ruta 3. Usa las escaleras para alcanzar las plantas inferiores y avanza hasta el sector donde el Team Rocket busca fósiles.",
      "Derrota al científico que custodia los dos fósiles y elige uno: Helix se convierte en Omanyte; Domo en Kabuto.",
      "Sal hacia Ruta 4. En Amarillo resuelve además el encuentro con Jessie y James junto al final de la cueva.",
      "Llega a Ciudad Celeste. Conserva el fósil para el laboratorio de Isla Canela; no se revive en Monte Moon."
    ],
    "check": "Fósil elegido en la bolsa y llegada a Ciudad Celeste.",
    "pitfalls": [
      "No hay crianza en la generación I. El fósil descartado requiere intercambio u otra partida."
    ],
    "sources": [
      "https://www.serebii.net/rb/teamrocket.shtml",
      "https://www.serebii.net/rb/gift.shtml",
      "https://www.serebii.net/yellow/gift.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "04",
    "location": "Ciudad Celeste → rutas 24 y 25 → casa de Bill",
    "requires": [
      "Salida de Monte Moon"
    ],
    "steps": [
      "Cura al equipo y cruza el Puente Pepita al norte de Ciudad Celeste. Continúa hacia el este por Ruta 25 hasta la casa de Bill.",
      "Habla con Bill transformado y activa su ordenador cuando entre en la máquina. Tras ayudarle, vuelve a hablar con él para recibir el billete del S.S. Anne.",
      "Supera el gimnasio de Misty para recibir la medalla Cascada, necesaria para utilizar Corte fuera de combate.",
      "Pasa por la casa robada de Ciudad Celeste, recupera la MT del recluta y sal hacia Ruta 5; el paso subterráneo conduce a Ruta 6 y Ciudad Carmín."
    ],
    "check": "Billete del barco y medalla Cascada obtenidos.",
    "pitfalls": [
      "En Amarillo puedes recibir a Charmander en Ruta 24 y a Bulbasaur en Ciudad Celeste si se cumple la condición de afecto de Pikachu."
    ],
    "sources": [
      "https://www.serebii.net/rb/gyms.shtml",
      "https://www.serebii.net/rb/teamrocket.shtml",
      "https://www.serebii.net/yellow/gift.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "05",
    "location": "Ciudad Carmín → S.S. Anne",
    "requires": [
      "Billete del S.S. Anne"
    ],
    "steps": [
      "Enseña el billete en el muelle y entra en el barco. Busca la escalera que lleva hacia el camarote del capitán.",
      "Supera el combate con tu rival en el tramo previo al capitán. Ayuda al capitán y recibe MO01 Corte.",
      "Antes de desembarcar, recoge los objetos importantes que quieras conservar del barco, como las MT de Golpe Cuerpo y Descanso.",
      "Enseña Corte a un Pokémon compatible y comprueba que tienes la medalla Cascada. Ya puedes cortar el árbol que bloquea el gimnasio de Ciudad Carmín."
    ],
    "check": "MO01 en la bolsa y acceso al gimnasio de Carmín.",
    "pitfalls": [
      "El barco parte al terminar la visita. Las MO no se consumen, pero sus movimientos no se borran libremente en los originales."
    ],
    "sources": [
      "https://www.serebii.net/rb/tmhm.shtml",
      "https://www.serebii.net/rb/rival.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "06",
    "location": "Gimnasio de Ciudad Carmín",
    "requires": [
      "Corte y medalla Cascada"
    ],
    "steps": [
      "Corta el árbol frente al gimnasio y examina las papeleras hasta encontrar el primer interruptor.",
      "Busca el segundo en una papelera adyacente al primero. Si fallas, vuelve a buscar el primero: el puzle se reinicia.",
      "Cuando se abran las barreras, derrota a Lt. Surge y recibe la medalla Trueno.",
      "En Amarillo, habla después con la agente de Ciudad Carmín para recibir a Squirtle. Para continuar la historia, toma Ruta 11 y el acceso hacia Ruta 9 desde Celeste."
    ],
    "check": "Medalla Trueno; en Amarillo, regalo de Squirtle revisado.",
    "pitfalls": [
      "La segunda papelera correcta depende del estado del puzle. Una ruta fija de papeleras no es fiable."
    ],
    "sources": [
      "https://www.serebii.net/rb/gyms.shtml",
      "https://www.serebii.net/yellow/gift.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "07",
    "location": "Ruta 2 y rutas 9–10 → Túnel Roca → Pueblo Lavanda",
    "requires": [
      "Corte; diez especies capturadas para recibir Destello"
    ],
    "steps": [
      "Si quieres iluminar Túnel Roca, vuelve al edificio de Ruta 2 accesible con Corte: el ayudante de Oak entrega MO05 Destello al registrar diez especies capturadas.",
      "Desde Ciudad Celeste corta el árbol del este para recorrer Ruta 9 hasta Ruta 10. Cura al equipo antes de entrar en Túnel Roca.",
      "Cruza las dos plantas usando sus escaleras hasta salir al tramo sur de Ruta 10 y continúa a Pueblo Lavanda.",
      "Todavía no resuelvas la cima de Torre Pokémon: primero necesitas el Scope Silph del Casino. Sal por Ruta 8 y usa el paso subterráneo hacia Ruta 7 y Ciudad Azulona."
    ],
    "check": "Llegada a Lavanda y acceso a Azulona.",
    "pitfalls": [
      "Destello facilita la orientación; no abre una barrera de progreso por sí mismo. No confundas su ayudante de Ruta 2 con el regalo de Corte."
    ],
    "sources": [
      "https://www.serebii.net/rb/tmhm.shtml",
      "https://www.serebii.net/rb/teamrocket.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "08",
    "location": "Ciudad Azulona: gimnasio, Casino y Guarida Rocket",
    "requires": [
      "Acceso desde Ruta 7"
    ],
    "steps": [
      "Consigue una bebida en el centro comercial para abrir el paso de los guardias a Ciudad Azafrán cuando la necesites. En los originales no se utiliza el Té de los remakes.",
      "Usa Corte para acceder al gimnasio de Erika y conseguir la medalla Arcoíris. El orden respecto a la guarida es flexible.",
      "En el Casino derrota al recluta junto al póster y examina el póster para abrir la entrada secreta.",
      "Recorre las cintas transportadoras y baja hasta el sótano donde un recluta custodia la Llave Ascensor. Tras derrotarlo, vuelve a hablar con él y recoge la llave.",
      "Usa el ascensor para alcanzar la zona de Giovanni. Véncelo y recoge el Scope Silph antes de salir.",
      "Revisa el acceso trasero de la Mansión Azulona para recibir a Eevee. Con la bicicleta, el corredor oeste permitirá llegar a la casa de MO02 Vuelo en Ruta 16."
    ],
    "check": "Scope Silph en la bolsa; medalla Arcoíris si ya completaste el gimnasio.",
    "pitfalls": [
      "El Té pertenece a Rojo Fuego/Verde Hoja. Eevee es un regalo único y hay tres evoluciones distintas sin crianza."
    ],
    "sources": [
      "https://www.serebii.net/rb/teamrocket.shtml",
      "https://www.serebii.net/rb/gift.shtml",
      "https://www.serebii.net/rb/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "09",
    "location": "Torre Pokémon y casa del Sr. Fuji, Pueblo Lavanda",
    "requires": [
      "Scope Silph"
    ],
    "steps": [
      "Regresa a Pueblo Lavanda y sube por Torre Pokémon. Supera al rival y continúa por las plantas superiores.",
      "Usa la zona de curación de la torre si necesitas recuperar al equipo. Con el Scope Silph, el fantasma que bloquea el final se identifica como Marowak.",
      "Derrota al Marowak de la escena; no es una captura disponible. Continúa hasta la última planta y libera al Sr. Fuji de los miembros del Team Rocket.",
      "Habla con Fuji en su casa para recibir la Poké Flauta.",
      "Antes de interactuar con los Snorlax de las rutas 12 o 16, guarda la partida. La flauta activa sus encuentros y abre los caminos hacia Fucsia."
    ],
    "check": "Poké Flauta y paso de al menos uno de los Snorlax resuelto.",
    "pitfalls": [
      "En la generación I no existen naturalezas. Si debilitas un encuentro único, no cuentes con el mecanismo de reaparición de juegos posteriores."
    ],
    "sources": [
      "https://www.serebii.net/rb/teamrocket.shtml",
      "https://www.serebii.net/rb/interact.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "10",
    "location": "Ciudad Fucsia: Zona Safari, casa del guarda y gimnasio",
    "requires": [
      "Acceso por las rutas 12–15 o por el carril bici"
    ],
    "steps": [
      "Entra en la Zona Safari con espacio en la bolsa y avanza hacia el área más alejada. Si se agotan los pasos, tendrás que pagar otra entrada.",
      "Recoge los Dientes de Oro y entra en la Casa Secreta de esa zona para recibir MO03 Surf.",
      "Sal de la Zona Safari y entrega los Dientes de Oro al guarda de Ciudad Fucsia para conseguir MO04 Fuerza.",
      "En el gimnasio de Koga, sigue los huecos de las paredes invisibles hasta alcanzar al líder. La medalla Alma permite usar Surf fuera del combate.",
      "Comprueba qué Pokémon llevarán Surf y Fuerza. Con medalla Arcoíris puedes utilizar Fuerza; Surf abre las rutas marítimas hacia Islas Espuma e Isla Canela."
    ],
    "check": "Surf, Fuerza y medalla Alma obtenidos.",
    "pitfalls": [
      "No abandones Fucsia solo con Surf: los Dientes de Oro son necesarios para recibir Fuerza y resolver puzles posteriores."
    ],
    "sources": [
      "https://www.serebii.net/rb/tmhm.shtml",
      "https://www.serebii.net/rb/gyms.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "11",
    "location": "Ciudad Azafrán: Silph S.A., Dojo y gimnasio",
    "requires": [
      "Acceso a Azafrán abierto mediante una bebida"
    ],
    "steps": [
      "Entra en Silph S.A. y busca la Llave Magnética en la quinta planta. Permite abrir las puertas bloqueadas del edificio.",
      "Vuelve a la tercera planta y utiliza el teletransportador de la sala accesible con la llave para llegar a la zona del rival en la séptima.",
      "Derrota al rival y habla con el empleado que regala a Lapras. Usa el siguiente teletransportador para alcanzar la planta de Giovanni.",
      "Derrota a Giovanni y habla con el presidente para recibir la Master Ball. No basta con salir del edificio tras el combate.",
      "Completa el gimnasio de Sabrina una vez retirado el bloqueo. El Dojo de al lado es independiente: su premio permite escoger Hitmonlee o Hitmonchan."
    ],
    "check": "Medalla Pantano, Silph liberada y Master Ball recibida.",
    "pitfalls": [
      "El luchador no escogido requiere intercambio u otra partida. Una captura de Lapras por intercambio no sustituye la revisión de su regalo único."
    ],
    "sources": [
      "https://www.serebii.net/rb/teamrocket.shtml",
      "https://www.serebii.net/rb/gift.shtml",
      "https://www.serebii.net/rb/gyms.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "12",
    "location": "Isla Canela: Mansión, laboratorio y gimnasio",
    "requires": [
      "Surf y medalla Alma"
    ],
    "steps": [
      "Llega a Isla Canela desde Pueblo Paleta o por Islas Espuma. En el laboratorio puedes revivir el fósil de Monte Moon y el Ámbar Viejo del Museo de Ciudad Plateada.",
      "Entra en la Mansión Pokémon. Examina los interruptores de las estatuas para alternar las puertas y alcanzar los niveles superiores.",
      "Utiliza los huecos del suelo en la planta superior para acceder al sector que conduce al sótano. Busca allí la Llave Secreta.",
      "Sal de la mansión, abre el gimnasio con la llave y resuelve sus preguntas o combates para llegar a Blaine.",
      "Derrota a Blaine y conserva la medalla Volcán. Vuelve a recoger del laboratorio los Pokémon revividos que dejaste en proceso."
    ],
    "check": "Medalla Volcán y regalos de fósiles revisados.",
    "pitfalls": [
      "Las Islas Sete pertenecen a Rojo Fuego/Verde Hoja; no hay un viaje a ellas en los originales de generación I."
    ],
    "sources": [
      "https://www.serebii.net/rb/gift.shtml",
      "https://www.serebii.net/rb/gyms.shtml",
      "https://www.serebii.net/rb/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "13",
    "location": "Gimnasio de Ciudad Verde",
    "requires": [
      "Las siete medallas anteriores"
    ],
    "steps": [
      "Regresa a Ciudad Verde tras conseguir la medalla Volcán. El gimnasio antes cerrado está disponible.",
      "Resuelve el recorrido de las baldosas de movimiento hasta llegar a Giovanni. Un ataque de Agua, Planta o Hielo puede ayudar frente a sus Pokémon de Tierra.",
      "Derrota a Giovanni y recibe la medalla Tierra. Revisa que tu ficha tenga ocho medallas.",
      "Prepara Surf y Fuerza para el camino de la Liga y sal hacia Ruta 22. Supera al rival antes de los controles de Ruta 23."
    ],
    "check": "Ocho medallas y controles de acceso a la Liga superables.",
    "pitfalls": [
      "El nivel de los Pokémon intercambiados y su obediencia no sustituye los requisitos de medalla para las MO."
    ],
    "sources": [
      "https://www.serebii.net/rb/gyms.shtml",
      "https://www.serebii.net/rb/rival.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "14",
    "location": "Ruta 23 → Calle Victoria → Meseta Añil",
    "requires": [
      "Ocho medallas, Surf y Fuerza"
    ],
    "steps": [
      "Cruza los controles de medallas de Ruta 23 y navega el tramo de agua para llegar a Calle Victoria.",
      "En Calle Victoria empuja las rocas sobre los interruptores que eliminan las barreras. Si una roca queda mal colocada, cambia de planta y vuelve para restablecer su posición.",
      "Antes de dejar la cueva, decide si quieres intentar ya el encuentro con Moltres; no es obligatorio para llegar a la Liga.",
      "En Meseta Añil prepara curaciones y recursos de PP. La secuencia de combates es Lorelei, Bruno, Agatha, Lance y el rival Campeón.",
      "Supera los cinco combates y deja que se registre el equipo en el Hall de la Fama. La entrada a Cueva Celeste queda como siguiente objetivo de postgame."
    ],
    "check": "Primer registro en el Hall de la Fama.",
    "pitfalls": [
      "No hay tipo Siniestro, Acero ni Hada en esta generación; las recomendaciones de combate de remakes pueden no servir."
    ],
    "sources": [
      "https://www.serebii.net/rb/elitefour.shtml",
      "https://www.serebii.net/rb/legends.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "15",
    "location": "Central de Energía, Islas Espuma, Calle Victoria y Cueva Celeste",
    "requires": [
      "Surf; Fuerza para el puzle de Espuma; Liga superada para Cueva Celeste"
    ],
    "steps": [
      "Para Zapdos, vuelve al Centro Pokémon de Ruta 10 y usa Surf por el agua que conduce a la Central. Recorre su interior hasta la sala del ave.",
      "Para Articuno, entra en Islas Espuma con Surf y Fuerza. Empuja las rocas por los agujeros hasta los niveles inferiores para bloquear las corrientes que impiden navegar hacia su plataforma.",
      "Para Moltres, vuelve a Calle Victoria y accede a su plataforma interior. Su ubicación en Monte Ascuas corresponde a los remakes, no a estos cartuchos.",
      "Tras la Liga, usa Surf desde Ciudad Celeste para llegar a Cueva Celeste. Sigue las escaleras del laberinto hasta el nivel profundo de Mewtwo.",
      "Guarda antes de cada encuentro único, debilita sin envenenar ni quemar y usa sueño o parálisis para facilitar la captura. Las aves están al nivel 50 y Mewtwo al 70."
    ],
    "check": "Cada especie registrada y cada encuentro original revisado de manera independiente.",
    "pitfalls": [
      "Una Pokédex con las cuatro especies no acredita que se hayan resuelto estos cuatro escenarios. En los originales pueden perderse al debilitarlos."
    ],
    "sources": [
      "https://www.serebii.net/rb/legends.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "16",
    "location": "Kanto: regalos, evoluciones, intercambios y diploma",
    "requires": [
      "Historia completada para revisar todas las zonas"
    ],
    "steps": [
      "Revisa las elecciones únicas: inicial, Helix/Domo y Hitmonlee/Hitmonchan. No se puede obtener la alternativa de cada elección mediante crianza en estos juegos.",
      "Revisa los regalos de Eevee, Lapras y los tres fósiles revividos. Eevee solo puede producir una evolución por ejemplar; busca intercambios para las otras dos.",
      "Completa las evoluciones por intercambio de Kadabra, Machoke, Graveler y Haunter. Prepara intercambios de exclusivos usando la lista exacta de tu edición y región.",
      "En Amarillo revisa además los regalos de Bulbasaur, Charmander y Squirtle; el Pikachu inicial no evoluciona con Piedra Trueno dentro de esa partida.",
      "Contrasta las 150 especies requeridas para el diploma con el evaluador de Pokédex. Mew es un apartado histórico separado y no debe bloquear ese diploma.",
      "Revisa las MO de acceso y las MT importantes para tus objetivos; los entrenadores secundarios y los objetos sueltos triviales quedan fuera de esta guía."
    ],
    "check": "Diploma revisado junto al número real de especies capturadas y las elecciones únicas.",
    "pitfalls": [
      "Verde japonés y Azul japonés no comparten necesariamente los intercambios internos de las ediciones occidentales. Mantén la región en tu planificación."
    ],
    "sources": [
      "https://www.serebii.net/rb/gift.shtml",
      "https://www.serebii.net/yellow/gift.shtml",
      "https://www.serebii.net/rb/greenblue.shtml",
      "https://www.serebii.net/rb/exclusives.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RED",
      "GREEN",
      "BLUE",
      "YELLOW"
    ],
    "mission": "DETAIL1",
    "location": "Central de Energía, Islas Espuma, Calle Victoria y Cueva Celeste",
    "requires": [
      "Surf; Fuerza para el puzle de Espuma; Liga superada para Cueva Celeste"
    ],
    "steps": [
      "Para Zapdos, vuelve al Centro Pokémon de Ruta 10 y usa Surf por el agua que conduce a la Central. Recorre su interior hasta la sala del ave.",
      "Para Articuno, entra en Islas Espuma con Surf y Fuerza. Empuja las rocas por los agujeros hasta los niveles inferiores para bloquear las corrientes que impiden navegar hacia su plataforma.",
      "Para Moltres, vuelve a Calle Victoria y accede a su plataforma interior. Su ubicación en Monte Ascuas corresponde a los remakes, no a estos cartuchos.",
      "Tras la Liga, usa Surf desde Ciudad Celeste para llegar a Cueva Celeste. Sigue las escaleras del laberinto hasta el nivel profundo de Mewtwo.",
      "Guarda antes de cada encuentro único, debilita sin envenenar ni quemar y usa sueño o parálisis para facilitar la captura. Las aves están al nivel 50 y Mewtwo al 70."
    ],
    "check": "Cada especie registrada y cada encuentro original revisado de manera independiente.",
    "pitfalls": [
      "Una Pokédex con las cuatro especies no acredita que se hayan resuelto estos cuatro escenarios. En los originales pueden perderse al debilitarlos."
    ],
    "sources": [
      "https://www.serebii.net/rb/legends.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "GOLD",
      "SILVER",
      "CRYSTAL"
    ],
    "mission": "10",
    "location": "Pueblo Olivo → S.S. Aqua → Ciudad Carmín",
    "requires": [
      "Primera Liga superada; billete del S.S. Aqua recibido de Elm"
    ],
    "steps": [
      "Vuelve a Pueblo Primavera después de la Liga y habla con Elm para recibir el billete del S.S. Aqua.",
      "Viaja a Ciudad Olivo y embarca. Dentro del barco habla con el abuelo que busca a su nieta.",
      "Resuelve la intervención del marinero que bloquea la zona del capitán y encuentra a la niña. Regresa con ella al abuelo para completar el viaje.",
      "Desembarca en Ciudad Carmín. Usa esta ciudad como inicio del recorrido de Kanto y revisa el gimnasio de Lt. Surge.",
      "El Magnetotrén todavía necesita que restaures la Central y consigas su pase; no lo uses como requisito de llegada a Kanto."
    ],
    "check": "Llegada a Kanto; viaje inicial del barco resuelto.",
    "pitfalls": [
      "El S.S. Aqua no es el S.S. Anne de la primera generación."
    ],
    "sources": [
      "https://www.serebii.net/gs/gyms.shtml",
      "https://www.serebii.net/gs/items.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "GOLD",
      "SILVER",
      "CRYSTAL"
    ],
    "mission": "11",
    "location": "Central de Energía → Ciudad Celeste → Ruta 25",
    "requires": [
      "Acceso a Kanto"
    ],
    "steps": [
      "Llega a la Central de Energía por Ruta 9 y Surf en Ruta 10. Habla con el director para conocer el robo de la pieza.",
      "Vuelve a Ciudad Celeste y entra en el gimnasio: el recluta que aparece huye hacia el Puente Pepita.",
      "Encuéntralo al norte y véncelo. Su información permite buscar la Pieza Máquina en el gimnasio de Celeste; en Oro/Plata/Cristal está escondida en el agua, junto al sector de flotadores.",
      "Devuelve la pieza al director de la Central. La restauración permite avanzar con radio, Magnetotrén y ciertos líderes.",
      "Encuentra a Misty en Ruta 25 para que regrese al gimnasio. En la Torre Radio de Lavanda habla con el empleado que entrega la ampliación de la radio para Kanto."
    ],
    "check": "Central reparada, Misty disponible y ampliación de radio recibida.",
    "pitfalls": [
      "La ubicación concreta de la pieza cambia en HGSS. No sigas el escondite del remake al jugar Oro/Plata/Cristal."
    ],
    "sources": [
      "https://www.serebii.net/gs/teamrocket.shtml",
      "https://www.serebii.net/gs/items.shtml",
      "https://www.serebii.net/gs/gyms.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "GOLD",
      "SILVER",
      "CRYSTAL"
    ],
    "mission": "12",
    "location": "Kanto: Carmín, Azafrán, Azulona, Fucsia, Celeste, Plateada e Islas Espuma",
    "requires": [
      "Llegada a Kanto; Central restaurada para completar la cadena de accesos"
    ],
    "steps": [
      "Obtén las medallas de Lt. Surge, Sabrina, Erika y Janina en sus respectivos gimnasios. Kanto permite cierta flexibilidad de orden.",
      "Completa el regreso de Misty al gimnasio y derrótala. Para abrir la ruta hacia el oeste, sitúate junto al Snorlax frente a Cueva Diglett y sintoniza la Poké Flauta en la radio antes de hablarle.",
      "Cruza Cueva Diglett, usa Corte en la salida y llega a Ciudad Plateada para enfrentarte a Brock.",
      "Al sur, visita Isla Canela: el gimnasio original ha desaparecido y Blaine está en Islas Espuma. Navega hasta allí para obtener su medalla.",
      "Habla con Azul en Isla Canela cuando lleves siete medallas de Kanto y vuelve al gimnasio de Ciudad Verde para la octava.",
      "Con las 16 medallas, visita al profesor Oak en Pueblo Paleta para habilitar el acceso al Monte Plateado."
    ],
    "check": "16 medallas y permiso de Oak para Monte Plateado.",
    "pitfalls": [
      "No busques a Koga como líder de Fucsia: ahora está en el Alto Mando. No necesitas vencer otra vez la Liga para obtener la última medalla de Kanto."
    ],
    "sources": [
      "https://www.serebii.net/gs/gyms.shtml",
      "https://www.serebii.net/gs/red.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "GOLD",
      "SILVER",
      "CRYSTAL"
    ],
    "mission": "13",
    "location": "Ruta 28 → Monte Plateado",
    "requires": [
      "16 medallas y permiso de Oak"
    ],
    "steps": [
      "Desde el edificio de enlace de Ruta 22 entra en la salida oeste hacia Ruta 28 y llega al Centro Pokémon del Monte Plateado.",
      "Lleva Destello para orientarte en la zona oscura y prepara recursos de combate antes de subir. Surf y Cascada sirven para explorar ramales, pero no debes confundirlos con la ruta mínima hacia Rojo.",
      "Recorre la cueva hasta el último sector y habla con Rojo para iniciar el combate. Su equipo contiene Pikachu, Espeon, Snorlax y los tres iniciales evolucionados de Kanto.",
      "Supera el combate y deja terminar los créditos. Si quieres una revancha posterior, vuelve a completar la Liga para que reaparezca."
    ],
    "check": "Victoria frente a Rojo revisada en esta edición.",
    "pitfalls": [
      "Oro/Plata/Cristal no utilizan Treparrocas: ese requisito corresponde a HGSS. La ausencia actual de Rojo no proporciona por sí sola una cronología completa."
    ],
    "sources": [
      "https://www.serebii.net/gs/red.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "GOLD"
    ],
    "mission": "14",
    "location": "Torre Quemada, rutas de Johto, Torre Hojalata e Islas Remolino",
    "requires": [
      "Liberar las bestias en Torre Quemada; alas correspondientes"
    ],
    "steps": [
      "Entra en el sótano de Torre Quemada y acércate a las tres bestias para liberarlas. Raikou, Entei y Suicune pasarán a deambular por Johto.",
      "Tras el primer encuentro con una bestia, usa su ficha de Pokédex para consultar su zona. Cambiar de ruta modifica su posición; conserva los estados y el daño entre encuentros.",
      "Guarda antes de las capturas: debilitar una bestia no activa las reapariciones de juegos modernos. Prepara una estrategia de captura que tenga en cuenta tanto Huida como Rugido.",
      "Al terminar el episodio de la Torre Radio recibes el Ala Arcoíris. Sube la Torre Hojalata para encontrar a Ho-Oh al nivel 40.",
      "En Kanto, el anciano de Ciudad Plateada entrega el Ala Plateada para buscar a Lugia al nivel 70 en Islas Remolino."
    ],
    "check": "Bestias y ambas aves revisadas por escenario; registro de especie separado del encuentro.",
    "pitfalls": [
      "Los niveles y el procedimiento no son los de Cristal ni HGSS."
    ],
    "sources": [
      "https://www.serebii.net/gs/legends.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SILVER"
    ],
    "mission": "14",
    "location": "Torre Quemada, rutas de Johto, Torre Hojalata e Islas Remolino",
    "requires": [
      "Liberar las bestias en Torre Quemada; alas correspondientes"
    ],
    "steps": [
      "Entra en el sótano de Torre Quemada y acércate a las tres bestias para liberarlas. Raikou, Entei y Suicune pasarán a deambular por Johto.",
      "Tras el primer encuentro con una bestia, usa su ficha de Pokédex para consultar su zona. Cambiar de ruta modifica su posición; conserva los estados y el daño entre encuentros.",
      "Guarda antes de las capturas: debilitar una bestia no activa las reapariciones de juegos modernos. Prepara una estrategia de captura que tenga en cuenta tanto Huida como Rugido.",
      "Al terminar el episodio de la Torre Radio recibes el Ala Plateada. Lleva Surf y Torbellino a Islas Remolino para encontrar a Lugia al nivel 40.",
      "En Kanto, el anciano de Ciudad Plateada entrega el Ala Arcoíris para buscar a Ho-Oh al nivel 70 en la Torre Hojalata."
    ],
    "check": "Bestias y ambas aves revisadas por escenario; registro de especie separado del encuentro.",
    "pitfalls": [
      "Los niveles y el procedimiento no son los de Cristal ni HGSS."
    ],
    "sources": [
      "https://www.serebii.net/gs/legends.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "CRYSTAL"
    ],
    "mission": "14",
    "location": "Johto: bestias, Torre Hojalata e Islas Remolino",
    "requires": [
      "Torre Quemada y episodio de Torre Radio resueltos para la Campana Clara"
    ],
    "steps": [
      "Libera a las tres bestias en Torre Quemada. Raikou y Entei deambulan; Suicune tiene una cadena propia de apariciones y un encuentro fijo.",
      "Continúa la historia y las escenas de Eusine y Suicune. Con la Campana Clara, regresa al acceso de Torre Hojalata y supera las pruebas de los sabios para encontrar a Suicune.",
      "Captura a Suicune y a las otras dos bestias en esta partida. Revisa con Eusine y los sabios la obtención del Ala Arcoíris y el acceso a Ho-Oh; no sustituyas ese requisito por tres especies recibidas sin revisar su procedencia.",
      "Después de la Liga, consigue el Ala Plateada del anciano de Ciudad Plateada y ve a Islas Remolino por Lugia. Las dos aves de Cristal aparecen al nivel 60."
    ],
    "check": "Cadena de Suicune y requisitos de cada ala revisados.",
    "pitfalls": [
      "La Campana Clara no es el Ala Arcoíris. No copies a Cristal el Suicune errante de Oro/Plata."
    ],
    "sources": [
      "https://www.serebii.net/crystal/legends.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "GOLD",
      "SILVER",
      "CRYSTAL"
    ],
    "mission": "15",
    "location": "Johto y Kanto: Ruinas Alfa, regalos, evoluciones y actividades periódicas",
    "requires": [
      "Acceso a las zonas correspondientes"
    ],
    "steps": [
      "Resuelve los cuatro puzles de Ruinas Alfa para ampliar los grupos de Unown. En la generación II hay 26 formas, de la A a la Z; no se exigen las formas ! y ? de juegos posteriores.",
      "Revisa los regalos de Togepi, Eevee, Shuckle y Tyrogue, junto a las evoluciones por amistad, hora, piedras, intercambio y objetos equipados.",
      "Planifica el Concurso de Captura de Bichos, los encuentros semanales como Lapras y las recompensas relevantes del día. Anota qué depende del reloj antes de desplazarte.",
      "Completa la Pokédex con exclusivos e intercambios de la generación I mediante Cápsula del Tiempo cuando sea compatible. No envíes especies o movimientos que la generación I no reconoce.",
      "En Cristal añade su Torre Batalla y revisa por separado Celebi: la distribución antigua de cartucho y el evento habilitado en Consola Virtual tienen disponibilidad distinta."
    ],
    "check": "Colecciones y retos revisados sin exigir una tarjeta de estrellas inexistente en estos juegos.",
    "pitfalls": [
      "Las hojas brillantes, Pokéathlon y las cuatro cámaras secretas de HGSS no deben trasladarse sin más a los originales."
    ],
    "sources": [
      "https://www.serebii.net/gs/dailyevent.shtml",
      "https://www.serebii.net/gs/gift.shtml",
      "https://www.serebii.net/gs/timecapsule.shtml",
      "https://www.serebii.net/crystal/virtualconsole.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "EMERALD"
    ],
    "mission": "DETAIL1",
    "location": "Ruta 134 → Cámara Sellada; desierto, Ruta 105 y Ruta 120",
    "requires": [
      "Surf, Buceo, Excavar, Golpe Roca y Destello; Wailord y Relicanth"
    ],
    "steps": [
      "Navega por las corrientes de Ruta 134 hasta el punto de Buceo que conduce a Cámara Sellada. Lee la inscripción submarina y emerge dentro de la cámara.",
      "En la pared del fondo utiliza Excavar para abrir la sala siguiente. Coloca a Wailord primero y a Relicanth último y vuelve a leer la inscripción del fondo para abrir las tres ruinas.",
      "Para Regirock, entra en la ruina del desierto de Ruta 111. Tras leer el braille, muévete dos pasos a la izquierda y dos abajo y utiliza Golpe Roca.",
      "Para Regice, ve a la ruina de Ruta 105. Lee la inscripción y da una vuelta completa en sentido horario pegado a las paredes.",
      "Para Registeel, entra en la ruina de Ruta 120 y utiliza Destello en el centro de la sala.",
      "Guarda antes de hablar con cada Regi. Los tres encuentros son al nivel 40."
    ],
    "check": "Puertas de las tres ruinas abiertas y sus encuentros revisados.",
    "pitfalls": [
      "En Rubí/Zafiro cambia tanto el orden de Wailord/Relicanth como la solución de cada sala. No uses allí estas instrucciones."
    ],
    "sources": [
      "https://www.serebii.net/emerald/regi.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "EMERALD"
    ],
    "mission": "DETAIL2",
    "location": "Frente Batalla",
    "requires": [
      "Liga superada y acceso al Frente Batalla"
    ],
    "steps": [
      "Viaja al Frente y prepara un equipo legal para las modalidades que quieras jugar; las instalaciones tienen reglas distintas y no basta con una racha única compartida.",
      "Abre un registro separado para Torre, Cúpula, Dojo, Fábrica, Sierpe, Palacio y Pirámide.",
      "En Torre busca los combates contra Destra tras 35 y 70 victorias; en Cúpula, contra Tactio tras cinco y diez torneos ganados.",
      "En Dojo los hitos son 28 y 56 combates; en Fábrica, 21 y 42; en Palacio, 21 y 42. La Fábrica usa Pokémon de alquiler.",
      "En Sierpe los hitos son 28 y 140 salas; en Pirámide, 21 y 70 pisos. No conviertas salas o pisos en victorias de combate.",
      "Comprueba en la ficha del Frente los siete símbolos de plata y los siete de oro. El criterio oficial de tarjeta exige el conjunto de oro."
    ],
    "check": "Símbolos comprobados por instalación y color.",
    "pitfalls": [
      "Una racha de Torre no acredita los otros seis edificios. Las denominaciones y contadores de Platino/HGSS son distintos."
    ],
    "sources": [
      "https://www.serebii.net/emerald/frontier.shtml",
      "https://www.serebii.net/emerald/tower.shtml",
      "https://www.serebii.net/emerald/dome.shtml",
      "https://www.serebii.net/emerald/arena.shtml",
      "https://www.serebii.net/emerald/factory.shtml",
      "https://www.serebii.net/emerald/palace.shtml",
      "https://www.serebii.net/emerald/pike.shtml",
      "https://www.serebii.net/emerald/pyramid.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "EMERALD"
    ],
    "mission": "13",
    "location": "Hoenn tras la Liga: Pilar Celeste, cuevas climáticas y errantes",
    "requires": [
      "Liga superada para abrir todos los objetivos de este tramo"
    ],
    "steps": [
      "Regresa al Pilar Celeste con la Bici Carrera y supera los suelos agrietados para llegar a Rayquaza. Guarda antes del encuentro.",
      "Consulta al científico del Instituto Meteorológico para localizar la anomalía climática actual: sus indicaciones llevan a Cueva Terrena o Cueva Marina. Ve a la ruta indicada antes de que cambie la anomalía.",
      "Resuelve por separado las capturas de Groudon y Kyogre. Para la cueva submarina necesitarás Surf y Buceo.",
      "Comprueba qué color escogiste en la televisión de tu casa tras la Liga: determina si Latias o Latios deambula. El otro necesita el acceso histórico de Isla del Sur.",
      "Revisa el pasadizo del fósil restante, la ampliación de Zona Safari y los regalos de postgame antes de dar por terminada la colección regional."
    ],
    "check": "Rayquaza, las dos cuevas climáticas y el errante elegible revisados.",
    "pitfalls": [
      "Isla Suprema, Isla Origen, Roca Ombligo e Isla del Sur tienen condiciones de distribución; no se desbloquean únicamente completando la Liga."
    ],
    "sources": [
      "https://www.serebii.net/emerald/legendary.shtml",
      "https://www.serebii.net/emerald/tunnel.shtml",
      "https://www.serebii.net/emerald/safarizone.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "E02",
    "location": "Isla Origen y Roca Ombligo",
    "requires": [
      "Acceso a la región insular y billetes de evento válidos"
    ],
    "steps": [
      "Distingue la versión: en los cartuchos GBA originales, Ori-Ticket y Misti-Ticket dependían de distribuciones de evento; en la reedición oficial de Switch se entregan al entrar en el Hall de la Fama. El Ori-Ticket corresponde a Isla Origen y el Misti-Ticket a Roca Ombligo.",
      "En Isla Origen, interactúa con el triángulo y acércate a cada nueva posición por el recorrido más corto. Si se reinicia el puzle, repite desde el comienzo sin dar pasos innecesarios.",
      "Tras completar el triángulo aparece Deoxys. Guarda antes del encuentro y revisa que su forma depende del juego donde se encuentre.",
      "En Roca Ombligo usa la bifurcación interior: el ascenso conduce a Ho-Oh y el descenso a Lugia. Son dos encuentros diferentes.",
      "Registra aparte si solo has obtenido estas especies por intercambio. Eso no prueba que tu partida tenga habilitadas las islas."
    ],
    "check": "Versión, acceso y encuentros de cada isla diferenciados.",
    "pitfalls": [
      "En GBA original, repetir la Liga no entrega estos tickets. En Switch, si no aparecen tras el Hall de la Fama, revisa ambos objetos y vuelve con al menos un Pokémon sin la Cinta Campeón: la entrega está dentro de la concesión de una cinta nueva y condicionada a no llevar ya el Ori-Ticket. Un ticket aislado importado no demuestra que estén activadas las rutas del barco."
    ],
    "sources": [
      "https://www.serebii.net/fireredleafgreen/legendary.shtml",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/src/post_battle_event_funcs.c",
      "https://www.pokemon.com/uk/news/pokemon-firered-version-and-pokemon-leafgreen-version-link-with-pokemon-home-this-october"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "DIAMOND",
      "PEARL"
    ],
    "mission": "11",
    "location": "Zona Batalla, Montaña Dura e Isla Plenilunio",
    "requires": [
      "Liga superada; Pokédex de Sinnoh vista y mejora Nacional"
    ],
    "steps": [
      "Completa los avistamientos de la Pokédex de Sinnoh y visita al profesor Serbal en Pueblo Arena para recibir la mejora Nacional. Haber llegado al final no garantiza haber visto todas las entradas.",
      "Desde Ciudad Puntaneva toma el barco hacia la Zona Combate. Tras los desbloqueos, recorre las rutas de la isla para llegar a Montaña Dura.",
      "Avanza junto a Bulgur hasta la sala de la Piedra Magma. Después vuelve a hablar con él en Zona Sobrevivir y regresa a la sala final para encontrar a Heatran.",
      "En Ciudad Canal visita la casa del marinero y revisa la enfermedad de su hijo. Viaja a Isla Plenilunio, interactúa con Cresselia y recoge la Pluma Lunar para devolverla al niño.",
      "Cresselia pasa a deambular; consulta su posición y prepara el encuentro. Para Regigigas necesitas llevar a Regirock, Regice y Registeel al Templo Puntaneva.",
      "Lleva por separado los objetivos históricos de Darkrai y Shaymin: necesitan sus condiciones de distribución; la mejora Nacional no los activa automáticamente."
    ],
    "check": "Mejora Nacional, zona insular, Heatran y cadena de la Pluma Lunar revisados.",
    "pitfalls": [
      "La historia de Montaña Dura, los niveles y los accesos de Platino presentan diferencias."
    ],
    "sources": [
      "https://www.serebii.net/diamondpearl/legendaries.shtml",
      "https://www.serebii.net/diamondpearl/national.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "PLATINUM"
    ],
    "mission": "11",
    "location": "Zona Batalla, Montaña Dura, Columna Lanza y Kanto errante en Sinnoh",
    "requires": [
      "Liga superada; mejora Nacional de Pokédex"
    ],
    "steps": [
      "Completa los avistamientos de Sinnoh y consigue la Pokédex Nacional de Serbal. Viaja a la Zona Batalla desde Ciudad Puntaneva.",
      "Continúa hasta Montaña Dura y resuelve el episodio de Plutón con Bulgur. Tras el cierre y los diálogos en Zona Sobrevivir, regresa a la sala interior para encontrar a Heatran al nivel 50.",
      "Ayuda al hijo del marinero de Ciudad Canal mediante el viaje a Isla Plenilunio y la Pluma Lunar. Cresselia comienza a deambular después del encuentro.",
      "Busca la Diamansfera y la Lustresfera en Monte Corona y habla con la abuela de Cintia en Pueblo Caelestis. Regresa a Columna Lanza para revisar los portales de Dialga y Palkia por separado.",
      "Habla con Oak en Ciudad Vetusta para activar el recorrido de Articuno, Zapdos y Moltres. Las tres aves son errantes en Platino.",
      "En Templo Puntaneva, Regigigas requiere el trío Regi en el equipo. No confundas ese encuentro con las tres cuevas adicionales habilitadas por un Regigigas de evento."
    ],
    "check": "Cada cadena de postgame y sus accesos revisados por separado.",
    "pitfalls": [
      "Los tres Regis de las cuevas especiales requieren un Regigigas de distribución válido: uno cualquiera recibido por intercambio no garantiza ese acceso."
    ],
    "sources": [
      "https://www.serebii.net/platinum/legends.shtml",
      "https://www.serebii.net/platinum/regigigas.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "PLATINUM"
    ],
    "mission": "12",
    "location": "Sinnoh: concursos, Subsuelo, Pokédex y Frente Batalla",
    "requires": [
      "Acceso a cada instalación y mejora Nacional para la colección ampliada"
    ],
    "steps": [
      "En Ciudad Corazón prepara un Pokémon para las rondas de apariencia, baile y actuación de los Superconcursos; los atributos y el repertorio de combate no sustituyen la preparación de concurso.",
      "En el Subsuelo organiza con otro jugador la captura de banderas para mejorar el nivel de tu base. Comprueba el reconocimiento de Bandera Platino en su registro.",
      "En el Frente registra por separado Torre, Fábrica, Escenario, Castillo y Ruleta. Cada instalación tiene contador y reglas propios.",
      "Para la tarjeta, distingue el reto de 100 victorias consecutivas de Torre de obtener las cinco parejas de reconocimientos del Frente; no son el mismo objetivo.",
      "Revisa las especies por miel, Gran Pantano, jardín, enjambres y Poké Radar, además de los regalos y los intercambios. Los eventos de distribución permanecen en una lista de legado."
    ],
    "check": "Reconocimientos de concurso, base y combate comprobados en sus pantallas.",
    "pitfalls": [
      "El Escenario evalúa combates con un solo Pokémon; las rachas de otra instalación no lo completan."
    ],
    "sources": [
      "https://www.serebii.net/platinum/battlefrontier.shtml",
      "https://www.serebii.net/platinum/supercontests.shtml",
      "https://www.serebii.net/platinum/underground.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD"
    ],
    "mission": "E02",
    "location": "Monte Plateado → laboratorio de Oak → casa del Sr. Pokémon → Torre Oculta",
    "requires": [
      "16 medallas; Surf y Treparrocas para el acceso a Torre Oculta"
    ],
    "steps": [
      "Si todavía no has vencido a Rojo, completa el permiso de Oak y el ascenso al Monte Plateado. El diagnóstico no debe sustituir esa victoria por el simple hecho de tener 16 medallas.",
      "Tras vencer a Rojo, vuelve al laboratorio de Oak en Pueblo Paleta y recibe el inicial de Kanto. El regalo es una escena distinta de la entrega de Treparrocas.",
      "Con el regalo de Oak revisado, visita la casa del Sr. Pokémon en Ruta 30 para recibir Orbe Azul. Si ya está en tu bolsa, continúa directamente hacia la torre.",
      "Desde Ciudad Orquídea recorre el acceso a la Ruta 47 por el interior de Cueva Acantilado. Baja a la costa y usa Surf y Treparrocas para alcanzar la entrada de Torre Oculta.",
      "Guarda antes de interactuar con Kyogre y resuelve su encuentro. Registra por separado tener la especie en Pokédex y haberla obtenido en esta torre.",
      "Para Rayquaza necesitarás mostrar a Oak el Kyogre y el Groudon procedentes de estos encuentros de HGSS. El ejemplar de la otra versión requiere intercambio; los procedentes de generaciones anteriores no sustituyen ese requisito."
    ],
    "check": "Encuentro de Kyogre revisado; escenas previas y objeto actual conservan evidencia independiente.",
    "pitfalls": [
      "El objeto ya poseído evita repetir su entrega, pero no certifica retroactivamente cada diálogo. El trío no se habilita solo por completar una Pokédex."
    ],
    "sources": [
      "https://www.serebii.net/heartgoldsoulsilver/legends.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "HEARTGOLD"
    ],
    "mission": "DETAIL1",
    "location": "Monte Plateado → laboratorio de Oak → casa del Sr. Pokémon → Torre Oculta",
    "requires": [
      "16 medallas; Surf y Treparrocas para el acceso a Torre Oculta"
    ],
    "steps": [
      "Si todavía no has vencido a Rojo, completa el permiso de Oak y el ascenso al Monte Plateado. El diagnóstico no debe sustituir esa victoria por el simple hecho de tener 16 medallas.",
      "Tras vencer a Rojo, vuelve al laboratorio de Oak en Pueblo Paleta y recibe el inicial de Kanto. El regalo es una escena distinta de la entrega de Treparrocas.",
      "Con el regalo de Oak revisado, visita la casa del Sr. Pokémon en Ruta 30 para recibir Orbe Azul. Si ya está en tu bolsa, continúa directamente hacia la torre.",
      "Desde Ciudad Orquídea recorre el acceso a la Ruta 47 por el interior de Cueva Acantilado. Baja a la costa y usa Surf y Treparrocas para alcanzar la entrada de Torre Oculta.",
      "Guarda antes de interactuar con Kyogre y resuelve su encuentro. Registra por separado tener la especie en Pokédex y haberla obtenido en esta torre.",
      "Para Rayquaza necesitarás mostrar a Oak el Kyogre y el Groudon procedentes de estos encuentros de HGSS. El ejemplar de la otra versión requiere intercambio; los procedentes de generaciones anteriores no sustituyen ese requisito."
    ],
    "check": "Encuentro de Kyogre revisado; escenas previas y objeto actual conservan evidencia independiente.",
    "pitfalls": [
      "El objeto ya poseído evita repetir su entrega, pero no certifica retroactivamente cada diálogo. El trío no se habilita solo por completar una Pokédex."
    ],
    "sources": [
      "https://www.serebii.net/heartgoldsoulsilver/legends.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SOULSILVER"
    ],
    "mission": "E02",
    "location": "Monte Plateado → laboratorio de Oak → casa del Sr. Pokémon → Torre Oculta",
    "requires": [
      "16 medallas; Surf y Treparrocas para el acceso a Torre Oculta"
    ],
    "steps": [
      "Si todavía no has vencido a Rojo, completa el permiso de Oak y el ascenso al Monte Plateado. El diagnóstico no debe sustituir esa victoria por el simple hecho de tener 16 medallas.",
      "Tras vencer a Rojo, vuelve al laboratorio de Oak en Pueblo Paleta y recibe el inicial de Kanto. El regalo es una escena distinta de la entrega de Treparrocas.",
      "Con el regalo de Oak revisado, visita la casa del Sr. Pokémon en Ruta 30 para recibir Orbe Rojo. Si ya está en tu bolsa, continúa directamente hacia la torre.",
      "Desde Ciudad Orquídea recorre el acceso a la Ruta 47 por el interior de Cueva Acantilado. Baja a la costa y usa Surf y Treparrocas para alcanzar la entrada de Torre Oculta.",
      "Guarda antes de interactuar con Groudon y resuelve su encuentro. Registra por separado tener la especie en Pokédex y haberla obtenido en esta torre.",
      "Para Rayquaza necesitarás mostrar a Oak el Kyogre y el Groudon procedentes de estos encuentros de HGSS. El ejemplar de la otra versión requiere intercambio; los procedentes de generaciones anteriores no sustituyen ese requisito."
    ],
    "check": "Encuentro de Groudon revisado; escenas previas y objeto actual conservan evidencia independiente.",
    "pitfalls": [
      "El objeto ya poseído evita repetir su entrega, pero no certifica retroactivamente cada diálogo. El trío no se habilita solo por completar una Pokédex."
    ],
    "sources": [
      "https://www.serebii.net/heartgoldsoulsilver/legends.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SOULSILVER"
    ],
    "mission": "DETAIL1",
    "location": "Monte Plateado → laboratorio de Oak → casa del Sr. Pokémon → Torre Oculta",
    "requires": [
      "16 medallas; Surf y Treparrocas para el acceso a Torre Oculta"
    ],
    "steps": [
      "Si todavía no has vencido a Rojo, completa el permiso de Oak y el ascenso al Monte Plateado. El diagnóstico no debe sustituir esa victoria por el simple hecho de tener 16 medallas.",
      "Tras vencer a Rojo, vuelve al laboratorio de Oak en Pueblo Paleta y recibe el inicial de Kanto. El regalo es una escena distinta de la entrega de Treparrocas.",
      "Con el regalo de Oak revisado, visita la casa del Sr. Pokémon en Ruta 30 para recibir Orbe Rojo. Si ya está en tu bolsa, continúa directamente hacia la torre.",
      "Desde Ciudad Orquídea recorre el acceso a la Ruta 47 por el interior de Cueva Acantilado. Baja a la costa y usa Surf y Treparrocas para alcanzar la entrada de Torre Oculta.",
      "Guarda antes de interactuar con Groudon y resuelve su encuentro. Registra por separado tener la especie en Pokédex y haberla obtenido en esta torre.",
      "Para Rayquaza necesitarás mostrar a Oak el Kyogre y el Groudon procedentes de estos encuentros de HGSS. El ejemplar de la otra versión requiere intercambio; los procedentes de generaciones anteriores no sustituyen ese requisito."
    ],
    "check": "Encuentro de Groudon revisado; escenas previas y objeto actual conservan evidencia independiente.",
    "pitfalls": [
      "El objeto ya poseído evita repetir su entrega, pero no certifica retroactivamente cada diálogo. El trío no se habilita solo por completar una Pokédex."
    ],
    "sources": [
      "https://www.serebii.net/heartgoldsoulsilver/legends.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK",
      "WHITE"
    ],
    "mission": "10",
    "location": "Teselia oriental, Ciudad Caolín, rutas 13–18, Boquete Gigante y Ruinas Submarinas",
    "requires": [
      "Desenlace de N y Ghechis completado"
    ],
    "steps": [
      "Recibe el encargo de Handsome para buscar a los sabios del Equipo Plasma. Revisa las zonas anteriores y las nuevas rutas de postgame; cada sabio entrega una MT antes de ser escoltado.",
      "Explora la parte oriental de Teselia con un equipo preparado para el salto de niveles. La revancha de la Liga permite ahora enfrentarte a Mirto como Campeón.",
      "En Boquete Gigante recorre la cueva y el bosque interior para activar el cambio del escenario que permite llegar a Kyurem.",
      "Para las Ruinas Submarinas de Bahía Arenisca, lleva Surf y Buceo. Cada entrada tiene un límite de movimientos; planifica un recorrido directo hacia el pilar de acceso al siguiente nivel.",
      "En los pisos superiores, utiliza Destello y Fuerza donde indican las inscripciones para mover los pilares. Conserva el recorrido de vuelta y revisa la reliquia del último piso.",
      "Mantén aparte la Ciudad Negra/Bosque Blanco y el contenido del Nexo: las condiciones de conectividad y versión afectan a su población y recompensas."
    ],
    "check": "Sabios, revancha contra Mirto, nuevas zonas y accesos importantes revisados.",
    "pitfalls": [
      "El postgame de Negro/Blanco no es el de Negro 2/Blanco 2. Las Ruinas Submarinas tienen tiempo de exploración limitado por desplazamientos."
    ],
    "sources": [
      "https://www.serebii.net/blackwhite/plasma.shtml",
      "https://www.serebii.net/blackwhite/abyssalruins.shtml",
      "https://www.serebii.net/blackwhite/elitefour.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BLACK",
      "WHITE"
    ],
    "mission": "11",
    "location": "Metro Batalla y colecciones de la tarjeta de Teselia",
    "requires": [
      "Acceso a Ciudad Mayólica; modalidades Súper desbloqueadas"
    ],
    "steps": [
      "En el Metro Batalla escoge modalidad y prepara un equipo válido. Las victorias de Individual y Doble se cuentan de forma independiente.",
      "Desbloquea las líneas Súper al superar los hitos de la modalidad normal y continúa con las rachas de Súper Individual y Súper Doble.",
      "En Negro/Blanco, el requisito de tarjeta del Metro exige las victorias 49 de Súper Individual y Súper Doble. En Negro 2/Blanco 2 los requisitos de la tarjeta son distintos: no atribuyas esa mejora a una racha del Metro.",
      "Desglosa la Pokédex y el resto de requisitos de tarjeta según la edición. Negro/Blanco añaden accesorios del Musical y poderes del Nexo; las secuelas tienen sus propios requisitos.",
      "Solo en Negro 2/Blanco 2, revisa el medallero y sus 255 medallas por sus condiciones individuales. Separa las medallas que dependían de conectividad o servicios cerrados."
    ],
    "check": "Rachas y requisitos revisados por edición, sin sumar contadores incompatibles.",
    "pitfalls": [
      "La colección de medallas de las secuelas no existe en Negro/Blanco. Una fecha frecuente de obtención no demuestra la fecha histórica real de todas las acciones."
    ],
    "sources": [
      "https://www.serebii.net/blackwhite/battlesubway.shtml",
      "https://www.serebii.net/blackwhite/trainercard.shtml",
      "https://www.serebii.net/black2white2/trainercard.shtml",
      "https://www.serebii.net/black2white2/medals.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "X",
      "Y"
    ],
    "mission": "DETAIL1",
    "location": "Ciudad Luminalia: Agencia Handsome, hotel y callejones",
    "requires": [
      "Liga superada; visita de postgame a Batik y progreso de desbloqueo de megaevolución"
    ],
    "steps": [
      "Tras la Liga continúa la visita a Ciudad Batik y los encuentros con el rival y el profesor Ciprés. Cuando se active la llamada de Handsome, ve a su agencia en Ciudad Luminalia.",
      "Busca los cinco boletos de Handsome: Centro Pokémon de la plaza rosa, gimnasio de la plaza central, herbolario de Avenida Primavera, Hotel Ricachilón y museo del Bulevar Norte. Devuélvelos a la agencia.",
      "Continúa los encargos de los callejones y el encuentro con Matière. Después de cada capítulo regresa a la agencia para activar el siguiente aviso.",
      "Sigue la investigación de los robos y de la figura que utiliza el traje. Cuando el encargo te lleve al Hotel Ricachilón, resuelve el encuentro con Malva.",
      "Entra en los Laboratorios Lysson para el desenlace de la investigación y vuelve a la agencia para la despedida de Handsome y el cierre de la historia."
    ],
    "check": "Capítulo final y despedida de Handsome vistos.",
    "pitfalls": [
      "Los encargos se activan por etapas; visitar directamente el laboratorio sin completar las llamadas previas no sustituye la cadena."
    ],
    "sources": [
      "https://www.serebii.net/xy/looker.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "X",
      "Y"
    ],
    "mission": "10",
    "location": "Ciudad Luminalia: Agencia Handsome, hotel y callejones",
    "requires": [
      "Liga superada; visita de postgame a Batik y progreso de desbloqueo de megaevolución"
    ],
    "steps": [
      "Tras la Liga continúa la visita a Ciudad Batik y los encuentros con el rival y el profesor Ciprés. Cuando se active la llamada de Handsome, ve a su agencia en Ciudad Luminalia.",
      "Busca los cinco boletos de Handsome: Centro Pokémon de la plaza rosa, gimnasio de la plaza central, herbolario de Avenida Primavera, Hotel Ricachilón y museo del Bulevar Norte. Devuélvelos a la agencia.",
      "Continúa los encargos de los callejones y el encuentro con Matière. Después de cada capítulo regresa a la agencia para activar el siguiente aviso.",
      "Sigue la investigación de los robos y de la figura que utiliza el traje. Cuando el encargo te lleve al Hotel Ricachilón, resuelve el encuentro con Malva.",
      "Entra en los Laboratorios Lysson para el desenlace de la investigación y vuelve a la agencia para la despedida de Handsome y el cierre de la historia."
    ],
    "check": "Capítulo final y despedida de Handsome vistos.",
    "pitfalls": [
      "Los encargos se activan por etapas; visitar directamente el laboratorio sin completar las llamadas previas no sustituye la cadena."
    ],
    "sources": [
      "https://www.serebii.net/xy/looker.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "OMEGARUBY",
      "ALPHASAPPHIRE"
    ],
    "mission": "E01",
    "location": "Hoenn: Episodio Delta, Centro Espacial y Pilar Celeste",
    "requires": [
      "Primera Liga completada"
    ],
    "steps": [
      "Después de los créditos activa la nueva escena en tu casa y continúa con el incidente de Villa Raíz y Ciudad Petalia.",
      "Sigue el encargo de Máximo por Devon en Ciudad Férrica y el Centro Espacial de Ciudad Algaria. Cuando soliciten la esquirla, visita la zona indicada de Cueva Granito.",
      "Continúa la investigación de Tristana en Cascada Meteoro y regresa a las instalaciones de Devon y al Centro Espacial cuando lo indiquen los personajes.",
      "Resuelve el enfrentamiento en la guarida de la organización de tu edición y habla con los personajes que habilitan el acceso al Pilar Celeste. En Arrecípolis, Plubio participa en ese desbloqueo.",
      "Sube el Pilar Celeste escuchando las escenas de Tristana. Captura a Rayquaza y deja que aprenda Ascenso Draco para continuar con la secuencia del meteorito.",
      "Tras el combate de Tristana afronta a Deoxys en el espacio. Si no lo capturas, revisa la condición de nueva Liga y regreso al Pilar Celeste antes de intentar recuperarlo."
    ],
    "check": "Desenlace del meteorito y captura de Rayquaza revisados; Deoxys queda separado si no se capturó.",
    "pitfalls": [
      "No hace falta un ticket histórico para el Deoxys del Episodio Delta. Obtenerlo por intercambio no completa las escenas de Tristana."
    ],
    "sources": [
      "https://www.serebii.net/omegarubyalphasapphire/deltaepisode.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "OMEGARUBY",
      "ALPHASAPPHIRE"
    ],
    "mission": "DETAIL1",
    "location": "Hoenn: Episodio Delta, Centro Espacial y Pilar Celeste",
    "requires": [
      "Primera Liga completada"
    ],
    "steps": [
      "Después de los créditos activa la nueva escena en tu casa y continúa con el incidente de Villa Raíz y Ciudad Petalia.",
      "Sigue el encargo de Máximo por Devon en Ciudad Férrica y el Centro Espacial de Ciudad Algaria. Cuando soliciten la esquirla, visita la zona indicada de Cueva Granito.",
      "Continúa la investigación de Tristana en Cascada Meteoro y regresa a las instalaciones de Devon y al Centro Espacial cuando lo indiquen los personajes.",
      "Resuelve el enfrentamiento en la guarida de la organización de tu edición y habla con los personajes que habilitan el acceso al Pilar Celeste. En Arrecípolis, Plubio participa en ese desbloqueo.",
      "Sube el Pilar Celeste escuchando las escenas de Tristana. Captura a Rayquaza y deja que aprenda Ascenso Draco para continuar con la secuencia del meteorito.",
      "Tras el combate de Tristana afronta a Deoxys en el espacio. Si no lo capturas, revisa la condición de nueva Liga y regreso al Pilar Celeste antes de intentar recuperarlo."
    ],
    "check": "Desenlace del meteorito y captura de Rayquaza revisados; Deoxys queda separado si no se capturó.",
    "pitfalls": [
      "No hace falta un ticket histórico para el Deoxys del Episodio Delta. Obtenerlo por intercambio no completa las escenas de Tristana."
    ],
    "sources": [
      "https://www.serebii.net/omegarubyalphasapphire/deltaepisode.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SUN"
    ],
    "mission": "09",
    "location": "Alola tras la Liga: moteles de Handsome, Ultracriaturas y Necrozma",
    "requires": [
      "Liga completada; escenas iniciales del postgame"
    ],
    "steps": [
      "Recibe el encargo de Handsome y Destra y supera el combate de evaluación antes de empezar las operaciones. Recoge las Ente Balls que proporciona la investigación.",
      "Localiza a Nihilego en Túnel Diglett o Área Volcánica Wela y vuelve a informar cuando completes la captura solicitada.",
      "En Sol, captura los dos Buzzwole solicitados en Jardines de Melemele.",
      "Continúa el encargo de Xurkitree: debes localizar los dos ejemplares pedidos en Jungla Umbría o Colina del Recuerdo. Regresa al punto de reunión para abrir la operación siguiente.",
      "Busca los cuatro Kartana de la operación en Ruta 17 o Parque de Malíe.",
      "Tras el informe de esa operación, continúa hasta Cueva Desenlace para encontrar al Guzzlord del encargo. Regresa para cerrar la investigación y hablar con los personajes correspondientes.",
      "Necrozma es una captura posterior separada en Colina Dequilate; no se acredita al completar la última Ultracriatura. Revisa también los Tapu en sus propias ruinas."
    ],
    "check": "Cada operación cerrada con el número de capturas exigido; Necrozma y Tapu diferenciados.",
    "pitfalls": [
      "No copies esta cadena a Ultrasol/Ultraluna: allí las Ultracriaturas y Necrozma tienen procedimientos distintos."
    ],
    "sources": [
      "https://www.serebii.net/sunmoon/ultrabeasts.shtml",
      "https://www.serebii.net/sunmoon/legendary.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "MOON"
    ],
    "mission": "09",
    "location": "Alola tras la Liga: moteles de Handsome, Ultracriaturas y Necrozma",
    "requires": [
      "Liga completada; escenas iniciales del postgame"
    ],
    "steps": [
      "Recibe el encargo de Handsome y Destra y supera el combate de evaluación antes de empezar las operaciones. Recoge las Ente Balls que proporciona la investigación.",
      "Localiza a Nihilego en Túnel Diglett o Área Volcánica Wela y vuelve a informar cuando completes la captura solicitada.",
      "En Luna, captura los cuatro Pheromosa solicitados en Cueva Sotobosque.",
      "Continúa el encargo de Xurkitree: debes localizar los dos ejemplares pedidos en Jungla Umbría o Colina del Recuerdo. Regresa al punto de reunión para abrir la operación siguiente.",
      "Busca los dos Celesteela de la operación en Ruta 17 o Desierto de Haina.",
      "Tras el informe de esa operación, continúa hasta Cueva Desenlace para encontrar al Guzzlord del encargo. Regresa para cerrar la investigación y hablar con los personajes correspondientes.",
      "Necrozma es una captura posterior separada en Colina Dequilate; no se acredita al completar la última Ultracriatura. Revisa también los Tapu en sus propias ruinas."
    ],
    "check": "Cada operación cerrada con el número de capturas exigido; Necrozma y Tapu diferenciados.",
    "pitfalls": [
      "No copies esta cadena a Ultrasol/Ultraluna: allí las Ultracriaturas y Necrozma tienen procedimientos distintos."
    ],
    "sources": [
      "https://www.serebii.net/sunmoon/ultrabeasts.shtml",
      "https://www.serebii.net/sunmoon/legendary.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SUN",
      "MOON"
    ],
    "mission": "10",
    "location": "Alola: componentes de Zygarde y centro de Ruta 16",
    "requires": [
      "Arca de Zygarde recibida de Dexio y Sina"
    ],
    "steps": [
      "Usa el contador del Arca para anotar los componentes recogidos. El objetivo de exploración son 95 células y cinco núcleos, no cien pegatinas.",
      "Recorre las ubicaciones por isla y separa las que solo aparecen de día o de noche. Si un punto está vacío, comprueba el horario antes de considerarlo recogido.",
      "Visita el centro de Ruta 16 para ensamblar y separar Zygarde según los componentes disponibles. Conserva la diferencia entre tener un Zygarde y haber completado la recogida del mapa.",
      "Con todos los componentes, revisa el acceso a la habilidad Agrupamiento. Los núcleos también intervienen en los movimientos enseñables desde el Arca.",
      "Revisa aparte los sellos del Pasaporte y la Pokédex de Alola: ninguna de esas colecciones se completa únicamente por terminar Zygarde."
    ],
    "check": "Contador de componentes y opciones de ensamblaje comprobados.",
    "pitfalls": [
      "Las pegatinas dominantes y su colección de cien pertenecen a Ultrasol/Ultraluna."
    ],
    "sources": [
      "https://www.serebii.net/sunmoon/zygarde.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ULTRASUN",
      "ULTRAMOON"
    ],
    "mission": "E01",
    "location": "Festi Plaza → Paraíso Æther: episodio Rainbow Rocket",
    "requires": [
      "Primera Liga completada; incidente de Festi Plaza activado"
    ],
    "steps": [
      "Continúa las escenas de postgame en casa y entra en Festi Plaza cuando Sophocles solicite ayuda. Resuelve el combate de la Agencia de Combate que forma parte del incidente.",
      "Tras el cambio en Paraíso Æther, habla con Lylia y accede a la mansión ocupada. Sigue el recorrido hasta la sala central del castillo.",
      "Resuelve las alas laterales con sus puzles de movimiento y portales. Derrota a los líderes invitados de otras organizaciones para abrir sus accesos.",
      "Completa los sectores de Aquiles, Magno, Helio, Lysson y Ghechis según los bloqueos del castillo. Habla con los personajes de la sala central cuando un jefe deje de impedir el paso.",
      "Con los accesos abiertos continúa hasta Giovanni y supera el combate final. Deja terminar las escenas que devuelven Paraíso Æther a su estado normal.",
      "El recorrido por Ultraumbrales es independiente: prepara sus condiciones de equipo, horario y aparición antes de buscar un legendario concreto."
    ],
    "check": "Desenlace de Giovanni y restauración del lugar vistos.",
    "pitfalls": [
      "Las cien pegatinas no desbloquean este episodio. Las dos versiones presentan diferencias en los Pokémon de algunos jefes."
    ],
    "sources": [
      "https://www.serebii.net/ultrasunultramoon/teamrainbowrocket.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ULTRASUN",
      "ULTRAMOON"
    ],
    "mission": "DETAIL1",
    "location": "Alola: cierre de Rainbow Rocket y recompensas de pegatinas",
    "requires": [
      "Desbloqueo del postgame; acceso a las islas de la colección"
    ],
    "steps": [
      "Si falta el desenlace de Rainbow Rocket, completa primero los sectores del castillo y el enfrentamiento con Giovanni; vuelve a Paraíso Æther para cerrar sus escenas.",
      "Para las pegatinas, recorre Melemele, Akala, Ula-Ula y Poni. Examina paredes, edificios y superficies; algunas necesitan la caña de pescar u otras opciones de acceso.",
      "Consulta el contador antes de cambiar de isla para evitar dar una zona por terminada sin revisarla. La colección completa suma cien pegatinas.",
      "Habla con Samson Oak en Playa de Kantai al alcanzar cada umbral de recompensa: 20, 40, 50, 70, 80 y 100.",
      "Comprueba el Pokémon dominante entregado en cada umbral según tu versión. Haber recibido una recompensa no acredita los umbrales posteriores."
    ],
    "check": "Cien pegatinas y sus entregas revisadas; episodio RR cerrado por separado.",
    "pitfalls": [
      "Las recompensas dominantes cambian entre Ultrasol y Ultraluna. No utilices una lista de células de Zygarde de Sol/Luna."
    ],
    "sources": [
      "https://www.serebii.net/ultrasunultramoon/totemstickers.shtml",
      "https://www.serebii.net/ultrasunultramoon/teamrainbowrocket.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "LETGOP",
      "LETGOE"
    ],
    "mission": "05",
    "location": "Central de Energía, Islas Espuma, Calle Victoria y Cueva Celeste",
    "requires": [
      "Técnicas secretas necesarias; Campeón para Cueva Celeste"
    ],
    "steps": [
      "Desde Ruta 10 usa Surcaaguas para llegar a la Central de Energía y recorrerla hasta Zapdos.",
      "Para Articuno entra en Islas Espuma y usa Empuje para mover los bloques y detener las corrientes. En Let’s Go se usan técnicas secretas; no necesitas enseñar las antiguas MO.",
      "Busca a Moltres en Calle Victoria. Monte Ascuas e Islas Sete no forman parte de estos juegos.",
      "Después de la Liga entra en Cueva Celeste desde Ciudad Celeste. Recorre el laberinto hasta Mewtwo y prepara el combate con límite de tiempo previo a la fase de captura.",
      "Tras capturarlo vuelve a la cueva para el encuentro de postgame con la entrenadora destacada y su recompensa. No lo confundas con la primera captura de Mewtwo."
    ],
    "check": "Cuatro encuentros originales y escena posterior de la cueva revisados.",
    "pitfalls": [
      "La captura y el combate previo son fases diferentes. Los métodos de los originales de Game Boy no se trasladan literalmente a Let’s Go."
    ],
    "sources": [
      "https://www.serebii.net/letsgopikachueevee/legendary.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "LETGOP",
      "LETGOE"
    ],
    "mission": "06",
    "location": "Kanto: títulos de Maestro, Rojo y diploma",
    "requires": [
      "Liga completada; especies y equipos preparados para cada desafío"
    ],
    "steps": [
      "Localiza a los Entrenadores Maestros tras la Liga. Cada desafío corresponde a una especie y exige llevarla; algunos objetivos son de presentación y otros de combate.",
      "Para desbloquear el encuentro con Rojo revisa el requisito de seis títulos de Maestro. No hace falta completar los 153 para activar ese combate.",
      "Acude a Meseta Añil para buscar a Rojo cuando se cumpla ese requisito y supera su equipo.",
      "Para la Pokédex de Kanto, planifica exclusivos e intercambios y revisa las evoluciones por intercambio. Mew, Meltan y Melmetal tienen métodos externos distintos de las capturas del mapa.",
      "Conserva por separado el diploma de Kanto, los títulos de Maestro que persigas y las capturas originales: son reconocimientos distintos."
    ],
    "check": "Desbloqueo y combate de Rojo, diploma y títulos revisados por separado.",
    "pitfalls": [
      "Los Maestros son desafíos específicos con títulos, incluidos en el alcance; no son el barrido de entrenadores secundarios de las rutas."
    ],
    "sources": [
      "https://www.serebii.net/letsgopikachueevee/mastertrainers.shtml",
      "https://www.serebii.net/letsgopikachueevee/red.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SWORD",
      "SHIELD"
    ],
    "mission": "08",
    "location": "Isla de la Armadura: Dojo Maestro, torres, Diglett y retos",
    "requires": [
      "Pase de expansión de la edición correcta; viaje habilitado desde la estación"
    ],
    "steps": [
      "Completa la llegada a la isla y entra en el Dojo Maestro. Supera las tres pruebas de Mostaz, incluida la búsqueda de Slowpoke, las Maxisetas y el combate con el rival de tu versión.",
      "Recibe a Kubfu y visita con él los puntos de la isla señalados para aumentar la amistad. Habla con Mostaz cuando el requisito esté cumplido.",
      "Escoge una torre: Aguas produce a Urshifu Estilo Fluido y Sombras produce Estilo Brusco. La elección no se cambia después para ese Kubfu.",
      "Tras completar la torre y las condiciones del tramo posterior, continúa el encargo de Paul que conduce a la Maxipanal y a la preparación de la Maxisopa para Urshifu.",
      "Revisa los 151 Diglett de Alola con el excursionista de la isla, las mejoras relevantes del dojo y el Amuleto Emblema de la colección de Pokédex.",
      "Concluida la historia, abre los retos de Combate Restringido y registra cada tipo por separado si buscas completar esa instalación."
    ],
    "check": "Evolución elegida, cadena de Gigamax, colección de Diglett e instalación revisadas.",
    "pitfalls": [
      "El pase es específico de Espada o Escudo. No se acreditan ambos estilos de Urshifu por completar una sola torre."
    ],
    "sources": [
      "https://www.serebii.net/swordshield/mustard.shtml",
      "https://www.serebii.net/swordshield/diglett.shtml",
      "https://www.serebii.net/swordshield/restrictedsparring.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SWORD",
      "SHIELD"
    ],
    "mission": "09",
    "location": "Nieves de la Corona: leyendas de Peony y Aventuras Dinamax",
    "requires": [
      "Pase de expansión correcto; acceso a Villa Helada"
    ],
    "steps": [
      "Completa la llegada y acepta las pistas de Peony. Para Calyrex, investiga el pueblo, reúne los elementos de la estatua y avanza hasta poder plantar la zanahoria.",
      "Escoge el campo de zanahorias: el campo nevado conduce a Glastrier y el del cementerio a Spectrier. Continúa la historia del corcel, consigue las riendas y ve al santuario para el encuentro final.",
      "Para las ruinas Regi, sigue cada inscripción: silba ante la puerta de Registeel; lleva a Cryogonal como primer Pokémon para Regice; y equipa una Piedra Eterna al primer Pokémon para Regirock. Activa los puntos del suelo y examina la estatua.",
      "Con esos tres Regis, entra en las ruinas de elección y dibuja el patrón de Regieleki o Regidrago. Solo se elige uno en esa partida; el otro necesita intercambio.",
      "Activa la escena del árbol de las aves y persíguelas en sus regiones: Articuno en las Nieves, Zapdos en el Área Silvestre y Moltres en la Isla de la Armadura.",
      "Revisa las huellas para Cobalion, Terrakion y Virizion y sus encuentros. Keldeo requiere un procedimiento posterior con el trío; no es una recompensa automática por contar huellas.",
      "En Aventuras Dinamax registra cada legendario capturado: puedes conservar una captura de cada especie por partida. Distingue la lista de versión de los caminos que consigues mediante cooperación.",
      "Tras las tres expediciones principales, revisa las pistas posteriores de Peony, las Ultracriaturas y el Torneo de las Estrellas de Galar cuando se habilite."
    ],
    "check": "Tres expediciones y elecciones excluyentes documentadas; capturas de la instalación revisadas aparte.",
    "pitfalls": [
      "Regigigas requiere reunir a los cinco Regis, incluido el de la elección contraria. Tener cuatro no completa ese acceso."
    ],
    "sources": [
      "https://www.serebii.net/swordshield/theterribletitanslurkinglockedaway.shtml",
      "https://www.serebii.net/swordshield/thesacredbondsofsovereignandsteed.shtml",
      "https://www.serebii.net/swordshield/alegendarytreeofalegendarythree.shtml",
      "https://www.serebii.net/swordshield/footprints.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "BD",
      "SP"
    ],
    "mission": "11",
    "location": "Zona Batalla y Parque Hansa",
    "requires": [
      "Campeón; Pokédex Nacional desbloqueada tras avistar Sinnoh"
    ],
    "steps": [
      "Completa los avistamientos de Sinnoh y habla con Serbal para la mejora Nacional. Viaja a la zona insular desde Ciudad Puntaneva y revisa los nuevos accesos.",
      "Para Parque Hansa dirígete al antiguo acceso del sur de Sinnoh, por Ruta 221. Antes de comprar losas, baja a las Grutas del Subsuelo para excavar Esquirlas Extrañas.",
      "Intercambia tres esquirlas pequeñas o una grande por la losa correspondiente. Comienza con las Losas Descubrimiento para los tres Regis.",
      "Tras capturar al trío se amplían los tipos de losa. Selecciona la sala y losa correctas: la disponibilidad y los grupos de versión determinan qué encuentro abre cada una.",
      "En Diamante Brillante se obtiene el grupo de las bestias y Ho-Oh; en Perla Reluciente, las aves de Kanto y Lugia. Planifica intercambios para las alternativas.",
      "La Sala Distorsión requiere su propia condición y ofrece un combate contra Giratina de origen: no es una segunda captura del mismo encuentro. Comprueba la recompensa que permite cambiar su forma."
    ],
    "check": "Cada losa utilizada, encuentro capturado y recompensa de sala revisados.",
    "pitfalls": [
      "Comprar una losa no equivale a completar la sala. No gastes todas las esquirlas en duplicados sin comprobar qué tienes disponible."
    ],
    "sources": [
      "https://www.serebii.net/brilliantdiamondshiningpearl/ramanaspark.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ARCEUS"
    ],
    "mission": "09",
    "location": "Hisui: cierre de tablas, Pokédex y Templo de Sinnoh",
    "requires": [
      "Historia principal, encargo de Volo y tablas completados"
    ],
    "steps": [
      "Continúa las misiones de las tablas y termina el enfrentamiento de Volo, incluidas las fases de Giratina. Obtén la Flauta Azur como parte de ese cierre.",
      "Captura las especies necesarias de Hisui. Para llegar a Arceus se requiere haber encontrado y capturado a los Pokémon exigidos, no perfeccionar todas las tareas de investigación.",
      "Revisa especialmente las especies de distorsiones, las evoluciones específicas, Spiritomb y los legendarios de las misiones posteriores: pueden faltar aunque hayas explorado todas las zonas.",
      "No exijas Phione, Manaphy, Shaymin o Darkrai para esta condición. Sus encargos o bonificaciones siguen siendo objetivos separados.",
      "Vuelve al Templo de Sinnoh con el requisito cumplido, utiliza la Flauta Azur y supera el desafío de Arceus alternando esquivas y oportunidades de lanzamiento.",
      "La investigación a nivel 10 y la Pokédex perfecta son metas posteriores distintas. Registra su recompensa y progreso sin bloquear artificialmente el encuentro de Arceus."
    ],
    "check": "Encuentro de Arceus superado y niveles de investigación separados de su requisito de acceso.",
    "pitfalls": [
      "No se necesita una Pokédex perfecta para encontrarse con Arceus. Las misiones por datos de otros juegos no deben imponerse a esa condición."
    ],
    "sources": [
      "https://www.serebii.net/legendsarceus/arceus.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ARCEUS"
    ],
    "mission": "DETAIL1",
    "location": "Hisui: cierre de tablas, Pokédex y Templo de Sinnoh",
    "requires": [
      "Historia principal, encargo de Volo y tablas completados"
    ],
    "steps": [
      "Continúa las misiones de las tablas y termina el enfrentamiento de Volo, incluidas las fases de Giratina. Obtén la Flauta Azur como parte de ese cierre.",
      "Captura las especies necesarias de Hisui. Para llegar a Arceus se requiere haber encontrado y capturado a los Pokémon exigidos, no perfeccionar todas las tareas de investigación.",
      "Revisa especialmente las especies de distorsiones, las evoluciones específicas, Spiritomb y los legendarios de las misiones posteriores: pueden faltar aunque hayas explorado todas las zonas.",
      "No exijas Phione, Manaphy, Shaymin o Darkrai para esta condición. Sus encargos o bonificaciones siguen siendo objetivos separados.",
      "Vuelve al Templo de Sinnoh con el requisito cumplido, utiliza la Flauta Azur y supera el desafío de Arceus alternando esquivas y oportunidades de lanzamiento.",
      "La investigación a nivel 10 y la Pokédex perfecta son metas posteriores distintas. Registra su recompensa y progreso sin bloquear artificialmente el encuentro de Arceus."
    ],
    "check": "Encuentro de Arceus superado y niveles de investigación separados de su requisito de acceso.",
    "pitfalls": [
      "No se necesita una Pokédex perfecta para encontrarse con Arceus. Las misiones por datos de otros juegos no deben imponerse a esa condición."
    ],
    "sources": [
      "https://www.serebii.net/legendsarceus/arceus.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SCARLET",
      "VIOLET"
    ],
    "mission": "09",
    "location": "Noroteo: historia de las máscaras y Ursaluna Luna Carmesí",
    "requires": [
      "DLC La máscara turquesa; acceso a la excursión"
    ],
    "steps": [
      "Inicia la excursión de la Academia y llega a la villa de Noroteo. Sigue las visitas a los carteles con tu compañero y las escenas del festival.",
      "Continúa el episodio de Ogerpon y las máscaras hasta sus enfrentamientos y decisión de captura. Revisa después los encuentros de los tres compañeros legendarios, que son escenas separadas.",
      "Para Luna Carmesí registra 150 especies capturadas de la Pokédex de Noroteo y habla con Gama en la villa. Supera su combate para iniciar la investigación.",
      "Viaja al Bosque Eterno y encuentra su campamento. Durante el encargo nocturno fotografía diez Pokémon para que el sensor pueda identificar a Ursaluna.",
      "Sigue las indicaciones de Gama hasta el encuentro de Ursaluna Luna Carmesí y completa el combate antes de la captura. Vuelve a hablar con ella para cerrar el encargo y sus recompensas."
    ],
    "check": "Historia de Ogerpon y encargo fotográfico cerrados por separado.",
    "pitfalls": [
      "Ursaluna Luna Carmesí no se obtiene evolucionando al Ursaring de esa partida. El requisito de Gama es de capturas, no solo avistamientos."
    ],
    "sources": [
      "https://www.serebii.net/scarletviolet/kitakamimaskfestival.shtml",
      "https://www.serebii.net/scarletviolet/thebloodmoonbeast.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SCARLET",
      "VIOLET"
    ],
    "mission": "10",
    "location": "Academia Arándano → Área Cero inferior",
    "requires": [
      "DLC El disco índigo; avances requeridos en historia principal y Noroteo"
    ],
    "steps": [
      "Acepta la invitación a la Academia Arándano y completa la introducción al Biodomo y a sus Tareas Extraescolares para reunir Puntos Arándano.",
      "Abre el recorrido de la Liga Arándano y supera las pruebas de sus cuatro miembros. Prepara equipos para combates dobles y revisa los requisitos particulares de cada prueba.",
      "Supera el enfrentamiento decisivo con Kieran y continúa la expedición al Área Cero cuando la historia lo indique.",
      "En las profundidades del Área Cero sigue los bloqueos de los Pokémon de teratipo Astral y continúa hasta el episodio de Terapagos. Completa sus fases y el cierre de la expedición.",
      "Tras la historia vuelve al Club de la Liga: sus mejoras abren iniciales del Biodomo, invitaciones y recompensas. No se obtienen todas simplemente por vencer al Campeón.",
      "Revisa la misión de las fotografías de Gama y sus capturas Paradoja según versión. Los Snacks de Galletano y las Tareas de Círculo Unión tienen condiciones propias de cooperación."
    ],
    "check": "Terapagos y cierre de la expedición vistos; mejoras y capturas posteriores separadas.",
    "pitfalls": [
      "Los PA gastados en decoraciones no equivalen a las mejoras de bioma que desbloquean iniciales. Las capturas Paradoja de la otra versión requieren intercambio."
    ],
    "sources": [
      "https://www.serebii.net/scarletviolet/blueberryelitefour.shtml",
      "https://www.serebii.net/scarletviolet/areazerounderdepths.shtml",
      "https://www.serebii.net/scarletviolet/leagueclub.shtml",
      "https://www.serebii.net/scarletviolet/paradoxperrin.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SCARLET",
      "VIOLET"
    ],
    "mission": "11",
    "location": "Noroteo: epílogo Melodía de los mochis",
    "requires": [
      "Torneo de la Academia ganado; historias de los dos DLC terminadas; Baya Meloc singular obtenida mediante el método de distribución disponible"
    ],
    "steps": [
      "Comprueba el cierre del Torneo de la Academia y de El disco índigo. Tener instalados los DLC no demuestra que sus historias estén completas.",
      "Revisa en Objetos Clave la Baya Meloc singular recibida por Regalo Misterioso. Si no dispones de ella, comprueba la disponibilidad actual de la distribución antes de viajar.",
      "Ve al establecimiento de Villa Versui en Noroteo e interactúa con el adorno relacionado con la baya para activar el epílogo.",
      "Sigue las llamadas y la reunión con tus compañeros; resuelve los encuentros de la aldea y el recorrido hacia el salón que marca la historia.",
      "Supera los combates del desenlace y afronta a Pecharunt. Deja terminar las escenas posteriores para cerrar el episodio.",
      "Comprueba después las nuevas invitaciones disponibles en el Club de la Liga: son recompensas de ese cierre, no del objeto por sí solo."
    ],
    "check": "Pecharunt y escenas de cierre del epílogo revisados.",
    "pitfalls": [
      "No basta con tener a Pecharunt por intercambio. La baya, la disponibilidad de distribución y el progreso de historia son requisitos distintos."
    ],
    "sources": [
      "https://www.serebii.net/scarletviolet/mochimayhem.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SCARLET",
      "VIOLET"
    ],
    "mission": "DETAIL1",
    "location": "Noroteo: epílogo Melodía de los mochis",
    "requires": [
      "Torneo de la Academia ganado; historias de los dos DLC terminadas; Baya Meloc singular obtenida mediante el método de distribución disponible"
    ],
    "steps": [
      "Comprueba el cierre del Torneo de la Academia y de El disco índigo. Tener instalados los DLC no demuestra que sus historias estén completas.",
      "Revisa en Objetos Clave la Baya Meloc singular recibida por Regalo Misterioso. Si no dispones de ella, comprueba la disponibilidad actual de la distribución antes de viajar.",
      "Ve al establecimiento de Villa Versui en Noroteo e interactúa con el adorno relacionado con la baya para activar el epílogo.",
      "Sigue las llamadas y la reunión con tus compañeros; resuelve los encuentros de la aldea y el recorrido hacia el salón que marca la historia.",
      "Supera los combates del desenlace y afronta a Pecharunt. Deja terminar las escenas posteriores para cerrar el episodio.",
      "Comprueba después las nuevas invitaciones disponibles en el Club de la Liga: son recompensas de ese cierre, no del objeto por sí solo."
    ],
    "check": "Pecharunt y escenas de cierre del epílogo revisados.",
    "pitfalls": [
      "No basta con tener a Pecharunt por intercambio. La baya, la disponibilidad de distribución y el progreso de historia son requisitos distintos."
    ],
    "sources": [
      "https://www.serebii.net/scarletviolet/mochimayhem.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SCARLET",
      "VIOLET"
    ],
    "mission": "12",
    "location": "Paldea: estacas, santuarios y colecciones de Pokédex",
    "requires": [
      "Acceso a las zonas de cada estaca; mejoras de montura recomendadas"
    ],
    "steps": [
      "Asiste a las clases de Historia y avanza en los diálogos con su profesora para que señale los santuarios en tu mapa. Este seguimiento facilita su localización; las estacas se pueden explorar por separado.",
      "Recoge las ocho estacas de un mismo color para abrir su santuario. Hay cuatro grupos independientes, 32 estacas en total.",
      "Relaciona los grupos con su encuentro: las moradas abren el de Wo-Chien; las amarillas el de Chien-Pao; las verdes el de Ting-Lu; las azules el de Chi-Yu.",
      "Cuando se rompa el sello, ve al santuario correspondiente, guarda e interactúa con la puerta para iniciar el encuentro. Las mejoras de la montura facilitan alcanzar las estacas en altura o al otro lado del agua.",
      "Revisa por separado los diplomas y recompensas de las Pokédex de Paldea, Noroteo y Biodomo según los DLC disponibles. Los intercambios de exclusivos y las evoluciones cooperativas forman parte de esa planificación."
    ],
    "check": "Cuatro sellos y encuentros revisados; colecciones regionales diferenciadas.",
    "pitfalls": [
      "Las clases ayudan a localizar santuarios, pero no sustituyen las ocho estacas de cada grupo."
    ],
    "sources": [
      "https://www.serebii.net/scarletviolet/stakes.shtml",
      "https://www.serebii.net/scarletviolet/pokedexcompletion.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "ZA"
    ],
    "mission": "06",
    "location": "Luminalia: encuentro de Xerneas, Yveltal y Zygarde",
    "requires": [
      "Historia principal completada"
    ],
    "steps": [
      "Tras el final habla con L. Para Xerneas, completa el encargo de los alfas anómalos en las Zonas Salvajes 3, 5 y 9 y vuelve a informar. La siguiente pista conduce a Xerneas en la Zona Salvaje 11.",
      "Para Yveltal, completa las simulaciones de revancha contra Mega-Victreebel, Mega-Hawlucha y Mega-Tyranitar. Vuelve a informar y busca a Yveltal en la azotea indicada de la galería del sector rojo.",
      "Después de capturar a Xerneas y Yveltal, vuelve con L y supera su combate. Continúa la escena en la que Zygarde dirige al jugador hacia la Torre Prisma.",
      "Afronta el desafío de Zygarde por fases: primero 10 %, después 50 % y finalmente la Forma Completa. Mantén recursos y atención a los ataques de área durante el cambio de fase.",
      "Al terminar el desafío, completa la oportunidad de captura y revisa las escenas posteriores. Esta cadena no exige haber completado el DLC de Mega Dimension."
    ],
    "check": "Las tres capturas y sus escenas de postgame revisadas.",
    "pitfalls": [
      "Las distribuciones adicionales de Mewtwo o Diancie y las misiones de Mega Dimension tienen accesos propios. No se desbloquean automáticamente por capturar a Zygarde."
    ],
    "sources": [
      "https://www.serebii.net/legendsz-a/legendary.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "RUBY"
    ],
    "mission": "13",
    "location": "Hoenn: Pilar Celeste, Cámara Sellada y tres ruinas Regi",
    "requires": [
      "Liga superada; Bici Carrera, Surf, Buceo, Excavar, Fuerza y Vuelo para todos los accesos; Relicanth y Wailord"
    ],
    "steps": [
      "Después de la Liga, busca a Rayquaza en Pilar Celeste usando la Bici Carrera en los suelos agrietados. Guarda antes de la cima y prepara el encuentro al nivel 70.",
      "Para los Regis, recorre las corrientes de Ruta 134 hasta el punto de Buceo. Sigue la inscripción submarina, emerge en Cámara Sellada y usa Excavar ante la pared del fondo.",
      "En la siguiente sala coloca a Relicanth primero y a Wailord sexto. Lee la inscripción para activar los movimientos de tierra que abren las tres ruinas.",
      "En la ruina del desierto de Ruta 111, lee el braille y da dos pasos a la derecha y dos abajo. Usa Fuerza para abrir la sala de Regirock.",
      "En la ruina de Ruta 105, lee la inscripción y espera dos minutos sin abandonar el lugar para abrir el acceso a Regice.",
      "En la ruina de Ruta 120, utiliza Vuelo en el centro de la sala para abrir a Registeel. Los tres Regis están al nivel 40.",
      "En Rubí, Latios comienza a deambular tras la Liga; Latias corresponde al acceso de Isla del Sur con el Ticket Eón.",
      "Separa el errante accesible de la distribución del Ticket Eón. Revisa las condiciones históricas de recepción o mezcla de récords y su compatibilidad regional antes de contar con Isla del Sur."
    ],
    "check": "Rayquaza, tres ruinas y errante de versión revisados.",
    "pitfalls": [
      "Estas son las soluciones de Rubí/Zafiro. Esmeralda invierte el orden del equipo y cambia los movimientos o recorridos de las tres salas."
    ],
    "sources": [
      "https://www.serebii.net/rubysapphire/legendary.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "SAPPHIRE"
    ],
    "mission": "13",
    "location": "Hoenn: Pilar Celeste, Cámara Sellada y tres ruinas Regi",
    "requires": [
      "Liga superada; Bici Carrera, Surf, Buceo, Excavar, Fuerza y Vuelo para todos los accesos; Relicanth y Wailord"
    ],
    "steps": [
      "Después de la Liga, busca a Rayquaza en Pilar Celeste usando la Bici Carrera en los suelos agrietados. Guarda antes de la cima y prepara el encuentro al nivel 70.",
      "Para los Regis, recorre las corrientes de Ruta 134 hasta el punto de Buceo. Sigue la inscripción submarina, emerge en Cámara Sellada y usa Excavar ante la pared del fondo.",
      "En la siguiente sala coloca a Relicanth primero y a Wailord sexto. Lee la inscripción para activar los movimientos de tierra que abren las tres ruinas.",
      "En la ruina del desierto de Ruta 111, lee el braille y da dos pasos a la derecha y dos abajo. Usa Fuerza para abrir la sala de Regirock.",
      "En la ruina de Ruta 105, lee la inscripción y espera dos minutos sin abandonar el lugar para abrir el acceso a Regice.",
      "En la ruina de Ruta 120, utiliza Vuelo en el centro de la sala para abrir a Registeel. Los tres Regis están al nivel 40.",
      "En Zafiro, Latias comienza a deambular tras la Liga; Latios corresponde al acceso de Isla del Sur con el Ticket Eón.",
      "Separa el errante accesible de la distribución del Ticket Eón. Revisa las condiciones históricas de recepción o mezcla de récords y su compatibilidad regional antes de contar con Isla del Sur."
    ],
    "check": "Rayquaza, tres ruinas y errante de versión revisados.",
    "pitfalls": [
      "Estas son las soluciones de Rubí/Zafiro. Esmeralda invierte el orden del equipo y cambia los movimientos o recorridos de las tres salas."
    ],
    "sources": [
      "https://www.serebii.net/rubysapphire/legendary.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "FIRERED",
      "LEAFGREEN"
    ],
    "mission": "E01",
    "location": "Islas Sete: Isla Prima, Isla Quarta, Isla Inta e Isla Sesta",
    "requires": [
      "Primera visita con Bill completada; Liga y 60 especies capturadas para la mejora Nacional"
    ],
    "steps": [
      "En la primera visita después de Blaine, ayuda con el encargo entre Isla Prima e Isla Secunda y rescata a la niña de Bosque Baya en Isla Tera. Vuelve a informar para cerrar el viaje de Bill.",
      "Tras la Liga, reúne 60 especies capturadas y visita a Oak para la Pokédex Nacional. Regresa con Celio al Centro Pokémon de Isla Prima.",
      "Ve a Monte Ascuas, resuelve el bloqueo de los miembros del Team Rocket y entra en la cueva del rubí. Recoge la gema y llévasela a Celio para conseguir el Iris-Ticket y viajar a las otras islas.",
      "En Isla Quarta entra en Cueva Glaciada. Busca MO07 Cascada, utilízala para subir y ayuda a Lorelei en la escena con el Team Rocket.",
      "En Isla Sesta llega a Cueva Punteada y utiliza Corte ante la puerta. Sigue el recorrido de agujeros indicado por el braille: arriba, izquierda, derecha y abajo.",
      "Al llegar al zafiro, el científico se lo lleva. Conserva la segunda contraseña que facilita para abrir el Almacén Rocket de Isla Inta, junto a la obtenida antes.",
      "Recorre las cintas del almacén, derrota al científico y recupera el zafiro. Entrégalo a Celio para restaurar la máquina de redes.",
      "Comprueba después los accesos y compatibilidades que se abren: intercambios con Hoenn y acceso de Mewtwo en Cueva Celeste requieren sus condiciones de progreso, no solo el primer viaje de Bill."
    ],
    "check": "Dos gemas entregadas y máquina de Celio restaurada.",
    "pitfalls": [
      "La primera visita a las tres islas no completa la cadena de siete. Tener el Iris-Ticket tampoco demuestra haber recuperado el zafiro."
    ],
    "sources": [
      "https://www.serebii.net/fireredleafgreen/legendary.shtml",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/OneIsland_PokemonCenter_1F/scripts.inc",
      "https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/data/maps/SixIsland_DottedHole_SapphireRoom/scripts.inc"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "GOLD",
      "SILVER",
      "CRYSTAL"
    ],
    "mission": "01",
    "location": "Pueblo Primavera → Ciudad Cerezo → casa del Sr. Pokémon",
    "requires": [
      "Inicio de la partida"
    ],
    "steps": [
      "Ajusta el reloj y visita el laboratorio de Elm para recibir a Chikorita, Cyndaquil o Totodile. Continúa hacia Ciudad Cerezo y toma el acceso norte de Ruta 30.",
      "En la casa del Sr. Pokémon recibe el Huevo Misterioso y la Pokédex de Oak. Al salir, la llamada de Elm pide volver a Pueblo Primavera.",
      "En el camino de regreso resuelve el primer combate contra el rival. Informa en el laboratorio, entrega el huevo y completa el registro del rival.",
      "Regresa por Ciudad Cerezo y sigue Ruta 31 hasta Ciudad Malva. Las capturas ya pueden empezar con las Poké Balls del comienzo."
    ],
    "check": "Pokédex recibida y recado de Elm concluido.",
    "pitfalls": [
      "No confundas el Huevo Misterioso de este recado con el huevo de Togepi que se entrega posteriormente."
    ],
    "sources": [
      "https://www.serebii.net/gs/gift.shtml",
      "https://www.serebii.net/gs/rival.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "GOLD",
      "SILVER",
      "CRYSTAL"
    ],
    "mission": "02",
    "location": "Ciudad Malva: Torre Bellsprout y gimnasio",
    "requires": [
      "Recado inicial terminado"
    ],
    "steps": [
      "Explora la Torre Bellsprout y supera el encuentro con su sabio para recibir MO05 Destello. Aún necesitas la medalla para utilizarlo fuera del combate.",
      "Prepara un equipo para el gimnasio de Pegaso, de tipo Volador. Supera el combate y recibe la medalla Céfiro.",
      "Tras la llamada de Elm, ve al Centro Pokémon y habla con su ayudante para recibir el huevo de Togepi; deja un hueco en el equipo.",
      "Continúa hacia el sur por Ruta 32. El camino junto al Centro Pokémon conduce a Cueva Unión y después a Pueblo Azalea."
    ],
    "check": "Medalla Céfiro y huevo de Togepi revisados.",
    "pitfalls": [
      "Togepi necesita un hueco de equipo; no se acredita su regalo solo por recibir la llamada."
    ],
    "sources": [
      "https://www.serebii.net/gs/gyms.shtml",
      "https://www.serebii.net/gs/gift.shtml",
      "https://www.serebii.net/gs/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "GOLD",
      "SILVER",
      "CRYSTAL"
    ],
    "mission": "03",
    "location": "Pueblo Azalea: Pozo Slowpoke, gimnasio y salida al Encinar",
    "requires": [
      "Llegada desde Cueva Unión"
    ],
    "steps": [
      "Habla con César en su casa para iniciar la intervención del Pozo Slowpoke. Baja al pozo y resuelve el bloqueo del Team Rocket.",
      "Tras liberar a los Slowpoke, vuelve al gimnasio de Antón y obtén la medalla Colmena.",
      "Antes de entrar en Encinar supera al rival de la salida oeste de Azalea. Dentro, sigue al Farfetch’d perdido para que regrese junto a su dueño.",
      "Recibe MO01 Corte del responsable del Farfetch’d. Enseña el movimiento a un Pokémon compatible y úsalo sobre el árbol que permite cruzar Encinar hacia Ruta 34."
    ],
    "check": "Medalla Colmena, Corte y paso de Encinar abiertos.",
    "pitfalls": [
      "El puzle del Farfetch’d de Oro/Plata/Cristal no debe sustituirse por las dos aves y ramas del remake."
    ],
    "sources": [
      "https://www.serebii.net/gs/teamrocket.shtml",
      "https://www.serebii.net/gs/gyms.shtml",
      "https://www.serebii.net/gs/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "GOLD",
      "SILVER",
      "CRYSTAL"
    ],
    "mission": "04",
    "location": "Ciudad Trigal: Radio, bicicleta y gimnasio",
    "requires": [
      "Acceso desde Ruta 34"
    ],
    "steps": [
      "Entra en Ciudad Trigal y recoge la bicicleta en su tienda. Visita la Torre Radio para superar el cuestionario del juego que entrega la tarjeta de radio del Pokégear.",
      "Completa el gimnasio de Blanca y vence a su equipo. Tras el combate habla con la entrenadora cercana y vuelve a hablar con Blanca: la medalla no se entrega inmediatamente al terminar la batalla.",
      "Recibe la medalla Planicie y visita la floristería para preparar la Regadera que permite mover a Sudowoodo.",
      "En Cristal, si la florista exige localizar a su hermana o comprobar el árbol, realiza primero ese diálogo en Ruta 36 y regresa a la tienda.",
      "Para continuar hacia Ciudad Iris utiliza las rutas del norte. El Parque Nacional y su concurso son actividades separadas del avance de gimnasio."
    ],
    "check": "Medalla Planicie y Regadera disponibles.",
    "pitfalls": [
      "El cuestionario mencionado es el que existe dentro del juego para obtener la radio; la página no añade otro test de situación."
    ],
    "sources": [
      "https://www.serebii.net/gs/gyms.shtml",
      "https://www.serebii.net/gs/items.shtml",
      "https://www.serebii.net/gs/pokegear.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "GOLD",
      "SILVER",
      "CRYSTAL"
    ],
    "mission": "05",
    "location": "Ruta 36 → Ciudad Iris: Torre Quemada, teatro y gimnasio",
    "requires": [
      "Regadera; acceso al norte de Trigal"
    ],
    "steps": [
      "Usa la Regadera con Sudowoodo en Ruta 36. Guarda antes del encuentro si quieres capturarlo y continúa hacia Ciudad Iris.",
      "Revisa el teatro de las Chicas Kimono: al completar sus combates, el hombre de la sala entrega MO03 Surf. Este procedimiento es el de los originales, no el del recluta del remake.",
      "Entra en Torre Quemada, resuelve el encuentro con el rival y alcanza el sótano donde se liberan las tres bestias.",
      "Completa el gimnasio de Morti siguiendo su camino oculto. Al recibir la medalla Niebla puedes utilizar Surf fuera del combate.",
      "Con ese acceso, el siguiente tramo permite llegar a Ciudad Olivo y navegar hacia Ciudad Orquídea."
    ],
    "check": "Bestias liberadas, Surf recibido y medalla Niebla obtenida.",
    "pitfalls": [
      "Suicune sigue un comportamiento distinto en Cristal. Tener Surf enseñado no basta para navegar sin la medalla."
    ],
    "sources": [
      "https://www.serebii.net/gs/legends.shtml",
      "https://www.serebii.net/gs/tmhm.shtml",
      "https://www.serebii.net/gs/gyms.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "GOLD",
      "SILVER",
      "CRYSTAL"
    ],
    "mission": "06",
    "location": "Ciudad Olivo → Ciudad Orquídea → regreso al faro",
    "requires": [
      "Surf y medalla Niebla"
    ],
    "steps": [
      "Desde Ciudad Iris sigue al oeste y baja a Ciudad Olivo. En la cafetería habla con el marinero que entrega Fuerza. Después sube al faro y habla con Yasmina para conocer la enfermedad del Pokémon que ilumina la costa.",
      "Cruza el mar de las rutas 40 y 41 hasta Ciudad Orquídea. Recoge la Poción Secreta en la farmacia.",
      "Supera el gimnasio de Aníbal en Ciudad Orquídea. Usa Fuerza para resolver el paso de sus rocas si lo necesitas y consigue la medalla Tormenta.",
      "Habla con la mujer del exterior del gimnasio para recibir MO02 Vuelo. La medalla Tormenta permite usarla para regresar con rapidez.",
      "Entrega la Poción Secreta a Yasmina en el faro. Cuando vuelva a su gimnasio, enfréntate a ella y recibe la medalla Mineral."
    ],
    "check": "Poción entregada y medallas de Orquídea y Olivo obtenidas.",
    "pitfalls": [
      "Yasmina no regresa al gimnasio por vencer a Aníbal: es necesario entregar el remedio en el faro. Fuerza se obtiene en Ciudad Olivo en estos originales."
    ],
    "sources": [
      "https://www.serebii.net/gs/gyms.shtml",
      "https://www.serebii.net/gs/items.shtml",
      "https://www.serebii.net/gs/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "GOLD",
      "SILVER",
      "CRYSTAL"
    ],
    "mission": "07",
    "location": "Pueblo Caoba → Lago de la Furia → Guarida Rocket",
    "requires": [
      "Surf para el encuentro del lago"
    ],
    "steps": [
      "Desde el entorno de Caoba sube al Lago de la Furia y guarda antes de acercarte al Gyarados rojo. Resuelve el encuentro y recoge la Escama Roja.",
      "Habla con Lance en la orilla para iniciar la investigación. Regresa a la tienda sospechosa de Caoba y entra en el pasadizo que descubre.",
      "En la guarida, desactiva la vigilancia cuando corresponda y consigue las contraseñas de los miembros que conocen el acceso. Resuelve los combates que bloquean la sala de mando.",
      "Completa la intervención con Lance y detén los tres Electrode que alimentan el sistema de tu lado. Cada Electrode es un encuentro distinto que puedes intentar capturar.",
      "Recibe MO06 Torbellino de Lance y completa el gimnasio de Fredo para la medalla Glaciar. La historia de la Torre Radio se activa al avanzar desde este tramo."
    ],
    "check": "Guarida neutralizada, Torbellino recibido y medalla Glaciar obtenida.",
    "pitfalls": [
      "El Gyarados puede llegar por intercambio sin que hayas hecho la escena del lago. El paso de Caoba hacia el este no se resuelve solo comprando objetos al vendedor."
    ],
    "sources": [
      "https://www.serebii.net/gs/teamrocket.shtml",
      "https://www.serebii.net/gs/gyms.shtml",
      "https://www.serebii.net/gs/tmhm.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "GOLD",
      "SILVER",
      "CRYSTAL"
    ],
    "mission": "08",
    "location": "Ciudad Trigal: Torre Radio y subterráneo → Ruta Helada → Ciudad Endrino",
    "requires": [
      "Episodio de Caoba completado"
    ],
    "steps": [
      "Regresa a Ciudad Trigal y entra en la Torre Radio ocupada. Sube hasta el supuesto director y véncelo para recibir la Llave Sótano.",
      "Ve al subterráneo y abre la puerta cerrada con esa llave. Supera al rival y resuelve las compuertas del sótano para alcanzar al director verdadero.",
      "Recibe su llave de acceso y vuelve a Torre Radio para abrir las plantas restantes. Derrota a los ejecutivos y deja concluir la liberación de la torre.",
      "Regresa a Caoba y sigue al este hasta Ruta Helada. Recoge MO07 Cascada y utiliza las rocas y los tramos de hielo para llegar a Ciudad Endrino.",
      "Derrota a Débora en su gimnasio y continúa en Guarida Dragón. En Oro/Plata recoge el Colmillo Dragón del fondo para completar su condición; en Cristal entra en el santuario y supera las preguntas del anciano.",
      "Comprueba ocho medallas antes de preparar el camino a la Liga. El ala o la campana entregada por la Torre Radio depende de Oro, Plata o Cristal."
    ],
    "check": "Torre Radio liberada, Cascada y medalla Dragón obtenidas.",
    "pitfalls": [
      "No copies el uniforme Rocket de HGSS al original. La victoria del gimnasio de Endrino necesita su escena posterior para recibir la medalla."
    ],
    "sources": [
      "https://www.serebii.net/gs/teamrocket.shtml",
      "https://www.serebii.net/gs/gyms.shtml",
      "https://www.serebii.net/gs/tmhm.shtml",
      "https://www.serebii.net/crystal/legends.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "GOLD",
      "SILVER",
      "CRYSTAL"
    ],
    "mission": "09",
    "location": "Pueblo Primavera → cascadas de Ruta 27 → Calle Victoria → Meseta Añil",
    "requires": [
      "Ocho medallas, Surf y Cascada"
    ],
    "steps": [
      "Antes de salir visita a Elm tras completar las ocho medallas y revisa su regalo de la Master Ball.",
      "Desde Pueblo Primavera usa Surf hacia el este. Cruza las Cascadas Tohjo con Cascada y continúa por las rutas 27 y 26 hasta el edificio de la Liga.",
      "Cruza Calle Victoria y supera el combate con tu rival al final. No necesitas repetir allí una guarida del Team Rocket.",
      "Prepara curaciones y PP en Meseta Añil. Los combates son Mento, Koga, Bruno, Karen y Lance.",
      "Tras la victoria deja registrar el Hall de la Fama y continúa con el encargo del S.S. Aqua que abre el recorrido de Kanto."
    ],
    "check": "Primer Hall de la Fama y siguiente tramo hacia Kanto disponible.",
    "pitfalls": [
      "Lance es el Campeón de esta Liga; el posterior combate de Rojo en Monte Plateado es una cadena distinta."
    ],
    "sources": [
      "https://www.serebii.net/gs/elitefour.shtml",
      "https://www.serebii.net/gs/rival.shtml",
      "https://www.serebii.net/gs/items.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  },
  {
    "games": [
      "CRYSTAL"
    ],
    "mission": "DETAIL1",
    "location": "Cristal: Centro Pokémon de Trigal → César → santuario del Encinar",
    "requires": [
      "Disponibilidad del evento de GS Ball según la edición y distribución"
    ],
    "steps": [
      "Identifica primero la edición: el cartucho original dependía del método de distribución de su época; la versión de Consola Virtual habilita su propia entrega tras la Liga.",
      "En Consola Virtual, después del Hall de la Fama visita el Centro Pokémon de Ciudad Trigal y completa la escena de la GS Ball.",
      "Lleva la GS Ball a César en Pueblo Azalea. Espera al cambio de día del juego y vuelve a hablar con él cuando termine su investigación.",
      "Recoge el objeto y ve al santuario de Encinar para activar el encuentro de Celebi. Guarda antes de interactuar con el santuario.",
      "Conserva separado el acceso del cartucho original: poseer Celebi mediante intercambio no demuestra que la GS Ball se distribuyera en esa partida."
    ],
    "check": "Método de acceso y encuentro de Celebi revisados según edición.",
    "pitfalls": [
      "No presentes el evento de Consola Virtual como si estuviera habilitado por defecto en todos los cartuchos de Cristal."
    ],
    "sources": [
      "https://www.serebii.net/crystal/virtualconsole.shtml"
    ],
    "review": "reference-checked",
    "reviewedAt": "2026-11-10"
  }
];
 routes.push(...(typeof module==='object'&&module.exports?require('./hoenn.js'):root.PokemonHoennRoutes));
 routes.push(...(typeof module==='object'&&module.exports?require('./frlg.js'):root.PokemonFRLGRoutes));
 routes.push(...(typeof module==='object'&&module.exports?require('./platinum.js'):root.PokemonPlatinumRoutes));
 routes.push(...(typeof module==='object'&&module.exports?require('./diamond-pearl.js'):root.PokemonDiamondPearlRoutes));
 routes.push(...(typeof module==='object'&&module.exports?require('./hgss.js'):root.PokemonHGSSRoutes));
 routes.push(...(typeof module==='object'&&module.exports?require('./unova.js'):root.PokemonUnovaRoutes));
 routes.push(...(typeof module==='object'&&module.exports?require('./unova-postgame.js'):root.PokemonUnovaPostgameRoutes));
 routes.push(...(typeof module==='object'&&module.exports?require('./kalos.js'):root.PokemonKalosRoutes));
 routes.push(...(typeof module==='object'&&module.exports?require('./oras.js'):root.PokemonORASRoutes));
 const ice=typeof module==='object'&&module.exports?require('./ice-puzzle.js'):root.PokemonIcePuzzle;
 const byMission=new Map();
 for(const route of routes)for(const game of route.games){const id=game+'-'+route.mission;if(byMission.has(id))throw Error('Ruta editorial duplicada: '+id);byMission.set(id,route);}
 function get(game,id){if(!id.startsWith(game+'-'))return null;const entry=byMission.get(id);return entry?.games.includes(game)?entry:null;}
 function stats(game){return routes.filter(r=>r.games.includes(game)).length;}
 function render(game,id,esc){
  const r=get(game,id);if(!r)return '';
  return `<article class="route-details"><h3>Recorrido paso a paso</h3><p><b>Ubicación:</b> ${esc(r.location)}</p>${r.requires.length?`<h4>Antes de ir</h4><ul>${r.requires.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}<ol>${r.steps.map(x=>`<li style="margin-bottom:12px">${esc(x)}</li>`).join('')}</ol>${r.puzzleVersion?ice.render(r.puzzleVersion):''}<p><b>Comprueba al terminar:</b> ${esc(r.check)}</p>${r.pitfalls.length?`<div class="warn">${r.pitfalls.map(x=>`<p>${esc(x)}</p>`).join('')}</div>`:''}<p class="small">Fuentes del recorrido: ${r.sources.map((url,i)=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">Referencia ${i+1}</a>`).join(' · ')}. Esta ruta explica qué hacer; su finalización se distingue de los datos que el lector puede acreditar.</p></article><h4>Registro de la misión</h4>`;
 }
 const api={routes,get,stats,render};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonWalkthrough=api;
})(typeof globalThis==='object'?globalThis:this);
