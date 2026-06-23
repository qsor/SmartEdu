import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bellIcon from "../assets/bell.svg";
import chevronDownIcon from "../assets/chevronDown.svg";
import DropdownMenu from "./dropdownMenu";
import SearchInput from "./button/SearchInput";
import { useAuth } from "../hooks/useAuth";
import { mockCourses } from "../mocks/courses";
import api from "../api/instance";

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, isAuthenticated, isGuest, logout } = useAuth();
  const searchRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  //
  console.log("Header auth state:", { user, isAuthenticated, isGuest });

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleSettingsClick = () => {
    setIsMenuOpen(false);
    navigate("/settings");
  };

  const [searchResults, setSearchResults] = useState(mockCourses.slice(0, 0));

  useEffect(() => {
    const trimmedSearch = searchValue.trim().toLowerCase();

    if (!trimmedSearch) {
      setSearchResults([]);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const filteredCourses = mockCourses
        .filter((course) => {
          const searchText =
            `${course.title} ${course.description}`.toLowerCase();
          return searchText.includes(trimmedSearch);
        })
        .slice(0, 5);

      setSearchResults(filteredCourses);
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchValue]);

  // для поиска без моков
  // useEffect(() => {
  //   const trimmedSearch = searchValue.trim();
  //
  //   if (!trimmedSearch) {
  //     setSearchResults([]);
  //     return;
  //   }
  //
  //   const timeoutId = window.setTimeout(async () => {
  //     const { data } = await api.get("/course/catalog/search", {
  //       params: { q: trimmedSearch },
  //     });
  //
  //     const mappedCourses = data.slice(0, 5).map((course: any) => ({
  //       id: course.id,
  //       title: course.title,
  //       description: course.shortDescription,
  //       rating: course.rating * 5,
  //       price: 0,
  //     }));
  //
  //     setSearchResults(mappedCourses);
  //   }, 250);
  //
  //   return () => {
  //     window.clearTimeout(timeoutId);
  //   };
  // }, [searchValue]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setIsSearchOpen(value.trim().length > 0);
  };

  const handleCourseSelect = (courseId: number | string) => {
    setSearchValue("");
    setIsSearchOpen(false);
    navigate(`/course/${courseId}`);
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Escape") {
      setIsSearchOpen(false);
      return;
    }

    if (event.key === "Enter" && searchResults.length > 0) {
      event.preventDefault();
      handleCourseSelect(searchResults[0].id);
    }
  };

  // Формируем имя для DropdownMenu (Имя + Фамилия)
  const displayName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "Пользователь";

  return (
    <header
      className={`fixed right-0 top-0 z-20 h-[56px] bg-orange-500 flex items-center px-6 transition-all ${isFullWidth ? "left-0" : "left-[230px]"}`}
    >
      <div ref={searchRef} className="relative mx-auto w-full max-w-[520px]">
        <SearchInput
          value={searchValue}
          onFocus={() => setIsSearchOpen(searchValue.trim().length > 0)}
          onChange={(event) => handleSearchChange(event.target.value)}
          onKeyDown={handleSearchKeyDown}
        />

        {isSearchOpen && (
          <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            {searchResults.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">
                Ничего не найдено
              </div>
            ) : (
              <div className="max-h-[320px] overflow-y-auto">
                {searchResults.map((course) => (
                  <button
                    key={course.id}
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      handleCourseSelect(course.id);
                    }}
                    className="flex w-full items-start justify-between gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-orange-50"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-gray-900">
                          {course.title}
                        </p>
                        <span className="shrink-0 text-sm font-medium text-amber-600">
                          {course.rating.toFixed(1)}
                        </span>
                      </div>

                      <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                        {course.description}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          Перейти к курсу
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {course.price === 0
                            ? "Бесплатно"
                            : `${course.price.toLocaleString()} ₽`}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="absolute right-6 flex items-center gap-2">
        {/* Для авторизованных пользователей */}
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
                      {/* берем первую букву firstName */}
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
                    onSettingsClick={handleSettingsClick}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Для гостей */}
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
