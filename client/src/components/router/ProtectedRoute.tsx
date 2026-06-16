import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export default function ProtectedRoute() {
  const { user, token } = useAppSelector((state) => state.auth);

  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
}