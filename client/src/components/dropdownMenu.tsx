import { useState } from "react";
import moonIcon from "../assets/moon.svg";
import questionIcon from "../assets/question.svg";
import gearIcon from "../assets/gear.svg";
import signOutIcon from "../assets/signOut.svg";
import defaultAvatar from "../assets/userzaglyshka.svg";
import ConfirmDialog from "./ConfirmDialog";

interface DropdownMenuProps {
  userName?: string;
  userAvatar?: string;
  onLogout: () => void;
  onSettingsClick: () => void;
  onHelpClick: () => void;
}

export default function DropdownMenu({
  userName = "Имя Фамилия",
  userAvatar = defaultAvatar,
  onLogout,
  onSettingsClick,
  onHelpClick,
}: DropdownMenuProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsConfirmOpen(true); // окно подтверждения
  };

  const handleConfirmLogout = () => {
    setIsConfirmOpen(false);
    onLogout(); // выход
  };

  return (
    <>
      <div className="bg-white px-2 py-3 text-black rounded-md select-none w-80 border border-[#D9D9D9] shadow-lg">
        <div className="flex gap-4 justify-center items-center">
          <img
            src={userAvatar}
            className="w-12 h-12 object-cover rounded-full"
            alt="profile"
          />
          <div className="flex-1">
            <h1 className="whitespace-nowrap font-medium">{userName}</h1>
          </div>
        </div>

        <hr className="my-2 border-[#D9D9D9]" />

        <ul className="flex flex-col gap-1">
          <li className="hover:bg-[#F5F5F5] flex flex-row items-center gap-4 p-3 rounded-md cursor-pointer h-12 transition-colors">
            <img
              src={moonIcon}
              className="w-5 h-5 flex-shrink-0"
              alt="Тёмная тема"
            />
            <span className="text-sm whitespace-nowrap">Тёмная тема</span>
          </li>

          <li
           onClick={onHelpClick}
          className="hover:bg-[#F5F5F5] flex flex-row items-center gap-4 p-3 rounded-md cursor-pointer h-12 transition-colors">
            <img
              src={questionIcon}
              className="w-5 h-5 flex-shrink-0"
              alt="Помощь"
            />
            <span className="text-sm whitespace-nowrap">Помощь</span>
          </li>

          <li
            onClick={onSettingsClick}
            className="hover:bg-[#F5F5F5] flex flex-row items-center gap-4 p-3 rounded-md cursor-pointer h-12
                        transition-colors"
          >
            <img
              src={gearIcon}
              className="w-5 h-5 flex-shrink-0"
              alt="Настройки"
            />
            <span className="text-sm whitespace-nowrap">Настройки</span>
          </li>

          <li
            onClick={handleLogoutClick}
            className="hover:bg-red-50 text-red-500 flex flex-row items-center gap-4 p-3 rounded-md cursor-pointer h-12 transition-colors"
          >
            <img
              src={signOutIcon}
              className="w-5 h-5 flex-shrink-0 brightness-0 invert saturate-100"
              alt="Выход"
            />
            <span className="text-sm whitespace-nowrap">Выход</span>
          </li>
        </ul>
      </div>

      {/* Окно подтверждения */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmLogout}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}
