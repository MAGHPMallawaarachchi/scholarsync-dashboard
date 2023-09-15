import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { firestore, auth } from '../config';
import Club from '@/app/(server)/models/Club';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { deleteData, deleteFile, getData, getDownloadURLForFile, updateData, uploadFile } from './firestore';

// Create a new club as a user
export async function createClubAsUser(club: Club, profileImageFile: File, password:string): Promise<void> {
  try {
    // Create a new user for the club
    const { user } = await createUserWithEmailAndPassword(auth, club.email, password);

    // Upload club profile image
    const storagePath = `clubs/${club.name}/profileImage`;
    await uploadFile(storagePath, profileImageFile);
    club.profileImageURL = await getDownloadURLForFile(storagePath);

    club.uid = user.uid;

    // Add the club data to Firestore
    const clubsCollection = collection(firestore, 'clubs');
    const clubDocRef = doc(clubsCollection); // Create a new document reference without an ID
    const clubDoc = { ...club, id: clubDocRef.id }; // Include the ID in the club data
    await setDoc(clubDocRef, clubDoc);

    // Associate the club data with the new user
    const usersCollection = collection(firestore, 'users');
    const userDocRef = doc(usersCollection, user.uid);
    await setDoc(userDocRef, { clubId: clubDocRef.id }, { merge: true });
    
  } catch (error) {
    console.error('Error creating club as a user:', error);
    throw error;
  }
}

// Read all clubs
export async function getAllClubs(): Promise<Club[]> {
  try {
    const clubs: Club[] = [];
    const querySnapshot = await getDocs(collection(firestore, 'clubs'));

    for (const doc of querySnapshot.docs) {
      const clubData = { id: doc.id, ...doc.data() } as Club;

      // Retrieve the image URL for each club using getDownloadURLForFile
      const storagePath = `clubs/${clubData.name}/profileImage`;
      clubData.profileImageURL = await getDownloadURLForFile(storagePath) || '';

      clubs.push(clubData);
    }

    return clubs;
  } catch (error) {
    console.error('Error getting clubs:', error);
    throw error;
  }
}


// Read a single club by ID
export async function getClubById(id: string): Promise<Club | null> {
  try {
    const club = await getData('clubs', id);
    if (club) {
      console.log('Club data found:', club);
      return club as Club;
    }
    return null;
  } catch (error) {
    console.error('Error getting club by ID:', error);
    throw error;
  }
}


// Update an existing club by ID
export async function updateClubById(newData: Partial<Club>, club: Club, profileImageFile: File | null): Promise<boolean> {
  try {      
    if (profileImageFile) {
      const storagePath = `clubs/${club.name}/profileImage`;
      await uploadFile(storagePath, profileImageFile);
      newData.profileImageURL = await getDownloadURLForFile(storagePath);
    }
    return await updateData('clubs', club.id, newData);
  } catch (error) {
    console.error('Error updating club with image: ', error);
    return false;
  }
}

// Delete a club by ID
export async function deleteClubById(id: string): Promise<void> {
  try {
    // Fetch the club data
    const clubData = await getData('clubs', id);

    if (clubData && clubData.profileImageURL) {
      // Delete the profile image
      await deleteFile(clubData.profileImageURL);
    }

    // Delete the club document from Firestore
    await deleteData('clubs', id);
  } catch (error) {
    console.error('Error deleting club by ID:', error);
    throw error;
  }
}



