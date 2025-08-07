import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FilterSelect from "../components/FilterSelect";
import {
  databases,
  databaseId,
  ecolesCollectionId,
  filieresCollectionId,
  concoursCollectionId,
  Query,
} from "../appwrite";
import { 
  FaUniversity, 
  FaBook, 
  FaMapMarkerAlt, 
  FaArrowLeft, 
  FaArrowRight,
  FaSpinner,
  FaGraduationCap,
  FaTrophy,
  FaCalendarAlt
} from "react-icons/fa";

const Ecole = () => {
  const { ecoleName } = useParams();
  const [ecole, setEcole] = useState(null);
  const [filieres, setFilieres] = useState([]);
  const [concours, setConcours] = useState([]);
  const [selectedParcours, setSelectedParcours] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEcole = async () => {
      try {
        const response = await databases.listDocuments(
          databaseId,
          ecolesCollectionId,
          [Query.equal("nom", decodeURIComponent(ecoleName))]
        );
        if (response.documents.length > 0) {
          setEcole(response.documents[0]);
          setError(null);
        } else {
          setEcole(null);
          setError("École non trouvée.");
        }
      } catch {
        setError("Erreur lors de la récupération de l'école.");
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchEcole();
  }, [ecoleName]);

  useEffect(() => {
    if (!ecole) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Récupérer les filières
        const filieresResponse = await databases.listDocuments(
          databaseId,
          filieresCollectionId,
          [Query.equal("idEcole", ecole.$id)]
        );
        setFilieres(filieresResponse.documents);
        
        // Récupérer les concours
        const concoursResponse = await databases.listDocuments(
          databaseId,
          concoursCollectionId,
          [Query.equal("idEcole", ecole.$id)]
        );
        setConcours(concoursResponse.documents);
        
        setError(null);
      } catch {
        setError("Erreur lors de la récupération des données.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [ecole]);

  const parcoursOptions = [...new Set(filieres.map((f) => f.parcours))];
  const filteredFilieres = filieres.filter(
    (f) => !selectedParcours || f.parcours === selectedParcours
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <FaSpinner className="absolute inset-0 m-auto w-6 h-6 text-blue-600 animate-pulse" />
        </div>
        <p className="mt-4 text-gray-600 font-medium">Chargement de l'école...</p>
      </div>
    );
  }

  if (error && !isLoading) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* En-tête avec breadcrumb et bouton retour */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/ecoles"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
          >
            <FaArrowLeft className="w-4 h-4 text-gray-500 group-hover:-translate-x-0.5 transition-transform duration-200" />
            <span className="text-gray-700 font-medium">Retour</span>
          </Link>
        </div>
      </div>

      {/* Header de l'école */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <FaUniversity className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {ecole?.nom || "Chargement..."}
                  </h1>
                  {ecole?.lieu && (
                    <div className="flex items-center space-x-2 mt-2">
                      <FaMapMarkerAlt className="w-4 h-4 text-blue-200" />
                      <span className="text-blue-100">{ecole.lieu}</span>
                    </div>
                  )}
                </div>
              </div>
              {ecole?.description && (
                <p className="text-blue-100 max-w-2xl leading-relaxed">
                  {ecole.description}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Éléments décoratifs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Section Concours */}
      {concours.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg">
              <FaTrophy className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Concours d'Entrée</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concours.map((concour) => (
              <Link
                key={concour.$id}
                to={`/concours/${concour.$id}`}
                className="group"
              >
                <div className="h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
                  {/* Header de la carte */}
                  <div className="h-24 bg-gradient-to-br from-orange-500 to-yellow-600 relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                          <FaTrophy className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white line-clamp-1 group-hover:scale-105 transition-transform duration-200">
                          {concour.nom}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Contenu de la carte */}
                  <div className="p-6 space-y-4">
                    <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                      {concour.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        <FaCalendarAlt className="w-3 h-3 mr-1" />
                        {concour.annee}
                      </span>
                      <FaArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Filtres */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <FaGraduationCap className="w-5 h-5 text-blue-600" />
            <span>Filtrer les filières</span>
          </h3>
          <div className="flex-1 max-w-xs">
            <FilterSelect
              label="Parcours"
              options={parcoursOptions}
              value={selectedParcours}
              onChange={setSelectedParcours}
            />
          </div>
        </div>
      </div>

      {/* Grille des filières */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFilieres.length > 0 ? (
            filteredFilieres.map((filiere) => (
              <Link
                key={filiere.$id}
                to={`/filiere/${encodeURIComponent(filiere.nom)}`}
                className="group"
              >
                <div className="h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
                  {/* Header de la carte */}
                  <div className="h-24 bg-gradient-to-br from-indigo-500 to-purple-600 relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                          <FaBook className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white line-clamp-1 group-hover:scale-105 transition-transform duration-200">
                          {filiere.nom}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Contenu de la carte */}
                  <div className="p-6 space-y-4">
                    <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                      {filiere.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {filiere.parcours}
                      </span>
                      <FaArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaBook className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune filière trouvée</h3>
              <p className="text-gray-600">
                {selectedParcours 
                  ? "Aucune filière ne correspond aux filtres sélectionnés." 
                  : "Cette école n'a pas encore de filières disponibles."
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Ecole;