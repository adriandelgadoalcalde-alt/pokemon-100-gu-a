# AGENTS.md — Archivo Maestro Pokémon: traspaso integral a Codex

> **Alcance confirmado por el usuario al continuar (09/11/2026):** guía completa de las
> nueve generaciones, orientada por lectura local del guardado. Excluir entrenadores
> secundarios y objetos sueltos triviales; incluir todos los objetos importantes o
> relevantes para cualquier paso. Esta precisión prevalece sobre listas generales
> de entrenadores/objetos del traspaso. Estado del trabajo en `docs/coverage-matrix.md`.
>
> **Dirección de producto confirmada después:** el recorrido será guardado → diagnóstico
> → guía, sin tests de situación. Conservar las respuestas y marcas históricas en las
> copias de seguridad. La retirada del cuestionario no acredita automáticamente datos
> que el lector aún no interpreta: mantenerlos explícitamente pendientes de lectura.

> **Cierre confirmado por el usuario (10/11/2026):** las guías exhaustivas de todas
> las generaciones también deben quedar cerradas. Completar el lector o la PWA no
> sustituye ese trabajo. Criterios y seguimiento: `docs/guide-completion.md`.
>
> **Proyecto:** Guía Pokémon al 100 %, Atlas de las nueve generaciones, lector y auditor de guardados `.sav`/`main` y aplicación web progresiva (PWA).  
> **Fecha de este traspaso:** 9 de noviembre de 2026.  
> **Estado:** producto web funcional **parcial**, con contenido extenso, lectores limitados y una gran cantidad de investigación/validación pendiente. **No se ha certificado el 100 % de las 39 ediciones.**  
> **Destinatario:** Codex y cualquier agente desarrollador/auditor que continúe el proyecto.  
> **Idioma de producto y documentación:** español (es-ES).  
> **Prioridad contractual:** exactitud, trazabilidad y seguridad de los guardados por encima de porcentajes atractivos o de declarar trabajo no realizado.

---

> **Validación pública autorizada (10/11/2026):** el usuario permite buscar y descargar
> partidas públicas para experimentar y contrastar el lector. Los originales siguen
> siendo de solo lectura y no se redistribuyen. Manifiesto e informe saneado en
> `research/saves/`; no confundir partidas preparadas con progresión natural.

## 0. Instrucciones obligatorias para Codex — leer antes de editar nada

1. **Trabaja sobre el código REAL de GitHub, no sobre capturas ni resúmenes antiguos.** Antes de cada cambio, inspecciona el último `main`, la web publicada, los artefactos actuales y el historial de commits. Este documento es una fotografía del 09/11/2026, no una garantía de que no existan commits posteriores.
2. **No inventes progreso.** Distingue una captura en la Pokédex de un encuentro en su ubicación original; un objeto poseído de un regalo recibido; una bandera activa de un hecho histórico completo; y los pasos marcados por el usuario de los que certifica el juego.
3. **Los archivos `.sav`, `main`, los ID de entrenador, las copias JSON de progreso y los volcados de flags son privados.** No los subas a un repositorio público, no los imprimas completos en logs ni los envíes a servicios remotos sin consentimiento explícito. Por defecto, análisis local y solo lectura.
4. **No modifiques ni reescribas guardados** durante el análisis. Toda operación PKHeX para restaurar eventos debe ser una función separada, opcional, explícita, con vista previa, copia de seguridad y control de integridad. Nunca uses el editor de flags como «solución mágica» para declarar una partida completada.
5. **Preserva el progreso de la web.** Antes de migrar estructuras `localStorage`, exporta/soporta versiones anteriores, conserva los IDs de misiones, añade esquema de migración reversible y prueba su restauración. Jamás borres casillas porque un parser nuevo no sepa leerlas.
6. **No reemplaces `index.html` y `atlas.html` sin QA.** El usuario utiliza la web publicada en iPad Pro, Android y PC. Desarrolla primero en rama, prueba móvil/iPad/escritorio, PWA y modo sin conexión; despliega solo cuando pasa la regresión.
7. **No confundir cobertura con completismo.** Un catálogo de 39 ediciones o 525 misiones no equivale a 39 guías exhaustivas. Cualquier función no implementada o no contrastada debe figurar como tal en la interfaz y en el informe de cobertura.
8. **Investiga la semántica de cada dato.** La mera existencia de `GetEventFlag(n)` no explica qué significa `n`. Para relacionar flags con objetivos, utiliza scripts/decompilaciones del juego, datos de PKHeX, documentos de Project Pokémon y comparaciones controladas antes/después.
9. **Utiliza evidencias reproducibles.** Cada mapeo debe guardar juego, región/revisión, fuente de código, campo/índice/offset o key, interpretación, prueba positiva, prueba negativa, matices y confianza. No se permiten «offsets adivinados».
10. **No prometas trabajo en segundo plano ni digas que una versión es definitiva sin cumplir los criterios de aceptación.** Entrega cambios realmente probados, pendientes verificables y resultados honestos de CI.

### Regla permanente del propietario sobre la forma de trabajar (12/11/2026)

- **Trabajo continuo hasta el final.** El agente no se detiene hasta completar absolutamente todos los objetivos pendientes de
  todos los juegos y de todos los guardados (lista viva en `research/completion/README.md` y en el informe de cobertura).
  Al acabar un punto pasa al siguiente sin esperar; si una vía se bloquea, busca otra y lo anota.
- **Permiso total y sin confirmaciones.** El propietario autoriza todo lo necesario para el proyecto y no quiere que se le pida
  confirmación: puede no estar presente (por ejemplo, durmiendo). Las decisiones técnicas se toman y se documentan.
- Lo único que esta regla no cambia son los límites de privacidad y de seguridad de los puntos 3 y 4 (partidas, claves y datos
  del entrenador nunca salen del equipo ni se reescriben) y que nada se presenta como hecho sin comprobarlo (puntos 9 y 10).
- Material disponible en el PC del propietario: los 42 juegos en `<Keep>\Pokekeep\investigacion\juegos\<consola>\<juego>` y sus
  partidas en `<Keep>\Pokekeep\saves-prueba\autorizadas\<consola>\<juego>` (todas salvo Verde japonés, Colosseum, XD y Battle
  Revolution). Barrido por la interfaz real: `node scripts/sweep-local-saves.cjs <carpeta> [chromium|webkit] [dispositivo]`.

### Mandato de producto en una frase

> Abrir el guardado del jugador, identificar automáticamente todo el progreso que sea **demostrable**, reconstruir una **ruta canónica de objetivos** y sus requisitos, indicar **qué falta exactamente y cómo conseguirlo paso a paso** desde el inicio hasta el postgame, y acreditar de manera conservadora el máximo nivel de tarjeta, sellos o equivalente en **cada una de las nueve generaciones**.

### Regla esencial de cronología

Hay **dos cronologías diferentes**:

- **Orden canónico/de desbloqueo:** grafo de prerrequisitos diseñado a partir de los scripts y las guías. Puede conocerse aunque solo tengamos un guardado.
- **Cronología histórica del jugador:** secuencia real de lo que hizo. **Un único `.sav` normalmente no guarda toda la historia con fechas/orden**. Se reconstruye únicamente cuando hay registros explícitos, mediante comparación de guardados sucesivos y con actividad manual de la aplicación. No presentar el orden canónico como si fuera el orden en que el jugador jugó.

---

## 1. Objetivo funcional y definición rigurosa del «100 %»

El usuario quiere una única guía para los juegos principales Pokémon, generaciones I–IX, con un nivel comparable o superior a la guía desarrollada para SoulSilver. Debe servir desde el inicio de una partida hasta el último postgame sin depender de conexión durante el juego. Quiere que el archivo `.sav`/`main` sustituya, cuando sea posible, los cuestionarios repetitivos.

### 1.1 Cuatro capas de completismo, **siempre separadas**

| Capa | Qué comprende | Prueba admisible | Precaución |
| --- | --- | --- | --- |
| A. Historia oficial | Medallas, pruebas insulares, Alto Mando, campeón, líderes y episodios de historia | Flags, variables de script, hall of fame, registros persistentes | Un evento repetible puede reiniciar sus flags |
| B. Postgame y encuentros | Legendarios, secretos, grandes combates, subtramas, rompecabezas y accesos | Flags/counters de escena, campos de encuentro, estado de mapa, registros | Tener la especie en Pokédex **no** demuestra capturarla en su lugar original |
| C. Colección y desafíos | Pokédex, formas, objetos clave, MT, concursos, medallas, cintas, Pokéathlon, Frente/Torre/Árbol Batalla, entrenadores | Recompensas, álbum, contadores persistentes, objetos en bolsa, buffers de batalla | Muchos objetos consumibles dejan de estar presentes aunque se obtuvieran |
| D. Reconocimiento oficial y legado | Tarjetas con máximas estrellas **solo donde existan**, pasaporte/sellos, diplomas, distribuciones históricas, eventos especiales | Indicador oficial + requisitos desglosados y comprobados | No todas las ediciones tienen tarjeta de 5 estrellas; eventos antiguos pueden ser inaccesibles legítimamente hoy |

**No existe un único estándar de 100 % idéntico para las 39 ediciones.** Definir por juego un `CompletionProfile` con una `officialCompletion` y otra `extendedCompletion`, con contenido adicional opcional/legado. No exigir eventos expirados para el reconocimiento oficial cuando el juego no los exige.

### 1.2 Experiencia esperada por el usuario

