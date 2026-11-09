# Integridad y campos físicos contrastados

Revisión upstream fijada: `96e33e7432d900e5345afdfd117eabfac43f5bbd` de
[PKHeX](https://github.com/kwsch/PKHeX/tree/96e33e7432d900e5345afdfd117eabfac43f5bbd).
Las implementaciones de CRC del navegador se escriben mediante los algoritmos
estándar de CRC; no incorporan la implementación tabulada upstream.

## HGSS

Se contrasta el bloque general `0xF628` de la partición seleccionada por contadores.
CRC-16/CCITT-FALSE cubre el bloque salvo el footer final `0x10`. No se valida en el
navegador la integridad de cajas, Hall of Fame adicional ni vídeos. El extractor C#
consulta la propiedad completa de integridad de PKHeX para el contenedor recibido.

Los objetos clave se leen como pares `u16 ID, u16 cantidad`, en las 38 entradas
definidas por PKHeX, a partir de `General + 0x8D8`. El espacio reservado entre bolsillos
no se interpreta como entradas adicionales. Fuentes:
[PlayerBag4HGSS](https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core/Items/Bags/PlayerBag4HGSS.cs),
[InventoryPouch4](https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core/Saves/Substructures/Inventory/Pouch/InventoryPouch4.cs),
[ItemStorage4HGSS](https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core/Items/ItemStorage4HGSS.cs).

La presencia del Orbe Rojo acredita **posesión actual**. No demuestra la escena de
entrega de Oak, victoria contra Rojo ni captura de Groudon. La guía puede orientar
desde el objeto presente sin certificar esas escenas. HeartGold conserva su Orbe Azul.

## Negro 2 / Blanco 2

No se aplica la selección de copias HGSS ni se utiliza el tiempo jugado para escoger
una supuesta copia alternativa. Se usan los bloques nativos de la quinta generación.
Se comprueban CRC y espejo de los bloques 27, 37, 45, 52, 54, 68 y 73: entrenador,
aventura, eventos, medallas, Pokédex, medallero y tabla de checksums. Los demás bloques
no se presentan como validados por este módulo del navegador.

La lista `integrity.verifiedFields` declara qué campos cubre esta validación parcial;
no se rellena un indicador global de integridad completa. Fuente:
[SaveBlockAccessor5B2W2](https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core/Saves/Access/SaveBlockAccessor5B2W2.cs).

## X/Y, Rubí Omega/Zafiro Alfa, Ultrasol/Ultraluna

La tabla BEEF del archivo describe los bloques, sus tamaños, IDs y CRC. El navegador
comprueba que los IDs sean consecutivos, las longitudes estén dentro del contenedor,
la alineación sea coherente y el último bloque termine antes del footer. Se verifican
55 bloques en XY, 58 en ORAS y 39 en USUM. XY/ORAS usan CRC-16/CCITT-FALSE; USUM,
CRC-16/USB. Vectores independientes `123456789`: `0x29B1` y `0xB4C8` respectivamente.

En USUM, PKHeX normaliza el área de firma MemeCrypto del bloque 36 antes de comprobar
su CRC. El navegador realiza esa normalización **sobre una copia** de ese bloque,
sin cambiar los bytes del archivo. No se valida la firma criptográfica en el navegador.
Se declara esa exclusión en `integrity.uncheckedRegions`.

Fuentes:
[SAV7](https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core/Saves/SAV7.cs),
[BlockInfo3DS](https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core/Saves/Blocks/BlockInfo3DS.cs),
[XY](https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core/Saves/Access/SaveBlockAccessor6XY.cs),
[ORAS](https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core/Saves/Access/SaveBlockAccessor6AO.cs),
[USUM](https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core/Saves/Access/SaveBlockAccessor7USUM.cs).

USUM no tiene una Pokédex Nacional como función del juego: se elimina la interpretación
de un bit del bloque regional como supuesto desbloqueo nacional.

## Qué se ha probado

Fixtures íntegramente sintéticos de HeartGold, SoulSilver, Negro 2, Blanco 2, X, Y,
Rubí Omega, Zafiro Alfa, Ultrasol y Ultraluna. Coinciden con PKHeX los campos comparados,
todos los flags y todo el work expuesto por los adaptadores. Se comprueba rechazo
de corrupción y SHA-256 idéntico del input antes/después. La bolsa de HGSS incluye
casos de Orbe Rojo y Azul. Nada de esto acredita todavía una partida natural real,
todas las regiones/revisiones o la semántica histórica de cada bandera.

## Identidad del perfil y caracteres occidentales

El lector compartido ahora lee TID16 y SID16 en las diez ediciones admitidas.
Se contrasta el seudónimo SHA-256 calculado desde versión/nombre/IDs con el
extractor Core en los diez contenedores sintéticos, sin imprimir esos datos.
Esto comprueba offsets e identidad, además de los campos de progreso.

En HGSS los dígitos y las letras latinas con diacríticos son códigos de glifo,
no Unicode directo. Se corrigen sus rangos usando como referencia
[StringConverter4Util.TableINT](https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core/PKM/Strings/StringConverter4Util.cs).
El fixture HeartGold usa un nombre sintético con tilde, eñe y número; Core y JS
coinciden. No se declara aquí lectura completa de alfabetos japonés/coreano.

Si un lector antiguo no incluía SID o decodificaba mal el nombre, la guía clásica
solo enlaza su identidad previa con la nueva al observar el **mismo SHA-256 del
archivo completo**. Conserva así sus confirmaciones y notas. Otro SID no hereda
esas marcas. Los alias se incluyen en la exportación/restauración; no se atribuyen
victorias históricas por parecido de nombre o por coincidir únicamente el TID.
