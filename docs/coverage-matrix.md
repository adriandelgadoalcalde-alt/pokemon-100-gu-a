# Cobertura real y primera entrega

Fecha: 9 de noviembre de 2026. Base auditada: `5af3c69` de `main`.
Rama de trabajo: `feat/save-evidence-engine`. Implementación inicial: `093c948`;
los ajustes posteriores de pruebas constan en el historial. Los primeros ciclos describen trabajo previo a publicación. La entrega de lectura
local ampliada se publicó después; véase `docs/releases/local-reader.md`.

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

## Sexto ciclo: recorridos ampliados y cierre editorial obligatorio

Fecha de trabajo: 10 de noviembre de 2026. Base: `cf92101`, con CI aprobado.
La petición del usuario confirma que **las guías exhaustivas de las nueve
 generaciones también deben quedar cerradas**; ese trabajo no queda fuera del alcance.
Los criterios y el seguimiento por edición están en `docs/guide-completion.md`.

Se añaden 73 rutas editoriales con 390 instrucciones desarrolladas, enlazadas a
176 misiones existentes en las 39 ediciones y las nueve generaciones. El total de
525 misiones y sus 1.146 casillas no cambia: las instrucciones ampliadas no generan
nuevos completados ni modifican el progreso manual.

Todos los objetivos hoy catalogados para los originales de Kanto y Johto tienen
recorrido ampliado. En otras familias se priorizan cadenas de acceso, puzles y
postgame: Regis, símbolos del Frente, Celio, Montaña Dura, orbes HGSS, Metro,
Handsome, Episodio Delta, Ultracriaturas, Rainbow Rocket, DLC de Galar, Parque Hansa,
Arceus, Noroteo, Área Cero inferior, Pecharunt y la cadena de legendarios de Z-A.
Esto **no acredita exhaustividad del inventario de ninguna edición**.

Las rutas tienen fuentes enlazadas; se verifica disponibilidad HTTP de 85 URLs en
`research/routes/source-availability.json`. La disponibilidad de un enlace no
certifica por sí sola su interpretación. Los scripts de Celio y Cueva Punteada se
referencian a una revisión fija de pret/pokefirered; no se copian ROM ni recursos.

La auditoría comprueba destinos existentes, referencias públicas, duplicados,
campos obligatorios y recuentos sin multiplicar rutas compartidas entre ediciones.
El navegador abre un recorrido por cada edición, revisa ancho móvil y comprueba
que las instrucciones de Kanto se consultan offline. El primer intento de esa
prueba utilizó el selector móvil en ancho escritorio; se ajusta el viewport para
reproducir el uso móvil real.

Quedan 349 misiones del catálogo sin esta ampliación editorial, además de la
revisión de huecos fuera del catálogo original. Ninguna edición pasa a «guía
exhaustiva cerrada» por las cifras de esta entrega. No hay cambios de esquema de
progreso ni nuevos offsets de lectura de eventos.

## Séptimo ciclo: corpus público, motor WebAssembly y WebKit

Fecha: 10 de noviembre de 2026. Base: `916b7da` en
`feat/save-evidence-engine`. El usuario autoriza localizar y descargar partidas
públicas para experimentar. No se publican los originales ni sus diagnósticos
completos. Véase `research/saves/README.md`.

Se fijan 59 referencias públicas, 57 contenidos distintos, de seis repositorios.
Core lee 51 y rechaza ocho (seis no reconocidos, dos con integridad inválida).
El lector ligero coincide en doce muestras de sus diez ediciones con Core en los
campos seleccionados, flags/work e identidad. Todos los originales quedan intactos.
Los formatos aceptados representan las nueve generaciones; no prueban las 39
ediciones individualmente ni la consecución natural de escenas.

El HeartGold japonés público reprodujo un fallo de decodificación de entrenador;
se corrigen kana, vocal prolongada y caracteres de ancho completo. Se mantiene el
enlace de perfiles exclusivamente por hash idéntico cuando cambia la identidad.
No se declara soporte completo de coreano ni de todos los símbolos.

