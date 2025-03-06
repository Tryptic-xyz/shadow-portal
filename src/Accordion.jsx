import { useState } from "react";

const Accordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="w-full bg-gradient-to-b from-white/0 to-white/15 py-4 px-3 rounded-lg border border-white/20 shadow-xl cursor-pointer z-1"
      onClick={handleToggle}
    >
      {/* Accordion header */}
      <div className="flex justify-between items-center cursor-pointer">
        <p className="text-white/50 text-sm font-mono uppercase">Fees</p>
        <div className="flex items-center gap-2">
          <p className="text-white">${isOpen ? "0.10" : "0.10"}</p>
          <img
            src="/icons/chevron-down.svg"
            alt="chevron"
            className={`w-3 h-3 transform transition-transform duration-500 ease-in-out-quart ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Accordion body */}
      <div
        className={` flex flex-col gap-y-2 bg-blue-800/60 rounded-lg text-sm text-white overflow-hidden transition-all duration-500 ease-in-out-quart ${
          isOpen ? "max-h-[500px] mt-4" : "max-h-0 mt-0"
        }`}
      >
        <div className="h-[1px] mt-1 mb-2 w-full bg-white/15"></div>
        <div className="flex justify-between">
          <p className="text-white/50">Gas Fee:</p>
          <p>$0.005</p>
        </div>

        <div className="flex justify-between">
          <p className="text-white/50">Application Fee:</p>
          <p>$0.005</p>
        </div>

        <div className="flex justify-between">
          <p className="text-white/50">Max Slippage:</p>
          <p>1%</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
