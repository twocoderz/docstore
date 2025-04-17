import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import FilterSelect from "../components/FilterSelect";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { databases, databaseId, ecolesCollectionId, filieresCollectionId, Query } from "../appwrite";

const Ecole = () => {
  const { ecoleName } = useParams();
  const [ecole, setEcole] = useState(null);
  const [filieres, setFilieres] = useState([]);
  const [selectedParcours, setSelectedParcours] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch école
  useEffect(() => {
    const fetchEcole = async () => {
      try {
        const response = await databases.listDocuments(databaseId, ecolesCollectionId, [
          Query.equal("nom", decodeURIComponent(ecoleName)),
        ]);
        if (response.documents.length > 0) {
          setEcole(response.documents[0]);
        } else {
          setEcole(null);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'école :", error);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchEcole();
  }, [ecoleName]);

  // Fetch filières quand école est disponible
  useEffect(() => {
    if (!ecole) return;

    const fetchFilieres = async () => {
      try {
        setIsLoading(true);
        const response = await databases.listDocuments(databaseId, filieresCollectionId, [
          Query.equal("idEcole", ecole.$id),
        ]);
        setFilieres(response.documents);
        console.log("Filières récupérées pour l'école :", response.documents);
      } catch (error) {
        console.error("Erreur lors de la récupération des filières :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilieres();
  }, [ecole?.$id]);

  if (!ecole && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 text-center">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-4">
          École "{decodeURIComponent(ecoleName)}" non trouvée
        </h2>
        <BackButton />
      </div>
    );
  }

  const parcoursOptions = [...new Set(filieres.map((f) => f.parcours))];
  const filteredFilieres = filieres.filter(
    (f) => !selectedParcours || f.parcours === selectedParcours
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 truncate">
          {ecole?.nom || "Chargement..."}
        </h1>
        <BackButton />
      </div>
      <FilterSelect
        label="Parcours"
        options={parcoursOptions}
        value={selectedParcours}
        onChange={setSelectedParcours}
      />
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
          {filteredFilieres.length > 0 ? (
            filteredFilieres.map((filiere) => (
              <Link
                key={filiere.$id}
                to={`/filiere/${encodeURIComponent(filiere.nom)}`}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                  {filiere.nom}
                </h2>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">{filiere.description}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Parcours : {filiere.parcours}</p>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <FaExclamationTriangle className="text-3xl sm:text-4xl text-yellow-500 mx-auto mb-4" />
              <p className="text-base sm:text-lg text-gray-800">Aucune filière trouvée.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Ecole;