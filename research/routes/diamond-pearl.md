# Diamante/Perla originales de Nintendo DS

Fecha: 10 de noviembre de 2026. Base: `ccd9714`; rama
`feat/diamond-pearl-walkthroughs`.

Diez rutas compartidas, 52 instrucciones y veinte conexiones a misiones existentes.
La ruta previa de postgame se conserva: once misiones ampliadas de doce por edición.
Colección, reconocimiento e inventarios de extras siguen pendientes de desglose;
no se declara ninguna guía exhaustiva cerrada ni nuevos eventos de save verificados.

## Contraste de versión

Las referencias son los capítulos de Bulbapedia expresamente dedicados a **D/P DS**,
no a BD/SP ni a Platino. Se comprueban capítulos de inicio, MO, gimnasios, lagos,
sede Galaxia y Liga. No se atribuyen offsets a esas páginas editoriales.

- Maletín de Lago Veraz y defensa contra Starly antes del laboratorio.
- Gardenia antes de cortar el edificio Galaxia; gimnasio de entrenadoras escondidas.
- Brega tercera, Mananti cuarto, Fantina quinta después de recoger Surf en Caelestis.
- Fuerza en la quinta planta de Torre Perdida, anciana izquierda; habilitada por Acerón.
- Despejar en Gran Pantano, Área 6 cerca de entrada; habilitado por Mananti.
- Happiny del montañero de Corazón y Eevee de Tecla después de Nacional.
- Preguntas de Fantina: 15, 40, 39, 15; puertas derecha, centro, izquierda, derecha.
- Llave Almacén que deja el recluta, distinta de Llave Galaxia; no interviene Handsome.
- Clímax con Dialga en Diamante y Palkia en Perla, seguido de la esfera correspondiente;
  no se deriva hacia Mundo Distorsión.
- Se separan medalla y recogida de MO, incluso cuando el permiso ya está activo.

También se precisa el payaso del cupón junto al Centro Pokémon/tienda: se describe
como detrás del Centro, coincidiendo con el mapa de Platino ya fijado (payaso
`x=183,z=769`, Centro `180,776`, tienda `179,766`) y la referencia de D/P.

## Procedencia y límites

`diamond-pearl-source-review.json` registra los capítulos consultados mediante el
lector web conectado. La descarga HTTP directa de Bulbapedia puede devolver 403;
no se sustituye ese resultado por un HTTP 200 ni se inventa paridad de bytes. No se
ha fijado una revisión de todos los capítulos y no se califican como código primario.
La redacción es propia; no se copian tablas de entrenadores ni inventarios triviales.

Se inspecciona además pret/pokediamond `b623abef1b4dfe204ca50aab42447ac00c134290`
para preparar contraste primario posterior. Sus secuencias de campo siguen en
contenedores binarios; no se afirman descodificadas ni equivalentes a los scripts
legibles de Platino por compartir región. No se distribuyen esos contenedores.

La navegación detallada de varios puzles, inventarios completos de colección,
objetos importantes, regalos, cintas, concursos, Subsuelo y Torre Batalla continúa
pendiente. Estos textos orientan la historia y conservan las casillas originales;
no acreditan que una partida haya resuelto cada escena ni su orden histórico.
