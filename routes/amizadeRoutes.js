const express = require('express');
const router = express.Router();
const amizadeController = require('../controllers/amizadeController');

// Busca todas as amizades de um usuário a partir de seu identificador
router.get('/:id', amizadeController.getAllAmizades);

/* Busca todas as solicitações de amizade pendentes de um usuário pelo id do 
usuário, retornando id da solicitação, id, nome, identificador e foto de perfil
do usuário solicitante */
router.get('/pendentes/:id', amizadeController.getSolicitacoesPendentes);

/* Envia uma solicitação de amizade. Precisa ser enviado no corpo da requisição
um JSON com os ids dos dois usuários
Exemplo:
{
  "id_usuario_solicitante": 1,
  "id_usuario_destinatario": 2
}
*/
router.post('/solicitar', amizadeController.solicitarAmizade);

/* Precisa do id da solicitação (no :id) e de uma requisição JSON apenas com o
novo status (aceito ou rejeitado)
Exemplo:
{
    "status": "aceito"
}
*/
router.put('/:id/responder', amizadeController.responderSolicitacao);

router.get('/verificar/:id_usuario1/:id_usuario2', amizadeController.verificarAmizade);

module.exports = router;
