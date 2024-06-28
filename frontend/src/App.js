

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
import Videos from './pages/Videos';

function App() {
  return (
    // <Container>
      <BrowserRouter>
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
          <Route path='/videos' element={<Videos />}></Route>
        </Routes>


      </BrowserRouter>
    // </Container>
  );
}

export default App;
