# Archivo Maestro Pokémon — guía y lectura local de guardados

Aplicación de seguimiento Pokémon con dos rutas de acceso:

- **[Atlas de nueve generaciones](./atlas.html):** 39 ediciones, 525 misiones y 1.146 pasos; lectura directa de formatos compatibles, importación de diagnósticos JSON y cobertura visible por edición.
- **[Lector de guardados y guía clásica](./index.html):** lectura local de los formatos compatibles y guía especializada para las ediciones ya implementadas.

## Publicación
GitHub Pages se publica desde la rama `main` y la raíz del repositorio. La aplicación puede instalarse desde Safari en iPad y Chrome en Android, sujeto a disponibilidad del navegador.

## Seguridad y progreso
Los archivos de guardado personales no están en este repositorio. Importar registros de Pokédex no certifica que se hayan completado los eventos originales. Exporta las casillas a JSON antes de cambiar de dispositivo.

## Cobertura real
La estructura abarca nueve generaciones; no todas las rutas son todavía guías exhaustivas. La V9.2 corrige el itinerario de Negro 2/Blanco 2 y añade comprobaciones específicas, pero 445 misiones siguen siendo recorridos introductorios. La lectura SAV directa de todas las generaciones y la certificación absoluta requieren desarrollo y pruebas por formato.

El lector común del navegador admite **HeartGold, SoulSilver, Negro 2, Blanco 2, X, Y,
Rubí Omega, Zafiro Alfa, Ultrasol y Ultraluna**. Se han contrastado sus campos seleccionados,
flags y work mediante fixtures sintéticos completos frente a PKHeX.Core fijado por revisión.
Eso no sustituye pruebas con partidas reales ni valida todas las revisiones regionales.
La guía clásica conserva sus seis guías específicas; las variantes adicionales se leen
desde el Atlas. Para otras familias está disponible el [extractor local C#](pkhex-extractor/README.md),
cuyo diagnóstico JSON puede importarse en el Atlas, con sus límites de detección explícitos.

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

## Desarrollo y comprobaciones

Requiere Node.js 24. La aplicación sigue siendo estática; no necesita build ni backend.

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

### Referencias
- https://bulbapedia.bulbagarden.net/wiki/Appendix:Black_2_and_White_2_walkthrough
- https://www.wikidex.net/wiki/Unova
- https://bulbapedia.bulbagarden.net/wiki/Core_series
