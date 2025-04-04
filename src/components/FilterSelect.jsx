import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const FilterSelect = ({ label, options, value, onChange }) => {
  return (
    <div className="flex items-center w-full sm:w-40">
      <FaCalendarAlt className="text-lg text-[#4A90E2] mr-2" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md bg-[#F7F7F7] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition duration-200"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
