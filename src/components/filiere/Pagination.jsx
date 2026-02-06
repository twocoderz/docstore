import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ page, pageCount, onPageChange }) => {
  if (pageCount <= 1) return null;

  return (
    <div className="flex justify-center">
      <div className="pagination-mobile flex items-center space-x-1 sm:space-x-2 max-w-full overflow-x-auto">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-1 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          title="Page précédente"
        >
          <span className="sm:hidden">
            <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </span>
          <span className="hidden sm:inline">Précédent</span>
        </button>

        <div className="flex items-center space-x-1 sm:hidden">
          {page > 1 && (
            <button
              onClick={() => onPageChange(1)}
              className="px-1 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 min-w-[2rem]"
            >
              1
            </button>
          )}
          {page > 2 && <span className="px-1 text-gray-400 text-xs">...</span>}
          {page > 1 && (
            <button
              onClick={() => onPageChange(page - 1)}
              className="px-1 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 min-w-[2rem]"
            >
              {page - 1}
            </button>
          )}
          <button
            onClick={() => onPageChange(page)}
            className="px-1 py-1 text-xs font-medium text-white bg-blue-600 border border-blue-600 rounded-lg min-w-[2rem]"
          >
            {page}
          </button>
          {page < pageCount && (
            <button
              onClick={() => onPageChange(page + 1)}
              className="px-1 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 min-w-[2rem]"
            >
              {page + 1}
            </button>
          )}
          {page < pageCount - 1 && <span className="px-1 text-gray-400 text-xs">...</span>}
          {page < pageCount && (
            <button
              onClick={() => onPageChange(pageCount)}
              className="px-1 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 min-w-[2rem]"
            >
              {pageCount}
            </button>
          )}
        </div>

        <div className="hidden sm:flex items-center space-x-1">
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg ${
                page === pageNum
                  ? "text-white bg-blue-600 border border-blue-600"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(Math.min(pageCount, page + 1))}
          disabled={page === pageCount}
          className="px-1 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          title="Page suivante"
        >
          <span className="hidden sm:inline">Suivant</span>
          <span className="sm:hidden">
            <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
