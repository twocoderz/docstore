import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Ecoles from "./pages/Ecoles";
import Filiere from "./pages/Filiere";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/ecoles" replace />} />
        <Route path="/ecoles" element={<Ecoles />} />
        <Route path="/filiere/:filiereName" element={<Filiere />} />
        <Route path="*" element={<Navigate to="/ecoles" replace />} /> {/* Gestion des routes inconnues */}
      </Routes>
    </Router>
  );
};

export default App;