import React, { useState } from "react";
import { FaFilePdf, FaFolder, FaDownload } from "react-icons/fa";

const ResourceExplorer = ({ resources }) => {
  const [openFolders, setOpenFolders] = useState({});

  // Exemple de structure imbriquée (à adapter selon vos données)
  const folderStructure = {
    name: "Ressources",
    type: "folder",
    contents: [
      ...resources.map((resource) => ({
        name: resource.type,
        type: "file",
        url: resource.pdf,
      })),
      {
        name: "Annexes",
        type: "folder",
        contents: [
          { name: "Annexe 1", type: "file", url: "url-to-annexe1.pdf" },
          { name: "Annexe 2", type: "file", url: "url-to-annexe2.pdf" },
        ],
      },
    ],
  };

  const toggleFolder = (folderPath) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderPath]: !prev[folderPath],
    }));
  };

  const handleDownloadFolder = (contents) => {
    alert("Téléchargement du dossier entier (nécessite un backend pour ZIP)");
    // Simule le téléchargement de tous les fichiers dans 'contents'
  };

  const renderItem = (item, path = "") => {
    const itemPath = path ? `${path}/${item.name}` : item.name;

    if (item.type === "file") {
      return (
        <a
          href={item.url}
          download
          className="flex items-center justify-between py-2 px-4 bg-[#F7F7F7] rounded-md hover:bg-[#D32F2F] hover:text-white transition duration-200"
        >
          <div className="flex items-center">
            <FaFilePdf className="mr-2 text-[#D32F2F]" />
            <span>{item.name}</span>
          </div>
          <FaDownload className="text-sm" />
        </a>
      );
    }

    if (item.type === "folder") {
      return (
        <div key={itemPath} className="space-y-2">
          <div
            className="flex items-center justify-between py-2 px-4 bg-[#FFC107] text-[#1A1A1A] rounded-md cursor-pointer hover:bg-[#FFB300] transition duration-200"
            onClick={() => toggleFolder(itemPath)}
          >
            <div className="flex items-center">
              <FaFolder className="mr-2 text-[#1A1A1A]" />
              <span>{item.name}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadFolder(item.contents);
              }}
              className="p-1 hover:bg-[#FFB300] rounded-full"
              title="Télécharger le dossier"
            >
              <FaDownload className="text-[#1A1A1A]" />
            </button>
          </div>
          {openFolders[itemPath] && (
            <div className="ml-4 space-y-2">
              {item.contents.map((subItem) => renderItem(subItem, itemPath))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return <div className="space-y-2">{renderItem(folderStructure)}</div>;
};

export default ResourceExplorer;
