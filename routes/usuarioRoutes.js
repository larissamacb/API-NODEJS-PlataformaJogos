const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

/* 
Rota para criar um novo usuário.
A data deve ir no formato YYYY-MM-DD
Os atributos plano e foto de perfil não são especificados inicialmente,
já vão com valores default pro banco de dados

Exemplo:
{
    "nome": "larissa maciel",
    "identificador": "aliras",
    "senha": "larissinha", 
    "email": "larissa@gmail.com",
    "data_nascimento": "2005-03-01"
}
*/
router.post('/', usuarioController.criarUsuario);

// Rota para login do usuário (autenticação)
// Pede identificador/username e senha
router.post('/login', usuarioController.loginUsuario);

// Rota para consultar um usuário pelo identificador (username)
router.get('/:id', usuarioController.consultarUsuario);

/* Rota para atualizar informações do usuário 
(nome, identificador, email, data de nascimento, foto de perfil)
Exemplo:
{
    "nome": "larissa maciel",
    "identificador": "aliras",
    "email": "larissa@gmail.com"
}
*/
router.put('/:id', usuarioController.atualizarUsuario);

/* Rota específica para atualizar a senha do usuário
Exemplo:
{
  "senhaAtual": "larissinha",
  "novaSenha": "larissinha1"
}
*/
router.put('/:id/senha', usuarioController.atualizarSenha);

/* Rota para deletar um usuário (com verificação de senha)
Exemplo:
{
  "senha": "larissinha1"
}
*/
router.delete('/:id', usuarioController.deletarUsuario);

module.exports = router;
