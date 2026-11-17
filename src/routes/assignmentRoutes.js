const { Router } = require('express');
const assignmentController = require('../controllers/assignmentController');
const { validateBody, validateId } = require('../middlewares/validate');
const { assignmentSchema } = require('../middlewares/schemas');

const router = Router();

router.get('/', assignmentController.getAssignments);
router.get('/:id', validateId(), assignmentController.getAssignment);
router.post('/', validateBody(assignmentSchema), assignmentController.createAssignment);
router.put(
  '/:id',
  validateId(),
  validateBody(assignmentSchema),
  assignmentController.updateAssignment
);
router.delete('/:id', validateId(), assignmentController.deleteAssignment);

module.exports = router;
