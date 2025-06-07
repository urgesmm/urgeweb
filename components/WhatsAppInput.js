import { useState, useEffect, useRef, useContext } from 'react';
import { MaskText } from './maskText/MaskText';
import { DropdownContext } from '../pages/contact';

// Country codes with their respective formats - same as PhoneInput
// FORMAT GUIDE:
// - 'code': Country calling code with + sign (e.g., '+91')
// - 'country': Country name displayed in dropdown
// - 'format': Format pattern where 'X' represents a digit
//   Example: '(XXX) XXX-XXXX' will format as '(123) 456-7890'
//   Spaces, dashes, brackets will appear in the formatted number
// - 'placeholder': Example shown to user when input is empty
// - 'maxLength': Maximum total length including spaces and special characters
//
// TO CHANGE FORMAT FOR A COUNTRY:
// 1. Find the country in the list below
// 2. Change the 'format' value to your desired pattern (use 'X' for each digit)
// 3. Update 'placeholder' to match your new format
// 4. Adjust 'maxLength' to match the total length of your format
const countryCodes = [
  // North America
  { code: '+1', country: 'USA (United States of America)', format: '(XXX) XXX-XXXX', placeholder: '(123) 456-7890', maxLength: 14 },
  { code: '+1', country: 'Canada', format: '(XXX) XXX-XXXX', placeholder: '(123) 456-7890', maxLength: 14 },
  { code: '+52', country: 'Mexico', format: '(XX) XXXX XXXX', placeholder: '(55) 1234 5678', maxLength: 15 },

  // Europe
  { code: '+44', country: 'UK (United Kingdom)', format: 'XXXX XXXXXX', placeholder: '7911 123456', maxLength: 13 },
  { code: '+49', country: 'Germany (Deutschland)', format: 'XXX XXXXXXX', placeholder: '170 1234567', maxLength: 14 },
  { code: '+33', country: 'France', format: 'X XX XX XX XX', placeholder: '6 12 34 56 78', maxLength: 14 },
  { code: '+39', country: 'Italy (Italia)', format: 'XXX XXX XXXX', placeholder: '312 345 6789', maxLength: 13 },
  { code: '+34', country: 'Spain (España)', format: 'XXX XXX XXX', placeholder: '612 345 678', maxLength: 12 },
  { code: '+31', country: 'Netherlands (Nederland)', format: 'X XX XX XX XX', placeholder: '6 12 34 56 78', maxLength: 14 },
  { code: '+41', country: 'Switzerland (Schweiz/Suisse)', format: 'XX XXX XX XX', placeholder: '78 123 45 67', maxLength: 13 },
  { code: '+46', country: 'Sweden (Sverige)', format: 'XX XXX XX XX', placeholder: '70 123 45 67', maxLength: 13 },
  { code: '+47', country: 'Norway (Norge)', format: 'XXX XX XXX', placeholder: '406 12 345', maxLength: 11 },
  { code: '+45', country: 'Denmark (Danmark)', format: 'XX XX XX XX', placeholder: '20 12 34 56', maxLength: 11 },
  { code: '+358', country: 'Finland (Suomi)', format: 'XX XXX XXXX', placeholder: '40 123 4567', maxLength: 13 },
  { code: '+48', country: 'Poland (Polska)', format: 'XXX XXX XXX', placeholder: '512 345 678', maxLength: 12 },
  { code: '+43', country: 'Austria (Österreich)', format: 'XXX XXXXXX', placeholder: '664 123456', maxLength: 13 },
  { code: '+32', country: 'Belgium (België/Belgique)', format: 'XXX XX XX XX', placeholder: '470 12 34 56', maxLength: 13 },
  { code: '+351', country: 'Portugal', format: 'XXX XXX XXX', placeholder: '912 345 678', maxLength: 13 },
  { code: '+353', country: 'Ireland (Éire)', format: 'XX XXX XXXX', placeholder: '85 123 4567', maxLength: 13 },
  { code: '+30', country: 'Greece (Ελλάδα)', format: 'XXX XXX XXXX', placeholder: '697 123 4567', maxLength: 14 },
  { code: '+420', country: 'Czech Republic (Česká republika)', format: 'XXX XXX XXX', placeholder: '601 123 456', maxLength: 13 },
  { code: '+36', country: 'Hungary (Magyarország)', format: 'XX XXX XXXX', placeholder: '20 123 4567', maxLength: 13 },

  // Asia
  { code: '+91', country: 'India (भारत)', format: 'XXXXX XXXXX', placeholder: '98765 43210', maxLength: 12 },
  { code: '+92', country: 'Pakistan (پاکستان)', format: 'XXX XXXXXXX', placeholder: '300 1234567', maxLength: 13 },
  { code: '+86', country: 'China (中国)', format: 'XXX XXXX XXXX', placeholder: '139 1234 5678', maxLength: 14 },
  { code: '+81', country: 'Japan (日本)', format: 'XX XXXX XXXX', placeholder: '90 1234 5678', maxLength: 13 },
  { code: '+82', country: 'South Korea (대한민국)', format: 'XX XXXX XXXX', placeholder: '10 1234 5678', maxLength: 13 },
  { code: '+65', country: 'Singapore (新加坡)', format: 'XXXX XXXX', placeholder: '9123 4567', maxLength: 10 },
  { code: '+66', country: 'Thailand (ประเทศไทย)', format: 'X XXXX XXXX', placeholder: '8 1234 5678', maxLength: 12 },
  { code: '+60', country: 'Malaysia (مليسيا)', format: 'XX XXXX XXXX', placeholder: '12 3456 7890', maxLength: 13 },
  { code: '+84', country: 'Vietnam (Việt Nam)', format: 'XXX XXX XXX', placeholder: '912 345 678', maxLength: 12 },
  { code: '+62', country: 'Indonesia', format: 'XXX XXX XXXX', placeholder: '812 345 6789', maxLength: 14 },
  { code: '+63', country: 'Philippines (Pilipinas)', format: 'XXX XXX XXXX', placeholder: '917 123 4567', maxLength: 14 },
  { code: '+880', country: 'Bangladesh (বাংলাদেশ)', format: 'XXXX XXXXXX', placeholder: '1711 123456', maxLength: 14 },
  { code: '+94', country: 'Sri Lanka (ශ්‍රී ලංකාව)', format: 'XX XXX XXXX', placeholder: '71 234 5678', maxLength: 13 },
  { code: '+95', country: 'Myanmar (မြန်မာ)', format: 'X XXX XXXX', placeholder: '9 123 4567', maxLength: 11 },
  { code: '+977', country: 'Nepal (नेपाल)', format: 'XXX XXXXXXX', placeholder: '984 1234567', maxLength: 14 },
  { code: '+93', country: 'Afghanistan (افغانستان)', format: 'XX XXX XXXX', placeholder: '70 123 4567', maxLength: 13 },

  // Middle East
  { code: '+971', country: 'UAE (United Arab Emirates / الإمارات)', format: 'XX XXX XXXX', placeholder: '50 123 4567', maxLength: 12 },
  { code: '+966', country: 'Saudi Arabia (المملكة العربية السعودية)', format: 'XX XXX XXXX', placeholder: '50 123 4567', maxLength: 13 },
  { code: '+974', country: 'Qatar (قطر)', format: 'XXXX XXXX', placeholder: '3312 3456', maxLength: 10 },
  { code: '+973', country: 'Bahrain (البحرين)', format: 'XXXX XXXX', placeholder: '3312 3456', maxLength: 10 },
  { code: '+965', country: 'Kuwait (الكويت)', format: 'XXXX XXXX', placeholder: '5123 4567', maxLength: 10 },
  { code: '+968', country: 'Oman (عمان)', format: 'XXXX XXXX', placeholder: '9123 4567', maxLength: 10 },
  { code: '+962', country: 'Jordan (الأردن)', format: 'X XXXX XXXX', placeholder: '7 9012 3456', maxLength: 12 },
  { code: '+961', country: 'Lebanon (لبنان)', format: 'XX XXX XXX', placeholder: '71 123 456', maxLength: 11 },
  { code: '+972', country: 'Israel (ישראל)', format: 'XX XXX XXXX', placeholder: '50 123 4567', maxLength: 13 },
  { code: '+964', country: 'Iraq (العراق)', format: 'XXX XXX XXXX', placeholder: '750 123 4567', maxLength: 14 },

  // Oceania
  { code: '+61', country: 'Australia', format: 'XXX XXX XXX', placeholder: '412 345 678', maxLength: 12 },
  { code: '+64', country: 'New Zealand (Aotearoa)', format: 'XX XXX XXXX', placeholder: '21 123 4567', maxLength: 12 },
  { code: '+675', country: 'Papua New Guinea', format: 'XXX XXXX', placeholder: '684 5678', maxLength: 9 },
  { code: '+679', country: 'Fiji', format: 'XXX XXXX', placeholder: '701 2345', maxLength: 9 },

  // Africa
  { code: '+27', country: 'South Africa', format: 'XX XXX XXXX', placeholder: '71 234 5678', maxLength: 13 },
  { code: '+20', country: 'Egypt (مصر)', format: 'XX XXXX XXXX', placeholder: '10 1234 5678', maxLength: 14 },
  { code: '+234', country: 'Nigeria', format: 'XX XXXX XXXX', placeholder: '80 1234 5678', maxLength: 14 },
  { code: '+254', country: 'Kenya', format: 'XXX XXX XXX', placeholder: '712 345 678', maxLength: 13 },
  { code: '+212', country: 'Morocco (المغرب)', format: 'XX XXX XXXX', placeholder: '61 234 5678', maxLength: 13 },
  { code: '+216', country: 'Tunisia (تونس)', format: 'XX XXX XXX', placeholder: '20 123 456', maxLength: 11 },
  { code: '+233', country: 'Ghana', format: 'XX XXX XXXX', placeholder: '24 123 4567', maxLength: 13 },
  { code: '+251', country: 'Ethiopia (ኢትዮጵያ)', format: 'XX XXX XXXX', placeholder: '91 123 4567', maxLength: 13 },
  { code: '+255', country: 'Tanzania', format: 'XXX XXX XXX', placeholder: '712 345 678', maxLength: 13 },
  { code: '+256', country: 'Uganda', format: 'XXX XXX XXX', placeholder: '712 345 678', maxLength: 13 },
  { code: '+260', country: 'Zambia', format: 'XX XXX XXXX', placeholder: '95 123 4567', maxLength: 13 },
  { code: '+263', country: 'Zimbabwe', format: 'XX XXX XXXX', placeholder: '71 234 5678', maxLength: 13 },

  // South America
  { code: '+55', country: 'Brazil (Brasil)', format: 'XX XXXXX XXXX', placeholder: '11 98765 4321', maxLength: 15 },
  { code: '+54', country: 'Argentina', format: 'XX XXXX XXXX', placeholder: '11 1234 5678', maxLength: 14 },
  { code: '+56', country: 'Chile', format: 'X XXXX XXXX', placeholder: '9 1234 5678', maxLength: 12 },
  { code: '+57', country: 'Colombia', format: 'XXX XXX XXXX', placeholder: '300 123 4567', maxLength: 14 },
  { code: '+51', country: 'Peru (Perú)', format: 'XXX XXX XXX', placeholder: '912 345 678', maxLength: 12 },
  { code: '+58', country: 'Venezuela', format: 'XXX XXX XXXX', placeholder: '412 123 4567', maxLength: 14 },
  { code: '+593', country: 'Ecuador', format: 'XX XXX XXXX', placeholder: '99 123 4567', maxLength: 13 },
  { code: '+591', country: 'Bolivia', format: 'X XXX XXXX', placeholder: '7 123 4567', maxLength: 11 },
  { code: '+595', country: 'Paraguay', format: 'XXX XXX XXX', placeholder: '981 123 456', maxLength: 13 },
  { code: '+598', country: 'Uruguay', format: 'X XXX XXXX', placeholder: '9 123 4567', maxLength: 11 },
];

