import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";

const ConcoursCard = ({ concours }) => (
  <Link key={concours.$id} to={`/concours/${concours.$id}`} className="group">
    <div className="h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      <div className="h-14 bg-gradient-to-br from-orange-500 to-yellow-600 relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2">
            <div className="hidden sm:block">
              <img src="/assets/icons/trophy.svg" alt="school" className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white line-clamp-2 sm:line-clamp-1 group-hover:scale-105 transition-transform duration-200">
              {concours.nom}
            </h3>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
          {concours.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <FaCalendarAlt className="w-3 h-3 mr-1" />
            {concours.annee}
          </span>
          <FaArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </div>
  </Link>
);

export default ConcoursCard;
