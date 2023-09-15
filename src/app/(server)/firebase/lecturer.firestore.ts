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
import { firestore } from './config';
  
  
  // Create a new lecturer
  export async function createLecturer(lecturer: Lecturer): Promise<void> {
    try {
      // Add a new document to the "lecturers" collection
      await addDoc(collection(firestore, 'lecturers'), lecturer);
    } catch (error) {
      console.error('Error creating lecturer:', error);
      throw error;
    }
  }
  
  // Read all lecturers
  export async function getAllLecturers(): Promise<Lecturer[]> {
    try {
      const lecturers: Lecturer[] = [];
      const querySnapshot = await getDocs(collection(firestore, 'lecturers'));
  
      querySnapshot.forEach((doc) => {
        lecturers.push({ id: doc.id, ...doc.data() } as Lecturer);
      });
  
      return lecturers;
    } catch (error) {
      console.error('Error getting lecturers:', error);
      throw error;
    }
  }
  
  // Read a single lecturer by ID
  export async function getLecturerById(id: string): Promise<Lecturer | null> {
    try {
      const docSnapshot = await getDoc(doc(firestore, 'lecturers', id));
  
      if (docSnapshot.exists()) {
        return { id: docSnapshot.id, ...docSnapshot.data() } as Lecturer;
      }
  
      return null;
    } catch (error) {
      console.error('Error getting lecturer by ID:', error);
      throw error;
    }
  }
  
  // Update an existing lecturer by ID
  export async function updateLecturerById(
    id: string,
    updatedLecturer: Partial<Lecturer>
  ): Promise<void> {
    try {
      const lecturerRef = doc(firestore, 'lecturers', id);
  
      await updateDoc(lecturerRef, updatedLecturer);
    } catch (error) {
      console.error('Error updating lecturer by ID:', error);
      throw error;
    }
  }
  
  // Delete a lecturer by ID
  export async function deleteLecturerById(id: string): Promise<void> {
    try {
      const lecturerRef = doc(firestore, 'lecturers', id);
  
      await deleteDoc(lecturerRef);
    } catch (error) {
      console.error('Error deleting lecturer by ID:', error);
      throw error;
    }
  }
  