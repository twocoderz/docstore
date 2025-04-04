import React from "react";
import Navbar from "../components/Navbar";
import { eplData } from "../data/courses";
import { FaArrowRight } from "react-icons/fa";

const Parcours = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Parcours Disponibles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eplData.parcours.map((parcours) => (
            <div
              key={parcours.name}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-2">{parcours.name}</h3>
              <ul className="list-disc pl-5">
                {parcours.filieres.length > 0 ? (
                  parcours.filieres.map((filiere) => (
                    <li key={filiere.name} className="mb-2">
                      <a
                        href={`/filiere/${filiere.name.toLowerCase().replace(" ", "-")}`}
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        {filiere.name}
                        <FaArrowRight className="ml-2" />
                      </a>
                    </li>
                  ))
                ) : (
                  <li>Aucune filière disponible pour le moment.</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Parcours;
