import React, { useState, useEffect } from "react";
import { databases, databaseId, concoursCollectionId, ecolesCollectionId } from "../appwrite";
import LoadingState from "../components/filiere/LoadingState";
import ErrorState from "../components/filiere/ErrorState";
import ConcoursHeader from "../components/concours/ConcoursHeader";
import ConcoursFilters from "../components/concours/ConcoursFilters";
import ConcoursGrid from "../components/concours/ConcoursGrid";

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
    return <LoadingState message="Chargement des concours..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="space-y-8">
      <ConcoursHeader />

      <ConcoursFilters
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        years={years}
      />

      <ConcoursGrid concours={filteredConcours} getEcoleName={getEcoleName} />
    </div>
  );
};

export default Concours; 