import { getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import firebase_app from '../config';

export const auth = getAuth(firebase_app);

export default async function signIn(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export const logOut = () => signOut(auth);
