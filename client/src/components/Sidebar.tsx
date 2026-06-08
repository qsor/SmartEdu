import { NavLink } from "react-router-dom";
import chartIcon from "../assets/chart.svg";
import documentIcon from "../assets/document.svg";
import folderIcon from "../assets/folder.svg";
import homeIcon from "../assets/home.svg";
import logo from "../../public/logo.png";

const navItems = [
  { to: "/dashboard", label: "Дашборд", icon: homeIcon },
  { to: "/progress", label: "Прогресс", icon: chartIcon },
  { to: "/certificates", label: "Сертификаты", icon: documentIcon },
  { to: "/catalog", label: "Все курсы", icon: folderIcon },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-[230px] bg-white">
      <div className="flex h-[56px] items-center gap-4 px-5 bg-orange-500">
        <img src={logo} alt="" className="h-5 w-5" aria-hidden="true" />
        <span className="font-semibold text-white">EduSphere</span>
      </div>

      <nav className="pt-2 h-full space-y-2 px-2 border-r border-black/10">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-orange-400 text-white"
                  : "text-zinc-700 hover:bg-zinc-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={item.icon}
                  alt=""
                  className={`h-5 w-5 shrink-0 transition-[filter] ${
                    isActive ? "brightness-0 invert" : ""
                  }`}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
