const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

router.get('/getformas/:id', pagamentoController.getFormasPagamentoByUsuarioId);

/* Rota pra cadastrar nova forma de pagamento 
Exemplo de requisição:
{
  "id_usuario": 7,
  "id_tipo_pagamento": 5,
  "numero_cartao": "1234567812345678",
  "nome_no_cartao": "João Paulo",
  "cvv": "321"
} 
*/
router.post('/novaforma', pagamentoController.cadastrarFormaPagamento);

router.delete('/forma/delete/:id', pagamentoController.deletarFormaPagamento);

router.post('/', pagamentoController.criarPagamento);

router.get('/:id', pagamentoController.getPagamentosByUsuarioId);

module.exports = router;