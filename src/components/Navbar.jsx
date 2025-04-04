import React from "react";
import { FaHome, FaBook } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/assets/logo.png" alt="EPL Logo" className="h-10 mr-2" />
        <h1 className="text-xl font-bold">EPL Bibliothèque</h1>
      </div>
      <ul className="flex space-x-6">
        <li className="flex items-center">
          <FaHome className="mr-1" />
          <a href="/" className="hover:text-gray-300">Accueil</a>
        </li>
        <li className="flex items-center">
          <FaBook className="mr-1" />
          <a href="/parcours" className="hover:text-gray-300">Parcours</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
