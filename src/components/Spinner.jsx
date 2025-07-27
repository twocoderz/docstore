import React from "react";

const Spinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`inline-block ${sizeClasses[size]} border-blue-200 border-t-blue-600 rounded-full animate-spin ${className}`}
    ></div>
  );
};

export default Spinner;