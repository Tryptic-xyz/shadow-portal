import { useState } from "react";
import "./ConnectWallet.css";
import NFTCard from "./NFTCard.jsx";
import Dropdown from "./Dropdown.jsx";

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
    name: "CryptoPunk #12",
    collection: "CryptoPunks",
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
    name: "CryptoPunk #33",
    collection: "CryptoPunks",
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
    name: "CryptoPunk #77",
    collection: "CryptoPunks",
    image: "",
    address: "0x1234abcd5678efgh9012ijkl",
    networks: [{ name: "Abstract", isActive: true }],
  },
];

const networkItems = [
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

const collectionItems = [
  {
    name: "Bored Ape Yacht Club",
    icon: "Apechain",
    action: () => console.log("BAYC Selected"),
  },
  "divider",
  {
    name: "Mutant Ape Yacht Club",
    icon: "Apechain",
    action: () => console.log("MAYC Selected"),
  },
  "divider",
  {
    name: "Crypto Punks",
    icon: "cryptopunks",
    action: () => console.log("CryptoPunks selected"),
  },
];

function MyAssets({ onSelectNFT, selectedNFTs }) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Handle the selection of a filter or remove it if already selected
  const handleFilterSelect = (filter) => {
    setSelectedFilters(
      (prevFilters) =>
        prevFilters.includes(filter)
          ? prevFilters.filter((f) => f !== filter) // Remove the filter if it is already selected
          : [...prevFilters, filter] // Add the filter if it is not selected
    );
  };

  // Remove a specific filter
  const handleRemoveFilter = (filter) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter((f) => f !== filter)
    );
  };

  const filteredNFTs = NFTCollection.filter(
    (nft) =>
      selectedFilters.length === 0 ||
      selectedFilters.some(
        (filter) =>
          nft.networks.some((network) => network.name === filter) ||
          nft.collection === filter
      )
  );

  return (
    <div className="asset-ctr">
      <div className="bottom-gradient"></div>
      <div className="assets-header flex justify-between">
        <div className="title flex items-center gap-3">
          <h1 className="font-headline uppercase text-blue-300 text-5xl tracking-wide">
            My Assets
          </h1>
          <div className="border-1 border-blue-300 rounded-sm px-2 py-.5 bg-blue-300/15 text-blue-300 font-medium">
            {NFTCollection.length}
          </div>
        </div>

        <div className="dropdowns flex gap-3">
          <Dropdown
            menuItems={networkItems}
            buttonName="Network"
            onSelect={handleFilterSelect}
          />
          <Dropdown
            menuItems={collectionItems}
            buttonName="Collection"
            onSelect={handleFilterSelect}
          />
        </div>
      </div>

      {/* Filter Labels */}
      {selectedFilters.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-2 z-10">
          {selectedFilters.map((filter) => (
            <div
              key={filter}
              className="bg-blue-500 hover:bg-blue-300 text-white px-3 py-1 rounded-full flex items-center cursor-pointer"
              onClick={() => handleRemoveFilter(filter)} // Remove the filter when clicked
            >
              {filter}
              <button
                className="ml-2 text-white text-sm font-bold"
                onClick={() => handleRemoveFilter(filter)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {NFTCollection.map((nft) => (
          <NFTCard
            key={nft.id}
            image={nft.image}
            collection={nft.collection}
            name={nft.name}
            address={nft.address}
            networks={nft.networks}
            onSelect={() => onSelectNFT(nft)}
            isSelected={selectedNFTs.some((item) => item.id === nft.id)} // Correctly sync selection
          />
        ))}
      </div>
    </div>
  );
}

export default MyAssets;
