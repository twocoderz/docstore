import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <Link
      to="/parcours"
      className="inline-flex items-center bg-[#4A90E2] text-white py-2 px-4 rounded-md hover:bg-[#357ABD] transition duration-200"
    >
      <FaArrowLeft className="mr-2" />
      Retour
    </Link>
  );
};

export default BackButton;
