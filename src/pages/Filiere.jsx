import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SearchBar";
import { databases, storage, databaseId, filieresCollectionId, uesCollectionId, bucketId, Query } from "../appwrite";
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FaLayerGroup, FaBookOpen, FaFilePdf, FaDownload, FaEye } from "react-icons/fa";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Pagination from '@mui/material/Pagination';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import deburr from 'lodash/deburr';

const UES_PER_PAGE = 5;

const Filiere = () => {
  const { filiereName } = useParams();
  const [filiere, setFiliere] = useState(null);
  const [ues, setUes] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [page, setPage] = useState(1);

  // S'exécute au démarrage de la page
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
                } catch {
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

  const yearOptions = [...new Set(ues.flatMap((ue) => ue.anneeEnseignement))];
  // LOGS pour debug
  console.log('UES:', ues.map(ue => ({ nom: ue.nom, anneeEnseignement: ue.anneeEnseignement })));
  console.log('yearOptions:', yearOptions);
  console.log('selectedYear:', selectedYear);

  // Fonction utilitaire pour normaliser (casse, accents, espaces)
  const normalize = (str) => deburr(String(str).toLowerCase().trim());

  const filteredUes = ues
    .filter((ue) => ue.nom.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((ue) => {
      if (!selectedYear) return true;
      if (!ue.anneeEnseignement) return false;
      // Si c'est un tableau
      if (Array.isArray(ue.anneeEnseignement)) {
        return ue.anneeEnseignement.some(y => normalize(y) === normalize(selectedYear));
      }
      // Si c'est une string
      return normalize(ue.anneeEnseignement) === normalize(selectedYear);
    });

  if (error || (!filiere && !isLoading)) {
    return (
      <Alert severity="error" sx={{ my: 4 }}>{error || `Filière "${decodeURIComponent(filiereName)}" non trouvée`}</Alert>
    );
  }

  const handlePreview = (fileId) => {
    setPreviewUrl(storage.getFileView(bucketId, fileId));
    setPreviewOpen(true);
  };
  const handleClosePreview = () => {
    setPreviewOpen(false);
    setPreviewUrl(null);
  };

  // Pagination logic
  const paginatedUes = filteredUes.slice((page - 1) * UES_PER_PAGE, page * UES_PER_PAGE);
  const pageCount = Math.ceil(filteredUes.length / UES_PER_PAGE);
  const handlePageChange = (event, value) => setPage(value);

  return (
    <>
      <Box display="flex" alignItems="center" mb={3} gap={2}>
        <FaLayerGroup size={32} style={{ color: '#1976d2' }} />
        <Box>
          <Typography variant="h4" component="h1" fontWeight={700} color="primary.main" gutterBottom>
          {filiere?.nom || "Chargement..."}
          </Typography>
        </Box>
        <Box flexGrow={1} />
        <Button variant="outlined" component={Link} to={-1}>
          Retour
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} mb={3}>
        <Box flex={1}>
        <FilterSelect
          label="Année"
          options={yearOptions}
          value={selectedYear}
          onChange={setSelectedYear}
        />
        </Box>
        <Box flex={2}>
        <SearchBar onSearch={setSearchQuery} placeholder="Rechercher une UE" />
        </Box>
      </Box>
      {isLoading ? (
        <Box display="flex" justifyContent="center" sx={{ py: 6 }}>
          <CircularProgress size={48} />
        </Box>
      ) : (
        <Box>
          {filteredUes.length > 0 ? (
            <>
              <List sx={{ width: '100%' }}>
                {paginatedUes.map((ue) => (
                  <Card key={ue.$id} elevation={4} sx={{ mb: 3, borderRadius: 3, background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)' }}>
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={2} mb={1}>
                        <FaBookOpen size={22} style={{ color: '#1976d2' }} />
                        <Tooltip title={ue.nom} arrow>
                          <Typography variant="h6" component="div" noWrap fontWeight={600} color="primary.main" sx={{ maxWidth: { xs: 180, sm: 300, md: 400 } }}>
                            {ue.nom}
                          </Typography>
                        </Tooltip>
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                          {ue.anneeEnseignement && ue.anneeEnseignement.length > 0 ? `Année : ${ue.anneeEnseignement.join(", ")}` : null}
                        </Typography>
                      </Box>
                      <Tooltip title={ue.description} arrow>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: { xs: '100%', md: 600 }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {ue.description}
                        </Typography>
                      </Tooltip>
                      <Divider sx={{ my: 1 }} />
                      <Accordion sx={{ background: 'transparent', boxShadow: 'none' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="subtitle2" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FaFilePdf style={{ marginRight: 4 }} /> Ressources
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <List dense disablePadding>
                            {ue.files && ue.files.length > 0 ? (
                              ue.files.map((file) => (
                                <ListItem key={file.$id} sx={{ pl: 0, pr: 0 }}
                                  secondaryAction={
                                    <Box display="flex" gap={1}>
                                      <Tooltip title="Télécharger">
                                        <IconButton component="a" href={storage.getFileDownload(bucketId, file.$id)} target="_blank" rel="noopener noreferrer">
                                          <FaDownload />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Aperçu">
                                        <IconButton onClick={() => handlePreview(file.$id)}>
                                          <FaEye />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  }
                                >
                                  <ListItemIcon sx={{ minWidth: 32 }}>
                                    <FaFilePdf style={{ color: '#d32f2f' }} />
                                  </ListItemIcon>
                                  <Tooltip title={file.name} arrow>
                                    <ListItemText
                                      primary={file.name}
                                      primaryTypographyProps={{
                                        sx: {
                                          maxWidth: { xs: 120, sm: 200, md: 300 },
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                        }
                                      }}
                                    />
                                  </Tooltip>
                                </ListItem>
                              ))
                            ) : (
                              <ListItem>
                                <ListItemText primary="Aucune ressource PDF." />
                              </ListItem>
                            )}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </List>
              {pageCount > 1 && (
                <Box display="flex" justifyContent="center" mt={2}>
                  <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
                </Box>
              )}
            </>
          ) : (
            <Alert severity="info" sx={{ my: 4 }}>Aucune UE trouvée.</Alert>
          )}
        </Box>
      )}
      <Dialog open={previewOpen} onClose={handleClosePreview} maxWidth="md" fullWidth>
        <DialogTitle>Aperçu du PDF</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {previewUrl && (
            <iframe
              src={previewUrl}
              title="Aperçu PDF"
              width="100%"
              height="600px"
              style={{ border: 0 }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Filiere;
