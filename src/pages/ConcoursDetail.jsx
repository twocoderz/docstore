import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { databases, storage, databaseId, concoursCollectionId, ecolesCollectionId, bucketId } from "../appwrite";
import { FaBook, FaFilePdf } from "react-icons/fa";
import { getGoogleDrivePreviewUrl, getGoogleDriveDownloadUrl, isGoogleDriveUrl, getGoogleDriveFileName } from "../utils/googleDrive";
import LoadingState from "../components/filiere/LoadingState";
import ErrorState from "../components/filiere/ErrorState";
import ConcoursDetailHeader from "../components/concours-detail/ConcoursDetailHeader";
import FilesSection from "../components/concours-detail/FilesSection";

const ConcoursDetail = () => {
  const { concoursId } = useParams();
  const navigate = useNavigate();
  const [concours, setConcours] = useState(null);
  const [ecoles, setEcoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [communiques, setCommuniques] = useState([]);
  const [ressources, setRessources] = useState([]);

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
      window.open(file.url, '_blank');
    }
  };
  // Nom de l'école
  const getEcoleName = (ecoleId) => {
    const ecole = ecoles.find(e => e.$id === ecoleId);
    return ecole ? ecole.nom : ecoleId;
  };

  if (isLoading) {
    return <LoadingState message="Chargement du concours..." />;
  }
  if (error || !concours) {
    return <ErrorState message={error || "Concours non trouvé"} />;
  }

  return (
    <div className="space-y-8">
      <ConcoursDetailHeader
        concours={concours}
        ecoleName={getEcoleName(concours.idEcole)}
        onBack={() => navigate(-1)}
      />

      <div className="p-8 space-y-8 bg-white rounded-2xl border border-gray-100">
        <FilesSection
          title="Communiqués officiels"
          icon={FaFilePdf}
          files={communiques}
          onPreview={handlePreview}
          onDownload={handleDownload}
        />

        <FilesSection
          title="Ressources et Épreuves"
          icon={FaBook}
          files={ressources}
          onPreview={handlePreview}
          onDownload={handleDownload}
          className={communiques.length > 0 ? "mt-8" : ""}
        />
      </div>
    </div>
  );
};

export default ConcoursDetail;