# Bolsa de Ultrasol/Ultraluna y cristales Z

Referencia primaria: PKHeX `96e33e7432d900e5345afdfd117eabfac43f5bbd`.
Archivos de esa revisión: `Items/Bags/PlayerBag7USUM.cs`,
`Saves/Substructures/Inventory/Pouch/InventoryPouch7.cs`,
`Saves/Substructures/Inventory/Item/InventoryItem7.cs` y
`Saves/Access/SaveBlockAccessor7USUM.cs`.

El lector nativo incorpora los siete bolsillos. El bloque MyItem empieza en cero y
mide `0xE28`; ya queda incluido en el CRC completo de 39 bloques. Cada entrada es
un entero de 32 bits: ID en los 10 inferiores, cantidad en los 10 siguientes,
índice de orden en otros 10, marca de objeto nuevo en bit 30 y reservado en bit 31.
No se interpreta como dos enteros de 16 bits ni se cuenta el orden como cantidad.

| Bolsillo | Offset | Entradas |
| --- | ---: | ---: |
| Items | 0 | 427 |
| Medicine | 0xB74 | 60 |
| TMHMs | 0x9C4 | 108 |
| Berries | 0xC64 | 67 |
| KeyItems | 0x6AC | 198 |
| ZCrystals | 0xD70 | 35 |
| BattleItems | 0xDFC | 11 |

El orden del JSON sigue la API, no el orden de los offsets. Solo se devuelven ID y
cantidad positivos. Las pruebas sintéticas usan extremos de todos los bolsillos,
huecos, cantidad 513, bits de orden/nuevo/reservado y relleno fuera del bloque.
Se compara todo con Core, se rechaza corrupción y se comprueban bytes originales.
Dos muestras públicas Ultra coinciden, elevando a siete las muestras con paridad
de inventario nativo completo. No se publican partidas ni inventarios individuales.

## Cristal de bolsa frente a equipable

`ItemStorage7SM.cs` e `ItemStorage7USUM.cs` distinguen `ZCrystalKey` y
`ZCrystalHeld`, asociados por sus métodos `GetCrystalHeld/GetCrystalKey`.
Normastal de bolsa usa 807; el equipable usa 776. Contarlos como el mismo objeto
rompería la lectura. Hay 29 tipos de bolsa en los originales y 35 en Ultra.
El bolsillo original reserva 30 entradas físicas, pero eso no crea un trigésimo
tipo con nombre. La interfaz cuenta tipos inequívocos del bolsillo, sin usar
identificadores equipables, Pokédex ni sellos declarados para rellenar ausencias.

Los nombres e IDs se contrastan en CI con las fuentes completas empaquetadas del
motor mediante `scripts/update-alola-item-names.py --check`. El módulo conserva
GPL y el enlace a sus fuentes completas. El panel también acepta diagnósticos de
Sol/Luna extraídos por el motor ampliado; no añade lector nativo de esas ediciones.

Posesión actual no acredita la prueba, escena de entrega, pasaporte ni legitimidad.
La lista incluye tipos asociados a eventos sin exigirlos para la historia. Datos
sin integridad o bolsillos duplicados quedan sin lectura; una ausencia no se
interpreta como historial de no obtención. No se cambian las casillas manuales.
