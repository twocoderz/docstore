import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UECard from "../components/UECard";
import FilterSelect from "../components/FilterSelect";
import BackButton from "../components/BackButton";
import SearchBar from "../components/SearchBar";
import { FaExclamationTriangle } from "react-icons/fa";
import {
  databases,
  storage,
  databaseId,
  filieresCollectionId,
  uesCollectionId,
  bucketId,
} from "../appwrite";

const Filiere = () => {
  const { filiereName } = useParams();
  const [filiere, setFiliere] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [ues, setUes] = useState([]);
  const [ueSearchQuery, setUeSearchQuery] = useState("");

  useEffect(() => {
    const fetchFiliere = async () => {
      try {
        const normalizedFiliereName = filiereName.trim();
        const response = await databases.listDocuments(databaseId, filieresCollectionId, [
          `equal("nom", "${normalizedFiliereName}")`,
        ]);
        if (response.documents.length > 0) {
          setFiliere(response.documents[0]);
        } else {
          console.log(`Aucune filière trouvée pour le nom : ${normalizedFiliereName}`);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la filière :", error);
      }
    };

    const fetchUEs = async () => {
      if (!filiere) return;
      try {
        const response = await databases.listDocuments(databaseId, uesCollectionId, [
          `equal("idFiliere", "${filiere.$id}")`,
        ]);
        const uesWithFiles = await Promise.all(
          response.documents.map(async (ue) => {
            const fileIds = ue.ressources || [];
            const files = await Promise.all(
              fileIds.map(async (fileId) => {
                const file = await storage.getFile(bucketId, fileId);
                return { $id: file.$id, name: file.name, mimeType: file.mimeType };
              })
            );
            return { ...ue, files };
          })
        );
        setUes(uesWithFiles);
        const allYears = [...new Set(uesWithFiles.flatMap((ue) => ue.anneeEnseignement))];
        setSelectedYear(allYears[0] || "");
      } catch (error) {
        console.error("Erreur lors de la récupération des UEs :", error);
      }
    };

    fetchFiliere().then(fetchUEs);
  }, [filiereName]);

  if (!filiere) {
    return (
      <div className="min-h-screen flex bg-[#F7F7F7]">
        <Sidebar parcoursList={[]} onParcoursSelect={() => {}} onSearch={() => {}} />
        <main className="flex-grow p-6 text-center">
          <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">
            Filière "{filiereName}" non trouvée
          </h2>
          <BackButton />
        </main>
      </div>
    );
  }

  const allYears = [...new Set(ues.flatMap((ue) => ue.anneeEnseignement))];
  const filteredUes = ues
    .filter((ue) => ue.nom.toLowerCase().includes(ueSearchQuery.toLowerCase()))
    .filter((ue) => (selectedYear ? ue.anneeEnseignement.includes(selectedYear) : true));

  return (
    <div className="min-h-screen flex bg-[#F7F7F7]">
      <Sidebar
        parcoursList={[{ name: filiere.parcours }]}
        onParcoursSelect={() => {}}
        onSearch={() => {}}
      />
      <main className="flex-grow p-4 md:p-6">
        <section className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white p-4 rounded-md shadow-sm">
            <FilterSelect
              label="Année"
              options={allYears}
              value={selectedYear}
              onChange={setSelectedYear}
            />
            <div className="mt-2 sm:mt-0">
              <BackButton />
            </div>
          </div>
          <SearchBar onSearch={setUeSearchQuery} placeholder="Rechercher une UE" />
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUes.length > 0 ? (
            filteredUes.map((ue) => <UECard key={ue.$id} ue={ue} />)
          ) : (
            <div className="col-span-full text-center text-[#1A1A1A] py-8">
              <FaExclamationTriangle className="text-4xl text-yellow-500 mx-auto mb-4" />
              <p className="text-lg">Aucune UE trouvée.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Filiere;