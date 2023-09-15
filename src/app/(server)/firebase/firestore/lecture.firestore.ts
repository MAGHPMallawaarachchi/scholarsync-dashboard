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
import Lecture from '@/app/(server)/models/Lecture';
import { firestore } from '../config';
  
  // Create a new lecture
  export async function createLecture(lecture: Lecture): Promise<void> {
    try {
      // Add a new document to the "lectures" collection
      await addDoc(collection(firestore, 'lectures'), lecture);
    } catch (error) {
      console.error('Error creating lecture:', error);
      throw error;
    }
  }
  
  // Read all lectures
  export async function getAllLectures(): Promise<Lecture[]> {
    try {
      const lectures: Lecture[] = [];
      const querySnapshot = await getDocs(collection(firestore, 'lectures'));
  
      querySnapshot.forEach((doc) => {
        lectures.push({ id: doc.id, ...doc.data() } as Lecture);
      });
  
      return lectures;
    } catch (error) {
      console.error('Error getting lectures:', error);
      throw error;
    }
  }
  
  // Read a single lecture by ID
  export async function getLectureById(id: string): Promise<Lecture | null> {
    try {
      const docSnapshot = await getDoc(doc(firestore, 'lectures', id));
  
      if (docSnapshot.exists()) {
        return { id: docSnapshot.id, ...docSnapshot.data() } as Lecture;
      }
  
      return null;
    } catch (error) {
      console.error('Error getting lecture by ID:', error);
      throw error;
    }
  }
  
  // Update an existing lecture by ID
  export async function updateLectureById(
    id: string,
    updatedLecture: Partial<Lecture>
  ): Promise<void> {
    try {
      const lectureRef = doc(firestore, 'lectures', id);
  
      await updateDoc(lectureRef, updatedLecture);
    } catch (error) {
      console.error('Error updating lecture by ID:', error);
      throw error;
    }
  }
  
  // Delete a lecture by ID
  export async function deleteLectureById(id: string): Promise<void> {
    try {
      const lectureRef = doc(firestore, 'lectures', id);
  
      await deleteDoc(lectureRef);
    } catch (error) {
      console.error('Error deleting lecture by ID:', error);
      throw error;
    }
  }
  