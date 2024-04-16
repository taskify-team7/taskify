import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ReactNode } from "react";
import styles from "./Header.module.css";
import { DashBoardType } from "../../interface/DashboardType";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../../api/dashboard";
import Crown from "../../assets/crown.svg";
import Profile from "./Profile";

export default function Header({
  children,
  dashboards,
}: {
  children: ReactNode;
  dashboards: DashBoardType[] | null;
}) {
  const { id = null } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const data = dashboards?.find((dashboard) => dashboard.id === Number(id));

  const { error } = useQuery<DashBoardType | null>({
    queryKey: ["dashboard", id],
    queryFn: id ? () => getDashboard(id) : () => null,
    enabled: id !== null,
    retry: false,
  });
  if (id && error) {
    console.log("wrong id provided");
    navigate("/dashboard");
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
          {data?.createdByMe && (
            <img src={Crown} alt="crown" className={styles.crown} />
          )}
        </div>

        <div className={styles.contents}>
          {data && (
            <>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
            </>
          )}
          <Profile />
        </div>
      </div>
      {children}
    </div>
  );
}
