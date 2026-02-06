import React from "react";
import EcoleCard from "./EcoleCard";
import EmptyEcolesState from "./EmptyEcolesState";

const EcolesGrid = ({ ecoles, isMobile }) => {
  if (!ecoles || ecoles.length === 0) {
    return <EmptyEcolesState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {ecoles.map((ecole) => (
        <EcoleCard key={ecole.$id} ecole={ecole} isMobile={isMobile} />
      ))}
    </div>
  );
};

export default EcolesGrid;
