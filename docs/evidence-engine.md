# Motor de evidencias y cronología

`src/engine/objectives.js` separa hechos directos verificados, confirmaciones manuales,
indicios derivados y datos desconocidos. Usa lógica de tres valores y un grafo de
prerrequisitos con orden estable. Rechaza IDs duplicados, referencias inexistentes,
ciclos y dependencias implícitas entre ediciones.

Los estados distinguen completado verificado, completado manual, evidencia parcial,
desconocido, disponible, bloqueado, exclusión de edición, evento histórico no disponible
y DLC no comprado. Las evidencias contradictorias permanecen desconocidas.

La adquisición de una especie y su encuentro original son objetivos diferentes. Los
hechos generados desde un diagnóstico nunca convierten `pokedex.caught` en un evento
de captura original. Los mapeos pendientes de contraste no reciben validación directa.

El motor se usa ya en los objetivos de maestría del Atlas para los campos físicos
compatibles. Una importación antigua sin integridad aporta una señal, sin convertirse
en prueba verificada por esta nueva capa. Las casillas manuales se conservan y se
identifican como tales. La guía clásica sigue teniendo reglas heredadas: su migración
completa al mismo motor sigue pendiente, al igual que el DAG exhaustivo por edición.

`src/saves/chronology.js` compara únicamente dos perfiles compatibles y campos que
existen en ambas importaciones. Añadir soporte a un campo nuevo no se presenta como
progreso ocurrido en el juego. Guarda cambios observados de Pokédex, banderas, work,
medallas y objetos clave; las importaciones delimitan el intervalo de observación.
No asigna fecha al suceso ni orden a los cambios dentro del intervalo.

Los IDs de entrenador incompletos de exportaciones antiguas siguen siendo una
limitación: no constituyen una identidad criptográficamente inequívoca. El extractor
local genera un seudónimo determinista del perfil sin exponer los ID originales.

`src/saves/progress.js` conserva versiones antiguas, respuestas retiradas, perfiles,
campos futuros e historial al restaurar. La migración V7 no borra marcas; las que
corresponden a instrucciones modificadas reciben una señal de revisión y una copia
recuperable en `migrationBackups`. No se usa una marca pendiente de revisión para
acreditar automáticamente un prerrequisito nuevo.

## Registro exacto de Pokédex en los remakes de Kanto GBA

`completion.js` compara las especies requeridas por las funciones del juego
`HasAllKantoMons` y `HasAllMons`, en una revisión fijada de pret/pokefirered. Son
150 y 380 registros concretos; un mismo total con una especie excluida no acredita
la lista. El hecho `pokedex.completion.*` describe ese conjunto registrado, no una
escena, una captura local ni un premio recogido. Solo se acredita automáticamente
con integridad válida de los campos de Pokédex. Una lista completa sin integridad
permanece como evidencia parcial; una lectura ausente no se convierte en cero.
Las confirmaciones manuales no se cambian. Véase `research/routes/frlg.md`.

## Orientación GBA documentada

El lector Core expone máscara y total de medallas y desbloqueo Nacional para las
cinco ediciones GBA. El indicador familiar de final está separado del `gameClear`
directo: su estado orienta la recomendación pero aporta únicamente evidencia parcial.
La normalización conserva la máscara y la procedencia de la señal. Una contradicción
explícita o una señal de otra familia no habilita el salto al postgame. Definiciones,
activadores y validación pendiente: `research/saves/gba-progress.md`.

## Listas nacionales de generación IV

D/P/Platino exigen 482 especies; HGSS exige 484 e incluye Lugia y Ho-Oh. Las definiciones
fijadas de cada juego determinan los conjuntos en `completion.js`. La misma lista de
482 puede completar Sinnoh y dejar HGSS pendiente; duplicados y especies excluidas
no compensan ausencias. Se acreditan registros de campos validados, conservando
confianza parcial sin integridad y sin hechos de recompensa o encuentro original.

## Medallas recibidas de B2/W2

`medals.b2w2.allReceived` compara los 255 estados individuales: solo 4 es recibido;
3 es listo para recoger. Resúmenes agregados, listas incompletas/duplicadas o estados
sin interpretar no acreditan el conjunto. La confianza depende del campo `medals`
validado. No se crean hechos de desafíos originales ni instantes de cronología a
partir de fechas. La vista y la normalización de fechas se explican en
`research/saves/b2w2-medals.md`.
