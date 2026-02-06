import React from "react";

const PdfPreviewModal = ({ open, previewUrl, fileName, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
            Aperçu : {fileName}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="h-full pb-6">
          {previewUrl && (
            <iframe
              src={previewUrl}
              title="Aperçu PDF"
              className="w-full h-full"
              style={{ height: "calc(100% - 80px)" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfPreviewModal;
