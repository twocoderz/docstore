import React, { useState, useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import FiliereCard from "../components/FiliereCard";
import { databases, databaseId, ecolesCollectionId, filieresCollectionId } from "../appwrite";

const Ecoles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEcole, setSelectedEcole] = useState(null);
  const [ecoles, setEcoles] = useState([]);
  const [filieres, setFilieres] = useState([]);

  useEffect(() => {
    const fetchEcoles = async () => {
      const response = await databases.listDocuments(databaseId, ecolesCollectionId);
      setEcoles(response.documents);
    };

    const fetchFilieres = async () => {
      const response = await databases.listDocuments(databaseId, filieresCollectionId);
      setFilieres(response.documents);
    };

    fetchEcoles().then(fetchFilieres);
  }, []);

  const filteredFilieres = filieres
    .filter((filiere) =>
      filiere.nom.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((filiere) =>
      selectedEcole ? filiere.idEcole === selectedEcole.$id : true
    );

  return (
    <div className="min-h-screen flex bg-[#F7F7F7]">
      <Sidebar
        parcoursList={[{ name: "Toutes les écoles" }, ...ecoles.map((ecole) => ({ name: ecole.nom }))]}
        onParcoursSelect={(nom) => {
          if (nom === "Toutes les écoles") {
            setSelectedEcole(null);
          } else {
            const ecole = ecoles.find((e) => e.nom === nom);
            setSelectedEcole(ecole);
          }
        }}
        onSearch={setSearchQuery}
      />
      <main className="flex-grow p-4 md:p-6">
        <section className="mt-12 md:mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFilieres.length > 0 ? (
            filteredFilieres.map((filiere) => (
              <FiliereCard
                key={filiere.$id}
                filiere={{ name: filiere.nom, description: filiere.description }}
                parcoursName={filiere.parcours}
              />
            ))
          ) : (
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

export default Ecoles;