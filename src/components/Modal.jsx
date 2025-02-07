import React from "react";

const Modal = ({ isOpen, onClose, children, title, onScroll }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute top-4 right-4">
        <button onClick={onClose} className="text-2xl text-white">
          ✖
        </button>
      </div>
      <div className="w-full max-w-lg mx-4 overflow-hidden bg-gray-100 shadow-lg rounded-xl sm:mx-auto">
        <div
          className="p-4 overflow-y-auto max-h-96 no-scrollbar"
          onScroll={onScroll}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
