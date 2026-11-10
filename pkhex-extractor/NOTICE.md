# Dependencias y licencia

El código de este directorio se ofrece bajo **GPL-3.0-or-later**. Esto se aplica al
extractor nuevo, no cambia por sí mismo la licencia del resto del repositorio.
PKHeX.Core es de Kaphotics y colaboradores, bajo GPL-3.0-or-later.

Fuente exacta: https://github.com/kwsch/PKHeX/tree/96e33e7432d900e5345afdfd117eabfac43f5bbd

Licencia completa de la dependencia:
https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/LICENSE

El motor de navegador se distribuye como WebAssembly en `engine/`, junto con los
avisos, el texto de la GPL y un archivo de fuentes correspondientes de Core. El
adaptador y los scripts de construcción están en este repositorio; véase
[aviso del motor](../engine/NOTICE.md). El extractor CLI conserva su compilación local.

El diagnóstico se crea localmente. El hash de perfil es un seudónimo determinista,
no una garantía de anonimización; trata todos los JSON como datos privados.
