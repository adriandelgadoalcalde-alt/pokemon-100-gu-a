# Cobertura real y primera entrega

Fecha: 9 de noviembre de 2026. Base auditada: `5af3c69` de `main`.
Rama de trabajo: `feat/save-evidence-engine`. Implementación inicial: `093c948`;
los ajustes posteriores de pruebas constan en el historial. Este informe no presenta
la rama como publicada en Pages.

## Alcance acordado con el usuario

Guía de inicio a postgame para las nueve generaciones y sus 39 ediciones previstas,
con reconocimiento oficial y contenido relevante separado. Se excluyen los
entrenadores secundarios y los objetos sueltos triviales. Se incluyen los objetos
necesarios o relevantes para cualquier objetivo. La lectura del guardado debe orientar
al jugador y evitar preguntas o capturas redundantes; siempre local y de solo lectura.

## Baseline comprobado

| Superficie | Ediciones | Misiones | Pasos | Cobertura |
| --- | ---: | ---: | ---: | --- |
| Guía clásica | 6 | 278 | No agregado en esta auditoría | Contenido específico, lector parcial |
| Atlas | 39 | 525 | 1.146 | 459 base, 28 referencia, 20 revisión guiada, 18 edition |

Los dos HTML publicados se descargaron y coincidían byte por byte con los del commit
base. Se revisaron los diez commits más recientes, README, manifiesto y service worker.
No se verificó Settings → Pages mediante API: se ha comprobado el contenido servido,
no la configuración administrativa del repositorio.

El extractor JS anuncia SoulSilver, Blanco 2, Negro 2, Y, Rubí Omega y Ultrasol.
**No hay guardados reales disponibles aquí para validar esas seis ediciones**.
En esta entrega solo se prueba el parser de SoulSilver con fixtures sintéticos.
No hay soporte binario nuevo para otras ediciones ni integración de PKHeX.Core.

## Cambios y errores reproducidos

- SoulSilver: el selector anterior ordenaba por el máximo de dos contadores y horas,
  descartando números grandes; no validaba CRC. Un caso sintético con contador mayor
  más reciente pero contador menor más bajo elegía el progreso equivocado. Ahora se
  comparan ambos contadores por prioridad y se valida el CRC del bloque general.
  Corrupción en la copia seleccionada cancela la importación sin cambiar el diagnóstico.
- Atlas: `importData` conservaba siempre las evidencias del navegador y descartaba
  `data.evidence` de la copia exportada. Se restaura ahora la evidencia válida del JSON;
  una copia antigua sin ese campo conserva las evidencias locales.
- Se eliminaron once declaraciones de función eclipsadas por versiones posteriores:
  `setTask`, `readSaveFiles`, `v7Unmet`, `v7UnmetRoot`, `v7Panel`, `v6TaskInfo`,
  `v6Next`, `v6Flow`, `v6SituationalQuestions`, `quizPage`, `submitV6Quiz`.
  Se mantiene la última definición que ya ejecutaba JavaScript.
- Se ocultan los selectores de archivo internos del Atlas; se usan los botones de importación previstos.
- Auditoría automática del catálogo y símbolos; pruebas del parser y de navegador;
  workflow de calidad que no despliega y capturas responsive como artefactos de CI.
- Caché PWA actualizada con el nuevo módulo local. No se cambia ninguna clave de
  almacenamiento, ID de misión ni formato de exportación. No hay migración de esquema.

Archivos de producto: `index.html`, `atlas.html`, `sw.js`,
`src/saves/hgss-integrity.js`. Se añaden herramientas, pruebas, workflow y documentación.

## Evidencia y validación

| Métrica | Resultado de esta entrega |
| --- | --- |
| Nuevas misiones contrastadas exhaustivamente | 0 |
| Nuevos mapeos narrativos verificados con save antes/después | 0 |
| Mapeos documentados en scripts, pendientes de fixtures reales | 7, solo investigación |
| Nuevas ediciones con lector validado con guardado real | 0 |
| Integridad nueva | CRC del bloque general HGSS; cajas y extras pendientes |
| Pruebas unitarias/contrato locales | Pasan: catálogo, contadores, corrupción, Pokédex, límites, bytes intactos |
| Pruebas Chromium locales | Pasan: cinco anchuras, importación local, restauración, rechazo sin pérdida, offline |
| Safari/iPadOS físico | Pendiente; emulación de anchuras no sustituye dispositivo real |
| CI remota | Auditoría, contratos y navegador pasaron en GitHub para `093c948`; consultar también el estado del último commit de la propuesta |

