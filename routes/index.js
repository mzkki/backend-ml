const express = require('express');
const Multer = require('multer');
const { predict } = require('../controllers/PredictController');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: 1000000 }
});
const router = express.Router();

router.post('/predict', multer.single('image'), predict)


module.exports = router;