import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const EcoleHeader = ({ ecole }) => (
  <div className="space-y-8 pt-4 pb-4 bg-gray-50/80 backdrop-blur">
    <Link
      to="/ecoles"
      className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-gray-50 hover:bg-gray-100 active:bg-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group"
    >
      <svg className="w-5 h-5 text-gray-700 group-hover:-translate-x-0.5 group-active:scale-95 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </Link>

    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 text-white relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-3">
              <img src="/assets/icons/graduation.svg" alt="school" className="w-12 h-12" />
              <div>
                <h1 className="text-2xl md:text-4xl font-bold">
                  {ecole?.nom || "Chargement..."}
                </h1>
                {ecole?.lieu && (
                  <div className="flex items-center space-x-2 mt-2">
                    <FaMapMarkerAlt className="w-4 h-4 text-blue-200" />
                    <span className="text-blue-100">{ecole.lieu}</span>
                  </div>
                )}
              </div>
            </div>
            {ecole?.description && (
              <p className="text-lg md:text-2xl text-blue-100 max-w-2xl leading-relaxed">
                {ecole.description}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
    </div>
  </div>
);

export default EcoleHeader;
