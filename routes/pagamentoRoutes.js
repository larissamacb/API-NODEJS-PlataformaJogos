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
  "cvv": "321",
  "validade": "03/27"
} 
*/
router.post('/novaforma', pagamentoController.cadastrarFormaPagamento);

// Deleta uma forma de pagamento pelo id dela
router.delete('/forma/delete/:id', pagamentoController.deletarFormaPagamento);

/* Exemplo de requisição
{
  "id_usuario": 1,
  "id_forma_pagamento": 2,
  "id_plano": 3,
  "id_tipo_pagamento": null
}
*/
router.post('/', pagamentoController.criarPagamento);

// Pega informações de todos os pagamentos de um usuário pelo id dele
router.get('/:id', pagamentoController.getPagamentosByUsuarioId);

module.exports = router;