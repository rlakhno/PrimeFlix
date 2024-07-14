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
import VideoResults from './components/VideoResults';
import { Profile } from './components/Profile';
import { SessionProvider } from './SessionContext';
// import ProtectedRoute from './ProtectedRoute';

function App() {


  return (
    <CartProvider>
      <BrowserRouter>
      <SessionProvider>
        <Container>
          <NavbarComponent />
        </Container>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/success' element={<Success />}></Route>
          <Route path='/cancel' element={<Cancel />}></Route>
          <Route path='/store' element={<Store />}></Route>
          <Route path='/videos' element={<VideoLibrary />}></Route>
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/search" element={<VideoResults />} />
      <Route path="/profile" element={<Profile />} />
        </Routes>
      </SessionProvider>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
