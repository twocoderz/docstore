import React from "react";

const Popup = ({ open, title, message, onClose, actionLabel = "Compris" }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
        <div className="flex items-start gap-4 px-6 pt-6">
          <div className="flex h-12 w-12 items-center justify-center text-indigo-700">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm leading-relaxed text-slate-600">{message}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
