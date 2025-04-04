import React, { useState } from "react";
import { eplData } from "../data/courses";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CourseCard from "../components/CourseCard";
import FilterSelect from "../components/FilterSelect";
import BackButton from "../components/BackButton";

const Filiere = () => {
  const { filiereName } = useParams();
  const filiere = eplData.parcours
    .flatMap((p) => p.filieres)
    .find((f) => f.name.toLowerCase().replace(" ", "-") === filiereName);

  const [selectedYear, setSelectedYear] = useState(filiere?.years[0]?.year || "");
  const [selectedSemester, setSelectedSemester] = useState(
    filiere?.years[0]?.semesters[0]?.name || ""
  );

  if (!filiere) {
    return (
      <div className="min-h-screen flex bg-[#F7F7F7]">
        <Sidebar parcoursList={eplData.parcours} onParcoursSelect={() => {}} onSearch={() => {}} />
        <main className="flex-grow p-6 text-center">
          <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">Filière non trouvée</h2>
          <BackButton />
        </main>
      </div>
    );
  }

  const currentYear = filiere.years.find((y) => y.year === selectedYear);
  const currentSemester = currentYear?.semesters.find((s) => s.name === selectedSemester);

  return (
    <div className="min-h-screen flex bg-[#F7F7F7]">
      <Sidebar parcoursList={eplData.parcours} onParcoursSelect={() => {}} onSearch={() => {}} />
      <main className="flex-grow p-4 md:p-6">
        <section className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white p-4 rounded-md shadow-sm">
          <FilterSelect
            label="Année"
            options={filiere.years.map((y) => y.year)}
            value={selectedYear}
            onChange={setSelectedYear}
          />
          <FilterSelect
            label="Semestre"
            options={currentYear?.semesters.map((s) => s.name) || []}
            value={selectedSemester}
            onChange={setSelectedSemester}
          />
          <div className="mt-2 sm:mt-0">
            <BackButton />
          </div>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSemester?.courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Filiere;
