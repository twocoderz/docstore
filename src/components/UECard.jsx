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
    <Card 
      elevation={3} 
      sx={{ 
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          elevation: 8
        }
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <FaBookOpen 
            size={22} 
            style={{ 
              marginRight: 8, 
              color: '#1976d2',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }} 
            className="icon-rotate-hover"
          />
          <Typography 
            variant="h6" 
            component="div" 
            noWrap 
            fontWeight={600} 
            color="primary.main"
            sx={{
              transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                color: '#1565c0'
              }
            }}
          >
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