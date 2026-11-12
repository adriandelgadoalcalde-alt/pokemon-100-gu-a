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

La pestaña de maestría muestra los objetivos de cada juego como una ruta en ocho pasos, en este orden: historia y Liga;
objetos clave y accesos; posliga y legendarios; combates y jefes ocultos; concursos, minijuegos y coleccionables;
Pokédex; diplomas, amuletos y tarjeta al máximo; eventos. El botón «Siguiente objetivo pendiente» sigue ese mismo orden
(`MASTERY_PHASES` en `atlas.html`).

Cómo se acreditan los nuevos objetivos del pilar 2 y 3 (todos con fuente en su texto «cómo»):

- **Diplomas por el mismo recuento que hace el juego** (pret): Hoenn de RZE (`HasAllHoennMons`), nacional de RZ
  (`CompletedNationalPokedex` de pokeruby: 380 especies, con su error de índice que no pide a Chikorita y sí a Lugia y
  Ho-Oh), nacional de Esmeralda y RFVH (`HasAllMons`), Kanto de RFVH (`HasAllKantoMons`), nacional de DP
  (`Pokedex_NationalDexIsComplete`: 482 sin los 11 singulares del juego), Sinnoh de DP (`Pokedex_SinnohDexIsComplete`:
  150 VISTOS de la Pokédex de Sinnoh sin Manaphy; lista sacada de `poketool/shinzukan.narc` de la ROM de Diamante) y
  Kanto de Let's Go. En DBPR, las funciones de `ZukanWork` (uDPR): `CheckShinouZukanCompSee` (la misma lista de
  Sinnoh, vistos, sin Manaphy) y `CheckZenkokuZukanCompGet` (482 sin los 11 excluidos).
- **Diplomas por su bandera de entrega**: Platino `FLAG_RECEIVED_LOCAL_DEX_DIPLOMA` 0xAB y
  `FLAG_RECEIVED_NATIONAL_DEX_DIPLOMA` 0xAC (pokeplatinum; misma numeración de `generated/vars_flags.txt` que la
  0x69 de la enfermera, contrastada con la partida del propietario); HGSS `FLAG_SAW_JOHTO_DEX_CERTIFICATE` 0x143 y
  `FLAG_SAW_NATIONAL_DEX_CERTIFICATE` 0x144 (pokeheartgold, Mansión Azulona); X/Y `SYS_FLAG_C05R0302_AWARD_01-05` (0xA7A-0xA7E: Kalos Centro, Costa, Montaña,
  Kalos completa y Nacional) y ROZA `SYS_FLAG_ZUKAN_AWARD_CHI`/`_ZEN` (0xBC6/0xBC7), de FlagsEditorEXPlugin; Teselia `FE_AWARD_LOCAL`/`FE_AWARD_NATIONAL` (N/B 0x11F/0x120, N2/B2 0xDD/0xDE), contrastadas
  con las cuatro partidas del propietario (Negro solo el regional, Negro 2 «100» los dos, Blanco y Blanco 2 ninguno).
- **Amuletos por el objeto clave**: Amuleto Iris 632 y Amuleto Oval 631 (`ItemStorage*` de PKHeX los lista en los
  objetos clave de cada edición). En Sol/Luna, Ultrasol/Ultraluna, Espada/Escudo y DBPR el Amuleto Oval lo da
  Morimoto la primera vez que se le vence, así que acredita ese combate (WikiDex «Amuleto Oval»).
- **Diplomas de Galar, Isla de la Armadura y Nieves de la Corona**: las tres marcas de Pokédex completa de la tarjeta
  (`TrainerCard8` de PKHeX), que el juego pone con la misma Pokédex que pide el director.
- **Defensa del título de campeón de Alola**: récord 100 «Champion Title Defense» de PKHeX (`records7`); contrastado con
  una partida pública de Sol acabada (24 defensas) y cuatro sin acabar (0).
- **Máximo en la Cascada Meteoro** (Esmeralda): `FLAG_DEFEATED_METEOR_FALLS_STEVEN` 0x4F8 (pokeemerald).

