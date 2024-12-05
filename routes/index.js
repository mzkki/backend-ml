const express = require('express');
const Multer = require('multer');
const { predict, histories } = require('../controllers/PredictController');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: 1000000 }
});
const router = express.Router();

router.post('/predict', multer.single('image'), predict)
router.get('/predict/histories', histories)


module.exports = router;