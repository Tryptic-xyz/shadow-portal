import { useState, useRef, useEffect } from "react";
import "./styles/dropdown.css";

const walletItems = [
  {
    walletType: "MetaMask",
    walletTypeIcon: "/icons/metamask.svg",
    walletTypeColor: "#E27625",
    address: "0x1234abcd5678efgh9012ijkl",
  },
];

const truncateAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};

const ConnectWallet = ({ setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedInLocal] = useState(true);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Copy address to clipboard
  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Disconnect function
  const handleDisconnect = () => {
    setIsLoggedInLocal(false);
    setIsLoggedIn(false); // Update the login status in the App component
    setIsOpen(false);
  };

  return (
    <div className="h-full gradient-border " ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => {
          if (!isLoggedIn) {
            setIsLoggedInLocal(true); // Simulate logging in
            setIsLoggedIn(true); // Update the login status in the App component
          } else {
            setIsOpen(!isOpen); // Open dropdown if already logged in
          }
        }}
        className={`px-4 rounded-lg bg-blue-100/10 h-full flex items-center gap-3 cursor-pointer transition-all ${
          isOpen
            ? "hover:bg-blue-100 bg-blue-100/90 border-blue border-1 text-blue-500"
            : "hover:bg-blue-100/20 text-white"
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Menu"
      >
        {isLoggedIn ? (
          <>
            <span>{truncateAddress(walletItems[0].address)}</span>
            <img
              src={walletItems[0].walletTypeIcon}
              alt="Wallet Icon"
              className="w-6 h-6"
            />
          </>
        ) : (
          "Connect Wallet"
        )}
      </button>

      {isLoggedIn && (
        <div
          className={`dropdown-ctr min-w-64 z-50 gap-y-2 py-4  ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-2 scale-90 pointer-events-none"
          }`}
          role="menu"
        >
          {/* header bar */}
          <div className="flex w-full justify-between items-center">
            <p className="text-lg text-white">Account</p>
            <div
              className="bg-white/15 transition-colors duration-300  hover:bg-white/30 rounded-full p-2 cursor-pointer "
              onClick={() => setIsOpen(false)}
            >
              <img
                className="h-[10px]"
                src="/icons/close.svg"
                alt="Close Wallet dropdown"
              />
            </div>
          </div>

          {/* Wallet Info */}
          <div className="flex flex-col mt-2">
            {walletItems.map((item, index) => (
              <div key={index}>
                <p
                  className="text-lg font-mono font-medium"
                  style={{ color: item.walletTypeColor }}
                >
                  {item.walletType}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={walletItems[0].walletTypeIcon}
                    alt="Wallet Icon"
                    className="w-6 h-6"
                  />
                  <p className="text-blue-100 font-mono">
                    {truncateAddress(walletItems[0].address)}
                  </p>
                  <div
                    className="bg-white/15 transition-colors duration-300  hover:bg-white/30 rounded-full p-2 cursor-pointer"
                    onClick={() => handleCopy(item.address)}
                    aria-label="Copy Address"
                  >
                    <img
                      className="h-[10px]"
                      src="/icons/copy.svg"
                      alt="Close Wallet dropdown"
                    />
                  </div>

                  {copied && (
                    <span className="text-green-400 text-sm">Copied!</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Disconnect Wallet */}
          <button
            className="border-blue-500 w-full py-3 font-mono uppercase text-white border flex justify-center rounded-md mt-4 bg-blue-500/10 hover:bg-blue-500/80 transition-color duration-300 tracking-widest text-sm cursor-pointer"
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
