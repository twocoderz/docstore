import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGraduationCap, FaTrophy, FaBars, FaTimes } from "react-icons/fa";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === "/ecoles") {
      return (
        location.pathname === "/ecoles" ||
        location.pathname.startsWith("/ecole/") ||
        location.pathname.startsWith("/filiere/")
      );
    }
    return location.pathname.startsWith(path);
  };

  const getActiveClasses = (path, isMobile = false) => {
    const baseClasses = isMobile
      ? "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium nav-link"
      : "flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 font-medium nav-link";

    if (isActive(path)) {
      if (path === "/ecoles") {
        return `${baseClasses} text-blue-600 bg-blue-50 border-l-4 border-blue-600 shadow-sm nav-active active`;
      }
      if (path === "/concours") {
        return `${baseClasses} text-orange-600 bg-orange-50 border-l-4 border-orange-600 shadow-sm nav-active nav-active-concours active nav-link-concours`;
      }
      if (path === "/infos") {
        return `${baseClasses} text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600 shadow-sm nav-active active`;
      }
    }

    if (path === "/ecoles") {
      return `${baseClasses} text-gray-700 hover:text-blue-600 hover:bg-blue-50`;
    }
    if (path === "/concours") {
      return `${baseClasses} text-gray-700 hover:text-orange-600 hover:bg-orange-50 nav-link-concours`;
    }
    if (path === "/infos") {
      return `${baseClasses} text-gray-700 hover:text-indigo-600 hover:bg-indigo-50`;
    }

    return baseClasses;
  };

  const getIconClasses = (path) => {
    const baseClasses = "transition-all duration-300";
    if (isActive(path)) {
      if (path === "/ecoles") {
        return `${baseClasses} nav-icon-active`;
      }
      if (path === "/concours") {
        return `${baseClasses} nav-icon-active-concours`;
      }
      if (path === "/infos") {
        return `${baseClasses} nav-icon-active`;
      }
    }
    return baseClasses;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-200/60 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-13 lg:h-16">
          <Link
            to="/ecoles"
            className="flex items-center group flex-shrink-0"
            onClick={closeMobileMenu}
          >
            <img src="/assets/icons/logo.svg" alt="DocStore logo" className="w-24 h-24" />
          </Link>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-6">
            <Link to="/ecoles" className={getActiveClasses("/ecoles")}>
              <FaGraduationCap className={`w-4 h-4 ${getIconClasses("/ecoles")}`} />
              <span>Écoles</span>
            </Link>
            <Link to="/concours" className={getActiveClasses("/concours")}>
              <FaTrophy className={`w-4 h-4 ${getIconClasses("/concours")}`} />
              <span>Concours</span>
            </Link>
            <Link to="/infos" className={getActiveClasses("/infos")}>
              <img
                src="/assets/icons/info.svg"
                alt="info"
                className={`w-4 h-4 ${getIconClasses("/infos")}`}
              />
              <span>Infos</span>
            </Link>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 touch-target"
            aria-label="Ouvrir le menu"
          >
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
            ? "max-h-64 opacity-100 border-t border-gray-200/60"
            : "max-h-0 opacity-0 overflow-hidden"
            }`}
        >
          <div className="py-4 space-y-2">
            <Link
              to="/ecoles"
              className={getActiveClasses("/ecoles", true)}
              onClick={closeMobileMenu}
            >
              <FaGraduationCap className={`w-5 h-5 ${getIconClasses("/ecoles")}`} />
              <span className="text-base">Écoles</span>
            </Link>
            <Link
              to="/concours"
              className={getActiveClasses("/concours", true)}
              onClick={closeMobileMenu}
            >
              <FaTrophy className={`w-5 h-5 ${getIconClasses("/concours")}`} />
              <span className="text-base">Concours</span>
            </Link>
            <Link
              to="/infos"
              className={getActiveClasses("/infos", true)}
              onClick={closeMobileMenu}
            >
              <img
                src="/assets/icons/info.svg"
                alt="info"
                className={`w-5 h-5 ${getIconClasses("/infos")}`}
              />
              <span className="text-base">Infos</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
