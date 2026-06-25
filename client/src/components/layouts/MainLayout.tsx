import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";
import defaultAvatar from "../../assets/logo-light.png";

export default function MainLayout() {
  return (
    // 1. Заменили bg-[#f5f5f5] на bg-white (теперь всё поле белое)
    <div className="min-h-screen bg-white">
      <Sidebar />
      <Header avatar={defaultAvatar} />
      
      {/* 2. Заменили pt-[56px] на pt-[48px] под новую высоту хедера */}
      <main className="ml-[230px] pt-[48px] p-8">
        <div className="mx-auto max-w-[1920px] w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}