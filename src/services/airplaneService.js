const airplaneModel = require('../models/airplaneModel');
const assignmentModel = require('../models/assignmentModel');
const AppError = require('../utils/AppError');

const getAllAirplanes = async () => airplaneModel.findAll();

const getAirplaneById = async (id) => {
  const airplane = await airplaneModel.findById(id);
  if (!airplane) throw new AppError(`No existe un avión con id ${id}`, 404);
  return airplane;
};

const registerAirplane = async (airplaneData) => {
  if (await airplaneModel.findByRegistration(airplaneData.matricula)) {
    throw new AppError(`Ya existe un avión con la matrícula ${airplaneData.matricula}`, 409);
  }
  return airplaneModel.save(airplaneData);
};

const updateAirplane = async (id, airplaneData) => {
  await getAirplaneById(id);
  const same = await airplaneModel.findByRegistration(airplaneData.matricula);
  if (same && same.id !== id) {
    throw new AppError(`Ya existe un avión con la matrícula ${airplaneData.matricula}`, 409);
  }
  return airplaneModel.update(id, airplaneData);
};

const deleteAirplane = async (id) => {
  await getAirplaneById(id);
  const assignments = await assignmentModel.findByAirplane(id);
  if (assignments.length > 0) {
    throw new AppError(
      `No se puede eliminar el avión ${id}: tiene ${assignments.length} asignación(es) registrada(s)`,
      409
    );
  }
  return airplaneModel.remove(id);
};

module.exports = { getAllAirplanes, getAirplaneById, registerAirplane, updateAirplane, deleteAirplane };
