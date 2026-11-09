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

## Tercer ciclo: lector compartido, extractor local y evidencias

Base del ciclo: `0f8cd10`, rama `feat/save-evidence-engine`. Se ha actualizado el
checkout de `main` y comprobado la entrada publicada antes de cambiar el comportamiento.
Los commits de este ciclo figuran en el historial y en la propuesta de GitHub.

### Resultado implementado

- Un solo módulo de lectura para ambas páginas. El Atlas acepta directamente el
  guardado y mantiene la carga de JSON. Diez ediciones DS/3DS tienen fixtures sintéticos
  completos contrastados con la revisión fijada de PKHeX: HG/SS, B2/W2, X/Y, OR/AS, US/UM.
  Las cuatro variantes adicionales se usan en el Atlas; la guía clásica mantiene sus
  seis guías, con indicación para abrir el Atlas para el resto.
- Integridad ampliada: bloques BEEF de los formatos 3DS; bloques críticos y espejo CRC
  de B2W2; bloque general HGSS. Alcance y exclusiones en `research/save-integrity.md`.
  No se confunde la validación parcial B2W2 con la de todas las cajas y extras.
- Se elimina la copia B2W2 supuestamente elegida por horas, el filtro por muestreo que
  rechazaba archivos válidos poco poblados y la falsa Pokédex Nacional de USUM.
- Objetos clave de HGSS contrastados con PKHeX. Orbe Rojo presente orienta a Groudon,
  sin acreditar automáticamente escenas anteriores de Oak/Rojo. La recomendación del
  Atlas prioriza postgame cuando consta la Liga, conservando todas las marcas previas.
- Motor conservador de objetivos, hechos y grafo de dependencias. Se usa en maestría
  del Atlas; distingue evidencia verificada, declaración manual, indicio y desconocido,
  así como conflictos, exclusiones, DLC y eventos históricos. No migra aún todas las
  reglas heredadas ni construye el DAG exhaustivo de las 39 ediciones.
- Restauración y migración reversibles: se conservan marcas V7, respuestas antiguas,
  perfiles, campos futuros, comparaciones e historial completo. Las marcas de pasos
  cuyo texto cambió reciben aviso de revisión; no se usan como prueba de requisitos nuevos.
- Cambio de perfiles: las listas manuales se archivan y restauran al volver al perfil;
  un mismo binario puede enlazar el diagnóstico del lector web y del extractor Core.
  Una identidad incompleta antigua sigue siendo una limitación, no una identificación infalible.
- Comparaciones de campos presentes en ambos snapshots: un campo recién implementado
  no se presenta como progreso del juego. Se mantienen los intervalos de observación
  y se deja sin fecha/orden interno lo que el juego no acredita. Se evita mezclar perfiles.
- Importación idéntica actualiza el diagnóstico sin inventar un diff de progreso.
  Se eliminan recortes automáticos del historial y comparaciones. Si el almacenamiento
  falla, los datos siguen en memoria, se advierte de forma persistente y se pueden exportar.
- Recuperación de JSON local dañado sin desechar su copia original disponible. Se
  validan los datos antes de aplicar una importación; se comprueba que diagnóstico y edición coincidan.
- Cobertura por edición visible, selección de generación correcta tras recargar y
  regiones corregidas por título. El aviso de instalación deja de tapar los controles.
  Todos los módulos nuevos se precachean y la auditoría comprueba esas referencias.

### Extractor C#

`pkhex-extractor/` compila con .NET 10 y verifica la revisión de PKHeX al construir.
Lee una copia de los bytes, rechaza integridad inválida, crea JSON de forma atómica
sin sobrescribir destinos, no imprime datos personales y no expone nombre ni ID del
entrenador en el diagnóstico por defecto. Incluye inventario y flags/work opcionales.
No es un backend de Pages ni un ejecutable de iPad. Los formatos que no identifican
una edición individual no se asignan a una variante por defecto; FRLG, en particular,
no se convierte en Rojo Fuego por el valor predeterminado del objeto upstream.

Se ha compilado y ejecutado localmente el contraste completo de diez ediciones y los
contratos CLI de original intacto, corrupción, truncado, destino existente y alias.
El informe de objetos API de otras familias **no es una prueba con archivos reales**.
El objeto vacío de Z-A no se puede construir en la revisión upstream fijada: se registra
como pendiente y no se cuenta como cobertura aprobada. Los bloques hash modernos aún
no tienen interpretación narrativa completa.

### Cobertura actual y validación

El catálogo sigue en 39 ediciones, 525 misiones y 1.146 pasos. La auditoría cuenta
693 criterios de maestría existentes; ninguna de estas cifras demuestra exhaustividad.
Se mantienen 459 misiones base. **En este ciclo no se han contrastado exhaustivamente
nuevas guías completas ni validado mapeos narrativos con partidas naturales antes/después.**

