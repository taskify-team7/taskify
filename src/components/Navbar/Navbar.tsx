import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { ReactNode, useEffect } from "react";
import styles from "./Navbar.module.css";
import { DashBoardType } from "../../interface/DashboardType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDashboard } from "../../api/dashboard";

export default function Navbar({ children }: { children: ReactNode }) {
  const { contextLogout } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery<DashBoardType | null>({
    queryKey: ["dashboard"],
    queryFn: id ? () => getDashboard(id) : () => null,
    retry: false,
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["dashboard"],
      refetchType: "all",
    });
  }, [id, queryClient]);

  if (isLoading) {
    return <div>loading</div>;
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
      <div className={styles.navbar}>
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
