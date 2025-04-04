import React from "react";
import { FaFolderOpen, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const FiliereCard = ({ filiere, parcoursName }) => {
  return (
    <Link
      to={`/filiere/${filiere.name.toLowerCase().replace(" ", "-")}`}
      className="bg-white p-6 rounded-md shadow-sm hover:shadow-md hover:bg-[#4A90E2] transition duration-300 group flex flex-col"
    >
      <div className="flex items-center mb-3">
        <FaFolderOpen className="text-xl text-[#4A90E2] mr-2 group-hover:text-white" />
        <h2 className="text-lg font-semibold text-[#1A1A1A] group-hover:text-white">
          {filiere.name}
        </h2>
      </div>
      <p className="text-sm text-gray-600 group-hover:text-white mb-3 flex-grow">
        {filiere.description || "Aucune description disponible"}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 group-hover:text-gray-200">
          {parcoursName}
        </span>
        <FaArrowRight className="text-lg text-[#1A1A1A] group-hover:text-white" />
      </div>
    </Link>
  );
};

export default FiliereCard;
