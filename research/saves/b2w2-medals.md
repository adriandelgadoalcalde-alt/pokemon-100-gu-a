# B2/W2: Medallero, estados y fechas de lectura

Fecha: 10 de noviembre de 2026. Base: `a18f3a1`; rama `feat/b2w2-medals`.

## Errores reproducidos

El lector ligero ya exponía las 255 entradas, pero `Audit.cs` no incluía ese bloque:
la paridad previa con Core no comprobaba el Medallero. Se añade al informe CLI y
WASM y a los dos comparadores. Una partida sintética con CRC correcto y fecha
31 de febrero se aceptaba y mostraba como fecha existente; ahora la fecha queda
sin lectura válida. El estado de recibida se conserva: integridad CRC y validez
de un campo de calendario son comprobaciones distintas.

## Definición primaria fijada

PKHeX.Core `96e33e7432d900e5345afdfd117eabfac43f5bbd`:

- `SaveBlockAccessor5B2W2.cs`: bloque 68, inicio `0x25300`, tamaño `0x498`.
- `MedalList5.cs`: 255 entradas de cuatro bytes; grupos 7/98/56/75/19.
- `Medal5.cs`: estado en tres bits; no leída en el bit siguiente; fecha empaquetada
  con año desde 2000, mes y día. `CanHaveDate` distingue pista recibida/medalla
  recibida/lista para recibir de estados que no deben aportar fecha.

| Estado | Interpretación del lector |
| --- | --- |
| 0 | Sin pista / no recibida |
| 1 | Pista disponible |
| 2 | Pista recibida |
| 3 | Lista para recoger; todavía no recibida |
| 4 | Recibida |
| 5–7 u otro dato no compatible | Sin interpretar |

Se conserva el bit de no leída y el rango/tutorial almacenados; no se inventan
rangos a partir del conteo. Se rechazan fechas imposibles, ceros y fechas residuales
cuando el estado no permite fecha. Los valores originales del archivo no cambian.

## Interfaz y evidencia

El Atlas muestra las 255 medallas por nombre español, con búsqueda y filtros por
estado. La lista conserva los números reales al filtrar. Aparece en diagnóstico
y en la misión ya existente del Medallero, sin crear casillas nuevas.

Los conteos de la vista se recalculan desde entradas individuales; un resumen JSON
que diga 255 no puede completar una lista vacía, duplicada, incompleta o con estados
sin interpretar. Una colección enteramente recibida aporta el hecho
`medals.b2w2.allReceived` si los campos están validados. Acredita recibos en el
estado actual, no la ejecución histórica de cada prueba ni legitimidad de la partida.
No se convierte una fecha de medalla en un instante reconstruido de la cronología.

Los nombres proceden del recurso español de Core y se distribuyen con su licencia
GPL y fuentes correspondientes. `scripts/update-medal-names.py --check` comprueba
los 255 nombres y su orden contra el recurso del archivo de fuentes distribuido.
No requiere descargar ni extraer una ROM.

## Verificación

- Contenedores sintéticos B2 y W2 serializados con fecha imposible, día bisiesto,
  recibida/lista/pista, fecha residual y estado 7. Core y lector ligero coinciden
  en todas las entradas y resúmenes; las fechas imposibles no se muestran.
- Dos partidas públicas nativas permiten comparar el Medallero completo; ambas
  coinciden con Core sin imprimir fechas ni datos personales. El informe saneado
  añade `medalParity` y el número de comparaciones, no los valores de esas partidas.
- Corpus completo CLI/WASM: 51 aceptados y ocho rechazos esperados, en Chromium y
  WebKit, bytes intactos, tráfico local de recursos y reapertura offline.
- 57 casos unitarios, auditoría y prueba de actualización PWA. La regresión de
  interfaz distingue recibido/listo/desconocido y no toca marcas manuales.

Queda pendiente redactar instrucciones ejecutables propias para cada una de las
255 condiciones y revisar disponibilidad de sus requisitos. El enlace de requisitos
no cierra esa entrega editorial. Tampoco se añaden parejas naturales de antes/después
para los criterios de desafío; el avance de rutas exhaustivas de Teselia sigue pendiente.
