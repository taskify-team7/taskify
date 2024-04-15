import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { ReactNode } from "react";
import styles from "./Navbar.module.css";

export default function Navbar({ children }: { children: ReactNode }) {
  const { contextLogout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    contextLogout();
    navigate("/login");
  }
  return (
    <div className={styles.container}>
      <button onClick={handleLogout}>로그아웃버튼</button>
      {children}
    </div>
  );
}
