import firestore from '@react-native-firebase/firestore';

const addDocument = async (collectionName, data) => {
  try {
    const docRef = await firestore().collection(collectionName).add(data);
    return docRef;
  } catch (error) {
    throw error;
  }
};
const updateDocument = async (collectionName, docId, data) => {
  try {
    await firestore().collection(collectionName).doc(docId).update(data);
  } catch (error) {
    throw error;
  }
};
const deleteDocument = async (collectionName, docId) => {
  try {
    await firestore().collection(collectionName).doc(docId).delete();
  } catch (error) {
    throw error;
  }
};
const getDocument = async (collectionName, filters = [], docId = '') => {
  try {
    let query;
    if (docId) {
      // If docId is provided, get the document directly
      const documentSnapshot = await firestore()
        .collection(collectionName)
        .doc(docId)
        .get();
      if (!documentSnapshot.exists) {
        throw new Error(`Document with ID ${docId} does not exist.`);
      }
      return {id: documentSnapshot.id, ...documentSnapshot.data()};
    } else {
      query = firestore().collection(collectionName);
      if (filters.length) {
        filters.forEach(filter => {
          const {field, operator, value} = filter;
          query = query.where(field, operator, value);
        });
      }
      const querySnapshot = await query.get();
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      return documents[0]; // Return an array of documents
    }
  } catch (error) {
    console.error('Error fetching document(s):', error);
    throw error;
  }
};

const createFireStoreDate = firestore.FieldValue.serverTimestamp();
export {
  createFireStoreDate,
  getDocument,
  addDocument,
  updateDocument,
  deleteDocument,
};
