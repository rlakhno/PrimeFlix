import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';


const API_KEY = '1215575910ec222af8c6a604dac74b2a';

const fetchSearchResults = async (query) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        language: 'en-US',
        page: 1,
      },
    });
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching search results:", error);
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

const VideoResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        const results = await fetchSearchResults(query);
        const detailedResults = await Promise.all(
          results.map(result => fetchMovieDetails(result.id))
        );
        setSearchResults(detailedResults.filter(result => result));
      }
    };
    fetchResults();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const getPosterUrl = (posterPath) => {
    return posterPath ? `https://image.tmdb.org/t/p/w200${posterPath}` : 'https://t3.ftcdn.net/jpg/04/92/51/66/360_F_492516631_Tzxtms5jydBakvSf3wA9g3gdNtiV1bqS.jpg';
  };

  return (
    <div className="video-library">
      <Link to="/videos" className="back-button">Back</Link>
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
      <h2>Search Results for "{query}"</h2>
      <ul className="video-results">
        {searchResults.map((movie) => (
          <li key={movie.id}>
            <Link
              to={`/video/${movie.id}?title=${encodeURIComponent(movie.title)}
                  &description=${encodeURIComponent(movie.overview)}
                  &genre=${encodeURIComponent(movie.genres[0]?.name || 'Currently Unavailable')}
                  &url=${encodeURIComponent(movie.videos.results[0]?.key || 'Currently Unavailable')}
                  &release_date=${encodeURIComponent(movie.release_date)}
                  &runtime=${encodeURIComponent(movie.runtime)}
                  &rating=${movie.vote_average}
                  &actors=${encodeURIComponent(movie.credits.cast.map(actor => actor.name).join(', '))}`}
            >
              <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoResults;
