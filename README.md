# Archivo Maestro Pokémon — aplicación web instalable (PWA) v8.2

Esta carpeta contiene una versión autocontenida de la guía v8.1 con instalación desde Safari/Chrome, compatible con GitHub Pages. No incluye partidas `.sav` o `main` personales. La lectura de partidas se realiza en el navegador, sin enviar guardados al servidor.

## Publicar en GitHub Pages

1. Crear repositorio (público si se usa GitHub Pages gratuito según las condiciones de la cuenta).
2. Subir **todo el contenido de esta carpeta a la raíz** de la rama `main`, conservando la carpeta `icons`.
3. En Settings → Pages, seleccionar Deploy from a branch, `main`, `/(root)`, Save.
4. Abrir `https://USUARIO.github.io/REPOSITORIO/` cuando Pages indique que se ha publicado.

## Instalar en iPad

Abrir esa dirección en Safari → Compartir → Añadir a pantalla de inicio → Abrir desde el icono. Cargar una vez con conexión para que el contenido quede en caché. En Chrome Android se puede usar Instalar aplicación.

## Progreso y privacidad

El progreso se guarda **localmente en cada navegador**; usa Exportar/Importar JSON para transferirlo de Android a iPad o PC. La PWA por sí sola no sincroniza automáticamente el estado. No subas archivos `.sav`, `main` ni los JSON de tu progreso al repositorio público. Los diagnósticos personales preintegrados se han eliminado de esta versión para evitar publicarlos. Importa tus cinco partidas localmente en cada dispositivo para obtener los diagnósticos personalizados.

## Test rápido

Servir esta carpeta con `python -m http.server 8000`, abrir `http://localhost:8000`, probar el lector y desactivar la red después de la primera carga. Para instalar realmente en iPad es necesario HTTPS, que proporciona GitHub Pages.

GitHub Pages: publicación desde `main` / raíz del repositorio. Entrada: `index.html`.
