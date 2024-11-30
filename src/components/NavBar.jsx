import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/download.png";
// import logo from "newMovies/src/assets/download.png";
function NavBar() {
  return (
    <div className="flex items-center justify-between bg-blue-600 p-4 shadow-md">
      <Link to="/">
        <img
          className="w-[50px] rounded-full shadow-lg"
          src={logo}
          alt="Logo"
        />
      </Link>
      <div className="flex-grow flex justify-start ml-4 space-x-8 text-white text-2xl font-bold font-roboto">
        <Link
          to="/"
          className="hover:text-orange-300 transition duration-300 hover:scale-110 cursor-pointer"
        >
          Movies
        </Link>
        <Link
          to="/watchlist"
          className="hover:text-orange-300 transition duration-300 hover:scale-110 cursor-pointer"
        >
          Watchlist
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
