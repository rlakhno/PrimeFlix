import React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  const { id } = useParams();
  const videos = [
    { id: 1, title: 'good news', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
    { id: 2, title: 'Video 2', url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw' },
    // Add more videos as needed
  ];

  const video = videos.find(video => video.id === parseInt(id));

  return (
    <div>
      {video ? (
        <div>
          <h1>{video.title}</h1>
          <ul>
            <li>
              {/* className = videoplayer container */}
          <ReactPlayer url={video.url} controls />
            </li>
            <li>
              {/* className= video info container */}
              {/* description */}
              {/* cast / info / release time*/}
            </li>
            {/* <li>
               more titles (stretch) 
            </li> */}
          </ul>
        </div>
      ) : (
        <p>Video not found</p>
      )}
    </div>
  );
};

export default VideoPlayer;