El Atlas incorpora PKHeX.Core mediante un motor WebAssembly estático, separado del
lector ligero y descargado únicamente para formatos no implementados por este.
Un rechazo de integridad no habilita otra lectura. No hay backend, subida de saves
ni edición del original. Las familias ambiguas conservan su identificación parcial
y exigen seleccionar una edición válida. Los avisos, GPL, fuentes correspondientes
y recursos fijados por hash se distribuyen en `engine/`. `.nojekyll` permite servir
su carpeta de runtime desde Pages. El coste inicial ronda 45 MiB sin compresión.

El proveedor MD5 del runtime no está disponible en el navegador. BD/SP lo necesita;
se añade una implementación local RFC 1321, probada frente a .NET en nueve tamaños
(incluidos límites de padding) y en ambas muestras públicas. Se analiza una copia.
La primera integración detectó también una carrera: Blazor podía indicar arranque
antes de cargar el adaptador. Se requiere ahora una señal explícita desde C#.

Escarlata/Púrpura añade cinco señales tipadas de progreso documentadas en Core.
Dos muestras declaradas de postgame de Escarlata contienen el final de Paldea.
La señal orienta al postgame con evidencia parcial, sin marcar escenas previas ni
convertirse en certificación automática. Falso, ausencia, tipo incorrecto y
contradicción se prueban sintéticamente; faltan pares naturales antes/después.

WebKit detectó un desbordamiento real en la guía clásica a ancho de tableta; la
cabecera permite ahora envolver sus controles. Chromium y WebKit pasan la regresión
responsive, importación, conservación, rechazo y navegación con el servidor cerrado.
El Atlas registra ahora el service worker también como entrada independiente.
La validación del motor ampliado añade comparación completa con CLI, comprobación
de red exclusivamente estática y nueva lectura tras cerrar el servidor. Consultar
sus informes en `research/saves/`: ambos motores leen 51 de las 59 referencias,
rechazan ocho y coinciden completamente con CLI salvo la hora de lectura. La
reapertura offline del motor pasa en ambos, sin errores de página. El CI vuelve a
ejecutar estos contratos; no se afirma aquí un resultado remoto aún no observado.

Pruebas de este ciclo: 47 casos unitarios JS, tres pruebas sintéticas del descargador,
contrato C# y comparación JS/Core sintética, CLI de privacidad/solo lectura, corpus
público y regresión visual en ambos motores. Las capturas e informes públicos de CI
no incluyen saves, OT, TID/SID, perfiles ni volcados de flags individuales.

No cambian IDs, casillas ni claves de almacenamiento. Se añade metadato opcional de
señales documentadas; la normalización conserva desconocidos y limita su confianza.
No se amplía en este ciclo el número de rutas editoriales: siguen 73 rutas enlazadas
a 176 misiones y 349 misiones sin ese desarrollo, además de huecos del inventario.
Las guías exhaustivas de todas las generaciones continúan dentro del alcance y
ninguna se declara cerrada por haber ampliado el soporte de contenedores.

## Octavo ciclo: Hoenn GBA y puzle reproducible

Base publicada: `97b0a5f` en `main`; rama de continuación `feat/hoenn-walkthroughs`.
Se añaden 20 recorridos con 106 instrucciones a 39 misiones existentes de Rubí,
Zafiro y Esmeralda. El agregado es 93 rutas, 215 conexiones editoriales y 310
misiones del catálogo aún sin ese desarrollo. No se añaden IDs ni casillas.

Todos los objetivos hoy catalogados de esos tres títulos tienen recorrido ampliado.
La guía exhaustiva sigue en revisión: faltan desgloses de actividades y colección
agrupadas y revisión de huecos del inventario. Rojo Fuego/Verde Hoja no se consideran
completados por pertenecer a la misma generación.

Los scripts de pret/pokeruby y pret/pokeemerald se fijan por revisión. Se separan
las guaridas, la entrega de Buceo, resolución de la crisis, Cascada, líderes,
Campeones y requisitos de tarjeta. Se contrasta también el umbral de 800 puntos
internos para pinturas de concurso. Investigación en `research/routes/hoenn.md`.

