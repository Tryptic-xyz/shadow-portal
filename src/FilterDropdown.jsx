import { useState, useRef } from "react";
import useClickOutside from "./hooks/useClickOutside"; 

const FilterDropdown = ({
  networkItems,
  collectionItems,
  onNetworkSelect,
  onCollectionSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false), buttonRef); 

  return (
    <div className="h-full w-full md:w-auto gradient-border" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full md:w-auto h-full flex items-center gap-3 transition-all"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Filter Dropdown"
      >
        <span>Filter By</span>
        <img src="/icons/chevron-down.svg" alt="chevron" className="w-4 h-4" />
      </button>

      <div
        className={`dropdown-ctr z-50 ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-90 pointer-events-none"
        }`}
        role="menu"
        style={{ width: "max-content" }}
      >
        <ul className="py-2">
          <li className="menu-label">Networks</li>
          {networkItems.map((item, index) =>
            item === "divider" ? (
              <hr key={index} className="border-blue-100/15" />
            ) : (
              <li
                key={index}
                tabIndex="0"
                className="menu-item"
                role="menuitem"
                onClick={() => {
                  onNetworkSelect(item.name);
                  setIsOpen(false);
                }}
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
          <li className="menu-label">Collections</li>
          {collectionItems.map((item, index) =>
            item === "divider" ? (
              <hr key={index} className="border-blue-100/15" />
            ) : (
              <li
                key={index}
                tabIndex="0"
                className="menu-item"
                role="menuitem"
                onClick={() => {
                  onCollectionSelect(item.name);
                  setIsOpen(false);
                }}
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

export default FilterDropdown;
