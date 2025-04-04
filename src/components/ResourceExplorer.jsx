import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFolder, FaDownload, FaFileArchive } from "react-icons/fa";
import { storage, bucketId } from "../appwrite";

const ResourceExplorer = ({ resources }) => {
  const [openFolders, setOpenFolders] = useState({});

  const toggleFolder = (folderPath) => {
    setOpenFolders((prev) => ({ ...prev, [folderPath]: !prev[folderPath] }));
  };

  const handleDownloadFolder = (contents) => {
    alert("Téléchargement du dossier (nécessite un backend pour ZIP)");
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "application/pdf":
        return <FaFilePdf className="mr-2 text-[#D32F2F]" />;
      case "application/msword":
        return <FaFileWord className="mr-2 text-[#2B579A]" />;
      case "application/zip":
        return <FaFileArchive className="mr-2 text-[#FFB300]" />;
      default:
        return <FaFilePdf className="mr-2 text-[#D32F2F]" />;
    }
  };

  const renderItem = (item, path = "") => {
    const itemPath = path ? `${path}/${item.name}` : item.name;

    if (item.type === "file") {
      const fileUrl = storage.getFileDownload(bucketId, item.fileId || item.url.split("/").pop());
      const fileType = item.mimeType || "application/pdf"; // À adapter selon vos données

      return (
        <a
          href={fileUrl}
          download
          className="flex items-center justify-between py-2 px-4 bg-[#F7F7F7] rounded-md hover:bg-gray-200 transition duration-200"
        >
          <div className="flex items-center">
            {getFileIcon(fileType)}
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

  return <div className="space-y-2">{renderItem(resources)}</div>;
};

export default ResourceExplorer;