El visor de hielo tiene soluciones para los dos mapas distintos. Su derivación
lee metatiles y atributos fijados, calcula recorridos sin repetir casillas y los
contrasta con los contadores de desbloqueo del script. La prueba reproduce todos
los pasos sobre la geometría por edición; no sustituye una partida natural.
Los botones del visor no cambian misiones, marcas ni el guardado.

Comprobaciones locales: 48 pruebas unitarias, auditoría sin errores, regeneración
de los recorridos del hielo, y regresión Chromium/WebKit con el visor móvil, cambio
de edición, ausencia de marcas automáticas y uso después de cerrar el servidor.
No hay nuevos offsets ni certificaciones de eventos de guardado en este ciclo.

## Noveno ciclo: remakes de Kanto GBA y listas exactas de registro

Base: `9d3a796` de `main`; rama `feat/frlg-walkthroughs`. Se añaden 16 rutas,
79 instrucciones y 32 enlaces a misiones de Rojo Fuego/Verde Hoja. Total editorial:
109 rutas, 247 conexiones y 278 misiones del catálogo aún sin esa ampliación.
Todas las misiones hoy catalogadas de la generación III tienen recorrido ampliado;
esto no cierra el inventario de objetivos y recompensas fuera o dentro de tareas
agrupadas. Las cinco guías permanecen en revisión exhaustiva.

Se corrige el falso destino de Moltres en Calle Victoria, el acceso de Mewtwo,
condiciones de MO/objetos y advertencias trasladadas de otros juegos. Se documentan
los teletransportadores de Sabrina con una derivación reproducible del mapa.
Las fuentes y su revisión están en `research/routes/frlg.md`.

El diagnóstico compara las listas reales de 150/380 especies exigidas para Kanto
y Nacional. Los totales no sustituyen la identidad de cada especie; una captura
excluida no reemplaza otra ausente. Se muestran pendientes por número y nombre,
y el motor acredita únicamente el registro con integridad validada. No inventa
encuentros originales, regalos entregados ni recompensas recogidas. Las marcas
manuales no se modifican y no hay migración de claves ni cambio de IDs.

También se actualizan dos mensajes del Atlas que todavía describían como inexistente
el motor ampliado ya publicado. La guía clásica utiliza los nombres completos en
sus etiquetas de especies pendientes; no cambian bytes ni campos del parser.

Comprobaciones locales: 50 casos unitarios; auditoría sin errores; derivación de
teletransportadores fijada; regresión Chromium/WebKit con ubicación de Moltres,
recorrido de Sabrina y el caso de 380 registros que todavía carece de Pidgey.
Ambos motores muestran el pendiente por nombre, acreditan las listas correctas
y conservan sin marcar las casillas manuales. Se revisa también la captura móvil
del diagnóstico. Se mantienen las pruebas de importación, perfiles y offline.

La regresión de actualización reprodujo otro fallo: instalar una nueva caché PWA
podía copiar HTML viejo de la caché HTTP. La instalación descarga ahora los recursos
con `cache: reload`, y las escrituras dinámicas de recursos mantienen vivo el
service worker hasta terminar. La prueba OLD → NEW reabre la versión nueva sin
servidor y conserva el marcador de progreso; se ejecuta en ambos motores en CI.

## Décimo ciclo: campos GBA y diferencias entre revisiones

Base: `7143dee`; rama `feat/gba-progress-fields`. La entrega anterior de Kanto está
publicada: Pages terminó correctamente y Atlas, ruta FRLG y SW coinciden byte a byte
con la integración. Este ciclo conserva los 109 recorridos / 247 enlaces y los 278
objetivos catalogados sin ampliación; no cierra ninguna guía exhaustiva.

Se corrige la omisión de medallas y Nacional en `Audit.cs`, se recompila el motor
WASM y se conserva la máscara de medallas en `diagnosis.js`. `ProgressSignals.cs`
añade un indicador de final por familia GBA, documentado tanto en definición como en
activador. `route.js` lo utiliza para orientar hacia el postgame; `objectives.js`
conserva confianza parcial y contradicciones. Fuentes, índices y límites constan en
`research/saves/gba-progress.md`. Nuevos mapeos narrativos con validación natural: **0**.

