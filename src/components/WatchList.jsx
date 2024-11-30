import React, { useEffect, useState } from "react";
import genreids from "./constants/index";

const WatchList = () => {
  const [watchList, setWatchList] = useState([]);
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState([
    "All Genres",
    "Thriller",
    "Horror",
  ]);
  const [currGenre, setCurrGenre] = useState("All Genres");

  const removeFromWatchList = (movieObj) => {
    const filteredMovies = watchList.filter(
      (movie) => movie.id !== movieObj.id
    );
    setWatchList(filteredMovies);
    localStorage.setItem("movies", JSON.stringify(filteredMovies));
  };

  useEffect(() => {
    let temp = watchList.map((movie) => genreids[movie.genre_ids[0]]);
    temp = new Set(temp);
    setGenreList(["All Genres", ...temp]);
  }, [watchList]);

  const handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const moviesFromLocalStorage = localStorage.getItem("movies");
    if (moviesFromLocalStorage) {
      setWatchList(JSON.parse(moviesFromLocalStorage));
    }
  }, []);

  const genres = (genre_id) => genreids[genre_id];

  const handleAscendingRatings = () => {
    const sortedAscending = [...watchList].sort(
      (a, b) => a.vote_average - b.vote_average
    );
    setWatchList(sortedAscending);
  };

  const handleDescendingRatings = () => {
    const sortedDescending = [...watchList].sort(
      (a, b) => b.vote_average - a.vote_average
    );
    setWatchList(sortedDescending);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-5">
      <div className="flex justify-center m-4">
        {genreList.map((genre) => {
          const isActive = currGenre === genre;
          const baseStyles =
            "flex justify-center items-center h-[3rem] w-[9rem] text-white font-bold mx-4 rounded-lg shadow-md";
          const bgColor = isActive ? "bg-yellow-500" : "bg-yellow-300";
          return (
            <div
              onClick={() => handleFilter(genre)}
              className={`${baseStyles} ${bgColor} transition-transform transform hover:scale-105 cursor-pointer`}
              key={genre}
            >
              {genre}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center my-10">
        <input
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-yellow-100 rounded-lg px-4 outline-none border border-yellow-300 shadow-md"
          type="text"
          onChange={handleSearch}
          value={search}
        />
      </div>

      <div className="flex flex-col items-center my-10">
        <div className="flex items-center space-x-2 text-lg font-semibold">
          <span
            onClick={handleAscendingRatings}
            className="flex items-center hover:text-yellow-600 transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-arrow-up"></i>
          </span>
          <span>Ratings</span>
          <span
            onClick={handleDescendingRatings}
            className="flex items-center hover:text-yellow-600 transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-arrow-down"></i>
          </span>
        </div>
        <div className="mt-2 text-sm text-gray-600">Click to sort ratings</div>
      </div>

      <div className="overflow-hidden rounded-lg  m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Ratings</th>
              <th className="px-6 py-4 font-medium">Popularity</th>
              <th className="px-6 py-4 font-medium">Genre</th>
              <th className="px-6 py-4 font-medium">Remove</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {watchList
              .filter(
                (movie) =>
                  currGenre === "All Genres" ||
                  genreids[movie.genre_ids[0]] === currGenre
              )
              .filter((movie) =>
                movie.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((movie) => (
                <tr
                  className="hover:bg-gray-50 transition duration-200"
                  key={movie.id}
                >
                  <td className="flex items-center px-6 py-4 gap-4">
                    <img
                      className="h-[6rem] w-[10rem] object-cover rounded-md shadow"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="font-medium text-gray-900 text-sm">
                      {movie.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">{movie.vote_average}</td>
                  <td className="px-6 py-4">{movie.popularity}</td>
                  <td className="px-6 py-4">{genres(movie.genre_ids[0])}</td>
                  <td className="px-6 py-4">
                    <div
                      onClick={() => removeFromWatchList(movie)}
                      className="flex justify-center h-8 w-8 items-center rounded-lg bg-red-600 hover:bg-red-800 transition-colors cursor-pointer shadow"
                    >
                      ❌
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WatchList;
