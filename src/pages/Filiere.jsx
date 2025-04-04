import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import SemesterFilter from "../components/SemesterFilter";
import { eplData } from "../data/courses";
import { FaCalendarAlt } from "react-icons/fa";

const Filiere = () => {
  const filiere = eplData.parcours[0].filieres[0]; // Génie Logiciel
  const [selectedYear, setSelectedYear] = useState(filiere.years[0]);
  const [selectedSemester, setSelectedSemester] = useState(
    selectedYear.semesters[0].name
  );

  const handleSemesterChange = (semesterName) => {
    setSelectedSemester(semesterName);
  };

  const currentSemester = selectedYear.semesters.find(
    (sem) => sem.name === selectedSemester
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">{filiere.name}</h2>
        <div className="mb-4 flex items-center">
          <FaCalendarAlt className="mr-2 text-gray-600" />
          <label className="mr-2 font-semibold">Année :</label>
          <select
            onChange={(e) =>
              setSelectedYear(
                filiere.years.find((y) => y.year === e.target.value)
              )
            }
            className="p-2 border rounded"
          >
            {filiere.years.map((year) => (
              <option key={year.year} value={year.year}>
                {year.year}
              </option>
            ))}
          </select>
        </div>
        <SemesterFilter
          semesters={selectedYear.semesters}
          onSemesterChange={handleSemesterChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentSemester.courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Filiere;
