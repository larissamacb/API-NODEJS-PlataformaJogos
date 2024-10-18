const express = require('express');
const router = express.Router();
const jogoController = require('../controllers/jogoController');

router.get('/', jogoController.getAllJogos);
router.get('/:id', jogoController.getJogoById)

// Filtro pelo nome do gênero. Deve ter a acentuação correta, mas não é case sensitive
router.get('/genero/:nome', jogoController.getJogosByGenero);

// Filtro por avaliação (formato 4.5)
router.get('/avaliacao/:avaliacao', jogoController.getJogosByAvaliacao);

// Filtro pra ordem alfabética
router.get('/por/ordem', jogoController.getJogosByOrdem);

// Retorna um array com todas as informações de um jogo de um determinado plano com base no id dele
router.get('/plano/:id', jogoController.getJogosByPlano);

module.exports = router;
