import React from "react";
import { FaHome, FaBook } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-[#4A7047] text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/assets/logo.png" alt="EPL Logo" className="h-10 mr-2" />
        <h1 className="text-xl font-bold">EPL Bibliothèque</h1>
      </div>
      <ul className="flex gap-6">
        <li className="flex items-center">
          <FaHome className="mr-1" />
          <a href="/" className="hover:text-[#F4A261] transition duration-200">
            Accueil
          </a>
        </li>
        <li className="flex items-center">
          <FaBook className="mr-1" />
          <a href="/parcours" className="hover:text-[#F4A261] transition duration-200">
            Parcours
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
