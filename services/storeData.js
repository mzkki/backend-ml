const { Firestore } = require('@google-cloud/firestore');

const storeData = async (id, data) => {
  const db = new Firestore();

  const predictCollection = db.collection('prediction');
  return predictCollection.doc(id).set(data);
}

module.exports = storeData;