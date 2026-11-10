# Sinnoh en Diamante Brillante y Perla Reluciente

Revisión: 10 de noviembre de 2026. Once rutas nuevas, 68 instrucciones y 22
conexiones completan la ampliación de las doce misiones catalogadas por edición.
Se conserva la ruta anterior de Zona Batalla/Hansa; no se cambian IDs ni casillas.

## Mecánicas y cronología

El inicial se elige en Lago Veraz. Se explican las llaves del Valle Eólico,
Corte después de la medalla de Gardenia para liberar el edificio, la bicicleta
y la quinta medalla de Fantina después de Pradera y Caelestis.

Los movimientos de campo se registran con MT93–100 y se usan desde el Poké-reloj
al tener la medalla correspondiente. No requieren enseñarlos al equipo. Fuerza
se recibe en Torre Perdida y Despejar en Gran Pantano; se excluye la entrega de
Quinoa y las ruinas de Platino. Las MT de combate son consumibles en estos
remakes, aunque registrar el movimiento de campo no exige gastarlas en el equipo.

La sede Galaxia distingue Llave Almacén y Llave Galaxia. Se explica la liberación
del trío, el combate conjunto, Helio y Dialga/Palkia sin Mundo Distorsión. Liga
usa el primer equipo de Cintia de los remakes, incluida Baya Rimoya de Garchomp,
no las alineaciones de DS ni las revanchas.

Gran Subsuelo exige cien variantes de estatuas para su estrella. Se separan
variantes obtenidas de las colocadas, Superconcurso Maestro de Cinta Estrella y
del concurso especial, y cien consecutivas en una modalidad de Torre de los
totales de victorias mezclados entre modalidades.

## Registro Nacional: 482 y dos funciones diferentes

La comparación de especies para el reconocimiento Nacional excluye Mew, Lugia,
Ho-Oh, Celebi, Jirachi, Deoxys, Phione, Manaphy, Darkrai, Shaymin y Arceus: 482.
No se deduce una estrella ni entrega de diploma o Amuleto Iris de cumplirla.
El desbloqueo de la Nacional exige 150 vistos de Sinnoh, sin Manaphy.

Se contrasta Bulbapedia con una reconstrucción pública comunitaria de la lógica
C# de Diamante Brillante 1.3.0, fijada por revisión y huellas en
`research/dex/bdsp-source.json`. `CheckZenkokuZukanCompGet` usa once exclusiones;
`PlayerWork.GetTrainerRank` llama a esa función y comprueba por separado concurso,
estatuas, Liga y rachas. `EvCmdZukanChkNational` usa también esa comprobación.
La función completa requiere además los indicadores de Pokédex/Nacional; la
aplicación compara aquí solo las especies y mantiene desconocida la estrella.

`ZukanRatingExcludeNos` tiene nueve exclusiones y no es el mismo conjunto. No se
usa una cantidad genérica de 484 para el reconocimiento de tarjeta/diploma ni se
aplica este conjunto de 482 a todos los premios. El mapeo de Amuleto Iris y las
llamadas a evaluación requieren su revisión independiente. La reconstrucción no
se ha ejecutado como binario comercial ni demuestra el historial de la partida.
No se copian archivos del juego ni el código reconstruido al producto.

## Fuentes

Cada ruta enlaza capítulos precisos del recorrido BDSP y las páginas temáticas.

- [Recorrido propio de los remakes](https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Brilliant_Diamond_and_Shining_Pearl)
- [MT](https://www.serebii.net/brilliantdiamondshiningpearl/tms.shtml)
- [Poké-reloj](https://www.serebii.net/brilliantdiamondshiningpearl/poketch.shtml)
- [Gimnasios](https://www.serebii.net/brilliantdiamondshiningpearl/gyms.shtml)
- [Equipo Galaxia](https://www.serebii.net/brilliantdiamondshiningpearl/teamgalactic.shtml)
- [Gran Subsuelo](https://www.serebii.net/brilliantdiamondshiningpearl/grandunderground.shtml)
- [Superconcursos](https://www.serebii.net/brilliantdiamondshiningpearl/supercontests.shtml)
- [Tarjeta](https://www.serebii.net/brilliantdiamondshiningpearl/trainercard.shtml)
- [Liga](https://www.serebii.net/brilliantdiamondshiningpearl/elitefour.shtml)
- [Requisitos de tarjeta](https://bulbapedia.bulbagarden.net/wiki/Trainer_Card_level#Brilliant_Diamond_and_Shining_Pearl)
- [Requisitos de diploma](https://bulbapedia.bulbagarden.net/wiki/Diploma)

## Pendientes exhaustivos

Planos de paneles, agua, elevadores, nieve y engranajes; recorrido completo de
Monte Corona y Calle Victoria, todos los legendarios, NPC de Spiritomb,
regalos, formas, MT/objetos y colecciones. Se mantienen separados eventos de
distribución temporal y regalos por partidas de otros juegos. Las doce misiones
ampliadas no cierran ese inventario ni prueban progresión natural.
