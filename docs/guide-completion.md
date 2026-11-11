# Cierre de las guías de las nueve generaciones

El usuario ha confirmado que las guías exhaustivas de **todas las ediciones** son
una condición de cierre del proyecto. Terminar el lector, el motor o la PWA no
sustituye ese entregable. No se rebaja el alcance a un catálogo o a unas pocas
ediciones detalladas.

## Qué debe quedar resuelto en cada edición

- Historia desde el inicio, orden de desbloqueo, gimnasios/pruebas y desenlace.
- Postgame completo: grandes combates, subtramas, zonas y encargos con recompensa.
- Encuentros únicos y legendarios: accesos, puzles, elecciones excluyentes y recuperación
  cuando exista en esa edición.
- Objetos importantes: ubicación, condición de entrega, uso y dependencias posteriores.
- Colecciones y desafíos propios: formas, regalos, evoluciones, intercambios,
  instalaciones, concursos y demás actividades relevantes del título.
- Reconocimiento oficial: requisitos reales de diploma, tarjeta, sellos o equivalente;
  sin importar criterios de otra edición.
- DLC y legado: condiciones, disponibilidad, distribuciones y conectividad separadas
  del juego base y de los premios que no los requieren.
- Pasos ejecutables, fuentes identificables y diferencias de versión/región. No dejar
  el cierre en una indicación genérica como «revisa todos los legendarios».
- Indicación independiente de qué acredita el guardado y qué solo explica la guía.

Se excluyen entrenadores secundarios y objetos sueltos triviales. Los grandes
combates, retos con reconocimiento y objetos necesarios permanecen dentro del alcance.

## Qué significa la ampliación actual

El contenido ampliado está en `src/guides/routes.js` y sus módulos de familia
(como `src/guides/hoenn.js`). Cada ruta tiene ubicación,
requisitos, instrucciones ordenadas, comprobación final, advertencias y referencias.
Se inserta en la misión existente para conservar IDs, casillas y exportaciones.
Las instrucciones se guardan en la caché PWA para consultarlas sin conexión.

Una ruta puede compartirse entre ediciones solo cuando las diferencias se explican;
los puzles incompatibles de Rubí/Zafiro y Esmeralda son entradas distintas. No se
transfieren hechos ni marcas de guardado a través del contenido compartido.

**La ampliación no cierra automáticamente una edición.** Cubrir todas las misiones
actualmente catalogadas tampoco prueba que el inventario de objetivos sea exhaustivo.
La matriz siguiente cuenta conexiones editoriales, no porcentajes del juego.

## Revisión pendiente

Antes de marcar una edición como cerrada, revisar el inventario completo frente a
fuentes del juego, resolver sus huecos y comprobar los recorridos. La lectura de
flags y la validación natural del guardado tienen su propia revisión técnica.

## Matriz editorial actual

| Generación | Edición | Misiones catalogadas | Con recorrido ampliado | Guía exhaustiva |
| --- | --- | ---: | ---: | --- |
| 1 | Rojo | 17 | 17 | En revisión |
| 1 | Verde (Japón) | 17 | 17 | En revisión |
| 1 | Azul | 17 | 17 | En revisión |
| 1 | Amarillo | 17 | 17 | En revisión |
| 2 | Oro | 15 | 15 | En revisión |
| 2 | Plata | 15 | 15 | En revisión |
| 2 | Cristal | 16 | 16 | En revisión |
| 3 | Rubí | 14 | 14 | En revisión |
| 3 | Zafiro | 14 | 14 | En revisión |
| 3 | Esmeralda | 16 | 16 | En revisión |
| 3 | Rojo Fuego | 18 | 18 | En revisión |
| 3 | Verde Hoja | 18 | 18 | En revisión |
| 4 | Diamante | 12 | 11 | En revisión |
| 4 | Perla | 12 | 11 | En revisión |
| 4 | Platino | 13 | 13 | En revisión |
| 4 | Oro HeartGold | 19 | 19 | En revisión |
| 4 | Plata SoulSilver | 19 | 19 | En revisión |
| 5 | Negro | 11 | 11 | En revisión |
| 5 | Blanco | 11 | 11 | En revisión |
| 5 | Negro 2 | 16 | 16 | En revisión |
| 5 | Blanco 2 | 16 | 16 | En revisión |
| 6 | X | 12 | 12 | En revisión |
| 6 | Y | 12 | 12 | En revisión |
| 6 | Rubí Omega | 16 | 16 | En revisión |
| 6 | Zafiro Alfa | 16 | 16 | En revisión |
| 7 | Sol | 10 | 10 | En revisión |
| 7 | Luna | 10 | 10 | En revisión |
| 7 | Ultrasol | 12 | 10 | En revisión |
| 7 | Ultraluna | 12 | 10 | En revisión |
| 7 | Let's Go Pikachu | 6 | 6 | En revisión |
| 7 | Let's Go Eevee | 6 | 6 | En revisión |
| 8 | Espada | 10 | 10 | En revisión |
| 8 | Escudo | 10 | 10 | En revisión |
| 8 | Diamante Brillante | 12 | 12 | En revisión |
| 8 | Perla Reluciente | 12 | 12 | En revisión |
| 8 | Leyendas: Arceus | 11 | 11 | En revisión |
| 9 | Escarlata | 13 | 5 | En revisión |
| 9 | Púrpura | 13 | 5 | En revisión |
| 9 | Leyendas: Z-A | 9 | 1 | En revisión |

