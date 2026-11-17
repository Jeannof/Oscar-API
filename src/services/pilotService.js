const pilotModel = require('../models/pilotModel');
const assignmentModel = require('../models/assignmentModel');
const AppError = require('../utils/AppError');

const getAllPilots = async () => pilotModel.findAll();

const getPilotById = async (id) => {
  const pilot = await pilotModel.findById(id);
  if (!pilot) throw new AppError(`No existe un piloto con id ${id}`, 404);
  return pilot;
};

const registerPilot = async (pilotData) => {
  if (!pilotData.licencia) throw new AppError('La licencia es obligatoria', 400);
  if (await pilotModel.findByLicense(pilotData.licencia)) {
    throw new AppError(`Ya existe un piloto con la licencia ${pilotData.licencia}`, 409);
  }
  return pilotModel.save(pilotData);
};

const updatePilot = async (id, pilotData) => {
  await getPilotById(id);
  const sameLicense = await pilotModel.findByLicense(pilotData.licencia);
  if (sameLicense && sameLicense.id !== id) {
    throw new AppError(`Ya existe un piloto con la licencia ${pilotData.licencia}`, 409);
  }
  return pilotModel.update(id, pilotData);
};

const deletePilot = async (id) => {
  await getPilotById(id);
  const assignments = await assignmentModel.findByPilot(id);
  if (assignments.length > 0) {
    throw new AppError(
      `No se puede eliminar el piloto ${id}: tiene ${assignments.length} asignación(es) registrada(s)`,
      409
    );
  }
  return pilotModel.remove(id);
};

module.exports = { getAllPilots, getPilotById, registerPilot, updatePilot, deletePilot };