Sin dato en la partida (se marcan a mano; motivo en `pendientes.json`): Morimoto/Nishino en Teselia (combate
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

- **Peticiones de Leyendas Arceus (resuelto el 12/11/2026):** cada petición es un bloque de 1 byte cuya clave es el FNV-1a 64
  (32 bits bajos) de `sub_NNN`; 255 = completada (0, 1, 10 y 20 son estados intermedios). Los títulos oficiales salen de
  `bin/message/Spanish/common/questlist_sub` de la ROM y se emparejan con WikiDex «Petición»: las 94 claves que crea
  cualquier partida son las peticiones 1-94 (93 por título exacto; la 33 interna es «Volutas de luz nocturna», la 22 de
  WikiDex). Las 28 de la actualización 1.1 (95-122: 13 del Despertar y las 15 vías solitarias de Fero) son
  `sub_201-208`, `250`, `252`, `256-258` y `261-275`: las mismas en las dos partidas 1.1 (la del propietario y una pública
  «Completed»), ausentes en las 1.0 y 94 + 28 = 122, el total de WikiDex. El objetivo de Fero se corrige: lo documentado son
  las 15 vías solitarias del Dojo (Garret, peticiones 108-122), no «dos sendas»; como el reparto exacto de las 28 claves no
  está probado, se acredita con el total de las 122. La partida del propietario tiene las 94 del juego base completadas y
  ninguna del Despertar.

- **Alola (12/11/2026):** células de Zygarde de Sol/Luna (las 95 en estado «recogida» de `EventWork7.GetZygardeCell`),
  las 100 dominsignias de USUL (el mismo vector: en USUL son pegatinas, como rotula `SAV_ZygardeCell` de PKHeX y confirma el
  récord 72 «Stickers Collected»; WikiDex «Dominsignia») y los cuatro recorridos de Mantine Surf con puntuación
  (`Misc7.GetSurfScore`). Los 5 núcleos de Zygarde (SL) y las células de USUL no tienen bloque documentado: a mano.

- **Estrella de las estatuas de DBPR (12/11/2026):** `PlayerWork.GetTrainerRank` (uDPR, revisión de la 1.3.0) da la estrella
  con `UgItemWork.GetHaveStatueKindNum() >= 100`: objetos del Subsuelo de categoría estatua con cantidad > 0. El extractor
  los cuenta igual con `UndergroundItemList8b` y `UgItemUtil.GetType` de PKHeX (`statues8b`). Las mismas funciones fijan
  las otras estrellas: Hall de la Fama, Pokédex Nacional sin los 11 excluidos, 100 victorias seguidas en cualquier
  modalidad de la Torre Batalla y rango Maestro en cualquier categoría de Superconcurso.

- **Megapiedras de Leyendas Z-A (12/11/2026):** de las 92 legales de PKHeX (`ItemStorage9ZA.MegaStones`), WikiDex
  «Megapiedra» excluye 7 que solo dan los combates clasificatorios en línea y 4 de regalo misterioso; quedan 67 del juego
  base y 14 de Megadimensión (2635-2650) que se consiguen jugando. La partida del propietario tiene 88: le faltan
  Blazikenita, Swampertita, Sceptilita (clasificatorias) y Garchompita Z (regalo), así que las dos metas jugables quedan
  acreditadas. Solo se acredita la presencia en la bolsa (una megapiedra equipada podría no estar).

- **Tarjeta de Liga de Espada/Escudo (12/11/2026):** siete estrellas (WikiDex «Ficha de entrenador»): empezar, tres medallas,
  ganar la Liga y terminar los dos DLC. El fin de cada DLC está en los bloques `FSYS_R1_GAME_CLEAR` y `FSYS_R2_GAME_CLEAR`
  (y el de la historia en `FSYS_GAME_CLEAR`), localizados por el hash de su nombre con el mismo esquema que las constantes
  `FSYS_` de PKHeX: activos en la Espada del propietario y en una fixture pública acabada, ausentes sin DLC y con R1 activo
  y R2 no en una partida que solo terminó La isla de la armadura.

- **Objetivos genéricos retirados o concretados (12/11/2026):** se quitan los que repetían otro objetivo o no se aplican a la
  edición: «Liga reforzada» en Oro/Plata/Cristal (no hay revancha; solo HGSS, tras las 8 medallas de Kanto), «torneos o
  instalaciones exclusivos» en Teselia (ya están Metro Batalla y PWT), «objetos clave de acceso» en N/B (ningún legendario
  fijo pide objeto fuera de la historia), «instalaciones de combate» en DP (solo Torre Batalla, ya es estrella de la
  tarjeta) y «acceso a zonas finales» en DP/Pt (ya cubierto por la posliga de la Isla Batalla). Las revanchas de la Liga
  de HGSS, Sinnoh y Let's Go pasan a ser objetivos concretos con su fuente.

- **Rascacielos Negro / Cavernogal Blanco (N2/B2, 12/11/2026):** los textos de medallas de la ROM española (a/0/0/2,
  archivos 80 y 83, leídos con `gen5_textos.py` en el PC) dan las medallas 146/147 «Mitad/Ático Rascacielos» (5.ª y 10.ª
  zona del Rascacielos Negro) y 148/149 «Cavernogal Profundo/Abismal» (Cavernogal Blanco). La partida guarda cada
  medalla (Medallero), así que el objetivo se acredita sin adivinar.

- **Combates repetibles de Teselia: comprobado en los scripts de la ROM (12/11/2026).** Con un lector propio de los scripts
  de 5.ª generación (`gen5_scripts.py`/`gen5_dump.py` en el PC; textos con `gen5_textos.py`, incluido el formato comprimido
  de 9 bits) se leyó qué escribe el juego al ganar: Cintia en Pueblo Arenisca (N/B a/0/5/7 archivo 834; N2/B2 a/0/5/6
  archivo 832) y Morimoto/Nishino en Game Freak (archivo 96) solo ponen banderas `TMFLG_` (diarias, se borran cada día).
  Los combates con guion tampoco usan la bandera de entrenador (0x58C/0x5F0 + ID): las partidas del propietario tienen
  282/360 entrenadores normales marcados y ninguno de estos jefes, ni siquiera Iris o Mirto. Por eso estos objetivos son
  manuales: el juego no guarda la victoria.

- **Más huecos cerrados con las listas de FlagsEditorEXPlugin (12/11/2026):** X/Y `FE_HANDSOME_QUEST_ALL_CLEAR` (0xC9;
  Y del propietario 1, X 0); DP `FE_PC_GOLD` 0x69 (enfermera) y `FE_RECONGNIZE_SHINOU/NATIONAL` 0xAB/0xAC (diplomas, las mismas
  posiciones que Platino); ROZA `TRID_CHAMPION_P_01/_P_02` (revancha del campeón; el primer combate queda en
  `TRID_CHAMPION_01`, activo en las dos partidas del propietario). HGSS: la revancha de Lance y del Alto Mando no deja
  bandera (pokeheartgold `scr_seq_0824_T10R0601`).

Pendiente con motivo (no se acredita solo para no adivinar):

- **Torre Batalla de Diamante/Perla (racha de 100):** en pokediamond el bloque (`FrontierData`) solo guarda BP, banderas y
  contadores por modalidad (`u_C[5]`), sin la racha récord, y PKHeX no tiene un récord de juego equivalente.
- **Episodio Rainbow Rocket (USUM):** la bandera 211 («Lusamine's Mansion is NOT Team Rocket's Castle») también vale antes
  del episodio, así que sola no sirve. Ahora se acredita con la 211 más alguno de los Electrode desaparecidos dentro del
  castillo (1730-1732, solo posibles durante el episodio): Ultraluna del propietario la cumple. Si no se capturó ningún
  Electrode no se puede probar, y no se acredita.
- **Torre de Ciudad Negra / Bosque Blanco (N2/B2):** resuelto con las medallas (ver arriba).
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

### 12/11/2026 — Torre Batalla de Diamante/Perla y As de la Torre en DBPR

- **DP:** la estrella de la Torre de la tarjeta la calcula `GetTrainerCardLevel` (pokediamond, `arm9/asm/unk_02064E90.s`)
  con los récords de partida `GameStats` 0x35, 0x37, 0x39, 0x3B y 0x3D ≥ 100. `GameStats_GetValue`
  (`arm9/src/unk_02029FB0.c`) guarda los índices ≥ 44 como récords de 16 bits, así que son `Record16` 9, 11, 13, 15 y 17
  del `Record4` de PKHeX. El extractor los exporta como `tower4dp.maxStreaks`; hecho `battle.dp.tower100`.
- **DBPR:** el extractor exporta ya las banderas de sistema (4000 + índice) y la victoria contra el As de la Torre es
  `FE_TOWER_MASTER_WINED` (1426, `EvWork.FLAG_INDEX` de uDPR). Partidas públicas con racha 14 y 0: sin la bandera, como
  corresponde (el As sale en la 21 y la 49).

### 12/11/2026 — Retos de los DLC de Escarlata/Púrpura

Bloques con nombre de `SaveBlockAccessor9SV` (PKHeX 96e33e7), leídos por `ProgressSignals.cs`:

| Objetivo | Dato del guardado | Contraste |
|---|---|---|
| La máscara turquesa | `FSYS_SCENARIO_GAME_CLEAR_SU1` (0x0DDBBC62) | Escarlata pública: verdadero, con Ogerpon, Okidogi, Munkidori y Fezandipiti capturados y Noroteo 200/200 |
| El disco índigo y Liga Arándano (el campeón es parte de la historia) | `FSYS_SCENARIO_GAME_CLEAR_SU2` (0x0DDBBAAF) | sin caso positivo |
| Ogre Oustin' en difícil | `OniballoonSave_isCleardHard` (0x17AD6C82) | la misma Escarlata: verdadero |
| Fotos de Perrin | captura de los dos paradoja de la versión (1020/1021 en Escarlata, 1022/1023 en Púrpura) | Pokédex |
| Pecharunt | captura de 1025 | Pokédex |

Un bloque ausente (partida de una versión anterior al DLC) se deja sin interpretar. Sin dato: vuelo contrarreloj y
Torneo de la Academia.

### 12/11/2026 — Células de Zygarde en Ultrasol/Ultraluna

En USUL no hay células repartidas por Alola (WikiDex «Arca de Zygarde»): el Arca trae 40 células y núcleos, Dexio da un
Zygarde al 10 % y en la Gruta Desenlace hay uno al 50 %; en total, 100. El vector de 100 de `EventWork7` son las
dominsignias, pero la variable 169 (`ZygardeCellCount` de PKHeX) cuenta las células y núcleos reunidos en los cuatro juegos:

| Partida | Variable 161 | Variable 169 | Células (vector) | Núcleos |
|---|---|---|---|---|
| Sol pública acabada | 0 | 100 | 95 | 5 |
| Sol del propietario | 95 | 95 | 95 | 0 |
| Luna del propietario | 15 | 75 | 71 | 4 |
| Ultrasol del propietario | 40 | 100 | (dominsignias) | 5 |
| Ultraluna del propietario | 0 | 100 | (dominsignias) | 5 |

Hecho `alola.usum.zygardeCells` = variable 169 ≥ 100.

### 12/11/2026 — Nexárbol de N/B, máscaras de Ogerpon y limpieza de Escarlata/Púrpura

- **N/B, poderes regalo del Nexárbol:** el bloque 53 (Nexo, 0x1B0) solo tiene documentados los niveles, `MissionsComplete`
  (0x1A4) y las tres casillas de poder equipado (0x1A0-0x1A2; 48 = ninguno, como en `PassPower5`). Con el Nexo sin tocar
  (0 misiones, niveles 0 y el resto a cero) se acredita el «no» (`entralink.bw.allPowers` = falso): así lo tienen las dos
  partidas públicas y las dos del propietario. Sin caso positivo, el «sí» queda sin evidencia. La enfermera de N/B
  (todas las estrellas) hereda ese criterio.
- **Escarlata/Púrpura:** «Objetos legendarios, máscaras…» pasa a «Recuperar las máscaras Cimiento, Fuente y Horno de
  Ogerpon» (mochila con 2406, 2407 y 2408, o historia del DLC acabada). Contrastado con la Escarlata pública que tiene el
  DLC acabado. «Distribuciones y raids temporales: documentar sin exigirlos» se retira: no es una meta del 100 %.
  «Torneo de la Academia» se separa de la Liga Arándano (ya acreditada) y queda a mano: ningún bloque con nombre lo registra.
- **Let's Go, revancha de la Liga:** las tablas `bin/flagwork/*.tbl` de la ROM (formato AHTB: hash, longitud, nombre; el
  índice es el orden, contrastado con PKHeX: `FE_MASTER_RED_BATTLE_TALKED` = 116) nombran `WK_SCENE_CHAMPION_REMATCH`
  (variable de escena 25) y `FE_KANNA_WIN`/`FE_SHIBA_WIN`/`FE_KIKUKO_WIN`/`FE_WATARU_WIN` (banderas 149-152). Las dos partidas
  del propietario tienen la escena 25 = 10 y las públicas recién empezadas 0. Los AMX de `script_amx.gfpak` no conservan
  nombres, así que falta saber qué valor marca la revancha superada: sigue a mano.

