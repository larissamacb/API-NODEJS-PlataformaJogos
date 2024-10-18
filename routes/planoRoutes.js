const express = require('express');
const router = express.Router();
const planoController = require('../controllers/planoController');

router.get('/', planoController.getAllPlanos);
router.post('/', planoController.createPlano);
router.get('/:id', planoController.getPlanoById);
router.put('/:id', planoController.updatePlano);
router.delete('/:id', planoController.deletePlano);

module.exports = router;
