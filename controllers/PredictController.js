const predictCancer = require("../services/inferenceService");
const fs = require('fs');
const crypto = require('crypto');
const storeData = require("../services/storeData");

const predict = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error('File image tidak ditemukan');
      error.code = 'MISSING_FILE'
      error.httpStatusCode = 400;
      return next(error);
    }

    const filePath = Date.now() + '-' + req.file.originalname;

    fs.writeFileSync(filePath, req.file.buffer);
    const model = req.app.locals.model;
    const { result, suggestion } = await predictCancer(model, filePath)
    fs.unlinkSync(filePath);

    const id = crypto.randomUUID()
    const createdAt = new Date().toISOString()

    await storeData(id, { result, suggestion, createdAt })

    res.status(200).json({
      status: 'success',
      message: 'Model is predicted successfully',
      data: {
        id,
        result,
        suggestion,
        createdAt: createdAt
      }
    })
  } catch (e) {
    next(e);
  }
}

module.exports = { predict };