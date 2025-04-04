import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch, placeholder = "Rechercher une filière" }) => {
  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A90E2]" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-md bg-[#F7F7F7] text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition duration-200"
      />
    </div>
  );
};

export default SearchBar;
