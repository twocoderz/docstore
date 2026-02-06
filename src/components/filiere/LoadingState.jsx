import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingState = ({ message = "Chargement..." }) => (
  <div className="flex flex-col items-center justify-center py-24">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <FaSpinner className="absolute inset-0 m-auto w-6 h-6 text-blue-600 animate-pulse" />
    </div>
    <p className="mt-4 text-gray-600 font-medium">{message}</p>
  </div>
);

export default LoadingState;