Las rutas de FRLG distinguen ahora GBA original de la reedición oficial de Switch:
tickets tras Hall de la Fama, condición de cinta nueva y corrección de Rugido.
Se mantienen IDs, orden y número de casillas. El lector no atribuye plataforma ni
revisión cuando el formato no las distingue. Véase `research/routes/frlg.md`.

Validación local: 52 pruebas unitarias; contratos Core con contenedores GBA de las
cinco ediciones; CLI de solo lectura y privacidad; comparación DS/3DS; corpus público
con 51 aceptados y ocho rechazos esperados. Los informes WASM de Chromium/WebKit
comparan la diagnosis completa con CLI, conservan los originales y reabren offline.
La regresión de interfaz y la actualización PWA frente a caché HTTP vieja pasan en ambos motores. Se corrige un selector inexistente en la nueva prueba antes de su repetición satisfactoria.

## Undécimo ciclo: Platino sin heredar la cronología de D/P

Rama: `feat/platinum-walkthroughs`, basada en el ciclo GBA. Se añaden once rutas con
65 instrucciones: inicio a Liga y Mundo Distorsión. Total editorial: 120 rutas,
258 conexiones y 267 misiones catalogadas aún sin ampliación. Se corrige en Platino
el lugar de entrega del inicial, el orden de gimnasios, los accesos a MO y el clímax.
No cambian IDs, índices de casillas, evidencias ni claves de almacenamiento.

Las trece misiones catalogadas de Platino tienen ampliación, pero la guía exhaustiva
permanece en revisión: navegación espacial de varios puzles e inventarios de premios,
colecciones y legado pendientes. No se añade ningún mapeo narrativo de alta confianza
ni validación natural de eventos. Fuentes y límites: `research/routes/platinum.md`.

La caché PWA incorpora el módulo nuevo. La auditoría y los 52 casos unitarios pasan;
la regresión de navegador comprueba el inicial de Ruta 201, el orden de Fantina/Brega,
Fuerza de Quinoa, Despejar de Ruinas Sosiego y la conversación de Cintia sin cambiar
marcas manuales. El resultado final de CI/publicación se añade tras verificarse.

## Duodécimo ciclo: Diamante/Perla originales

Base: `ccd9714`; rama `feat/diamond-pearl-walkthroughs`. La entrega GBA/Platino ya
publicada está documentada en `docs/releases/gba-platinum.md`, con verificación real
de la URL pública en Chromium y WebKit y comparación local de campos de Esmeralda.

Diez rutas nuevas, 52 instrucciones y veinte conexiones para D/P. Total: 130 rutas,
278 conexiones y 247 misiones catalogadas aún sin ampliación. Se conserva el número
de 525 misiones y 1.146 casillas de pasos; no hay migración ni cambio de claves/IDs.

Se separan Fantina quinta después de Surf, Fuerza de Torre Perdida y Despejar del
Gran Pantano, regalos de versión y Dialga/Palkia sin Mundo Distorsión. Se corrigen
el orden Gardenia/edificio y la ambigüedad Brega/Fantina en las casillas originales.
Referencias editoriales y límites: `research/routes/diamond-pearl.md`. No hay nuevos
offsets de alta confianza, parejas naturales ni guías exhaustivas cerradas.

Auditoría y 52 pruebas unitarias correctas. La regresión de interfaz comprueba ambas
ediciones y la consulta de Fantina sin servidor; los resultados de CI/publicación
se registran tras verificarse.

## Decimotercer ciclo: remakes HGSS y Nacional de generación IV

Rama: `feat/hgss-walkthroughs`, sobre `0d31a52` del ciclo D/P. Diecisiete rutas,
94 instrucciones y 34 conexiones nuevas. Total editorial: 147 rutas, 312 conexiones
y 213 misiones catalogadas aún sin ampliación. HG/SS tiene 19 conexiones por edición;
el inventario exhaustivo y varios puzles permanecen en revisión.

