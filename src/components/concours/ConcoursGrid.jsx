import React from "react";
import { FaTrophy } from "react-icons/fa";
import ConcoursCardDesktop from "./ConcoursCardDesktop";
import ConcoursCardMobile from "./ConcoursCardMobile";

const ConcoursGrid = ({ concours, getEcoleName }) => {
  if (!concours || concours.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FaTrophy className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun concours disponible</h3>
        <p className="text-gray-600">Les concours seront affichés ici une fois ajoutés.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {concours.map((concour) => {
        const ecoleName = getEcoleName(concour.idEcole);

        return (
          <div key={concour.$id} className="group">
            <ConcoursCardDesktop concour={concour} ecoleName={ecoleName} />
            <ConcoursCardMobile concour={concour} ecoleName={ecoleName} />
          </div>
        );
      })}
    </div>
  );
};

export default ConcoursGrid;
