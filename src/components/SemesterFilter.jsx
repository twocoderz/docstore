import React from "react";
import { FaFilter } from "react-icons/fa";

const SemesterFilter = ({ semesters, onSemesterChange }) => {
  return (
    <div className="my-4 flex items-center">
      <FaFilter className="mr-2 text-[#2F2E41]" />
      <label className="mr-2 font-semibold text-[#2F2E41]">Filtrer par semestre :</label>
      <select
        onChange={(e) => onSemesterChange(e.target.value)}
        className="p-2 border rounded bg-white text-[#2F2E41]"
      >
        {semesters.map((semester) => (
          <option key={semester.name} value={semester.name}>
            {semester.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SemesterFilter;
