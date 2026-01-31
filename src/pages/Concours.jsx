import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModernSelect from "../components/ModernSelect";
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
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-orange-900 to-gray-900 bg-clip-text text-transparent">
          Concours d'Entrée
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
          Découvrez tous les concours d'entrée disponibles pour les différentes écoles
        </p>
      </div>

      {/* Filtres */}
      <ModernSelect
        value={selectedYear}
        onChange={setSelectedYear}
        options={years}
        variant="orange"
        className="w-30"
      />

      {/* Grille des concours */}
      {filteredConcours.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredConcours.map((concour) => (
            <div key={concour.$id} className="group">
              {/* Desktop: Open in new tab */}
              <a
                href={`/concours/${concour.$id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block h-full"
              >
                <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
                  {/* Header avec gradient */}
                  <div className="h-18 md:h-22 bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute bottom-2 left-6 right-6">
                      <div className="flex items-center space-x-3">
                        <img src="/assets/icons/trophy.svg" alt="trophy" className="w-12 h-12" />
                        <h3 className="text-lg md:text-xl font-bold text-white line-clamp-2 group-hover:scale-105 transition-transform duration-200">
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
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <img src="/assets/icons/calendar.svg" alt="calendar" className="w-5 h-5" />
                        <span>{concour.annee}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <img src="/assets/icons/graduation.svg" alt="graduation" className="w-5 h-5" />
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
                      <span className="text-xs md:text-sm font-medium text-orange-600">Voir les détails</span>
                      <FaArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </a>

              {/* Mobile: Navigate in same tab */}
              <Link
                to={`/concours/${concour.$id}`}
                className="block md:hidden h-full"
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
                        <h3 className="text-lg md:text-xl font-bold text-white line-clamp-2 group-hover:scale-105 transition-transform duration-200">
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
                    <p className="text-gray-600 line-clamp-3 leading-relaxed text-sm md:text-base">
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
                      <span className="text-xs md:text-sm font-medium text-orange-600">Voir les détails</span>
                      <FaArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
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