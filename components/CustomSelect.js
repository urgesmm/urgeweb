import { useState, useEffect, useRef, useContext } from 'react';
import { MaskText } from './maskText/MaskText';
import { DropdownContext } from '../pages/contact';

export default function CustomSelect({ label, name, value, onChange, options, required }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { activeDropdown, setActiveDropdown } = useContext(DropdownContext);
  const dropdownRef = useRef(null);

  // Handle option selection
  const handleOptionSelect = (option) => {
    setDropdownOpen(false);
    setActiveDropdown(null);

    // Call the parent onChange with the new value
    onChange({
      target: {
        name: name,
        value: option.value
      }
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close this dropdown if another one is opened
  useEffect(() => {
    if (activeDropdown && activeDropdown !== name && dropdownOpen) {
      setDropdownOpen(false);
    }
  }, [activeDropdown, name, dropdownOpen]);

  // Update when options change (for conditional options like Immigration Type)
  useEffect(() => {
    // If the current value is not in the options anymore, reset it
    if (value && !options.some(option => option.value === value)) {
      onChange({
        target: {
          name: name,
          value: ""
        }
      });
    }
  }, [options, value, name, onChange]);

  // Find the selected option label
  const selectedOption = options.find(option => option.value === value);
  const selectedLabel = selectedOption ? selectedOption.label : 'Select';

  return (
    <div className="mb-4">
      <label><MaskText text={label} className="text-sec-clr uppercase font-lauanne text-1xl" /></label>
      <div className="relative dropdown-container" ref={dropdownRef}>
        <div
          className="flex items-center justify-between w-full px-4 py-2 rounded font-lauanne bg-[#1d1d1d] text-sec-clr cursor-pointer"
          onClick={() => {
            // If this dropdown is already open, close it
            if (dropdownOpen) {
              setDropdownOpen(false);
              setActiveDropdown(null);
            } else {
              // If another dropdown is open, close it first
              if (activeDropdown && activeDropdown !== name) {
                // This will trigger the useEffect in the other dropdown
                setActiveDropdown(name);
              }
              // Open this dropdown
              setDropdownOpen(true);
              setActiveDropdown(name);
            }
          }}
        >
          <div className="flex items-center">
            <span>{selectedLabel}</span>
          </div>
          <svg
            className={`w-4 h-4 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div
            className="absolute z-[100] w-full mt-1 bg-[#1d1d1d] border border-[#333] rounded-md shadow-lg max-h-60 overflow-y-auto"
            style={{
              scrollbarWidth: 'thin',
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain'
            }}
            onWheel={(e) => {
              e.stopPropagation();
              const scrollAmount = e.deltaY;
              e.currentTarget.scrollTop += scrollAmount;
            }}
          >
            {options.map((option, index) => (
              !option.disabled && (
                <div
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-[#2d2d2d] flex items-center"
                  onClick={() => handleOptionSelect(option)}
                >
                  <span className="text-sec-clr">{option.label}</span>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
