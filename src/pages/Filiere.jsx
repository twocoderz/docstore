import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { databases, storage, databaseId, filieresCollectionId, uesCollectionId, bucketId, Query } from "../appwrite";
import { isGoogleDriveUrl, getGoogleDriveFileName, getGoogleDriveDownloadUrl } from "../utils/googleDrive";
import deburr from "lodash/deburr";
import ErrorState from "../components/filiere/ErrorState";
import LoadingState from "../components/filiere/LoadingState";
import FiliereHeader from "../components/filiere/FiliereHeader";
import FiliereFilters from "../components/filiere/FiliereFilters";
import UeCard from "../components/filiere/UeCard";
import EmptyState from "../components/filiere/EmptyState";
import Pagination from "../components/filiere/Pagination";
import PdfPreviewModal from "../components/filiere/PdfPreviewModal";

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
                  // Détecter si c'est un lien Google Drive ou un ID Appwrite
                  if (isGoogleDriveUrl(fileId)) {
                    // C'est un lien Google Drive - récupérer le nom via API
                    const fileName = await getGoogleDriveFileName(fileId);
                    return {
                      $id: fileId,
                      name: fileName,
                      mimeType: 'application/pdf',
                      type: 'google-drive',
                      url: fileId
                    };
                  } else {
                    // C'est un ID Appwrite
                    const file = await storage.getFile(bucketId, fileId);
                    return {
                      $id: file.$id,
                      name: file.name,
                      mimeType: file.mimeType,
                      type: 'appwrite',
                      url: storage.getFileView(bucketId, file.$id)
                    };
                  }
                } catch (error) {
                  console.error('Erreur lors de la récupération du fichier:', error);
                  return null;
                }
              })
            );
            return { ...ue, files: files.filter((file) => file !== null) };
          })
        );
        setUes(uesWithFiles);
      } catch {
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

  const handlePreview = (file) => {
    if (file.type === 'google-drive') {
      // Pour Google Drive, on ouvre dans un nouvel onglet
      window.open(file.url, '_blank');
    } else {
      // Pour Appwrite, on utilise le modal
      setPreviewUrl(file.url);
      setPreviewFileName(file.name);
      setPreviewOpen(true);
    }
  };

  const handleDownload = (file) => {
    if (file.type === 'google-drive') {
      // Pour Google Drive, on ouvre le lien de téléchargement
      const downloadUrl = getGoogleDriveDownloadUrl(file.url);
      window.open(downloadUrl, '_blank');
    } else {
      // Pour Appwrite, on utilise le lien de téléchargement
      window.open(storage.getFileDownload(bucketId, file.$id), '_blank');
    }
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setPreviewUrl(null);
    setPreviewFileName("");
  };

  const toggleUE = (ueId) => {
    setExpandedUE(expandedUE === ueId ? null : ueId);
  };

  // Réinitialiser la page quand la recherche ou le filtre change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedYear]);

  const paginatedUes = sortedUes.slice((page - 1) * UES_PER_PAGE, page * UES_PER_PAGE);
  const pageCount = Math.ceil(sortedUes.length / UES_PER_PAGE);

  if (error || (!filiere && !isLoading)) {
    return (
      <ErrorState message={error || `Filière "${decodeURIComponent(filiereName)}" non trouvée`} />
    );
  }

  if (isLoading) {
    return <LoadingState message="Chargement de la filière..." />;
  }

  return (
    <div className="space-y-8">
      <FiliereHeader filiere={filiere} onBack={() => navigate(-1)} />

      <FiliereFilters
        yearOptions={yearOptions}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        onSearch={setSearchQuery}
        resultCount={filteredUes.length}
      />

      <div className="space-y-6">
        {paginatedUes.length > 0 ? (
          paginatedUes.map((ue) => (
            <UeCard
              key={ue.$id}
              ue={ue}
              expanded={expandedUE === ue.$id}
              onToggle={toggleUE}
              onPreview={handlePreview}
              onDownload={handleDownload}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </div>

      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />

      <PdfPreviewModal
        open={previewOpen}
        previewUrl={previewUrl}
        fileName={previewFileName}
        onClose={handleClosePreview}
      />
    </div>
  );
};

export default Filiere;