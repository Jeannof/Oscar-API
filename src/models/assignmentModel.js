const { readData, writeData, nextId } = require('./jsonStore');

const FILE = 'assignments.json';
const ID = 'idAsignacion';

const findAll = async () => readData(FILE);

const findById = async (idAsignacion) => {
  const assignments = await readData(FILE);
  return assignments.find((a) => a[ID] === idAsignacion) || null;
};

const findByPilot = async (idPiloto) => {
  const assignments = await readData(FILE);
  return assignments.filter((a) => a.idPiloto === idPiloto);
};

const findByAirplane = async (idAvion) => {
  const assignments = await readData(FILE);
  return assignments.filter((a) => a.idAvion === idAvion);
};

const save = async (assignmentData) => {
  const assignments = await readData(FILE);
  const newAssignment = { [ID]: nextId(assignments, ID), ...assignmentData };
  assignments.push(newAssignment);
  await writeData(FILE, assignments);
  return newAssignment;
};

const update = async (idAsignacion, assignmentData) => {
  const assignments = await readData(FILE);
  const index = assignments.findIndex((a) => a[ID] === idAsignacion);
  if (index === -1) return null;
  assignments[index] = { [ID]: idAsignacion, ...assignmentData };
  await writeData(FILE, assignments);
  return assignments[index];
};

const remove = async (idAsignacion) => {
  const assignments = await readData(FILE);
  const index = assignments.findIndex((a) => a[ID] === idAsignacion);
  if (index === -1) return null;
  const [removed] = assignments.splice(index, 1);
  await writeData(FILE, assignments);
  return removed;
};

module.exports = { findAll, findById, findByPilot, findByAirplane, save, update, remove };
