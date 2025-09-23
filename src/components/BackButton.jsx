import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-gray-50 hover:bg-gray-100 active:bg-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group ${className}`}
    >
      <FaArrowLeft className="w-5 h-5 text-gray-700 group-hover:-translate-x-0.5 group-active:scale-95 transition-transform duration-200" />
    </button>
  );
};

export default BackButton;