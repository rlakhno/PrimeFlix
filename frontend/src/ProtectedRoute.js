// // src/ProtectedRoute.js

// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import axios from 'axios';

// const ProtectedRoute = ({ component: Component, sessionCookie }) => {
//   const [session, setSession] = useState({ valid: false, loading: true });

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const response = await axios.get('/api/check-session', {
//           headers: { 'Authorization': `Bearer ${sessionCookie}` },
//           withCredentials: true
//         });
//         setSession({ valid: response.data.valid, loading: false });
//       } catch (error) {
//         console.error('Error checking session:', error);
//         setSession({ valid: false, loading: false });
//       }
//     };

//     checkSession();
//   }, [sessionCookie]);

//   if (session.loading) {
//     return <div>Loading...</div>;
//   }

//   return session.valid ? <Component /> : <Navigate to="/" />;
// };

// export default ProtectedRoute;







// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useSession } from './SessionContext';

// function ProtectedRoute({ element: Component }) {
//   const { session, logout } = useSession();
//   console.log("SESSION: ", session);

//   if (!session.valid) {
//     return <Navigate to="/" />;
//   }

//   return <Component logout={logout} />;
// }

// export default ProtectedRoute;