Se explican Surf frente a cinco Kimono, Fuerza de Ruta 42, regalo de Dratini,
componente/Abono/radio de Kanto, Rojo/Oak y cámaras de Alfa. Fuentes primarias fijadas
y límites: `research/routes/hgss.md`, con informe de disponibilidad/paridad separado.

El motor compara ahora la lista Nacional exacta de D/P/Platino (482) frente a HGSS
(484, incluyendo Lugia/Ho-Oh). El diagnóstico muestra pendientes con nombres y
las metas de registro reciben evidencia sin inventar escenas, premios o estrellas.
Se mantienen claves, IDs, índices, historial y marcas manuales; no hay migración.

Pasan 54 casos unitarios, auditoría y regresión Chromium/WebKit: misma lista que
completa Sinnoh pero carece de dos especies exigidas en HGSS, MO/Kimono/Alfa y
reapertura de rutas sin servidor. Nuevos mapeos narrativos con validación natural:
**0**. CI y publicación se registrarán tras comprobarse.

Dos ejecuciones remotas anteriores permanecieron en instalación de WebKit mientras
otras ejecuciones del mismo conjunto la completaron. Se limita a diez minutos la
provisión de navegadores en CI; un atasco externo falla el trabajo y permite reintento,
sin suprimir WebKit ni aceptar pruebas pendientes como aprobadas.

## Decimocuarto ciclo: Medallero completo en los dos lectores

Base: `a18f3a1`; rama `feat/b2w2-medals`. El ciclo D/P+HGSS está publicado y probado
en la URL pública con ambos motores; véase `docs/releases/gen4-ds.md`.

Se reproduce la aceptación de un 31 de febrero con CRC correcto en el lector
ligero y la omisión del Medallero en `Audit.cs`. Se corrigen fechas, se conservan
estados desconocidos y se recompila WASM con las mismas 255 entradas que CLI.
Las comparaciones sintéticas y públicas incorporan el bloque completo: dos partidas
públicas nativas coinciden sin modificar sus bytes ni publicar fechas o identidades.

El Atlas ofrece nombres, búsqueda y filtros, tanto en diagnóstico como en E01;
separa recibidas, listas para recoger y pendientes/sin interpretar. La meta de 255
recibe evidencia únicamente de una lista completa y campos validados, sin crear
historia de desafíos. Se conservan todos los IDs, marcas, claves y exportaciones.
Los nombres GPL se verifican contra el recurso fijado y se incluyen avisos/fuentes.

Pasan 57 casos unitarios, auditoría, contratos CLI, corpus completo y ambas regresiones
Chromium/WebKit: GUI, búsqueda sin acentos, datos incompletos, reapertura offline,
actualización PWA y paridad completa CLI/WASM. Nuevos eventos narrativos con pareja
natural: **0**. Las 255 condiciones todavía requieren redacción ejecutable propia y
revisión de disponibilidad; no se cuentan como nuevas rutas exhaustivas.

El total editorial se mantiene en 147 rutas y 312 conexiones, con 213 misiones del
catálogo sin ampliación. Ninguna guía exhaustiva se declara cerrada por este ciclo.

## Megapiedras ORAS e inventario de sexta generación

Base: recorridos ORAS publicados y comprobados en ambos motores de navegador
([registro de publicación](releases/oras.md)). Se añade una guía consultable de las
47 megapiedras con fuentes individuales, buscador y filtros, entregas por versión y
legado separado. Se muestra presencia actual en bolsa, sin deducir regalos ni cerrar
colecciones; objetos equipados todavía no se leen. No cambian los IDs de misiones,
las 1.146 casillas, claves de almacenamiento ni el total de 196 recorridos.

El lector JS incorpora los cinco bolsillos de X/Y/ORAS. Cinco muestras públicas
coinciden con Core. La regresión sintética comprueba límites de bolsillos, relleno,
huecos y corrupción sin escritura en originales. No hay nuevos mapeos de eventos
antes/después ni ediciones nuevas validadas. Las fuentes y límites se conservan en
`research/saves/gen6-inventory.md` y `research/routes/oras-stones.md`.

Esta ampliación no cierra mapas, concursos, objetos equipados ni la guía exhaustiva
global. No se presenta como completado el 100 % de ninguna edición.

