import React from "react";
import ConcoursCard from "./ConcoursCard";

const ConcoursSection = ({ concours }) => {
  if (!concours || concours.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <img src="/assets/icons/trophy.svg" alt="school" className="w-12 h-12" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Concours d'Entrée</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concours.map((item) => (
          <ConcoursCard key={item.$id} concours={item} />
        ))}
      </div>
    </div>
  );
};

export default ConcoursSection;