1. Abre la PWA, elige edición o deja que el lector la detecte, importa `.sav` o `main` **sin enviar el fichero a ningún servidor**.
2. El parser identifica versión, generación, región/revisión, slot activo, integridad/checksums, entrenador/perfil y campos persistentes.
3. El motor convierte campos internos en **hechos estructurados**, cada uno con evidencia y límite interpretativo.
4. El motor evalúa el **grafo de objetivos**: completado, parcial, desbloqueado, bloqueado, no verificable, opcional o no disponible en esa edición.
5. La pantalla principal muestra «Tu siguiente objetivo», por qué lo recomienda, prerrequisitos, ubicación, pasos de ejecución, solución de problemas, evidencia detectada y botón para navegar a una misión previa.
6. No pregunta «¿te pasaste la Liga?» si existe prueba fiable. Pregunta **solo** por acontecimientos intrínsecamente ambiguos; guarda la respuesta por perfil y sin sobrescribir otros pasos.
7. En futuras sesiones importa un guardado actualizado, calcula el diff y genera **cronología de cambios observados**, comparaciones y nuevas recomendaciones.
8. Puede exportar/importar todo el progreso en JSON, usarlo desde iPad/Android/PC y consultar offline detalles de puzles, legendarios, combates y condiciones de evento.
9. El «certificado 100 %» por juego muestra **hechos verificados, declarados, desconocidos, no disponibles y bloqueados**. Nunca confunde «100 % de casillas» con prueba de partida completa.

---

## 2. Repositorio, publicación y datos verificados el 09/11/2026

