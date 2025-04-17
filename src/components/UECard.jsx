import React from "react";
import ResourceExplorer from "./ResourceExplorer";

const UECard = ({ ue }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">{ue.nom}</h2>
      <p className="text-gray-600 mt-2 text-sm sm:text-base">{ue.description}</p>
      <p className="text-xs sm:text-sm text-gray-500 mt-1">Année : {ue.anneeEnseignement.join(", ")}</p>
      <div className="mt-4">
        <ResourceExplorer files={ue.files || []} />
      </div>
    </div>
  );
};

export default UECard;