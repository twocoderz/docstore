import React from "react";

const SearchBar = ({ onSearch, placeholder }) => {
  return (
    <input
      type="text"
      onChange={(e) => onSearch(e.target.value)}
      placeholder={placeholder}
      className="w-full p-2 border rounded-md bg-white text-gray-800 placeholder-gray-400 text-sm sm:text-base"
    />
  );
};

export default SearchBar;