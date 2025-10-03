import React, { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";

const API_BASE_URL = "https://api.watchmode.com/v1/releases/?apiKey=";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const VITE_WATCHMODE_API_KEY = import.meta.env.VITE_WATCHMODE_API_KEY;
  
   const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const apiKey = VITE_WATCHMODE_API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing. Check your .env file.");
      }
      const endpoint = query
        ? `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${apiKey}&search_field=name&search_value=${encodeURIComponent(
            query
          )}`
        : `${API_BASE_URL}${apiKey}&types=movie&limit=20`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Failed to Fetch movies");
      }
      const data = await response.json();

      const results = query ? data.results : data.releases;
      setMovieList(results || []);
      
    } catch (error) {
      console.error(`Error fetching Movies : ${error}`);
      setErrorMessage(error.message || `Error Fetching Movies. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> you'll enjoy
            without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies mt-4">
          <h2>All Movies</h2>

          {isLoading ? (
            <p className="text-white">Loading.....</p>
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;