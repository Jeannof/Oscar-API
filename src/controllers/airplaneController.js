const airplaneService = require('../services/airplaneService');

const handleError = (res, error) =>
  res.status(error.status || 500).json({ error: error.message });

const getAirplanes = async (req, res) => {
  try {
    return res.status(200).json(await airplaneService.getAllAirplanes());
  } catch (error) {
    return handleError(res, error);
  }
};

const getAirplane = async (req, res) => {
  try {
    return res.status(200).json(await airplaneService.getAirplaneById(Number(req.params.id)));
  } catch (error) {
    return handleError(res, error);
  }
};

const createAirplane = async (req, res) => {
  try {
    const newAirplane = await airplaneService.registerAirplane(req.body);
    return res.status(201).json(newAirplane);
  } catch (error) {
    return handleError(res, error);
  }
};

const updateAirplane = async (req, res) => {
  try {
    const updated = await airplaneService.updateAirplane(Number(req.params.id), req.body);
    return res.status(200).json(updated);
  } catch (error) {
    return handleError(res, error);
  }
};

const deleteAirplane = async (req, res) => {
  try {
    const removed = await airplaneService.deleteAirplane(Number(req.params.id));
    return res.status(200).json({ message: 'Avión eliminado', avion: removed });
  } catch (error) {
    return handleError(res, error);
  }
};

module.exports = { getAirplanes, getAirplane, createAirplane, updateAirplane, deleteAirplane };
