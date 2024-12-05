const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");

const predictCancer = async (model, filePath) => {
  try {
    const imageBuffer = fs.readFileSync(filePath);

    const tensor = tf.node
      .decodeImage(imageBuffer)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()

    const prediction = model.predict(tensor);
    const probabilities = await prediction.data();
    const result = probabilities[0] > 0.5 ? "Cancer" : "Non-cancer";

    const suggestion = result === 'Cancer' ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.';

    return {
      result,
      suggestion
    };
  } catch (e) {
    fs.unlinkSync(filePath);
  }
};

module.exports = predictCancer;
