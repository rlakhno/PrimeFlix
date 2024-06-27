


import './App.css';
import Login from './Login';
import LoginContainer from './components/LoginContainer';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'

function App() {
  return (
    <BrowserRouter>
    <LoginContainer />
      <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
      </Routes>
      

    </BrowserRouter>
  );
}

export default App;
