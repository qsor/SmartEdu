import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";

// Публичные страницы
import MainPage from "@/pages/MainPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";

// Защищенные страницы
import Catalog from "@/pages/Catalog";
import ProgressPage from "@/pages/ProgressPage";
import CertificatesPage from "@/pages/CertificatesPage";
import CourseDetails from "@/pages/CourseDetails";
import CoursePassPage from "@/pages/CoursePassPage";
import SettingsPage from "@/pages/SettingsPage";
import HelpPage from "@/pages/HelpPage";

// Layouts
import MainLayout from "@/components/layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // При заходе на корень — сразу редирект на дашборд
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
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },

      // === БЕЗ ProtectedRoute — для тестов ===
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
            path: "certificates",
            element: <CertificatesPage />,
          },
          {
            path: "course/:id",
            element: <CourseDetails />,
          },
          {
            path: "course/:id/lesson/:lessonId",
            element: <CoursePassPage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
          {
            path: "help",
            element: <HelpPage />,
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
