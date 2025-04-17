import React from "react";

const FilterSelect = ({ label, options, value, onChange }) => {
  return (
    <div className="flex items-center space-x-2 w-full sm:w-auto">
      <label className="text-gray-800 font-medium text-sm sm:text-base">{label} :</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded-md bg-white text-gray-800 text-sm sm:text-base w-full"
      >
        <option value="">Tous</option>
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