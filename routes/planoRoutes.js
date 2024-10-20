const express = require('express');
const router = express.Router();
const planoController = require('../controllers/planoController');

router.get('/', planoController.getAllPlanos);

module.exports = router;
