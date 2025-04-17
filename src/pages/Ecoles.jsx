import React, { useState, useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { databases, databaseId, ecolesCollectionId } from "../appwrite";
import Spinner from "../components/Spinner";

const Ecoles = () => {
  const [ecoles, setEcoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEcoles = async () => {
      try {
        const response = await databases.listDocuments(databaseId, ecolesCollectionId);
        setEcoles(response.documents);
        console.log("Écoles récupérées :", response.documents);
      } catch (error) {
        console.error("Erreur lors de la récupération des écoles :", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEcoles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Écoles</h1>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {ecoles.length > 0 ? (
            ecoles.map((ecole) => (
              <Link
                key={ecole.$id}
                to={`/ecole/${encodeURIComponent(ecole.nom)}`}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                  {ecole.nom}
                </h2>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">{ecole.description}</p>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <FaExclamationTriangle className="text-3xl sm:text-4xl text-yellow-500 mx-auto mb-4" />
              <p className="text-base sm:text-lg text-gray-800">Aucune école trouvée.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Ecoles;