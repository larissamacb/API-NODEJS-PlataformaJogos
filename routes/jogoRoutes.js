const express = require('express');
const router = express.Router();
const jogoController = require('../controllers/jogoController');

router.get('/', jogoController.getAllJogos);
router.get('/:id', jogoController.getJogoById)

/* Todas essas rotas retornam um array com objetos de jogo com os seguintes atributos:
jogo_iD
nome_jogo
data_lancamento
classificacao_etaria
descricao
avaliacao_media
foto_url
video_url
generos (em um array)
*/

// Filtro pelo nome do gênero. Deve ter a acentuação correta, mas não é case sensitive
router.get('/genero/:nome', jogoController.getJogosByGenero);

// Filtro por avaliação (formato 4.5)
router.get('/avaliacao/:avaliacao', jogoController.getJogosByAvaliacao);

// Filtro pra ordem alfabética
router.get('/alfabetica', jogoController.getJogosByOrdem);

// Filtro pelo nome do plano. Deve ter a acentuação correta, mas não é case sensitive
router.get('/plano/:nome', jogoController.getJogosByPlano);

module.exports = router;
