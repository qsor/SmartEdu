import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";
import defaultAvatar from "../../assets/userzaglyshka.svg";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Sidebar />
      <Header avatar={defaultAvatar} />
      <main className="ml-[230px] pt-[56px] p-8">
        <div className="mx-auto max-w-7xl">
          {/*Catalog, Dashboard и CourseDetails */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}