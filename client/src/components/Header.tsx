import { useState, KeyboardEvent, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bellIcon from "../assets/bell.svg";
import chevronDownIcon from "../assets/chevronDown.svg";
import DropdownMenu from "./dropdownMenu";
import SearchInput from "./button/SearchInput";
import { useAuth } from "../hooks/useAuth";
import api from "../api/instance"; // Импортируем наш API для живого поиска

interface HeaderProps {
  avatar?: string;
  isFullWidth?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  avatar,
  isFullWidth = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  
  // Новые стейты для живого поиска
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  
  // Реф для отслеживания клика вне области поиска (чтобы закрывать дропдаун)
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Обработчик клика вне поиска
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Живой поиск с задержкой (Debounce)
  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await api.get(`/course/catalog/search?q=${encodeURIComponent(searchValue.trim())}`);
        setSearchResults(res.data);
        setShowSearchDropdown(true);
      } catch (err) {
        console.error("Ошибка при поиске:", err);
      } finally {
        setIsSearching(false);
      }
    }, 300); // Задержка в 300мс перед запросом

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  // Переход по нажатию Enter (например, чтобы открыть результаты отдельной страницей)
  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      setShowSearchDropdown(false);
      navigate(`/catalog?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  // Переход напрямую на курс из выпадающего списка
  const handleResultClick = (courseId: string | number) => {
    setShowSearchDropdown(false);
    setSearchValue(""); // Очищаем поиск после перехода
    navigate(`/course/${courseId}`);
  };

  const displayName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "Пользователь";

  return (
    <header
      className={`fixed right-0 top-0 z-20 h-[56px] bg-orange-500 flex items-center px-6 transition-all ${isFullWidth ? "left-0" : "left-[230px]"}`}
    >
      
      {/* Контейнер поиска с relative для позиционирования дропдауна */}
      <div className="mx-auto w-full max-w-[520px] relative" ref={searchContainerRef}>
        <SearchInput 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          onFocus={() => {
            if (searchValue.trim() && searchResults.length > 0) {
              setShowSearchDropdown(true);
            }
          }}
        />

        {/* Выпадающее меню с результатами */}
        {showSearchDropdown && (
          <div className="absolute left-0 top-[calc(100%+8px)] w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
            {isSearching ? (
              <div className="p-4 text-center text-sm text-gray-500 font-medium">
                Поиск...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="max-h-[320px] overflow-y-auto">
                {searchResults.map((course) => (
                  <div 
                    key={course.id}
                    onClick={() => handleResultClick(course.id)}
                    className="p-3 border-b border-gray-50 hover:bg-orange-50 cursor-pointer transition-colors last:border-0"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{course.title}</h4>
                      {course.price === 0 && (
                        <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded ml-2 shrink-0">
                          Бесплатно
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {course.shortDescription || course.short_description || "Описание отсутствует"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-gray-500 font-medium">
                По вашему запросу ничего не найдено
              </div>
            )}
          </div>
        )}
      </div>

      {/* Правая часть хедера */}
      <div className="absolute right-6 flex items-center gap-2">
        {isAuthenticated && user && (
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
                  {user.avatar || avatar ? (
                    <img
                      src={user.avatar ?? avatar ?? ""}
                      className="h-8 w-8 rounded-full object-cover"
                      alt="avatar"
                    />
                  ) : (
                    <span className="text-sm font-bold text-orange-500">
                      {user.firstName?.charAt(0).toUpperCase() || "?"}
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
                  <DropdownMenu
                    userName={displayName || "Имя Фамилия"}
                    userAvatar={user.avatar || avatar}
                    onLogout={handleLogout}
                    onSettingsClick={() => { setIsMenuOpen(false); navigate("/settings"); }}
                    onHelpClick={() => { setIsMenuOpen(false); navigate("/help"); }}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {!isAuthenticated && (
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