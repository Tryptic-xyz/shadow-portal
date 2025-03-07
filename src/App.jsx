import { useState, React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar.jsx";
import MyAssets from "./MyAssets.jsx";
import BridgePanel from "./BridgePanel.jsx";
import Footer from "./Footer.jsx";
import Terms from "./Terms.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";

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
    setSelectedNFTs((prevNFTs) => {
      const updatedNFTs = prevNFTs.filter((nft) => nft.id !== nftToRemove.id);

      return updatedNFTs;
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="outer-ctr flex flex-col h-screen items-center gap-0">
              <div className="flex items-center w-full h-24">
                <NavBar />
              </div>
              <div className="flex w-full h-full gap-4">
                <MyAssets
                  selectedNFTs={selectedNFTs}
                  onSelectNFT={handleSelectNFT}
                  onRemoveNFT={handleRemoveNFT}
                />
                <div className="hidden lg:block">
                  <BridgePanel
                    selectedNFTs={selectedNFTs}
                    onRemoveNFT={handleRemoveNFT}
                  />
                </div>
              </div>
              <div className="flex items-end w-full h-20">
                <Footer />
              </div>
            </div>
          }
        />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