| Recurso | Valor / situación |
| --- | --- |
| Repositorio **real** | [`adriandelgadoalcalde-alt/pokemon-100-gu-a`](https://github.com/adriandelgadoalcalde-alt/pokemon-100-gu-a) |
| **¡Atención al nombre!** | El repo termina en `pokemon-100-gu-a`, **no** en `pokemon-100-guia`. Un error de nombre provocó bloqueos 404 durante el desarrollo. |
| Rama por defecto | `main` |
| Publicación prevista/comprobada por el usuario | `https://adriandelgadoalcalde-alt.github.io/pokemon-100-gu-a/` |
| Atlas | `https://adriandelgadoalcalde-alt.github.io/pokemon-100-gu-a/atlas.html` |
| Método de GitHub Pages | Publicación desde la rama `main`, carpeta raíz. Se retiró un workflow de Actions redundante que había fallado. **Revisar Settings → Pages y Actions si cambia.** |
| `index.html` | Aplicación clásica PWA/lector SAV; título V8.3, ~766 KB, seis ediciones guiadas; JSON interno del contenido declara todavía `7.0-dependency-safe` (desfase de nombres heredados). |
| `atlas.html` | PWA/Atlas I–IX, ~415 KB; contiene catálogo JSON embebido con `version: 9.2-catalogue-audit`; la cabecera también incorpora «Maestría 100 %». No deducir que el título prueba una implementación completa. |
| `README.md` | Resumen básico del Atlas y lector; no contiene toda la investigación necesaria. |
| `manifest.webmanifest` | Metadatos de instalación PWA. |
| `sw.js` | Service worker de caché. En la revisión de repo observada: `CACHE='pokemon-100-v9-3-1-mastery'`; comprobar que no existe HTML antiguo cacheado en iPad. |
| Iconos | `icons/icon.svg` y referencias del manifiesto. |
| `AGENTS.md` previo | No existía en el repositorio cuando se realizó esta auditoría. Este documento está pensado para convertirse en el `AGENTS.md` de la raíz. |

**Confirmado mediante acceso al repositorio conectado**, no extrapolado exclusivamente de conversaciones: aplicación monolítica basada en HTML/CSS/JS embebidos, sin backend operativo ni dependencia actual de PKHeX.Core. El servicio web de GitHub Pages ofrece ficheros estáticos; **no ejecuta C#/.NET en servidor**.

### 2.1 Cantidades reales del contenido actual

| Superficie | Ediciones | Misiones | Pasos | Observación |
| --- | ---: | ---: | ---: | --- |
| `index.html` lector/guía clásica | 6 | **278** | Variables por misión | Guías específicas y pruebas con guardados históricos, cobertura limitada. |
| `atlas.html` I–IX | **39** | **525** | **1.146** | Catálogo y seguimiento, **no** auditoría exhaustiva. |
| Atlas: `verified=base` | — | **459** | — | Instrucciones de base/introducción; NO confundir con rutas exhaustivas. |
| Atlas: `verified=referencia` | — | **28** | — | Marcadas como contrastadas con referencia en iteraciones previas. Validar cada cita. |
| Atlas: `verified=revisión guiada` | — | **20** | — | Objetivos detallados añadidos, no certificados automáticamente. |
| Atlas: `verified=edition` | — | **18** | — | Extras específicos de edición. |

**Los 525 objetivos del Atlas no sustituyen ni abarcan con el mismo detalle las 278 misiones del lector clásico**. Son bases distintas. Es necesario unificar IDs, reglas, pasos y evidencias en un motor común, sin perder las dos estructuras de progreso.

### 2.2 Las seis guías desarrolladas en la aplicación clásica

- **SoulSilver**: 68 misiones en 11 capítulos.
- **Blanco 2**: 41 misiones en 6 capítulos.
- **Negro 2**: 41 misiones en 6 capítulos.
- **Pokémon Y**: 34 misiones en 6 capítulos.
- **Rubí Omega**: 40 misiones en 7 capítulos.
- **Ultrasol**: 54 misiones en 9 capítulos.

Tener guía **no** es sinónimo de lector compatible para todas las variantes: debe verificarse la detección de cada edición y familia de guardado.

---

## 3. Inventario de juegos: 39 ediciones, nueve generaciones

Las expansiones DLC pertenecen a su juego principal; **no** se cuentan como cartuchos/ediciones independientes. Los spin-offs (Stadium, Colosseum, XD, Ranger, Mundo Misterioso, etc.) están fuera del alcance original de este Atlas y deben figurar en backlog separado si se incorporan.

| Gen. | Ediciones previstas (ID interno del Atlas) | Plataforma/observación |
| --- | --- | --- |
| I | Rojo `RED`, Verde japonés `GREEN`, Azul `BLUE`, Amarillo `YELLOW` | GB; locales/regiones/VC afectan formato y contenido. |
| II | Oro `GOLD`, Plata `SILVER`, Cristal `CRYSTAL` | GBC/VC; Cristal tiene historia y eventos propios. |
| III | Rubí `RUBY`, Zafiro `SAPPHIRE`, Esmeralda `EMERALD`, Rojo Fuego `FIRERED`, Verde Hoja `LEAFGREEN` | GBA; diferencias Frente Batalla, Sevii, eventos. |
| IV | Diamante `DIAMOND`, Perla `PEARL`, Platino `PLATINUM`, HeartGold `HEARTGOLD`, SoulSilver `SOULSILVER` | NDS; D/P/Pt ≠ HGSS en scripts y offsets. |
| V | Negro `BLACK`, Blanco `WHITE`, Negro 2 `BLACK2`, Blanco 2 `WHITE2` | NDS; las secuelas **no** repiten el orden de los originales. |
| VI | X `X`, Y `Y`, Rubí Omega `OMEGARUBY`, Zafiro Alfa `ALPHASAPPHIRE` | 3DS: `main` descifrado, bloques específicos. |
| VII | Sol `SUN`, Luna `MOON`, Ultrasol `ULTRASUN`, Ultraluna `ULTRAMOON`, Let's Go Pikachu `LETGOP`, Let's Go Eevee `LETGOE` | 3DS + Switch; Let's Go es de la generación VII y su estructura es distinta. |
| VIII | Espada `SWORD`, Escudo `SHIELD`, Diamante Brillante `BD`, Perla Reluciente `SP`, Leyendas Arceus `ARCEUS` | Switch; incluir pases de expansión de Espada/Escudo y sus Pokédex. |
| IX | Escarlata `SCARLET`, Púrpura `VIOLET`, Leyendas Z-A `ZA` | Switch / Switch 2 según edición; DLC y objetivos por separado. |

**La compatibilidad del lector de binarios debe desplegarse por formato de save y juego, no suponiendo que una generación comparte íntegramente flags y offsets.**

---

## 4. Historia del proyecto y decisiones ya tomadas

### V1–V5: primeras guías y diagnósticos

- Objetivo inicial: completar SoulSilver después de la Liga y las medallas de Kanto; evolucionó a guía 100 % de varias ediciones.
- Se introdujeron capítulos, subpasos, panel de progreso, test, cronología, tarjetas y análisis inicial de `.sav` y `main`.
- Se observó que un registro en Pokédex era una **señal parcial**, no una prueba del encuentro original.
- Se insistió en usar PKHeX y el registro de eventos para conocer enfrentamientos, Liga repetida, legendarios, desbloqueos y flags persistentes.

### V6: flujo personalizado

- Tras importar una partida, botón «Continuar», test contextual de dudas, «Mis siguientes pasos», filtros y evidencia por misión.
- Se probaron cinco guardados en una iteración previa, pero ese resultado no significa que se haya verificado cada campo interno.
- Se detectó mala experiencia: abrir save y no saber por dónde continuar, preguntas ya respondidas por el propio save, misiones aparentemente completas sin prueba suficiente.

### V7: caso de regresión «Orbe Rojo»

- SoulSilver: tras derrotar a Rojo, **también hay que recoger un inicial de Kanto del Profesor Oak** antes de que el Sr. Pokémon de Ruta 30 entregue el Orbe Rojo.
- La guía anterior enviaba a Ruta 30 antes de explicar el regalo previo de Oak. Se corrigió con prerrequisito explícito y solución de problemas.
- Se separaron el inicial de Kanto (Oak) y el de Hoenn (Máximo Peñas); son regalos distintos.
- Se introdujeron condiciones previas por misión, diferenciando señales automáticas y confirmaciones manuales.

### V8 / V8.1 / V8.2 / V8.3

- Árbol de prerrequisitos y estados de misión, mejoras de test, expedientes JSON, controles de iPad y PWA.
- Fallo iPad: el HTML local se mostraba en vista previa sin ejecutar JS. Se pasó a GitHub Pages + PWA instalable (Safari «Añadir a pantalla de inicio») con modo offline tras primera carga.
- GitHub: problema inicial de repo mal escrito, conexión sin permisos de escritura y dos workflows de publicación en conflicto. Se resolvió repo y despliegue por rama.
- **V8.3**: defecto grave: el `.sav` mostraba a Zapdos, Moltres y otras especies capturadas, pero la guía seguía sugiriendo capturarlas. Se añadieron mapeos de especies a misiones y la distinción captura / ruta original. Esta corrección es **parcial**, NO cubre todos los objetivos/ediciones.

### V9 / V9.1 / V9.2 y capa «Maestría 100 %»

- Catálogo de 39 ediciones de generaciones I–IX, con 525 misiones / 1.146 pasos actuales, expedientes por edición y progreso manual.
- Corrección de rutas concretas, especialmente Negro 2 / Blanco 2, que inicialmente mezclaban recorrido de los originales.
- El Atlas puede importar **diagnósticos JSON** del lector clásico para acreditar captura/visto y evitar recomendaciones redundantes. **No interpreta un `.sav` binario directamente**.
- Se añadieron listas de maestría (`masterChecks`) y otras métricas, pero no hay justificación para denominar completismo absoluto a todas sus casillas.
- La guía clásica sigue en `index.html`; el Atlas en `atlas.html`. **Dos aplicaciones parcialmente divergentes**, con dos sistemas de persistencia y bases de contenido.

### Prioridad técnica que se ha descubierto durante las conversaciones

**La lógica de un juego se guía por su estado persistente.** Por ello, el mejor camino no es multiplicar cuestionarios, sino recuperar un mapa semántico de todo lo que guarda realmente cada edición, enlazarlo a sus misiones y usar un test mínimo únicamente donde el juego no conserva evidencia.

---

## 5. Arquitectura actual: análisis concreto del código

### 5.1 `index.html` — lector y guía clásica

- PWA monolítica con CSS/JS y datos de capítulos incrustados. No hay separación real por módulos, paquetes ni test runner en el repositorio publicado.
- JSON de guías en `<script id="data" type="application/json">` (internamente declara versión `7.0-dependency-safe`).
- Objeto público en cliente: `window.PokemonSaveReader` con `parse`, `missingLabel`, `names`, `version:'5.1'`.
- Parsers definidos: `parseHGSS`, `parseB2W2`, `parseXY`, `parseORAS`, `parseUSUM`, coordinados desde `parseArray`.
- `parseHGSS`: considera copias de guardado DS, medallas Johto/Kanto, Pokédex, Hall de la Fama y otros resúmenes.
- `parseB2W2`: discrimina las variantes de Negro 2 / Blanco 2 mediante valor interno; revisa medallas, Pokédex, Hall de la Fama y cierta información de medallas.
- `parseXY`: acepta la versión de Pokémon Y implementada; **no afirmar soporte completo de X**.
- `parseORAS`: implementación para **Rubí Omega**, no asumir Zafiro Alfa sin verificar.
- `parseUSUM`: implementación para **Ultrasol**, no asumir Ultraluna sin verificar.
- `parseArray`: decide principalmente por longitud, versión y firma `BEEF` en determinados `main` 3DS. Rechaza formatos no reconocidos y estados rápidos. Este lector **no es PKHeX.Core**.
- `v6Snap`, `v6Prioritized`, `v8CurrentEvidence`, `v8Status`, `v8FirstActionable`, `v8SwitchProfile`: interpretan diagnósticos, prerequisitos y selección de siguiente objetivo.
- Panel V8.3 de capturas de legendarios mapeados; el mapeo es una lista manual incompleta.
- **Deuda crítica comprobada por inspección:** existen definiciones duplicadas de `readSaveFiles`, `setTask`, `v6SituationalQuestions`, `quizPage`; el último símbolo homónimo puede prevalecer. Refactorizar antes de seguir añadiendo reglas para evitar cambios aparentes que la versión activa ignora.
- Clave de almacenamiento local del lector: **`archivo-pokemon-v2`**. Existe una marca de migración/auditoría avanzada; conserva compatibilidad.
- El repositorio actual tiene `FIVE_SAVE_AUDITS={}`: no hay que incluir jamás snapshots reales de usuarios incrustados en el HTML público.

### 5.2 `atlas.html` — nueve generaciones

- Catálogo `const CATALOG={...}` incrustado. `version: '9.2-catalogue-audit'`.
- 39 ediciones, 525 misiones, 1.146 pasos. De esas misiones, 459 son de nivel introductorio.
- Funciones de navegación/catálogo, cronología y expedientes de completismo; almacenamiento de marcas `checks`, `goalChecks`, `masterChecks` y evidencia importada `evidence`.
- Clave local: **`pokemon-atlas9-progress-v1`**.
- El Atlas importa un diagnóstico JSON exportado por el lector; la importación no debe confundirse con leer `.sav` o `main`.
- Hay riesgos de divergencia entre una misión del Atlas y la correspondiente de la guía clásica; cada edición usa IDs y capas diferentes.
- Un elemento `masterChecks` o una misión `verified='referencia'` no garantiza prueba automatizada de finalización.

### 5.3 `sw.js` y despliegue

- El service worker precachea raíz, `index.html`, `manifest.webmanifest`, icono y `atlas.html`; actualiza con nombre de caché versionado.
- Atención a páginas que se quedan antiguas en iPad por caché: probar actualización *online → nueva versión → offline*.
- GitHub Pages es estático. Cualquier motor en C# necesita funcionar como **herramienta local/CLI**, en **WASM** adecuado, o en backend separado sujeto a privacidad y coste. No fingir que GitHub Pages ejecuta .NET en servidor.
- El progreso se almacena actualmente **por dispositivo/navegador**. No hay sincronización automática segura entre iPad, Android y PC; usar JSON de exportación/importación y no prometer sincronización.

### 5.4 Refactor de arquitectura propuesto (no construido)

```text
pokemon-100-gu-a/
  AGENTS.md                    # Este contrato de trabajo
  README.md
  package.json                 # Build, lint, test, QA; crear sin romper HTML publicado
  public/
    index.html                 # Entrada unificada o redirección de compatibilidad
    atlas.html                 # Ruta antigua de compatibilidad
    manifest.webmanifest
    sw.js
  src/
    app/                       # Navegación, router, estado, pantallas
    catalog/                   # Definiciones de juegos, capítulos, pasos, fuentes
    engine/
      evidence.ts              # Hechos tipados + procedencia
      objectives.ts            # Evaluador de requisitos y objetivos
      routePlanner.ts          # Siguiente objetivo y orden topológico
      chronology.ts            # Cronología observada vs canónica
      certification.ts         # Requisitos oficiales por juego
    saves/
      adapters/                # Una implementación por familia/versión de save
      schemas/                 # Contrato JSON independiente de PKHeX
      importExport.ts          # Validación, compatibilidad, hashing, backups
    ui/                        # Componentes responsive y accesibles
  pkhex-extractor/             # Herramienta C# .NET de SOLO LECTURA
  research/
    flags/                     # Índices documentados y pruebas antes/después
    scripts/                   # Referencias a scripts de juego / decompilaciones
    events/                    # Catálogos de distribución y requisitos
  fixtures/                    # Sintéticos y anonimización; .gitignore para reales
  tests/
    unit/
    save-contract/
    e2e/
    visual/
  docs/
    coverage-matrix.md
    save-format-matrix.md
    evidence-rules.md
    migration-plan.md
    user-guide.md
```

La estructura anterior es una **propuesta de refactor**, no la estructura existente de GitHub. Mantener `index.html`, `atlas.html` y las claves locales como rutas de compatibilidad hasta migrar con seguridad.

---

## 6. Investigación PKHeX: qué se ha averiguado de verdad

### 6.1 PKHeX.Core existe y tiene el potencial necesario

PKHeX es un editor open source en C# y su componente `PKHeX.Core` contiene modelos y clases para leer los formatos principales de generaciones I–IX y algunas entregas complementarias. La clase `SaveUtil` discrimina entre `SAV1`, `SAV2`, `SAV3RS`, `SAV3E`, `SAV3FRLG`, `SAV4DP`, `SAV4Pt`, `SAV4HGSS`, `SAV5BW`, `SAV5B2W2`, `SAV6XY`, `SAV6AO`, `SAV7SM`, `SAV7USUM`, `SAV7b`, `SAV8SWSH`, `SAV8BS`, `SAV8LA`, `SAV9SV`, `SAV9ZA`, etc. **Esto acredita capacidad de detección/lectura de formato por clases, no que exista ya un mapa narrativo de los 39 juegos**.

Fuentes principales:
- [`PKHeX/PKHeX.Core/Saves/Util/SaveUtil.cs`](https://github.com/kwsch/PKHeX/blob/master/PKHeX.Core/Saves/Util/SaveUtil.cs)
- [`SaveFile.cs`](https://github.com/kwsch/PKHeX/blob/master/PKHeX.Core/Saves/SaveFile.cs)
- [Repositorio PKHeX](https://github.com/kwsch/PKHeX)

**Licencia:** PKHeX se distribuye bajo GPL-3.0; revisar implicaciones de integrar, modificar o distribuir PKHeX.Core y código derivado. Ver [LICENSE](https://github.com/kwsch/PKHeX/blob/master/LICENSE). No copiar código masivo sin cumplir condiciones. El proyecto actual de WinForms documenta .NET 10; comprobar dependencias exactas de la revisión elegida antes de diseñar el extractor.

### 6.2 Ejemplo técnico de gran valor: SoulSilver

El código de `SAV4` tiene **2.912 event flags** (`EventFlagCount=0xB60`) además de múltiples **event work/variables**. Expone `GetEventFlag(int)` y `GetWork(int)`, junto a sus setters de edición; para esta guía **solo interesa leer**. `SAV4HGSS` define offsets propios, incluye datos adicionales Hall of Fame y estructuras que el parser JS todavía no explota íntegramente.

- [`SAV4.cs`](https://github.com/kwsch/PKHeX/blob/master/PKHeX.Core/Saves/SAV4.cs)
- [`SAV4HGSS.cs`](https://github.com/kwsch/PKHeX/blob/master/PKHeX.Core/Saves/SAV4HGSS.cs)
- [Decompilación `pret/pokeheartgold`](https://github.com/pret/pokeheartgold)

**Consecuencia:** existe una fuente real para investigar muchas misiones ocultas y registros de combates; pero **leer flag 1632 = 1 no permite interpretar automáticamente su significado** sin identificar el script que lo consulta/establece.

### 6.3 Gen III demuestra lo valioso que es cruzar el lector con los scripts

La decompilación de Esmeralda incluye `include/constants/flags.h`, con flags nombrados de regalos, MT, legendarios, combates contra entrenadores, puertas de Regis, entradas de eventos y estados de la historia. Ejemplos de significado documentado: bandera de puertas Regis abiertas, recibido HM Surf, rivales vencidos, enfrentamiento con Deoxys y recompensas del Frente Batalla.

- [`pret/pokeemerald/include/constants/flags.h`](https://github.com/pret/pokeemerald/blob/master/include/constants/flags.h)
- [`SAV3FRLG.cs`](https://github.com/kwsch/PKHeX/blob/master/PKHeX.Core/Saves/SAV3FRLG.cs)

**NO copiar el índice de Esmeralda y asumir que vale en FRLG, Rubí o Zafiro.** Mismo motor ≠ mismo listado/semántica.

### 6.4 Se ha localizado una técnica oficial de investigación en Project Pokémon

Project Pokémon documenta el **Event Flags → Research** de PKHeX para comparar dos guardados: `Load Old` (justo antes del evento), `Load New` (justo después), extraer flags activadas/desactivadas y constantes modificadas. Es el método idóneo para investigar flags sin adivinar.

- [Finding Event Flags and Event Constants — tutorial](https://projectpokemon.org/home/tutorials/save-editing/using-pkhex/finding-event-flags-and-event-constants-r87/)
- [Hilo original de Project Pokémon](https://projectpokemon.org/home/forums/topic/48140-using-pkhex-finding-event-flags-and-event-constants/)
- [`SAV_EventFlags.Designer.cs`](https://github.com/kwsch/PKHeX/blob/master/PKHeX.WinForms/Subforms/Save%20Editors/SAV_EventFlags.Designer.cs)

**Protocolo correcto:** snapshot antes → una sola acción del juego → guardar → snapshot después → comparar event flags, work/constants, trainer flags, bolsas, Pokédex y bloques especiales → atribuir significado → reproducir en dos partidas/ediciones cuando sea posible. Revisar falsos cambios causados por RNG, relojes, contadores, guardado alterno y pasos del personaje.

### 6.5 Otros registros por investigar y documentar

- Entrenador: datos de identidad, versión, idioma, equipo, cajas, inventario y objetos clave.
- Historia: medallas, desbloqueos de mapa, variables de escena, participantes relevantes, enfrentamientos/revancha, Hall of Fame y contadores de Liga.
- Encuentros: estados de legendarios, rematches, Pokémon errantes, capturas fijas y condiciones de reaparición.
- Pokédex: vistos, capturados, formas y premios de regional/Nacional, no solo suma total.
- Eventos: Mystery Gift/Wonder Cards, gift received, flags de NPC, distribución y desencadenantes históricos.
- Instalaciones: rachas, símbolos, PWT, Pokéstar, medallero de BN2, Battle Tree, Battle Frontier, Pokéathlon, sellos, concursos, cintas, bases secretas, Pokévisor, pegatinas, minijuegos y DLC.
- Inventario: objeto actualmente presente **versus** registro histórico de que fue obtenido/gastado.
- Ediciones modernas: bloques con IDs hashed, flags/eventos/counters específicos y, cuando corresponda, datos fuera del save o de servicios cerrados.

PKHeX ya tiene herramientas para medallas de BN2, Pokéathlon HGSS y distintos editores según versión (ver [releases](https://github.com/kwsch/PKHeX/releases)). **Examinar cómo los implementa y separar lectura de modificación.**

### 6.6 Limitación no negociable del archivo SAV

La afirmación «el `.sav` sabe todo» es **verdadera respecto al estado que el juego necesita cargar**, pero no implica una base de datos histórica completa:

- Un bit puede representar «encuentro ya resuelto», «estoy en esta fase», «NPC está oculto», «volver a permitir combate» o ser temporal.
- Un enemigo derrotado puede tener bandera que luego se limpia para permitir revancha.
- Algunos registros históricos se sobrescriben o no guardan fecha.
- Un Pokémon puede estar capturado en Pokédex porque fue intercambiado, transferido o importado; eso no demuestra el evento propio del cartucho.
- Puede haberse obtenido un objeto clave y entregado/consumido; no estará en la bolsa.
- Parte de los datos de red, eventos externos o DLC no están íntegramente dentro de un único guardado.
- Un guardado editado con PKHeX puede estar internamente «completo» sin que los acontecimientos hayan ocurrido de forma natural.

**Regla de la aplicación:** devolver `unknown` cuando no haya evidencia suficiente y, si hay evidencia parcial, etiquetarla precisamente. Nunca usar una deducción «seguro que lo hizo porque tiene este otro Pokémon» como confirmación certificada.

---

## 7. Ficheros del usuario y banco de pruebas

**No incluirlos en GitHub público.** En la conversación actual se han recibido/identificado ejemplos reales de guardados; se pueden usar localmente para pruebas con consentimiento, sin alterarlos:

| Archivo disponible en esta conversación | Tamaño | Atribución/precaución |
| --- | ---: | --- |
| Guardado SoulSilver español (`.sav`) | **524.288 bytes** (`0x80000`) | Caso principal; NDS con dos sectores/copies, verificar slot activo. |
| Guardado Negro 2 (`.sav`) | **524.288 bytes** (`0x80000`) | Comprobar lectura de B2W2, medallero, PWT y eventos. |
| `main` | **483.328 bytes** (`0x76000`) | Compatible en tamaño con cierta familia 3DS; **detectar internamente el juego**, no asignar edición solo por nombre. |

En conversaciones anteriores se utilizaron además diagnósticos y `main` separados para Y, Rubí Omega y Ultrasol; **no asumir que todos los originales están presentes o montados en cada nueva sesión**. Codex debe comprobar su disponibilidad y no inventar rutas `sandbox:` históricas.

### 7.1 Hechos históricos reportados para SoulSilver (deben revalidarse con el save más reciente)

- Liga superada; 16 medallas de Johto/Kanto.
- Rojo derrotado según declaración expresa del jugador, **no deducir automáticamente** de que se tenga acceso a Monte Plateado.
- En el último momento de la conversación sobre el Orbe Rojo, el inicial de Kanto de Oak seguía pendiente.
- En un test anterior, la Pokédex del `.sav` registraba capturados **Lugia, Suicune, Raikou, Entei, Articuno, Zapdos, Moltres y Mewtwo**; Latios estaba visto pero no capturado.
- **Son datos de un momento concreto:** el archivo actual puede haber cambiado. Usar el SHA/identificador de snapshot y la fecha del guardado, no repetir automáticamente esas conclusiones en todos los perfiles.
- Problema de regresión histórico: la guía recomendaba capturar Zapdos/Moltres pese a aparecer capturados, y enviaba al Sr. Pokémon de Ruta 30 antes de recoger el inicial de Kanto de Oak.

### 7.2 Pruebas obligatorias con estos archivos

1. Leer archivo **sin modificarlo**; hashes SHA-256 iguales antes/después.
2. Verificar edición correcta, entrenador/ID, slot activo, checksum, medallas, Liga, Pokédex, forma de archivo, flags y registros disponibles.
3. Comparar cada dato extractado por nuestro parser con la misma partida abierta en **PKHeX** de versión fija.
4. Reproducir errores históricos de SoulSilver: Zapdos y Moltres reconocidos; Latios visto/no capturado; regalos Oak/Orbe Rojo bloqueados si procede.
5. Cargar dos partidas distintas de la misma edición y verificar que las respuestas/manualChecks no se transfieren entre perfiles.
6. Importar varios guardados sucesivos, evaluar diff de hechos y preservar historial previo.
7. Corruptos/recortados/estado rápido/ROM/guardados cifrados: rechazar con error legible, sin inferir progreso desde bytes arbitrarios.
8. Ejecutar pruebas equivalentes para Negro 2 y las tres ediciones 3DS **solo cuando sus fixtures auténticos estén disponibles**.

---

## 8. Contrato de evidencias (nuevo motor que debe construir Codex)

Unificar los hechos del parser PKHeX, mapeos de scripts y las confirmaciones manuales. Los campos a continuación son propuesta de contrato; los offsets/keys indicados como ejemplo **no son valores investigados**.

### 8.1 Contrato JSON de exportación del lector (propuesto)

```json
{
  "schemaVersion": "1.0.0",
  "extractor": {
    "name": "pokemon-save-audit",
    "engine": "PKHeX.Core",
    "engineCommit": "<commit-fijado>",
    "readOnly": true
  },
  "save": {
    "gameId": "SOULSILVER",
    "generation": 4,
    "format": "NDS_SAV",
    "region": "EUR",
    "language": "es",
    "revision": "<si-se-conoce>",
    "slot": "active",
    "checksumsValid": true,
    "sha256": "<calculado-localmente>",
    "profileId": "<huella-derivada-no-reversible>",
    "readAt": "2026-11-09T00:00:00+01:00"
  },
  "facts": [
    {
      "id": "story.badges.kanto.count",
      "value": 8,
      "status": "verified",
      "source": {
        "type": "save_field",
        "path": "SAV4HGSS/...",
        "gameRevision": "HGSS"
      },
      "semantics": "Número actual de medallas de Kanto",
      "confidence": "high",
      "historical": false
    },
    {
      "id": "legendary.zapdos.pokedexCaught",
      "value": true,
      "status": "verified",
      "source": {"type": "pokedex_caught", "species": 145},
      "semantics": "Especie registrada como capturada, NO lugar de captura",
      "confidence": "high",
      "historical": false
    }
  ],
  "unparsed": ["<secciones aún no mapeadas>"],
  "warnings": []
}
```

### 8.2 Cinco tipos de evidencia

| Tipo | Ejemplo | Uso |
| --- | --- | --- |
| `direct` | flag de evento documentada, medallas, récord guardado | Acredita exactamente el hecho nombrado. |
| `derived` | inferir acceso por 16 medallas más objeto clave | Sirve para recomendación, **no** automáticamente como histórico certificado. |
| `observed_delta` | diff entre saves antes/después de un evento | Ayuda a descubrir transiciones y cronología observada. |
| `manual` | jugador confirma que habló con Oak | Solo vinculado a un perfil y con procedencia explícita. |
| `unavailable` / `unknown` | el juego no guarda el dato o no hay mapeo fiable | Mantener tarea visible, advertencia; pregunta opcional y precisa. |

### 8.3 Estados de objetivo (no confundirlos con estados de evidencia)

```text
NOT_STARTED
AVAILABLE
IN_PROGRESS
BLOCKED_BY_PREREQUISITE
COMPLETED_VERIFIED
COMPLETED_MANUAL
PARTIAL_EVIDENCE
UNKNOWN
UNAVAILABLE_THIS_VERSION
UNAVAILABLE_HISTORICAL_EVENT
OPTIONAL_NOT_PURCHASED_DLC
```

No mezclar `COMPLETED_MANUAL` con `COMPLETED_VERIFIED`. Si la Pokédex confirma Zapdos pero no la bandera del encuentro original: `PARTIAL_EVIDENCE` en el objetivo de captura original, y `COMPLETED_VERIFIED` únicamente en el hecho «Zapdos figura capturado».

### 8.4 Definición de objetivo (propuesta)

```yaml
id: hgss.johto_kanto.red_orb
edition: SOULSILVER
chapter: hgss.postgame.legendarios
phase: POSTGAME
order: 420
title: Conseguir el Orbe Rojo
prerequisites:
  all:
    - ref: hgss.badges.total_16
    - ref: hgss.mt_silver.red_defeated
    - ref: hgss.oak.kanto_starter_received
    - ref: hgss.national_dex_unlocked
verification:
  all:
    - fact: inventory.key_item.red_orb_present
      status: verified
  alternatives:
    - fact: hgss.mr_pokemon.red_orb_received_flag
      status: verified
      researchStatus: PENDING_MAPPING
steps:
  - id: check_prerequisites
    text: Comprueba las 16 medallas, Rojo, Pokédex Nacional y regalo del inicial de Kanto de Oak.
  - id: mr_pokemon
    text: Ve a la casa del Sr. Pokémon en Ruta 30 y habla con él.
  - id: item
    text: Comprueba que el Orbe Rojo está en objetos clave.
troubleshooting:
  - condition: flag_missing
    advice: Comprueba el regalo del inicial de Oak antes de volver a Ruta 30.
sources:
  - https://bulbapedia.bulbagarden.net/wiki/Red_Orb
mappingStatus: PARTIALLY_DOCUMENTED
```

**El identificador `hgss.mr_pokemon.red_orb_received_flag` del ejemplo NO tiene todavía un número de flag validado.** Codex debe investigarlo antes de usarlo como evidencia automática.

---

## 9. Cómo reconstruir la ruta correcta desde el guardado

### 9.1 No es un simple índice lineal

Crear un **DAG de misiones** con relaciones `requires`, `unlocks`, `excludes`, `variantExclusive`, `requiresEventCard`, `repeatable`, `requiresExternalSave`, `requiresDLC`, `requiresNetwork`, `timeWindow`. El orden se obtiene mediante una **ordenación topológica estable**, con orden editorial por defecto, condiciones de versión y ventanas de captura/objetos perdibles.

La historia principal puede ser lineal, pero Pokémon tiene elecciones, áreas explorables en paralelo, múltiples regiones, encuentros errantes y contenido dependiente de otros juegos, por lo que nunca se debe forzar un único orden cuando existen rutas legales alternativas.

### 9.2 Planificador recomendado

1. Leer hechos `direct` y comprobaciones `manual` del perfil actual.
2. Calcular cierre de prerrequisitos por edición; detectar inconsistencias sin «arreglar» datos.
3. Separar misiones completadas, disponibles, pendientes de verificar, bloqueadas, exclusivas y eventos imposibles hoy.
4. Ordenar por `fase de historia`, `desbloqueos obligatorios`, `riesgo de perder objeto/encuentro`, `ventana temporal`, `dependencia de intercambio`, proximidad geográfica **solo como preferencia secundaria**.
5. Para la misión sugerida devolver también `blockingFacts`, `supportingFacts`, `unverifiedFacts`, `whyNext` y `steps`.
6. Si la misión es «atrapar Zapdos» y hay `pokedexCaught(145)`, no sugerir volver a atraparlo; en su lugar ofrecer **«comprobar la procedencia del encuentro original»** si esa dimensión es necesaria para completismo histórico.
7. Si un requisito no está probado, mostrar instrucciones para verificarlo. **No enviar al jugador a un NPC que no va a darle el objeto.**

### 9.3 Cronología de actividad del jugador

El sistema debe guardar snapshots **locales y versionados**, así como diff semántico:

```text
snapshot_001: 8 medallas Johto, Zapdos no visto
snapshot_002: 9 medallas totales, Zapdos visto
snapshot_003: Zapdos capturado
```

Esto documenta el orden **observado entre las fechas de importación**, no la fecha exacta del encuentro, salvo que el juego la guarde. Mostrar «Detectado entre guardados A y B», nunca inventar hora de captura.

---

## 10. Requisitos de calidad de las guías: qué debe tener CADA misión

Cada objetivo debería documentar:

1. Identificador estable global + edición + generación + fase + capítulo + número canónico.
2. Título concreto, clasificación y resultado esperado; no títulos genéricos tipo «Explorar postgame» para un objetivo complejo.
3. Prerrequisitos **todos**, en cadena, con enlaces a misiones anteriores y diagnóstico automático.
4. Localización exacta (región, ciudad/ruta, entrada, piso/planta, NPC, lugar del objeto).
5. Instrucciones detalladas en varios subpasos, con ramas según versión, solución de puzles y ejemplos reproducibles.
6. Comprobación del estado anterior y posterior en el guardado.
7. Estado de perdibilidad, reaparición y si una decisión es irreversible.
8. Variante de edición, región del cartucho, idioma y, cuando aplique, época/evento/DLC.
9. Diferenciar «registrado visto», «capturado», «encuentro original», «premio obtenido», «jefe vencido» y «contenido desbloqueado».
10. Recompensa/objeto clave y cómo comprobarlo en la Bolsa o registro pertinente.
11. Solución de problemas: «NPC no lo entrega», «puerta no se abre», «evento no aparece», «Pokémon errante sin ubicación», etc.
12. Fuentes verificables por URL, fecha y versión investigada. Marcar contradicciones entre fuentes y resolver antes de publicar.
13. Flags/variables utilizadas y nivel de confianza; `TODO` cuando no exista investigación.
14. Casilla por **paso**, no solo «marcar capítulo completo», y vínculo de la marca a perfil/guardado.
15. Relevancia para las estrellas/sellos de reconocimiento oficial o carácter extra.

**Auditoría sistemática:** no dar por terminada una misión si faltan las condiciones para que un jugador nuevo la reproduzca sin consultar Internet.

---

## 11. Casos de aceptación específicos y errores que NO deben repetirse

### SoulSilver — Orbe Rojo

**Antecedentes:** tras la Liga, 16 medallas y Rojo, el Sr. Pokémon de Ruta 30 no daba el Orbe Rojo. Se descubrió que faltaba **recibir un inicial de Kanto del Profesor Oak en Pueblo Paleta**.

- La misión de Groudon/Orbe Rojo debe verificar las cuatro condiciones de la V7: 16 medallas, Pokédex Nacional, Rojo derrotado y regalo del inicial de Kanto de Oak.
- Distinción adicional: regalo de Hoenn de Máximo ≠ inicial de Kanto de Oak.
- La Pokédex de un Bulbasaur adquirido por intercambio **no demuestra** que Oak te haya regalado uno.
- No confundir HGSS: **SoulSilver → Orbe Rojo/Groudon**; **HeartGold → Orbe Azul/Kyogre**.
- Para Rayquaza, requerir Groudon de Torre Oculta SoulSilver y Kyogre de Torre Oculta HeartGold con el reconocimiento adecuado.
- Si no se puede leer la bandera de Oak, mostrar exactamente «regalo no acreditado», **no** «regalo no obtenido» salvo prueba directa.

### SoulSilver — Zapdos y Moltres

- El importador detecta estos Pokémon en el `.sav` y debe mostrarlos como capturados, no recomendarlos como «pendientes de atrapar».
- La ruta del encuentro original (Central Energía, Monte Plateado) queda «sin confirmar» hasta comprobar flag/ubicación/registro apropiado.
- Distinguir avistados de capturados, y duplicados actuales en caja de registros de Pokédex.

### SoulSilver — Suicune y Latios

- Suicune tiene cadena de encuentros con Eusine y llega a Ruta 25 si se cumple la secuencia; no basta con explicar «ve a Ruta 25».
- Latios/Latias dependen de eventos concretos de HGSS, de reactivación de Central de Energía y desencadenantes. Separar roaming, visto, capturado y eventos adicionales con Piedra Enigma.
- No mezclar rutas o requisitos entre SoulSilver, HeartGold y Cristal.

### SoulSilver — Ruinas Alfa y tarjeta máxima

- Cuatro puzzles, cuatro cámaras secretas, objetos/acciones (Cuerda Huida, Destello, Ho-Oh en equipo, Piedra Agua) en su sala correcta, Unown/forms, recompensas.
- Tarjeta de entrenador con sus criterios **específicos**; no aprobar tarjeta máxima por «100 % de tareas marcadas».
- Pokéathlon, Pokéwalker, Battle Frontier, hojas brillantes y Hall of Fame requieren tratarse por sus propios registros.

### Negro 2 / Blanco 2

- **No usar el itinerario de Negro/Blanco original.** Introducción Ciudad Engobe → Hormigón → Porcelana → Mayólica → Fayenza → Loza → Caolín → Pueblo Arenisca y clímax Plasma/Liga, con bifurcaciones y nombres correctos.
- Medallero (255), Pokéstar, PWT, árboles del Nexo, llaves exclusivas, recuerdos, reservas y legendarios requieren estados separados.
- El parser NDS debe distinguir versiones y slots, y mostrar cuándo ciertos requisitos dependen de funciones históricas de comunicación.

### X/Y, ORAS y USUM

- No suponer soporte para X, Zafiro Alfa o Ultraluna porque exista parser para Y, Rubí Omega o Ultrasol.
- XY: detective Handsome, Megapiedras horarias, Mansión Batalla, recompensas y regional.
- ORAS: Delta/Tristana, Rayquaza, Deoxys, Regis, ultravuelo y concursos; objeto/regalo no igual a su evento original.
- USUM: Episodio Rainbow Rocket, ultraumbrales, 100 pegatinas, 15 sellos y Battle Tree. Cada sello debe tener su criterio propio.

### Generaciones VIII–IX

- DLC optativos y comprados, versiones exclusivas, llaves de contenido y limitaciones de servicios en línea.
- Legends Arceus: Pokédex necesaria para Arceus ≠ nivel 10 ≠ investigación «perfecta»; separar correctamente.
- Escarlata/Púrpura: tres historias, Área Cero, dos expansiones y epílogo, Pokédex por zona y eventos temporales.
- Legends Z-A: estructura/eventos propios, no convertir a medallas de ocho gimnasios; tratar Mega Dimension como DLC.

---

## 12. Estrategia recomendada para integrar PKHeX.Core

### Ruta A — **Prioritaria:** extractor local C# de solo lectura → JSON semántico

Crear `pkhex-extractor/` usando una revisión **fijada** de PKHeX.Core. El ejecutable C# procesa localmente un `.sav`/`main`, usa `SaveUtil` para reconocerlo, extrae campos disponibles y genera un JSON de hechos con **provenance**. Nunca invocar setters ni `Write()` del save original. Puede usarse desde escritorio y en pipelines de investigación; posteriormente conectarlo a la PWA mediante fichero JSON.

**Pros:** máxima reutilización del conocimiento upstream, comprobación fácil contra PKHeX, evita reescribir docenas de parsers binarios en JS. **Contras:** el usuario de iPad no ejecuta un CLI .NET local; es una fase de investigación/validación, no la UX final.

### Ruta B — PWA completa con parser portable

Evaluar compilar un núcleo C# para WebAssembly y llamarlo desde JS, **sin asumir que se puede portar todo PKHeX automáticamente** (dependencias, tamaño, AOT, compatibilidad, licencias). Alternativa: portar de forma controlada la capa de lectura **específica** que se necesite y validar cada byte con los resultados de PKHeX.Core.

**Criterio:** la lectura ocurre 100 % en dispositivo; sin subida de `.sav`. Cargar lazily el módulo de cada generación, mantener rendimiento y compatibilidad Safari/WebKit.

### Ruta C — backend remoto (solo opcional)

Sería técnicamente posible exponer una API, pero **no es la opción predeterminada**: implicaría subir saves privados. Requiere consentimiento explícito, seguridad, política de retención, cifrado, costes y aislamiento. No utilizar GitHub Pages para simular un backend .NET inexistente.

### Experimento mínimo recomendado

1. Crear un extractor local de **SoulSilver** con `SaveUtil` y `SAV4HGSS` que devuelva hechos básicos + flags/work crudos + rangos de estado/registro, solo lectura.
2. Comparar el JSON con el parser actual, con PKHeX UI y con 2–3 saves controlados de distintos puntos de historia.
3. Mapear **diez** tareas conflictivas (incluido Rojo, regalo de Oak, Orbe Rojo, Zapdos, Moltres, Suicune, Latios, Puerta Unown, Hall of Fame).
4. No ampliar a otra generación hasta que los diez mapeos tengan pruebas y pasen el motor de objetivos.
5. Aplicar luego misma estructura de investigación a Blanco/Negro 2 y generación III; expandir al resto mediante adaptadores.

---

## 13. Plan de investigación sistemática de flags por juego

### 13.1 Reglas para cada mapeo

Archivo YAML/JSON `research/flags/<game>.yaml`:

```yaml
id: hgss.oak.kanto_starter_received
edition: SOULSILVER
revision: EU_ES
meaning: Inicial de Kanto recibido de Oak
stateType: eventFlagOrWork
pkhexApi: SAV4HGSS.GetEventFlag / GetWork
flagNumber: null                 # NO INVENTAR
workIndex: null                 # NO INVENTAR
condition: null                 # rellenar tras investigación
sources:
  - source: pret/pokeheartgold
    symbol: PENDING
  - source: ProjectPokemon before-after research
    beforeFixture: private:oak-before
    afterFixture: private:oak-after
confidence: unverified
notes: Tener especie en Pokédex no es suficiente
```

Para un `confidence: verified`, exigir:
- Documento del script que consulta/escribe ese valor.
- Comparación antes/después que confirma transición.
- Al menos una prueba negativa y positiva (y, si procede, dos idiomas/regiones).
- Ausencia de contradicción tras reinicio, intercambio, revancha o siguiente fase.
- Ejemplo de expected JSON sin datos privados.

### 13.2 Fuentes por generación

- **I–II:** PKHeX `SAV1/SAV2`, pret/pokered y pret/pokecrystal; revisar GB/VC, idioma y estructuras compactadas.
- **III:** PKHeX SAV3, pret/pokeemerald, pret/pokefirered, etc. Rematches, RTC y bloques alternos.
- **IV:** PKHeX SAV4/SAV4HGSS/SAV4Pt, pret/pokeheartgold y scripts de DPPt. Blocks general/storage, Hall of Fame separado.
- **V:** PKHeX SAV5BW/SAV5B2W2, medallero, PWT, Pokéstar, Nexo, variantes por edición; decompilaciones/herramientas de script disponibles y comprobadas.
- **VI:** PKHeX SAV6XY/SAV6AO; eventos, Mega-Aro, concursos y Episode Delta.
- **VII:** PKHeX SAV7SM/SAV7USUM/SAV7b; sellos, pegatinas, Battle Tree, UB.
- **VIII:** PKHeX SAV8SWSH/SAV8BS/SAV8LA; DLC, especies, misiones, block keys y regalos.
- **IX:** PKHeX SAV9SV/SAV9ZA, hashed block keys y flags; vigilar revisiones de juego/expansión.

**Importante:** aunque existan decompilaciones públicas, su estado de completitud y coincidencia con versión/idioma concreta debe verificarse. No suponer que todo juego tiene una tabla con nombre para cada flag.

---

## 14. Prioridades y backlog con criterios de aceptación

### P0 — Protección del usuario y estabilización (BLOQUEANTE)

- [ ] Hacer backup/tag del `main`, HTML publicados y PWA antes de modificar.
- [ ] Añadir `AGENTS.md`, README técnico y matriz de cobertura con fecha/commit.
- [ ] Separar datos privados de assets públicos (`.gitignore`, fixtures sintéticos/anónimos).
- [ ] Congelar esquemas actuales de `localStorage`; añadir migraciones y pruebas de importación/exportación.
- [ ] Detectar y eliminar **funciones JS duplicadas** que se pisan; incluir test de símbolos duplicados.
- [ ] Añadir lint + tests automatizados (unitarios, contract tests y Playwright) en CI.
- [ ] Confirmar que `main` es el deployment source de Pages, comprobar iconos/caché y que no haya workflows conflictivos.

**Done:** publicación de prueba disponible, backup recuperable, tres tamaños responsive y cero pérdida de progreso.

### P1 — Extractor PKHeX.Core (ALTA PRIORIDAD)

- [ ] Fijar versión/commit y revisar GPL-3.0.
- [ ] Detectar formatos I–IX con `SaveUtil`, incluyendo cifrado, slots y checksums.
- [ ] Exportar JSON **solo lectura** con entrenador anonimizado, versión, firma, Dex, inventario, flags/work, registros, Hall of Fame y componentes adicionales conocidos.
- [ ] Producir fixtures sintéticos/anonimizados, además de fixtures privados en `.gitignore`.
- [ ] Comparar con el lector JS y la UI de PKHeX; crear diff determinista.
- [ ] Tests de saves corruptos, encabezados emulador y variantes de la misma familia.

**Done:** el extractor reconoce formatos soportados y coincide con PKHeX para los campos seleccionados; no cambia ni un byte del original.

### P2 — Semantic Flag Database y motor de evidencias (ALTA PRIORIDAD)

- [ ] Construir esquema de mapeos versionados por edición/región/revisión.
- [ ] Documentar `flagNumber`, `workIndex`, hash de bloque, trainer flags y condiciones de reaparición.
- [ ] Integrar `direct/derived/observed_delta/manual/unknown`.
- [ ] Validar conflictos (p. ej. flag falsa con especie en Pokédex).
- [ ] Etiquetar cada interpretación con fuente, confianza y ejemplo antes/después.
- [ ] Enriquecer SoulSilver con los diez casos críticos antes de ampliar.

**Done:** ningún hecho se marca como verificado sin una cadena de evidencia reproducible.

### P3 — Motor de rutas y objetivos (ALTA PRIORIDAD)

- [ ] Normalizar IDs de las 278 misiones clásicas y 525 del Atlas, evitando duplicados y perdiendo cero checks existentes.
- [ ] Grafo DAG por edición con prerrequisitos, exclusiones, DLC y eventos históricos.
- [ ] Resolución automática de «¿qué hago ahora?» y navegación a prerequisito incumplido.
- [ ] Nunca recomendar conseguir otra vez capturas presentes en Dex si el objetivo es simplemente conseguir la especie.
- [ ] Separar comprobación del encuentro original de captura de especie.
- [ ] Test opcional limitado a hechos realmente no recuperables.

**Done:** los casos Orbe Rojo, Zapdos/Moltres y otros 20 escenarios pasan las pruebas sin preguntas redundantes.

### P4 — Guías exhaustivas I–IX, **contenido realmente auditado**

- [ ] Completar cada una de las 459 misiones base (o desglosarlas en más submisiones) con ubicación, pasos, desbloqueos, recompensas, variantes y fuentes.
- [ ] Revisar las 28 «referencia», las 20 «revisión guiada» y las 18 «edition», pues una etiqueta no equivale a QA.
- [ ] Dar cobertura integral a los 39 juegos en orden canónico, con listas de pérdidas y eventos.
- [ ] Resolver puzzles (Unown, Regi, Ruinas Abisales, etc.) con instrucciones exactas de su edición.
- [ ] Documentar rivales, líderes, entrenadores únicos, rivales repetibles, combates legendarios y postgame.
- [ ] Inventariar objetos clave, regalos únicos, concursos, minijuegos, cintas, medallas, estrellas, sellos, DLC y servicios externos.

**Done por edición:** revisión humana/técnica de cada misión con evidencia documental; no capítulos plantilla sin pasos verificables.

### P5 — Certificación 100 % por juego

- [ ] Definir `CompletionProfile` por versión (oficial, extendida y legado).
- [ ] Requisitos oficiales de estrellas/sellos/tarjeta de entrenador correctamente versionados.
- [ ] Mostrar numerador **verificado**/pendiente/manual/unknown y cómo cerrar cada punto.
- [ ] Acreditar recompensas de torres/árboles/frentes/concursos/medallero a partir de registros pertinentes.
- [ ] No forzar «cinco estrellas» en juegos que usan otros sistemas.
- [ ] Generar expediente exportable de evidencias y fuentes, no «certificado legal» inventado.

**Done:** ningún 100 % oficial se alcanza sin los requisitos reales de esa edición, demostrados o señalados como manuales.

### P6 — Historial real y comparación de partidas

- [ ] Snapshot semántico versionado por perfil/save.
- [ ] Diff de flags, variables, dex, objetos clave, capturas y récords; eliminar campos ruidosos.
- [ ] Cronología observada con precisión explícita; no inventar día/hora del suceso.
- [ ] Comparar guardados antiguos y nuevos sin cruzar usuarios ni ediciones.
- [ ] Exportar y recuperar historial completo, incluyendo evidencias y decisiones manuales.

### P7 — Aplicación y UX/PWA

- [ ] Unificar Atlas + lector en una sola interfaz coherente; conservar rutas antiguas (`/`, `/atlas.html`).
- [ ] Panel inicial claro de «archivo reconocido → diagnóstico → continuar».
- [ ] Búsqueda/filtros por generación, juego, categoría, accesible, bloqueado, de origen histórico, repetible.
- [ ] Diseño adaptable a móvil/iPad Pro/PC, accesibilidad, tipografías, overflow y scroll correctos.
- [ ] Offline real con service worker y actualización controlada, sin versiones antiguas inamovibles.
- [ ] Pérdida de conexión, error de almacenamiento o lector incompatible con mensajes útiles.
- [ ] Opción de instalación PWA, copiar seguridad JSON y restaurar.

### P8 — PKHeX eventos/restauración opcional

- [ ] Guía de Wonder Cards/eventos de época, distribución, idioma y compatibilidad.
- [ ] Distinguir **legitimidad histórica**, compatibilidad técnica y recreación de eventos.
- [ ] Si se añaden herramientas de edición, que sean explícitas y fuera del flujo de certificación, con copia y validación.
- [ ] Revisar bloqueos legales, licencias y requisitos de comunicación.

### P9 — CI / auditoría de calidad global

- [ ] Pruebas de regresión por **todos** los formatos y revisiones declarados soportados.
- [ ] QA visual automatizado en 390, 768, 1024, 1366 y 1440+ px, móvil táctil, Safari/iPad cuando sea posible y Chromium.
- [ ] Auditar overflow, clipping, solapamiento, z-index, touch targets, densidad, contraste y coherencia de botones.
- [ ] Lint de reglas: IDs duplicados, prerequisitos inexistentes, ciclos, fuentes rotas, objetivo sin pasos, traducciones sin cobertura.
- [ ] Métrica de cobertura REAL: % de misiones con fuentes/flags y tests, no porcentaje de texto redactado.
- [ ] Auditoría de privacidad: ningún `.sav`/`main` ni IDs personales subidos a repo/logs/telemetría.
- [ ] Pipeline de publicación versionada con rollback automático ante fallo de pruebas.

---

## 15. Cómo organizar el trabajo en Codex

### Orden de ejecución recomendado

1. **Auditar el repositorio y generar baseline**: qué funciona, datos reales, fallos reproducibles y cobertura. No comenzar escribiendo 1.000 misiones nuevas.
2. **P0 completo** y backups públicos/privados separados.
3. **P1 + P2** para SoulSilver y Negro 2, comprobando en PKHeX los cambios de eventos y entrenadores.
4. **P3**: migrar la guía clásica/Atlas al motor de objetivos manteniendo compatibilidad de progreso.
5. Ampliar adaptadores por familia, con prioridad a los juegos de los que haya fixtures reales, y luego a las otras generaciones.
6. **P4–P5** mediante lotes por edición, cada lote con citas y tests; no una sola lista genérica para cada generación.
7. **P6–P9**, validación multiplataforma y entrega final.

### Ejemplo de PR / commit válido

```text
feat(save/hgss): map Red defeat, Oak Kanto gift and red orb prerequisites

- documentation: source script references, semantics and caveats
- parser: read-only facts; no write operations
- rules: objective DAG changes with stable IDs
- tests: positive/negative fixture scenarios and legacy progress migration
- UX: exact preflight and explanation when Oak gift missing
- QA: mobile/tablet/desktop screenshots and offline test
```

### Informe obligatorio tras cada ciclo

Codex debe dejar en el repositorio `docs/coverage-matrix.md` y en su respuesta:
- Rama, commit y ficheros modificados.
- Qué error se reprodujo, qué se cambió, pruebas pasadas/fallidas.
- Número de misiones **contrastadas** (no solo creadas), offsets de confianza alta, ediciones con lector probado.
- Cambios de esquema y migraciones aplicadas.
- Limitaciones y próxima tarea con mayor impacto.
- Enlace público solo si Pages realmente ha publicado y se ha probado.

**No declarar «cerrado», «completamente pulido», «definitivo» o «100 %» por falta de preguntas del usuario o por alcanzar una cifra de misiones.** Se cierra por criterios de aceptación reproducibles.

---

## 16. Matriz mínima de pruebas automatizadas

| Test | Entrada | Resultado esperado |
| --- | --- | --- |
| Identificación DS | SoulSilver `.sav` 512 KiB | `SOULSILVER`; slot coherente; medallas y dex coinciden con PKHeX. |
| Identificación BN2 | Negro 2 `.sav` 512 KiB | `BLACK2`; no confundido con Blanco 2. |
| Identificación 3DS | `main` descifrado 0x76000 | Reconocido por datos reales; sin asumir edición solo por tamaño. |
| `.sav` truncado | bytes incompletos | Error claro; sin captura inventada, sin cambio de estado. |
| Encuentro Pokémon | Zapdos capturado en Dex | «capturado», no «encuentro original verificado». |
| Visto sin capturar | Latios visto solamente | «visto», objetivo de captura pendiente. |
| Evento Oak | Rojo vencido pero inicial de Oak no recibido | No enviar a Ruta 30 como si estuviera resuelto. |
| Manual aislado | Dos saves con distinto perfil | Respuestas del primero no se aplican al segundo. |
| Test de dudas | Liga acreditada por save | No volver a preguntar por ella. |
| Diff | Dos saves tras una sola escena | Se registran exclusivamente cambios observados; timestamps no inventados. |
| Compatibilidad V8 | Export JSON anterior | Sin pérdida de `checked`, `notes`, `history`, `snapshots`, `quiz`, etc. |
| Compatibilidad V9 | Progreso `pokemon-atlas9-progress-v1` | Mantiene `checks`, `goalChecks`, `masterChecks`, `evidence`, etc. |
| Offline | Instalar PWA, cachear, desconectar | Abre y permite consultar rutas sin Internet; sin envío de guardados. |
| iPad | Safari/iPadOS; app desde icono | Misma funcionalidad esencial que Android, salvo limitaciones documentadas. |
| Rendimiento | Save grande, cientos de reglas | Sin congelación de UI; mostrar progreso y capacidad de cancelar. |
| Seguridad | Fixture privado y publicación GitHub | Ni nombre de archivo personal ni contenido del save en repo público. |

Agregar pruebas de **propiedad**: ningún cambio en el orden editorial debe modificar `evidence`, ningún `caught` implica `originalEncounterCompleted`, ningún dato `unknown` se convierte automáticamente a `verified`, y un diff de progreso no asigna hora del hecho si el juego no la guarda.

---

## 17. Riesgos principales, falsos positivos y preguntas abiertas

1. **Semántica de flags y resets:** el mayor trabajo no es leer bits, sino documentarlos. Los eventos repetibles y scripts de misión necesitan análisis.
2. **Cobertura por edición:** 39 guías, pero solo familias concretas con parser JS; no representar soporte binario completo para todas.
3. **Evidencia engañosa por Pokédex/inventario:** especies obtenidas de otra versión, objetos consumidos, regalos que no dejan huella separada.
4. **PKHeX y legitimidad:** un save editado puede ser estructuralmente válido y no demostrar recorrido natural. El sistema es auditor de **estado**, no de honestidad del jugador.
5. **Eventos históricos ya cerrados:** no son automáticamente alcanzables jugando offline; documentar distribución y si requiere simulación o hardware antiguo.
6. **Complejidad de DLC y juegos modernos:** diferencia por revisión, parche, región, red y contenido comprado; datos hash pueden no tener nombres públicos.
7. **Licencias y propiedad intelectual:** cumplir GPL de PKHeX y licencias de decompilaciones/datos. No publicar ROM, assets pirateados, textos de guías copiados en exceso ni material no autorizado.
8. **Sincronización entre dispositivos:** no existe automáticamente; si se diseña, debe ser opt-in, privada, tolerante a conflictos y reversible.
9. **Monolito JS:** dos HTML grandes con estado y lógica acoplados, con nombres de función duplicados; alto riesgo de regresión.
10. **PWA en iPad:** caché, descargas JSON, selector de ficheros, límites de almacenamiento y caducidad de recursos deben probarse en dispositivos reales.
11. **No incluir datos personales en GitHub Pages público.** El sitio es público; exportaciones locales quedan en dispositivo.
12. **La «guía total» no es simplemente una redacción:** requiere miles de verificaciones de scripts, mapas, rutas, eventos y recompensas. Dividir por entregas y dejar trazabilidad.

### Preguntas de investigación que Codex debe resolver con código, NO con conjeturas

- ¿Qué flags/trainer-state de HGSS persisten tras cada combate y cuáles se reinician al entrar en otra zona o al reabrir un reto?
- ¿Dónde se almacenan en HGSS los datos adicionales de Hall of Fame, premios de Pokéathlon y registros específicos de Pokéwalker? ¿Qué evidencia permite afirmar «Liga completada dos veces»?
- ¿Qué work/flag demuestra el **regalo de Oak** y qué indica el **Orbe Rojo entregado**, incluso cuando el objeto ya no está disponible?
- ¿Cuál es el evento correcto del roaming de Latios en SoulSilver, frente a Piedra Enigma? ¿Se puede diferenciar del registro en Pokédex?
- ¿Cómo identificar de forma fiable flags de entrenador vencido a partir del script, y cómo tratar dobles combates, revanchas y entrenadores opcionales?
- ¿Qué campos reales en B2W2 acreditan cada medalla y cada criterio de tarjeta, y cuáles dependen de comunicación/eventos cerrados?
- ¿Cuáles son los formatos/keys de evento válidos para los 39 títulos y sus distintas revisiones?
- ¿Cuántos casos de «misión completada» pueden probarse exclusivamente desde el snapshot y cuántos requerirán una verificación humana mínima?

---

## 18. Investigación prioritaria de fuentes externas

1. **PKHeX Core y API:** https://github.com/kwsch/PKHeX
2. **Autodetección de formatos:** https://github.com/kwsch/PKHeX/blob/master/PKHeX.Core/Saves/Util/SaveUtil.cs
3. **Modelo de guardado:** https://github.com/kwsch/PKHeX/blob/master/PKHeX.Core/Saves/SaveFile.cs
4. **Flags Gen I:** https://github.com/kwsch/PKHeX/blob/master/PKHeX.Core/Saves/SAV1.cs
5. **Flags y work Gen IV:** https://github.com/kwsch/PKHeX/blob/master/PKHeX.Core/Saves/SAV4.cs
6. **SoulSilver/HGSS y bloques extra:** https://github.com/kwsch/PKHeX/blob/master/PKHeX.Core/Saves/SAV4HGSS.cs
7. **Esmeralda y flags nombradas:** https://github.com/pret/pokeemerald/blob/master/include/constants/flags.h
8. **Decompilación HeartGold/SoulSilver:** https://github.com/pret/pokeheartgold
9. **PKHeX flag diff antes/después:** https://projectpokemon.org/home/tutorials/save-editing/using-pkhex/finding-event-flags-and-event-constants-r87/
10. **Hilo Project Pokémon:** https://projectpokemon.org/home/forums/topic/48140-using-pkhex-finding-event-flags-and-event-constants/
11. **Eventos originales preservados:** https://github.com/projectpokemon/EventsGallery
12. **Tarjetas y sus niveles:** https://bulbapedia.bulbagarden.net/wiki/Trainer_Card_level
13. **Juegos principales por generación:** https://bulbapedia.bulbagarden.net/wiki/Core_series
14. **Estado de versiones/releases PKHeX:** https://github.com/kwsch/PKHeX/releases
15. **Licencia PKHeX:** https://github.com/kwsch/PKHeX/blob/master/LICENSE

Para las rutas de juego, contrastar Bulbapedia, WikiDex, Serebii y scripts reales. **Una guía web general no es fuente suficiente de offsets internos.** Guardar la procedencia de cada cita en la definición de misión/regla; no confiar en enlaces sin comprobar.

---

## 19. Entregable final esperado — condición para «proyecto liquidado»

El proyecto solo puede considerarse verdaderamente terminado si:

- Se han catalogado y auditado las **39 ediciones** de las **9 generaciones** con rutas completas del inicio al postgame.
- Cada misión tiene pasos ejecutables, requisitos y desbloqueos, ediciones correctas, advertencias y fuentes.
- Existe lector de save **validado por edición** o un mensaje explícito de incompatibilidad; los datos internos publicados incluyen prueba reproducible frente a PKHeX.
- El motor de objetivos se basa en hechos con procedencia y confianza, sin falsos completados.
- Se puede explicar el progreso actual sin test cuando es comprobable; las preguntas restantes se limitan a datos no persistentes y son específicas.
- Están separados catálogo, cronología canónica, cronología observada, completismo oficial, extras y legado.
- Las tarjetas/sellos/logros se validan por reglas propias, no por un porcentaje genérico.
- La PWA es usable offline en iPad, Android y PC, no pierde progreso y puede importar/exportar sin invadir privacidad.
- Existen tests de regresión, compatibilidad y QA visual en CI, más una matriz pública de cobertura honesta.
- No quedan bloqueos críticos, pruebas fallidas sin justificar, flags «mágicas», offsets inventados ni saves personales publicados.

**Si un título no puede acreditar ciertos hechos porque el juego no los almacena, el producto final debe decir «no verificable automáticamente» con explicación. Eso NO es un fallo del lector: es una conclusión técnica correcta.**

---

## 20. Primera acción recomendada al arrancar Codex

1. `git status`, `git log -10 --oneline`, revisar `README.md`, `index.html`, `atlas.html`, `sw.js`, `manifest.webmanifest` y `.gitignore`.
2. Generar un informe de **cobertura real, tests, funciones duplicadas y compatibilidad de saves** sin cambiar el comportamiento.
3. Crear rama `feat/save-evidence-engine` desde `main` y backup/tag del estado actual.
4. Fijar PKHeX.Core en un commit/versión, confirmar licencia y montar extractor read-only sobre un fixture privado de SoulSilver.
5. Implementar **una sola vertical completa**: batalla con Rojo → regalo de inicial de Kanto → Orbe Rojo → Groudon, con mapeos de flags/work, pruebas y navegación contextual.
6. Añadir Zapdos/Moltres y reglas de procedencia de encuentro para resolver el falso pendiente de la Pokédex.
7. Ejecutar QA visual + técnico, migraciones de progreso y desplegar solo tras CI verde.
8. Volver a este `AGENTS.md`, actualizar la matriz de trabajo y pasar a la siguiente edición; repetir sin perder trazabilidad.

### Resumen final para el agente

**No hay que crear otro montón de fichas y llamarlo V10.** Hay que construir un **motor confiable de lectura de estado + interpretación de scripts + dependencias + evidencias + guía reproducible** para las nueve generaciones. El valor principal es que el usuario abre el `.sav`/`main` y la guía sabe exactamente **qué está probado**, **qué falta** y **cómo conseguirlo**, sin suposiciones ni tests inútiles.

**Este documento es una especificación y auditoría de lo existente y lo pendiente, no una afirmación de que estas funciones ya estén implementadas.**
