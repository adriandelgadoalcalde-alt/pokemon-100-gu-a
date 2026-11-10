# Pasaporte de Alola: sellos guardados y requisitos de Pokédex

Referencia primaria: PKHeX `96e33e7432d900e5345afdfd117eabfac43f5bbd`,
[`Misc7.Stamps`](https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core/Saves/Substructures/Gen7/Misc7.cs) y
[`Stamp7`](https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core/Saves/Substructures/Gen7/Stamp7.cs).
El extractor Core devuelve `passport.mask` para SAV7; el lector nativo añade ese
mismo campo en Ultrasol/Ultraluna. Sol/Luna lo recibe mediante el motor ampliado.

Misc7 toma un u32 relativo `0x08`, descarta los cuatro bits inferiores y conserva
los quince siguientes: `(raw >>> 4) & 0x7FFF`. El bloque Misc es `0x4000` en SM y
`0x4400` en USUM, según sus SaveBlockAccessor. El CRC completo del contenedor se
comprueba antes de importar. No se interpretan los bits vecinos como sellos.

| Bit | Registro de pasaporte | ID histórico de maestría |
| ---: | --- | --- |
| 0 | Entrenador oficial | card-0 |
| 1–4 | Grandes pruebas de Melemele, Akala, Ula-Ula, Poni | card-1 a card-4 |
| 5 | Recorrido insular y Liga | card-5 |
| 6–9 | Pokédex de las cuatro islas | card-6 a card-9 |
| 10 | Pokédex de Alola | card-10 |
| 11 | 50 victorias individuales | card-11 |
| 12 | 50 victorias dobles | card-12 |
| 13 | 50 victorias múltiples | card-14 |
| 14 | Pokévisor Pro | card-13 |

El catálogo histórico colocaba Pokévisor antes de Múltiples. Se conserva el ID y
su marca manual, con una traducción explícita al bit real; no se intercambian
casillas ni notas. Los hechos de sello no se deducen de rachas actuales, Liga,
cristales, especies ni respuestas antiguas. Máscara ausente o inválida es desconocida.

## Registro frente a recepción del sello

La regla regional compara **capturas/obtenidos**, no vistas: 300 especies exigidas
en Sol/Luna y 400 en Ultra. Se excluyen Magearna y Marshadow en originales y además
Zeraora en Ultra. Las listas exactas de las cuatro islas se calculan por separado.
La selección PokéAPI usa los índices 16–25 de la revisión fijada, con fuente,
licencia, digest y numeración comprobada en `research/dex/alola-source.json`.

Requisitos contrastados con [los sellos del pasaporte](https://bulbapedia.bulbagarden.net/wiki/Trainer_Card_(game)#Stamps) y
[recompensas de la Pokédex original](https://www.serebii.net/sunmoon/pokedexrewards.shtml).
La Pokédex original tiene 302 entradas, la ampliada 403; las excepciones no
sustituyen otra especie ausente, aunque el total bruto coincida.

La interfaz puede acreditar la lista registrada sin acreditar el sello de esa
Pokédex. Los sellos usan exclusivamente la máscara guardada, y cada fuente requiere
integridad de su campo. Un sello y una lista discordantes se conservan como datos
distintos: no se inventa una entrega ni se reescribe la partida para reconciliarlos.

## Validación y límites

Contenedores sintéticos con cero, todos, bits altos aislados, máscaras alternas y
bits vecinos activos; paridad nativa/Core y corrupción del bloque. Dos partidas
públicas Ultra coinciden en la máscara, sin cambios de hash. Los datos publicados
son exclusivamente informes saneados. El motor WebAssembly se recompila para
mantener la misma salida de Core y CLI.

Esto verifica registros con semántica nombrada por PKHeX y documentación pública.
No son pares naturales antes/después de cada evento ni certificación de legitimidad.
Quedan la narrativa completa, escenas originales, objetos equipados y todas las
actividades no representadas por un sello. Quince sellos no equivalen al 100 %
exhaustivo de la guía ni cierran los objetivos manuales restantes.
