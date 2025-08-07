import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { databases, databaseId, concoursCollectionId, ecolesCollectionId } from "../appwrite";
import { FaTrophy, FaCalendarAlt, FaUniversity, FaArrowRight, FaSpinner, FaFilePdf } from "react-icons/fa";

const Concours = () => {
  const [concours, setConcours] = useState([]);
  const [ecoles, setEcoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState("Tous");
  const [selectedEcole, setSelectedEcole] = useState("Toutes");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les concours
        const concoursResponse = await databases.listDocuments(databaseId, concoursCollectionId);
        setConcours(concoursResponse.documents);
        
        // Récupérer les écoles pour avoir leurs noms
        const ecolesResponse = await databases.listDocuments(databaseId, ecolesCollectionId);
        setEcoles(ecolesResponse.documents);
        
        setError(null);
      } catch {
        setError("Erreur lors de la récupération des données.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fonction pour obtenir le nom de l'école à partir de son ID
  const getEcoleName = (ecoleId) => {
    const ecole = ecoles.find(e => e.$id === ecoleId);
    return ecole ? ecole.nom : ecoleId;
  };

  // Extraire les années et écoles uniques pour les filtres
  const years = ["Tous", ...new Set(concours.map(c => c.annee))];
  const ecoleNames = ["Toutes", ...new Set(concours.map(c => getEcoleName(c.idEcole)))];

  // Filtrer les concours
  const filteredConcours = concours.filter(concour => {
    const yearMatch = selectedYear === "Tous" || concour.annee === selectedYear;
    const ecoleMatch = selectedEcole === "Toutes" || getEcoleName(concour.idEcole) === selectedEcole;
    return yearMatch && ecoleMatch;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
          <FaSpinner className="absolute inset-0 m-auto w-6 h-6 text-orange-600 animate-pulse" />
        </div>
        <p className="mt-4 text-gray-600 font-medium">Chargement des concours...</p>
      </div>
    );
  }

  if (error) {
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
      {/* En-tête avec style moderne */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl">
          <FaTrophy className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-orange-900 to-gray-900 bg-clip-text text-transparent">
          Concours d'Entrée
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Découvrez tous les concours d'entrée disponibles pour les différentes écoles
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        
        <select
          value={selectedEcole}
          onChange={(e) => setSelectedEcole(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
        >
          {ecoleNames.map(ecole => (
            <option key={ecole} value={ecole}>{ecole}</option>
          ))}
        </select>
      </div>

      {/* Grille des concours */}
      {filteredConcours.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredConcours.map((concour) => (
            <Link
              key={concour.$id}
              to={`/concours/${concour.$id}`}
              className="group"
            >
              <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                {/* Header avec gradient */}
                <div className="h-32 bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                        <FaTrophy className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:scale-105 transition-transform duration-200">
                        {concour.nom}
                      </h3>
                    </div>
                  </div>
                  {/* Pattern décoratif */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                </div>

                {/* Contenu */}
                <div className="p-6 space-y-4">
                  <p className="text-gray-600 line-clamp-3 leading-relaxed">
                    {concour.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <FaCalendarAlt className="w-4 h-4 text-orange-400" />
                      <span>{concour.annee}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <FaUniversity className="w-4 h-4 text-blue-400" />
                      <span>{getEcoleName(concour.idEcole)}</span>
                    </div>

                    {concour.communique && (
                      <div className="flex items-center space-x-2 text-sm text-green-500">
                        <FaFilePdf className="w-4 h-4" />
                        <span>Communiqué disponible</span>
                      </div>
                    )}
                  </div>

                  {/* Call to action */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium text-orange-600">Voir les détails</span>
                    <FaArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FaTrophy className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun concours disponible</h3>
          <p className="text-gray-600">Les concours seront affichés ici une fois ajoutés.</p>
        </div>
      )}
    </div>
  );
};

export default Concours; 