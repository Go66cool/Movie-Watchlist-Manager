import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import MovieCard from "./MovieCard";
import axios from "axios";

function Movies() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=c342427186f1fa533da2abf748d0a6fd&language=en-US&page=${page}`
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [page]);

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const removeFromWatchList = (movieObj) => {
    const filteredMovies = watchlist.filter(
      (movie) => movie.id !== movieObj.id
    );
    setWatchlist(filteredMovies);
    localStorage.setItem("movies", JSON.stringify(filteredMovies));
  };

  const addToWatchList = (movieObj) => {
    const filteredMovies = [movieObj, ...watchlist];
    setWatchlist(filteredMovies);
    localStorage.setItem("movies", JSON.stringify(filteredMovies));
  };

  useEffect(() => {
    const moviesFromLocalStorage = localStorage.getItem("movies");
    if (moviesFromLocalStorage) {
      setWatchlist(JSON.parse(moviesFromLocalStorage));
    }
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Filtered movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-blue-100 min-h-screen p-5">
      <div className="text-4xl font-bold text-center text-blue-900 mb-6">
        <h1>Trending Movies</h1>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search Movies..."
          className="h-[3rem] w-[20rem] bg-white rounded-lg px-4 outline-none border border-blue-300"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="flex justify-center flex-wrap gap-6">
        {filteredMovies.map((movieObj) => (
          <MovieCard
            key={movieObj.id}
            movieObj={movieObj}
            addToWatchList={addToWatchList}
            watchlist={watchlist}
            removeFromWatchList={removeFromWatchList}
          />
        ))}
      </div>

      <Pagination
        nextpagefn={handleNext}
        previouspagefn={handlePrevious}
        pageNoValue={page}
      />
    </div>
  );
}

export default Movies;
