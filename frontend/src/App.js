import './App.css';
import Login from './Login';
import LoginContainer from './components/LoginContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import VideoLibrary from './components/VideoLibrary';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <BrowserRouter>
      <LoginContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/library" element={<VideoLibrary />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
