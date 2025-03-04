import { useState } from "react";
import SelectedNFT from "./SelectedNFT.jsx";
import DestinationDropdown from "./DestinationDropdown.jsx";
import Accordion from "./Accordian.jsx";

const destinationItems = [
  {
    name: "Apechain",
    icon: "Apechain",
    action: () => console.log("Apechain selected"),
  },
  "divider",
  {
    name: "Ethereum",
    icon: "Ethereum",
    action: () => console.log("Ethereum selected"),
  },
  "divider",
  {
    name: "Base",
    icon: "Base",
    action: () => console.log("Base Selected"),
  },
  "divider",
  {
    name: "Abstract",
    icon: "Abstract",
    action: () => console.log("Abstract Selected"),
  },
];

function BridgePanel({selectedNFT}) {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="min-w-[450px] bg-blue-900/80 flex flex-col rounded-lg shadow-lg rainbow-gradient-stroke relative p-4 gap-y-8 bridge-panel-bg">
      {/* Destination Dropdown */}
      <div className="flex w-full bg-gradient-to-b from-white/0 to-white/15 justify-between items-center py-4 px-3 rounded-lg border border-white/20 shadow-xl">
        <p className="text-white text-xl">Destination</p>
        <DestinationDropdown menuItems={destinationItems} />
      </div>

      {/* Selected NFT Panel */}
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl text-white pl-1">Selected NFTs</h1>
        <div className="flex w-full bg-gradient-to-b from-white/0 to-white/15 justify-between items-center py-4 px-3 rounded-lg border border-white/20 shadow-xl">
          <SelectedNFT nft={selectedNFT} />
        </div>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-between items-center gap-4 mt-4 z-10">
        <h1 className="text-2xl text-white">Approve selected NFTs</h1>
        <label className="relative flex items-center cursor-pointer w-12 h-6">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isToggled}
            onChange={handleToggle}
          />
          <div className="w-12 h-7 bg-blue-300/50 rounded-full peer-checked:bg-blue-500 transition-all ease-in-out-quart duration-300"></div>
          <div
            className={`absolute top-0.5 left-0 w-5 h-5 bg-blue-100/80 rounded-full transition-all ease-in-out-quart duration-300 ${
              isToggled ? "left-6 bg-white" : "left-1"
            }`}
          ></div>
        </label>
      </div>

      <Accordion />

      <button
        className={`cursor-pointer mt-4 py-5 rounded-lg px-4 uppercase tracking-widest transition-all ease-in-out-quart  z-1 ${
          isToggled ? " text-white send-button font-bold" : "bg-blue-900/50 text-white/20"
        }`}>
        <div className="z-10">Send</div>
      </button>

      <div className="flex w-full justify-center font-mono text-white/40 text-sm underline">
        <div className="flex gap-x-4">
          <a href="">Transactions</a>
          <a href="">Support</a>
        </div>
      </div>
    </div>
  );
}

export default BridgePanel;
