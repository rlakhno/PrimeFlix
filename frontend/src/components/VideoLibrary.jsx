
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const API_KEY = '1215575910ec222af8c6a604dac74b2a';

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const fetchMovies = async (genreId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        language: 'en-US',
        page: 1,
      },
    });
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        append_to_response: 'videos,credits',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

const VideoLibrary = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllMovies = async () => {
      const moviesByGenre = {};
      for (const genre of genres) {
        const movies = await fetchMovies(genre.id);
        const movieDetails = await Promise.all(
          movies.map(movie => fetchMovieDetails(movie.id))
        );
        moviesByGenre[genre.name] = movieDetails.filter(movie => movie);
      }
      setMoviesByGenre(moviesByGenre);
    };
    fetchAllMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div className="video-library">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by Movie Title!"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {Object.entries(moviesByGenre).map(([genre, movies]) => (
        <div key={genre}>
          <h2>{genre}</h2>
          <ul className="video-row">
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link
                  to={`/video/${movie.id}?title=${encodeURIComponent(movie.title)}
                    &description=${encodeURIComponent(movie.overview)}
                    &genre=${encodeURIComponent(movie.genres[0].name)}
                    &url=${encodeURIComponent(movie.videos.results[0]?.key)}
                    &release_date=${encodeURIComponent(movie.release_date)}
                    &runtime=${encodeURIComponent(movie.runtime)}
                    &rating=${movie.vote_average}
                    &actors=${encodeURIComponent(movie.credits.cast.map(actor => actor.name).join(', '))}`}
                >
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default VideoLibrary;