# Extractor local de guardados — solo lectura

Requiere Git y .NET SDK 10. No es un backend ni se ejecuta en GitHub Pages. En iPad o
Android puedes importar en el Atlas el JSON generado localmente desde un ordenador.
No se sube ningún guardado ni se ejecutan operaciones de edición sobre el original.

```sh
bash scripts/prepare-pkhex.sh
dotnet build pkhex-extractor/Pokemon.SaveAudit.csproj --configuration Release
dotnet pkhex-extractor/bin/Release/net10.0/Pokemon.SaveAudit.dll "/ruta/guardado.sav" "/ruta/privada/nuevo-diagnostico.json" --include-events
```

El destino debe ser un archivo nuevo; se rechazan sobrescrituras y alias existentes.
La escritura del JSON es atómica y, en Unix, tiene permisos solo para su propietario.
Se comprueba el hash del original antes/después de leer. PKHeX recibe una copia de
los bytes y no la ruta del original. La revisión upstream se comprueba al compilar.

El JSON contiene formato, edición cuando puede identificarse, integridad expuesta
por upstream, Pokédex, objetos e inventario, perfil seudónimo y campos compatibles.
`--include-events` añade arrays de flags/work en las familias que los exponen; los
bloques modernos con keys hash requieren adaptadores específicos. No se infiere
historia a partir de los valores crudos. Los campos no disponibles permanecen nulos
y se explican en `unparsed`. Algunas ediciones antiguas pueden no identificarse como
una variante individual: no se elige una por defecto si PKHeX devuelve una familia.

No exporta nombre ni ID del entrenador. El seudónimo y los hashes no hacen anónimo
todo el diagnóstico: contiene progreso privado, así que consérvalo fuera del repositorio.
No se certifica legitimidad ni la consecución natural de los eventos.

Para repetir el contraste con fixtures sintéticos:

```sh
npm ci --ignore-scripts
dotnet run --project pkhex-extractor/Tests/Pokemon.SaveAudit.Tests.csproj --configuration Release -- .cache/synthetic
node scripts/compare-pkhex.cjs .cache/synthetic
node scripts/test-extractor-cli.cjs .cache/synthetic
```

El contrato compartido del navegador cubre diez ediciones DS/3DS con archivos sintéticos completos.
Además, `container-smoke.json` documenta 23 contenedores sintéticos adicionales leídos
y seis aún no validados (Espada/Escudo, Arceus, Escarlata/Púrpura y Z-A).
Las variantes indistinguibles conservan `game: null` y su lista de candidatas;
no se contabilizan como identificaciones individuales. El informe separado
`api-smoke.json` prueba objetos de las otras familias; **no representa soporte validado
con archivos reales**. La construcción del objeto vacío de Z-A falla en la revisión
upstream fijada y queda como pendiente, sin ocultarse ni contabilizarse como aprobada.

Véanse [licencia y dependencias](NOTICE.md) y [alcance de integridad](../research/save-integrity.md).

## Archivos públicos contrastados

El [corpus público](../research/saves/README.md) incluye 59 referencias (57 contenidos
distintos): Core admite 51 y rechaza ocho explícitamente. Hay contenedores admitidos
de las nueve generaciones, incluidos formatos Switch que no podían construirse con
el objeto vacío de upstream. Esto amplía la validación de contenedores, sin convertir
una partida preparada en prueba natural de escenas o de legitimidad. El contrato
compara también doce muestras del lector JS con Core y conserva los originales.

```sh
python3 scripts/fetch-public-saves.py .cache/public-corpus
node scripts/validate-public-saves.cjs .cache/public-corpus
```

Escarlata/Púrpura incorpora cinco señales de progreso documentadas y tipadas; las
claves ausentes siguen nulas. Su nivel es documental: no certifican escenas sin
comparaciones naturales antes/después ni sobrescriben marcas manuales.
