// Middlewares de validación reutilizables.
//  - validateId(param):   verifica que el parámetro de la URL sea un entero positivo.
//  - validateBody(schema): verifica el cuerpo de la petición contra un esquema.
//
// Un esquema es un objeto { campo: { type, min, max, enum, minLength } }.
// Tipos soportados: string, number, integer, date (YYYY-MM-DD).
// Todos los campos del esquema son obligatorios.

const isValidDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const validateField = (field, value, rules) => {
  const errors = [];

  if (value === undefined || value === null || value === '') {
    return [`El campo '${field}' es obligatorio`];
  }

  switch (rules.type) {
    case 'string':
      if (typeof value !== 'string' || !value.trim()) {
        errors.push(`El campo '${field}' debe ser un texto no vacío`);
      } else if (rules.minLength && value.trim().length < rules.minLength) {
        errors.push(`El campo '${field}' debe tener al menos ${rules.minLength} caracteres`);
      }
      break;
    case 'number':
    case 'integer':
      if (typeof value !== 'number' || !Number.isFinite(value)) {
        errors.push(`El campo '${field}' debe ser un número`);
      } else if (rules.type === 'integer' && !Number.isInteger(value)) {
        errors.push(`El campo '${field}' debe ser un número entero`);
      } else {
        if (rules.min !== undefined && value < rules.min) {
          errors.push(`El campo '${field}' debe ser mayor o igual a ${rules.min}`);
        }
        if (rules.max !== undefined && value > rules.max) {
          errors.push(`El campo '${field}' debe ser menor o igual a ${rules.max}`);
        }
      }
      break;
    case 'date':
      if (!isValidDate(value)) {
        errors.push(`El campo '${field}' debe ser una fecha válida con formato YYYY-MM-DD`);
      }
      break;
    default:
      break;
  }

  if (!errors.length && rules.enum && !rules.enum.includes(value)) {
    errors.push(`El campo '${field}' debe ser uno de: ${rules.enum.join(', ')}`);
  }

  return errors;
};

const validateBody = (schema) => (req, res, next) => {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ error: 'El cuerpo de la petición debe ser un objeto JSON' });
  }

  const errors = Object.entries(schema).flatMap(([field, rules]) =>
    validateField(field, req.body[field], rules)
  );

  if (errors.length) {
    return res.status(400).json({ error: 'Datos inválidos', detalles: errors });
  }

  // Solo se conservan los campos definidos en el esquema (descarta campos extra)
  const clean = {};
  Object.keys(schema).forEach((field) => {
    clean[field] = typeof req.body[field] === 'string' ? req.body[field].trim() : req.body[field];
  });
  req.body = clean;

  return next();
};

const validateId = (param = 'id') => (req, res, next) => {
  const raw = req.params[param];
  if (!/^[1-9]\d*$/.test(raw)) {
    return res
      .status(400)
      .json({ error: `El parámetro '${param}' debe ser un entero positivo`, valor: raw });
  }
  return next();
};

module.exports = { validateBody, validateId };