La interfaz y consulta offline pasaron en Chromium/WebKit, con filtros de bolsa y
legado y sin pérdida de marcas. Dos partidas públicas ORAS se importaron también
en la interfaz: conteos coincidentes, análisis local y cero errores. Queda pendiente
validar el cambio en dispositivos físicos y comprobar su publicación tras CI.

## Historia de Alola separada por versiones

Dieciséis rutas nuevas y 117 instrucciones conectan 32 misiones de Sol/Luna y
Ultrasol/Ultraluna. El total pasa a 212 recorridos/440 conexiones; quedan 85 misiones
del catálogo sin ampliación. Se corrigen capitanes, orden de las pruebas, rescate,
Poni y Liga con referencias independientes por pareja. Los IDs y el número/índice
de casillas se conservan, sin reglas automáticas narrativas ni cambios de esquema.

Diez entradas por edición están ampliadas. Esto no acredita guía exhaustiva:
puzles espaciales, inventarios, colecciones y servicios están pendientes en
`research/routes/alola.md`. No se incrementan ediciones de lector ni eventos
contrastados antes/después por añadir rutas editoriales.

## Inventario Ultra y cristales Z

El lector nativo devuelve siete bolsillos de Ultrasol/Ultraluna, contrastados contra
Core en dos muestras públicas y contenedores sintéticos. Son siete muestras con
paridad de inventario completo contando las cinco de X/Y/ORAS anteriores. No hay
ediciones nuevas de lector ni eventos narrativos contrastados antes/después.

El diagnóstico de las cuatro ediciones de Alola muestra los cristales de bolsa,
separados de los equipables: 29 tipos en originales y 35 en Ultra. Sus nombres/IDs
se validan contra fuentes empaquetadas en CI. Se muestran posesión, ausencia y
lectura desconocida sin cerrar pruebas, pasaporte o casillas. Sol/Luna continúa
usando el lector ampliado. Documentación: `research/saves/gen7-inventory.md`.

## Sellos guardados del pasaporte y listas exactas de Alola

Se leen los quince bits de sello de PKHeX Misc7 para las cuatro ediciones mediante
Core y, en Ultra, también con el lector nativo. Los IDs históricos se conservan:
Pokévisor y combate Múltiple se traducen a sus bits reales sin intercambiar marcas.
Dos muestras públicas Ultra coinciden; no se añaden parejas naturales antes/después.

La Pokédex se compara con las listas exactas de 300/400 obtenidos y las cuatro islas
por pareja. Se distingue completar el registro y recibir el sello: solo la máscara
acredita los objetivos de pasaporte. Ausencia, integridad insuficiente y campos
inválidos no se convierten en completados. Se actualiza el motor local para mantener
paridad CLI/WebAssembly. Fuente y límites: `research/saves/alola-passport.md`.

No cambia la cantidad de rutas ni casillas ni el esquema de almacenamiento.
Las guías exhaustivas siguen en revisión y no se certifica el 100 % global.

La entrega anterior de historia y la de bolsa/cristales están publicadas y
comprobadas en ambos motores: `docs/releases/alola-story.md` y
`docs/releases/alola-inventory.md`. La lectura nueva del pasaporte se valida
aparte; no se atribuye a esas versiones anteriores.

### Let’s Go: historia y registros de Kanto

Cuatro rutas nuevas y 37 instrucciones amplían las ocho conexiones de historia
pendientes de Pikachu/Eevee: técnicas secretas, puertas de gimnasios, Rocket,
Silph y Liga. Total: 216 rutas/448 conexiones; quedan 77 misiones sin ampliación.
Las seis misiones catalogadas de cada edición tienen recorrido; persisten huecos
de inventario, colecciones y mapas descritos en `research/routes/lets-go.md`.
El diagnóstico compara las 150 especies obtenidas que exige el diploma, sin
confundir esa condición con recibirlo ni con títulos o encuentros originales.

### Galar: gimnasios, Copa y episodio posterior

