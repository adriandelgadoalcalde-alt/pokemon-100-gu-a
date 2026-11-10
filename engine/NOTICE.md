# Motor local y código fuente

El Atlas descarga este motor estático cuando encuentra un formato que no admite su
lector ligero. PKHeX.Core y nuestro adaptador se ejecutan en el navegador; no hay
servidor de análisis. La primera descarga puede alcanzar 45 MiB. El service worker
conserva los recursos utilizados para posteriores lecturas sin conexión, sujeto al
espacio y a la política de almacenamiento del navegador.

PKHeX.Core, de Kaphotics y colaboradores, y el adaptador de `pkhex-browser/` se
distribuyen bajo **GPL-3.0-or-later**, sin garantía. Se incluye el texto completo en
[COPYING-PKHeX.txt](COPYING-PKHeX.txt).

Fuentes correspondientes:

- [Archivo de fuentes exactas de PKHeX.Core](PKHeX-corresponding-source.tar.gz),
  incluida su configuración de compilación y licencia.
- [Adaptador, extractor y scripts de construcción](https://github.com/adriandelgadoalcalde-alt/pokemon-100-gu-a).
- [Revisión fija de PKHeX](https://github.com/kwsch/PKHeX/tree/96e33e7432d900e5345afdfd117eabfac43f5bbd).

La plataforma .NET y sus dependencias incluyen avisos MIT y de terceros en
[LICENSE-DOTNET.txt](LICENSE-DOTNET.txt) y
[THIRD-PARTY-NOTICES-DOTNET.txt](THIRD-PARTY-NOTICES-DOTNET.txt).
Los paquetes de componentes de ASP.NET Core proceden de
[dotnet/aspnetcore](https://github.com/dotnet/aspnetcore), bajo MIT.

`build.json` registra tamaños y hashes de los recursos distribuidos. Para reconstruir,
se necesitan Git, Python 3, .NET SDK 10 y acceso a NuGet:

```sh
bash scripts/build-browser-engine.sh
```

El script parte de una carpeta de distribución vacía para evitar mezclar recursos
de versiones anteriores. No incluye partidas ni diagnósticos. El proveedor MD5
implementa RFC 1321 únicamente para contrastar el checksum del juego en BD/SP;
no se utiliza como función de seguridad ni se modifica el guardado original.
