import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Ecoles from "./pages/Ecoles";
import Ecole from "./pages/Ecole";
import Filiere from "./pages/Filiere";
import Concours from "./pages/Concours";
import ConcoursDetail from "./pages/ConcoursDetail";
import Infos from "./pages/Infos";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/ecoles" replace />} />
            <Route path="/ecoles" element={<Ecoles />} />
            <Route path="/ecole/:ecoleName" element={<Ecole />} />
            <Route path="/filiere/:filiereName" element={<Filiere />} />
            <Route path="/concours" element={<Concours />} />
            <Route path="/concours/:concoursId" element={<ConcoursDetail />} />
            <Route path="/infos" element={<Infos />} />
            <Route path="*" element={<Navigate to="/ecoles" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
