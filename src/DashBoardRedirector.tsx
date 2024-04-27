import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";
import RouteChangeTracker from "./RouteChangeTracker";

export default function DashBoardRedirector() {
  const { getUser } = useAuth();
  if (getUser()) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <RouteChangeTracker />
      <Outlet />
    </>
  );
}
