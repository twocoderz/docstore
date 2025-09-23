import React from "react";
import { Link } from "react-router-dom";

const FiliereCard = ({ filiere, parcoursName }) => {
  const handleClick = () => {
    window.open(`/filiere/${encodeURIComponent(filiere.name)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div className="card-smooth-hover bg-white p-6 rounded-md shadow-sm group">
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2 group-hover:text-blue-600 transition-colors duration-300">{filiere.name}</h3>
        <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">{filiere.description}</p>
        <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">Parcours : {parcoursName}</p>
      </div>
    </div>
  );
};

export default FiliereCard;