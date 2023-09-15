'use client'

import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase/config';

type User = FirebaseUser | null;

type AuthContextType = {
  user: User;
  error: any; // You can replace 'any' with a more specific error type if needed
  loading: boolean;
};

const initialAuthContext: AuthContextType = {
  user: null,
  error: null,
  loading: true,
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

type Props = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>(initialAuthContext.user);
  const [error, setError] = useState<any>(initialAuthContext.error);
  const [loading, setLoading] = useState<boolean>(initialAuthContext.loading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        setError(null);
      } else {
        setUser(null);
      }
      setLoading(false);
    }, (authError) => {
      setError(authError);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, error, loading }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
