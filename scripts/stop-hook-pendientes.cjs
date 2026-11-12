// SPDX-License-Identifier: GPL-3.0-or-later
// Hook Stop: no deja terminar el turno mientras research/completion/pendientes.json tenga elementos en estado
// 'pendiente'. Salidas honradas: marcar un elemento 'bloqueado' (con 'motivo') o 'hecho'. Para no quedarse en bucle,
// si el hook ya bloqueó y la lista no ha cambiado en 3 intentos seguidos, deja parar con un aviso.
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
const root = process.env.CLAUDE_PROJECT_DIR || path.resolve(__dirname, '..');
const lista = path.join(root, 'research', 'completion', 'pendientes.json');
const estadoFich = path.join(root, '.claude', '.pendientes-estado.json');
let entrada = {};
try { entrada = JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch {}
let texto;
try { texto = fs.readFileSync(lista, 'utf8'); } catch { process.exit(0); }
let datos;
try { datos = JSON.parse(texto); } catch { process.exit(0); }
const pendientes = (datos.items || []).filter(i => i && i.estado === 'pendiente');
if (!pendientes.length) { try { fs.unlinkSync(estadoFich); } catch {} process.exit(0); }
const huella = crypto.createHash('sha256').update(texto).digest('hex');
let estado = { huella: '', intentos: 0 };
try { estado = JSON.parse(fs.readFileSync(estadoFich, 'utf8')); } catch {}
const sinAvance = entrada.stop_hook_active === true && estado.huella === huella;
const intentos = sinAvance ? (estado.intentos || 0) + 1 : 0;
try { fs.writeFileSync(estadoFich, JSON.stringify({ huella, intentos })); } catch {}
if (intentos >= 3) {
  process.stdout.write(JSON.stringify({ systemMessage: `Quedan ${pendientes.length} pendientes, pero la lista no ha cambiado en 3 intentos: se permite parar.` }));
  process.exit(0);
}
const resumen = pendientes.slice(0, 6).map(i => `- ${i.id}: ${i.titulo}`).join('\n');
process.stdout.write(JSON.stringify({
  decision: 'block',
  reason: `Regla permanente del propietario: no parar mientras queden pendientes. Quedan ${pendientes.length} en research/completion/pendientes.json:\n${resumen}\n` +
    `Sigue con el siguiente. Si uno es imposible ahora, márcalo 'bloqueado' con 'motivo' y su fuente; si está hecho, 'hecho'. Haz commit y push de lo que cambies.`
}));
