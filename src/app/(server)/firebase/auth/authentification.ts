import { getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { auth } from '../config';

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
