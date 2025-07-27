import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFolder, FaDownload, FaFileArchive, FaEye, FaChevronDown, FaChevronRight } from "react-icons/fa";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { storage, bucketId } from "../appwrite";

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
        return <FaFilePdf className="text-red-500 w-5 h-5" />;
      case "application/msword":
        return <FaFileWord className="text-blue-500 w-5 h-5" />;
      case "application/zip":
        return <FaFileArchive className="text-yellow-500 w-5 h-5" />;
      default:
        return <FaFilePdf className="text-red-500 w-5 h-5" />;
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

  const renderItem = (item, path = "", level = 0) => {
    const itemPath = path ? `${path}/${item.name}` : item.name;
    const paddingLeft = level * 24;
    
    if (item.type === "file") {
      const fileUrl = storage.getFileDownload(bucketId, item.fileId);
      const safeFileName = item.originalName.replace(/_/g, "-");
      
      return (
        <div 
          key={itemPath}
          className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
          style={{ marginLeft: paddingLeft }}
        >
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {getFileIcon(item.mimeType)}
            <span className="text-gray-800 font-medium truncate">{item.name}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {item.mimeType === "application/pdf" && (
              <button
                onClick={() => {
                  setPreviewError(null);
                  setIsPreviewLoading(true);
                  setPreviewFile(item);
                }}
                className="inline-flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors duration-200"
                title="Prévisualiser"
              >
                <FaEye className="w-4 h-4" />
                <span className="hidden sm:inline">Aperçu</span>
              </button>
            )}
            <a
              href={fileUrl}
              download={safeFileName}
              className="inline-flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200"
              title="Télécharger"
            >
              <FaDownload className="w-4 h-4" />
              <span className="hidden sm:inline">Télécharger</span>
            </a>
          </div>
        </div>
      );
    }
    
    if (item.type === "folder") {
      const isOpen = openFolders[itemPath];
      
      return (
        <div key={itemPath} className="space-y-3">
          <div 
            className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 hover:border-yellow-300 cursor-pointer transition-all duration-200"
            style={{ marginLeft: paddingLeft }}
          >
            <div 
              className="flex items-center space-x-3 flex-1"
              onClick={() => toggleFolder(itemPath)}
            >
              {isOpen ? (
                <FaChevronDown className="w-4 h-4 text-yellow-600" />
              ) : (
                <FaChevronRight className="w-4 h-4 text-yellow-600" />
              )}
              <FaFolder className="text-yellow-500 w-5 h-5" />
              <span className="text-gray-800 font-medium">{item.name}</span>
              <span className="text-xs text-gray-500">({item.contents.length} élément{item.contents.length > 1 ? 's' : ''})</span>
            </div>
            
            <button
              onClick={() => downloadFolder(item, itemPath)}
              className="inline-flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200"
              title="Télécharger le dossier"
              disabled={isDownloading}
            >
              {isDownloading ? (
                <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
              ) : (
                <FaDownload className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Dossier</span>
            </button>
          </div>
          
          {isOpen && (
            <div className="space-y-3">
              {item.contents.map((subItem) => renderItem(subItem, itemPath, level + 1))}
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };

  const fileTree = buildFileTree(files);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <FaFolder className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Ressources</h3>
      </div>
      
      {fileTree.contents.length > 0 ? (
        <div className="space-y-3">
          {fileTree.contents.map((item) => renderItem(item))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FaFolder className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600">Aucune ressource disponible</p>
        </div>
      )}

      {/* Modal d'aperçu */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 truncate">
                Aperçu : {previewFile.name}
              </h2>
              <button
                onClick={() => {
                  setPreviewFile(null);
                  setPreviewError(null);
                  setIsPreviewLoading(false);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="h-full pb-6">
              {previewError ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <FaFilePdf className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="text-red-600 font-medium">Impossible de prévisualiser le PDF</p>
                    <p className="text-gray-500 text-sm mt-1">{previewError}</p>
                  </div>
                </div>
              ) : (
                <div className="relative h-full">
                  {isPreviewLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <p className="text-gray-600 font-medium">Chargement du PDF...</p>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={storage.getFileView(bucketId, previewFile.fileId)}
                    className="w-full h-full"
                    style={{ height: 'calc(100% - 80px)' }}
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
        </div>
      )}
    </div>
  );
};

export default ResourceExplorer;