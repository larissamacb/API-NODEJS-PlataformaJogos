const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const midiaJogoController = require('../controllers/midiaJogoController');

router.post('/upload/:idJogo', upload.single('file'), midiaJogoController.uploadMidiaJogo);
router.get('/video/:idJogo', midiaJogoController.getVideoByJogoId);
router.get('/foto/:idJogo', midiaJogoController.getFotoByJogoId);

module.exports = router;
