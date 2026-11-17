const { Router } = require('express');
const airplaneController = require('../controllers/airplaneController');
const { validateBody, validateId } = require('../middlewares/validate');
const { airplaneSchema } = require('../middlewares/schemas');

const router = Router();

router.get('/', airplaneController.getAirplanes);
router.get('/:id', validateId(), airplaneController.getAirplane);
router.post('/', validateBody(airplaneSchema), airplaneController.createAirplane);
router.put('/:id', validateId(), validateBody(airplaneSchema), airplaneController.updateAirplane);
router.delete('/:id', validateId(), airplaneController.deleteAirplane);

module.exports = router;
