// backend/routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + '-' + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
  const { filename, path } = req.file;
  res.json({ filename, path });
});

module.exports = router;