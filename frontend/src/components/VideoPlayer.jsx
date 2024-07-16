import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import axios from 'axios';
import StarRating from './starRating';
import '../App.css';

const API_KEY = '1215575910ec222af8c6a604dac74b2a';

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

  const [similarMovies, setSimilarMovies] = useState([]);

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          append_to_response: 'videos,credits',
        },
      });
      console.log(movieId)
      return response.data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar`, {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            page: 1,
          },
        });

        const movies = await Promise.all(
          response.data.results.map(movie => fetchMovieDetails(movie.id))
        );

        setSimilarMovies(movies.filter(movie => movie));
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    };

    fetchSimilarMovies();
  }, [id]);

  if (!videoUrl) {
    return <p>Video not found</p>;
  }

  return (
    <div className="video-library">
      <div className="videoplayer-element">
        <Link to="/videos" className="back-button">Back</Link>
        <h1><strong>{videoTitle}</strong></h1>
        <p><strong>Released:</strong> {videoReleaseDate} ~ {videoRuntime} Minutes</p>
        <StarRating rating={rating} />
        <div className="videoplayer-container">
          <ReactPlayer url={videoUrl} controls />
        </div>
        <div className="video-info-container">
          <p><strong>{videoDescription}</strong></p>
          <br></br>
          <p><strong>Genre:</strong> {videoGenre}</p>
          <p><strong>Starring:</strong> {videoActors}</p>
        </div>
      </div>
      <div className="similar-movies">
        <h2>Similar Movies</h2>
        <ul className="video-row">
          {similarMovies.map(movie => (
            <li key={movie.id}>
               <Link
                to={`/video/${movie.id}?title=${encodeURIComponent(movie.title || '')}
                    &description=${encodeURIComponent(movie.overview || 'Description Currently Unavailable')}
                    &genre=${encodeURIComponent(movie.genres?.[0]?.name || 'Genre Currently Unknown')}
                    &url=${encodeURIComponent(movie.videos?.results?.[0]?.key || '')}
                    &release_date=${encodeURIComponent(movie.release_date || 'Currently Unavailable')}
                    &runtime=${encodeURIComponent(movie.runtime || 'Currently Unavailable')}
                    &rating=${movie.vote_average || ''}
                    &actors=${encodeURIComponent(movie.credits?.cast?.map(actor => actor.name).join(', ') || 'Cast Currently Unavailable')}`}
              >
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}` || 'https://fontanalib.org/sites/default/files/covers/unavailable-img-_movie.jpg'} alt={movie.title} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoPlayer;