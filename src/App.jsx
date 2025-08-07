import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Ecoles from "./pages/Ecoles";
import Ecole from "./pages/Ecole";
import Filiere from "./pages/Filiere";
import Concours from "./pages/Concours";
import ConcoursDetail from "./pages/ConcoursDetail";
import { FaBook, FaGraduationCap, FaTrophy } from "react-icons/fa";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Navigation moderne  */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/ecoles" className="flex items-center space-x-3 group">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl group-hover:scale-105 transition-transform duration-200">
                  <FaBook className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    DocStore
                  </h1>
                  <p className="text-xs text-gray-500">Bibliothèque numérique</p>
                </div>
              </Link>
              
              <div className="flex items-center space-x-6">
                <Link 
                  to="/ecoles" 
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  <FaGraduationCap className="w-4 h-4" />
                  <span className="font-medium">Écoles</span>
                </Link>
                <Link 
                  to="/concours" 
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
                >
                  <FaTrophy className="w-4 h-4" />
                  <span className="font-medium">Concours</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Contenu principal */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/ecoles" replace />} />
            <Route path="/ecoles" element={<Ecoles />} />
            <Route path="/ecole/:ecoleName" element={<Ecole />} />
            <Route path="/filiere/:filiereName" element={<Filiere />} />
            <Route path="/concours" element={<Concours />} />
            <Route path="/concours/:concoursId" element={<ConcoursDetail />} />
            <Route path="*" element={<Navigate to="/ecoles" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;