# Hoenn GBA: recorridos y puzles por edición

Fecha: 10 de noviembre de 2026. Redacción propia; no se copian diálogos, ROM ni imágenes
del juego. `src/guides/hoenn.js` añade 20 recorridos, 106 instrucciones y 39 enlaces a
misiones existentes de Rubí, Zafiro y Esmeralda. Los IDs y casillas no cambian.

Fuentes primarias fijadas:

- pret/pokeruby: `5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f`.
- pret/pokeemerald: `731ad5bfd6e6f265508d0efcca0ba42f9dcf5881`.

Cada recorrido enlaza sus scripts. La revisión de fuentes recoge también las
comprobaciones HTTP y la coincidencia de bytes con la revisión fijada. Se usan
referencias de Serebii y Bulbapedia para contrastar navegación y diferencias.

## Diferencias que impiden reutilizar el mismo recorrido

- Rubí/Zafiro sitúa la guarida enemiga en la costa de Calagua. Esmeralda exige
  Emblema Magma, la apertura del Desfiladero, la guarida de Magma y, después del
  robo del submarino, la de Aqua.
- En Esmeralda el script de Monte Pírico entrega `ITEM_MAGMA_EMBLEM`, aunque conserve
  `FLAG_RECEIVED_RED_OR_BLUE_ORB` como nombre heredado. El nombre de esa bandera
  no demuestra por sí solo que se haya entregado un orbe al jugador.
- Buceo llega en casa de Máximo. Esmeralda añade como requisito previo la liberación
  del Centro Espacial, con el combate acompañado de Máximo.
- Rubí/Zafiro resuelve Groudon/Kyogre en Cueva Ancestral y permite recoger Cascada
  allí. Esmeralda encadena Plubio, Pilar Celeste e intervención de Rayquaza;
  Plubio entrega Cascada después en Arrecípolis.
- Plubio es el líder de Arrecípolis en R/S y Galano en Esmeralda; el Campeón es
  Máximo en R/S y Plubio en Esmeralda.
- La estrella de combate de R/S exige 50 victorias consecutivas de Torre. Esmeralda
  comprueba los símbolos de las siete instalaciones: el código exige tanto plata
  como oro, obtenidos en esa secuencia jugando normalmente. No basta un total de
  victorias ni se importan tarjetas de cinco estrellas de otras generaciones.
- Las pinturas requieren ganar en Experto con al menos 800 puntos internos y aceptar
  el envío del artista al museo. Cinco cintas no sustituyen cinco pinturas.

## Hielo de Arrecípolis

`hoenn-ice-paths.json` conserva geometría derivada, rutas y hashes de dos recursos
de cada revisión: mapa de metatiles y atributos. Se identifica el comportamiento
`MB_THIN_ICE` y se excluyen las baldosas con colisión. No se incluyen los binarios
ni gráficos originales en el repositorio de la guía.

Las tres plataformas tienen 7, 19 y 40 casillas en R/S; 7, 19 y 38 en Esmeralda.
Las rutas visitan exactamente una vez todas las casillas y terminan junto a la
escalera. También coinciden con los umbrales del script: 8/28/69 en R/S y 8/28/67
en Esmeralda, contando la inicialización y los incrementos entre plataformas.

El visor utiliza únicamente estas rutas, ofrece una cuadrícula numerada, secuencia
completa y controles de paso. No marca casillas, no modifica progreso y funciona
offline. La prueba reproduce cada movimiento contra la geometría de su edición;
no es una prueba de haber jugado con un guardado natural.

Reproducción, tras obtener las revisiones anteriores en las dos carpetas locales:

```sh
python3 scripts/derive-hoenn-ice.py --ruby-source .cache/pokeruby --emerald-source .cache/pokeemerald --check
```

La derivación lee objetos Git fijados y no necesita compilar el juego ni tener ROM.

## Límite editorial

Todas las misiones hoy catalogadas de estos tres juegos tienen ahora recorrido
ampliado. **No se declara cerrado el inventario exhaustivo**: faltan recorridos
individuales de actividades y recompensas agrupadas en misiones generales,
incluidos regalos, intercambios, variantes temporales, objetos relevantes de
colección y legado. Rojo Fuego/Verde Hoja tampoco se completan por esta ampliación.
La semántica y la validación de eventos en guardados siguen siendo un trabajo separado.
