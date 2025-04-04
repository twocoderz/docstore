import React from "react";
import Navbar from "../components/Navbar";
import { FaSchool, FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center">
          <FaSchool className="mr-2 text-blue-600" />
          Bienvenue à la Bibliothèque Numérique de l'EPL
        </h2>
        <p className="text-center text-gray-700">
          Accédez aux ressources des cours, exercices et TP de l'Ecole
          Polytechnique de Lomé.
        </p>
        <div className="mt-6 text-center">
          <a
            href="/parcours"
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 flex items-center justify-center mx-auto w-fit"
          >
            Explorer les Parcours
            <FaArrowRight className="ml-2" />
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
