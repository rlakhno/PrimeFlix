import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { FaSearch } from 'react-icons/fa';

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

const fetchMovies = async (url) => {
  try {
    const response = await axios.get(url, {
      params: {
        api_key: API_KEY,
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

const fetchLatestMovieDetails = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/latest`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        append_to_response: 'videos,credits',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching latest movie details:", error);
    return null;
  }
};

const VideoLibrary = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [latestMovie, setLatestMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllMovies = async () => {
      const moviesByGenre = {};
      for (const genre of genres) {
        const movies = await fetchMovies(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}`);
        const movieDetails = await Promise.all(
          movies.map(movie => fetchMovieDetails(movie.id))
        );
        moviesByGenre[genre.name] = movieDetails.filter(movie => movie);
      }
      setMoviesByGenre(moviesByGenre);
    };

    const fetchRecommendations = async () => {
      const movies = await fetchMovies(`https://api.themoviedb.org/3/movie/top_rated`);
      const movieDetails = await Promise.all(
        movies.map(movie => fetchMovieDetails(movie.id))
      );
      setRecommendations(movieDetails.filter(movie => movie));
    };

    const fetchLatestMovie = async () => {
      const latestMovieDetails = await fetchLatestMovieDetails();
      setLatestMovie(latestMovieDetails);
    };

    fetchAllMovies();
    fetchRecommendations();
    fetchLatestMovie();
  }, []);

  const getPosterUrl = (posterPath) => {
    return posterPath ? `https://image.tmdb.org/t/p/w200${posterPath}` : 'https://t3.ftcdn.net/jpg/04/92/51/66/360_F_492516631_Tzxtms5jydBakvSf3wA9g3gdNtiV1bqS.jpg';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    
   <div className="video-library">
    
      <button className="toggle-search-bar" onClick={toggleSearchBar}>
      <FaSearch />
      </button>
      <form className={`search-Bar ${showSearchBar ? 'show' : 'hide'}`} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by movie title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <h2>Latest Movie</h2>
      {latestMovie && (
        <div className="latest-movie">
          <div className="latest-movie-details">
            <Link
              to={`/video/${latestMovie.id}?title=${encodeURIComponent(latestMovie.title || '')}
                    &description=${encodeURIComponent(latestMovie.overview || 'Currently Unavailable')}
                    &genre=${encodeURIComponent(latestMovie.genres?.[0]?.name || 'Currently Unavailable')}
                    &url=${encodeURIComponent(latestMovie.videos?.results?.[0]?.key || '')}
                    &release_date=${encodeURIComponent(latestMovie.release_date || 'Currently Unavailable')}
                    &runtime=${encodeURIComponent(latestMovie.runtime || 'Currently Unavailable')}
                    &rating=${latestMovie.vote_average || ''}
                    &actors=${encodeURIComponent(latestMovie.credits?.cast?.map(actor => actor.name).join(', ') || 'Cast Currently Unavailable')}`}
            >
              <img src={getPosterUrl(latestMovie.poster_path)} alt={latestMovie.title} />
            </Link>
            <div className="latest-movie-info">
              <h3>{latestMovie.title}</h3>
              <p>{latestMovie.overview}</p>
              <p><strong>Genre:</strong> {latestMovie.genres?.map(genre => genre.name).join(', ')}</p>
            </div>
          </div>
        </div>
      )}

      <div className="recommendations">
        <h2>Recommendations</h2>
        <ul className="recommendations-row">
          {recommendations.map((movie) => (
            <li key={movie.id}>
              <Link
                to={`/video/${movie.id}?title=${encodeURIComponent(movie.title || 'Currently Unavailable')}
                    &description=${encodeURIComponent(movie.overview || 'UNAVAICurrently UnavailableLABLE')}
                    &genre=${encodeURIComponent(movie.genres?.[0]?.name || 'Currently Unavailable')}
                    &url=${encodeURIComponent(movie.videos?.results?.[0]?.key || '')}
                    &release_date=${encodeURIComponent(movie.release_date || 'Currently Unavailable')}
                    &runtime=${encodeURIComponent(movie.runtime || 'Currently Unavailable')}
                    &rating=${movie.vote_average || ''}
                    &actors=${encodeURIComponent(movie.credits?.cast?.map(actor => actor.name).join(', ') || 'Cast Currently Unavailable')}`}
              >
                <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {Object.entries(moviesByGenre).map(([genre, movies]) => (
        <div key={genre}>
          <h2>{genre}</h2>
          <ul className="video-row">
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link
                  to={`/video/${movie.id}?title=${encodeURIComponent(movie.title || '')}
                    &description=${encodeURIComponent(movie.overview || 'Currently Unavailable')}
                    &genre=${encodeURIComponent(movie.genres?.[0]?.name || 'Currently Unavailable')}
                    &url=${encodeURIComponent(movie.videos?.results?.[0]?.key || '')}
                    &release_date=${encodeURIComponent(movie.release_date || 'Currently Unavailable')}
                    &runtime=${encodeURIComponent(movie.runtime || 'Currently Unavailable')}
                    &rating=${movie.vote_average || ''}
                    &actors=${encodeURIComponent(movie.credits?.cast?.map(actor => actor.name).join(', ') || 'Cast Currently Unavailable')}`}
                >
                  <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
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

// <svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
//   <rect width="200" height="60" fill="#1a1a1a" rx="10" />
//   <text x="20" y="35" font-family="Arial, sans-serif" font-size="24" fill="#ffffff">Prime</text>
//   <text x="90" y="35" font-family="Arial, sans-serif" font-size="24" fill="#ff9900">Flix</text>
//   <polygon points="160,15 180,30 160,45" fill="#ff9900" />
// </svg>