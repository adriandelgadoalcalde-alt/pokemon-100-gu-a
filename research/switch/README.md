# Switch: posición del jugador

El motor del navegador exporta `switchPosition` (`pkhex-extractor/NamedBlocks.cs`, `Position`) con las clases de
PKHeX.Core fijadas, en solo lectura:

| Juego | Dato exportado | Traducción |
| --- | --- | --- |
| Escarlata/Púrpura | `currentLocationId` (bloque PlayerSave_CurrentLocationId, int32), `lastRoomMapName`, `lastSubField` | Identificador de ubicación → `gen9/text_sv_00000_es.txt`. Contraste: 130 Academia Naranja (sala `a_sch_entrance01`), 131 Academia Uva, 134 Villa Versui (región Noroteo), 10 Liga Pokémon (`a_pl11`). Sin él, la región de `KPlayerCurrentFieldID`. |
| Leyendas Arceus | `map` (`Coordinates8a.M`) | `ha_area00`…`ha_area05` → Villa Jubileo y las cinco áreas (`gen8a/text_la`, índices 6-11). El orden se comprueba con los fuegos fatuos por área (7 en Villa Jubileo y 20 en cada área). Un sufijo (`_s02`) indica interior. |
| Leyendas Z-A | `map` (`Coordinates9a.Map`) | `t1` → Ciudad Luminalia (nombre de `gen6/text_xy`); otros mapas quedan sin nombre. |
| Diamante Brillante/Perla Reluciente | lectura directa de `ZoneID` (0x5634) | La zona es el identificador de ubicación (`gen8b/text_bdsp`), cruzado con la enumeración `ZoneID` pública (659 zonas). |
| Espada/Escudo | `mapHash` (`Coordinates8.M`) | FNV-1a de 64 bits del nombre de área. Los 246 nombres salen del propio juego (`swsh-areas.json`, tabla AHTB de `data_table.gfpak`, Espada 1.3.2). Pueblos y ciudades identificados por el orden de los combates de gimnasio (`btl07_t0301` Hoyuelo, `btl10_t0401` Amura, `btl11_c0101` Pistón, `btl13/14_t050x` Ladera, `btl16_t0601` Plié, `btl19/20_t070x` Auriga, `btl23_t0802` Crampón, `btl24_c0301` Artejo; `btl41_c0201` Puntera) y por eventos (casa inicial, líder de agua, mural, líder de hada, persiana). `rNN` = Ruta N; `wr01-03` Área Silvestre, Isla de la Armadura y Nieves de la Corona; `bt` Torre Batalla. Detalle: estadio, Centro Pokémon, interior o combate. Cada área trae sus zonas (`swsh-zones.json`, de `placement.gfpak`, esquema `PlacementZoneArchive` de pkNX): nombre interno (`z_t0101`…), hash y los puntos (x, z) de lo colocado en ella. Las cuevas y subzonas silvestres toman su lugar de la tabla zona → lugar de pkNX (`swsh-zone-locations.json`). En las 10 áreas que mezclan lugares (`a_0101` = Pueblo Yarda, Ruta 1, Pueblo Par y Ruta 2, el Área Silvestre…) se elige la zona del punto colocado más cercano a la posición (X/Y del guardado = X/Z del juego); sin posición, la región o la lista de lugares. Contraste: partida de Escudo a los 2 minutos en Pueblo Yarda (casa inicial); partida de Espada en `a_0401` = Pueblo Amura. Sin nombre: 36 de 246 (interiores de combate `btl`, cuevas `d05`-`d09` y `d0102`, `pl`, `tr`, `vs`, `cm`), sin correspondencia publicada. Límite: Ojo de Axew, Arboleda Claroscuro, Lago Milotic (sur) y Silla del Gigante no tienen colocaciones propias; ahí sale la subzona vecina más cercana. |
| Let's Go | `mapHash` (`Coordinates7b.M`) | FNV-1a de 64 bits del nombre de área. Los 147 nombres salen de `AreaNameHashTable.tbl` del juego (`lgpe-areas.json`; la casa inicial es `t001r01` = `C575D7D020856017`). `t001`…`t011` siguen el orden de los mapas de Rojo/Azul, el mismo de PKHeX (Pueblo Paleta…Ciudad Azafrán): `t001` y `t005` sin gimnasio, `t004d01` Cueva Celeste, `t007` sin tienda propia, `t010champ` Liga Pokémon, `t011` con cuatro garitas. `rNNN` = Ruta N; cuevas por su ruta (Monte Moon, Túnel Roca, Central de Energía, Cueva Diglett, Islas Espuma, Calle Victoria). Las áreas exteriores `area01`…`area09` reúnen varios pueblos y rutas: sus rectángulos de zona salen de los `*_zone.gfbcol` de la copia propia (`lgpe-zones.json`; `townNNN`/`roadNNN` con la misma numeración) y se elige el que contiene la posición (X/Y del guardado = X/Z del mapa; si se solapan, el menor; si ninguno, el más cercano). Contraste: partida de Let's Go Eevee del propietario en `area07` = Ciudad Azafrán. Sin nombre: `s001`, `com_chika`, `safari`. |

