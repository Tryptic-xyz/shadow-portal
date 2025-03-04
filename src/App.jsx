import { useState } from "react";
import "./App.css";
import NavBar from "./NavBar.jsx";
import MyAssets from "./MyAssets.jsx";
import BridgePanel from "./BridgePanel.jsx";
import Footer from "./Footer.jsx";

function App() {
  const [selectedNFT, setSelectedNFT] = useState(null);

  
  return (
    <>
      <div className="max-w-[1520px] w-full flex flex-col items-center gap-6 px-6">
        <NavBar />
        <div className="flex w-full h-full gap-4">
          <MyAssets onSelectNFT={setSelectedNFT} />
          <BridgePanel selectedNFT={selectedNFT} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
