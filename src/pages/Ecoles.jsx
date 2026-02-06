import React, { useState, useEffect } from "react";
import { databases, databaseId, ecolesCollectionId } from "../appwrite";
import LoadingState from "../components/filiere/LoadingState";
import ErrorState from "../components/filiere/ErrorState";
import EcolesHeader from "../components/ecoles/EcolesHeader";
import EcolesGrid from "../components/ecoles/EcolesGrid";

// Fonction pour détecter si l'appareil est mobile
const isMobileDevice = () => {
  return window.innerWidth < 768; // Considère mobile si largeur < 768px
};

const Ecoles = () => {
  const [ecoles, setEcoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(isMobileDevice);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchEcoles = async () => {
      try {
        const response = await databases.listDocuments(databaseId, ecolesCollectionId);
        setEcoles(response.documents);
        setError(null);
      } catch {
        setError("Erreur lors de la récupération des écoles.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEcoles();
  }, []);

  if (isLoading) {
    return <LoadingState message="Chargement des écoles..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="space-y-8">
      <EcolesHeader />
      <EcolesGrid ecoles={ecoles} isMobile={isMobile} />
    </div>
  );
};

export default Ecoles;