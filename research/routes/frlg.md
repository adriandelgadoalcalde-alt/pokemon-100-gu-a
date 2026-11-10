# Rojo Fuego/Verde Hoja: diferencias y registros exigidos

Fecha: 10 de noviembre de 2026. Fuente primaria fijada: pret/pokefirered,
`ce6406d8c2eaf46d543c8a2606de0c3cb1951982`.

Se redactan 16 recorridos compartidos por ambas ediciones, con 79 instrucciones,
para 32 misiones existentes. Se mantienen IDs, orden de casillas y confirmaciones.
Las dos rutas de islas/eventos ya existentes siguen separadas. Cubrir las misiones
actuales no cierra el inventario exhaustivo de actividades ni de objetos relevantes.

## Errores del catálogo corregidos

- Moltres estaba situado en Calle Victoria, heredado de los originales GB. En estos
  remakes está en la cima de Monte Ascuas de Isla Prima.
- Mewtwo no se abre únicamente por la Liga. La entrega de Zafiro a Celio activa
  `FLAG_HIDE_CERULEAN_CAVE_GUARD` e inicia el errante; la definición del guardia en
  el mapa de Ciudad Celeste usa esa bandera.
- Se distingue el Té de Azulona de las bebidas de los originales; Corte/partida del
  S.S. Anne, Surf de Casa Secreta y Fuerza por los Dientes de Oro.
- Se retiran advertencias de Amarillo que no describían estos remakes. Los eventos
  históricos no se presentan como una modificación de guardado obligatoria.
- Las recompensas de los ayudantes se explican por ubicación y especies capturadas,
  no por avistamientos ni por haber alcanzado un total sin hablar con el ayudante.

## Sabrina

La secuencia se deriva del mapa de colisiones y sus destinos de teletransporte,
evitando las posiciones de NPC. Desde la entrada se usa el único pad; después:
superior derecha, inferior derecha, inferior izquierda, inferior izquierda.
Para volver, tras el único pad de Sabrina: inferior derecha, superior izquierda,
superior derecha, inferior derecha.

`frlg-teleporters.json` conserva la revisión, hashes y conexiones. La derivación
se reproduce sin ROM ni compilación del juego:

```sh
python3 scripts/derive-frlg-teleporters.py --source .cache/pokefirered --check
```

## Listas de Pokédex

Las funciones `HasAllKantoMons` y `HasAllMons` de `src/pokedex.c` comprueban especies
concretas. Kanto exige 150 entradas, excluyendo Mew. Nacional exige 380: quedan
fuera Mew, Lugia, Ho-Oh, Celebi, Jirachi y Deoxys. El número total por sí solo no
sirve: 380 registros incluyendo Mew y sin Pidgey incumplen ambos requisitos.

El módulo `completion.js` calcula esas listas únicamente para las dos ediciones.
Conserva un estado desconocido si no hay array de capturas. El motor acredita el
registro exacto únicamente cuando los campos de lectura están validados; sin
integridad, una lista completa aporta evidencia parcial. No crea hechos de
encuentro original, entrega de regalos, premio recogido ni historia.

El diagnóstico muestra los registros exigidos y los nombres/números que faltan.
Las marcas manuales permanecen independientes. Las etiquetas españolas proceden
del recurso de especies de la revisión fijada de PKHeX; se incluyen atribución,
GPL y fuentes correspondientes en el aviso del motor. Las pruebas incluyen
igualdad engañosa de totales, especies excluidas, duplicados, otra edición,
lectura ausente y ausencia de integridad.

Las cuatro condiciones de tarjeta son Liga, lista de Kanto, lista Nacional y ambos
récords inalámbricos. `trainer_card.c` exige 200 saltos consecutivos y un récord de
200 bayas recogidas; `dodrio_berry_picking.c` conserva el mejor total de una partida,
no la suma acumulada entre partidas. No se aplican los criterios de concursos o
Torre/Frente de Hoenn.

## Límites

Faltan desgloses de intercambios, evoluciones, actividades y recompensas aún
agrupadas, y revisar el inventario completo de cada edición. Las comparaciones de
registros no prueban legitimidad ni historia de escenas. La semántica de los demás
flags y el seguimiento natural antes/después continúan pendientes.
