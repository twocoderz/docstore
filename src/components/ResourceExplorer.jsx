import React, { useState } from "react";
import { FaFilePdf, FaFolder, FaDownload } from "react-icons/fa";

const ResourceExplorer = ({ resources }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Simulation d'une structure hiérarchique (à adapter selon vos données réelles)
  const folderStructure = {
    name: "Ressources",
    contents: resources.map((resource) => ({
      name: resource.type,
      type: "file",
      url: resource.pdf,
    })),
  };

  const handleDownloadFolder = () => {
    // Placeholder : simulation de téléchargement d'un dossier
    alert("Téléchargement du dossier entier (nécessite un backend pour ZIP)");
    // Avec un backend, on ferait une requête pour générer et télécharger un ZIP
  };

  const renderItem = (item) => {
    if (item.type === "file") {
      return (
        <a
          href={item.url}
          download
          className="flex items-center justify-between py-2 px-4 bg-[#F7F7F7] rounded-md hover:bg-[#4A90E2] hover:text-white transition duration-200"
        >
          <div className="flex items-center">
            <FaFilePdf className="mr-2 text-[#4A90E2]" />
            <span>{item.name}</span>
          </div>
          <FaDownload className="text-sm" />
        </a>
      );
    }
    return null; // Pour l'instant, pas de sous-dossiers, mais extensible
  };

  return (
    <div className="space-y-2">
      <div
        className="flex items-center justify-between py-2 px-4 bg-[#4A90E2] text-white rounded-md cursor-pointer hover:bg-[#357ABD] transition duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <FaFolder className="mr-2" />
          <span>{folderStructure.name}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownloadFolder();
          }}
          className="p-1 hover:bg-[#4A90E2] rounded-full"
          title="Télécharger le dossier"
        >
          <FaDownload />
        </button>
      </div>
      {isOpen && (
        <div className="ml-4 space-y-2">
          {folderStructure.contents.map((item, index) => (
            <div key={index}>{renderItem(item)}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceExplorer;
