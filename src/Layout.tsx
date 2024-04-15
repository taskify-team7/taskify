import { Outlet } from "react-router-dom";
import LoginRedirector from "./LoginRedirector";
import Sidebar from "./components/Sidebar/Sidebar";

export default function Layout() {
  return (
    <LoginRedirector>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </LoginRedirector>
  );
}
