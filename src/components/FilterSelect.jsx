import React from "react";
import ModernSelect from "./ModernSelect";

const FilterSelect = ({ label, options, value, onChange }) => {
  return (
    <div className="relative">
      {/* Layout responsive : vertical sur mobile, horizontal sur grand écran */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-3">
        <label className="block text-sm font-medium text-gray-700 mb-2 lg:mb-0 lg:whitespace-nowrap">
          {label}
        </label>
        <div className="relative lg:min-w-0 lg:flex-1">
          <ModernSelect
            value={value}
            onChange={onChange}
            options={["Tous", ...options]}
            variant="blue"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSelect;