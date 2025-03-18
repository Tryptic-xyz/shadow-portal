import { useState, useRef } from "react";
import "./styles/dropdown.css";
import useClickOutside from "./hooks/useClickOutside"; 

const DestinationDropdown = ({ menuItems, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const itemsRef = useRef([]);

  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, () => setIsOpen(false), buttonRef);

  // Update selected item when an item is clicked
  const handleItemClick = (item) => {
    setSelectedItem(item); // Update selected item
    setIsOpen(false); // Close dropdown
    if (onSelect) {
      onSelect(item); 
    }
  };

  return (
    <div className="relative text-white" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg bg-gradient-to-b from-white/0 to-white/15 w-full cursor-pointer flex items-center justify-between py-5 px-3 border border-white/20 shadow-xl"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Destination Dropdown"
      >
        {selectedItem ? (
          <>
            <div className="flex items-center">
              <img
                src={`/icons/${selectedItem.icon}.svg`}
                alt={selectedItem.name}
                className="w-6 h-6 rounded-full border-white border mr-2"
              />
              <span>{selectedItem.name}</span>
            </div>
            <img
              src="/icons/chevron-down.svg"
              alt="chevron"
              className="w-4 h-4"
            />
          </>
        ) : (
          <>
            <span className="text-white/50">Select a destination chain</span>
            <img
              src="/icons/chevron-down.svg"
              alt="chevron"
              className="w-4 h-4"
            />
          </>
        )}
      </button>

      <div
        className={`dropdown-ctr z-50 w-full ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-90 pointer-events-none"
        }`}
        role="menu"
      >
        <ul className="py-2">
          <li className="menu-label py-4">Select a Destination Chain</li>
          {menuItems.map((item, index) =>
            item === "divider" ? (
              <hr key={index} className="border-blue-100/15" />
            ) : (
              <li
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                tabIndex="0"
                className={`menu-item flex items-center justify-between px-4 py-2 ${
                  selectedItem === item ? "bg-blue-500 text-white" : ""
                }`}
                role="menuitem"
                onClick={() => handleItemClick(item)} // Update selected item on click
              >
                <div className="flex items-center">
                  {item.icon && (
                    <img
                      src={`/icons/${item.icon}.svg`}
                      alt={item.name}
                      className="w-6 h-6 mr-2"
                    />
                  )}
                  {item.name}
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default DestinationDropdown;
