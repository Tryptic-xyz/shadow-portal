import { useState } from "react";
import SelectedNFT from "./SelectedNFT.jsx";
import DestinationDropdown from "./DestinationDropdown.jsx";
import Accordion from "./Accordion.jsx";

const destinationItems = [
  {
    name: "Apechain",
    icon: "Apechain",
    
  },
  "divider",
  {
    name: "Ethereum",
    icon: "Ethereum",
    
  },
  "divider",
  {
    name: "Base",
    icon: "Base",
    
  },
  "divider",
  {
    name: "Abstract",
    icon: "Abstract",
    
  },
];

function BridgePanel({ selectedNFTs, onRemoveNFT, resetSelectedNFTs }) {
  const [isToggled, setIsToggled] = useState(false);
  const [screen, setScreen] = useState("default");

  const handleToggle = () => {
    if (selectedNFTs.length > 0) {
      setIsToggled(!isToggled);
    }
  };

  const handleSendClick = () => {
    if (isToggled && selectedNFTs.length > 0) {
      setScreen("inProgress");
      setTimeout(() => {
        setScreen("successful");
      }, 3000);
    }
  };

  const handleCloseClick = () => {
    resetSelectedNFTs();
    setScreen("default");
  };

  const isSendButtonActive = isToggled && selectedNFTs.length > 0;
  const isToggleDisabled = selectedNFTs.length === 0;

  return (
    <div className="min-w-auto h-[85svh] w-full lg:min-w-[375px] xl:min-w-[450px] lg:h-full bg-blue-900/80 flex flex-col rounded-lg shadow-xl rainbow-gradient-stroke relative p-4 gap-y-4 lg:gap-y-8 bridge-panel-bg overflow-y-scroll scrollbar-hide">
      {screen === "default" && (
        <>
          {/* Destination Dropdown */}
          <div className="flex w-full bg-gradient-to-b from-white/0 to-white/15 justify-between items-center py-4 px-3 rounded-lg border border-white/20 shadow-xl">
            <p className="text-white lg:text-xl">Destination</p>
            <DestinationDropdown menuItems={destinationItems} />
          </div>

          {/* Selected NFT Panel */}
          <div className="flex flex-col gap-y-2 z-10">
            <div className="w-full flex justify-between items-center">
              <h1 className="lg:text-2xl text-white pl-1">Selected NFTs</h1>
              {selectedNFTs.length > 0 && (
                <div className="bg-blue-500 tracking-wider uppercase text-sm px-4 py-0.5 rounded-full text-white/80">
                  {selectedNFTs.length} Selected
                </div>
              )}
            </div>

            <div className="flex flex-col gap-y-8 w-full bg-gradient-to-b from-white/0 to-white/15 justify-between items-center py-4 px-3 rounded-lg border border-white/20 shadow-xl">
              {selectedNFTs.length > 0 ? (
                selectedNFTs.map((nft) => (
                  <SelectedNFT
                    key={nft.id}
                    nft={nft}
                    onRemoveNFT={onRemoveNFT}
                  />
                ))
              ) : (
                <p className="text-white/50">No NFT selected</p>
              )}
            </div>
          </div>

          {/* Toggle Button */}
          <div className="flex justify-between items-center gap-4 mt-4 z-10">
            <h1 className="lg:text-2xl text-white">Approve selected NFTs</h1>
            <label
              className={`relative flex items-center cursor-pointer w-12 h-6 ${
                isToggleDisabled ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isToggled}
                onChange={handleToggle}
                disabled={isToggleDisabled}
              />
              <div
                className={`w-12 h-7 rounded-full transition-all ease-in-out-quart duration-300 ${
                  isToggleDisabled
                    ? "bg-gray-300"
                    : "bg-blue-300/50 peer-checked:bg-blue-500"
                }`}
              ></div>
              <div
                className={`absolute top-0.5 left-0 w-5 h-5 rounded-full transition-all ease-in-out-quart duration-300 ${
                  isToggled ? "left-6 bg-white" : "left-1 bg-blue-100/80"
                } ${isToggleDisabled ? "bg-gray-400" : ""}`}
              ></div>
            </label>
          </div>

          <Accordion />

          <button
            className={`cursor-pointer mt-4 py-5 rounded-lg px-4 uppercase tracking-widest transition-all ease-in-out-quart z-1 ${
              isSendButtonActive
                ? "bg-blue-500 text-white font-bold"
                : "bg-blue-900/50 text-white/20 cursor-not-allowed"
            }`}
            onClick={handleSendClick}
            disabled={!isSendButtonActive}
          >
            <div className="z-10">Send</div>
          </button>

          <div className="flex w-full justify-center font-mono text-white/40 text-sm underline">
            <div className="flex gap-x-4">
              <a href="">Transactions</a>
              <a href="">Support</a>
            </div>
          </div>
        </>
      )}

      {screen === "inProgress" && (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-white text-2xl">Bridging in progress...</h1>
        </div>
      )}

      {screen === "successful" && (
        <div className="flex flex-col items-center justify-center h-full z-100">
          <h1 className="text-white text-2xl">Bridge Successful</h1>
          <div className="flex gap-4 mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              View Transaction
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleCloseClick}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BridgePanel;
