# Séptima generación: zonas

`usum-zones.json` guarda, para cada una de las 380 zonas de Ultrasol/Ultraluna, el índice del nombre de lugar:
el int32 «ParentMap» en 0x1C de cada registro de 0x54 bytes del miembro 0 (comprimido con LZ11) del GARC
`a/0/7/7` («zonedata»), como `ZoneData7` de pk3DS. El índice es el de `gen7/text_sm_00000_es.txt` de PKHeX.Core.
Se extrae de una copia propia sin cifrar con `python3 -I scripts/extract-3ds-zones.py usum <rom.3ds> "<juego>"`;
el fichero sale idéntico en Linux y Windows.

Contraste: zona 0 = Ruta 1 (inicio); las partidas públicas de USUM salen en la Ruta 2 y en las Ruinas de la
Guerra. La posición se lee del bloque 1 «Situation» (0x1000, `Situation7`) tras comprobar su CRC16 reflejado e
invertido (`BlockInfo7`). Nota: el GARC `a/0/1/7` con registros de 84 bytes es la tabla de especies, no las zonas.

`sm-zones.json` es lo mismo para las 295 zonas de Sol/Luna (mismo GARC y registro; Sol y Luna dan la misma tabla, sha256
`765f87bd…`), extraído con `extract-3ds-zones.py sm`. En Sol/Luna el bloque «Situation» está en 0xE00 (`SaveBlockAccessor7SM`).
Ultraluna da exactamente la misma tabla que Ultrasol. En la lista de lugares de la 7.ª generación la línea siguiente a cada
nombre es su subtítulo («Ciudad Hauoli» / «Paseo Marítimo»); la guía lo muestra entre paréntesis.
