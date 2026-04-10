import { db } from '../firebase';
import { doc, getDoc, setDoc, collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Singleton collections reference
export const getSectionData = async (sectionName) => {
  try {
    const docRef = doc(db, 'portfolio', sectionName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${sectionName}:`, error);
    return null;
  }
};

export const updateSectionData = async (sectionName, data) => {
  try {
    const docRef = doc(db, 'portfolio', sectionName);
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (error) {
    console.error(`Error updating ${sectionName}:`, error);
    return false;
  }
};

// Collection fetching
export const getCollectionData = async (colName) => {
  try {
    const querySnapshot = await getDocs(collection(db, colName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error fetching collection ${colName}:`, error);
    return [];
  }
};

export const addCollectionItem = async (colName, data) => {
  try {
    const docRef = await addDoc(collection(db, colName), data);
    return docRef.id;
  } catch (error) {
    console.error(`Error adding to ${colName}:`, error);
    return null;
  }
};

export const updateCollectionItem = async (colName, id, data) => {
  try {
    const docRef = doc(db, colName, id);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error(`Error updating item in ${colName}:`, error);
    return false;
  }
};

export const deleteCollectionItem = async (colName, id) => {
  try {
    const docRef = doc(db, colName, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting item from ${colName}:`, error);
    return false;
  }
};
