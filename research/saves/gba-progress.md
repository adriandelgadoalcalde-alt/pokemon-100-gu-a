# GBA: medallas, Nacional y orientación tras la Liga

Fecha: 10 de noviembre de 2026. Base: `7143dee`; rama `feat/gba-progress-fields`.

El informe Core omitía `SAV3.Badges` y `SAV3.NationalDex`, aunque el guardado y el
adaptador ya los ofrecen. Ahora publica la máscara de ocho medallas, su popcount y
el desbloqueo Nacional. Se conserva la máscara en la normalización del Atlas.
El motor WASM distribuido se recompila desde esas mismas fuentes; la comparación
completa con CLI incluye estos campos, no solo la Pokédex.

## Indicador de final

| Familia | Índice de evento | Fuente primaria fijada |
| --- | --- | --- |
| Rubí/Zafiro | `0x804` | pret/pokeruby `5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f` |
| Esmeralda | `0x864` | pret/pokeemerald `731ad5bfd6e6f265508d0efcca0ba42f9dcf5881` |
| Rojo Fuego/Verde Hoja | `0x82C` | pret/pokefirered `ce6406d8c2eaf46d543c8a2606de0c3cb1951982` |

En cada repositorio se comprueban `include/constants/flags.h` y el punto de escritura
en `src/post_battle_event_funcs.c`. RS/E usan `GameClear`; FRLG usa `EnterHallOfFame`.
`ProgressSignals.cs` enlaza tanto la definición como el activador de cada familia.

La señal `story.gba.gameClear` conserva validación **documentada**. No se transforma
en el campo directo `gameClear`, ni se acreditan escenas anteriores. Permite priorizar
misiones posteriores a la frontera explícita de historia. La evidencia de dominio
sigue siendo parcial; una contradicción con `gameClear: false` impide esa inferencia.
Una señal de otra familia no sirve. Sigue pendiente una pareja natural controlada
anterior/posterior a cada transición; los contenedores públicos no sustituyen esa prueba.

Se ejercitan contenedores sintéticos serializados de las cinco ediciones, en ambos
estados de la bandera, con el bit vecino opuesto: máscara no contigua de cuatro
medallas, Nacional activa, integridad correcta e inmutabilidad de la entrada.
La prueba de navegador importa además una diagnosis GBA sintética y comprueba
recomendación de postgame, conservación de máscara y ausencia de casillas marcadas.

No cambian IDs, claves de almacenamiento, formato de exportación ni progreso manual.
No se publican guardados originales ni valores de eventos de personas.
