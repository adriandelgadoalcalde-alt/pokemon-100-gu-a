# Validación con archivos públicos

Fecha: 10 de noviembre de 2026. El usuario autoriza localizar y descargar partidas
públicas para contrastar el lector. Los originales quedan en una carpeta ignorada,
en modo de solo lectura; no se redistribuyen ni se publican diagnósticos individuales.

El [manifiesto](public-corpus.json) fija repositorio, revisión, ruta, tamaño y SHA-256
de 59 referencias, correspondientes a 57 contenidos distintos. Proceden de
Bl1ndBeholder/pokemon-saves, Xieon/XFork_ProjectCompleteDexSaves, Viren070/NX_Saves,
realgarit/PKHeX-Avalonia, Chnapy/PKVault y codemonkey85/PKMDS-Blazor.
Las colecciones preparadas de Pokédex y los archivos con objetos editados se
etiquetan como tales: su estructura válida no demuestra un recorrido natural.

El [informe reproducible](public-validation.json) recoge 51 archivos aceptados por
Core y ocho rechazados: seis no reconocidos y dos con integridad inválida. El lector
JS coincide con Core en 12 muestras de sus diez ediciones compatibles, incluyendo
un HeartGold japonés que permitió corregir la decodificación de kana. Se comparan
Pokédex, historia, medallas, flags/work, objetos cuando están disponibles e identidad
seudonimizada, sin publicar esos datos. Todos los originales conservan su hash.
Hay formatos aceptados de las nueve generaciones; esto no valida individualmente
las 39 ediciones, todas las regiones o todas las revisiones.

## Repetición

Con el extractor compilado según su README:

```sh
python3 scripts/fetch-public-saves.py .cache/public-corpus
node scripts/validate-public-saves.cjs .cache/public-corpus
```

El descargador comprueba también el hash del ZIP, selecciona el miembro exacto sin
extraer rutas al disco y rechaza enlaces simbólicos, sobrescrituras y contenido
distinto del fijado. La regresión de CI publica únicamente el informe saneado.
Los fallos de integridad son resultados esperados explícitos, no pruebas aprobadas
de lectura. Las pruebas del descargador son sintéticas y no requieren red.

## Eventos modernos

`ProgressSignals.cs` documenta cinco claves tipadas de Escarlata/Púrpura en la revisión
fija de PKHeX: final de Paldea, Noroteo, Disco Índigo y disponibilidad/recogida del
diploma de Paldea. Bool1 significa falso, Bool2 verdadero; ausencia u otro tipo
permanece desconocido. Dos muestras declaradas de postgame de Escarlata contienen
la señal de final de Paldea. No son comparaciones controladas antes/después.

Estas señales orientan la recomendación de postgame y proporcionan evidencia
parcial. No certifican automáticamente la historia, escenas previas, legitimidad
ni casillas del usuario. Se mantiene el nivel «documentado», incluso si el JSON
importado solicita un nivel superior. Los casos falso, ausente, tipo incorrecto y
contradicción tienen pruebas sintéticas.

Quedan pendientes parejas naturales antes/después para eventos concretos. Los
adjuntos de Project Pokémon intentados devolvieron acceso denegado; no se cuentan
como descargados ni probados. No se han necesitado partidas personales del usuario.

## Motor ampliado dentro del navegador

Los informes [Chromium](browser-chromium-validation.json) y
[WebKit](browser-webkit-validation.json) contrastan las 59 referencias con el CLI: 51
lecturas completas coincidentes (excepto hora de lectura), ocho rechazos esperados
y ningún fallo. Ambos comprueban importación real en el Atlas sin marcar misiones,
red exclusivamente de recursos estáticos y nueva lectura tras cerrar el servidor
y recargar el motor. Esto valida el adaptador WebAssembly y conserva los límites
de procedencia y semántica anteriores. No se publican diagnósticos de esas partidas.

## Bolsillos de sexta generación

El lector ligero devuelve ahora los cinco bolsillos de X/Y y ORAS. Las cinco
muestras públicas aceptadas de estas ediciones coinciden con Core en inventario
completo, además de los campos anteriores. Fuente, tamaños, relleno ignorado y
límites de interpretación: [estudio de inventario](gen6-inventory.md).
