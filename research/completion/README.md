# El 100 % de cada juego: criterios, fuentes y comprobación

La lista de objetivos de la web (`MASTER_DATA` en `atlas.html`) define qué significa terminar al 100 % cada
edición. Cada objetivo cita su fuente en el texto «cómo».

## Definición del 100 % (indicada por el propietario el 12/11/2026)

Un juego está al 100 % cuando la partida cumple tres pilares, y la guía lleva paso a paso y en orden por cada uno
con las metas, desafíos y legendarios propios de esa edición:

1. **Tarjeta de entrenador al máximo** (estrellas, color o sellos del pasaporte): Hall de la Fama, Pokédex, instalación
   de combate, concursos/minijuegos de la región y la mecánica de exploración o cooperación de cada edición
   (Subsuelo, Pokéwood, Árbol de Combate…). Objetivos `card-*` y sellos de cada juego.
2. **Reconocimientos del desarrollador**: los diplomas del director del juego (regional y nacional, y los de cada
   Pokédex de zona o DLC) y el Amuleto Iris; también el Amuleto Oval cuando es un premio de Pokédex o de combate.
   Objetivos `diploma-regional`, `diploma-nacional`, `shiny-charm` y `oval-charm`.
3. **Cierre de tramas y jefes ocultos**: episodios posliga (Delta, Rainbow Rocket, Sabios de Plasma…), todos los
   legendarios fijos del mapa y el entrenador más fuerte de la edición (Rojo, Máximo en la Cascada Meteoro, Morimoto
   en las oficinas de Game Freak…). Objetivos `postgame`, `pokemon-*` y `final-boss`.

Cómo se acreditan los nuevos objetivos del pilar 2 y 3 (todos con fuente en su texto «cómo»):

- **Diplomas por el mismo recuento que hace el juego** (pret): Hoenn de RZE (`HasAllHoennMons`), nacional de RZ
  (`CompletedNationalPokedex` de pokeruby: 380 especies, con su error de índice que no pide a Chikorita y sí a Lugia y
  Ho-Oh), nacional de Esmeralda y RFVH (`HasAllMons`), Kanto de RFVH (`HasAllKantoMons`), nacional de DP
  (`Pokedex_NationalDexIsComplete`: 482 sin los 11 singulares del juego), Sinnoh de DP (`Pokedex_SinnohDexIsComplete`:
  150 VISTOS de la Pokédex de Sinnoh sin Manaphy; lista sacada de `poketool/shinzukan.narc` de la ROM de Diamante) y
  Kanto de Let's Go.
- **Diplomas por su bandera de entrega**: Platino `FLAG_RECEIVED_LOCAL_DEX_DIPLOMA` 0xAB y
  `FLAG_RECEIVED_NATIONAL_DEX_DIPLOMA` 0xAC (pokeplatinum; misma numeración de `generated/vars_flags.txt` que la
  0x69 de la enfermera, contrastada con la partida del propietario); HGSS `FLAG_SAW_JOHTO_DEX_CERTIFICATE` 0x143 y
  `FLAG_SAW_NATIONAL_DEX_CERTIFICATE` 0x144 (pokeheartgold, Mansión Azulona).
- **Amuletos por el objeto clave**: Amuleto Iris 632 y Amuleto Oval 631 (`ItemStorage*` de PKHeX los lista en los
  objetos clave de cada edición). En Sol/Luna, Ultrasol/Ultraluna, Espada/Escudo y DBPR el Amuleto Oval lo da
  Morimoto la primera vez que se le vence, así que acredita ese combate (WikiDex «Amuleto Oval»).
- **Máximo en la Cascada Meteoro** (Esmeralda): `FLAG_DEFEATED_METEOR_FALLS_STEVEN` 0x4F8 (pokeemerald).

Sin dato en la partida (se marcan a mano; motivo en `pendientes.json`): diploma de Sinnoh de DBPR, diplomas de Teselia, Kalos, ROZA, DBPR y Galar, y Morimoto/Nishino en Teselia (combate
diario sin registro conocido).

## Fuentes y cómo se contrastan

- **Código del juego** (decompilaciones de pret, revisión fijada): estrellas de la tarjeta de Rubí/Zafiro,
  Esmeralda, Rojo Fuego/Verde Hoja y Platino; diploma de la primera y segunda generación (total de capturados).
