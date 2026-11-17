// Middleware de logging: registra cada petición al terminar la respuesta.
// Formato: [fecha ISO] MÉTODO /url -> status (duración ms) [body]
// Escribe en consola y en logs/access.log
const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '..', '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'access.log');

fs.mkdirSync(LOG_DIR, { recursive: true });

const logger = (req, res, next) => {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
    const hasBody = ['POST', 'PUT', 'PATCH'].includes(req.method) && req.body
      && Object.keys(req.body).length > 0;
    const bodyInfo = hasBody ? ` body=${JSON.stringify(req.body)}` : '';

    const line =
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ` +
      `${res.statusCode} (${durationMs.toFixed(1)} ms)${bodyInfo}`;

    console.log(line);
    fs.appendFile(LOG_FILE, line + '\n', (err) => {
      if (err) console.error('No se pudo escribir el log:', err.message);
    });
  });

  next();
};

module.exports = logger;
