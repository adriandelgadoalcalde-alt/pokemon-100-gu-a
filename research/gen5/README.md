# Quinta generación: zonas

`b2w2-zones.json` guarda, para cada una de las 615 zonas de Negro 2/Blanco 2, el índice del nombre de lugar
(byte 0x1A de la cabecera de zona del NARC `a/0/1/2`). Ese índice es el mismo que usan los textos de lugares
de PKHeX.Core (`gen5/text_bw2_00000_es.txt`). Se extrae de una copia propia del juego con
`python3 -I scripts/extract-gen5-zones.py <rom.nds> "<juego>"`; del juego no se guarda nada más.

Comprobación: la extracción en Linux y en Windows da el mismo fichero (sha256 de los datos de la ROM en el
propio JSON). Contraste con partidas públicas: las de inicio de Negro 2/Blanco 2 aparecen en la zona 427,
Ciudad Engobe.

La posición del jugador se lee del bloque 28 («Trainer Position») de `SaveBlockAccessor5B2W2` de PKHeX:
0x19500, 0xA8 bytes, CRC16-CCITT en 0x195AA; el mapa es el int32 de +0x80 (`PlayerPosition5`).

Negro/Blanco usan otra numeración de zonas (la misma posición da otra ciudad) y no hay copia de esos juegos:
su ubicación queda pendiente hasta tener la tabla.
