# Rubí Omega y Zafiro Alfa

Revisión editorial del 10 de noviembre de 2026. Catorce recorridos nuevos y 87
instrucciones amplían las 28 conexiones restantes del catálogo; se mantienen las
dos entradas del Episodio Delta. Cada edición tiene dieciséis misiones ampliadas.
La matriz global queda en 196 recorridos, 408 conexiones y 117 misiones sin
ampliación. Las 525 misiones, sus 1.146 casillas y todos los IDs permanecen iguales.

## Fuentes de recorrido

Cada entrada identifica los capítulos específicos de la guía de 3DS:
https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Omega_Ruby_and_Alpha_Sapphire

Se contrastan además las MO, Liga, legendarios, parajes y Mansión:
- https://www.serebii.net/omegarubyalphasapphire/tmhm.shtml
- https://www.serebii.net/omegarubyalphasapphire/elitefour.shtml
- https://www.serebii.net/omegarubyalphasapphire/legendary.shtml
- https://bulbapedia.bulbagarden.net/wiki/Mirage_spot
- https://bulbapedia.bulbagarden.net/wiki/Walkthrough:Pok%C3%A9mon_Omega_Ruby_and_Alpha_Sapphire/Soaring_Legendaries
- https://www.serebii.net/omegarubyalphasapphire/battlemaison.shtml
- https://bulbapedia.bulbagarden.net/wiki/Super-Secret_Base

Son fuentes editoriales comunitarias, no validación de offsets. Algunos capítulos
se obtienen mediante búsqueda conectada; una petición al capítulo de Liga de
Bulbapedia devolvió 403 y no se registra como una comprobación HTTP correcta.
La composición de Liga y Mega-Metagross se contrasta con Serebii. Los nombres
españoles de personajes, lugares y objetos se contrastan con WikiDex y referencias
de la sexta generación. No se cambia Campana Clara/Oleaje por el nombre posterior
Cascabel Claro/Oleaje del recurso moderno de PKHeX.

## Diferencias que se conservan en el producto

- Golpe Roca procede del tío de Blasco y Fuerza de Aura/Bruno en Ruta 112. El
  regalo de Túnel Fervergal es Aggronita. El Repartir Exp. se recibe en el bosque.
- La visita de historia a Isla del Sur entrega Latios en RO o Latias en ZA y la
  Megapulsera; Ticket Eón corresponde al encuentro opuesto.
- Guarida Magma y Aqua están en Calagua. Los dormitorios y la posición de la
  Master Ball están reflejados entre versiones.
- La séptima medalla lleva a casa de Máximo para Buceo y equipo Devon. El ataque
  al Centro Espacial de Esmeralda no es un requisito de este tramo del remake.
- Plubio es el octavo líder en ambos remakes y Máximo el campeón. No se exige el
  Emblema Magma ni la intervención de Rayquaza del desenlace de Esmeralda.
- Cámara Sellada requiere Relicanth primero y Wailord último; los puzles Regi
  mantienen Fuerza, espera y Vuelo. Regigigas tiene condiciones adicionales.
- Las condiciones de portales usan equipo, reloj o paraje diario concretos. Los
  horarios de guardianes y bestias y los días de los espadachines se detallan.
- Resort Batalla y su Mansión sustituyen la referencia equivocada al Frente y
  sus siete símbolos. Concursos y bases no son logros de tarjeta de estos juegos.

## Reconocimiento regional de vistas

La Hoenn ampliada tiene 211 entradas. Para la tarjeta se comparan **208 vistas**,
excluyendo Rayquaza, Jirachi y Deoxys según Trainer Card level de Bulbapedia.
La lista se obtiene de la misma revisión de PokéAPI usada para Kalos, seleccionando
su Pokédex 15. Se guarda la selección, fuente, licencia y digest en `research/dex/`
y se genera el módulo local con `scripts/update-hoenn-dex.py`, comprobado en CI.

La regla solo se conecta al requisito de tarjeta `card-1`: el objetivo genérico
«completar Pokédex» no se da por cerrado con vistas ni se acredita un diploma,
premio de captura, estrella o encuentro original. Se valida el campo `seen`;
obtenidos no sustituye las vistas ausentes y Rayquaza no rellena otra especie.

## Cierre pendiente

No se certifica inventario exhaustivo por completar las entradas del catálogo.
Faltan mapas completos de corrientes, hielo, cuevas y teletransportadores; el
inventario de megapiedras con todos sus accesos, regalos, MT relevantes, formas,
misiones menores con premio, concursos, bases y demás colecciones. Hay que revisar
rutas de recuperación de encuentros y las restricciones de conectividad vigente.
No se añaden flags narrativos ni pares naturales antes/después en esta entrega.

La regresión incluye listas regionales sustituidas con igual total, campos
ausentes, integridad de campo incorrecto, rutas de cada edición y consulta sin
origen disponible. WebKit no equivale a una prueba en un iPad físico.
