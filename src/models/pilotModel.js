const { readData, writeData, nextId } = require('./jsonStore');

const FILE = 'pilots.json';

const findAll = async () => readData(FILE);

const findById = async (id) => {
  const pilots = await readData(FILE);
  return pilots.find((p) => p.id === id) || null;
};

const findByLicense = async (licencia) => {
  const pilots = await readData(FILE);
  return pilots.find((p) => p.licencia.toLowerCase() === licencia.toLowerCase()) || null;
};

const save = async (pilotData) => {
  const pilots = await readData(FILE);
  const newPilot = { id: nextId(pilots), ...pilotData };
  pilots.push(newPilot);
  await writeData(FILE, pilots);
  return newPilot;
};

const update = async (id, pilotData) => {
  const pilots = await readData(FILE);
  const index = pilots.findIndex((p) => p.id === id);
  if (index === -1) return null;
  pilots[index] = { id, ...pilotData };
  await writeData(FILE, pilots);
  return pilots[index];
};

const remove = async (id) => {
  const pilots = await readData(FILE);
  const index = pilots.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const [removed] = pilots.splice(index, 1);
  await writeData(FILE, pilots);
  return removed;
};

module.exports = { findAll, findById, findByLicense, save, update, remove };
