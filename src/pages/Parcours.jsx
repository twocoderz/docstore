import React, { useState } from "react";
import { eplData } from "../data/courses";
import { FaExclamationTriangle } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import FiliereCard from "../components/FiliereCard";

const Parcours = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParcours, setSelectedParcours] = useState(null);

  const filteredParcours = eplData.parcours
    .map((parcours) => ({
      ...parcours,
      filieres: parcours.filieres.filter((filiere) =>
        filiere.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((parcours) =>
      selectedParcours ? parcours.name === selectedParcours : true
    )
    .filter((parcours) => parcours.filieres.length > 0 || searchQuery === "");

  return (
    <div className="min-h-screen flex bg-[#F7F7F7]">
      <Sidebar
        parcoursList={eplData.parcours}
        onParcoursSelect={setSelectedParcours}
        onSearch={setSearchQuery}
      />
      <main className="flex-grow p-4 md:p-6">
        <section className="mt-12 md:mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParcours.map((parcours) =>
            parcours.filieres.map((filiere) => (
              <FiliereCard
                key={filiere.name}
                filiere={filiere}
                parcoursName={parcours.name}
              />
            ))
          )}
          {filteredParcours.length === 0 && (
            <div className="col-span-full text-center text-[#1A1A1A] py-8">
              <FaExclamationTriangle className="text-4xl text-yellow-500 mx-auto mb-4" />
              <p className="text-lg">Aucune filière trouvée.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Parcours;
