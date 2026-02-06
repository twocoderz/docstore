import React from "react";
import ModernSelect from "../ModernSelect";

const ConcoursFilters = ({ selectedYear, onYearChange, years }) => (
  <ModernSelect
    value={selectedYear}
    onChange={onYearChange}
    options={years}
    variant="orange"
    className="w-30"
  />
);

export default ConcoursFilters;
