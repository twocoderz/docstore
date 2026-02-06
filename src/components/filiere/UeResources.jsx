import React from "react";
import { FaDownload, FaEye, FaFilePdf } from "react-icons/fa";

const UeResources = ({ files, onPreview, onDownload }) => (
  <div className="p-6 bg-gray-50">
    <div className="flex items-center space-x-2 mb-4">
      <FaFilePdf className="w-5 h-5 text-red-500" />
      <h4 className="text-base md:text-lg font-semibold text-gray-900">Ressources disponibles</h4>
    </div>

    {files && files.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <div
            key={file.$id}
            className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FaFilePdf className="w-5 h-5 text-red-600" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                  {file.name}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 sm:space-x-2">
                  <button
                    onClick={() => onPreview(file)}
                    className="inline-flex items-center justify-center space-x-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors duration-200 w-full sm:w-auto"
                  >
                    <FaEye className="w-3 h-3" />
                    <span>Aperçu</span>
                  </button>

                  <button
                    onClick={() => onDownload(file)}
                    className="inline-flex items-center justify-center space-x-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200 w-full sm:w-auto"
                  >
                    <FaDownload className="w-3 h-3" />
                    <span>Télécharger</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <FaFilePdf className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-gray-600">Aucune ressource disponible pour cette UE</p>
      </div>
    )}
  </div>
);

export default UeResources;
