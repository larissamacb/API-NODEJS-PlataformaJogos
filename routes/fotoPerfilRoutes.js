const express = require('express');
const router = express.Router();
const multer = require('multer');
const fotoPerfilController = require('../controllers/fotoPerfilController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/usuario/:id', fotoPerfilController.getFotoPerfilByUsuarioId);
// Rota para upload da foto de perfil
router.post('/upload/foto-perfil', upload.single('foto'), fotoPerfilController.uploadFotoPerfil);

module.exports = router;
