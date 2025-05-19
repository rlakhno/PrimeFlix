
// src/api.js
import axios from 'axios';

export const fetchSessionData = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}session`, { withCredentials: true });
  return response.data;
};

export const logout = async () => {
  await axios.get(`${process.env.REACT_APP_API_BASE_URL}logout`, { withCredentials: true });
};
