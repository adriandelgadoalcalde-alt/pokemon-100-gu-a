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
