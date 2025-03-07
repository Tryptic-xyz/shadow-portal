import { useState, useEffect } from "react";
import NFTCard from "./NFTCard.jsx";
import placeholder from "./assets/ape-placeholder.png";
import Dropdown from "./Dropdown.jsx";
import NetworkDropdown from "./NetworkDropdown.jsx";
import BridgePanel from "./BridgePanel.jsx";

const NFTCollection = [
  {
    id: 1,
    name: "CryptoPunk #1",
    collection: "CryptoPunks",
    image:
      "https://cdn.decrypt.co/resize/1024/height/512/wp-content/uploads/2022/11/bored-ape-3001-bieber-gID_7.png",
    address: "0x1234abcd5678efgh9012ijkl",
    networks: [
      { name: "Ethereum", isActive: true },
      { name: "Base", isActive: false },
    ],
  },
  {
    id: 2,
    name: "Bored Ape #12",
    collection: "Bored Ape Yacht Club",
    image: "",
    address: "0x1234abcd5678efgh9012ijkl",
    networks: [
      { name: "Ethereum", isActive: true },
      { name: "Base", isActive: false },
      { name: "Abstract", isActive: false },
    ],
  },
  {
    id: 3,
    name: "Mutant Ape #33",
    collection: "Mutant Ape Yacht Club",
    image: "",
    address: "0x1234abcd5678efgh9012ijkl",
    networks: [
      { name: "Base", isActive: false },
      { name: "Apechain", isActive: true },
      { name: "Abstract", isActive: false },
    ],
  },
  {
    id: 4,
    name: "CryptoPunk #55",
    collection: "CryptoPunks",
    image: "",
    address: "0x1234abcd5678efgh9012ijkl",
    networks: [
      { name: "Ethereum", isActive: false },
      { name: "Apechain", isActive: true },
    ],
  },
  {
    id: 5,
    name: "Bored Ape #77",
    collection: "Bored Ape Yacht Club",
    image: "",
    address: "0x1234abcd5678efgh9012ijkl",
    networks: [{ name: "Abstract", isActive: true }],
  },
];

