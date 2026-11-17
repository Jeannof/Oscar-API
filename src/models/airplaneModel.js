const { readData, writeData, nextId } = require('./jsonStore');

const FILE = 'airplanes.json';

const findAll = async () => readData(FILE);

const findById = async (id) => {
  const airplanes = await readData(FILE);
  return airplanes.find((a) => a.id === id) || null;
};

const findByRegistration = async (matricula) => {
  const airplanes = await readData(FILE);
  return airplanes.find((a) => a.matricula.toLowerCase() === matricula.toLowerCase()) || null;
};

const save = async (airplaneData) => {
  const airplanes = await readData(FILE);
  const newAirplane = { id: nextId(airplanes), ...airplaneData };
  airplanes.push(newAirplane);
  await writeData(FILE, airplanes);
  return newAirplane;
};

const update = async (id, airplaneData) => {
  const airplanes = await readData(FILE);
  const index = airplanes.findIndex((a) => a.id === id);
  if (index === -1) return null;
  airplanes[index] = { id, ...airplaneData };
  await writeData(FILE, airplanes);
  return airplanes[index];
};

const remove = async (id) => {
  const airplanes = await readData(FILE);
  const index = airplanes.findIndex((a) => a.id === id);
  if (index === -1) return null;
  const [removed] = airplanes.splice(index, 1);
  await writeData(FILE, airplanes);
  return removed;
};

module.exports = { findAll, findById, findByRegistration, save, update, remove };
