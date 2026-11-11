# Paquetes de hitos y secretos leídos de las banderas

Cada paquete de `research/events/<paquete>.json` declara:

- las familias de ediciones;
- los hitos de historia enlazados a las misiones del Atlas;
- los secretos, legendarios y regalos importantes.

Las condiciones se expresan con nombres de pret, nunca con números: banderas, variables guardadas o un mínimo de medallas. `scripts/derive-event-pack.py <paquete>` comprueba en la revisión fijada de la decompilación que cada nombre existe y que algún script o código lo escribe. Después genera `src/saves/<paquete>-data.js`. Las medallas salen del diagnóstico del lector.

`src/engine/event-guide.js` evalúa el paquete con las banderas y variables del diagnóstico. Valen las del lector ligero o las de PKHeX.Core en el navegador. Distingue completado, en curso, perdido, pendiente y legado. Un registro en la Pokédex se muestra aparte y nunca completa un encuentro.

## Cuarta generación: HeartGold/SoulSilver

- Historia y postgame hasta Rojo: 13 hitos.
- 22 secretos con exclusivas por edición.
- Errantes con su estado real: 1 capturado, 2 derrotado, 0 sin resolver. El valor 2 se comprobó en el código ensamblador del combate y el script de la Liga lo recrea.
- Regalo de Oak, orbe del Sr. Pokémon, inicial de Hoenn (Silph S.A., tras Rojo) y las cuatro salas de las Ruinas Alfa.
- Los índices coinciden con los siete mapeos investigados antes: Zapdos 0x14A, Moltres 0x16D, Groudon 0x179, Rojo work 253, Oak work 305, Torre Oculta work 249.
- Contraste con partidas públicas: una partida natural de HeartGold con 16 medallas muestra pendientes justamente Lugia (Ala Plateada de Ciudad Plateada), Entei y Latias. Las partidas preparadas de Pokédex no muestran eventos: estructura válida sin recorrido natural.

Confianza: documentada en código. Faltan comparaciones antes/después con partidas propias.

## Cuarta generación: Platino

- Fuente: la lista enumerada `generated/vars_flags.txt` de pokeplatinum, más las constantes `ROAMER_STATE_*` y `RUINS_STATE_*`.
- 9 hitos y 20 secretos.
- Matices del código:
  - Los Regis exigen un **Regigigas de evento** (encuentro fatídico): se muestran como legado. Si no capturas al Regi, la estatua deja de emanar poder y no vuelve.
  - Regigigas exige los tres Regis en el equipo y es de nivel 1.
  - Diamansfera y Lustresfera están en el suelo de la 4.ª planta del Monte Corona.
  - El acceso a la Columna Lanza lo abre la abuela de Cintia tras la Liga.
- Contraste con la partida de Platino cedida por el propietario (privada, fuera de Git), leída con PKHeX.Core:
  - 8 medallas, Liga superada y lo capturado coherente con las banderas.
  - Pendientes: Mesprit, Cresselia (vista, sin capturar), los pájaros errantes, Regigigas, Rotom y Porygon.

Diamante y Perla no tienen todavía banderas con nombre en pokediamond. No se reutilizan los índices de Platino: requieren investigación propia con partidas antes/después.

## Primera y segunda generación

- Fuentes: pokered, pokeyellow, pokegold y pokecrystal, en revisiones fijadas.
- Las constantes `const_def`/`const_skip`/`const_next` se evalúan igual que las macros de pret. El índice resultante coincide con el bit de `wEventFlags` que lee PKHeX: el máximo de Rojo/Azul es 2522, por debajo de los 2560 de `SAV1`.
- Rojo/Azul y Amarillo son familias separadas: comparten la mayoría de índices, pero no todos.
- 13 hitos de Kanto, 12 de Johto y 26 secretos. Incluye los legendarios, los dos Snorlax, el Dojo, los fósiles, los iniciales de Amarillo, Ho-Oh y Lugia, las bestias, Suicune, los regalos (Togepi, Eevee, Tyrogue, Dratini, Huevo Raro) y los puzles de las Ruinas Alfa.
- Matiz de Cristal comprobado en `BeastsCheck`: el Ala Arcoíris exige la Liga y poseer Raikou, Entei y Suicune con tu nombre e ID, en el equipo o en las cajas.
- En Oro/Plata/Cristal, `EVENT_FOUGHT_*` se activa al empezar el encuentro: consumido, no necesariamente capturado.
- Las ediciones japonesas y coreanas de Game Boy se excluyen: pret describe las internacionales.
- Contraste con partidas públicas: un Cristal completo marca todo salvo el Tyrogue de Kiyo, un Cristal temprano indica la Medalla Céfiro y las partidas preparadas no muestran eventos.

## Generaciones IV a VIII sin decompilación con nombres: listas de PKHeX

`scripts/derive-pkhex-pack.py` usa las listas que PKHeX.Core incluye para su editor de eventos (`Resources/text/script/genN/flags_*_en.txt`, revisión fijada). Cubre Diamante/Perla, Negro/Blanco, Negro 2/Blanco 2, X/Y, Rubí Omega/Zafiro Alfa, Sol/Luna, Ultrasol/Ultraluna y BDSP.

- Toma las capturas, derrotas y regalos de legendarios y encuentros únicos, más la entrada al Salón de la Fama.
- Las exclusivas se separan por las etiquetas de versión de la propia lista, por ejemplo `(OR)` y `(AS)`.
- Los títulos usan los nombres oficiales en español de PKHeX.

Confianza: **documentado por la comunidad en PKHeX**, sin script fuente. Es inferior a la de las decompilaciones y la interfaz lo indica.

- La historia de estos paquetes solo contiene el Salón de la Fama. No se usa para recomendar la Liga desde el principio, sino para pasar al postgame cuando consta.
- Los pasos remiten al recorrido de postgame de cada edición; no se inventan detalles.
- Contraste:
  - Negro 2 cedido por el propietario: 21 de 21 completados y Salón de la Fama registrado.
  - Un Sol público natural: 6 de 6.
  - Las partidas preparadas no muestran eventos.
- BDSP aún no se evalúa: el motor del navegador no exporta sus banderas. Hay que recompilarlo con .NET, que no está disponible en este entorno.
