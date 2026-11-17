// Esquemas de validación de cada entidad (usados por validateBody)
const pilotSchema = {
  nombre: { type: 'string', minLength: 3 },
  licencia: { type: 'string', minLength: 3 },
  horasVuelo: { type: 'number', min: 0 },
  estado: { type: 'string', enum: ['activo', 'inactivo', 'suspendido'] },
};

const airplaneSchema = {
  modelo: { type: 'string', minLength: 2 },
  matricula: { type: 'string', minLength: 3 },
  capacidadMaxima: { type: 'integer', min: 1 },
  fabricante: { type: 'string', minLength: 2 },
};

const assignmentSchema = {
  idPiloto: { type: 'integer', min: 1 },
  idAvion: { type: 'integer', min: 1 },
  fechaVuelo: { type: 'date' },
  rutaAsignada: { type: 'string', minLength: 3 },
};

module.exports = { pilotSchema, airplaneSchema, assignmentSchema };
