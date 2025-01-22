import React from "react";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg mx-4 overflow-hidden bg-white rounded-lg shadow-lg sm:mx-auto">
        <div className="flex justify-between p-4 border-b-2 border-gray-200">
          <p className="text-xl font-semibold">{title}</p>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            ✖
          </button>
        </div>
        <div className="overflow-y-auto max-h-96 no-scrollbar">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
