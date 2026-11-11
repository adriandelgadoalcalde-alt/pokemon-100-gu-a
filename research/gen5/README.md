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

Negro/Blanco usan otra numeración de zonas (427). Su tabla (`bw-zones.json`) procede de pokedaisy (GPL-3.0), que la
generó desde el cartucho con el mismo método: su tabla de Negro 2 coincide en las 615 zonas con la extraída aquí de
Blanco 2. Contraste con partidas reales: las públicas de Negro/Blanco salen en Ciudad Gres y la de Twitch Plays
Pokémon Negro, guardada al final de la historia, en el Palacio de N. El bloque de posición de Negro/Blanco mide 0x9C
bytes, con su CRC16 en 0x1959E (SaveBlockAccessor5BW).
