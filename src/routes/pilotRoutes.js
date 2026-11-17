const { Router } = require('express');
const pilotController = require('../controllers/pilotController');
const { validateBody, validateId } = require('../middlewares/validate');
const { pilotSchema } = require('../middlewares/schemas');

const router = Router();

router.get('/', pilotController.getPilots);
router.get('/:id', validateId(), pilotController.getPilot);
router.post('/', validateBody(pilotSchema), pilotController.createPilot);
router.put('/:id', validateId(), validateBody(pilotSchema), pilotController.updatePilot);
router.delete('/:id', validateId(), pilotController.deletePilot);

module.exports = router;
