# Correcciones de rutas por edición

Consulta de fuentes: 9 de noviembre de 2026. Redacción propia; no se incorporan
imágenes, tablas de equipos ni texto de las guías externas. Estas comprobaciones
editoriales no son validaciones de flags ni de guardados naturales.

| Misiones conservadas | Corrección | Fuentes consultadas |
| --- | --- | --- |
| BLACK/WHITE-08 | Octava medalla en Caolín; Lirio en Negro e Iris en Blanco; N/Ghechis ocurren después del primer Alto Mando | [Gimnasios](https://www.serebii.net/blackwhite/gyms.shtml), [Equipo Plasma](https://www.serebii.net/blackwhite/plasma.shtml) |
| BLACK/WHITE-09 | Primera Liga interrumpida por el castillo de N; Mirto es un combate posterior | [Equipo Plasma](https://www.serebii.net/blackwhite/plasma.shtml), [Alto Mando](https://www.serebii.net/blackwhite/elitefour.shtml) |
| BLACK/WHITE-11 | Se elimina el medallero de las secuelas del título; se desglosan tarjeta, accesorios, poderes y ambas rachas de 49 | [Tarjeta](https://www.serebii.net/blackwhite/trainercard.shtml) |
| SUN/MOON-10 | Arca de Zygarde; 95 células + cinco núcleos, horarios y centro de Ruta 16; sin pegatinas dominantes de Ultra | [Zygarde](https://www.serebii.net/sunmoon/zygarde.shtml) |
| SWORD/SHIELD-04 | Cuarto gimnasio Lucha/Fantasma, quinto Hada, sexto Roca/Hielo | [Gimnasios de Galar](https://www.serebii.net/swordshield/gyms.shtml) |
| SWORD/SHIELD-05 | Séptimo Siniestro sin Dinamax, octavo Dragón y combates dobles; sin alternancia del séptimo por versión | [Gimnasios de Galar](https://www.serebii.net/swordshield/gyms.shtml) |
| PLATINUM-04/05 | Fantina tercera, Brega cuarta y Mananti quinto; se explicita el orden frente a Diamante/Perla | [Gimnasios de Platino](https://www.serebii.net/platinum/gyms.shtml) |

Son 14 misiones existentes revisadas, con los mismos IDs y dos pasos por misión.
Sus marcas anteriores siguen siendo declaraciones manuales, no nuevas pruebas del
juego. El contenido sigue siendo resumido: no se declara una guía exhaustiva.

## Límite de historia para recomendaciones

Cada edición señala el ID de su última misión de historia principal en el catálogo.
El recomendador usa ese límite editorial al recibir `gameClear: true`; no depende
de que el antiguo campo de presentación `section` esté bien agrupado. Esto evita
volver a recomendar la primera Liga a un campeón de Alola o de Teselia. Si las
16 medallas de Johto/Kanto están presentes, se prioriza el tramo del Monte Plateado.
No se marcan casillas ni se atribuyen fechas históricas al usar estos hitos.

Las pruebas de regresión usan el catálogo real de Negro, Sol, Platino y SoulSilver,
y verifican el destino recomendado sin cambiar el estado de las misiones.
