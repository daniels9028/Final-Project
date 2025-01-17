import React from "react";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg mx-4 sm:mx-auto rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between p-4 border-b-2 border-gray-200">
          <p className="font-semibold text-xl">{title}</p>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            ✖
          </button>
        </div>
        <div
          className="max-h-96 overflow-y-auto"
          style={{
            scrollbarWidth: "thin", // Firefox
            scrollbarColor: "rgba(156, 163, 175) rgba(243, 244, 246)", // Firefox colors
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
