import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import LoginPage from "@/pages/LoginPage";
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
      
      {
        element: <PublicLayout />,
        children: [
          {
            index: true, 
            element: <MainPage />,
          },
        ],
      },

      {
        path: "login",
        element: <LoginPage />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
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
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
