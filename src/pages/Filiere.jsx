import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SearchBar";
import UECard from "../components/UECard";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import {
  databases,
  storage,
  databaseId,
  filieresCollectionId,
  uesCollectionId,
  bucketId,
  Query,
} from "../appwrite";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const Filiere = () => {
  const { filiereName } = useParams();
  const [filiere, setFiliere] = useState(null);
  const [ues, setUes] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      } catch (error) {
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
        const response = await databases.listDocuments(databaseId, uesCollectionId, [
          Query.equal("idFiliere", filiere.$id),
        ]);
        const uesWithFiles = await Promise.all(
          response.documents.map(async (ue) => {
            const fileIds = ue.ressources || [];
            const files = await Promise.all(
              fileIds.map(async (fileId) => {
                try {
                  const file = await storage.getFile(bucketId, fileId);
                  return { $id: file.$id, name: file.name, mimeType: file.mimeType };
                } catch (error) {
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
  }, [filiere?.$id]);

  const yearOptions = [...new Set(ues.flatMap((ue) => ue.anneeEnseignement))];
  const filteredUes = ues
    .filter((ue) => ue.nom.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((ue) => (selectedYear ? ue.anneeEnseignement.includes(selectedYear) : true));

  if (error || (!filiere && !isLoading)) {
    return (
      <Alert severity="error" sx={{ my: 4 }}>{error || `Filière "${decodeURIComponent(filiereName)}" non trouvée`}</Alert>
    );
  }

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
        <Grid item>
          <Typography variant="h4" component="h1" fontWeight={700} color="primary.main" gutterBottom>
            {filiere?.nom || "Chargement..."}
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" component={BackButton}>
            Retour
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <FilterSelect
            label="Année"
            options={yearOptions}
            value={selectedYear}
            onChange={setSelectedYear}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <SearchBar onSearch={setSearchQuery} placeholder="Rechercher une UE" />
        </Grid>
      </Grid>
      {isLoading ? (
        <Grid container justifyContent="center" sx={{ py: 6 }}>
          <CircularProgress size={48} />
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {filteredUes.length > 0 ? (
            filteredUes.map((ue) => (
              <Grid item xs={12} sm={6} md={4} key={ue.$id}>
                <UECard ue={ue} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Alert severity="info" sx={{ my: 4 }}>Aucune UE trouvée.</Alert>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default Filiere;