export default function WhatsAppInput({ value, onChange, required }) {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchInputRef = useRef(null);
  const { activeDropdown, setActiveDropdown } = useContext(DropdownContext);

  // Filter countries based on search term
  const filteredCountries = searchTerm
    ? countryCodes.filter(country =>
        country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.includes(searchTerm)
      )
    : countryCodes;

  // Format the phone number based on the selected country format
  // HOW THIS FUNCTION WORKS:
  // 1. It takes a number (digits only) and a format pattern (like "(XXX) XXX-XXXX")
  // 2. It replaces each 'X' in the format with a digit from the number
  // 3. It keeps spaces, dashes, brackets, etc. from the format pattern
  // 4. If there are more digits than 'X's in the format, it adds them at the end
  //
  // EXAMPLE:
  // - number = "1234567890"
  // - format = "(XXX) XXX-XXXX"
  // - result = "(123) 456-7890"
  //
  // TO MODIFY THIS FUNCTION:
  // - If you want to change how formatting works for all countries,
  //   edit the logic below
  // - For country-specific formats, change the 'format' in the countryCodes array above
  const formatPhoneNumber = (number, format) => {
    let formattedNumber = '';
    let numberIndex = 0;

    // If no number, return empty string
    if (!number || number.length === 0) {
      return '';
    }

    for (let i = 0; i < format.length && numberIndex < number.length; i++) {
      if (format[i] === 'X') {
        formattedNumber += number[numberIndex] || '';
        numberIndex++;
      } else {
        formattedNumber += format[i];
      }
    }

    // Add any remaining digits
    if (numberIndex < number.length) {
      formattedNumber += number.substring(numberIndex);
    }

    return formattedNumber;
  };

  // Handle country code selection
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setPhoneNumber(''); // Reset phone number when country changes
    setDropdownOpen(false);
    setActiveDropdown(null);
    setSearchTerm('');

    // Call the parent onChange with the new value
    onChange({
      target: {
        name: 'whatsapp',
        value: country.code + ' '
      }
    });
  };

  // Handle phone number input
  // HOW THIS FUNCTION WORKS:
  // 1. It strips all non-numeric characters from the input
  // 2. It limits the number of digits based on the country format
  // 3. It formats the number according to the country format
  // 4. It updates the state and calls the parent onChange function
  //
  // TO MODIFY THIS FUNCTION:
  // - If you want to change how many digits are allowed, modify the maxDigits calculation
  // - If you want to change how the number is formatted, modify the formatPhoneNumber function
  // - If you want to change how the country code is combined with the number,
  //   modify the value in the onChange call
  const handlePhoneNumberChange = (e) => {
    // Remove all non-numeric characters
    const numericValue = e.target.value.replace(/\D/g, '');

    // Limit the length based on the selected country's format
    // This counts how many 'X' characters are in the format pattern
    const maxDigits = selectedCountry.format.split('').filter(char => char === 'X').length;

    if (numericValue.length <= maxDigits) {
      // Format the phone number
      const formatted = formatPhoneNumber(numericValue, selectedCountry.format);
      setPhoneNumber(formatted);

      // Call the parent onChange with the new value
      // This combines the country code with the formatted number
      onChange({
        target: {
          name: 'whatsapp',
          value: selectedCountry.code + ' ' + formatted
        }
      });
    }
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
    if (value && value.startsWith('+')) {
      // Extract country code and phone number from the value
      const parts = value.split(' ');
      const countryCode = parts[0];
      const phoneNumberPart = parts.slice(1).join(' ');

      // Find the matching country
      const matchedCountry = countryCodes.find(country => country.code === countryCode);

      if (matchedCountry) {
        setSelectedCountry(matchedCountry);
        setPhoneNumber(phoneNumberPart);
      }
    }
  }, [value]);

  // Close this dropdown if another one is opened
  useEffect(() => {
    if (activeDropdown && activeDropdown !== 'whatsapp' && dropdownOpen) {
      setDropdownOpen(false);
      setSearchTerm('');
    }
  }, [activeDropdown, dropdownOpen]);

  // Group countries by continent for better organization
  const continents = [
    "North America",
    "Europe",
    "Asia",
    "Middle East",
    "Oceania",
    "Africa",
    "South America"
  ];

  const getCountriesByContinent = (continent) => {
    const startIndex = countryCodes.findIndex(country => {
      const commentLine = countryCodes[countryCodes.indexOf(country) - 1];
      return commentLine && commentLine.toString().includes(continent);
    });

    if (startIndex === -1) return [];

    const nextContinentIndex = countryCodes.findIndex((_, index) => {
      if (index <= startIndex) return false;
      const commentLine = countryCodes[index - 1];
      return commentLine && continents.some(c => c !== continent && commentLine.toString().includes(c));
    });

    const endIndex = nextContinentIndex === -1 ? countryCodes.length : nextContinentIndex - 1;

    return countryCodes.slice(startIndex, endIndex);
  };

  return (
    <div>
      <label><MaskText text="WHATSAPP NUMBER*" className="text-sec-clr font-lauanne text-1xl" /></label>
      <div className="flex flex-col md:flex-row gap-2 mb-2">
        {/* Country code selector with dropdown */}
        <div className="relative w-full md:w-1/3 country-dropdown-container">
          <div
            className="flex items-center justify-between w-full px-4 py-2 rounded font-lauanne bg-[#1d1d1d] text-sec-clr cursor-pointer"
            onClick={() => {
              // If this dropdown is already open, close it
              if (dropdownOpen) {
                setDropdownOpen(false);
                setActiveDropdown(null);
              } else {
                // If another dropdown is open, close it first
                if (activeDropdown && activeDropdown !== 'whatsapp') {
                  // This will trigger the useEffect in the other dropdown
                  setActiveDropdown('whatsapp');
                }
                // Open this dropdown
                setDropdownOpen(true);
                setActiveDropdown('whatsapp');
              }
            }}
          >
            <div className="flex items-center">
              <span className="mr-2 font-bold">{selectedCountry.code}</span>
              <span>{selectedCountry.country}</span>
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
                  placeholder="Search country or code..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-3 py-1 text-sm rounded font-lauanne bg-[#2d2d2d] text-sec-clr focus:outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Country list - only show when searching */}
              {searchTerm && (
                <div
                  className="max-h-60 overflow-y-auto overflow-x-hidden overscroll-contain"
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
                  }}
                >
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-[#2d2d2d] flex items-center"
                        onClick={() => handleCountrySelect(country)}
                      >
                        <span className="w-16 text-sec-clr font-bold">{country.code}</span>
                        <span className="text-sec-clr">{country.country}</span>
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

        {/* Phone number input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder={selectedCountry.placeholder}
          required={required}
          className="w-full md:w-2/3 px-4 py-2 rounded font-lauanne bg-[#1d1d1d] text-sec-clr focus:outline-none focus:ring-2 focus:ring-transparent"
        />
      </div>

      {/* Format hint */}
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 rounded-full bg-[#3f3f3f] mr-2"></div>
        <p className="text-xs text-sec-clr font-lauanne">
          Format: {selectedCountry.code} {selectedCountry.format.replace(/X/g, '0')}
        </p>
      </div>
    </div>
  );
}
