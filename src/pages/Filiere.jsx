import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SearchBar";
import UECard from "../components/UECard";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import {
  databases,
  storage,
  databaseId,
  filieresCollectionId,
  uesCollectionId,
  bucketId,
  Query,
} from "../appwrite";

const Filiere = () => {
  const { filiereName } = useParams();
  const [filiere, setFiliere] = useState(null);
  const [ues, setUes] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch filière
  useEffect(() => {
    const fetchFiliere = async () => {
      try {
        const normalizedName = decodeURIComponent(filiereName).trim();
        console.log("Recherche de la filière :", normalizedName);
        const response = await databases.listDocuments(databaseId, filieresCollectionId, [
          Query.equal("nom", normalizedName),
        ]);
        if (response.documents.length > 0) {
          setFiliere(response.documents[0]);
          console.log("Filière trouvée :", response.documents[0]);
        } else {
          console.log("Aucune filière trouvée pour :", normalizedName);
          setError(`Filière "${normalizedName}" non trouvée`);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la filière :", error);
        setError("Erreur lors du chargement de la filière");
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchFiliere();
  }, [filiereName]);

  // Fetch UEs quand filière est disponible
  useEffect(() => {
    if (!filiere || error) return;

    const fetchUEs = async () => {
      try {
        setIsLoading(true);
        const response = await databases.listDocuments(databaseId, uesCollectionId, [
          Query.equal("idFiliere", filiere.$id),
        ]);
        const uesWithFiles = await Promise.all(
          response.documents.map(async (ue) => {
            const fileIds = ue.ressources || [];
            const files = await Promise.all(
              fileIds.map(async (fileId) => {
                try {
                  const file = await storage.getFile(bucketId, fileId);
                  return { $id: file.$id, name: file.name, mimeType: file.mimeType };
                } catch (error) {
                  console.warn(`Fichier ${fileId} introuvable :`, error.message);
                  return null;
                }
              })
            );
            return { ...ue, files: files.filter((file) => file !== null) };
          })
        );
        setUes(uesWithFiles);
      } catch (error) {
        console.error("Erreur lors de la récupération des UEs :", error);
        setError("Erreur lors du chargement des cours");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUEs();
  }, [filiere?.$id]);

  if (error || (!filiere && !isLoading)) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 text-center">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-4">
          {error || `Filière "${decodeURIComponent(filiereName)}" non trouvée`}
        </h2>
        <BackButton />
      </div>
    );
  }

  const yearOptions = [...new Set(ues.flatMap((ue) => ue.anneeEnseignement))];
  const filteredUes = ues
    .filter((ue) => ue.nom.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((ue) => (selectedYear ? ue.anneeEnseignement.includes(selectedYear) : true));

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 truncate">
          {filiere?.nom || "Chargement..."}
        </h1>
        <BackButton />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:mb-6">
        <FilterSelect
          label="Année"
          options={yearOptions}
          value={selectedYear}
          onChange={setSelectedYear}
        />
        <SearchBar onSearch={setSearchQuery} placeholder="Rechercher une UE" />
      </div>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredUes.length > 0 ? (
            filteredUes.map((ue) => <UECard key={ue.$id} ue={ue} />)
          ) : (
            <div className="col-span-full text-center py-8">
              <FaExclamationTriangle className="text-3xl sm:text-4xl text-yellow-500 mx-auto mb-4" />
              <p className="text-base sm:text-lg text-gray-800">Aucune UE trouvée.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Filiere;