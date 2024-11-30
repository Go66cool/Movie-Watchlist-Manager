import React from "react";

function MovieCard({
  movieObj,
  watchlist,
  removeFromWatchList,
  addToWatchList,
}) {
  const doesContain = (movieObj) => {
    return watchlist.some((movie) => movie.id === movieObj.id);
  };

  return (
    <div
      className="h-[40vh] w-[180px] bg-center bg-cover hover:scale-110 duration-100 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(${
          movieObj.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`
            : "../src/assets/images.jpeg"
        })`,
        filter: "brightness(0.7)",
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => removeFromWatchList(movieObj)}
          className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-red-600/80 cursor-pointer"
        >
          ❌
        </div>
      ) : (
        <div
          onClick={() => addToWatchList(movieObj)}
          className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-blue-600/80 cursor-pointer" // Bluish button
        >
          ⭐
        </div>
      )}
      <div className="text-white w-full text-center text-xl p-2 rounded-lg bg-blue-800/70">
        {" "}
        {movieObj.title}
      </div>
    </div>
  );
}

export default MovieCard;
