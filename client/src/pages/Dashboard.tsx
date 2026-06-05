import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export function Dashboard() {
  return (
    <div className="h-screen overflow-hidden">
      <Sidebar />

      <div className="ml-[230px] flex h-screen flex-col">
        <Header />
        <main></main>
      </div>
    </div>
  );
}
