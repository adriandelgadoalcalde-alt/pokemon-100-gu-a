# Lectura local ampliada: publicación comprobada

El 10 de noviembre de 2026 se integra la propuesta «Guías de nueve generaciones y
lectura local ampliada de guardados» en `main`, mediante `97b0a5f`.
La revisión de producto aprobada por CI es `939c5a0`.

La publicación de Pages se ha comprobado descargando el Atlas y el manifiesto del
motor y comparándolos byte a byte con la entrega. En la web pública, Chromium y
WebKit leen una muestra pública de Escarlata desde el selector real del Atlas sin
errores, desbordamiento móvil ni peticiones que envíen el guardado. Los originales
y resultados privados de esa comprobación no se publican.

La prueba remota usa navegadores de automatización en Cloud. Su almacén de
certificados no conoce la CA del proxy de la sesión; se omite el rechazo de certificados exclusivamente en el navegador de
automatización, tras verificar la descarga HTTPS con el almacén de confianza del
sistema. No se modifica la seguridad del producto ni la del
navegador del usuario. Esto no equivale a una prueba física en Safari/iPadOS.

Antes de publicar se aprobaron en GitHub las regresiones generales de Chromium y
WebKit y el contrato Core: corpus público fijado, lectura idéntica a CLI, privacidad,
rechazo de corrupción y reapertura offline en ambos motores. Los informes saneados
están en `research/saves/`.

Esta entrega publica la mejora fiable disponible. Las rutas exhaustivas de todas
las ediciones y la interpretación de todos los eventos siguen pendientes según
`docs/guide-completion.md`; no se certifica completismo por el número de archivos
admitidos ni por haber publicado la web.
