// src/App.js

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login';
import Signup from './Signup'
import Home from './Home'
import { Container } from 'react-bootstrap'
import Cancel from './pages/Cancel';
import Store from './pages/Store';
import Success from './pages/Success';
import CartProvider from './CartContext';
import VideoLibrary from './components/VideoLibrary';
import VideoPlayer from './components/VideoPlayer';
import { SessionProvider } from './SessionContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <SessionProvider>
      <CartProvider>
        <BrowserRouter>
          <Container>
            <NavbarComponent />
          </Container>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/home' 
            element={<ProtectedRoute element={Home} />} />
            <Route path='/success' element={<Success />} />
            <Route path='/cancel' element={<Cancel />} />
            <Route path='/store' 
            element={<ProtectedRoute element={Store} />} />
            <Route path='/videos' 
            element={<ProtectedRoute element={VideoLibrary} />} />
            <Route path="/video/:id" 
            element={<ProtectedRoute element={VideoPlayer} />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </SessionProvider>
  );
}

export default App;
