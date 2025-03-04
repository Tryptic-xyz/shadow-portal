import { useState } from "react";
import "./App.css";
import NavBar from "./NavBar.jsx";
import MyAssets from "./MyAssets.jsx";
import BridgePanel from "./BridgePanel.jsx";
import Footer from "./Footer.jsx";

function App() {
  const [selectedNFTs, setSelectedNFTs] = useState([]);

  const handleSelectNFT = (nft) => {
    setSelectedNFTs((prevNFTs) => {
      const isAlreadySelected = prevNFTs.some((item) => item.id === nft.id);

      if (isAlreadySelected) {
        return prevNFTs.filter((item) => item.id !== nft.id); // Remove if already selected
      } else if (prevNFTs.length < 3) {
        return [...prevNFTs, nft]; // Add if under limit
      }
      return prevNFTs; // Do nothing if already at limit
    });
  };

  const handleRemoveNFT = (nftToRemove) => {
    setSelectedNFTs((prevNFTs) =>
      prevNFTs.filter((nft) => nft.id !== nftToRemove.id)
    );
  };

  return (
    <div className="max-w-[1520px] w-full flex flex-col items-center gap-6 px-6">
      <NavBar />
      <div className="flex w-full h-full gap-4">
        <MyAssets selectedNFTs={selectedNFTs} onSelectNFT={handleSelectNFT} />
        <BridgePanel
          selectedNFTs={selectedNFTs}
          onRemoveNFT={handleRemoveNFT}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
