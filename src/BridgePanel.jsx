import { useState } from "react";
import SelectedNFT from "./SelectedNFT.jsx";
import Accordion from "./Accordion.jsx";
import inProgress from "/images/bridge-progress.png";
import complete from "/images/bridge-complete.png";
import BridgeButton from "./BridgeButton.jsx";
import Dropdown from "./Dropdown.jsx";

const destinationItems = [
  { name: "Apechain", icon: "apechain" },
  "divider",
  { name: "Ethereum", icon: "ethereum" },
  "divider",
  { name: "Base", icon: "base" },
  "divider",
  { name: "Abstract", icon: "abstract" },
];

const collectionItems = [
  { name: "Bored Ape Yacht Club", icon: "bayc" },
  "divider",
  { name: "Mutant Ape Yacht Club", icon: "mayc" },
  "divider",
  { name: "CryptoPunks", icon: "cryptopunks" },
];

function BridgePanel({
  selectedNFTs,
  onRemoveNFT,
  resetSelectedNFTs,
  setDisplayNFTs,
}) {
  const [screen, setScreen] = useState("default");
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedSourceChain, setSelectedSourceChain] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const handleSendClick = () => {
    if (selectedNFTs.length > 0 && selectedDestination) {
      setScreen("inProgress");
      setTimeout(() => {
        setScreen("successful");
      }, 3000);
    }
  };

  const handleCloseClick = () => {
    resetSelectedNFTs();
    setScreen("default");
    setSelectedCollection(null);
    setSelectedSourceChain(null);
    setSelectedDestination(null);
    setDisplayNFTs(false);
  };

  const isSendButtonActive =
    selectedNFTs.length > 0 &&
    selectedCollection &&
    selectedSourceChain &&
    selectedDestination;

  const handleSelectionChange = (collection, sourceChain, destination) => {
    setSelectedCollection(collection);
    setSelectedSourceChain(sourceChain);
    setSelectedDestination(destination);

    if (collection && sourceChain && destination) {
      setDisplayNFTs(true);
    }
  };

  const handleCollectionSelect = (item) => {
    handleSelectionChange(item, selectedSourceChain, selectedDestination);
  };

  const handleSourceChainSelect = (item) => {
    handleSelectionChange(selectedCollection, item, selectedDestination);
  };

  const handleDestinationSelect = (item) => {
    handleSelectionChange(selectedCollection, selectedSourceChain, item);
  };

  return (
    <div className="min-w-auto h-[85svh] w-full lg:min-w-[375px] xl:min-w-[450px] lg:h-full bg-blue-900/80 flex flex-col rounded-lg shadow-xl rainbow-gradient-stroke relative p-4 gap-y-4 lg:gap-y-8 bridge-panel-bg overflow-y-scroll scrollbar-hide">
      {screen === "default" && (
        <>
          <div className="flex flex-col gap-y-6">
            <h1 className="font-headline text-5xl tracking-wide text-blue-100 uppercase">
              Bridge Panel
            </h1>

            {/* Collection */}
            <div className="dropdown-outer">
              <div className="flex items-center gap-2">
                <p className="dropdown-label">Your Collections</p>
              </div>
              <Dropdown
                className="h-16 text-sm sm:text-base lg:text-lg"
                buttonName="Select a Collection"
                menuItems={collectionItems}
                onSelect={handleCollectionSelect}
              />
            </div>

            {/* Source Chain */}
            <div className="dropdown-outer">
              <div className="flex items-center gap-2">
                <p className="dropdown-label">Source Chain</p>
                <div className="tooltip">
                  <img src="/icons/info.svg" alt="info" />
                  <span className="tooltiptext">
                    The source chain is the chain where your NFTs are currently
                    located.
                  </span>
                </div>
              </div>
              <Dropdown
                className="h-16 text-sm sm:text-base lg:text-lg"
                buttonName="Select a Source Chain"
                menuItems={destinationItems}
                onSelect={handleSourceChainSelect}
              />
            </div>

            {/* Destination Chain */}
            <div className="dropdown-outer">
              <div className="flex items-center gap-2">
                <p className="dropdown-label">Destination Chain</p>
                <div className="tooltip">
                  <img src="/icons/info.svg" alt="info" />
                  <span className="tooltiptext">
                    The destination chain is the chain where you want to bridge
                    your asset to.
                  </span>
                </div>
              </div>
              <Dropdown
                className="h-16 text-sm sm:text-base lg:text-lg"
                buttonName="Select a Destination Chain"
                menuItems={destinationItems}
                onSelect={handleDestinationSelect}
              />
            </div>
          </div>

          <div className="divider"></div>

          {/* Selected NFT Panel */}
          <div className="flex flex-col gap-y-2 z-10">
            <div className="w-full flex justify-between items-center">
              <h1 className="dropdown-label">Selected NFTs</h1>
              {selectedNFTs.length > 0 && (
                <div className="bg-blue-500 tracking-wider uppercase text-sm px-4 py-0.5 rounded-full text-white/80">
                  {selectedNFTs.length} Selected
                </div>
              )}
            </div>

            <div className="flex flex-col gap-y-8 w-full bg-gradient-to-b from-white/0 to-white/15 justify-between items-center py-4 px-3 rounded-lg border border-white/20 shadow-xl">
              {selectedNFTs.map((nft) => (
                <SelectedNFT key={nft.id} nft={nft} onRemoveNFT={onRemoveNFT} />
              ))}
              {selectedNFTs.length === 0 && (
                <SelectedNFT nft={null} onRemoveNFT={onRemoveNFT} />
              )}
            </div>
          </div>

          <Accordion layer0={1.29} gasFee={0.25} />

          <div className="divider"></div>
          <BridgeButton
            isActive={isSendButtonActive}
            onClick={handleSendClick}
          />

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
