// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from './SessionContext';

function ProtectedRoute({ element: Component }) {
  const { session } = useSession();

  return session ? <Component /> : <Navigate to="/" />;
}

export default ProtectedRoute;
