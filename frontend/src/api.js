
// src/api.js
import axios from 'axios';

export const fetchSessionData = async () => {
  const response = await axios.get('http://localhost:8080/session', { withCredentials: true });
  return response.data;
};

export const logout = async () => {
  await axios.get('http://localhost:8080/logout', { withCredentials: true });
};