Se generan capturas a 390, 768, 1024, 1366 y 1440 píxeles, y se comprueba ausencia de
overflow horizontal en ambas entradas. Las pantallas iniciales se mantienen. El test
de importación comprueba que no hay peticiones con los bytes del guardado.

## Respaldo y límites

El commit base sigue disponible en GitHub; se creó además un bundle local del historial
previo y copias locales de los HTML publicados, fuera del árbol público. No se modifica
`main` ni se despliega esta entrega. Los fixtures se generan sintéticamente en memoria;
`.gitignore` excluye guardados, exportaciones privadas por carpeta y archivos de entorno.

P0 **no está completo**: faltan pruebas exhaustivas de todas las migraciones históricas,
todos los flujos responsive y dispositivos físicos. La migración V7 heredada tiene
reinicios de casillas antiguos que requieren revisión específica antes de rediseñar
persistencia. El parser de otras familias sigue sin validación integral de checksums.

Siguiente entrega de mayor impacto: contrastar los siete mapeos investigados con
guardados privados identificados por región/revisión, y conectar hechos documentados
al recorrido Rojo → Oak → Orbe Rojo → Groudon, sin convertir Pokédex en prueba de origen.
En paralelo técnico posterior: unificar los motores y progreso del Atlas y lector.
La cobertura exhaustiva de las nueve generaciones sigue pendiente; no se declara 100 %.

## Segunda entrega: ruta directa, sin cuestionarios

Base de este ciclo: `92b22be`, sobre la misma rama de trabajo. Se revisó el último
`main`, el historial y la entrada publicada antes de editar. `main` y Pages siguen
en el estado anterior; los cambios se mantienen en la propuesta de GitHub.

Decisión del usuario: construir una guía de referencia para todas las generaciones,
con el guardado como entrada principal y sin tests de situación.

Cambios de producto:

- Se retiran los cuestionarios y sus funciones de envío, enlaces de menú y botones.
  La secuencia de entrada pasa a leer guardado, entender progreso y seguir la ruta.
- La vista antigua `quiz` abre ahora el diagnóstico, sin borrar sus respuestas.
- Se añade un resumen de lectura y una lista desplegable de requisitos sin evidencia,
  enlazada a sus instrucciones. No se convierte la ausencia de lectura en un «no» ni
  se marca ninguna misión al quitar el cuestionario.
- El panel de ruta ofrece continuar directamente y acceso al Atlas de nueve generaciones.
- Se corrige además la restauración de `v8Manual` y `v8Profiles`, que la importación
  clásica no recuperaba de la exportación. Se conservan `quiz`, casillas y notas.
- Las confirmaciones opcionales dentro de una misión mantienen su procedencia manual.
  No se presenta ese dato como una lectura automática del archivo.
- Se actualiza la caché PWA. No cambian claves de almacenamiento, IDs de misiones ni
  formatos de exportación; la compatibilidad de la antigua vista es reversible.

Archivos de producto modificados: `index.html` y `sw.js`. Se amplían las pruebas de
navegador y esta documentación. El historial de Git identifica el commit de entrega.

Validación local: pasan contratos y auditoría; Chromium en las cinco anchuras; entrada
desde una vista antigua de test; importación y botón para continuar sin formulario;
exportación/restauración de respuestas, perfiles, casillas y notas; requisitos sin
evidencia visibles con enlaces; rechazo de corrupción sin pérdida; funcionamiento
offline. Se revisaron las capturas de entrada móvil y del diagnóstico. La CI remota
de este ciclo debe consultarse en el último commit de la propuesta.

Cobertura nueva de contenido/semántica: **0 misiones exhaustivamente contrastadas,
0 nuevos mapeos con fixtures reales, 0 ediciones nuevas con lector validado**.
Permanecen los siete mapeos documentales del primer ciclo y sus límites. Esta entrega
retira el cuestionario del producto; **no demuestra todavía lectura integral de todos
los guardados**. La prioridad técnica posterior sigue siendo validar e integrar los
hechos de eventos por edición y unificar Atlas y lector.
