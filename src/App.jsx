import { useState, React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar.jsx";
import MyAssets from "./MyAssets.jsx";
import BridgePanel from "./BridgePanel.jsx";
import Footer from "./Footer.jsx";
import Terms from "./Terms.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import placeholderImage from "./assets/logged-out.png";

function App() {
  const [selectedNFTs, setSelectedNFTs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSelectNFT = (nft) => {
    setSelectedNFTs((prevNFTs) => {
      const isAlreadySelected = prevNFTs.some((item) => item.id === nft.id);

      if (isAlreadySelected) {
        return prevNFTs.filter((item) => item.id !== nft.id); // Remove if already selected
      } else if (prevNFTs.length < 3) {
        return [...prevNFTs, nft]; // Add if under limit
      } else {
        alert("Sorry, you can only bridge 3 assets at a time.");
        return prevNFTs; // Do nothing if already at limit
      }
    });
  };

  const handleRemoveNFT = (nftToRemove) => {
    setSelectedNFTs((prevNFTs) => {
      const updatedNFTs = prevNFTs.filter((nft) => nft.id !== nftToRemove.id);

      return updatedNFTs;
    });
  };

  const resetSelectedNFTs = () => {
    setSelectedNFTs([]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="outer-ctr flex flex-col h-screen items-center gap-0">
              <div className="flex items-center w-full h-24">
                <NavBar setIsLoggedIn={setIsLoggedIn} />
              </div>
              <div className="flex w-full h-full gap-4">
                {isLoggedIn ? (
                  <>
                    <MyAssets
                      selectedNFTs={selectedNFTs}
                      onSelectNFT={handleSelectNFT}
                      onRemoveNFT={handleRemoveNFT}
                    />
                    <div className="hidden lg:block">
                      <BridgePanel
                        selectedNFTs={selectedNFTs}
                        onRemoveNFT={handleRemoveNFT}
                        resetSelectedNFTs={resetSelectedNFTs}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full rounded-lg border-white/30 border bg-blue-900/70 p-6 relative">
                    <img
                      src={placeholderImage}
                      alt="Placeholder"
                      className="object-fit h-full w-full"
                    />
                    <div className="absolute m-auto flex flex-col items-center justify-center gap-y-2">
                      <h1 className="font-headline uppercase text-blue-500 text-7xl tracking-wide">
                        Connect your wallet
                      </h1>
                      <p className="text-white max-w-[350px] text-lg text-center">
                        Sign in with a supported wallet to view your assets and
                        start bridging.
                      </p>
                    </div>
                  </div>
                )}
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
