import { useCallback, useEffect, useRef, useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import "./dropdown-menu.scss";

export default function DropdownMenu({ buttonLabel, children }) {
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef();

  const hideDropdown = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    dropdown.addEventListener("mouseleave", hideDropdown);
    return () => {
      dropdown.removeEventListener("mouseleave", hideDropdown);
    };
  }, [hideDropdown]);

  return (
    <div className="dropdown-menu" ref={dropdownRef}>
      <button
        aria-label={buttonLabel}
        onClick={(e) => {
          e.preventDefault();
          setVisible(true);
        }}
      >
        <IoEllipsisHorizontal />
      </button>

      {visible && (
        <ol>
          {children.map((childElem, index) => (
            <li key={index}>{childElem}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
