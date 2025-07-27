import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate(-1)}
      className={`inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 group ${className}`}
    >
      <FaArrowLeft className="w-4 h-4 text-gray-500 group-hover:-translate-x-0.5 transition-transform duration-200" />
      <span className="text-gray-700 font-medium">Retour</span>
    </button>
  );
};

export default BackButton;