import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
  } from 'firebase/firestore';

import Lecturer from '@/app/(server)/models/Lecturer';
import { firestore } from '../config';
import { addData, deleteData, deleteFile, getData, getDownloadURLForFile, updateData, uploadFile } from './firestore';
  
  
// Create a new lecturer
export async function addLecturer(lecturer: Lecturer, pictureFile: File): Promise<string | null> {
  try {
    const collectionName = 'lecturers';

    // Upload lecturer's picture
    const storagePath = `lecturers/${lecturer.name}/profileImage`;
    await uploadFile(storagePath, pictureFile);
    lecturer.profileImageURL = await getDownloadURLForFile(storagePath);

    const lecturerId = await addData(collectionName, lecturer);
    return lecturerId;
  } catch (error) {
    console.error('Error adding lecturer: ', error);
    return null;
  }
}
  
  
// Read all lecturers
export async function getAllLecturers(): Promise<Lecturer[]> {
  try {
    const lecturers: Lecturer[] = [];
    const querySnapshot = await getDocs(collection(firestore, 'lecturers'));

    for (const doc of querySnapshot.docs) {
      const lecturerData = { id: doc.id, ...doc.data() } as Lecturer;

      const storagePath = `lecturers/${lecturerData.name}/profileImage`;
      lecturerData.profileImageURL = await getDownloadURLForFile(storagePath) || '';

      lecturers.push(lecturerData);
    }

    return lecturers;
  } catch (error) {
    console.error('Error getting lecturers:', error);
    throw error;
  }
}
  
  // Read a single lecturer by ID
export async function getLecturer(lecturerId: string): Promise<Lecturer | null> {
  try {
    const lecturer = await getData('lecturers', lecturerId);
    return lecturer as Lecturer;
  } catch (error) {
    console.error('Error getting lecturer: ', error);
    return null;
  }
}
  
// Update Lecturer with Profile Image (replacing previous image)
export async function updateLecturerById(lecturer: Lecturer, newData: Partial<Lecturer>, profileImageFile: File | null): Promise<boolean> {
    try {      
      if (profileImageFile) {
        const storagePath = `lecturers/${lecturer.name}/profileImage`;
        await uploadFile(storagePath, profileImageFile);
        newData.profileImageURL = await getDownloadURLForFile(storagePath);
      }
      return await updateData('lecturers', lecturer.id, newData);
    } catch (error) {
      console.error('Error updating lecturer with image: ', error);
      return false;
    }
  }
  
// Delete a lecturer by ID
export async function deleteLecturerById(id: string): Promise<void> {
  try {
    const lecturerData = await getData('lecturers', id);

    if (lecturerData && lecturerData.profileImageURL) {
      await deleteFile(lecturerData.profileImageURL);
    }
    await deleteData('lecturers', id);
  } catch (error) {
    console.error('Error deleting lecturer by ID:', error);
    throw error;
  }
}
  