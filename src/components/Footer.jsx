import React from "react";
import { FaUniversity, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="flex justify-center items-center space-x-4">
        <FaUniversity />
        <p>Ecole Polytechnique de Lomé - Université de Lomé, Togo</p>
        <FaEnvelope />
        <p>contact@epl.tg</p>
      </div>
      <p className="mt-2">&copy; 2025 EPL Bibliothèque</p>
    </footer>
  );
};

export default Footer;