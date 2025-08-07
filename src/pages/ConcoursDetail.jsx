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
  FaExternalLinkAlt,
  FaBook,
  FaFolder,
  FaChevronDown,
  FaChevronRight
} from "react-icons/fa";
import { getGoogleDrivePreviewUrl, getGoogleDriveDownloadUrl, isGoogleDriveUrl, getGoogleDriveFileName } from "../utils/googleDrive";

const ConcoursDetail = () => {
  const { concoursId } = useParams();
  const navigate = useNavigate();
  const [concours, setConcours] = useState(null);
  const [ecoles, setEcoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFolders, setOpenFolders] = useState({});
  const [previewFile, setPreviewFile] = useState(null);
  const [previewError, setPreviewError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [organizedResources, setOrganizedResources] = useState([]);
  const [communiqueFile, setCommuniqueFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer le concours
        const concoursResponse = await databases.getDocument(databaseId, concoursCollectionId, concoursId);
        setConcours(concoursResponse);
        
        // Récupérer les écoles pour avoir leurs noms
        const ecolesResponse = await databases.listDocuments(databaseId, ecolesCollectionId);
        setEcoles(ecolesResponse.documents);
        
        // Traiter le communiqué s'il existe
        if (concoursResponse.communique) {
          await processCommunique(concoursResponse.communique);
        }

        // Traiter les ressources s'il y en a
        if (concoursResponse.ressources && concoursResponse.ressources.length > 0) {
          await processResources(concoursResponse.ressources);
        }
        
        setError(null);
      } catch {
        setError("Erreur lors de la récupération du concours.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [concoursId]);

  const processCommunique = async (communiqueUrl) => {
    try {
      if (isGoogleDriveUrl(communiqueUrl)) {
        const fileName = await getGoogleDriveFileName(communiqueUrl);
        setCommuniqueFile({
          name: fileName,
          url: communiqueUrl,
          type: 'google-drive',
          mimeType: 'application/pdf'
        });
      } else {
        // C'est probablement un ID Appwrite
        const file = await storage.getFile(bucketId, communiqueUrl);
        setCommuniqueFile({
          name: file.name,
          url: storage.getFileView(bucketId, file.$id),
          type: 'appwrite',
          mimeType: file.mimeType,
          fileId: file.$id
        });
      }
    } catch (error) {
      console.error('Erreur lors du traitement du communiqué:', error);
      setCommuniqueFile({
        name: 'Communiqué officiel',
        url: communiqueUrl,
        type: 'unknown',
        mimeType: 'application/pdf'
      });
    }
  };

  const processResources = async (ressources) => {
    try {
      const processedResources = await Promise.all(
        ressources.map(async (ressourceUrl, index) => {
          try {
            if (isGoogleDriveUrl(ressourceUrl)) {
              const fileName = await getGoogleDriveFileName(ressourceUrl);
              return {
                name: fileName,
                type: "file",
                url: ressourceUrl,
                mimeType: "application/pdf",
                fileType: 'google-drive'
              };
            } else {
              // C'est probablement un ID Appwrite
              const file = await storage.getFile(bucketId, ressourceUrl);
              return {
                name: file.name,
                type: "file",
                url: storage.getFileView(bucketId, file.$id),
                mimeType: file.mimeType,
                fileType: 'appwrite',
                fileId: file.$id
              };
            }
          } catch (error) {
            console.error('Erreur lors du traitement de la ressource:', error);
            return {
              name: `Document ${index + 1}`,
              type: "file",
              url: ressourceUrl,
              mimeType: "application/pdf",
              fileType: 'unknown'
            };
          }
        })
      );
      
      setOrganizedResources(processedResources);
    } catch (error) {
      console.error('Erreur lors du traitement des ressources:', error);
      setOrganizedResources([]);
    }
  };

  const toggleFolder = (folderPath) => {
    setOpenFolders((prev) => ({ ...prev, [folderPath]: !prev[folderPath] }));
  };

  const handleDownload = (file) => {
    if (file.fileType === 'google-drive') {
      const downloadUrl = getGoogleDriveDownloadUrl(file.url);
      window.open(downloadUrl, '_blank');
    } else if (file.fileType === 'appwrite' && file.fileId) {
      window.open(storage.getFileDownload(bucketId, file.fileId), '_blank');
    } else {
      window.open(file.url, '_blank');
    }
  };

  const handlePreview = (file) => {
    if (file.fileType === 'google-drive') {
      const previewUrl = getGoogleDrivePreviewUrl(file.url);
      window.open(previewUrl, '_blank');
    } else {
      setPreviewError(null);
      setIsPreviewLoading(true);
      setPreviewFile(file);
    }
  };

  // Fonction pour obtenir le nom de l'école à partir de son ID
  const getEcoleName = (ecoleId) => {
    const ecole = ecoles.find(e => e.$id === ecoleId);
    return ecole ? ecole.nom : ecoleId;
  };

  // Organiser les ressources en structure de dossiers
  const organizeResources = (ressources) => {
    return ressources || [];
  };

  const renderResourceItem = (item, path = "", level = 0) => {
    const itemPath = path ? `${path}/${item.name}` : item.name;
    const paddingLeft = level * 24;
    
    if (item.type === "file") {
      return (
        <div 
          key={itemPath}
          className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
          style={{ marginLeft: paddingLeft }}
        >
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <FaFilePdf className="text-red-500 w-5 h-5" />
            <span className="text-gray-800 font-medium truncate">{item.name}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePreview(item)}
              className="inline-flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors duration-200"
              title="Prévisualiser"
            >
              <FaEye className="w-4 h-4" />
              <span className="hidden sm:inline">Aperçu</span>
            </button>
            <button
              onClick={() => handleDownload(item)}
              className="inline-flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200"
              title="Télécharger"
            >
              <FaDownload className="w-4 h-4" />
              <span className="hidden sm:inline">Télécharger</span>
            </button>
          </div>
        </div>
      );
    }
    
    if (item.type === "folder") {
      const isOpen = openFolders[itemPath];
      
      return (
        <div key={itemPath} className="space-y-3">
          <div 
            className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 hover:border-yellow-300 cursor-pointer transition-all duration-200"
            style={{ marginLeft: paddingLeft }}
          >
            <div 
              className="flex items-center space-x-3 flex-1"
              onClick={() => toggleFolder(itemPath)}
            >
              {isOpen ? (
                <FaChevronDown className="w-4 h-4 text-yellow-600" />
              ) : (
                <FaChevronRight className="w-4 h-4 text-yellow-600" />
              )}
              <FaFolder className="text-yellow-500 w-5 h-5" />
              <span className="text-gray-800 font-medium">{item.name}</span>
              <span className="text-xs text-gray-500">({item.contents.length} élément{item.contents.length > 1 ? 's' : ''})</span>
            </div>
          </div>
          
          {isOpen && (
            <div className="space-y-3">
              {item.contents.map((subItem) => renderResourceItem(subItem, itemPath, level + 1))}
            </div>
          )}
        </div>
      );
    }
    
    return null;
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

  const organizedResourcesDisplay = organizeResources(organizedResources);

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

          {/* Communiqué officiel - Version améliorée */}
          {communiqueFile && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FaFilePdf className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Communiqué Officiel</h3>
                  <p className="text-sm text-gray-600">Document officiel de lancement du concours</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <FaFilePdf className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{communiqueFile.name}</p>
                      <p className="text-sm text-gray-500">Document officiel</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePreview(communiqueFile)}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors duration-200"
                      title="Prévisualiser"
                    >
                      <FaEye className="w-4 h-4" />
                      <span className="hidden sm:inline">Aperçu</span>
                    </button>
                    <button
                      onClick={() => handleDownload(communiqueFile)}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                      title="Télécharger"
                    >
                      <FaDownload className="w-4 h-4" />
                      <span className="hidden sm:inline">Télécharger</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ressources et Épreuves - Version améliorée similaire aux écoles */}
          {organizedResourcesDisplay.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FaBook className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Ressources et Épreuves</h3>
                  <p className="text-sm text-gray-600">Documents de préparation et épreuves des années précédentes</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  {organizedResourcesDisplay.map((item) => renderResourceItem(item))}
                </div>
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