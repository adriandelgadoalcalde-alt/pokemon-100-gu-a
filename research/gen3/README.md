# Tercera generación: lectura de campo, secretos e Isla Espejismo

Fecha: 11 de noviembre de 2026. Afecta a Rubí, Zafiro, Esmeralda, Rojo Fuego y Verde Hoja.

## Qué se lee del guardado

`src/saves/gen3.js` lee en el dispositivo y en solo lectura:

- La **copia activa**: los 14 sectores de cada copia, con su firma `0x08012025` y su checksum. Se elige la copia con el contador más reciente, con la misma regla que PKHeX (`SAV3BlockDetection`). Si la copia más reciente tiene un sector inválido, la lectura se detiene; no se recurre a un progreso más antiguo.
- Los **16 bytes que algunos emuladores añaden** al final (por ejemplo, el reloj): se ignoran y se avisa.
- La **familia** (R/Z, E o RF/VH), detectada por el bloque pequeño igual que en `SaveUtil.GetVersionG3SAV`. R/Z y RF/VH no distinguen la edición concreta: la elige el usuario en el Atlas.
- **Dónde estás**: `SaveBlock1.location` (grupo y número de mapa) y la casilla. El nombre en español es el de la sección del mapa (`region_map_section` de pret), con los textos oficiales de PKHeX. Se resuelve por identificador, no por posición, porque R/Z y RF/VH numeran las secciones de otra forma que Esmeralda.
- **Equipo y cajas**: especie (descifrada y convertida de la numeración interna a la Nacional con la tabla de PKHeX) y los 16 bits bajos del valor de personalidad. No se guardan ni se muestran nombres, ID ni otros datos del entrenador.
- **Banderas y variables** de eventos completas.

Offsets: PKHeX.Core `96e33e7` (`SaveBlock3LargeE/RS/FRLG`, `PokeCrypto`) y pret (`struct SaveBlock1`, `struct WarpData`).

## Contraste

- `tests/gen3-core-parity.cjs` compara banderas, variables y especies del equipo con PKHeX.Core (motor WebAssembly del Atlas). Resultado: **8 de 8 archivos coinciden por completo** (seis partidas públicas fijadas por hash, de Esmeralda, RF/VH y R/Z, y dos copias privadas cedidas por el propietario, que nunca se suben a Git). Todos los originales conservan su SHA-256.
- Las posiciones de medallas resueltas desde pret coinciden con las de PKHeX en las tres familias (0x867, 0x807, 0x820).
- `tests/gen3.test.cjs` cubre con datos sintéticos la elección de copia, la corrupción, el pie del emulador, la detección de familia, la especie interna, la Isla Espejismo, las semánticas por edición y el recomendador.

## Semántica de las banderas

`research/gen3/catalog.json` nombra banderas de pret, nunca números. `scripts/derive-gen3-semantics.py` resuelve el índice en la revisión fijada de cada decompilación y **falla si la bandera no existe o si ningún script la activa**. Además guarda los sitios donde se activa. Se revisaron a mano las ramas de los scripts. Hay diferencias importantes:

| Caso | Esmeralda | Rubí/Zafiro | Rojo Fuego/Verde Hoja |
| --- | --- | --- | --- |
| Regis y Rayquaza | `FLAG_DEFEATED_*` al capturar o derrotar; si huyes, vuelve | `FLAG_HIDE_*` se activa **antes** del combate: el encuentro se consume aunque huyas | — |
| Deoxys en Isla Origen | `FLAG_BATTLED_DEOXYS` = capturado; `FLAG_DEFEATED_DEOXYS` = derrotado, y el Salón de la Fama lo borra | — | `FLAG_FOUGHT_DEOXYS` = capturado; derrotarlo activa `FLAG_DEOXYS_FLEW_AWAY` |
| Lugia y Ho-Oh en Roca Ombligo | `FLAG_CAUGHT_*` = capturado | — | `FLAG_FOUGHT_*` = capturado; `*_FLEW_AWAY` = perdido |
| Pájaros y Mewtwo | — | — | `FLAG_FOUGHT_*` al capturar o derrotar; si huyes, vuelve |

Nivel de confianza: **documentado en código**. Todavía no hay comparaciones antes/después para cada evento, así que estas banderas no certifican de forma automática ningún objetivo del Atlas. Orientan la guía y el siguiente objetivo. Una especie en la Pokédex se muestra aparte y nunca sustituye a la bandera.

## Isla Espejismo

En pret (`time_events.c`, igual en Rubí y Esmeralda) la isla es visible si los 16 bits altos de `VAR_MIRAGE_RND_H/L` coinciden con los 16 bits bajos de la personalidad de algún Pokémon del equipo (también vale un huevo). Cada día de juego procesado el valor avanza con `1103515245 * x + 12345`.

Con eso el Atlas indica:

- si la isla es visible hoy;
- qué Pokémon de las cajas la haría visible hoy;
- los próximos días en que algún Pokémon tuyo coincide.

Los días se cuentan desde el último que procesó el guardado; no hay forma de conocer el reloj actual de la consola.

Clima anómalo de Esmeralda: `VAR_ABNORMAL_WEATHER_LOCATION` indica la ruta exacta de la Cueva Marina o Terrena.

## Límites conocidos

- La ubicación es la del último guardado, no la del momento en que juegas.
- El catálogo cubre los hitos de historia y los secretos y legendarios principales. No incluye entrenadores secundarios ni objetos sueltos triviales.
- Los eventos de legado (tickets) se muestran aparte: necesitan objetos de distribuciones.
- El Frente Batalla, los concursos y las cintas no se interpretan aún desde el guardado.

## Reproducir

```sh
bash scripts/prepare-pret.sh
bash scripts/prepare-pkhex.sh
python3 -I scripts/derive-gen3-semantics.py --check
node --test tests/gen3.test.cjs
python3 scripts/fetch-public-saves.py .cache/public-corpus
node tests/gen3-core-parity.cjs .cache/public-corpus
```
