import React from "react";

function BridgeButton({ isActive, onClick }) {
  return (
    <button
      className={`cursor-pointer mt-4 py-5 rounded-lg px-4 uppercase tracking-widest transition-all ease-in-out-quart z-1 ${
        isActive
          ? "bg-blue-500 text-white font-bold"
          : "bg-blue-900/50 text-white/20 cursor-not-allowed"
      }`}
      onClick={onClick}
      disabled={!isActive}
    >
      <div className="z-10">Send</div>
    </button>
  );
}

export default BridgeButton;
