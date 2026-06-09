import { Outlet } from "react-router-dom";
import { Header } from "../Header";
// import Footer from "../Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header isFullWidth={true} />
      <main className="pt-[56px] flex-grow">
        {/* MainPage */}
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
}