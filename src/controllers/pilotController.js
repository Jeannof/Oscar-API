const pilotService = require('../services/pilotService');

const handleError = (res, error) =>
  res.status(error.status || 500).json({ error: error.message });

const getPilots = async (req, res) => {
  try {
    return res.status(200).json(await pilotService.getAllPilots());
  } catch (error) {
    return handleError(res, error);
  }
};

const getPilot = async (req, res) => {
  try {
    return res.status(200).json(await pilotService.getPilotById(Number(req.params.id)));
  } catch (error) {
    return handleError(res, error);
  }
};

const createPilot = async (req, res) => {
  try {
    const newPilot = await pilotService.registerPilot(req.body);
    return res.status(201).json(newPilot);
  } catch (error) {
    return handleError(res, error);
  }
};

const updatePilot = async (req, res) => {
  try {
    const updated = await pilotService.updatePilot(Number(req.params.id), req.body);
    return res.status(200).json(updated);
  } catch (error) {
    return handleError(res, error);
  }
};

const deletePilot = async (req, res) => {
  try {
    const removed = await pilotService.deletePilot(Number(req.params.id));
    return res.status(200).json({ message: 'Piloto eliminado', piloto: removed });
  } catch (error) {
    return handleError(res, error);
  }
};

module.exports = { getPilots, getPilot, createPilot, updatePilot, deletePilot };
