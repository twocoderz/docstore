import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SearchBar";
import { databases, storage, databaseId, filieresCollectionId, uesCollectionId, bucketId, Query } from "../appwrite";
import { 
  FaBook, 
  FaFilePdf, 
  FaDownload, 
  FaEye, 
  FaArrowLeft,
  FaSpinner,
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaGraduationCap
} from "react-icons/fa";
import deburr from 'lodash/deburr';

const UES_PER_PAGE = 6;

const Filiere = () => {
  const { filiereName } = useParams();
  const navigate = useNavigate();
  const [filiere, setFiliere] = useState(null);
  const [ues, setUes] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFileName, setPreviewFileName] = useState("");
  const [page, setPage] = useState(1);
  const [expandedUE, setExpandedUE] = useState(null);

  useEffect(() => {
    const fetchFiliere = async () => {
      try {
        const normalizedName = decodeURIComponent(filiereName).trim();
        const response = await databases.listDocuments(databaseId, filieresCollectionId, [
          Query.equal("nom", normalizedName),
        ]);
        if (response.documents.length > 0) {
          setFiliere(response.documents[0]);
          setError(null);
        } else {
          setFiliere(null);
          setError(`Filière "${normalizedName}" non trouvée`);
        }
      } catch {
        setError("Erreur lors du chargement de la filière");
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchFiliere();
  }, [filiereName]);

  useEffect(() => {
    if (!filiere || error) return;
    const fetchUEs = async () => {
      try {
        setIsLoading(true);
        
        const response = await databases.listDocuments(
          databaseId, 
          uesCollectionId, 
          [
            Query.equal("idFiliere", filiere.$id),
            Query.limit(1000)
          ]
        );
        
        const uesWithFiles = await Promise.all(
          response.documents.map(async (ue) => {
            const fileIds = ue.ressources || [];
            const files = await Promise.all(
              fileIds.map(async (fileId) => {
                try {
                  const file = await storage.getFile(bucketId, fileId);
                  return { $id: file.$id, name: file.name, mimeType: file.mimeType };
                } catch {
                  return null;
                }
              })
            );
            return { ...ue, files: files.filter((file) => file !== null) };
          })
        );
        setUes(uesWithFiles);
      } catch (error) {
        setError("Erreur lors du chargement des cours");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUEs();
  }, [filiere, error]);

  const normalize = (str) => deburr(String(str).toLowerCase().trim());

  const yearOptions = [...new Set(ues.flatMap((ue) => ue.anneeEnseignement))]
    .filter(year => year)
    .sort((a, b) => {
      const yearA = parseInt(a.match(/\d+/)?.[0] || '0');
      const yearB = parseInt(b.match(/\d+/)?.[0] || '0');
      return yearA - yearB;
    });

  const filteredUes = ues
    .filter((ue) => ue.nom.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((ue) => {
      if (!selectedYear) return true;
      if (!ue.anneeEnseignement) return false;
      if (Array.isArray(ue.anneeEnseignement)) {
        return ue.anneeEnseignement.some(y => normalize(y) === normalize(selectedYear));
      }
      return normalize(ue.anneeEnseignement) === normalize(selectedYear);
    });

  const sortedUes = [...filteredUes].sort((a, b) => {
    const getMinYear = (ue) => {
      if (!ue.anneeEnseignement) return 99;
      const years = Array.isArray(ue.anneeEnseignement) ? ue.anneeEnseignement : [ue.anneeEnseignement];
      return Math.min(...years.map(y => parseInt((y.match(/\d+/) || [99])[0], 10)));
    };
    return getMinYear(a) - getMinYear(b);
  });

  const handlePreview = (fileId, fileName) => {
    setPreviewUrl(storage.getFileView(bucketId, fileId));
    setPreviewFileName(fileName);
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setPreviewUrl(null);
    setPreviewFileName("");
  };

  const toggleUE = (ueId) => {
    setExpandedUE(expandedUE === ueId ? null : ueId);
  };

  const paginatedUes = sortedUes.slice((page - 1) * UES_PER_PAGE, page * UES_PER_PAGE);
  const pageCount = Math.ceil(filteredUes.length / UES_PER_PAGE);

  if (error || (!filiere && !isLoading)) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error || `Filière "${decodeURIComponent(filiereName)}" non trouvée`}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <FaSpinner className="absolute inset-0 m-auto w-6 h-6 text-blue-600 animate-pulse" />
        </div>
        <p className="mt-4 text-gray-600 font-medium">Chargement de la filière...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* En-tête avec breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
        >
          <FaArrowLeft className="w-4 h-4 text-gray-500 group-hover:-translate-x-0.5 transition-transform duration-200" />
          <span className="text-gray-700 font-medium">Retour</span>
        </button>
      </div>

      {/* Header de la filière */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <FaBook className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {filiere?.nom || "Chargement..."}
                  </h1>
                  <p className="text-purple-100 mt-2">
                    Unités d'enseignement disponibles
                  </p>
                </div>
              </div>
              {filiere?.description && (
                <p className="text-purple-100 max-w-2xl leading-relaxed">
                  {filiere.description}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Éléments décoratifs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Section filtres et recherche */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex items-center space-x-2">
            <FaFilter className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="max-w-xs">
              <FilterSelect
                label="Année"
                options={yearOptions}
                value={selectedYear}
                onChange={setSelectedYear}
              />
            </div>
            
            <div className="flex-1 max-w-md">
              <SearchBar onSearch={setSearchQuery} placeholder="Rechercher une UE..." />
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            {filteredUes.length} résultat{filteredUes.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Liste des UE */}
      <div className="space-y-6">
        {paginatedUes.length > 0 ? (
          paginatedUes.map((ue) => (
            <div
              key={ue.$id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* En-tête de l'UE */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                        <FaGraduationCap className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                        {ue.nom}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed line-clamp-2">
                      {ue.description}
                    </p>
                    
                    {ue.anneeEnseignement && ue.anneeEnseignement.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(ue.anneeEnseignement) ? ue.anneeEnseignement : [ue.anneeEnseignement]).map((annee, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {annee}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => toggleUE(ue.$id)}
                    className="ml-4 p-2 cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    {expandedUE === ue.$id ? (
                      <FaChevronUp className="w-5 h-5" />
                    ) : (
                      <FaChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Section ressources (collapsible) */}
              {expandedUE === ue.$id && (
                <div className="p-6 bg-gray-50">
                  <div className="flex items-center space-x-2 mb-4">
                    <FaFilePdf className="w-5 h-5 text-red-500" />
                    <h4 className="text-lg font-semibold text-gray-900">Ressources disponibles</h4>
                  </div>
                  
                  {ue.files && ue.files.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {ue.files.map((file) => (
                        <div
                          key={file.$id}
                          className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="p-2 bg-red-100 rounded-lg">
                                <FaFilePdf className="w-5 h-5 text-red-600" />
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                                {file.name}
                              </p>
                              
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handlePreview(file.$id, file.name)}
                                  className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors duration-200"
                                >
                                  <FaEye className="w-3 h-3" />
                                  <span>Aperçu</span>
                                </button>
                                
                                <a
                                  href={storage.getFileDownload(bucketId, file.$id)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                                >
                                  <FaDownload className="w-3 h-3" />
                                  <span>Télécharger</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                        <FaFilePdf className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-600">Aucune ressource disponible pour cette UE</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaSearch className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune UE trouvée</h3>
            <p className="text-gray-600">
              Essayez de modifier vos filtres de recherche ou vérifiez l'orthographe.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-3 py-2 text-sm font-medium rounded-lg ${
                  page === pageNum
                    ? 'text-white bg-blue-600 border border-blue-600'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            ))}
            
            <button
              onClick={() => setPage(Math.min(pageCount, page + 1))}
              disabled={page === pageCount}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
        </div>
      )}

      {/* Modal d'aperçu PDF */}
      {previewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 truncate">
                Aperçu : {previewFileName}
              </h2>
              <button
                onClick={handleClosePreview}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-full pb-6">
              {previewUrl && (
                <iframe
                  src={previewUrl}
                  title="Aperçu PDF"
                  className="w-full h-full"
                  style={{ height: 'calc(100% - 80px)' }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filiere;