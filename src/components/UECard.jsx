import React from "react";
import ResourceExplorer from "./ResourceExplorer";

const UECard = ({ ue }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm hover:shadow-md transition duration-300">
      <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{ue.nom}</h3>
      <p className="text-sm text-gray-600 mb-2">{ue.description}</p>
      <p className="text-xs text-gray-500 mb-4">
        Année(s) : {ue.anneeEnseignement.join(", ")}
      </p>
      <ResourceExplorer files={ue.files || []} />
    </div>
  );
};

export default UECard;