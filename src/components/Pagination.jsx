import React from "react";

function Pagination({ nextpagefn, previouspagefn, pageNoValue }) {
  return (
    <div className="bg-blue-400 p-4 h-[50px] w-full mt-8 flex justify-center items-center gap-2">
      <div onClick={previouspagefn} className="px-8 cursor-pointer">
        <i className="fa-solid fa-arrow-left text-black"></i>
      </div>
      <div className="text-black">{pageNoValue}</div>
      <div onClick={nextpagefn} className="px-8 cursor-pointer">
        <i className="fa-solid fa-arrow-right text-black"></i>
      </div>
    </div>
  );
}

export default Pagination;