Herramienta local para leer juegos propios de Switch: un programa de consola con LibHac 0.19.0 (NuGet) en el PC, con las claves propias; abre el NSP/XCI con su actualización y busca o extrae ficheros de la RomFS. No se publica ni sale del PC.

Leyendas Z-A: la historia vive en `KEventWorkQuest` (0xB9B223B9, pares clave u64 → valor u64). Los nombres de las
variables (`SYS_WORK_MAINQUEST_AA_BB`, `SYS_WORK_QUEST_N`) y los títulos en español de cada misión salen de la copia
propia (`ik_event/bin/flag/quest_work.bin`, `ik_message/dat/Spanish/common/questlist_main|questlist_sub`): los paquetes
Trinity (`arc/data.trpfd` + `arc/data.trpfs`, esquemas de pkNX) están comprimidos con Oodle Kraken y se leen en el PC
con `tools/ooz` (descompresor abierto de powzix, GPL-3.0); el juego base viene en `.nsz` y se descomprime con `nsz`
pasándole las claves en su sitio. La clave de cada variable es el FNV-1a de 64 bits de su nombre: casan las 322 de la
partida del propietario y las 301 de la pública de RoC's PC (también `system_work`, `system_flag` y `event_flag`).
Valores: 0 sin hacer y 255 completada (partida del propietario: las 42 principales y 256 de 263 secundarias; pública:
118 de 256 secundarias). La numeración de las 42 misiones principales con título coincide con la del juego (40, 41 y
42 = Xerneas, Yveltal y Zygarde); el combate final de la historia es la misión 37 («El plan para salvar Ciudad
Luminalia», `t1_last_battle`), que marca el fin de la historia. Tabla: `za-quests.json` → `src/saves/za-quests-data.js`
(`scripts/derive-za-quests.py`). Límite: no hay partida pública a mitad de la historia principal para un contraste
negativo de las principales (sí de las secundarias); las 60 secundarias 204-263 no tienen título en `questlist_sub`.

El motor se compila con `scripts/build-browser-engine.sh` (SDK de .NET 10 de Ubuntu, sin el componente wasm-tools,
como la versión anterior) y `scripts/audit-browser-engine.cjs` comprueba los hashes.

## Historia de Espada/Escudo

Las medallas salen de `Misc8.Badges` (byte de bits; el motor las cuenta como `badgesTotal`). El bloque
`KEnteredHallOfFame` **no** sirve como prueba del título: partidas públicas recién empezadas (en Pueblo Yarda, sin
medallas) ya traen una fecha, así que el juego lo rellena antes. El título se da por hecho solo con victorias en la
Torre Batalla (`KBattleTowerSinglesVictory`/`KBattleTowerDoublesVictory`), que se abre después; sin ellas la web dice
que el Salón de la Fama aún no consta (historia parcial).
