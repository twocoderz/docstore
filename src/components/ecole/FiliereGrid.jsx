import React from "react";
import { FaArrowRight, FaBook } from "react-icons/fa";

const FiliereGrid = ({ filieres, selectedParcours, onOpenFiliere }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filieres.length > 0 ? (
      filieres.map((filiere) => (
        <div
          key={filiere.$id}
          onClick={() => onOpenFiliere(filiere)}
          className="group cursor-pointer"
        >
          <div className="h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
            <div className="h-24 bg-gradient-to-br from-indigo-500 to-purple-600 relative">
              <div className="absolute bottom-3 left-4 right-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2">
                  <div className="hidden sm:block">
                    <FaBook className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white line-clamp-2 sm:line-clamp-1 transition-transform duration-200">
                    {filiere.nom}
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                {filiere.description}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {filiere.parcours}
                </span>
                <FaArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col-span-full text-center py-16">
        <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FaBook className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune filière trouvée</h3>
        <p className="text-gray-600">
          {selectedParcours
            ? "Aucune filière ne correspond aux filtres sélectionnés."
            : "Cette école ne dispose pas encore de données sur les filières."}
        </p>
      </div>
    )}
  </div>
);

export default FiliereGrid;
