import { useState, useRef, useEffect } from "react";
import "./styles/dropdown.css";
import walletItems from "./data/walletItems";
import useClickOutside from "./hooks/useClickOutside"; 

const menuItems = [
  {
    name: "FAQs",
    icon: "faq",
  },
  "divider",
  {
    name: "Docs",
    icon: "docs",
  },
  "divider",
  {
    name: "DN404",
    icon: "support",
  },
  "divider",
  {
    name: "Apply",
    icon: "apechain-icon",
  },
];

const truncateAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};


const Menu = ({  setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedInLocal] = useState(true);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const itemsRef = useRef([]);
  const [copied, setCopied] = useState(false);

  useClickOutside(dropdownRef, () => setIsOpen(false), buttonRef);

  // Disconnect function
  const handleDisconnect = () => {
    setIsLoggedInLocal(false);
    setIsLoggedIn(false); // Update the login status in the App component
    setIsOpen(false);
  };

  // Copy address to clipboard
  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="h-11 md:h-full w-fit gradient-border cursor-pointer" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 md:px-4 rounded-lg bg-blue-100/10 h-full flex items-center justify-center gap-3 cursor-pointer transition-all ${
          isOpen
            ? "hover:bg-blue-100 bg-blue-100/90 border-blue border-1"
            : "hover:bg-blue-100/20"
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={`transition-all ease-out-expo duration-700 transform ${
            isOpen ? "rotate-90 stroke-blue-500" : "rotate-0 stroke-blue-100"
          }`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className="line line1"
            d="M3 12h18"
            style={{
              opacity: isOpen ? "0" : "1",
              transition: "opacity 0.3s ease",
            }}
          />
          <path
            className="line line2"
            d="M3 6h18"
            style={{
              opacity: isOpen ? "0" : "1",
              transition: "opacity 0.3s ease",
            }}
          />
          <path
            className="line line3"
            d="M3 18h18"
            style={{
              opacity: isOpen ? "0" : "1",
              transition: "opacity 0.3s ease",
            }}
          />
          {isOpen && (
            <path
              className="line line4 stroke-blue-500"
              d="M6 18L18 6M6 6l12 12"
              style={{
                opacity: isOpen ? "1" : "0",
                transition: "opacity 0.3s ease",
              }}
            />
          )}
        </svg>
      </button>

      <div
        className={`dropdown-ctr z-50 
          ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-2 scale-90 pointer-events-none"
          }`}
        role="menu"
        style={{ width: "max-content" }}
      >
        <ul className="py-2">
          {menuItems.map((item, index) =>
            item === "divider" ? (
              <hr key={index} className="border-blue-100/15" />
            ) : (
              <li
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                tabIndex="0"
                className="menu-item"
                role="menuitem"
                onClick={() => {
                  item.action?.();
                  setIsOpen(false);
                }}
              >
                <img
                  src={`/icons/${item.icon}.svg`}
                  alt={item.name}
                  className="w-6 h-6"
                />
                {item.name}
              </li>
            )
          )}

          {/* Wallet Section (Mobile Only) */} 
            <div className="md:hidden z-100">
              <hr className="border-blue-100/15" />
              <li className="menu-label ">Account Information</li>
              {/* Wallet Info */}
              <div className="flex flex-col p-2">
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

              <li className="p-2">
                <button
                  onClick={handleDisconnect}
                  className="border-blue-500 w-full py-3 font-mono uppercase text-white border flex justify-center rounded-md md:mt-4 bg-blue-500/10 hover:bg-blue-500/80 transition-color duration-300 tracking-widest text-sm cursor-pointer"
                >
                  Disconnect
                </button>
              </li>
            </div>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
