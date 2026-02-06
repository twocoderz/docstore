import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCalendarAlt, FaFilePdf, FaTrophy, FaUniversity } from "react-icons/fa";

const ConcoursCardMobile = ({ concour, ecoleName }) => (
  <Link to={`/concours/${concour.$id}`} className="block md:hidden h-full">
    <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
      <div className="h-32 bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute bottom-4 left-6 right-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <FaTrophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white line-clamp-2 group-hover:scale-105 transition-transform duration-200">
              {concour.nom}
            </h3>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      <div className="p-6 space-y-4">
        <p className="text-gray-600 line-clamp-3 leading-relaxed text-sm md:text-base">
          {concour.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <FaCalendarAlt className="w-4 h-4 text-orange-400" />
            <span>{concour.annee}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <FaUniversity className="w-4 h-4 text-blue-400" />
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
  </Link>
);

export default ConcoursCardMobile;
