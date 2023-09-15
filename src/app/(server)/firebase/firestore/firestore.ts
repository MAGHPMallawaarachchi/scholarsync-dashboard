import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { storage, firestore, auth } from '../config';

// Firestore CRUD Operations

// Create (Add) Data
async function addData(collectionName: string, data: any) {
    try {
        const collectionRef = collection(firestore, collectionName);
        const newDocRef = doc(collectionRef); // Create a new document reference with an auto-generated ID
        data.id = newDocRef.id; // Include the ID in the data
        await setDoc(newDocRef, data);
        return newDocRef.id;
    } catch (error) {
        console.error('Error adding document: ', error);
        return null;
    }
}

// Read Data
async function getData(collectionName: string, documentId: string) {
  try {
    const docRef = doc(firestore, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document: ', error);
    return null;
  }
}

// Update Data
async function updateData(collectionName: string, documentId: string, newData: any) {
  try {
    const docRef = doc(firestore, collectionName, documentId);
    await updateDoc(docRef, newData);
    console.log('Document successfully updated!');
    return true;
  } catch (error) {
    console.error('Error updating document: ', error);
    return false;
  }
}

// Delete Data
async function deleteData(collectionName: string, documentId: string) {
  try {
    const docRef = doc(firestore, collectionName, documentId);
    await deleteDoc(docRef);
    console.log('Document successfully deleted!');
    return true;
  } catch (error) {
    console.error('Error deleting document: ', error);
    return false;
  }
}

// Firebase Storage Operations

// Upload File
async function uploadFile(storagePath: string, file: File) {
  try {
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file);
    console.log('File uploaded successfully!');
    return true;
  } catch (error) {
    console.error('Error uploading file: ', error);
    return false;
  }
}

// Get Download URL for a File
async function getDownloadURLForFile(storagePath: string) {
  try {
    const storageRef = ref(storage, storagePath);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error getting download URL: ', error);
    return '';
  }
}

// Delete File
async function deleteFile(storagePath: string) {
  try {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
    console.log('File deleted successfully!');
    return true;
  } catch (error) {
    console.error('Error deleting file: ', error);
    return false;
  }
}

export { addData, getData, updateData, deleteData, uploadFile, getDownloadURLForFile, deleteFile };
