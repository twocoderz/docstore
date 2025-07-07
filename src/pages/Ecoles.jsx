import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { databases, databaseId, ecolesCollectionId } from "../appwrite";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { FaSchool, FaMapMarkerAlt, FaUniversity, FaBook } from "react-icons/fa";

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
      } catch {
        setError("Erreur lors de la récupération des écoles.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEcoles();
  }, []);

  return (
    <>
      <Box display="flex" alignItems="center" mb={3} gap={2}>
        <FaSchool size={36} style={{ color: '#1976d2' }} />
        <Box>
          <Typography variant="h4" component="h1" fontWeight={700} color="primary.main" gutterBottom>
            Écoles
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Découvrez toutes les écoles et leurs filières associées.
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />
      {isLoading ? (
        <Grid container justifyContent="center" sx={{ py: 6 }}>
          <CircularProgress size={48} />
        </Grid>
      ) : error ? (
        <Alert severity="error" sx={{ my: 4 }}>{error}</Alert>
      ) : (
        <Grid container spacing={4}>
          {ecoles.length > 0 ? (
            ecoles.map((ecole) => (
              <Grid item xs={12} sm={6} md={4} key={ecole.$id}>
                <Card elevation={6} sx={{ height: '100%', borderRadius: 3, background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)' }}>
                  <CardActionArea component={Link} to={`/ecole/${encodeURIComponent(ecole.nom)}`} sx={{ height: '100%' }}>
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <FaUniversity size={22} style={{ color: '#1976d2' }} />
                        <Typography variant="h6" component="div" noWrap fontWeight={600} color="primary.main">
                  {ecole.nom}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {ecole.description}
                      </Typography>
                      {ecole.lieu && (
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <FaMapMarkerAlt size={16} style={{ color: '#e57373' }} />
                          <Typography variant="caption" color="text.secondary">
                            {ecole.lieu}
                          </Typography>
                        </Box>
                      )}
                      <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                        <Chip icon={<FaBook size={16} />} label="Filières" color="primary" variant="outlined" size="small" />
                        {/* Ajoute d'autres chips ou infos si besoin */}
                      </Box>
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