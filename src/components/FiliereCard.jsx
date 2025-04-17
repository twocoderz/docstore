import React from "react";
import { Link } from "react-router-dom";

const FiliereCard = ({ filiere, parcoursName }) => {
  return (
    <Link to={`/filiere/${encodeURIComponent(filiere.name)}`}>
      <div className="bg-white p-6 rounded-md shadow-sm hover:shadow-md transition duration-300">
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{filiere.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{filiere.description}</p>
        <p className="text-xs text-gray-500">Parcours : {parcoursName}</p>
      </div>
    </Link>
  );
};

export default FiliereCard;