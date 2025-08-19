import React, { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import { VITE_WATCHMODE_API_KEY } from "../key";

const API_BASE_URL = "https://api.watchmode.com/v1/releases/?apiKey=";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Fixed typo

  
  
   const fetchMovies = async (query = "") => {
    setIsLoading(true); // Fixed typo
    setErrorMessage("");
    try {
      const endpoint = query
        ? `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${VITE_WATCHMODE_API_KEY}&search_field=name&search_value=${encodeURIComponent(
            query
          )}`
        : `${API_BASE_URL}${VITE_WATCHMODE_API_KEY}&types=movie&limit=20`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Failed to Fetch movies");
      }
      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      const results = query ? data.results : data.releases;
      setMovieList(results || []);
      
    } catch (error) {
      console.error(`Error fetching Movies : ${error}`);
      setErrorMessage(`Error Fetching Movies. Please try again later.`);
    } finally {
      setIsLoading(false); // Fixed value and typo
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
