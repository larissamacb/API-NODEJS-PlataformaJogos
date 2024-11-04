const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5 MB para cada arquivo
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo inválido. Apenas JPEG é permitido.'));
    }
  },
});

module.exports = upload;
