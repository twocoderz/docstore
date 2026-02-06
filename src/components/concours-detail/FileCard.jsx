import React from "react";
import { FaDownload, FaEye, FaFilePdf } from "react-icons/fa";

const FileCard = ({ file, onPreview, onDownload }) => (
  <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        <FaFilePdf className="w-5 h-5 text-red-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">{file.name}</p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 sm:space-x-2">
          <button
            onClick={() => onPreview(file)}
            className="inline-flex cursor-pointer items-center justify-center space-x-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors duration-200 w-full sm:w-auto"
          >
            <FaEye className="w-3 h-3" />
            <span>Aperçu</span>
          </button>
          <button
            onClick={() => onDownload(file)}
            className="inline-flex cursor-pointer items-center justify-center space-x-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200 w-full sm:w-auto"
          >
            <FaDownload className="w-3 h-3" />
            <span>Télécharger</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default FileCard;
