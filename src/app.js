const express = require('express');
const logger = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errorHandlers');
const pilotRoutes = require('./routes/pilotRoutes');
const airplaneRoutes = require('./routes/airplaneRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());


app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Aerolínea - Arquitectura modular',
    endpoints: ['/api/pilotos', '/api/aviones', '/api/asignaciones'],
  });
});
app.use('/api/pilotos', pilotRoutes);
app.use('/api/aviones', airplaneRoutes);
app.use('/api/asignaciones', assignmentRoutes);

app.use(notFound);
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
}

module.exports = app;
