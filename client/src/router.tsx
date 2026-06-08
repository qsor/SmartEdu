import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";
import Catalog from "@/pages/Catalog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        index: true,
        element: <Catalog />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
