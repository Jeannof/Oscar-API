// 404 para rutas inexistentes
const notFound = (req, res) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
};

// Manejo global de errores (incluye JSON mal formado enviado por el cliente)
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON mal formado en el cuerpo de la petición' });
  }
  console.error(err);
  return res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
};

module.exports = { notFound, errorHandler };
