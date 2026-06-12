import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import Catalog from "@/pages/Catalog";
import MainPage from "@/pages/MainPage";
import CourseDetails from "@/pages/CourseDetails";
import ProgressPage from "@/pages/ProgressPage";
import MainLayout from "@/components/layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 1. При заходе на корень сайта сразу кидаем на /dashboard
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },

      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },

      // 2. ВРЕМЕННО УБРАЛИ ProtectedRoute! 
      // Теперь MainLayout (и Сайдбар) откроется у любого гостя.
      {
        element: <MainLayout />,
        children: [
          {
            path: "dashboard",
            element: <MainPage />, 
          },
          {
            path: "catalog",
            element: <Catalog />,
          },
          {
            path: "progress",
            element: <ProgressPage />,
          },
          {
            path: "course/:id",
            element: <CourseDetails />,
          },
        ],
      },
    ],
  },
]);