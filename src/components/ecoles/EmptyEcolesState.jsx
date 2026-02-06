import React from "react";
import { FaUniversity } from "react-icons/fa";

const EmptyEcolesState = () => (
  <div className="text-center py-16">
    <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <FaUniversity className="w-10 h-10 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune école disponible</h3>
    <p className="text-gray-600">Les écoles seront affichées ici une fois ajoutées.</p>
  </div>
);

export default EmptyEcolesState;
