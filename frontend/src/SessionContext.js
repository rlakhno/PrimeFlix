

// src/SessionContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchSessionData, logout as apiLogout } from './api.js';
import { useNavigate } from 'react-router-dom';

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [session, setSession] = useState({ valid: false });
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessionData()
      .then(data => {
        if(data.valid) {
          setSession({ ...data, valid: true})
        }
    })
      .catch(err => {console.error('Failed to fetch session data', err);
  });
      
  }, []);

  const logout = async () => {
    try {
      await apiLogout();
      setSession({ valid: false });
      // sessionStorage.removeItem("items");
      // sessionStorage.removeItem("valid");
      // sessionStorage.removeItem("subscription");
      // sessionStorage.removeItem("name");
      // sessionStorage.removeItem("userId");
      sessionStorage.clear();
      // You might want to redirect the user after logout
      navigate('/')
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

