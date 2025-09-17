import React from "react";
import { FaFilter } from "react-icons/fa";
import ModernSelect from "./ModernSelect";

const SemesterFilter = ({ semesters, onSemesterChange }) => {
  return (
    <div className="my-4 flex items-center">
      <FaFilter className="mr-2 text-[#2F2E41]" />
      <label className="mr-2 font-semibold text-[#2F2E41]">Filtrer par semestre :</label>
      <div className="w-56">
        <ModernSelect
          value={semesters?.[0]?.name}
          onChange={onSemesterChange}
          options={semesters.map((s) => s.name)}
          variant="slate"
        />
      </div>
    </div>
  );
};

export default SemesterFilter;
