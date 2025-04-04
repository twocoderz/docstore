import React from "react";
import Navbar from "../components/Navbar";

const CourseDetails = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Détails du Cours</h2>
        <p>Contenu à venir...</p>
      </main>
    </div>
  );
};

export default CourseDetails;
