# Archivo Maestro Pokémon — guía y lectura local de guardados

Aplicación de seguimiento Pokémon con dos rutas de acceso:

- **[Atlas de nueve generaciones](./atlas.html):** 39 ediciones, 525 misiones y 1.146 pasos; lectura directa de formatos compatibles, importación de diagnósticos JSON y cobertura visible por edición.
- **[Lector de guardados y guía clásica](./index.html):** lectura local de los formatos compatibles y guía especializada para las ediciones ya implementadas.

## Publicación
GitHub Pages se publica desde la rama `main` y la raíz del repositorio. La aplicación puede instalarse desde Safari en iPad y Chrome en Android, sujeto a disponibilidad del navegador.

## Seguridad y progreso
Los archivos de guardado personales no están en este repositorio. Importar registros de Pokédex no certifica que se hayan completado los eventos originales. Exporta las casillas a JSON antes de cambiar de dispositivo.

## Cobertura real
La estructura abarca nueve generaciones; no todas las rutas son todavía guías exhaustivas. Las etiquetas históricas del catálogo se complementan con recorridos ampliados;
la matriz editorial distingue las misiones desarrolladas de los objetivos aún
agrupados o pendientes. La lectura ampliada utiliza Core en el navegador; la certificación de cada evento y
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
contiene 212 rutas enlazadas a 440 misiones de las 39 ediciones. Mantiene todas las
casillas previas. El [seguimiento editorial](docs/guide-completion.md) define qué
falta para cerrar las guías exhaustivas de las nueve generaciones; los recuentos
no certifican el 100 % de los juegos. Hoenn GBA incluye las diferencias de
historia y un visor de hielo específico para Rubí/Zafiro y Esmeralda, disponible
offline y sin modificar las casillas del usuario. Rojo Fuego/Verde Hoja conserva
su recorrido propio, ubicaciones corregidas y diagnóstico de las especies exactas
que faltan para sus requisitos de Pokédex.

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

El motor ampliado conserva ahora las medallas individuales y la Nacional de los
cinco títulos GBA. Una señal documentada de Liga orienta al postgame sin dar por
hechas todas las escenas; véase `research/saves/gba-progress.md`. Rojo Fuego/Verde
Hoja distingue los tickets y el fallo de Rugido entre GBA original y la reedición
oficial de Switch. La plataforma no se inventa a partir de un save que no la identifica.

Platino tiene recorridos propios del inicio a la Liga y del Mundo Distorsión. Se
distinguen el inicial de Ruta 201, Fantina tercera, Brega cuarta, Fuerza de Quinoa y
Despejar de Ruinas Sosiego; no se trasladan esas condiciones a Diamante/Perla.

Diamante/Perla incorpora diez recorridos compartidos de su historia original DS:
maletín de Lago Veraz, Fantina quinta tras Surf, Fuerza de Torre Perdida, Despejar del
Gran Pantano y clímax de Dialga/Palkia. Se mantienen separados de Platino y los remakes.

HGSS añade 17 rutas de sus remakes: Kimono, MO, Central, Abono, radio, Suicune y
Ruinas Alfa. La Nacional se compara por especie en las cinco ediciones DS de la
generación IV: 482 exigidas en D/P/Platino y 484 en HGSS. Se conservan sin marcar
las casillas manuales; no se certifican premios entregados ni encuentros originales.

El Medallero de Negro 2/Blanco 2 muestra las 255 medallas por nombre y estado, con
búsqueda y filtros. Se distingue recibida de lista para recoger, se mantienen los
estados sin interpretar y se omiten fechas imposibles. El lector ligero y Core
comparan ahora también el bloque completo; véase `research/saves/b2w2-medals.md`.

Los datos de numeración regional de Kalos proceden de PokéAPI, fijados a una
revisión y con su licencia en `research/dex/`. La comparación de X/Y usa 450
especies vistas, sin atribuir recogida de premios ni encuentros originales.

Rubí Omega/Zafiro Alfa compara para su reconocimiento regional las 208 especies
vistas exigidas de Hoenn; se distinguen de los 211 registros totales y de los
premios de captura. Las fuentes y licencia están en `research/dex/`.

Los remakes de Hoenn incluyen además un buscador de las 47 megapiedras con rutas y
fuentes individuales. Al importar un guardado, muestra cuáles constan en la bolsa;
una ausencia puede significar que la piedra está equipada. La Diancita se separa
como legado. El lector ligero contrasta también los cinco bolsillos de X/Y/ORAS.

El diagnóstico de Alola distingue cristales Z de bolsa y equipables. Ultrasol y
Ultraluna incluyen lectura nativa de los siete bolsillos, contrastada con PKHeX;
los cristales presentes no certifican pruebas ni sellos del pasaporte.
