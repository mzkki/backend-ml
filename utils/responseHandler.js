const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.code == 'MISSING_FILE') {
    res.status(err.httpStatusCode).json({
      status: 'fail',
      message: err.message
    })
  } else if (err.code == 'LIMIT_FILE_SIZE') {
    res.status(413).json({
      status: 'fail',
      message: 'Payload content length greater than maximum allowed: 1000000'
    })
  }
  else {
    res.status(400).json({
      status: 'fail',
      message: 'Terjadi kesalahan dalam melakukan prediksi'
    });
  }
}

const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Not Found'
  });
}

module.exports = { errorHandler, notFoundHandler };