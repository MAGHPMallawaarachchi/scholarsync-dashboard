import { collection, getDocs } from "@firebase/firestore";
import Lecture from "../../models/Lecture";
import { firestore } from "../config";
import { addData, deleteData, getData, updateData } from "./firestore";

// Collection name for Lectures in Firestore
const lectureCollection = 'lectures';

// Create a new Lecture
async function createLecture(lecture: Lecture): Promise<string | null> {
  try {
    return await addData(lectureCollection, lecture);
  } catch (error) {
    console.error('Error creating lecture: ', error);
    return null;
  }
}

// Read all lectures
export async function getAllLectures(): Promise<Lecture[]> {
  try {
    const lectures: Lecture[] = [];
    const querySnapshot = await getDocs(collection(firestore, 'lectures'));

    for (const doc of querySnapshot.docs) {
      const lectureData = { id: doc.id, ...doc.data() } as Lecture;

      lectures.push(lectureData);
    }

    return lectures;
  } catch (error) {
    console.error('Error getting lectures:', error);
    throw error;
  }
}

// Get a Lecture by ID
async function getLecture(lectureId: string): Promise<Lecture | null> {
  return await getData(lectureCollection, lectureId) as Lecture;
}

// Update a Lecture by ID
async function updateLecture(lectureId: string, newData: Lecture): Promise<boolean> {
  return await updateData(lectureCollection, lectureId, newData);
}

// Delete a Lecture by ID
async function deleteLecture(lectureId: string): Promise<boolean> {
  return await deleteData(lectureCollection, lectureId);
}

export { createLecture, getLecture, updateLecture, deleteLecture };