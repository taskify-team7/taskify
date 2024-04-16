import { ReactNode } from "react";
import styles from "./Sidebar.module.css";
import LogoImage from "../../assets/mediumLogo.svg";
import PlusIcon from "../../assets/plus.svg";
import Crown from "../../assets/crown.svg";
import { useNavigate, useParams } from "react-router-dom";
import { DashBoardType } from "../../interface/DashboardType";

export default function Sidebar({
  children,
  dashboards,
}: {
  children: ReactNode;
  dashboards: DashBoardType[] | null;
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <img
          src={LogoImage}
          alt="logo"
          className={styles.logo}
          onClick={() => navigate("/dashboard")}
        />
        <div className={styles.head}>
          <span className={styles.headText}>Dash Boards</span>
          <img src={PlusIcon} alt="plusicon" className={styles.plusIcon} />
        </div>
        <ul className={styles.dashboardList}>
          {dashboards?.map((dashboard) => (
            <li
              key={dashboard.id}
              onClick={() => navigate(`/dashboard/${dashboard.id}`)}
              className={`${styles.dashboardListItem} + ${
                id && dashboard.id === Number(id) ? styles.selected : ""
              }`}
            >
              <div
                className={styles.dot}
                style={{ backgroundColor: dashboard.color }}
              />
              <span>{dashboard.title}</span>
              {dashboard.createdByMe && (
                <img src={Crown} alt="crown" className={styles.crown} />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.contents}>{children}</div>
    </div>
  );
}
