import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";

const EcoleCard = ({ ecole, isMobile }) => (
  <Link
    to={`/ecole/${encodeURIComponent(ecole.nom)}`}
    className="group"
    {...(!isMobile && { rel: "noopener noreferrer" })}
  >
    <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-gray-100 overflow-hidden transition-all duration-500 ease-out">
      <div className="h-18 md:h-22 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute bottom-2 left-6 right-6">
          <div className="flex items-center space-x-3">
            <img src="/assets/icons/graduation.svg" alt="school" className="w-12 h-12" />
            <h3 className="text-xl md:text-3xl font-bold text-white">{ecole.nom}</h3>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      <div className="p-6 space-y-4">
        <p className="text-gray-600 line-clamp-3 leading-relaxed">{ecole.description}</p>

        {ecole.lieu && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <FaMapMarkerAlt className="w-4 h-4 text-red-400" />
            <span>{ecole.lieu}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-blue-600">Voir les filières</span>
          <FaArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300 ease-out" />
        </div>
      </div>
    </div>
  </Link>
);

export default EcoleCard;
