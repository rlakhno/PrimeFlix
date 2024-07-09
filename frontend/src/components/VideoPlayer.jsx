import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import StarRating from './starRating';
import '../App.css';


const VideoPlayer = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoUrl = queryParams.get('url') ? `https://www.youtube.com/watch?v=${queryParams.get('url')}` : null;
  const videoTitle = queryParams.get('title');
  const videoDescription = queryParams.get('description');
  const videoGenre = queryParams.get('genre');
  const videoReleaseDate = queryParams.get('release_date');
  const videoRuntime = queryParams.get('runtime');
  const videoActors = queryParams.get('actors');
  const rating = (queryParams.get('rating'));

  

  if (!videoUrl) {
    return <p>Video not found</p>;
  }

  return (
    <div className="video-library">
      <div className="videoplayer-element">
      <Link to="/videos" className="back-button">Back</Link>
        <h1>{videoTitle}</h1>
        <p> Released {videoReleaseDate} ~ {videoRuntime} Minutes</p>
        <StarRating rating={rating}/>
        <div className="videoplayer-container">
          <ReactPlayer url={videoUrl} controls  />
        </div>
        <div className="video-info-container">
          <p>{videoDescription}</p>
          <p>Genre: {videoGenre}</p>
          <p>Starring: {videoActors}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;