Pasan los contratos JavaScript y el contraste local con PKHeX de campos, flags y work
para diez fixtures. Se comprueba inmutabilidad de bytes y rechazo de corrupción.
El navegador cubre anchos móvil/tableta/escritorio, las 39 pantallas de maestría,
importación binaria del Atlas, restauración de ambas guías, perfiles, Orbe Rojo,
recomendación tras la Liga, recuperación de JSON, fallo de cuota y carga offline.
La CI remota de este ciclo se debe consultar en el último commit de la propuesta.
Safari/iPadOS físico sigue pendiente; no se sustituye por una captura de Chromium.

El código de producto cambia en `index.html`, `atlas.html`, `sw.js`, `src/saves/` y
`src/engine/`; se añaden extractor, pruebas, auditorías y documentación. Las claves
locales e IDs de misión permanecen; los nuevos archivos de respaldo de migración y
perfiles son campos opcionales conservados por la exportación. No hay despliegue de Pages.

### Pendientes de mayor impacto

Completar los recorridos base por edición con fuentes verificadas; contrastar los siete
mapeos HGSS con guardados naturales de región/revisión conocida; ampliar lectura de
formatos y bloques modernos, tratar registros propios de cada reconocimiento oficial,
unificar todas las reglas de las dos guías y probar Safari/iPad reales. IndexedDB y
políticas explícitas de archivo son trabajo pendiente para historiales muy grandes:
la advertencia de cuota y exportación evita ocultar el fallo, pero no elimina el límite
intrínseco de localStorage. El proyecto sigue sin cumplir los criterios de 100 % global.

Actualización de cierre del tercer ciclo:
- El contrato JS/Core pasa en diez contenedores sintéticos DS/3DS. El extractor
  supera otros 23 contenedores sintéticos de GB/GBC/GBA, Sinnoh, B/N, Sol/Luna,
  Let's Go y BD/SP. La ambigüedad de edición se conserva; no equivale a 33
  identificaciones individuales ni a validación con guardados reales.
- Espada/Escudo, Arceus, Escarlata/Púrpura y Z-A siguen sin contenedor sintético
  validado en este ciclo. Los objetos vacíos upstream no sustituyen archivos reales.
- Se elimina la vinculación pública de una huella personal con declaraciones de
  Rojo y Oak. Las declaraciones ya guardadas por cada usuario permanecen intactas;
  no se siembran afirmaciones personales en nuevas importaciones.
- El diagnóstico conserva inventario, idioma, revisión y las limitaciones del
  extractor. El Atlas muestra los campos pendientes en «Alcance de esta lectura».
- Ningún nuevo mapeo narrativo obtiene certificación automática sin el contraste
  natural antes/después exigido en la investigación HGSS.

## Cuarto ciclo: diferencias reales de edición y destino tras la Liga

Base: `73d1a63` de `feat/save-evidence-engine`; ambos trabajos de CI de esa revisión
han terminado correctamente, incluido el contrato .NET/Core en GitHub Actions.

Se revisan 14 misiones existentes con siete páginas externas consultadas:
Negro/Blanco (primera Liga y tarjeta), Sol/Luna (colección de Zygarde),
Espada/Escudo (gimnasios exclusivos y orden) y Platino (Fantina/Brega/Mananti).
Las fuentes y el alcance están en `research/routes/edition-corrections.md`.
No se añaden nuevas misiones, nuevos offsets ni certificaciones de historia.

Recuento actualizado: 525 misiones / 1.146 pasos; 445 introductorias, 34 de revisión
guiada, 28 de referencia declarada y 18 específicas de edición. Continúan 693
criterios de maestría existentes; no equivalen a hechos verificados.

Se conserva cada ID y cada índice de paso. El recomendador utiliza un límite
explícito de historia por edición, probado con el catálogo real, para no volver a
recomendar la primera Liga después de recibir evidencia de final. Las 16 medallas
de Johto/Kanto priorizan Monte Plateado sin certificar las escenas anteriores.
No hay cambio de claves de almacenamiento ni pérdida de marcas manuales.

## Quinto ciclo: identidad del entrenador sin perder confirmaciones

Base: `54f0f25`; CI de rutas finalizado correctamente en GitHub.

Se corrige la omisión de SID16 en las diez ediciones del lector compartido y se
amplía la decodificación occidental de nombres HGSS a dígitos y diacríticos.
El contrato sintético JS/Core también compara ahora la identidad seudonimizada,
con una variante HeartGold que incluye tilde, eñe y número. No se imprimen IDs ni
nombres de partidas personales; todos estos archivos son sintéticos.

Para actualizar el lector sin perder declaraciones, la guía clásica enlaza el
perfil anterior al nuevo exclusivamente cuando coincide el SHA-256 completo.
La regresión de navegador conserva las marcas del perfil antiguo, importa otro
SID sin heredarlas y las recupera al volver al original. No se reemplazan las
claves de progreso ni se borran confirmaciones anteriores.

Pruebas: 42 casos unitarios; comparación de diez contenedores sintéticos con Core;
contratos de privacidad/solo lectura y regresión de navegador. La primera ejecución
de la prueba nueva de navegador intentó consultar una función interna del cierre;
se corrigió para verificar el estado persistido y el flujo real de importación.
Siguen pendientes las validaciones naturales y de dispositivo descritas arriba.
