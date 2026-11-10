# PKHeX local en el navegador

Motor estático WebAssembly, GPL-3.0-or-later. Comparte `Audit.cs` y
`ProgressSignals.cs` con el extractor local y fija la misma revisión de Core.
No contiene editor, almacenamiento remoto ni llamadas para subir archivos.
El adaptador comprueba integridad y hash, analiza una copia y devuelve un diagnóstico
al Atlas mediante un frame del mismo origen. Los errores no incluyen los datos
del entrenador.

El lector JS sigue atendiendo sus diez ediciones sin descargar el runtime. Solo un
error tipado de formato no implementado habilita la alternativa Core. Un rechazo
de integridad no reintenta otra copia ni otro lector. Si Core devuelve una familia
ambigua, se exige seleccionar previamente una de sus ediciones en el Atlas.
Pokédex no disponible y campos no interpretados no se convierten en ceros fiables.

Construcción y comprobación:

```sh
bash scripts/build-browser-engine.sh
python3 scripts/fetch-public-saves.py .cache/public-corpus
node tests/core-browser.cjs .cache/public-corpus
POKEMON_BROWSER=webkit node tests/core-browser.cjs .cache/public-corpus
```

La prueba necesita el extractor CLI compilado y los navegadores Playwright.
Compara todos los campos del diagnóstico con el CLI, excepto la hora de lectura;
comprueba red de recursos estáticos, rechazo de archivos inválidos, bytes intactos,
importación real en el Atlas y nueva lectura después de cerrar el servidor.
Solo genera informes saneados en la carpeta privada del corpus.

La primera descarga ronda 45 MiB sin compresión. El motor se guarda offline tras
su primer uso si el navegador conserva la caché. No demuestra cobertura editorial
exhaustiva, la semántica de todas las banderas ni compatibilidad con toda revisión.
La prueba WebKit en Linux no certifica Safari físico en iPad.
