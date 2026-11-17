const assignmentService = require('../services/assignmentService');

const handleError = (res, error) =>
  res.status(error.status || 500).json({ error: error.message });

const getAssignments = async (req, res) => {
  try {
    return res.status(200).json(await assignmentService.getAllAssignments());
  } catch (error) {
    return handleError(res, error);
  }
};

const getAssignment = async (req, res) => {
  try {
    return res
      .status(200)
      .json(await assignmentService.getAssignmentById(Number(req.params.id)));
  } catch (error) {
    return handleError(res, error);
  }
};

const createAssignment = async (req, res) => {
  try {
    const created = await assignmentService.createAssignment(req.body);
    return res.status(201).json(created);
  } catch (error) {
    return handleError(res, error);
  }
};

const updateAssignment = async (req, res) => {
  try {
    const updated = await assignmentService.updateAssignment(Number(req.params.id), req.body);
    return res.status(200).json(updated);
  } catch (error) {
    return handleError(res, error);
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const removed = await assignmentService.deleteAssignment(Number(req.params.id));
    return res.status(200).json({ message: 'Asignación eliminada', asignacion: removed });
  } catch (error) {
    return handleError(res, error);
  }
};

module.exports = {
  getAssignments,
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
