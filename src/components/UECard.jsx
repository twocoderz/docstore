import React from "react";
import ResourceExplorer from "./ResourceExplorer";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { FaBookOpen } from "react-icons/fa";

const UECard = ({ ue }) => {
  return (
    <Card elevation={3} sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <FaBookOpen size={22} style={{ marginRight: 8, color: '#1976d2' }} />
          <Typography variant="h6" component="div" noWrap fontWeight={600} color="primary.main">
            {ue.nom}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {ue.description}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
          Année : {ue.anneeEnseignement.join(", ")}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box mt={2}>
          <ResourceExplorer files={ue.files || []} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default UECard;