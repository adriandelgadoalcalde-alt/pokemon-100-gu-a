# Sexta generación: zonas

`xy-zones.json` (360 zonas) y `oras-zones.json` (536) guardan el índice del nombre de lugar de cada cabecera
de zona: los 9 bits bajos del u16 en 0x1C de cada registro de 56 bytes del último miembro del GARC
(`a/0/1/2` en X/Y, `a/0/1/3` en ROZA). El índice es el de `gen6/text_xy_00000_es.txt` de PKHeX.Core (X/Y y ROZA
comparten la lista). Se extraen de copias propias, sin cifrar, con
`python3 -I scripts/extract-3ds-zones.py <xy|oras> <rom.3ds> "<juego>"`; del juego no se guarda nada más.

Contraste: zona 0 = Pueblo Boceto (X/Y) y Villa Raíz (ROZA); las partidas públicas salen en Pueblo Acuarela,
Ciudad Novarte y Ciudad Petalia. La posición se lee del bloque 4 «Situation» (0x1400; `Situation6` de PKHeX)
tras comprobar su CRC16-CCITT en la tabla de bloques del final del guardado.

Séptima generación: ver `research/gen7/README.md`.

Contraste con las otras ediciones (12/11/2026, copias propias): X da exactamente la misma tabla que Y y Zafiro Alfa la
misma que Rubí Omega (mismo SHA-256 del miembro de zonas).
