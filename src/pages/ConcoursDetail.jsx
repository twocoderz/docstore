import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { databases, databaseId, concoursCollectionId, ecolesCollectionId } from "../appwrite";
import { 
  FaTrophy, 
  FaCalendarAlt, 
  FaUniversity, 
  FaArrowLeft, 
  FaSpinner, 
  FaFilePdf, 
  FaDownload,
  FaEye,
  FaExternalLinkAlt,
  FaBook
} from "react-icons/fa";
import { getGoogleDrivePreviewUrl, getGoogleDriveDownloadUrl, isGoogleDriveUrl } from "../utils/googleDrive";

const ConcoursDetail = () => {
  const { concoursId } = useParams();
  const [concours, setConcours] = useState(null);
  const [ecoles, setEcoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer le concours
        const concoursResponse = await databases.getDocument(databaseId, concoursCollectionId, concoursId);
        setConcours(concoursResponse);
        
        // Récupérer les écoles pour avoir leurs noms
        const ecolesResponse = await databases.listDocuments(databaseId, ecolesCollectionId);
        setEcoles(ecolesResponse.documents);
        
        setError(null);
      } catch {
        setError("Erreur lors de la récupération du concours.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [concoursId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
          <FaSpinner className="absolute inset-0 m-auto w-6 h-6 text-orange-600 animate-pulse" />
        </div>
        <p className="mt-4 text-gray-600 font-medium">Chargement du concours...</p>
      </div>
    );
  }

  if (error || !concours) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error || "Concours non trouvé"}</p>
          </div>
        </div>
      </div>
    );
  }

  const handleDownload = (url, filename) => {
    if (isGoogleDriveUrl(url)) {
      const downloadUrl = getGoogleDriveDownloadUrl(url);
      window.open(downloadUrl, '_blank');
    } else {
      window.open(url, '_blank');
    }
  };

  // Fonction pour obtenir le nom de l'école à partir de son ID
  const getEcoleName = (ecoleId) => {
    const ecole = ecoles.find(e => e.$id === ecoleId);
    return ecole ? ecole.nom : ecoleId;
  };

  const handlePreview = (url) => {
    if (isGoogleDriveUrl(url)) {
      const previewUrl = getGoogleDrivePreviewUrl(url);
      window.open(previewUrl, '_blank');
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="space-y-8">
      {/* Bouton retour */}
      <Link 
        to="/concours" 
        className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors duration-200"
      >
        <FaArrowLeft className="w-4 h-4" />
        <span>Retour aux concours</span>
      </Link>

      {/* En-tête du concours */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header avec gradient */}
        <div className="h-48 bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute bottom-6 left-8 right-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <FaTrophy className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {concours.nom}
                </h1>
                                  <div className="flex items-center space-x-4 text-white/90">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="w-4 h-4" />
                      <span>{concours.annee}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaUniversity className="w-4 h-4" />
                      <span>{getEcoleName(concours.idEcole)}</span>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          {/* Pattern décoratif */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-24 translate-x-24"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
        </div>

        {/* Contenu */}
        <div className="p-8">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {concours.description}
            </p>
          </div>

          {/* Communiqué officiel */}
          {concours.communique && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <FaFilePdf className="w-5 h-5 text-red-500" />
                <span>Communiqué Officiel</span>
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FaFilePdf className="w-6 h-6 text-red-500" />
                    <div>
                      <p className="font-medium text-gray-900">Communiqué du concours</p>
                      <p className="text-sm text-gray-500">Document officiel de lancement</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePreview(concours.communique)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <FaEye className="w-4 h-4" />
                      <span>Voir</span>
                    </button>
                    <button
                      onClick={() => handleDownload(concours.communique, 'communique.pdf')}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      <FaDownload className="w-4 h-4" />
                      <span>Télécharger</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ressources */}
          {concours.ressources && concours.ressources.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <FaBook className="w-5 h-5 text-blue-500" />
                <span>Ressources et Épreuves</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {concours.ressources.map((ressource, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FaFilePdf className="w-6 h-6 text-blue-500" />
                        <div>
                          <p className="font-medium text-gray-900">Ressource {index + 1}</p>
                          <p className="text-sm text-gray-500">Document de préparation</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePreview(ressource)}
                          className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors duration-200"
                        >
                          <FaEye className="w-3 h-3" />
                          <span>Voir</span>
                        </button>
                        <button
                          onClick={() => handleDownload(ressource, `ressource-${index + 1}.pdf`)}
                          className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors duration-200"
                        >
                          <FaDownload className="w-3 h-3" />
                          <span>DL</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConcoursDetail; 