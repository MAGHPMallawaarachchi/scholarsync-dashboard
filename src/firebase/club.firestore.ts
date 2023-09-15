import { getFirestore, collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, firestore } from './config';
import Club from '@/models/Club';

// Create a new club
export async function createClub(club: Club, profileImageFile: File): Promise<void> {
  try {
    const profileImageURL = await uploadClubProfileImage(profileImageFile, club.username);
    club.profileImageURL = profileImageURL;
    await addDoc(collection(firestore, 'clubs'), club);
  } catch (error) {
    console.error('Error creating club:', error);
    throw error;
  }
}

// Read all clubs
export async function getAllClubs(): Promise<Club[]> {
  try {
    const clubs: Club[] = [];
    const querySnapshot = await getDocs(collection(firestore, 'clubs'));

    querySnapshot.forEach((doc) => {
      clubs.push({ id: doc.id, ...doc.data() } as Club);
    });

    return clubs;
  } catch (error) {
    console.error('Error getting clubs:', error);
    throw error;
  }
}

// Read a single club by ID
export async function getClubById(id: string): Promise<Club | null> {
  try {
    const docSnapshot = await getDoc(doc(firestore, 'clubs', id));

    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() } as Club;
    }

    return null;
  } catch (error) {
    console.error('Error getting club by ID:', error);
    throw error;
  }
}

// Update an existing club by ID
export async function updateClubById(id: string, updatedClub: Partial<Club>): Promise<void> {
  try {
    const clubRef = doc(firestore, 'clubs', id);

    await updateDoc(clubRef, updatedClub);
  } catch (error) {
    console.error('Error updating club by ID:', error);
    throw error;
  }
}

// Delete a club by ID
export async function deleteClubById(id: string): Promise<void> {
  try {
    const clubRef = doc(firestore, 'clubs', id);

    await deleteDoc(clubRef);
  } catch (error) {
    console.error('Error deleting club by ID:', error);
    throw error;
  }
}

// Upload a club profile image
export async function uploadClubProfileImage(file: File, username: string): Promise<string> {
  try {
    const storageRef = ref(storage, `clubs/${username}/profileImage`);
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;

  } catch (error) {
    console.error('Error uploading club profile image:', error);
    throw error;
  }
}
