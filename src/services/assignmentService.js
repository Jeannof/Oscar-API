const assignmentModel = require('../models/assignmentModel');
const pilotModel = require('../models/pilotModel');
const airplaneModel = require('../models/airplaneModel');
const AppError = require('../utils/AppError');

// Validaciones relacionales: el piloto y el avión deben existir y
// el piloto no puede tener dos vuelos el mismo día.
const validateRelations = async (data, ignoreId = null) => {
  const pilot = await pilotModel.findById(data.idPiloto);
  if (!pilot) throw new AppError(`El piloto con id ${data.idPiloto} no existe`, 404);

  const airplane = await airplaneModel.findById(data.idAvion);
  if (!airplane) throw new AppError(`El avión con id ${data.idAvion} no existe`, 404);

  const pilotAssignments = await assignmentModel.findByPilot(data.idPiloto);
  const conflict = pilotAssignments.find(
    (a) => a.fechaVuelo === data.fechaVuelo && a.idAsignacion !== ignoreId
  );
  if (conflict) {
    throw new AppError(
      `El piloto ${data.idPiloto} ya tiene una asignación el ${data.fechaVuelo}`,
      409
    );
  }
};

const getAllAssignments = async () => assignmentModel.findAll();

const getAssignmentById = async (id) => {
  const assignment = await assignmentModel.findById(id);
  if (!assignment) throw new AppError(`No existe una asignación con id ${id}`, 404);
  return assignment;
};

const createAssignment = async (data) => {
  await validateRelations(data);
  return assignmentModel.save(data);
};

const updateAssignment = async (id, data) => {
  await getAssignmentById(id);
  await validateRelations(data, id);
  return assignmentModel.update(id, data);
};

const deleteAssignment = async (id) => {
  await getAssignmentById(id);
  return assignmentModel.remove(id);
};

module.exports = {
  getAllAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
