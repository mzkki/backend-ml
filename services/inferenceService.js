const tf = require("@tensorflow/tfjs-node");

const predictCancer = async (model, imageBuffer) => {
  // Decode the image buffer into a tensor
  const tensor = tf.node
    .decodeImage(imageBuffer) // Automatically detects JPEG/PNG
    .resizeNearestNeighbor([224, 224]) // Resize to match model input
    .expandDims()
    .toFloat()

  // Perform the prediction
  const prediction = model.predict(tensor);
  const probabilities = await prediction.data();
  console.log(probabilities);
  const result = probabilities[0] > 0.5 ? "Cancer" : "Non-cancer";

  const suggestion = result === 'Cancer' ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.';

  return {
    result,
    suggestion
  };
};

module.exports = predictCancer;
