const express = require('express');
const router = express.Router();
const multer = require('multer');
const fotoPerfilController = require('../controllers/fotoPerfilController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', fotoPerfilController.getAllFotoPerfil);

router.get('/usuario/:id', fotoPerfilController.getFotoPerfilByUsuarioId);

// Rota para upload da foto de perfil
router.post('/upload/:id', upload.single('foto'), fotoPerfilController.uploadFotoPerfil);

router.delete('/:id', fotoPerfilController.deletarFotoPerfil);

router.put('/atualizar/:id', fotoPerfilController.atualizarFotoPerfil);

module.exports = router;
