import React from "react";
import { FaArrowLeft, FaBook } from "react-icons/fa";

const FiliereHeader = ({ filiere, onBack }) => (
  <div className="space-y-8 pt-4 pb-4 bg-gray-50/80 backdrop-blur">
    <button
      onClick={onBack}
      className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-gray-50 hover:bg-gray-100 active:bg-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group"
    >
      <FaArrowLeft className="w-5 h-5 text-gray-700 group-hover:-translate-x-0.5 group-active:scale-95 transition-transform duration-200" />
    </button>

    <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 rounded-3xl p-8 text-white relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-3">
              <img src="/assets/icons/book.svg" alt="school" className="w-9 h-9" />
              <div>
                <h1 className="text-2xl md:text-4xl font-bold">
                  {filiere?.nom || "Chargement..."}
                </h1>
                <p className="text-purple-100 mt-2 text-sm md:text-base">
                  Unités d'enseignement disponibles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
    </div>
  </div>
);

export default FiliereHeader;
