import { useState, useRef } from "react";
import "./styles/dropdown.css";
import useClickOutside from "./hooks/useClickOutside";

const Dropdown = ({
  buttonName,
  menuItems,
  onSelect = () => {},
  className = "",
}) => {
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
    <div className={`w-full gradient-border ${className}`} ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`dropdown-btn h-full w-full min-w-max justify-between flex items-center gap-3 transition-all ${
          selectedItem
            ? "bg-blue-500/50 hover:bg-blue-500/70 text-white"
            : "bg-white/10 hover:bg-white/20 text-white/50"
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`${buttonName} Dropdown`}
      >
        {selectedItem ? (
          <div className="flex items-center gap-1">
            {selectedItem.icon && (
              <img
                src={`/icons/${selectedItem.icon}.svg`}
                alt={selectedItem.name}
                className="w-7 h-7 mr-2 border border-white/50 rounded-full"
              />
            )}
            <span>{selectedItem.name}</span>
          </div>
        ) : (
          <span>{buttonName}</span>
        )}
        <img src="/icons/chevron-down.svg" alt="chevron" className="w-4 h-4" />
      </button>

      <div
        className={`dropdown-ctr z-50 
          ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        role="menu"
        style={{ minWidth: "max-content", width: "100%" }}
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
                {item.icon && (
                  <img
                    src={`/icons/${item.icon}.svg`}
                    alt={item.name}
                    className="w-6 h-6 mr-2"
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

export default Dropdown;
