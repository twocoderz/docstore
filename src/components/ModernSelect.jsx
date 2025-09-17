import React from "react";
import { FaChevronDown } from "react-icons/fa";

const VARIANT_STYLES = {
  orange: {
    focus: "focus:ring-orange-500 focus:border-orange-500",
    hover: "hover:border-orange-300",
    icon: "text-orange-500",
  },
  blue: {
    focus: "focus:ring-blue-500 focus:border-blue-500",
    hover: "hover:border-blue-300",
    icon: "text-blue-500",
  },
  slate: {
    focus: "focus:ring-slate-500 focus:border-slate-500",
    hover: "hover:border-slate-300",
    icon: "text-slate-500",
  },
};

const ModernSelect = ({
  value,
  onChange,
  options,
  placeholder,
  className = "",
  variant = "orange",
}) => {
  const v = VARIANT_STYLES[variant] || VARIANT_STYLES.orange;

  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`modern-select block w-full pl-4 pr-10 py-3 rounded-xl bg-white/90 text-gray-900 border border-gray-200 shadow-sm ${v.hover} ${v.focus} focus:outline-none transition-all duration-200 appearance-none`}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
        <FaChevronDown className={`h-4 w-4 ${v.icon}`} />
      </div>
    </div>
  );
};

export default ModernSelect;


