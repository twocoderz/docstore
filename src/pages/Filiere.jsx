import React, { useState, useEffect } from "react";
import { eplData } from "../data/courses";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CourseCard from "../components/CourseCard";
import FilterSelect from "../components/FilterSelect";
import BackButton from "../components/BackButton";
import SearchBar from "../components/SearchBar";
import { FaExclamationTriangle } from "react-icons/fa";
import { databases, storage, databaseId, collectionId, bucketId, ID } from "../appwrite";

const Filiere = () => {
  const { filiereName } = useParams();
  const filiere = eplData.parcours
    .flatMap((p) => p.filieres)
    .find((f) => f.name.toLowerCase().replace(" ", "-") === filiereName);

  const [selectedYear, setSelectedYear] = useState(filiere?.years[0]?.year || "");
  const [selectedSemester, setSelectedSemester] = useState(
    filiere?.years[0]?.semesters[0]?.name || ""
  );
  const [courseSearchQuery, setCourseSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await databases.listDocuments(databaseId, collectionId);
      console.log(response);
      setCourses(response.documents);
    };
    fetchCourses();
  }, []);

  const handleFileUpload = async (event, courseId) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type;
    if (!["application/pdf", "application/msword", "application/zip"].includes(fileType)) {
      alert("Format non supporté. Utilisez PDF, Word ou ZIP.");
      return;
    }

    // Upload du fichier dans le bucket
    const uploadedFile = await storage.createFile(bucketId, ID.unique(), file, [
      "read('any')",
      "write('users')",
    ]);

    // Mise à jour du document du cours avec l'ID du fichier
    const course = courses.find((c) => c.$id === courseId);
    const updatedFileIds = [...(course.fileIds || []), uploadedFile.$id];
    await databases.updateDocument(databaseId, collectionId, courseId, {
      fileIds: updatedFileIds,
    });

    setCourses((prev) =>
      prev.map((c) => (c.$id === courseId ? { ...c, fileIds: updatedFileIds } : c))
    );
  };

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

  const filteredCourses = courses
    .filter((course) => course.title.toLowerCase().includes(courseSearchQuery.toLowerCase()))
    .map((course) => ({
      ...course,
      resources: (course.fileIds || []).map((fileId, index) => ({
        type: `Fichier ${index + 1}`,
        fileId,
        mimeType: "application/pdf", // À adapter selon les métadonnées réelles
      })),
    }));

  return (
    <div className="min-h-screen flex bg-[#F7F7F7]">
      <Sidebar parcoursList={eplData.parcours} onParcoursSelect={() => {}} onSearch={() => {}} />
      <main className="flex-grow p-4 md:p-6">
        <section className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white p-4 rounded-md shadow-sm">
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
          </div>
          <SearchBar onSearch={setCourseSearchQuery} placeholder="Rechercher un cours" />
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.$id}>
                <CourseCard course={course} />
                <input
                  type="file"
                  accept=".pdf,.doc,.zip"
                  onChange={(e) => handleFileUpload(e, course.$id)}
                  className="mt-2"
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-[#1A1A1A] py-8">
              <FaExclamationTriangle className="text-4xl text-yellow-500 mx-auto mb-4" />
              <p className="text-lg">Aucun cours trouvé.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Filiere;