# Archivo Maestro Pokémon — guía y lectura local de guardados

Aplicación de seguimiento Pokémon con dos rutas de acceso:

- **[Atlas de nueve generaciones](./atlas.html):** 39 ediciones, 525 misiones y 1.146 pasos; lectura directa de formatos compatibles, importación de diagnósticos JSON y cobertura visible por edición.
- **[Lector de guardados y guía clásica](./index.html):** lectura local de los formatos compatibles y guía especializada para las ediciones ya implementadas.

## Publicación
GitHub Pages se publica desde la rama `main` y la raíz del repositorio. La aplicación puede instalarse desde Safari en iPad y Chrome en Android, sujeto a disponibilidad del navegador.

## Seguridad y progreso
Los archivos de guardado personales no están en este repositorio. Importar registros de Pokédex no certifica que se hayan completado los eventos originales. Exporta las casillas a JSON antes de cambiar de dispositivo.

## Cobertura real
La estructura abarca nueve generaciones; no todas las rutas son todavía guías exhaustivas. La V9.2 corrige el itinerario de Negro 2/Blanco 2 y añade comprobaciones específicas, pero 445 misiones siguen siendo recorridos introductorios. La lectura ampliada utiliza Core en el navegador; la certificación de cada evento y
las rutas exhaustivas siguen requiriendo trabajo y pruebas por edición.

El lector común del navegador admite **HeartGold, SoulSilver, Negro 2, Blanco 2, X, Y,
Rubí Omega, Zafiro Alfa, Ultrasol y Ultraluna**. Se han contrastado sus campos seleccionados,
flags y work mediante fixtures sintéticos completos frente a PKHeX.Core fijado por revisión.
Se han añadido partidas públicas: 12 muestras coinciden con Core en las diez
ediciones, además de fixtures sintéticos. No valida todas las revisiones regionales
ni la semántica natural de cada evento.
La guía clásica conserva sus seis guías específicas; las variantes adicionales se leen
desde el Atlas. Para otras familias, el Atlas descarga el [motor local WebAssembly](pkhex-browser/README.md)
(hasta 45 MiB en el primer uso). También se conserva el [extractor local C#](pkhex-extractor/README.md)
y la importación de su diagnóstico JSON. Las familias ambiguas exigen seleccionar
la edición y los campos pendientes permanecen explícitos.

La continuación del proyecto prioriza lectura local fiable y rutas con evidencias.
El alcance excluye entrenadores secundarios y objetos sueltos triviales; incluye
todos los objetos importantes para completar los objetivos. Consulta la
[matriz de cobertura](docs/coverage-matrix.md) y la [investigación HGSS](research/flags/hgss.md).
La [integridad por formato](research/save-integrity.md) y el [motor de evidencias](docs/evidence-engine.md)
documentan qué se comprueba y qué sigue pendiente. Las [correcciones por edición](research/routes/edition-corrections.md) registran los últimos ajustes de rutas y sus fuentes.

El recorrido de la guía clásica es **guardado → diagnóstico → siguiente objetivo**,
sin cuestionarios de situación. El diagnóstico distingue los datos leídos de los
requisitos pendientes de interpretación. Las respuestas antiguas se conservan al
exportar/restaurar el progreso y no reaparecen como un test. Quitar el cuestionario
no amplía por sí solo los formatos compatibles ni certifica nuevos eventos.

## Guías ampliadas y cierre editorial

Las misiones incorporan recorridos con ubicación, requisitos, instrucciones,
comprobación final y fuentes, disponibles también offline. La ampliación actual
contiene 73 rutas enlazadas a 176 misiones de las 39 ediciones. Mantiene todas las
casillas previas. El [seguimiento editorial](docs/guide-completion.md) define qué
falta para cerrar las guías exhaustivas de las nueve generaciones; los recuentos
no certifican el 100 % de los juegos.

## Desarrollo y comprobaciones

Requiere Node.js 24 para las herramientas. La web es estática y distribuye el motor
precompilado; modificar el adaptador C# exige reconstruirlo según su README. No
requiere un servidor de análisis. `.nojekyll` permite servir `_framework` en Pages.

```sh
npm ci --ignore-scripts
npm run audit
npm test
npx playwright install chromium
npm run test:browser
```

Las pruebas del navegador generan guardados sintéticos en memoria; el contraste C#
genera archivos sintéticos temporales en una carpeta ignorada por Git. Las capturas locales
se escriben en `test-results/` y no se publican en Pages. En CI se guardan como artefacto.
Los guardados privados y exportaciones personales deben quedar en `fixtures/private/`,
fuera de Git. No se incluyen ni necesitan partidas personales para ejecutar estas pruebas.
El [corpus público](research/saves/README.md) permite repetir la validación con
archivos publicados por la comunidad, fijados por revisión y hash, sin subir los
originales ni los datos del entrenador. La regresión visual cubre Chromium y WebKit;
WebKit en Linux no sustituye una prueba física de Safari/iPadOS.

### Referencias
- https://bulbapedia.bulbagarden.net/wiki/Appendix:Black_2_and_White_2_walkthrough
- https://www.wikidex.net/wiki/Unova
- https://bulbapedia.bulbagarden.net/wiki/Core_series
