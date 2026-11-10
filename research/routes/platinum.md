# Platino: historia propia y Mundo Distorsión

Fecha: 10 de noviembre de 2026. Rama: `feat/platinum-walkthroughs`.
Fuente primaria: pret/pokeplatinum `62bdaacdca6c56a6a396f3e9911e2f922b79bba8`.

Se añaden once rutas, 65 instrucciones y once conexiones a misiones existentes.
Junto con las dos rutas anteriores se amplían las trece misiones hoy catalogadas de
Platino. Esto **no cierra el inventario exhaustivo** del juego: actividades agrupadas,
colecciones, retos y recompensas todavía necesitan revisión individual. Tampoco se
certifican flags narrativas de Platino mediante esta redacción.

## Diferencias contrastadas

- `route_201/scripts.s` contiene la entrega del inicial; no se sigue el maletín de
  Diamante/Perla. Laboratorio, paquete, Mapa y cupones continúan en los mapas citados.
- Gardenia habilita Corte antes de la liberación del edificio Galaxia y la Bicicleta.
  El reloj del gimnasio y el Huevo de Togepi son propios de esta secuencia.
- Fantina es tercera, Brega cuarta y Mananti quinto. El orden de líderes ya estaba
  corregido en el catálogo; ahora se desarrolla su recorrido. Se corrigen además
  el inicial de Lago Veraz y el orden de Gardenia/edificio Galaxia sin cambiar IDs,
  posiciones ni cantidad de casillas.
- `solaceon_ruins_room_7/events.json` sitúa MO05; no el Gran Pantano de Diamante/Perla.
- `iron_island/scripts.s`, entrada `IronIsland_Riley`, entrega MO04 antes de recorrer
  la cueva con Quinoa; su uso de campo comprueba la Medalla Mina. No se entrega en
  Torre Perdida en esta edición.
- `route_217/events.json` sitúa MO08 como objeto; Inverna habilita su uso, no su entrega.
- `celestic_town_cave/scripts.s` entrega Surf; `sunyshore_city/scripts.s` entrega
  Cascada después de la Medalla Faro. Se separan posesión y permiso de campo.
- La liberación de los guardianes en la sede precede al clímax de Columna Lanza.
  Platino continúa en Mundo Distorsión, no en el encuentro de Dialga/Palkia de D/P.
- En `distortion_world_b6f/scripts.s` cada guardián se retira al completar su roca.
  `CynthiaPuzzleFinished` habilita el siguiente enlace cuando se habla con Cintia;
  se evita tratar el movimiento de rocas como único requisito de salida.
- `distortion_world_b7f/scripts.s` distingue combate con Helio y curación posterior.

## Límites pendientes

Las instrucciones de navegación de Calle Victoria, plataformas del gimnasio de
Marina, bolas del gimnasio de Puntaneva y todo el trayecto del Mundo Distorsión
requieren aún una revisión espacial más minuciosa, con planos o secuencias cuando
sean útiles. No se presenta esta entrega como solución exacta de todos los puzles.
Continúan pendientes los inventarios de colección, premios, encuentros, objetos y
contenidos de legado, aunque existan misiones agrupadas para ellos. Diamante/Perla
requieren su propio recorrido: estas rutas no se comparten con esas ediciones.

La disponibilidad y paridad de los archivos primarios se registran con hashes en
`research/routes/platinum-source-review.json`. No se distribuyen mapas del juego,
ROM, texto original ni guardados privados. La redacción es propia y la validación
editorial es independiente de la validación natural del lector.
