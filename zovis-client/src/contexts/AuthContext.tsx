import React, { useContext, useState, useEffect } from "react";
import * as api from '../api';
import { auth } from "../firebase";
import { CurrentUser } from "../types/user";

type BigContext = {
  currentUser: CurrentUser,
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  login: (email:string, password:string) => Promise<any>;
};

const AuthContext = React.createContext<BigContext>({
  currentUser: null,
  logout: async () => { },
  resetPassword: async (email: string) => { },
  login: async (email:string, password:string) => { },
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      let nowUser: CurrentUser = null;

      try {
        if (user) {
          nowUser = {
            detail: await api.getUserNowDetail(),
            emailVerified: user.emailVerified,
          };
        }

        setCurrentUser(nowUser);

      } catch (e) {
        console.log('authState e: ', e, ' logging out...');
        logout();
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value : BigContext = {
    currentUser,
    login,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
