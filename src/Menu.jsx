import { useState, useRef, useEffect } from "react";
import "./dropdown.css";

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
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const itemsRef = useRef([]);

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

  return (
    <div className="h-full gradient-border cursor-pointer" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 rounded-lg bg-blue-100/10  h-full flex items-center gap-3 cursor-pointer transition-all ${
          isOpen
            ? "hover:bg-blue-100 bg-blue-100/90  border-blue border-1 "
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
          className={` transition-all ease-out-expo  duration-700 transform ${
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
              opacity: isOpen ? "0" : "1", // Hide line1 when open
              transition: "opacity 0.3s ease",
            }}
          />
          <path
            className="line line2"
            d="M3 6h18"
            style={{
              opacity: isOpen ? "0" : "1", // Hide line2 when open
              transition: "opacity 0.3s ease",
            }}
          />
          <path
            className="line line3"
            d="M3 18h18"
            style={{
              opacity: isOpen ? "0" : "1", // Hide line3 when open
              transition: "opacity 0.3s ease",
            }}
          />
          {isOpen && (
            <path
              className="line line4 stroke-blue-500"
              d="M6 18L18 6M6 6l12 12"
              style={{
                opacity: isOpen ? "1" : "0", // Show cross lines when open
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
                  item.action();
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
        </ul>
      </div>
    </div>
  );
};

export default Menu;
