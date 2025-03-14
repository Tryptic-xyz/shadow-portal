import { useState } from "react";
import SelectedNFT from "./SelectedNFT.jsx";
import DestinationDropdown from "./DestinationDropdown.jsx";
import Accordion from "./Accordion.jsx";
import inProgress from "/images/bridge-progress.png"
import complete from "/images/bridge-complete.png";

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
  
  const [screen, setScreen] = useState("default");



  const handleSendClick = () => {
    if ( selectedNFTs.length > 0) {
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

  const isSendButtonActive =  selectedNFTs.length > 0;
  

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


          <Accordion layer0={1.29} gasFee={0.25} />

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
          <img src={inProgress} alt="Bridging in progress" />
        </div>
      )}

      {screen === "successful" && (
        <div className="flex flex-col items-center justify-center h-full z-100 gap-y-10">
          <div className="flex flex-col gap-y-4 items-center">
            <h1 className="text-white text-3xl">Bridge Successful</h1>
            <img src={complete} alt="Bridging in progress" />
          </div>

          <div className="flex flex-col w-full gap-3 mt-4">
            <button className="bg-white/50 hover:bg-white/30 transition-colors text-white py-4 uppercase font-mono px-4 rounded-md">
              View Transaction
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 transition-colors  uppercase font-mono p-4 text-white rounded-md"
              onClick={handleCloseClick}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BridgePanel;
