import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Parcours from "./pages/Parcours";
import Filiere from "./pages/Filiere";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/parcours" replace />} />
        <Route path="/parcours" element={<Parcours />} />
        <Route path="/filiere/:filiereName" element={<Filiere />} />
      </Routes>
    </Router>
  );
};

export default App;
