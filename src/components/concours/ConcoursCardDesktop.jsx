import React from "react";
import { FaArrowRight, FaFilePdf } from "react-icons/fa";

const ConcoursCardDesktop = ({ concour, ecoleName }) => (
  <a
    href={`/concours/${concour.$id}`}
    rel="noopener noreferrer"
    className="hidden md:block h-full"
  >
    <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      <div className="h-18 md:h-22 bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-600 relative overflow-hidden">
        <div className="absolute bottom-2 left-6 right-6">
          <div className="flex items-center space-x-3">
            <img src="/assets/icons/trophy.svg" alt="trophy" className="w-12 h-12" />
            <h3 className="text-lg md:text-xl font-bold text-white line-clamp-2 group-hover:scale-105 transition-transform duration-200">
              {concour.nom}
            </h3>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-900">
            <img src="/assets/icons/calendar.svg" alt="calendar" className="w-4 h-4" />
            <span>{concour.annee}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <img src="/assets/icons/graduation.svg" alt="graduation" className="w-5 h-5" />
            <span>{ecoleName}</span>
          </div>

          {concour.communique && (
            <div className="flex items-center space-x-2 text-sm text-green-500">
              <FaFilePdf className="w-4 h-4" />
              <span>Communiqué disponible</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs md:text-sm font-medium text-orange-600">Voir les détails</span>
          <FaArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </div>
  </a>
);

export default ConcoursCardDesktop;
