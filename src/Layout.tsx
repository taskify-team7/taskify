import { Outlet } from "react-router-dom";
import LoginRedirector from "./LoginRedirector";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

export default function Layout() {
  return (
    <LoginRedirector>
      <Navbar />
      <Sidebar />
      <Outlet />
    </LoginRedirector>
  );
}
