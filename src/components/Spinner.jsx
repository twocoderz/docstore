import React from "react";

const Spinner = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-3",
    lg: "w-8 h-8 border-4",
  };

  return (
    <div
      className={`inline-block ${sizeClasses[size]} border-t-blue-500 border-solid rounded-full animate-spin`}
    ></div>
  );
};

export default Spinner;