"use client";

import { createContext, useContext, useState, useEffect } from 'react';

export type User = {
  E_ID: number;
  Designation: string;
  E_Fname?: string;
  E_Lname?: string;
};

const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) setUserState(JSON.parse(stored));
  }, []);

  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) localStorage.setItem('currentUser', JSON.stringify(user));
    else localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
