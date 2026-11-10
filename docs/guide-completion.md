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
| 3 | Rojo Fuego | 18 | 2 | En revisión |
| 3 | Verde Hoja | 18 | 2 | En revisión |
| 4 | Diamante | 12 | 1 | En revisión |
| 4 | Perla | 12 | 1 | En revisión |
| 4 | Platino | 13 | 2 | En revisión |
| 4 | Oro HeartGold | 19 | 2 | En revisión |
| 4 | Plata SoulSilver | 19 | 2 | En revisión |
| 5 | Negro | 11 | 2 | En revisión |
| 5 | Blanco | 11 | 2 | En revisión |
| 5 | Negro 2 | 16 | 1 | En revisión |
| 5 | Blanco 2 | 16 | 1 | En revisión |
| 6 | X | 12 | 2 | En revisión |
| 6 | Y | 12 | 2 | En revisión |
| 6 | Rubí Omega | 16 | 2 | En revisión |
| 6 | Zafiro Alfa | 16 | 2 | En revisión |
| 7 | Sol | 10 | 2 | En revisión |
| 7 | Luna | 10 | 2 | En revisión |
| 7 | Ultrasol | 12 | 2 | En revisión |
| 7 | Ultraluna | 12 | 2 | En revisión |
| 7 | Let's Go Pikachu | 6 | 2 | En revisión |
| 7 | Let's Go Eevee | 6 | 2 | En revisión |
| 8 | Espada | 10 | 2 | En revisión |
| 8 | Escudo | 10 | 2 | En revisión |
| 8 | Diamante Brillante | 12 | 1 | En revisión |
| 8 | Perla Reluciente | 12 | 1 | En revisión |
| 8 | Leyendas: Arceus | 11 | 2 | En revisión |
| 9 | Escarlata | 13 | 5 | En revisión |
| 9 | Púrpura | 13 | 5 | En revisión |
| 9 | Leyendas: Z-A | 9 | 1 | En revisión |

La ampliación de Hoenn incluye 20 rutas nuevas y un visor de hielo diferente para
R/S y Esmeralda, derivado de sus mapas y scripts. Sigue pendiente revisar los
objetivos agrupados de colección y actividades, así como los huecos de inventario;
no se declara exhaustividad. Véase `research/routes/hoenn.md`.