- **WikiDex** (en español, con los nombres oficiales), consultada con su API de MediaWiki desde el PC: ficha de
  entrenador de todas las generaciones, Pokédex, Nexárbol, Musical, Liga Arándano y Bosque Blanco.
- **Serebii**, consultado desde el PC: índice de contenidos de los 22 juegos (inventario de instalaciones,
  coleccionables y minijuegos) y páginas de cada contenido para cifras y condiciones.
- **PokéWiki** (alemana), como tercera fuente cuando las otras discrepan. Ejemplo: en Negro/Blanco la tarjeta pide
  todos los poderes regalo de la Zona Nexo (Serebii y PokéWiki); WikiDex atribuía también a Negro/Blanco el
  Nexárbol a nivel 30, que en realidad es de Negro 2/Blanco 2.
- **PKHeX.Core** (revisión fijada): nombres oficiales en español de lugares y objetos; cuando un nombre no se ha
  podido confirmar, se deja el inglés entre comillas en lugar de inventarlo.
- **Juegos propios** (solo lectura en el PC): tablas de zonas y de áreas extraídas de las ROM/NSP/XCI.

## Qué comprueba el guardado por sí solo

Además de la historia y la Pokédex, se acreditan solos desde el guardado: el diploma de la 1.ª y 2.ª generación,
las Pokédex exactas de cada juego, los sellos del pasaporte de Alola, las 255 medallas de Negro 2/Blanco 2 y estos
coleccionables de bloques con nombre de PKHeX: Diglett de Alola, huellas de las Espadas de la Justicia, vatios del
Dojo y combates restringidos (Espada/Escudo) y fuegos fatuos (Leyendas Arceus). Están contrastados con partidas
públicas reales (por ejemplo, una partida de Escudo con las tres huellas al 100 % y otra de Leyendas Arceus con los
107 fuegos fatuos). En Rubí/Zafiro/Esmeralda también se acreditan la Pokédex de Hoenn de la tarjeta (las 200 primeras de HOENN_DEX, generadas desde pokeemerald), los cinco cuadros del museo (FLAG_*_PAINTING_MADE) y, en Esmeralda, los 14 símbolos del Frente Batalla (HasAllFrontierSymbols).

Desde el 12/11/2026 se acreditan también desde el guardado (comprobado con las partidas del propietario de los 39 juegos):

- **Fin de la historia:** Gen. I (contador del Salón de la Fama), Gen. II (`EVENT_BEAT_ELITE_FOUR`), Gen. III
  (`FLAG_SYS_GAME_CLEAR` de cada familia), Negro/Blanco (bandera 2400 de PKHeX), Let's Go (`FSYS_GAME_CLEAR`),
  Espada/Escudo (victorias en la Torre Batalla o el Torneo de las Estrellas, que se abren tras ser campeón),
  Escarlata/Púrpura (`FSYS_SCENARIO_GAME_CLEAR`, contrastado con una partida acabada y otra sin acabar) y Leyendas Z-A
  (misión 37, el combate final; tabla de misiones sacada de la copia propia).
