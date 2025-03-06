import { useState, useEffect } from "react";
import "./ConnectWallet.css";
import NFTCard from "./NFTCard.jsx";
import Dropdown from "./Dropdown.jsx";
import NetworkDropdown from "./NetworkDropdown.jsx";

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

function MyAssets({ onSelectNFT, selectedNFTs }) {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [networkItems, setNetworkItems] = useState([]);

  // Initialize network items based on active networks in the NFT collection
  useEffect(() => {
    // Extract unique networks with isActive=true
    const uniqueActiveNetworks = new Set();
    NFTCollection.forEach((nft) => {
      nft.networks.forEach((network) => {
        if (network.isActive) {
          uniqueActiveNetworks.add(network.name);
        }
      });
    });

    // Create network items array from active networks
    const activeNetworkItems = Array.from(uniqueActiveNetworks).map(
      (networkName) => ({
        name: networkName,
        icon: networkName, // Assuming icon name matches network name
        action: () => handleNetworkSelect(networkName),
      })
    );

    // Add "All Networks" option
    activeNetworkItems.unshift({
      name: "All Networks",
      icon: null, // No icon for "All Networks"
      action: () => handleNetworkSelect(null),
    });

    // Add dividers between items
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

  // Handle network selection (single selection)
  const handleNetworkSelect = (networkName) => {
    if (networkName === null) {
      // Clear all filters when "All Networks" is selected
      setSelectedNetwork(null);
      setSelectedCollections([]);
    } else {
      setSelectedNetwork(networkName);
    }
  };

  // Handle collection selection (multiple selection)
  const handleCollectionSelect = (collectionName) => {
    if (collectionName === null) {
      // If null is passed, clear the collection selection
      setSelectedCollections([]);
    } else {
      setSelectedCollections((prev) =>
        prev.includes(collectionName)
          ? prev.filter((c) => c !== collectionName)
          : [...prev, collectionName]
      );
    }
  };

  // Remove a specific filter
  const handleRemoveFilter = (filter) => {
    if (filter === selectedNetwork) {
      setSelectedNetwork(null);
    } else {
      setSelectedCollections((prev) => prev.filter((c) => c !== filter));
    }
  };

  // Filter NFTs based on selected network and collections
  const filteredNFTs = NFTCollection.filter((nft) => {
    // Filter by network - only show NFTs where the selected network is active
    const matchesNetwork = selectedNetwork
      ? nft.networks.some(
          (network) => network.name === selectedNetwork && network.isActive
        )
      : true;

    // Filter by collection
    const matchesCollection = selectedCollections.length
      ? selectedCollections.includes(nft.collection)
      : true;

    return matchesNetwork && matchesCollection;
  });

  // Combine all active filters for display
  const activeFilters = [
    ...(selectedNetwork ? [selectedNetwork] : []),
    ...selectedCollections,
  ];

  // Get unique collections for the dropdown
  const uniqueCollections = [
    ...new Set(NFTCollection.map((nft) => nft.collection)),
  ];
  const collectionItems = uniqueCollections.reduce((acc, collection, index) => {
    if (index > 0) acc.push("divider");
    acc.push({
      name: collection,
      icon: "Apechain", // You might want to use a more appropriate icon or map collection names to icons
      action: () => handleCollectionSelect(collection),
    });
    return acc;
  }, []);

  return (
    <div className="asset-ctr">
      <div className="bottom-gradient"></div>
      <div className="assets-header flex flex-col lg:flex-row justify-between">
        <div className="title flex items-center gap-3">
          <h1 className="font-headline uppercase text-blue-300 text-5xl tracking-wide">
            My Assets
          </h1>
          <div className="border-1 border-blue-300 rounded-sm px-2 py-.5 bg-blue-300/15 text-blue-300 font-medium">
            {filteredNFTs.length}
          </div>
        </div>

        <div className="dropdowns flex gap-3">
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

      {/* Filter Labels */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredNFTs.map((nft) => (
          <NFTCard
            key={nft.id}
            image={nft.image}
            collection={nft.collection}
            name={nft.name}
            address={nft.address}
            networks={nft.networks}
            onSelect={() => onSelectNFT(nft)}
            isSelected={selectedNFTs.some((item) => item.id === nft.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default MyAssets;