Nueve rutas nuevas y 66 instrucciones amplían dieciséis conexiones de Espada y
Escudo. Total: 225 recorridos/464 conexiones; quedan 61 misiones sin ampliación.
Se corrige el inicio en Yarda, los nombres españoles, la puntuación de Naboru,
las versiones de gimnasios y la secuencia de captura de los legendarios. Se
conservan casillas y dos rutas de expansiones. `research/routes/galar.md` recoge
las fuentes y los inventarios/mapas/colecciones que aún impiden declarar cierre.

### BDSP: historia, Gran Subsuelo y registros Nacionales

Once rutas nuevas y 68 instrucciones amplían 22 conexiones: inicio, ocho
medallas, Galaxia, Liga y colecciones. Total: 236 recorridos/486 conexiones;
quedan 39 misiones sin ampliación. Se preservan IDs y casillas, y se corrige
Gardenia antes del edificio Galaxia y Fantina como quinta líder. Los movimientos
de campo usan Poké-reloj; la tarjeta exige variantes de estatuas, no banderas.
La lista exacta de 482 obtenidos se compara sin acreditar estrella ni premio.
La lógica reconstruida y sus límites se documentan en `research/routes/bdsp.md`;
no se equipara el cierre del catálogo con todos los mapas/encuentros/colecciones.

### Hisui: señoriales, monturas, crisis y tablas

Nueve rutas nuevas y 70 instrucciones amplían las nueve conexiones restantes de
Leyendas: Arceus. Total: 245 recorridos/495 conexiones; quedan 30 misiones sin
ampliación. Se mantienen las dos rutas de Arceus y las casillas, se localiza el
nombre de Volus y se distinguen investigación, monturas, señoriales y capturas.
Templo Puntaneva y Uxie incluyen sus respuestas; Regigigas exige tablas y las
fases de Giratina no equivalen a capturarlo. El cierre de las once misiones del
catálogo no cierra peticiones, mapas ni colecciones: `research/routes/hisui.md`.
## Tercera generación: el guardado dice dónde estás y qué secretos faltan

Fecha: 11 de noviembre de 2026.

**Lector nativo de campo** para R/Z, E y RF/VH. Lee:

- la copia activa con sus checksums;
- la ubicación (nombre oficial en español);
- equipo y cajas;
- todas las banderas y variables.

Paridad con PKHeX.Core: 8 de 8 archivos coinciden por completo (6 públicos y 2 privados cedidos, fuera de Git).

**Catálogo de 23 secretos y legendarios.** Cada uno tiene banderas de pret verificadas: existen y algún script las activa. Las semánticas difieren por edición; están documentadas en `research/gen3/README.md`.

**En el Atlas:**

- «Dónde estás ahora» y la historia según las banderas;
- «Secretos y eventos» con estado, requisitos y pasos;
- la Isla Espejismo calculada para hoy y los próximos días con tus propios Pokémon;
- la ruta del clima anómalo de Esmeralda.

El recomendador usa la primera bandera de historia pendiente.

Pruebas: 86 unitarias, auditoría, regresión de navegador (Chromium) y actualización de la PWA. Capturas revisadas a 390, 1024 y 1440 píxeles, sin desbordamiento.

Límites:

- Confianza «documentado en código»; sin pruebas antes/después, nada se certifica automáticamente.
- El Frente Batalla y los concursos siguen pendientes.
- Las demás generaciones no tienen todavía esta capa.

## Lectura de progreso por generación (11 de noviembre de 2026)

Qué interpreta ahora la guía a partir del guardado, además de la Pokédex y las medallas que ya leía:

