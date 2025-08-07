import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { databases, storage, databaseId, concoursCollectionId, ecolesCollectionId, bucketId } from "../appwrite";
import { 
  FaTrophy, 
  FaCalendarAlt, 
  FaUniversity, 
  FaArrowLeft, 
  FaSpinner, 
  FaFilePdf, 
  FaDownload,
  FaEye,
  FaBook
} from "react-icons/fa";
import { getGoogleDrivePreviewUrl, getGoogleDriveDownloadUrl, isGoogleDriveUrl, getGoogleDriveFileName } from "../utils/googleDrive";

const ConcoursDetail = () => {
  const { concoursId } = useParams();
  const navigate = useNavigate();
  const [concours, setConcours] = useState(null);
  const [ecoles, setEcoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [communiques, setCommuniques] = useState([]);
  const [ressources, setRessources] = useState([]);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewError, setPreviewError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer le concours
        const concoursResponse = await databases.getDocument(databaseId, concoursCollectionId, concoursId);
        setConcours(concoursResponse);
        // Récupérer les écoles pour avoir leurs noms
        const ecolesResponse = await databases.listDocuments(databaseId, ecolesCollectionId);
        setEcoles(ecolesResponse.documents);
        // Traiter les communiqués
        if (Array.isArray(concoursResponse.communiques)) {
          setCommuniques(await processFiles(concoursResponse.communiques));
        }
        // Traiter les ressources
        if (Array.isArray(concoursResponse.ressources)) {
          setRessources(await processFiles(concoursResponse.ressources));
        }
        setError(null);
      } catch {
        setError("Erreur lors de la récupération du concours.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [concoursId]);

  // Fonction utilitaire pour obtenir le nom d'un fichier (Google Drive ou Appwrite)
  const processFiles = async (files) => {
    return Promise.all(files.map(async (fileIdOrUrl) => {
      try {
        if (isGoogleDriveUrl(fileIdOrUrl)) {
          const fileName = await getGoogleDriveFileName(fileIdOrUrl);
          return {
            name: fileName,
            url: fileIdOrUrl,
            type: 'google-drive',
          };
        } else {
          // C'est probablement un ID Appwrite
          const file = await storage.getFile(bucketId, fileIdOrUrl);
          return {
            name: file.name,
            url: storage.getFileView(bucketId, file.$id),
            type: 'appwrite',
            fileId: file.$id
          };
        }
      } catch {
        return {
          name: 'Document',
          url: fileIdOrUrl,
          type: 'unknown',
        };
      }
    }));
  };

  // Gestion des boutons
  const handleDownload = (file) => {
    if (file.type === 'google-drive') {
      window.open(getGoogleDriveDownloadUrl(file.url), '_blank');
    } else if (file.type === 'appwrite' && file.fileId) {
      window.open(storage.getFileDownload(bucketId, file.fileId), '_blank');
    } else {
      window.open(file.url, '_blank');
    }
  };
  const handlePreview = (file) => {
    if (file.type === 'google-drive') {
      window.open(getGoogleDrivePreviewUrl(file.url), '_blank');
    } else {
      setPreviewError(null);
      setIsPreviewLoading(true);
      setPreviewFile(file);
    }
  };
  // Nom de l'école
  const getEcoleName = (ecoleId) => {
    const ecole = ecoles.find(e => e.$id === ecoleId);
    return ecole ? ecole.nom : ecoleId;
  };

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

  return (
    <div className="space-y-8">
      {/* Bouton retour */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
        >
          <FaArrowLeft className="w-4 h-4 text-gray-500 group-hover:-translate-x-0.5 transition-transform duration-200" />
          <span className="text-gray-700 font-medium">Retour</span>
        </button>
      </div>

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

        {/* Contenu principal */}
        <div className="p-8 space-y-8">
          {/* Description */}
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              {concours.description}
            </p>
          </div>

          {/* Communiqués (grille comme ressources) */}
          {communiques.length > 0 && (
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FaFilePdf className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Communiqués officiels</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {communiques.map((file, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <FaFilePdf className="w-5 h-5 text-red-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">{file.name}</p>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handlePreview(file)}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors duration-200"
                          >
                            <FaEye className="w-3 h-3" />
                            <span>Aperçu</span>
                          </button>
                          <button
                            onClick={() => handleDownload(file)}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                          >
                            <FaDownload className="w-3 h-3" />
                            <span>Télécharger</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ressources et Épreuves (grille identique filière) */}
          {ressources.length > 0 && (
            <div>
              <div className="flex items-center space-x-3 mb-4 mt-8">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FaBook className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Ressources et Épreuves</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ressources.map((file, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <FaFilePdf className="w-5 h-5 text-red-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">{file.name}</p>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handlePreview(file)}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors duration-200"
                          >
                            <FaEye className="w-3 h-3" />
                            <span>Aperçu</span>
                          </button>
                          <button
                            onClick={() => handleDownload(file)}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                          >
                            <FaDownload className="w-3 h-3" />
                            <span>Télécharger</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal d'aperçu */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 truncate">
                Aperçu : {previewFile.name}
              </h2>
              <button
                onClick={() => {
                  setPreviewFile(null);
                  setPreviewError(null);
                  setIsPreviewLoading(false);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-full pb-6">
              {previewError ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <FaFilePdf className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="text-red-600 font-medium">Impossible de prévisualiser le PDF</p>
                    <p className="text-gray-500 text-sm mt-1">{previewError}</p>
                  </div>
                </div>
              ) : (
                <div className="relative h-full">
                  {isPreviewLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <p className="text-gray-600 font-medium">Chargement du PDF...</p>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={previewFile.url}
                    className="w-full h-full"
                    style={{ height: 'calc(100% - 80px)' }}
                    title="PDF Preview"
                    onLoad={() => setIsPreviewLoading(false)}
                    onError={() => {
                      setIsPreviewLoading(false);
                      setPreviewError("Erreur lors du chargement du PDF : fichier introuvable ou non accessible");
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConcoursDetail;