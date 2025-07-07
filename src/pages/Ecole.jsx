import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FilterSelect from "../components/FilterSelect";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { databases, databaseId, ecolesCollectionId, filieresCollectionId, Query } from "../appwrite";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const Ecole = () => {
  const { ecoleName } = useParams();
  const [ecole, setEcole] = useState(null);
  const [filieres, setFilieres] = useState([]);
  const [selectedParcours, setSelectedParcours] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEcole = async () => {
      try {
        const response = await databases.listDocuments(databaseId, ecolesCollectionId, [
          Query.equal("nom", decodeURIComponent(ecoleName)),
        ]);
        if (response.documents.length > 0) {
          setEcole(response.documents[0]);
          setError(null);
        } else {
          setEcole(null);
          setError("École non trouvée.");
        }
      } catch (error) {
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
    const fetchFilieres = async () => {
      try {
        setIsLoading(true);
        const response = await databases.listDocuments(databaseId, filieresCollectionId, [
          Query.equal("idEcole", ecole.$id),
        ]);
        setFilieres(response.documents);
        setError(null);
      } catch (error) {
        setError("Erreur lors de la récupération des filières.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilieres();
  }, [ecole?.$id]);

  const parcoursOptions = [...new Set(filieres.map((f) => f.parcours))];
  const filteredFilieres = filieres.filter(
    (f) => !selectedParcours || f.parcours === selectedParcours
  );

  if (error && !isLoading) {
    return (
      <Alert severity="error" sx={{ my: 4 }}>{error}</Alert>
    );
  }

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
        <Grid item>
          <Typography variant="h4" component="h1" fontWeight={700} color="primary.main" gutterBottom>
            {ecole?.nom || "Chargement..."}
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" component={Link} to="/ecoles">
            Retour
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <FilterSelect
            label="Parcours"
            options={parcoursOptions}
            value={selectedParcours}
            onChange={setSelectedParcours}
          />
        </Grid>
      </Grid>
      {isLoading ? (
        <Grid container justifyContent="center" sx={{ py: 6 }}>
          <CircularProgress size={48} />
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {filteredFilieres.length > 0 ? (
            filteredFilieres.map((filiere) => (
              <Grid item xs={12} sm={6} md={4} key={filiere.$id}>
                <Card elevation={3} sx={{ height: '100%' }}>
                  <CardActionArea component={Link} to={`/filiere/${encodeURIComponent(filiere.nom)}`} sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" component="div" noWrap gutterBottom>
                        {filiere.nom}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {filiere.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                        Parcours : {filiere.parcours}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Alert severity="info" sx={{ my: 4 }}>Aucune filière trouvée.</Alert>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default Ecole;