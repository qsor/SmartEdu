import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import Catalog from "@/pages/Catalog";
import MainPage from "@/pages/MainPage";
import CourseDetails from "@/pages/CourseDetails";
import ProgressPage from "@/pages/ProgressPage";
import PublicLayout from "@/components/layouts/PublicLayout";
import MainLayout from "@/components/layouts/MainLayout";
import ProtectedRoute from "@/components/router/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 1. При заходе на корень сайта (localhost:5173/) сразу кидаем на дашборд
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },

      // 2. Публичные страницы (если нужен отдельный лендинг, можно оставить)
      {
        element: <PublicLayout />,
        children: [
          {
            path: "home",
            element: <MainPage />,
          },
        ],
      },

      {
        path: "login",
        element: <LoginPage />,
      },

      {
        path: "register",
        element: <RegisterPage />,
      },

      // 3. Защищенные страницы (здесь рендерится MainLayout с Сайдбаром и Хедером)
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="/dashboard" replace />,
              },
              // Добавили Дашборд внутрь MainLayout
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
      
      
      {
        path: "*",
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
]);