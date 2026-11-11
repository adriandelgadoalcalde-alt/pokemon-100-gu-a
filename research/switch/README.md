# Switch: posición del jugador

El motor del navegador exporta `switchPosition` (`pkhex-extractor/NamedBlocks.cs`, `Position`) con las clases de
PKHeX.Core fijadas, en solo lectura:

| Juego | Dato exportado | Traducción |
| --- | --- | --- |
| Escarlata/Púrpura | `currentLocationId` (bloque PlayerSave_CurrentLocationId, int32), `lastRoomMapName`, `lastSubField` | Identificador de ubicación → `gen9/text_sv_00000_es.txt`. Contraste: 130 Academia Naranja (sala `a_sch_entrance01`), 131 Academia Uva, 134 Villa Versui (región Noroteo), 10 Liga Pokémon (`a_pl11`). Sin él, la región de `KPlayerCurrentFieldID`. |
| Leyendas Arceus | `map` (`Coordinates8a.M`) | `ha_area00`…`ha_area05` → Villa Jubileo y las cinco áreas (`gen8a/text_la`, índices 6-11). El orden se comprueba con los fuegos fatuos por área (7 en Villa Jubileo y 20 en cada área). Un sufijo (`_s02`) indica interior. |
| Leyendas Z-A | `map` (`Coordinates9a.Map`) | `t1` → Ciudad Luminalia (nombre de `gen6/text_xy`); otros mapas quedan sin nombre. |
| Diamante Brillante/Perla Reluciente | lectura directa de `ZoneID` (0x5634) | La zona es el identificador de ubicación (`gen8b/text_bdsp`), cruzado con la enumeración `ZoneID` pública (659 zonas). |
| Espada/Escudo | `mapHash` (`Coordinates8.M`) | FNV-1a de 64 bits del nombre interno de la zona (reproducido con partidas públicas: `a_t0101_i0101`, `a_wr0201`, `a_d0901`). Cada código se identifica con pruebas de la lista pública de banderas de SWSH (formato de PKHeX) o de pkNX: `t0101` Pueblo Yarda (casa inicial, `MOTHER`), `t0401` Pueblo Amura (líder de agua), `t0501` Pueblo Ladera (mural), `t0601` Pueblo Plié (líder de hada), `t0801` Pueblo Crampón (persiana), `wr01xx` Área Silvestre (eventos `WR_`), `wr02xx` Isla de la Armadura (pkNX), `wr03xx` Nieves de la Corona (puertas de los Regis, Virizion, Terrakion), `bt0101` Torre Batalla (pkNX). El resto queda sin nombre. |
| Let's Go | `mapHash` (`Coordinates7b.M`) | Pendiente: el hash de la casa inicial no corresponde a los patrones de nombre probados. |

El motor se compila con `scripts/build-browser-engine.sh` (SDK de .NET 10 de Ubuntu, sin el componente wasm-tools,
como la versión anterior) y `scripts/audit-browser-engine.cjs` comprueba los hashes.
