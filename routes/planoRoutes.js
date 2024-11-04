const express = require('express');
const router = express.Router();
const planoController = require('../controllers/planoController');

router.get('/', planoController.getAllPlanos);
router.get('/:id', planoController.getPlanoById);

module.exports = router;
