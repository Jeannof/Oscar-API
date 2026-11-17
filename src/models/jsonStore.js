// ÚNICO lugar del proyecto que usa el sistema de archivos (fs) para los datos.
const fs = require('fs/promises');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');

const readData = async (fileName) => {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content.trim() ? JSON.parse(content) : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
};

const writeData = async (fileName, data) => {
  const filePath = path.join(DATA_DIR, fileName);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Siguiente id incremental a partir de un campo (id, idAsignacion, ...)
const nextId = (items, field = 'id') =>
  items.length ? Math.max(...items.map((i) => i[field])) + 1 : 1;

module.exports = { readData, writeData, nextId };
