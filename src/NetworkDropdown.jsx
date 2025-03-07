import { useState, useRef, useEffect } from "react";
import "./dropdown.css";

const NetworkDropdown = ({ menuItems, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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

  // Update selected item when an item is clicked
  const handleItemClick = (item) => {
    if (item.name === "All Networks") {
      setSelectedItem(null);
      onSelect(null);
    } else {
      setSelectedItem(item);
      onSelect(item.name);
    }
    setIsOpen(false);
  };

  return (
    <div className="h-full w-full gradient-border" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="primary-btn w-full h-full flex items-center gap-3 transition-all"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Network Dropdown"
      >
        {selectedItem ? (
          <>
            <img
              src={`/icons/${selectedItem.icon}.svg`}
              alt={selectedItem.name}
              className="w-6 h-6 rounded-full border-white border"
            />
            <span>{selectedItem.name}</span>
            <img
              src="/icons/chevron-down.svg"
              alt="chevron"
              className="w-4 h-4"
            />
          </>
        ) : (
          <>
            <span>All Networks</span>
            <img
              src="/icons/chevron-down.svg"
              alt="chevron"
              className="w-4 h-4"
            />
          </>
        )}
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
                className={`menu-item ${
                  selectedItem?.name === item.name
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                role="menuitem"
                onClick={() => handleItemClick(item)}
              >
                {item.icon && (
                  <img
                    src={`/icons/${item.icon}.svg`}
                    alt={item.name}
                    className="w-6 h-6"
                  />
                )}
                {item.name}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default NetworkDropdown;