### 12/11/2026 — Let's Go: scripts de la Liga descompilados

`bin/archive/script_amx.gfpak` (GFPAK con LZ4) contiene 705 scripts AMX de Pawn de 64 bits (magic 0xF1E1, versión 10,
código «compact» de amx.c, opcodes empaquetados `operando << 32 | opcode`). Las variables se pasan como el hash de 64
bits de su nombre en `bin/flagwork/*.tbl`, así que tras descomprimir se localizan todas sus escrituras. Herramientas en el
PC (solo lectura, a temporal): `lgpe_gfpak.py`, `lgpe_amxdec.py`, `lgpe_amxllamadas.py`.

- Salas del Alto Mando (366-368): primer recorrido `WK_SCENE_MAIN_MASTER` = 290/300/310 y `FE_<miembro>_WIN`; al acabar
  se borran las cuatro `FE_*_WIN`.
- Sala del campeón (369): primer recorrido `WK_SCENE_MAIN_MASTER` = 320; en las victorias siguientes solo `FE_WATARU_WIN`
  y `WK_SCENE_CHAMPION_REMATCH = 10`, el mismo valor que ya deja la primera.
- Conclusión: la revancha superada no deja rastro en el guardado. Las dos partidas del propietario tienen la escena 25 = 10.

### 12/11/2026 — Escarlata/Púrpura: nombres de banderas desde los scripts Lua de la ROM

