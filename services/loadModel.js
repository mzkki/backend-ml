const tf = require('@tensorflow/tfjs-node');

const loadModel = async () => {
  return tf.loadGraphModel(process.env.MODEL_PATH);
}

module.exports = loadModel;