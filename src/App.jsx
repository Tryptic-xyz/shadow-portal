import { useState, useEffect, React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar.jsx";
import MyAssets from "./MyAssets.jsx";
import BridgePanel from "./BridgePanel.jsx";
import Footer from "./Footer.jsx";
import Terms from "./Terms.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import placeholderImage from "/images/logged-out.png";

function App() {
  const [selectedNFTs, setSelectedNFTs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if the user is already logged in
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "shadowportal") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="outer-ctr flex flex-col justify-between w-full h-full ">
              {isLoggedIn ? (
                <>
                  <NavBar setIsLoggedIn={handleLogout} />
                  <div className="flex w-full h-full overflow-hidden gap-4">
                    <MyAssets
                      selectedNFTs={selectedNFTs}
                      onSelectNFT={handleSelectNFT}
                      onRemoveNFT={handleRemoveNFT}
                      resetSelectedNFTs={resetSelectedNFTs}
                    />
                    <div className="hidden lg:block">
                      <BridgePanel
                        selectedNFTs={selectedNFTs}
                        onRemoveNFT={handleRemoveNFT}
                        resetSelectedNFTs={resetSelectedNFTs}
                      />
                    </div>
                  </div>
                  <Footer />
                </>
              ) : (
                <div className="flex  items-center justify-center w-full h-full">
                  <form
                    onSubmit={handleLogin}
                    className="flex  justify-center gap-2 h-14"
                  >
                    <input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mb-2 p-2 border border-gray-300 rounded bg-white h-full"
                    />
                    <button
                      type="submit"
                      className="p-2 bg-blue-300 text-white rounded"
                    >
                      Login
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                  </form>
                </div>
              )}
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
