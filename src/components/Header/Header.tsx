import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { ReactNode } from "react";
import styles from "./Header.module.css";
import { DashBoardType } from "../../interface/DashboardType";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../../api/dashboard";

export default function Header({ children }: { children: ReactNode }) {
  const { contextLogout } = useAuth();
  const { id = null } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery<DashBoardType | null>({
    queryKey: ["dashboard", id],
    queryFn: id ? () => getDashboard(id) : () => null,
    enabled: id !== null,
    retry: false,
  });

  if (isLoading) {
    return <div></div>;
  }

  // if a wrong id is provided
  if (id && error) {
    console.log("wrong id provided");
    navigate("/dashboard");
  }

  function handleLogout() {
    contextLogout();
    navigate("/login");
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          {location.pathname === "/mypage"
            ? "계정관리"
            : id
            ? data?.title
            : "내 대시보드"}
        </div>
        <div className={styles.contents}>
          <button onClick={handleLogout}>로그아웃버튼</button>
          <button onClick={handleLogout}>로그아웃버튼</button>
          <button onClick={handleLogout}>로그아웃버튼</button>
        </div>
      </div>
      {children}
    </div>
  );
}
