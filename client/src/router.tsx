import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "@/pages/LoginPage";
import Catalog from "@/pages/Catalog";
import ProgressPage from "@/pages/ProgressPage";

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
        path: "/progress",
        element: <ProgressPage />,
      },
    ],
  },
]);
