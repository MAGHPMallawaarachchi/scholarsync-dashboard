import { getFirestore, collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getMetadata, getStorage, deleteObject } from 'firebase/storage';
import { storage, firestore, auth } from './config';
import Club from '@/app/(server)/models/Club';
import { User, createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { MdPassword } from 'react-icons/md';

// Create a new club as a user
export async function createClubAsUser(club: Club, profileImageFile: File, password:string): Promise<void> {
  try {
    // Create a new user for the club
    const { user } = await createUserWithEmailAndPassword(auth, club.email, password);

    // Upload club profile image
    const profileImageURL = await uploadClubProfileImage(profileImageFile, club.name);
    club.profileImageURL = profileImageURL;

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
      // Retrieve the image URL for each club
      clubData.profileImageURL = (await getClubProfileImageURL(clubData.name)) || '';
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
    console.log('Fetching club with ID:', id);

    const docSnapshot = await getDoc(doc(firestore, 'clubs', id));

    if (docSnapshot.exists()) {
      console.log('Club data found:', docSnapshot.data());
      return { id: docSnapshot.id, ...docSnapshot.data() } as Club;
    }

    console.log('Club not found.');
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

// Delete a club by ID, including the associated user
export async function deleteClubById(id: string): Promise<void> {
  try {
    const clubRef = doc(firestore, 'clubs', id);

    // Fetch the club data
    const clubSnapshot = await getDoc(clubRef);
    if (clubSnapshot.exists()) {
      const clubData = clubSnapshot.data();

      if (clubData && clubData.profileImageURL) {
        // Get the profile image path in Firebase Storage
        const storage = getStorage();
        const profileImageRef = ref(storage, clubData.profileImageURL);

        // Delete the profile image
        await deleteObject(profileImageRef);
      }

      // Delete the club document from Firestore
      await deleteDoc(clubRef);
    }
  } catch (error) {
    console.error('Error deleting club by ID:', error);
    throw error;
  }
}


// Upload a club profile image
export async function uploadClubProfileImage(file: File, name: string): Promise<string> {
  try {
    const storageRef = ref(storage, `clubs/${name}/profileImage`);
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;

  } catch (error) {
    console.error('Error uploading club profile image:', error);
    throw error;
  }
}

// Get the club profile image URL
export async function getClubProfileImageURL(name: string): Promise<string | null> {
  try {
    const storageRef = ref(storage, `clubs/${name}/profileImage`);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error getting club profile image URL:', error);
    throw error;
  }
}
