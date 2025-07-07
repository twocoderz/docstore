import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { databases, databaseId, ecolesCollectionId } from "../appwrite";
import Spinner from "../components/Spinner";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const Ecoles = () => {
  const [ecoles, setEcoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEcoles = async () => {
      try {
        const response = await databases.listDocuments(databaseId, ecolesCollectionId);
        setEcoles(response.documents);
        setError(null);
      } catch (error) {
        setError("Erreur lors de la récupération des écoles.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEcoles();
  }, []);

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700} color="primary.main">
        Écoles
      </Typography>
      {isLoading ? (
        <Grid container justifyContent="center" sx={{ py: 6 }}>
          <CircularProgress size={48} />
        </Grid>
      ) : error ? (
        <Alert severity="error" sx={{ my: 4 }}>{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {ecoles.length > 0 ? (
            ecoles.map((ecole) => (
              <Grid item xs={12} sm={6} md={4} key={ecole.$id}>
                <Card elevation={3} sx={{ height: '100%' }}>
                  <CardActionArea component={Link} to={`/ecole/${encodeURIComponent(ecole.nom)}`} sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" component="div" noWrap gutterBottom>
                        {ecole.nom}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {ecole.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Alert severity="info" sx={{ my: 4 }}>Aucune école trouvée.</Alert>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default Ecoles;