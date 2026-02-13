import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Ecoles from "./pages/Ecoles";
import Ecole from "./pages/Ecole";
import Filiere from "./pages/Filiere";
import Concours from "./pages/Concours";
import ConcoursDetail from "./pages/ConcoursDetail";
import Infos from "./pages/Infos";
import Navigation from "./components/Navigation";
import ROUTES from "./constants/routes";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.ECOLES} replace />} />
            <Route path={ROUTES.ECOLES} element={<Ecoles />} />
            <Route path={ROUTES.ECOLE_DETAIL} element={<Ecole />} />
            <Route path={ROUTES.FILIERE_DETAIL} element={<Filiere />} />
            <Route path={ROUTES.CONCOURS} element={<Concours />} />
            <Route path={ROUTES.CONCOURS_DETAIL} element={<ConcoursDetail />} />
            <Route path={ROUTES.INFOS} element={<Infos />} />
            <Route path="*" element={<Navigate to={ROUTES.ECOLES} replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
