import {
  Button,
  ButtonPrimary,
  InputText,
  AreaText,
} from "./components/Components.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";

export default function App() {
  return (
    <main className="min-h-screen bg-white">
      <Dashboard />
    </main>
  );
}
