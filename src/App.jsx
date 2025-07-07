import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Ecoles from "./pages/Ecoles";
import Ecole from "./pages/Ecole";
import Filiere from "./pages/Filiere";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <LibraryBooksIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/ecoles" style={{ color: 'inherit', textDecoration: 'none' }}>
              Bibliothèque EPL
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/ecoles" replace />} />
          <Route path="/ecoles" element={<Ecoles />} />
          <Route path="/ecole/:ecoleName" element={<Ecole />} />
          <Route path="/filiere/:filiereName" element={<Filiere />} />
          <Route path="*" element={<Navigate to="/ecoles" replace />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;