| Gen. | Ediciones | Fuente del significado | Historia | Secretos, legendarios y desafíos |
| --- | --- | --- | --- | --- |
| I | Rojo, Azul, Amarillo | pret (pokered, pokeyellow) | 13 hitos y ubicación | Pájaros, Mewtwo, Snorlax, Dojo, fósil, iniciales de Amarillo |
| II | Oro, Plata, Cristal | pret (pokegold, pokecrystal) | 12 hitos y ubicación | Ho-Oh/Lugia (Cristal con requisito exacto), bestias, Suicune, regalos, Ruinas Alfa |
| III | Rubí, Zafiro, Esmeralda, RF, VH | pret + lector nativo | 11-13 hitos y ubicación | Regis, legendarios, eventos de ticket, Isla Espejismo calculada, Liga repetida, Frente Batalla, escudos |
| IV | HeartGold, SoulSilver | pret (pokeheartgold) | 13 hitos hasta Rojo y ubicación | 22 secretos, errantes con estado real, regalo de Oak, Ruinas Alfa, impresiones del Frente |
| IV | Platino | pret (pokeplatinum) | 9 hitos y ubicación | 22 secretos, Regis con Regigigas de evento, impresiones del Frente, concursos Master |
| IV | Diamante, Perla | lista de PKHeX; mapas de pokediamond | Medallas, Salón de la Fama y ubicación | Legendarios, regalos y concursos Master |
| V | Negro, Blanco, Negro 2, Blanco 2 | lista de PKHeX; zonas de N2/B2 desde la ROM | Salón de la Fama; ubicación en N2/B2 | Legendarios y regalos; Medallero de N2/B2 (ya existente) |
| VI | X, Y, Rubí Omega, Zafiro Alfa | lista de PKHeX; zonas desde la ROM | Salón de la Fama y ubicación | Legendarios, Mansión Batalla, Episodio Delta, revancha del Alto Mando, Regis |
| VII | Sol, Luna, Ultrasol, Ultraluna | lista de PKHeX; zonas de USUM desde la ROM | Salón de la Fama; ubicación en USUM | Legendarios, regalos, monturas; sellos del pasaporte (ya existente) |
| VIII | Diamante Brillante, Perla Reluciente | lista de PKHeX + lector propio de banderas | Salón de la Fama y ubicación (zona = lugar oficial) | Legendarios y regalos |
| VIII | Espada, Escudo | bloques con nombre de PKHeX | 8 medallas y título (por victorias en la Torre Batalla) | Pájaros de Galar, Regis, Aventura Dinamax, Torre Batalla |
| VIII | Leyendas Arceus | bloques con nombre de PKHeX | 6 hitos y área actual | Arceus, Pokédex completa y perfecta, zonas, monturas, Eterna Ensoñación |
| IX | Escarlata, Púrpura | bloques y señales de PKHeX | Señal de final (existente); lugar actual | DLC, diploma, teraincursiones |

Pendiente:

- **Sin interpretación todavía:**
  - Verde (Japón).
  - Leyendas Z-A: matrices sin nombres públicos.
- **Ubicación del jugador:** se lee en las generaciones I a IV (salvo Verde japonés y las versiones japonesa y coreana de Game Boy); en la V, solo Negro 2/Blanco 2 (falta una copia de Negro/Blanco para su tabla de zonas); en la VI, X/Y y ROZA; en la VII, Ultrasol/Ultraluna (falta una copia de Sol/Luna); en Switch, Diamante Brillante/Perla Reluciente y Escarlata/Púrpura (lugar exacto; si falta, la región), Leyendas Arceus (Villa Jubileo o el área) y Leyendas Z-A (Ciudad Luminalia). Espada/Escudo guarda un hash del nombre de la zona: se reconocen, con pruebas, Pueblo Yarda, Pueblo Amura, Pueblo Ladera, Pueblo Plié, Pueblo Crampón, el Área Silvestre, la Isla de la Armadura, las Nieves de la Corona y la Torre Batalla (el resto queda sin nombre). Let's Go: pueblo, ruta o cueva, con gimnasio, Centro Pokémon, tienda o interior (tabla de áreas del propio juego).
- **Confianza:**
  - Pret y PKHeX se marcan como «documentado en código» o «documentado por la comunidad».
  - Ninguna lectura certifica automáticamente: faltan comparaciones antes/después con partidas propias.
- **Integración continua:** la rama no la ejecuta en cada envío (el flujo solo corre en `main` y en propuestas de cambio). Las pruebas se han ejecutado aquí: 101 unitarias, auditoría, navegador y actualización de la PWA. La comparación con el extractor de escritorio requiere .NET.
- **Red:** Bulbapedia y Serebii no son accesibles desde esta sesión. Las cifras salen del código fuente de los juegos.
