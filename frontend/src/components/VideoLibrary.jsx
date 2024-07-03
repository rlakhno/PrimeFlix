import React from 'react';
import { Link } from 'react-router-dom';

const VideoLibrary = () => {
  const videos = [
    { id: 1, title: 'good news', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
    { id: 2, title: 'zoo', url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw' },
    // Add more videos as needed
  ];

  return (
    <div>
      <h1>Video Library</h1>
      <ul>
      {/* {genres.map(genre => () */}
          <li>
            {/* video genres container */}
            
            <ul>
              {videos.map(video => (
                <li key={video.id}>
                  <Link to={`/video/${video.id}`}>{video.title}</Link>
                </li>
              ))}
            </ul>

        </li>
    </ul>
    </div>
  );
};

export default VideoLibrary;

// ideally we map through genres (ACTION, ANIMATED, COMEDY) to form horizontal rows. Then map through api results (that match the genre) and fill the rows.

//Each title should show cover, bring you to video player when clicked, perhaps 

// BUILD LIBRARY AND API REQUESTS