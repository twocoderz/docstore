import React from "react";
import FilterSelect from "../FilterSelect";

const ParcoursFilter = ({ options, value, onChange }) => (
  <FilterSelect options={options} value={value} onChange={onChange} />
);

export default ParcoursFilter;
