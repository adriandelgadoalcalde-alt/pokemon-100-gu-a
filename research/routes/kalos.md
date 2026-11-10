# Kalos: Pokémon X/Y

Revisión editorial del 10 de noviembre de 2026. Diez rutas nuevas (59 instrucciones)
completan la ampliación de las doce misiones catalogadas por edición, manteniendo
las dos entradas anteriores de postgame y Handsome. La matriz global queda en
182 recorridos, 380 conexiones y 145 misiones sin ampliación. Todos los IDs,
casillas y datos de progreso se conservan.

## Recorrido

Se consultaron los capítulos específicos de Bulbapedia citados en cada entrada,
las tablas de MO de Serebii y las páginas de líderes y Mansión Batalla. La
localización española de personajes y medallas se contrastó con WikiDex. Son
referencias editoriales y de requisitos, no validación de flags internos.

- https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_X_and_Y
- https://www.serebii.net/xy/tmhm.shtml
- https://www.serebii.net/xy/gyms.shtml
- https://www.serebii.net/xy/battlemaison.shtml
- https://bulbapedia.bulbagarden.net/wiki/Trainer_Card_level#X_and_Y

El recorrido corrige Ruta 8/costa como acceso a Relieve (Ruta 10 va después del
gimnasio), Fuerza entregada por Lino antes de vencerlo y habilitada tras la medalla,
el orden Valeria → Ástrid y los nombres españoles de medallas y campeona. Incluye
la colocación de Xana para Furfrou, Corte en los jardines de Palacio Cénit, Surf
tras Torre Maestra, Vuelo de Ciprés en Témpera y Cascada de Xana en Ruta 19.

El Pase Central oculto se mantiene por ser necesario para avanzar. Torre Prisma
se resuelve con los ascensores 3, 1, 3 y 2. Laboratorios Lysson y cuartel de Crómlech
son lugares consecutivos; elegir el botón azul no evita el arma, porque Xero
la activa con su mando. Xerneas corresponde a X e Yveltal a Y.

## Pokédex de vistas

La condición regional de tarjeta se implementa como **450 especies vistas**,
separada de obtenidos y de premios recogidos. La numeración regional de PokéAPI
está fijada a una revisión y un digest: `research/dex/kalos-source.json` identifica
la fuente completa y la selección reproducible `kalos-numbers.csv`.

Las tres subregiones aportan 153, 153 y 151 registros distintos (457). Se excluyen
Articuno, Zapdos, Moltres, Mewtwo, Diancie, Hoopa y Volcanion según el requisito de
X/Y documentado por Bulbapedia: quedan 450. Se conserva la licencia de PokéAPI en
el directorio de investigación y en el propio módulo generado. El generador local
comprueba la huella de selección, numeraciones sin huecos, exclusiones y salida;
se ejecuta también en CI, sin necesitar red.

`completion.js` selecciona el campo `seen` para X/Y y `caught` para las reglas
anteriores. La evidencia valida el campo usado: disponer de integridad solo para
obtenidos no acredita las vistas. No se crea un hecho de color de tarjeta,
diploma, regalo, captura original ni entrega de premio a partir de esta lista.
Los requisitos de colección se derivan de fuentes comunitarias explícitas; no se
presenta esta regla como una verificación de scripts primarios del juego.

## Pendientes de cierre exhaustivo

Tener doce misiones ampliadas no prueba que el inventario de objetivos esté
completo. Faltan recorridos espaciales íntegros de varios gimnasios, Cueva Reflejos,
Calle Victoria y laboratorios; revisar los accesos y regalos relevantes de todas
las zonas, megapiedras por versión/hora, legendarios de postgame, capítulos
individuales de Handsome, Safari Amistad y las limitaciones de conectividad,
Superentrenamiento, Poké Recreo, bastión, crianza, formas y demás colecciones.
No se añaden flags narrativos ni se declaran pares naturales antes/después.

## Validación de esta entrega

Auditoría de catálogo y caché, generador reproducible, especies sustituidas con
igual total, especies solo obtenidas, ausencia de vistas e integridad del campo
incorrecto. La interfaz se comprueba en ambos motores para X e Y, mostrando las
vistas de Kalos, las rutas concretas y el cálculo sin origen disponible. La prueba
WebKit no sustituye una prueba en Safari de un iPad físico.

La verificación remota anterior agotó diez minutos descargando paquetes desde el
espejo Ubuntu de Azure, antes de arrancar los navegadores del contrato PKHeX. El
workflow selecciona ahora el archivo oficial de Ubuntu mediante HTTPS para evitar
ese cuello de botella; conserva el límite de tiempo y todas las comprobaciones.
