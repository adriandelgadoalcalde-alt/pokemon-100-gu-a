# Comprobación de la publicación del medallero

La revisión publicada del medallero B2/W2 coincide byte a byte con los recursos
integrados: Atlas, módulo de medallas, manifiesto del motor local y service worker.
Las comprobaciones de calidad y la publicación Pages terminaron correctamente.

Sobre la página pública, Chromium y WebKit importaron una partida pública de
Negro 2 del corpus privado de pruebas. El resultado completo del medallero del
lector nativo coincide con el extractor PKHeX; la lectura adicional con Core en
WebAssembly coincide también. Se comprobaron el listado de las 255 entradas y el
filtro de recompensas listas para recoger. No se observaron errores de página,
desbordamiento a anchura móvil ni peticiones con el contenido del guardado.

Los archivos de entrada y los diagnósticos permanecen fuera del repositorio.
Las pruebas remotas aceptan el certificado del proxy del entorno de pruebas;
no se ha probado aquí Safari en un dispositivo iPad físico. Esto valida lectura
y presentación del medallero, no todos los criterios ni las guías exhaustivas.
