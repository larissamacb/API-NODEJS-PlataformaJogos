const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');

router.get('/:id', avaliacaoController.getAllAvaliacoesByJogoId);
router.get('/usuario/:id', avaliacaoController.getAvaliacoesByUsuarioId);
router.post('/create', avaliacaoController.createAvaliacao);
router.delete('/delete/:id', avaliacaoController.deleteAvaliacao);

module.exports = router;
