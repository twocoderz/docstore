import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FilterSelect from "../components/FilterSelect";
import {
  databases,
  databaseId,
  ecolesCollectionId,
  filieresCollectionId,
  Query,
} from "../appwrite";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
  FaUniversity,
  FaBook,
  FaMapMarkerAlt,
  FaLayerGroup,
} from "react-icons/fa";

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
    const fetchFilieres = async () => {
      try {
        setIsLoading(true);
        const response = await databases.listDocuments(
          databaseId,
          filieresCollectionId,
          [Query.equal("idEcole", ecole.$id)]
        );
        setFilieres(response.documents);
        setError(null);
      } catch {
        setError("Erreur lors de la récupération des filières.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilieres();
  }, [ecole]);

  const parcoursOptions = [...new Set(filieres.map((f) => f.parcours))];
  const filteredFilieres = filieres.filter(
    (f) => !selectedParcours || f.parcours === selectedParcours
  );

  if (error && !isLoading) {
    return (
      <Alert severity="error" sx={{ my: 4 }}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Box display="flex" alignItems="center" mb={3} gap={2}>
        <FaUniversity size={32} style={{ color: "#1976d2" }} />
        <Box>
          <Typography
            variant="h4"
            component="h1"
            fontWeight={700}
            color="primary.main"
            gutterBottom
          >
            {ecole?.nom || "Chargement..."}
          </Typography>
          {ecole?.lieu && (
            <Box display="flex" alignItems="center" gap={1}>
              <FaMapMarkerAlt size={16} style={{ color: "#e57373" }} />
              <Typography variant="subtitle2" color="text.secondary">
                {ecole.lieu}
              </Typography>
            </Box>
          )}
        </Box>
        <Box flexGrow={1} />
        <Button
          variant="outlined"
          component={Link}
          to="/ecoles"
          sx={{ height: 40, alignSelf: "center" }}
        >
          Retour
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />
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
        <Grid container spacing={4}>
          {filteredFilieres.length > 0 ? (
            filteredFilieres.map((filiere) => (
              <Grid item xs={12} sm={6} md={4} key={filiere.$id}>
                <Card
                  elevation={6}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #f3e5f5 0%, #fff 100%)",
                  }}
                >
                  <CardActionArea
                    component={Link}
                    to={`/filiere/${encodeURIComponent(filiere.nom)}`}
                    sx={{ height: "100%" }}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <FaBook size={20} style={{ color: "#1976d2" }} />
                        <Typography
                          variant="h6"
                          component="div"
                          noWrap
                          fontWeight={600}
                          color="primary.main"
                        >
                          {filiere.nom}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {filiere.description}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <FaLayerGroup size={14} style={{ color: "#1976d2" }} />
                        <Typography variant="caption" color="text.secondary">
                          Parcours : {filiere.parcours}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Alert severity="info" sx={{ my: 4 }}>
                Aucune filière trouvée.
              </Alert>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default Ecole;
