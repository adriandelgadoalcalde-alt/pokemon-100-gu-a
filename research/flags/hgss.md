# HGSS: fuentes fijadas y primeras interpretaciones

Investigación del 9 de noviembre de 2026. **No equivale a validación con partidas reales.**
No se han recibido en este entorno los guardados personales descritos en el traspaso.
Ninguno de los nuevos mapeos narrativos de esta página se usa para certificar misiones.

## Fuentes primarias

- [PKHeX, revisión fijada](https://github.com/kwsch/PKHeX/tree/96e33e7432d900e5345afdfd117eabfac43f5bbd):
  [SAV4HGSS](https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core/Saves/SAV4HGSS.cs),
  [SAV4](https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core/Saves/SAV4.cs),
  [selección de bloques](https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core/Saves/Substructures/Gen4/SAV4BlockDetection.cs).
- [pret/pokeheartgold, revisión fijada](https://github.com/pret/pokeheartgold/tree/6bf138d6035aa6b43d6f8f4132a12df70f86dcec).
  Su README identifica **ROM estadounidenses** y advierte que es una reconstrucción en curso.
  No se presupone correspondencia semántica de todos los índices con una edición española.
- [Variables y banderas del juego](https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/src/save_vars_flags.c),
  [estructura](https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/include/save_vars_flags.h),
  [variables](https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/include/constants/vars.h),
  [banderas](https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/include/constants/flags.h).

Las referencias son enlaces a código upstream; no se incorpora PKHeX.Core ni código de
la reconstrucción. PKHeX declara GPL-3.0: su futura integración/distribución requiere
resolver esa licencia. No se han descargado ROM ni assets de juego.

## Estructura e integridad

El bloque general de HGSS mide `0xF628`; la segunda partición empieza en `0x40000`.
El CRC-16/CCITT-FALSE cubre el bloque excluyendo los últimos `0x10` bytes.
El lector ahora selecciona por los contadores mayor y menor, en ese orden, con las
reglas de comparación de contadores documentadas por PKHeX. El desempate elige la
primera copia, sin usar las horas jugadas. No descarta contadores grandes arbitrariamente.

Si la copia seleccionada falla su CRC o su identificador de bloque, la importación
se detiene. **No hay recuperación automática ni sustitución silenciosa por un progreso
antiguo**. Esta política conservadora no pretende reproducir todo el mecanismo de
recuperación del juego. Solo se valida el **bloque general**, no cajas, Hall of Fame,
vídeos ni otros bloques. El JSON declara explícitamente qué bloques no se han validado.

Prueba independiente del algoritmo: `CRC("123456789") == 0x29B1`.
Pruebas sintéticas adicionales verifican selección, corrupción, límites y ausencia de
modificación de bytes. Falta contraste con partidas auténticas y con la UI de PKHeX.

## Siete mapeos documentados en scripts; pendientes de prueba antes/después

El almacenamiento de variables es `workIndex = varId - 0x4000`. El offset de work
respecto del bloque general es `0xDE4`; el de banderas es `0x10C4`.

| Hecho o estado | Campo | Evidencia documental | Matiz / prueba pendiente |
| --- | --- | --- | --- |
| Victoria contra Rojo | variable `0x40FD`, work `253`, valor `1` | [script de Rojo](https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0107_D41R0108.s) | Se escribe después de ganar; revisar todas las escrituras y partidas antes/después. |
| Fase del regalo de Oak | variable `0x4131`, work `305` | [laboratorio](https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0740_T01R0301.s) | `0` inicial; Rojo escribe `1`; diálogo escribe `2`; tras dar el Pokémon escribe `3/4/5`; al volver al laboratorio pasa a `6`. No implica fecha del regalo. |
| Fase de Torre Oculta | variable `0x40F9`, work `249` | [Oak](https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0740_T01R0301.s), [Sr. Pokémon](https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0229_R30R0201.s) | Oak escribe `1` tras el regalo; Sr. Pokémon escribe `2` al comenzar la escena del orbe, antes de entregarlo. El valor por sí solo no prueba haber terminado cada diálogo; fases posteriores también existen. |
| Captura original de Zapdos | flag `0x14A` | [Ruta 10](https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0191_R10.s) | Se activa en la rama de resultado `4`, separada de derrota/huida. No sustituir por Pokédex. |
| Captura original de Moltres | flag `0x16D` | [Monte Plateado](https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0106_D41R0105.s) | Igual distinción entre captura y otros resultados; validar variantes regionales. |
| Captura original de Groudon | flag `0x179` | [Torre Oculta](https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0133_D52R0101.s) | En la rama de captura también escribe fase `4`; el flag de derrota/huida es otro. |
| Treparrocas recibido de Oak | flag `0x185` | [laboratorio](https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0740_T01R0301.s) | Se escribe tras entregar HM08; no basta con tener cualquier Pokémon que conozca el movimiento. |

Todos tienen estado **documentado en código, sin validación con fixtures reales**.
Ninguno alcanza todavía la confianza `verified` exigida por AGENTS.md.

## Qué significa reconstruir la cronología

Los scripts conservan fases útiles para ordenar requisitos y reconocer avances.
También hay registros que se reinician: Rojo activa `FLAG_UNK_25F`, y el
[script de la Liga](https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/files/fielddata/script/scr_seq/scr_seq_0825_T10R0701.s)
la limpia. Su ausencia no demostraría que nunca se ganó a Rojo.

Además, `Save_VarsFlags_GetFlagAddr` distingue las banderas persistentes de las
temporales (`TEMP_FLAG_BASE`), que se guardan en `sTempFlags` en memoria.
No todas las constantes son datos de la partida: algunas pertenecen al programa y
otras son temporales. Un snapshot conserva el estado persistente, pero no por ello
un listado fechado de todas las acciones. Para el orden observado se necesitan
campos históricos explícitos o comparaciones entre snapshots.

## Siguiente validación

Para cada mapeo: save anterior → una acción → guardar → save posterior; CRC y hashes
del original intactos; contraste de flags/work en PKHeX; caso positivo y negativo;
comprobación tras recargar/revancha; región/revisión identificadas. Los originales
se mantienen privados y fuera de Git. Hasta entonces no habilitar certificación
automática nueva a partir de estos índices.
