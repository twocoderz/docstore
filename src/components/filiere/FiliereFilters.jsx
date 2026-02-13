import React from "react";
import { FaFilter } from "react-icons/fa";
import FilterSelect from "../FilterSelect";
import SearchBar from "../SearchBar";

const FiliereFilters = ({ yearOptions, selectedYear, onYearChange, onSearch, resultCount }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        <div className="max-w-xs">
          <FilterSelect
            label="Année"
            options={yearOptions}
            value={selectedYear}
            onChange={onYearChange}
          />
        </div>

        <div className="flex-1 max-w-md">
          <SearchBar onSearch={onSearch} placeholder="Rechercher une UE..." />
        </div>
      </div>

      <div className="text-sm text-gray-500">
        {resultCount} résultat{resultCount > 1 ? "s" : ""}
      </div>
    </div>
  </div>
);

export default FiliereFilters;