La ampliación de Hoenn incluye 20 rutas nuevas y un visor de hielo diferente para
R/S y Esmeralda, derivado de sus mapas y scripts. Sigue pendiente revisar los
objetivos agrupados de colección y actividades, así como los huecos de inventario;
no se declara exhaustividad. Véase `research/routes/hoenn.md`.

Rojo Fuego/Verde Hoja añade 16 recorridos y corrige ubicaciones/accesos que no
coinciden con los originales de GB. Las listas exactas de 150/380 registros de
Pokédex se pueden comparar con el diagnóstico sin acreditar escenas originales.
Sigue pendiente el inventario exhaustivo y el desglose de actividades agrupadas;
`research/routes/frlg.md` documenta el alcance.

Platino añade once rutas propias para historia y Mundo Distorsión, conservando las
dos de postgame/colección anteriores. Sus trece misiones catalogadas tienen ahora
ampliación. Persisten huecos de inventario y navegación espacial descritos en
`research/routes/platinum.md`; la guía permanece en revisión exhaustiva.

Diamante/Perla añade diez recorridos de historia compartidos, con la quinta medalla
de Fantina después de Surf. Cada edición tiene once conexiones ampliadas; colección
y reconocimiento oficial siguen agrupados y pendientes de expansión. Véase
`research/routes/diamond-pearl.md`.

HGSS amplía las 17 misiones restantes del catálogo, con 94 instrucciones, manteniendo
las dos de orbes. Las 19 conexiones por edición no cierran los inventarios ni los
puzles detallados: véase `research/routes/hgss.md`.

Teselia añade 18 recorridos de historia, 94 instrucciones y 36 conexiones para las
cuatro ediciones. Se separan las entregas de MO, los gimnasios y los dos puzles de
la Fragata por edición y etapa. Negro/Blanco tiene las once misiones catalogadas
ampliadas; Negro 2/Blanco 2 tiene dieciséis de dieciséis. Esto no cierra inventarios,
colecciones ni navegación espacial; véase `research/routes/unova.md`.

El postgame de las secuelas añade siete rutas y 51 instrucciones para las doce
conexiones restantes: dragones, encuentros, tarjeta, Pokéwood/PWT, recuerdos,
claves/Regi y Reserva Natural. El cierre del catálogo tampoco cierra el inventario
exhaustivo ni los guiones y puzles pendientes. La Nacional compara las 636 especies
exigidas en los cuatro títulos, sin inferir premios o encuentros originales.

X/Y añade diez rutas y 59 instrucciones, conservando las dos del postgame. Las
doce misiones de cada edición tienen ampliación; falta todavía el inventario
exhaustivo. La comparación de Kalos usa 450 especies vistas y valida ese campo de
forma independiente de los obtenidos. Véase `research/routes/kalos.md`.

Los remakes de Hoenn añaden catorce recorridos y 87 instrucciones a las dos entradas
del Episodio Delta. Las dieciséis misiones actuales por edición tienen ampliación;
los inventarios y mapas aún siguen en revisión. El reconocimiento regional compara
208 especies vistas, sin acreditar premios de captura. Véase `research/routes/oras.md`.

Alola añade dieciséis rutas y 117 instrucciones para las cuatro ediciones. Se
separan inicial, pruebas, dominantes, rescate, gran prueba de Hela y primer título
de Sol/Luna frente a Ultra. Diez misiones por edición tienen ampliación, sin
certificar todavía mapas, inventarios, pasaporte ni todas las colecciones. Véase
`research/routes/alola.md`.

ORAS dispone de una guía individual de 47 megapiedras y comparación de bolsa.
La lectura de objetos equipados y el resto del inventario exhaustivo siguen
pendientes; véase `research/routes/oras-stones.md`.

Let’s Go añade cuatro recorridos y 37 instrucciones propias de los remakes de
Switch: técnicas secretas, requisitos de los gimnasios, progresión Rocket/Silph
y Calle Victoria. Las seis misiones por edición disponen de ampliación. El
diagnóstico compara exactamente las 150 especies obtenidas para el diploma,
sin acreditar su entrega, encuentros originales ni títulos de Maestro. Siguen
pendientes mapas interiores completos y colecciones; véase
`research/routes/lets-go.md`.

Galar añade nueve recorridos y 66 instrucciones para las dieciséis conexiones
restantes de Espada/Escudo. Se separan los gimnasios exclusivos, las fases de
Eternatus, la captura de portada en el postgame y los rangos de Torre Batalla.
Las diez misiones por edición tienen ampliación; se mantienen pendientes el
inventario exhaustivo, colecciones y planos descritos en
`research/routes/galar.md`.

Diamante Brillante/Perla Reluciente añade once rutas y 68 instrucciones para
las veintidós conexiones pendientes de historia y colecciones. Se usan MT y
movimientos de campo del Poké-reloj, la cronología propia de los remakes y los
requisitos de estatuas/concursos/Torre de su tarjeta. Las doce misiones por
edición están ampliadas, sin cerrar todos los mapas y colecciones descritos en
`research/routes/bdsp.md`.

Hisui añade nueve rutas y 70 instrucciones para sus nueve conexiones pendientes:
ingreso, señoriales, monturas, crisis, tablas, Volus y colecciones. Incluye las
tres contraseñas del Templo Puntaneva y la respuesta de Uxie, sin confundir
monturas/señoriales con capturas del equipo. Las once misiones catalogadas tienen
ampliación; el inventario de peticiones, mapas y colecciones sigue en revisión
en `research/routes/hisui.md`.