- **Historia por pasos:** las 42 misiones principales de Z-A con su título y las pruebas de Alola por sus cristales Z.
- **Reconocimientos y desafíos:** Amuleto Iris (objeto 632) en Espada/Escudo, Leyendas Arceus, Escarlata/Púrpura y Z-A;
  estrella de la Torre Batalla de Rubí/Zafiro (mejor racha > 49, pokeruby); huellas de oro de los Ases del Frente
  Batalla (HGSS, Platino); Mansión Batalla (X/Y, Rubí Omega/Zafiro Alfa); un Superconcurso rango Maestro (DP, Platino);
  cámaras secretas de las Ruinas Alfa (HGSS); Rubí y Zafiro para Celio (RF/VH); Rojo y los títulos de Entrenador
  Maestro (Let's Go); Torre Batalla (Espada/Escudo); Pokédex de Hisui; misiones 38-42 y secundarias de Z-A.
- **Quinta generación:** los 100 complementos del Musical (Negro/Blanco y Negro 2/Blanco 2; bits de `Musical5`), el
  Torneo Campeones del PWT (récord 17 de `PWTBlock5`) y la Zona Nexo con los niveles blanco y negro a 30 (Negro 2/Blanco 2;
  `Entralink5`, umbral de la tarjeta según Serebii). Contrastado con la partida «100» de Negro 2 del propietario (100
  complementos, Torneo Campeones ganado, niveles 100/100) y con las de Blanco 2 y Negro/Blanco (15-17 complementos, sin
  Torneo Campeones). Los bloques 42, 53 y 63 entran en la comprobación de integridad del lector propio.
- **Formas de Unown:** las 28 de HeartGold/SoulSilver (lista de formas de `Zukan4`, Pokédex + 0x10C; HeartGold del
  propietario 28, SoulSilver 1) y las 26 letras de Oro/Plata/Cristal (`wUnownDex` de pokecrystal, `SAV2Offsets.PokedexSeen`
  + 0x20; Cristal del propietario 14). Las cámaras de las Ruinas Alfa de HGSS exigen además las 28 formas.
- **Objetos de campo de la 1.ª generación:** Visor Silph, Poké Flauta y MO01-MO05 en la mochila o el PC (índices de
  pokered 0x48, 0x49, 0xC4-0xC8). Solo se acredita si están todos, porque las MO se pueden tirar: el Verde del propietario
  los tiene en el PC; Rojo, Azul y Amarillo no conservan todas las MO y quedan sin acreditar.
- **Tarjeta de HeartGold/SoulSilver:** la función que cuenta sus estrellas (pokeheartgold `sub_020691E8`, que usa
  `ScrCmd_GetTrcardStars`) da las cinco condiciones: fin de la historia, Pokédex Nacional, estadísticas 0/2/4/6/8 del Frente
  Batalla ≥ 100, `FLAG_UNK_0F1` y `FLAG_UNK_184`. La 0xF1 abre la sala «Potential» del Pokéathlon («mejor récord en todas
  las pruebas», scr_seq_0127_D49R0106) y la 0x184 se pone al entregar la corona de hojas doradas (scr_seq_0849_T20R0402).
  Las dos se acreditan; las rachas del Frente Batalla siguen sin poder leerse (ver abajo).
- **Torre Batalla de Platino:** `TrainerCase_CalculateTrainerCardLevel` (pokeplatinum) da la estrella con un récord ≥ 100
  en cualquiera de las cinco modalidades (`BattleFrontierStats.soloStats`, parejas récord/actual). El bloque empieza 4 bytes
  tras el grito de Chatot de PKHeX (0x68DC), el mismo desfase que da pokediamond en Diamante/Perla (4 + 0x3C bytes hasta
  los BP que PKHeX lee en 0x65F8) y el que se contrastó en HGSS. En la partida de Platino del propietario salen parejas
  coherentes (récord ≥ racha actual) seguidas de los datos de la Fábrica Batalla, con la misma forma que en HGSS.
- **Torre Batalla de HeartGold/SoulSilver:** `FrontierSave` de pokeheartgold (`u16 unk_000[112]`, tamaño 0x1628); la tarjeta
  lee las estadísticas 0/2/4/6/8. El bloque empieza en 0x5264 de la partición general (4 bytes tras el grito de Chatot de
  PKHeX): en una partida pública con 534 BP sale Torre 105/105 y Fábrica 49/49 con 39 cambios, una secuencia coherente;
  en las partidas del propietario (0 BP) todo es cero.
- **Revancha de la Liga en la 1.ª generación:** segunda entrada del Salón de la Fama (`wHallOfFameCount` de pokered,
  `SAV1.HallOfFameCount` de PKHeX). El Verde del propietario tiene 2 (acreditado); Rojo, Azul y Amarillo, 1.
- **Revancha de la Liga en Rojo Fuego/Verde Hoja:** las cuatro banderas de entrenador de `TRAINER_ELITE_FOUR_*_2`
  (pokefirered; 0x500 + 735-738). Las del Campeón no valen: `EventScript_ResetEliteFour` (hall_of_fame.inc) las borra al
  entrar en el Salón de la Fama. La numeración se contrastó con las partidas del propietario (las banderas del primer Alto
  Mando, 0x500 + 410-413, están activas; las del Campeón, borradas).
- **Monte Plateado en Oro/Plata/Cristal:** `EVENT_OPENED_MT_SILVER` (OaksLab de pokegold/pokecrystal) más el Billete Barco
  (0x44) y el Pase (0x86) en el inventario. Acreditado en las tres partidas del propietario.
- **Objetos de acceso de Hoenn:** Gafas Aislantes (279) y Detector Devon (288), y el Emblema Magma (375) en Esmeralda
  (pokeruby/pokeemerald `items.h`). Rubí, Zafiro y Esmeralda del propietario los conservan. La Llave Sótano (zona opcional)
  y el Escáner (se entrega al capitán) no cuentan.
- **Objetos clave de la 6.ª generación:** Megaaro (696) en X/Y; Gafas Aislantes (728), Detector Devon (735) y Flauta Eón
  (775) en Rubí Omega/Zafiro Alfa (números de objeto de PKHeX). Las cuatro partidas del propietario los tienen.
- **Objetos clave de Negro 2/Blanco 2 y Espada/Escudo:** N2/B2 exige Punta ADN (628), Espejo Veraz (638) y Piedra Magma
  (458), leídos por el lector propio del bolsillo de objetos clave (bloque 25, `PlayerBag5B2W2`, ahora dentro de la
  comprobación de integridad). Espada/Escudo exige Maximuñequera (1077), Catálogo Rotom (1278), Punta ADN (629),
  Necrosol/Necroluna (945/946), Riendas Unión (1591) y los pases de Isla de la Armadura y Nieves de la Corona (1584/1597).
  Negro 2 y Espada del propietario los tienen; Blanco 2 y Escudo, no.
- **Recursos de Alola:** los 18 cristales Z de tipo (807-824), el Arca de Zygarde (847) y la Pulsera Z (797) o la
  Superpulsera Z (933 en USUM). Luna, Ultrasol y Ultraluna del propietario los tienen; a Sol le faltan tres cristales.
- **Objetos de Leyendas Arceus:** Tabla Legendaria (1828), Cadena Roja (441), Flauta Azur (455) y las grandes esferas
  Diamansfera, Lustresfera y Griseosfera (1777-1779). La partida del propietario los tiene todos.
- **Pokédex y singulares sin criterio hasta ahora:** «Completar Pokédex de Kanto» (diploma de la 1.ª gen. y recuento de
  Kanto de RF/VH), «Completar Pokédex Nacional aplicable» (diploma de la 2.ª gen.), «Completar Pokédex de Hoenn» (recuento de
  Hoenn de RZE y ROZA) y los objetivos de singulares de evento (Mew, Celebi, Victini/Keldeo/Meloetta/Genesect, Magearna,
  Marshadow/Zeraora, Diancie/Hoopa/Volcanion, Mew/Deoxys/Jirachi —cualquiera—, Darkrai/Shaymin/Arceus, Manaphy, Zarude y
  Celebi + Arceus en HGSS) se acreditan con el registro de capturados de la Pokédex, igual que los «Registrar a…».
- **Objetivos generales con datos ya existentes:** «Completar las instalaciones de combate» usa los 14 símbolos del Frente
  Batalla en Esmeralda y la estrella de la Torre Batalla en Rubí/Zafiro; «Concursos Pokémon y sus recompensas principales»,
  los cinco cuadros del museo (solo se pintan al ganar un rango Maestro); en DB/PR, «Superar Torre Batalla y retos de
  concursos avanzados» exige la racha de 100 y un Superconcurso Maestro.
- **Pokédex regionales de la 9.ª generación:** el motor cuenta, con `PersonalInfo9SV`/`PersonalInfo9ZA` de PKHeX, las especies
  de Paldea, Noroteo y Arándano (cualquier forma con número en esa Pokédex) y de Luminalia e Hiperespacio, hasta el
  `MaxSpeciesID` de la partida. «Completar Pokédex de Paldea, Noroteo y Arándano» exige las tres; la de Z-A, las dos. Una
  partida pública de Escarlata da Paldea 398/398, Noroteo 100/191 y Arándano 62/220.
- **Torre Desafío de Rojo Fuego/Verde Hoja:** `trainerTower[4]` de SaveBlock1 (0x3D38, pokefirered) con el mejor tiempo
  cifrado con la clave de SaveBlock2 (0xF20); superada = tiempo < 215999 en las cuatro. Contrastado con PKHeX en las tres
  partidas del propietario: el descifrado da exactamente 215999 (sin récord) en todas.
- **Posliga y DLC de Espada/Escudo:** final de la historia, el legendario de la edición capturado (Zacian 888 en Espada,
  Zamazenta 889 en Escudo, que se captura tras la crisis posliga), Urshifu (892, cierre de la Isla de la Armadura) y las
  capturas de las Nieves de la Corona.
- **Posliga de Hoenn:** legendarios registrados en la Pokédex: Regirock/Regice/Registeel, Rayquaza y el de la portada en
  Rubí/Zafiro; los seis (con Groudon y Kyogre) en Esmeralda; Rayquaza, Deoxys y el de la portada (Episodio Delta) en ROZA.
- **Posliga de Sinnoh, DB/PR y Sol/Luna:** legendarios de cada edición registrados en la Pokédex (trío de los lagos,
  Heatran, Regigigas, Giratina, Cresselia y el de la portada; en Sol/Luna, los Ultraentes de la edición y Necrozma).
- **Posliga de Teselia y DLC de Z-A:** Negro/Blanco: Cobalion, Terrakion, Virizion y Kyurem; N2/B2: los tres Regis, Regigigas
  y las Espadas de la Justicia; Megadimensión de Z-A: Hoopa. Todos por el registro de capturados de la Pokédex.
- **La enfermera te reconoce (tarjeta de oro):** nuevo objetivo en Esmeralda, Platino y HGSS. Con 4 estrellas o más la
  enfermera te llama por tu nombre y cura sin preguntar (pokeemerald `pkmn_center_nurse.inc`, pokeplatinum `common.s`,
  pokeheartgold `scr_seq_0003`); la primera vez queda una bandera (0x159, 0x69 y 0x64). Esmeralda y Platino del propietario
  la tienen; HGSS no (no llega a 4 estrellas). Rubí/Zafiro y RF/VH no tienen este saludo; DP sin decompilación con nombres.
- **Pokéstar Studios (N2/B2):** bloque 71 (0x25A00, ahora en la comprobación de integridad): 40 registros de 20 bytes desde
  +0x28 con la mejor puntuación (−9999 sin rodar) y un indicador en +16 que vale 1 al completar la película. Deducido
  comparando la partida «100» de Negro 2 (40/40) con la de Blanco 2 (un intento fallido) y las públicas (0/40).
- **Leyendas Arceus:** «Derrotar a Volo y superar desafíos de combate posteriores» exige `KDefeatedArceus`
  (FSYS_SCENARIO_CLEARED_URA) y `KCompletedEternalBattleReverie` (marca de la tarjeta por la racha de 50 con Fero). En la
  partida del propietario la primera está activa y la segunda no (récord 0), así que sigue sin acreditar.

Pendiente con motivo (no se acredita solo para no adivinar):

- **Torre Batalla de Diamante/Perla (racha de 100):** en pokediamond el bloque (`FrontierData`) solo guarda BP, banderas y
  contadores por modalidad (`u_C[5]`), sin la racha récord, y PKHeX no tiene un récord de juego equivalente.
- **Episodio Rainbow Rocket (USUM):** la bandera 211 («Lusamine's Mansion is NOT Team Rocket's Castle») también vale antes
  del episodio, así que sola no sirve. Ahora se acredita con la 211 más alguno de los Electrode desaparecidos dentro del
  castillo (1730-1732, solo posibles durante el episodio): Ultraluna del propietario la cumple. Si no se capturó ningún
  Electrode no se puede probar, y no se acredita.
- **Torre de Ciudad Negra / Bosque Blanco (N2/B2):** el récord 48 («Tower/Treehollow Trainers Defeated») cuenta
  entrenadores, no zonas superadas.
- **Poderes regalo de la Zona Nexo (Negro/Blanco):** PKHeX solo expone `MissionsComplete`, que no distingue qué poderes
  se han recibido.
- **Zygarde, pegatinas dominantes y Mantine Surf (Alola):** PKHeX da las células recogidas (`EventWork7`, trabajo 169 y
  lista de 95/100 posiciones; Sol 95/95, Ultrasol y Ultraluna 100/100 en las partidas del propietario), pero no los cinco
  núcleos que pide el objetivo. El récord 72 («Stickers Collected») marca 102 en una partida de Ultraluna, más que las 100
  pegatinas que existen, así que no cuenta pegatinas distintas; y los récords de Mantine Surf (73, 189, 198) son puntos y
  partidas, no los cuatro recorridos superados.
- **Revanchas de Let's Go y estrellas de la Tarjeta de Liga (Espada/Escudo):** la tabla de banderas de PKHeX para Let's Go
  (`flags_gg`) no tiene ninguna de revancha de líderes, y `TrainerCard8` no guarda las estrellas de la tarjeta.
- **Liga reforzada de HeartGold/SoulSilver:** el combate pasa a `TRAINER_CHAMPION_LANCE_2` cuando `VAR_UNK_4135` (medallas
  de Kanto, pokeheartgold scr_seq_0824_T10R0601) llega a 8, pero ni la Liga normal ni la reforzada dejan banderas de
  entrenador (`TRAINER_FLAG_BASE` 0x550): en las dos partidas del propietario, con la Liga ganada, están todas a cero. Solo se
  sabe que está disponible, no que se haya ganado.
- **Minijuegos y retos de los DLC de Escarlata/Púrpura** (ogros de Noroteo, vuelo contrarreloj, fotos de Perrin, Liga
  Arándano, Pecharunt): `SaveBlockAccessor9SV` no tiene bloques con nombre para ellos; habría que localizarlos en los datos
  del juego, como se hizo con las misiones de Z-A.
- **Peticiones de Leyendas Arceus y «las dos sendas» de Fero:** `SaveBlockAccessor8LA` no expone las peticiones. En la
  partida del propietario, entre los bloques sin nombre de PKHeX, `48CE01F7` resulta ser los nombres de las cajas de objetos
  y `B8E961AD` (251 bytes) un campo de bits sin estructura evidente; sin una partida con las peticiones completas o la tabla
  del juego no se puede asignar.
- **Expansiones de Escarlata/Púrpura:** las señales `FSYS_SCENARIO_GAME_CLEAR_SU1/SU2` existen, pero ninguna partida
  disponible tiene el DLC acabado para un contraste positivo.

## Matriz por juego

| Juego | Objetivos | Se comprueban solos con el guardado | Por categoría |
| --- | ---: | ---: | --- |
| RED | 11 | 6 | Historia 1, Postgame 1, Combates 1, Objetos clave 1, Pokédex 1, Legendarios 4, Tarjeta / reconocimiento 1, Evento histórico 1 |
| GREEN | 11 | 6 | Historia 1, Postgame 1, Combates 1, Objetos clave 1, Pokédex 1, Legendarios 4, Tarjeta / reconocimiento 1, Evento histórico 1 |
| BLUE | 11 | 6 | Historia 1, Postgame 1, Combates 1, Objetos clave 1, Pokédex 1, Legendarios 4, Tarjeta / reconocimiento 1, Evento histórico 1 |
| YELLOW | 11 | 6 | Historia 1, Postgame 1, Combates 1, Objetos clave 1, Pokédex 1, Legendarios 4, Tarjeta / reconocimiento 1, Evento histórico 1 |
| GOLD | 15 | 7 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 5, Tarjeta / reconocimiento 1, Evento histórico 2, Coleccionables 1 |
| SILVER | 15 | 7 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 5, Tarjeta / reconocimiento 1, Evento histórico 2, Coleccionables 1 |
| CRYSTAL | 15 | 7 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 5, Tarjeta / reconocimiento 1, Evento histórico 2, Coleccionables 1 |
| RUBY | 19 | 11 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 7, Tarjeta / reconocimiento 4, Evento histórico 1, Puzles 1 |
| SAPPHIRE | 19 | 11 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 7, Tarjeta / reconocimiento 4, Evento histórico 1, Puzles 1 |
| EMERALD | 20 | 13 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 8, Tarjeta / reconocimiento 4, Evento histórico 1, Puzles 1 |
| FIRERED | 19 | 11 | Historia 1, Postgame 2, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 7, Tarjeta / reconocimiento 4, Evento histórico 1 |
| LEAFGREEN | 19 | 11 | Historia 1, Postgame 2, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 7, Tarjeta / reconocimiento 4, Evento histórico 1 |
| DIAMOND | 21 | 10 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 8, Tarjeta / reconocimiento 5, Evento histórico 2 |
| PEARL | 21 | 10 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 8, Tarjeta / reconocimiento 5, Evento histórico 2 |
| PLATINUM | 23 | 11 | Historia 1, Postgame 1, Combates 3, Objetos clave 1, Pokédex 1, Legendarios 9, Tarjeta / reconocimiento 5, Evento histórico 2 |
| HEARTGOLD | 30 | 14 | Historia 1, Postgame 1, Combates 4, Objetos clave 2, Pokédex 1, Legendarios 12, Puzles 1, Tarjeta / reconocimiento 5, Evento histórico 2, Coleccionables 1 |
| SOULSILVER | 30 | 14 | Historia 1, Postgame 1, Combates 4, Objetos clave 2, Pokédex 1, Legendarios 12, Puzles 1, Tarjeta / reconocimiento 5, Evento histórico 2, Coleccionables 1 |
| BLACK | 20 | 9 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 8, Tarjeta / reconocimiento 5, Evento histórico 1 |
| WHITE | 20 | 9 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 8, Tarjeta / reconocimiento 5, Evento histórico 1 |
| BLACK2 | 30 | 18 | Historia 1, Postgame 1, Combates 4, Objetos clave 1, Pokédex 1, Legendarios 15, Reconocimiento 1, Tarjeta / reconocimiento 5, Evento histórico 1 |
| WHITE2 | 30 | 18 | Historia 1, Postgame 1, Combates 4, Objetos clave 1, Pokédex 1, Legendarios 15, Reconocimiento 1, Tarjeta / reconocimiento 5, Evento histórico 1 |
| X | 17 | 8 | Historia 1, Postgame 1, Combates 3, Objetos clave 1, Pokédex 1, Legendarios 6, Tarjeta / reconocimiento 3, Evento histórico 1 |
| Y | 17 | 8 | Historia 1, Postgame 1, Combates 3, Objetos clave 1, Pokédex 1, Legendarios 6, Tarjeta / reconocimiento 3, Evento histórico 1 |
| OMEGARUBY | 35 | 27 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 25, Tarjeta / reconocimiento 3, Evento histórico 1 |
| ALPHASAPPHIRE | 35 | 27 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 25, Tarjeta / reconocimiento 3, Evento histórico 1 |
| SUN | 33 | 25 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 9, Tarjeta / reconocimiento 15, Evento histórico 2, Coleccionables 1 |
| MOON | 33 | 25 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 9, Tarjeta / reconocimiento 15, Evento histórico 2, Coleccionables 1 |
| ULTRASUN | 36 | 25 | Historia 1, Postgame 3, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 9, Coleccionables 2, Tarjeta / reconocimiento 15, Evento histórico 2 |
| ULTRAMOON | 36 | 25 | Historia 1, Postgame 3, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 9, Coleccionables 2, Tarjeta / reconocimiento 15, Evento histórico 2 |
| LETGOP | 12 | 5 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 4, Tarjeta / reconocimiento 1, Evento histórico 1 |
| LETGOE | 12 | 5 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 4, Tarjeta / reconocimiento 1, Evento histórico 1 |
| SWORD | 32 | 24 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 19, Tarjeta / reconocimiento 2, Evento histórico 2, Coleccionables 3 |
| SHIELD | 32 | 24 | Historia 1, Postgame 1, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 19, Tarjeta / reconocimiento 2, Evento histórico 2, Coleccionables 3 |
| BD | 19 | 10 | Historia 1, Postgame 1, Combates 1, Objetos clave 1, Pokédex 1, Legendarios 8, Tarjeta / reconocimiento 5, Evento histórico 1 |
| SP | 19 | 10 | Historia 1, Postgame 1, Combates 1, Objetos clave 1, Pokédex 1, Legendarios 8, Tarjeta / reconocimiento 5, Evento histórico 1 |
| ARCEUS | 20 | 10 | Historia 1, Postgame 2, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 8, Tarjeta / reconocimiento 2, Evento histórico 1, Coleccionables 2 |
| SCARLET | 25 | 11 | Historia 1, Postgame 6, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 10, Evento histórico 3, Tarjeta / reconocimiento 1 |
| VIOLET | 25 | 11 | Historia 1, Postgame 6, Combates 2, Objetos clave 1, Pokédex 1, Legendarios 10, Evento histórico 3, Tarjeta / reconocimiento 1 |
| ZA | 14 | 4 | Historia 1, Postgame 4, Combates 1, Objetos clave 1, Pokédex 1, Legendarios 3, Tarjeta / reconocimiento 1, Evento histórico 2 |
