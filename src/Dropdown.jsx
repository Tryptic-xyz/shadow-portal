import { useState, useRef } from "react";
import "./styles/dropdown.css";
import useClickOutside from "./hooks/useClickOutside"; 

const Dropdown = ({ buttonName, menuItems, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const itemsRef = useRef([]);

  const handleSelect = (item) => {
    if (item !== "divider") {
      if (selectedItem?.name === item.name) {
        setSelectedItem(null);
        onSelect(null);
      } else {
        setSelectedItem(item);
        onSelect(item.name);
      }
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, () => setIsOpen(false), buttonRef);

  return (
    <div className="h-full w-full md:w-auto gradient-border" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn h-full w-full md:w-auto flex items-center gap-3 transition-all"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`${buttonName} Dropdown`}
      >
        <span>{selectedItem ? selectedItem.name : buttonName}</span>
        <img src="/icons/chevron-down.svg" alt="chevron" className="w-4 h-4" />
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
                onClick={() => handleSelect(item)}
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

export default Dropdown;
