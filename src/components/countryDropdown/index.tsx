import { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { languageOptions } from "../../constants/languageOptions";

interface ILanguageOption {
  value: string;
  flag: string;
}

function CountryDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("English");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          type="button"
          className="inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-[#FCFCFC] py-2 text-sm font-medium text-gray-700 hover:text-[#469BFF]"
          onClick={() => setIsDropdownOpen((prevState) => !prevState)}
        >
          {languageOptions.map(
            (option: ILanguageOption) =>
              selectedValue === option.value && (
                <img
                  key={option.value}
                  src={option.flag}
                  alt={option.value}
                  className="mr-2 h-6 w-6 rounded-full"
                />
              )
          )}
          {selectedValue}{" "}
          <MdOutlineKeyboardArrowDown
            className={`ml-2 transform fill-current text-gray-400 transition-transform duration-150 ease-in-out ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            size={22}
          />
        </button>

        {isDropdownOpen && (
          <div
            className="absolute w-48 origin-top-right rounded-md bg-white ring-1 ring-black ring-opacity-5"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
            }}
          >
            <div
              className="flex flex-col gap-[0.3rem] p-2 py-3"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-button"
            >
              {languageOptions.map((option) => (
                <div
                  key={option.value}
                  className={`flex cursor-pointer rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-[#F1FAFF] ${
                    selectedValue === option.value ? "text-red-500" : ""
                  }`}
                  role="menuitem"
                  onClick={() => handleOptionClick(option.value)}
                >
                  <img
                    src={option.flag}
                    alt={option.value}
                    className="h-5 w-5 rounded-md"
                  />
                  <p className="ml-2">{option.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {isDropdownOpen && (
        <div
          className="fixed inset-0"
          onClick={closeDropdown}
          style={{ zIndex: "-1" }}
        ></div>
      )}
    </>
  );
}

export default CountryDropdown;
