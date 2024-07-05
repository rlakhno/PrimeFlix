// src/api.js
export async function fetchSessionData() {
  const response = await fetch('/home');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function logout() {
  const response = await fetch('/logout');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.text();
}