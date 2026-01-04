import React from "react";

export default function CustomAlert({ message, type = "success", onClose }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
    >
      <div
        className={`pointer-events-auto relative max-w-lg w-full px-10 py-6 rounded-3xl 
          shadow-2xl text-white font-extrabold text-lg text-center
          ${type === "success" ? "bg-green-500 shadow-green-400/70" : "bg-red-500 shadow-red-400/70"}
          animate-fade-in animate-bounce`}
        style={{ animationDuration: "0.5s" }}
      >
        {message}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold hover:text-gray-200 transition"
        >
          ×
        </button>
      </div>
    </div>
  );
}
