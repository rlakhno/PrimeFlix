

// src/SessionContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchSessionData, logout as apiLogout } from './api.js';

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [session, setSession] = useState({ valid: false });

  useEffect(() => {
    // console.log("Parsed user: ", res.cookie.user);
    fetchSessionData()
      .then(data => setSession({ ...data, valid: true}))
      .catch(err => {console.error('Failed to fetch session data', err);
      // setSession({ valid: false });
  });
      
  }, []);

  const logout = async () => {
    try {
      await apiLogout();
      setSession({ valid: false });
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


