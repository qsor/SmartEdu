import { useState } from "react";
import bellIcon from "../assets/bell.svg";
import chevronDownIcon from "../assets/chevronDown.svg";
import DropdownMenu from "./dropdownMenu";
import SearchInput from "./button/SearchInput";

interface HeaderProps {
  avatar?: string;
}

export const Header: React.FC<HeaderProps> = ({ avatar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed left-[230px] right-0 top-0 z-20 h-[56px] items-center bg-orange-500 flex items-center px-6">
      <div className="mx-auto w-full max-w-[520px]">
        <SearchInput />
      </div>

      <div className="absolute right-6 flex items-center gap-2">
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-md text-white"
        >
          <img
            src={bellIcon}
            alt=""
            className="h-6 w-6 brightness-0 invert"
            aria-hidden="true"
          />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-md px-2 py-1"
            aria-expanded={isMenuOpen}
          >
            <div className="h-5 w-5 rounded-full bg-white p-4 flex items-center justify-center object-cover">
              <img
                src={avatar ?? ""}
                className="h-5 w-5 rounded-full object-cover"
              />
            </div>

            <img
              src={chevronDownIcon}
              alt=""
              className={`h-4 w-4 brightness-0 invert transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2">
              <DropdownMenu />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// const SearchInput: React.FC = () => {
//   return (
//     <div className="flex h-10 items-center gap-3 rounded-md border border-zinc-200 px-3">
//       <svg
//         className="h-5 w-5 shrink-0 text-zinc-200"
//         viewBox="0 0 24 24"
//         fill="none"
//         aria-hidden="true"
//       >
//         <path
//           d="M10.75 18.5C15.0302 18.5 18.5 15.0302 18.5 10.75C18.5 6.46979 15.0302 3 10.75 3C6.46979 3 3 6.46979 3
//                           10.75C3 15.0302 6.46979 18.5 10.75 18.5Z"
//           stroke="currentColor"
//           strokeWidth="2"
//         />
//         <path
//           d="M16.5 16.5L21 21"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//       </svg>

//       <input
//         type="search"
//         placeholder="Найти"
//         className="h-full w-full bg-transparent text-sm outline-none placeholder:text-zinc-200"
//       />
//     </div>
//   );
// };

export default Header;
