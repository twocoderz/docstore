import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  databases,
  databaseId,
  ecolesCollectionId,
  filieresCollectionId,
  concoursCollectionId,
  Query,
} from "../appwrite";
import LoadingState from "../components/filiere/LoadingState";
import ErrorState from "../components/filiere/ErrorState";
import EcoleHeader from "../components/ecole/EcoleHeader";
import ConcoursSection from "../components/ecole/ConcoursSection";
import ParcoursFilter from "../components/ecole/ParcoursFilter";
import FiliereGrid from "../components/ecole/FiliereGrid";

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
    return <LoadingState message="Chargement de l'école..." />;
  }

  if (error && !isLoading) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="space-y-8">
      <EcoleHeader ecole={ecole} />

      <ConcoursSection concours={concours} />

      <ParcoursFilter
        options={parcoursOptions}
        value={selectedParcours}
        onChange={setSelectedParcours}
      />

      <FiliereGrid
        filieres={filteredFilieres}
        selectedParcours={selectedParcours}
        onOpenFiliere={(filiere) =>
          window.open(`/filiere/${encodeURIComponent(filiere.nom)}`, "noopener,noreferrer")
        }
      />
    </div>
  );
};

export default Ecole;