function MyAssets({ onSelectNFT, selectedNFTs, onRemoveNFT }) {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [networkItems, setNetworkItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [showBridgePanel, setShowBridgePanel] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Initialize network items based on active networks in the NFT collection
    const uniqueActiveNetworks = new Set();
    NFTCollection.forEach((nft) => {
      nft.networks.forEach((network) => {
        if (network.isActive) {
          uniqueActiveNetworks.add(network.name);
        }
      });
    });

    const activeNetworkItems = Array.from(uniqueActiveNetworks).map(
      (networkName) => ({
        name: networkName,
        icon: networkName,
        action: () => handleNetworkSelect(networkName),
      })
    );

    activeNetworkItems.unshift({
      name: "All Networks",
      icon: null,
      action: () => handleNetworkSelect(null),
    });

    const formattedNetworkItems = activeNetworkItems.reduce(
      (acc, item, index) => {
        if (index > 0) acc.push("divider");
        acc.push(item);
        return acc;
      },
      []
    );

    setNetworkItems(formattedNetworkItems);
  }, []);

  useEffect(() => {
    if (selectedNFTs.length === 0) {
      setShowNotification(false);
    }
  }, [selectedNFTs]);

  const handleNetworkSelect = (networkName) => {
    if (networkName === null) {
      setSelectedNetwork(null);
      setSelectedCollections([]);
    } else {
      setSelectedNetwork(networkName);
    }
  };

  const handleCollectionSelect = (collectionName) => {
    if (collectionName === null) {
      setSelectedCollections([]);
    } else {
      setSelectedCollections((prev) =>
        prev.includes(collectionName)
          ? prev.filter((c) => c !== collectionName)
          : [...prev, collectionName]
      );
    }
  };

  const handleRemoveFilter = (filter) => {
    if (filter === selectedNetwork) {
      setSelectedNetwork(null);
    } else {
      setSelectedCollections((prev) => prev.filter((c) => c !== filter));
    }
  };

  const filteredNFTs = NFTCollection.filter((nft) => {
    const matchesNetwork = selectedNetwork
      ? nft.networks.some(
          (network) => network.name === selectedNetwork && network.isActive
        )
      : true;

    const matchesCollection = selectedCollections.length
      ? selectedCollections.includes(nft.collection)
      : true;

    return matchesNetwork && matchesCollection;
  });

  const activeFilters = [
    ...(selectedNetwork ? [selectedNetwork] : []),
    ...selectedCollections,
  ];

  const uniqueCollections = [
    ...new Set(NFTCollection.map((nft) => nft.collection)),
  ];
  const collectionItems = uniqueCollections.reduce((acc, collection, index) => {
    if (index > 0) acc.push("divider");
    acc.push({
      name: collection,
      icon: "Apechain",
      action: () => handleCollectionSelect(collection),
    });
    return acc;
  }, []);

  const handleSelectNFT = (nft) => {
    onSelectNFT(nft);
    if (selectedNFTs.some((item) => item.id === nft.id)) {
      if (selectedNFTs.length === 1) {
        setShowNotification(false);
      }
    } else {
      setShowNotification(true);
    }
  };

  const handleShowBridgePanel = () => {
    setShowBridgePanel(true);
  };

  const handleCloseBridgePanel = () => {
    setShowBridgePanel(false);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="asset-ctr h-full overflow-hidden shadow-xl">
      <div className="bottom-gradient"></div>
      <div className="assets-header flex  gap-y-2 flex-col sm:flex-row justify-between">
        <div className="title flex items-center gap-3">
          <h1 className="font-headline uppercase text-blue-300 text-5xl tracking-wide">
            My Assets
          </h1>
          <div className="border-1 border-blue-300 rounded-sm px-2 py-.5 bg-blue-300/15 text-blue-300 font-medium">
            {filteredNFTs.length}
          </div>
        </div>

        <div className="dropdowns flex gap-3 min-h-10 w-full md:w-auto">
          <NetworkDropdown
            menuItems={networkItems}
            onSelect={handleNetworkSelect}
          />
          <Dropdown
            menuItems={collectionItems}
            buttonName="Collection"
            onSelect={handleCollectionSelect}
          />
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex gap-2 flex-wrap bg-blue-900/20 p-3 rounded-lg z-10">
          {activeFilters.map((filter) => (
            <div
              key={filter}
              className="border-blue-300 border bg-blue-300/30 hover:bg-blue-300 text-white/70 hover:text-white px-3 py-1 rounded-full flex items-center cursor-pointer transition-all duration-300"
              onClick={() => handleRemoveFilter(filter)}
            >
              {filter}
              <button
                className="ml-2 text-white/50 text-sm font-bold"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFilter(filter);
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="nft-grid scrollbar-hide">
        {filteredNFTs.map((nft) => (
          <NFTCard
            key={nft.id}
            image={nft.image}
            collection={nft.collection}
            name={nft.name}
            address={nft.address}
            networks={nft.networks}
            onSelect={() => handleSelectNFT(nft)}
            isSelected={selectedNFTs.some((item) => item.id === nft.id)}
          />
        ))}
      </div>

      {showNotification && selectedNFTs.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-blue-900/70 rounded-t-lg text-white flex flex-col gap-y-4 lg:hidden z-50 backdrop-blur-lg">
          <div className="flex justify-between items-center">
            <p className="font-mono uppercase text-xs text-blue-100/50">
              {selectedNFTs.length} Assets Selected
            </p>
            <button
              className="text-xs text-blue-100/50 uppercase"
              onClick={handleToggleCollapse}
            >
              {isCollapsed ? "Expand" : "Collapse"}
            </button>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col gap-y-2 w-full">
              {selectedNFTs.map((nft) => (
                <div
                  key={nft.id}
                  className="flex justify-between items-center w-full"
                >
                  <div className="flex justify-between items-center gap-2 bg-white/10 p-3 rounded-lg w-full">
                    <div className="flex gap-x-3 items-center">
                      <img
                        src={nft.image || placeholder}
                        alt={nft.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex flex-col">
                        <p className="text-sm text-white/50">{nft.collection}</p>
                        <p className="">{nft.name}</p>
                      </div>
                    </div>

                    <button
                      className="bg-white/15 transition-colors duration-300 hover:bg-white/30 rounded-full p-2 cursor-pointer"
                      onClick={() => onRemoveNFT(nft)}
                    >
                      <img
                        className="h-[10px]"
                        src="/icons/close.svg"
                        alt="Close Wallet dropdown"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
            className="p-4 rounded-lg bg-blue-500 text-white uppercase font-mono tracking-wider"
            onClick={handleShowBridgePanel}
          >
            {selectedNFTs.length > 1 ? "Bridge Assets" : "Bridge Asset"}
          </button>
        </div>
      )}

      {showBridgePanel && (
        <div className="fixed inset-0 bg-blue-900/90 backdrop-blur-md z-50 flex justify-center items-center lg:hidden">
          <div className="relative w-full px-4 ">
            <button
              className="absolute -top-10 right-1 text-white bg-red-500 rounded-full h-6 w-6 z-100"
              onClick={handleCloseBridgePanel}
            >
              ✕
            </button>
            <BridgePanel
              selectedNFTs={selectedNFTs}
              onRemoveNFT={onRemoveNFT}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAssets;
