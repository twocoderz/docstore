import React from "react";
import { FaChevronDown } from "react-icons/fa";

const FilterSelect = ({ label, options, value, onChange }) => {
  return (
    <div className="relative">
      {/* Layout responsive : vertical sur mobile, horizontal sur grand écran */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-3">
        <label className="block text-sm font-medium text-gray-700 mb-2 lg:mb-0 lg:whitespace-nowrap">
          {label}
        </label>
        <div className="relative lg:min-w-0 lg:flex-1">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 appearance-none"
          >
            <option value="">Tous</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <FaChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSelect;