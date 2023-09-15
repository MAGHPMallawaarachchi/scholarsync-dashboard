'use client'

import React, { ReactNode } from 'react';
import {
    onAuthStateChanged,
    getAuth,
    User,
} from 'firebase/auth';
import { auth } from '@/firebase/auth/authentification';


export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({
    children,
}: AuthContextProviderProps) => {
    const [user, setUser] = React.useState<User | null>(null);

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};
