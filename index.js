require('dotenv').config();
const express = require('express');
const router = require('./routes');
const cors = require('cors');
const { notFoundHandler, errorHandler } = require('./utils/responseHandler');
const loadModel = require('./services/loadModel');

const app = express();
app.use(cors("*"));
const port = process.env.PORT || 3000;

async function initialize() {
  const model = await loadModel();
  app.locals.model = model;

  console.log('Model loaded successfully');
}

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
})

app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);

initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});