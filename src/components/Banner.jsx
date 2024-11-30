import React, { useEffect, useState } from "react";
import axios from "axios";

function Banner() {
  const [bannerImage, setBannerImage] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=c342427186f1fa533da2abf748d0a6fd&language=en-US&page=10"
      )
      .then((response) => {
        const firstMovie = response.data.results[0];
        const firstMovieTitle = firstMovie.title;
        const firstMoviePoster = firstMovie.backdrop_path;
        setBannerImage(
          `https://image.tmdb.org/t/p/original${firstMoviePoster}`
        );
        setTitle(firstMovieTitle);
      });
  }, []);

  return (
    <div
      className="h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end relative"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-10" /> {/* Overlay */}
      <div className="text-white w-full text-center text-3xl md:text-5xl font-bold p-4">
        {title}
      </div>
    </div>
  );
}

export default Banner;
