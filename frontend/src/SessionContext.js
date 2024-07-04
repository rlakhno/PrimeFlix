

// src/SessionContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchSessionData, logout as apiLogout } from './api.js';

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    fetchSessionData()
      .then(data => setSession(data))
      .catch(err => console.error('Failed to fetch session data', err));
  }, []);

  const logout = async () => {
    try {
      await apiLogout();
      setSession(null);
      // You might want to redirect the user after logout
      window.location.href = "/";
    } catch (err) {
      console.error('Failed to logout', err);
    }
  };

  return (
    <SessionContext.Provider value={{ session, setSession, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}


