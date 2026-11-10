# HeartGold/SoulSilver: recorrido de remakes y registros exactos

Fecha: 10 de noviembre de 2026. Rama: `feat/hgss-walkthroughs`, después del ciclo D/P.
Se añaden 17 rutas compartidas y 94 instrucciones; 34 conexiones nuevas. Junto con
las dos rutas de orbes existentes, cada edición tiene 19 misiones catalogadas ampliadas.
No equivale a inventario exhaustivo ni certificación de todas las escenas.

## Diferencias y dependencias

- El Huevo Misterioso se entrega a Elm; después de Pegaso, su ayudante devuelve el
  Huevo de Togepi en la tienda de Malva. Se evita dejar su entrega como «si corresponde».
- Dos Farfetch'd y sonido de ramas en Encinar; MT70 Destello en Torre Bellsprout.
- Surf llega después del recluta del teatro; la serie de cinco Kimono y la escena
  del legendario de portada van antes de la primera Liga.
- Fuerza del montañero de Ruta 42 y no de la cafetería de Olivo.
- Medicina, faro, Aníbal, Vuelo y Yasmina son entregas/escenas separadas.
- Contraseñas del refugio, puerta de Murkrow, Electrode y Torbellino no son un solo bit.
- Tarjeta Radio y Regadera en Trigal; Llave Sótano y Tarjeta Llave en la crisis Rocket.
- Cascada se recoge en Camino Helado; Débora habilita su uso después del santuario.
  La secuencia 1,1,3,1,2 evita los rechazos del cuestionario del anciano y conserva
  Velocidad Extrema para Dratini. El script conserva `FLAG_FAILED_DRAGONS_DEN_QUIZ`:
  corregir respuestas tras un rechazo no elimina por sí solo esa bandera.
- En Kanto se distinguen Componente, Abono de la Copiona y ampliación de radio.
  Pokéflauta se sintoniza arriba en el dial; no se busca como objeto de bolsa.
- Oak entrega Trepar y acceso al monte con 16 medallas; el inicial de Kanto va
  después de Rojo. El regalo es independiente del acceso y de la victoria.
- Suicune tiene cadena de apariciones; Latias HG/Latios SS errantes no son el evento
  de Piedra Enigma. El componente de Celeste está en los flotadores del gimnasio.
- Ruinas Alfa: uso de Piedra Agua desde bolsa (`field_use_item.c`), las cuatro
  cámaras, páginas de investigación y 28 formas no equivalen a registrar una especie.

Los scripts de pret/pokeheartgold están fijados a
`6bf138d6035aa6b43d6f8f4132a12df70f86dcec`, coincidiendo con la investigación técnica
anterior. La revisión primaria comprueba disponibilidad y bytes de los scripts
citados, los manejadores de objetos de Alfa y las definiciones de Pokédex.
El informe de fuentes incluye también los archivos de D/P y Platino usados para
las listas nacionales. Las referencias de Bulbapedia son capítulos de HGSS DS,
no de Oro/Plata. Serebii se usa para familias de actividades y contrastes.

## Discrepancia de disponibilidad de Articuno

La página general de Serebii atribuye 16 medallas a las tres aves. El script de
Articuno no contiene esa comprobación y el de Azul desbloquea expresamente Zapdos y
Cueva Celeste. Hay referencias comunitarias contradictorias sobre Articuno. La guía
identifica su ubicación sin imponerle ese requisito ni prometer una fecha mínima
de aparición no comprobada; mantiene los desbloqueos contrastados para Zapdos/Mewtwo.
No se deduce ausencia de un requisito global únicamente por no verlo en un script.

## Nacional: 482 no es 484

- D/P, `Pokedex_SpeciesIsNotMythical` y `Pokedex_NationalDexIsComplete`: 493 menos
  once exclusiones, incluidas Lugia y Ho-Oh = **482**.
- Platino, `sExcludedMonsNational`, `Pokedex_NationalDexCompleted` y `pokedex.h`:
  también **482**.
- HGSS, `sNationalMythicals`, `Pokedex_CountNationalOwned_ExcludeMythical` y
  `Pokedex_NationalDexIsComplete`: nueve exclusiones, exige Lugia y Ho-Oh = **484**.

`completion.js` compara conjuntos de especies por edición. La interfaz detalla
pendientes con nombres y las metas de Nacional reciben ese hecho cuando los campos
están validados. No se fabrica una estrella concedida, diploma recogido, encuentro
original o cronología. Las marcas manuales se conservan.

## Pendientes de cierre

Faltan secuencias espaciales más detalladas para varios puzles, inventarios individuales
de regalos/intercambios/cintas/formas, trofeos y récords de Pokéathlon, estampas del
Frente y configuraciones de Safari/Pokéwalker, además de legado y conectividad.
Los criterios de tarjeta no sustituyen esas actividades. Los offsets narrativos
con parejas naturales controladas siguen pendientes; no se añade ninguno por
haber redactado rutas. La fuente primaria es US y no prueba todas las revisiones/regiones.

Pruebas de registro: 54 casos unitarios en total, incluyendo la misma lista de 482
que sirve en Sinnoh pero no en HGSS, especie excluida que no reemplaza un Pidgey y
conservación de desconocidos. Chromium/WebKit muestran el contraste de listas,
MO/Kimono/Alfa y consulta sin servidor, sin marcar progreso manual.
