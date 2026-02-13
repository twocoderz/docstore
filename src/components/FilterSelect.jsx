import React from "react";
import ModernSelect from "./ModernSelect";

const FilterSelect = ({ options, value, onChange }) => {
  return (
    <div className="relative">
      {/* Layout responsive : vertical sur mobile, horizontal sur grand écran */}
      <div className="relative lg:w-34">
        <ModernSelect
          value={value}
          onChange={onChange}
          options={["Tous", ...options]}
          variant="blue"
        />
      </div>
    </div>
  );
};

export default FilterSelect;