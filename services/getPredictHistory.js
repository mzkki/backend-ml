const { Firestore } = require('@google-cloud/firestore');

const getPredictHistory = async () => {
  const db = new Firestore();

  const predictCollection = db.collection('prediction');

  try {
    const snapshot = await predictCollection.get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return [];
    }

    const history = [];
    snapshot.forEach(doc => {
      history.push({ id: doc.id, history: { id: doc.id, ...doc.data() } });
    });

    return history;
  } catch (error) {
    console.error('Error fetching prediction history:', error);
    throw new Error('Failed to fetch prediction history');
  }
};

module.exports = getPredictHistory;
