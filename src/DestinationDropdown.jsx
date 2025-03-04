import { useState, useRef, useEffect } from "react";
import "./dropdown.css";

const DestinationDropdown = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(menuItems[0] || null); // Set default to first item
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
    setSelectedItem(item); // Update selected item
    setIsOpen(false); // Close dropdown
  };

  return (
    <div className="relative " ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="destination-button rainbow-gradient-stroke cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Destination Dropdown"
      >
        {selectedItem ? (
          // If an item is selected, display the item's icon and name
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
          // In case no item is selected, show a placeholder
          <span>Select an option</span>
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
                  selectedItem === item ? "bg-blue-500 text-white" : ""
                }`}
                role="menuitem"
                onClick={() => handleItemClick(item)} // Update selected item on click
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

export default DestinationDropdown;
