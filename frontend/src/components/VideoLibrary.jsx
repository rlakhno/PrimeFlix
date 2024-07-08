
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { useSession } from '../SessionContext';

const PEXELS_API_KEY = 'jbH4a0Tfg1s0gbRnNWVZbess9dh9XMubtqci5ej9WzJaJLoKz9EZUfzd';

const fetchVideos = async (query) => {
  // Set Axios defaults
  //  axios.defaults.withCredentials = true;

  const response = await axios.get('https://api.pexels.com/videos/search', {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
    params: {
      query,
      per_page: 10,
    },
  });
  return response.data.videos;
};

const VideoLibrary = () => {
  const [comedyVideos, setComedyVideos] = useState([]);
  const [dramaVideos, setDramaVideos] = useState([]);
  const [actionVideos, setActionVideos] = useState([]);
  const [horrorVideos, setHorrorVideos] = useState([]);
  const [natureVideos, setNatureVideos] = useState([]);
  const { session } = useSession();
  const navigate = useNavigate();

  // Get saved data from sessionStorage
  let data = sessionStorage.getItem("valid");
  if (data === "false" || data === null) {
    navigate('/');
  }

  useEffect(() => {
    const fetchAllVideos = async () => {
      const comedy = await fetchVideos('comedy');
      const drama = await fetchVideos('drama');
      const action = await fetchVideos('action');
      const horror = await fetchVideos('horror');
      const nature = await fetchVideos('nature');
      setComedyVideos(comedy);
      setDramaVideos(drama);
      setActionVideos(action);
      setHorrorVideos(horror);
      setNatureVideos(nature);
    };

    fetchAllVideos();
  }, []);


  return (
    <div className="video-library">
      <div>
        <h2>Comedy</h2>
        <ul className="video-row">
          {comedyVideos.map((video) => (
            <li key={video.id}>
              <Link to={`/video/${video.id}?url=${encodeURIComponent(video.video_files[0].link)}`}>
                <img src={video.image} alt={video.title} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Drama</h2>
        <ul className="video-row">
          {dramaVideos.map((video) => (
            <li key={video.id}>
              <Link to={`/video/${video.id}?url=${encodeURIComponent(video.video_files[0].link)}`}>
                <img src={video.image} alt={video.title} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Action</h2>
        <ul className="video-row">
          {actionVideos.map((video) => (
            <li key={video.id}>
              <Link to={`/video/${video.id}?url=${encodeURIComponent(video.video_files[0].link)}`}>
                <img src={video.image} alt={video.title} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Horror</h2>
        <ul className="video-row">
          {horrorVideos.map((video) => (
            <li key={video.id}>
              <Link to={`/video/${video.id}?url=${encodeURIComponent(video.video_files[0].link)}`}>
                <img src={video.image} alt={video.title} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Nature</h2>
        <ul className="video-row">
          {natureVideos.map((video) => (
            <li key={video.id}>
              <Link to={`/video/${video.id}?url=${encodeURIComponent(video.video_files[0].link)}`}>
                <img src={video.image} alt={video.title} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoLibrary;