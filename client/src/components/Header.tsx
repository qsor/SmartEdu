import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bellIcon from "../assets/bell.svg";
import chevronDownIcon from "../assets/chevronDown.svg";
import DropdownMenu from "./dropdownMenu";
import SearchInput from "./button/SearchInput";
import { useAuth } from "../hooks/useAuth";

interface HeaderProps {
  avatar?: string;
  isFullWidth?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  avatar,
  isFullWidth = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, isGuest, logout } = useAuth();
  const navigate = useNavigate();

<<<<<<< Updated upstream
=======
  //
  console.log("Header auth state:", { user, isAuthenticated, isGuest });

>>>>>>> Stashed changes
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

<<<<<<< Updated upstream
=======
  const handleSettingsClick = () => {
    setIsMenuOpen(false);
    navigate("/settings");
  };

  // Формируем имя для DropdownMenu (Имя + Фамилия)
  const displayName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "Пользователь";

>>>>>>> Stashed changes
  return (
    <header
      className={`fixed right-0 top-0 z-20 h-[56px] bg-orange-500 flex items-center px-6 transition-all ${isFullWidth ? "left-0" : "left-[230px]"}`}
    >
      <div className="mx-auto w-full max-w-[520px]">
        <SearchInput />
      </div>

      <div className="absolute right-6 flex items-center gap-2">
        {/* Для авторизованных пользователей */}
        {isAuthenticated && (
          <>
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
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  {user?.avatar || avatar ? (
                    <img
                      src={user?.avatar ?? avatar ?? ""}
                      className="h-8 w-8 rounded-full object-cover"
                      alt="avatar"
                    />
                  ) : (
                    <span className="text-sm font-bold text-orange-500">
                      {user?.name?.charAt(0).toUpperCase() || "?"}
                    </span>
                  )}
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
<<<<<<< Updated upstream
                  <DropdownMenu 
                    userName={user?.name || "Имя Фамилия"}
                    userAvatar={user?.avatar || avatar}
=======
                  <DropdownMenu
                    userName={displayName || "Имя Фамилия"}
                    userAvatar={user.avatar || avatar}
>>>>>>> Stashed changes
                    onLogout={handleLogout}
                    onSettingsClick={handleSettingsClick}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Для гостей */}
        {isGuest && (
          <button
            onClick={handleLoginClick}
            className="px-4 py-2 bg-white text-orange-500 rounded-md hover:bg-orange-50 transition-colors font-medium text-sm"
          >
            Войти
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
