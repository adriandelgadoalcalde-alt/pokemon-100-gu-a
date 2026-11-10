# Inventario nativo de X/Y y Rubí Omega/Zafiro Alfa

Revisión de referencia: PKHeX `96e33e7432d900e5345afdfd117eabfac43f5bbd`.
El lector ligero omitía el inventario de estos cuatro juegos aunque el extractor
Core sí lo devolvía. Se incorpora el mismo orden de bolsillos y se comprueba contra
Core, sin filtrar a priori por IDs legales: un objeto editado no prueba legitimidad.

Fuentes primarias, en esa revisión de [PKHeX](https://github.com/kwsch/PKHeX/tree/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core):

- `Items/Bags/PlayerBag6XY.cs` y `PlayerBag6AO.cs`: orden y desplazamientos.
- `Items/InventoryPouch4.cs`: ID y cantidad, dos enteros de 16 bits little endian.
- `Items/InventoryPouch.cs` y `Items/ItemStorage6XY.cs` / `ItemStorage6AO.cs`: número de entradas; no se lee el relleno entre bolsillos.
- `Saves/Access/SaveBlockAccessor6XY.cs` / `SaveBlockAccessor6AO.cs`: bloque 1, inicio absoluto `0x400`, longitudes `0xB88` / `0xB90`.

| Bolsillo | Offset relativo X/Y | Entradas X/Y | Offset relativo ORAS | Entradas ORAS |
| --- | ---: | ---: | ---: | ---: |
| Items | 0 | 289 | 0 | 305 |
| KeyItems | 0x640 | 32 | 0x640 | 47 |
| TMHMs | 0x7C0 | 105 | 0x7C0 | 107 |
| Medicine | 0x968 | 51 | 0x970 | 54 |
| Berries | 0xA68 | 67 | 0xA70 | 67 |

Cada entrada ocupa cuatro bytes. Solo se devuelven las de ID y cantidad positivos,
como el extractor. `keyItems` es la vista del bolsillo correspondiente. No hay
nuevo flag narrativo ni interpretación automática del regalo de un objeto.
La comprobación CRC BEEF existente incluye el bloque de bolsa completo y cancela
la importación si se altera; no se escribe en el original.

Validación: cuatro contenedores sintéticos de las cuatro ediciones, primeras y
últimas entradas, huecos con cantidad cero, ID cero, cantidades superiores a 255 y
relleno no nulo fuera del tamaño de la API. Comparación completa con Core y
corrupción deliberada del bloque. Cinco muestras públicas de sexta generación
coinciden en los cinco bolsillos; el corpus completo conserva sus hashes. Solo se
publica el informe saneado, no inventarios individuales ni partidas.

La bolsa no incluye los objetos equipados en equipo/cajas. Su ausencia no equivale
a no haber recibido el objeto; tampoco la posesión acredita la escena original.
