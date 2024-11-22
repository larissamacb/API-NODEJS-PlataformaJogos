const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');

router.get('/:id', avaliacaoController.getAllAvaliacoesByJogoId);
router.get('/usuario/:id', avaliacaoController.getAvaliacoesByUsuarioId);

/* Exemplo de requisição:
{
    "id_usuario": 7, 
    "id_jogo": 5, 
    "nota": , 
    "comentario"
}
*/
router.post('/', avaliacaoController.createAvaliacao);
router.delete('/delete/:id', avaliacaoController.deleteAvaliacao);

module.exports = router;
