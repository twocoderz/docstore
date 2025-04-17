import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFolder, FaDownload, FaFileArchive, FaEye } from "react-icons/fa";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { storage, bucketId } from "../appwrite";
import Spinner from "./Spinner";

const buildFileTree = (files) => {
  const tree = { name: "Ressources", type: "folder", contents: [] };
  files.forEach((file) => {
    const pathParts = file.name.split("_");
    let currentLevel = tree.contents;
    for (let i = 0; i < pathParts.length - 1; i++) {
      const folderName = pathParts[i];
      let folder = currentLevel.find((item) => item.name === folderName && item.type === "folder");
      if (!folder) {
        folder = { name: folderName, type: "folder", contents: [] };
        currentLevel.push(folder);
      }
      currentLevel = folder.contents;
    }
    currentLevel.push({
      name: pathParts[pathParts.length - 1],
      type: "file",
      fileId: file.$id,
      mimeType: file.mimeType,
      originalName: file.name,
    });
  });
  return tree;
};

const ResourceExplorer = ({ files }) => {
  const [openFolders, setOpenFolders] = useState({});
  const [previewFile, setPreviewFile] = useState(null);
  const [previewError, setPreviewError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const toggleFolder = (folderPath) => {
    setOpenFolders((prev) => ({ ...prev, [folderPath]: !prev[folderPath] }));
  };

  const getFileIcon = (mimeType) => {
    switch (mimeType) {
      case "application/pdf":
        return <FaFilePdf className="text-red-600 mr-2" />;
      case "application/msword":
        return <FaFileWord className="text-blue-600 mr-2" />;
      case "application/zip":
        return <FaFileArchive className="text-yellow-600 mr-2" />;
      default:
        return <FaFilePdf className="text-red-600 mr-2" />;
    }
  };

  const downloadFolder = async (folder, folderPath) => {
    setIsDownloading(true);
    const zip = new JSZip();
    const collectFiles = (items, zipFolder, path) => {
      items.forEach((item) => {
        if (item.type === "file") {
          const safeFileName = item.originalName.replace(/_/g, "-");
          const fileUrl = storage.getFileDownload(bucketId, item.fileId);
          zipFolder.file(safeFileName, fetch(fileUrl).then((res) => res.blob()));
        } else if (item.type === "folder") {
          const subFolder = zipFolder.folder(item.name);
          collectFiles(item.contents, subFolder, `${path}/${item.name}`);
        }
      });
    };

    try {
      collectFiles(folder.contents, zip, folder.name);
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${folder.name.replace(/ /g, "-")}.zip`);
    } catch (error) {
      console.error("Erreur lors du téléchargement du dossier :", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const renderItem = (item, path = "") => {
    const itemPath = path ? `${path}/${item.name}` : item.name;
    if (item.type === "file") {
      const fileUrl = storage.getFileDownload(bucketId, item.fileId);
      const safeFileName = item.originalName.replace(/_/g, "-");
      return (
        <div className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-md hover:bg-gray-100 text-sm sm:text-base">
          <div className="flex items-center">
            {getFileIcon(item.mimeType)}
            <span className="text-gray-800 truncate">{item.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            {item.mimeType === "application/pdf" && (
              <button
                onClick={() => {
                  console.log("Preview fileId:", item.fileId);
                  console.log("Preview URL:", storage.getFileView(bucketId, item.fileId));
                  setPreviewError(null);
                  setIsPreviewLoading(true);
                  setPreviewFile(item);
                }}
                className="text-blue-500 hover:text-blue-600 p-2"
                title="Prévisualiser"
              >
                <FaEye size={20} />
              </button>
            )}
            <a
              href={fileUrl}
              download={safeFileName}
              className="text-blue-500 hover:text-blue-600 p-2"
            >
              <FaDownload size={20} />
            </a>
          </div>
        </div>
      );
    }
    if (item.type === "folder") {
      return (
        <div key={itemPath} className="space-y-2">
          <div className="flex items-center justify-between py-2 px-4 bg-yellow-100 rounded-md cursor-pointer hover:bg-yellow-200 text-sm sm:text-base">
            <div className="flex items-center" onClick={() => toggleFolder(itemPath)}>
              <FaFolder className="text-yellow-600 mr-2" />
              <span className="text-gray-800 truncate">{item.name}</span>
            </div>
            <button
              onClick={() => downloadFolder(item, itemPath)}
              className="text-blue-500 hover:text-blue-600 p-2"
              title="Télécharger le dossier"
              disabled={isDownloading}
            >
              {isDownloading ? <Spinner size="sm" /> : <FaDownload size={20} />}
            </button>
          </div>
          {openFolders[itemPath] && (
            <div className="ml-4 space-y-2">{item.contents.map((subItem) => renderItem(subItem, itemPath))}</div>
          )}
        </div>
      );
    }
    return null;
  };

  const fileTree = buildFileTree(files);

  return (
    <div className="space-y-2">
      {renderItem(fileTree)}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2 sm:px-0">
          <div className="bg-white p-4 rounded-lg w-full max-w-4xl sm:h-[80vh] h-[90vh] overflow-auto">
            <div className="flex justify-between mb-4 items-center">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">{previewFile.name}</h2>
              <button
                onClick={() => {
                  setPreviewFile(null);
                  setPreviewError(null);
                  setIsPreviewLoading(false);
                }}
                className="text-gray-600 hover:text-gray-800 p-2"
              >
                Fermer
              </button>
            </div>
            {previewError ? (
              <div className="text-center text-red-600">
                <p>Impossible de prévisualiser le PDF : {previewError}</p>
              </div>
            ) : (
              <div className="relative">
                {isPreviewLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                    <Spinner size="lg" />
                  </div>
                )}
                <iframe
                  src={storage.getFileView(bucketId, previewFile.fileId)}
                  className="w-full h-[60vh] sm:h-[70vh]"
                  title="PDF Preview"
                  onLoad={() => setIsPreviewLoading(false)}
                  onError={() => {
                    setIsPreviewLoading(false);
                    setPreviewError("Erreur lors du chargement du PDF : fichier introuvable ou non accessible");
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceExplorer;