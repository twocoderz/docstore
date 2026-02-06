import React from "react";
import { FaSearch } from "react-icons/fa";

const EmptyState = () => (
  <div className="text-center py-16">
    <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <FaSearch className="w-10 h-10 text-gray-400" />
    </div>
    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Aucune UE trouvée</h3>
    <p className="text-gray-600 text-sm md:text-base">
      Essayez de modifier vos filtres de recherche ou vérifiez l'orthographe.
    </p>
  </div>
);

export default EmptyState;
