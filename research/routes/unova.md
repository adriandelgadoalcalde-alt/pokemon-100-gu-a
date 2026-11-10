# Teselia: originales y secuelas

Revisión editorial: 10 de noviembre de 2026. Las cuatro ediciones mantienen sus
misiones, índices de casillas y progreso anterior. `src/guides/unova.js` añade
18 recorridos (94 instrucciones), enlazados a 36 misiones existentes.

## Fuentes y diferencias contrastadas

- Bulbapedia, recorridos **Black and White**, partes 1–7 y 9–12:
  https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_and_White
- Bulbapedia, recorrido **Black 2 and White 2**, partes 1–15:
  https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Black_2_and_White_2
- Serebii, tablas de MO/MT por familia:
  https://www.serebii.net/blackwhite/tmhm.shtml
  https://www.serebii.net/black2white2/tmhm.shtml
- Incursiones Plasma y localización del Acromáquina:
  https://www.serebii.net/black2white2/teamplasma.shtml
- Planta y edición de los puzles de la Fragata:
  https://bulbapedia.bulbagarden.net/wiki/Plasma_Frigate
  https://www.serebii.net/pokearth/unova/plasmafrigate.shtml

Las páginas se consultaron mediante búsqueda web conectada. Son fuentes de
recorrido, no fuentes primarias de offsets de guardado. No se declara una
validación HTTP directa que no se haya efectuado ni se incorpora texto copiado.
Cada entrada conserva referencias a los capítulos concretos de su tramo.

| Punto | Negro / Blanco | Negro 2 / Blanco 2 |
| --- | --- | --- |
| Inicio | Arcilla; Gres y Esmalte | Engobe; Cheren y Hiedra |
| Corte | Oryza en Gres | Hiedra, incidente Plasma de Hormigón |
| Fuerza | Casa del noroeste de Mayólica | Rival tras Plasma en Cloacas Porcelana |
| Vuelo | Bel, salida de Fayenza tras Yakón | Bel, Ruta 5 |
| Surf | Mirto, entrada de Monte Tuerca | Cheren, laboratorio de Ruta 6 |
| Huevo Suerte | Encina, Cueva Electrorroca | Encina, entrada de Torre de los Cielos |
| Gimnasios | Miel, vagonetas, ascensores, cañones | Capullos, pasarela, cintas, ráfagas |
| Primera Liga | N y Ghechis; Mirto queda para postgame | Iris y Hall de la Fama |

En la Fragata, la primera barrera de la incursión de Ruta 21 es de interruptores
en Negro 2 y contraseña en Blanco 2. En la posterior estancia en Boquete Gigante
se invierten. Obtener la Tarjeta Plasma es independiente de conocer la clave.
Serebii enumera más claves potenciales que el recorrido de Bulbapedia; se evita
presentar una lista cerrada o una clave universal. El jugador sigue las pistas de
su partida e idioma. El Kyurem fusionado del desenlace no admite captura.

## Límite de esta entrega

Negro/Blanco tiene ampliación en las once misiones del catálogo, incluyendo los
dos recorridos anteriores de postgame. Las secuelas tienen dieciséis de dieciséis tras añadir siete rutas (51
instrucciones) y separar el recorrido de tarjeta anterior compartido con BW. **No son inventarios exhaustivos del juego.**

Pendientes: desglosar las colecciones agrupadas, todos los accesos y regalos
relevantes, los mapas de puzles completos (Calle Victoria, Reversia, gimnasios y
Fragata), requisitos individuales de las 255 medallas, mapas de Claros Ocultos,
guiones individuales de Pokéwood y demás inventarios del postgame. Las instrucciones de historia no convierten un
estado de Pokédex o inventario en prueba de una escena original. No se añaden
flags narrativos ni se declara validación con pares naturales antes/después.

## Verificación

Auditoría de catálogo y caché: no hay enlaces duplicados ni misiones nuevas;
525 misiones y 1.146 casillas conservadas. La matriz global pasa a 172 recorridos,
360 conexiones y 165 misiones sin expansión. Se comprueba en los dos motores de
navegador que los recorridos de originales/secuelas permanecen separados, que la
vista móvil no desborda y que la ruta de la Fragata se consulta con el origen
cerrado después de instalar la PWA.


## Revisión del postgame

Las siete rutas nuevas separan dragones y encuentros, premios de Pokédex/tarjeta,
Pokéwood/PWT, recuerdos y Claros Ocultos, claves/Regi, Reserva Natural y estados del
medallero. Se consultaron además los capítulos 16–22 y las páginas específicas
citadas en cada ruta. Smogon aporta contraste independiente para accesos de
legendarios; las localizaciones españolas se contrastan con WikiDex y los nombres
de objetos con el recurso español de PKHeX distribuido en el motor local.

Correcciones que importan para seguir la guía:

- La clave de ciudad/bosque se recibe tras el área 5; no está disponible para
  enviar desde el principio, pese al resumen antiguo de Unova Link de Serebii.
- El recuerdo «Amigos que vienen y van» está disponible con el Criapokémon de
  cualquier Centro Pokémon. La descripción de Serebii que lo ubica en Engobe no
  se usa como restricción; se contrasta con la página Memory Link de Bulbapedia.
- El objeto de acceso a Reserva Natural se llama **Pase** en español.
- El regalo de Guayo, los orbes y las claves tienen condición propia; recibir una
  especie por intercambio no demuestra activar esas entregas.
- La mejora de tarjeta de Pokéwood excluye su película final especial. La estatua
  y el camerino la requieren. No se toma la recaudación como único indicador del
  nivel de estrella: la tabla de Serebii discrepa de los puntos de la tabla actual
  de Bulbapedia; no se certifica automáticamente ese nivel.

### Registro Nacional de generación V

`completion.js` usa la lista documentada de las 636 especies exigidas de las cuatro
ediciones. Excluye trece míticos; Lugia/Ho-Oh sí son necesarios. Procedencia:
https://bulbapedia.bulbagarden.net/wiki/Trainer_Card_level#Black_and_White
https://www.serebii.net/black2white2/dexcompletion.shtml

Es una regla derivada de referencias comunitarias, no un nuevo offset ni una
validación de script primario. Se aplica solo a registros de obtenidos con la
integridad declarada del campo y nunca acredita entrega de diploma, amuletos,
Pase, estrellas o encuentros. Se comprueban listas con igual total pero especie
incorrecta, registros ausentes, duplicados, exclusiones e integridad insuficiente.

El color contrario del Nexárbol requiere participar por comunicación local en
misiones organizadas por la otra edición, según Funfest Mission de Bulbapedia.
No se promete completar ambos niveles jugando solo en una misma edición.

Quedan por desarrollar los turnos de cada película, los criterios individuales de
medallas, el mapa de todas las plantas de Ruinas Abisales, regalos/intercambios,
objetos relevantes, Galería Unión, Musical, desafíos del Nexo y otros inventarios.
No se declara cierre exhaustivo aunque todas las misiones actuales estén enlazadas.