El romfs usa el formato Trinity (data.trpfd/trpfs, Oodle). `sv_nombres.py` (PC, solo lectura, reutiliza `za_trinity.py`)
extrae los paquetes `script/lua/bin/release/*` y recoge 1567 nombres de banderas y variables (FSYS_, FEVT_, WEVT_, WSYS_,
`*Save_*`). La clave del bloque en el guardado es la mitad baja del FNV-1a de 64 bits del nombre (comprobado con
`FSYS_SCENARIO_GAME_CLEAR` = 0x92CE2CF6, `FSYS_YMAP_FLY_01` y `..._SU1` de PKHeX).

- **Vuelo contrarreloj de Amarys:** `FEVT_SDC02_HAGANE_CLEAR_ELEMENTARY` (0x370AAED3), `_INTERMEDIANTE` (0x3EB0BCA0),
  `_ADVANCED` (0x96EDAF73) y `_SUPERLATIVE` (0x7D215B69). Los cuatro bloques existen (falsos) en la Púrpura pública de
  la versión 3.0; no hay partida con El disco índigo para el caso positivo. Hecho `sv.flyingTrialAll`.
- **Torneo de la Academia:** solo `FEVT_1ST_BATTLE_TOURNAMENT_LOST`; no hay bandera de victoria con nombre.
- Otros nombres útiles para más adelante: `FSYS_SCENARIO_LAST_EPISODE_CLEAR` (0x4EF04CF2), `WEVT_SDC02_*_CLEAR_NUM`
  (retos del Alto Mando Arándano), `FEVT_SDC02_FAIRY_QUIZ_PERFECT`.
