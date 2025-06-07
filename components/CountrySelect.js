import { useState, useEffect, useRef, useContext } from 'react';
import { MaskText } from './maskText/MaskText';
import { DropdownContext } from '../pages/contact';

// List of countries
const countries = [
  // North America
  "USA (United States of America)",
  "Canada",
  "Mexico",

  // Europe
  "UK (United Kingdom)",
  "Germany (Deutschland)",
  "France",
  "Italy (Italia)",
  "Spain (España)",
  "Netherlands (Nederland)",
  "Switzerland (Schweiz/Suisse)",
  "Sweden (Sverige)",
  "Norway (Norge)",
  "Denmark (Danmark)",
  "Finland (Suomi)",
  "Poland (Polska)",
  "Austria (Österreich)",
  "Belgium (België/Belgique)",
  "Portugal",
  "Ireland (Éire)",
  "Greece (Ελλάδα)",
  "Czech Republic (Česká republika)",
  "Hungary (Magyarország)",

  // Asia
  "India (भारत)",
  "Pakistan (پاکستان)",
  "China (中国)",
  "Japan (日本)",
  "South Korea (대한민국)",
  "Singapore (新加坡)",
  "Thailand (ประเทศไทย)",
  "Malaysia (مليسيا)",
  "Vietnam (Việt Nam)",
  "Indonesia",
  "Philippines (Pilipinas)",
  "Bangladesh (বাংলাদেশ)",
  "Sri Lanka (ශ්‍රී ලංකාව)",
  "Myanmar (မြန်မာ)",
  "Nepal (नेपाल)",
  "Afghanistan (افغانستان)",

  // Middle East
  "UAE (United Arab Emirates / الإمارات)",
  "Saudi Arabia (المملكة العربية السعودية)",
  "Qatar (قطر)",
  "Bahrain (البحرين)",
  "Kuwait (الكويت)",
  "Oman (عمان)",
  "Jordan (الأردن)",
  "Lebanon (لبنان)",
  "Israel (ישראל)",
  "Iraq (العراق)",

  // Oceania
  "Australia",
  "New Zealand (Aotearoa)",
  "Papua New Guinea",
  "Fiji",

  // Africa
  "South Africa",
  "Egypt (مصر)",
  "Nigeria",
  "Kenya",
  "Morocco (المغرب)",
  "Tunisia (تونس)",
  "Ghana",
  "Ethiopia (ኢትዮጵያ)",
  "Tanzania",
  "Uganda",
  "Zambia",
  "Zimbabwe",

  // South America
  "Brazil (Brasil)",
  "Argentina",
  "Chile",
  "Colombia",
  "Peru (Perú)",
  "Venezuela",
  "Ecuador",
  "Bolivia",
  "Paraguay",
  "Uruguay",
];

// We no longer need continent groups since we only show search results

export default function CountrySelect({ label, name, value, onChange }) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchInputRef = useRef(null);
  const { activeDropdown, setActiveDropdown } = useContext(DropdownContext);

  // Filter countries based on search term
  const filteredCountries = searchTerm
    ? countries.filter(country =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : countries;

  // Handle country selection
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
    setActiveDropdown(null);
    setSearchTerm('');

    // Call the parent onChange with the new value
    onChange({
      target: {
        name: name,
        value: country
      }
    });
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle wheel events globally when dropdown is open
  useEffect(() => {
    const preventScrollPropagation = (e) => {
      // Find if the event target is within our dropdown
      const isWithinDropdown = e.target.closest('.country-dropdown-container');

      if (dropdownOpen && isWithinDropdown) {
        // Prevent the event from propagating and default behavior
        e.stopPropagation();
        e.preventDefault();
      }
    };

    // Add event listener to the document
    document.addEventListener('wheel', preventScrollPropagation, { passive: false });

    return () => {
      // Clean up
      document.removeEventListener('wheel', preventScrollPropagation);
    };
  }, [dropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.country-dropdown-container')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Focus search input when dropdown is opened
  useEffect(() => {
    if (dropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [dropdownOpen]);

  // Initialize from parent value if provided
  useEffect(() => {
    if (value) {
      setSelectedCountry(value);
    }
  }, [value]);

  // Close this dropdown if another one is opened
  useEffect(() => {
    if (activeDropdown && activeDropdown !== name && dropdownOpen) {
      setDropdownOpen(false);
      setSearchTerm('');
    }
  }, [activeDropdown, name, dropdownOpen]);

  return (
    <div className="mb-4">
      <label><MaskText text={label} className="text-sec-clr uppercase font-lauanne text-1xl" /></label>
      <div className="relative country-dropdown-container">
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
            <span>{selectedCountry || 'Select Country'}</span>
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
          <div className="absolute z-10 w-full mt-1 bg-[#1d1d1d] border border-[#333] rounded-md shadow-lg" style={{ overscrollBehavior: 'contain' }}>
            {/* Search input */}
            <div className="sticky top-0 bg-[#1d1d1d] p-2 border-b border-[#333]">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search country..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-3 py-1 text-sm rounded font-lauanne bg-[#2d2d2d] text-sec-clr focus:outline-none"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Country list - only show when searching */}
            {searchTerm && (
              <div
                className="max-h-60 overflow-y-auto overflow-x-hidden"
                style={{
                  scrollbarWidth: 'thin',
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain'
                }}
                onWheel={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  const scrollAmount = e.deltaY;
                  e.currentTarget.scrollTop += scrollAmount;
                }}>
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-[#2d2d2d] flex items-center"
                      onClick={() => handleCountrySelect(country)}
                    >
                      <span className="text-sec-clr">{country}</span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sec-clr">No countries found</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
