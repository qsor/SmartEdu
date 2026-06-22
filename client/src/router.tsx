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
<<<<<<< HEAD
import CoursePassPage from "@/pages/CoursePassPage";
import SettingsPage from "@/pages/SettingsPage";
import HelpPage from "@/pages/HelpPage";
=======
>>>>>>> ce7c709 (fix: добавил ProtectedRoute, чтобы ограничить доступ к курсу)

// Layouts
import MainLayout from "@/components/layouts/MainLayout";
import ProtectedRoute from "@/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
      {
        element: <ProtectedRoute />,
        children: [
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
            ],
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
<<<<<<< HEAD

=======
>>>>>>> ce7c709 (fix: добавил ProtectedRoute, чтобы ограничить доступ к курсу)
      {
        path: "*",
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
]);
