const express = require('express');
const router = express.Router();
const dispositivoController = require('../controllers/dispositivoController');

/* Exemplo de corpo da requisição:
{
  "nome": "Meu PC",
  "idTipoDispositivo": 1
}
*/
router.post('/usuario/:idUsuario', dispositivoController.criarDispositivo);

// Rota para consultar dispositivos cadastrados pelo usuário. Retorna id, nome, tipo e id do usuário
router.get('/usuario/:idUsuario', dispositivoController.consultarDispositivos);

/* O id na rota é o do dispositivo.
Exemplo de corpo da requisição:
{
  "nome": "Novo Nome"
}
*/
router.put('/:id', dispositivoController.editarDispositivo);

// Rota para excluir um dispositivo (usa o id do dispositivo)
router.delete('/:id', dispositivoController.excluirDispositivo);

module.exports = router;
