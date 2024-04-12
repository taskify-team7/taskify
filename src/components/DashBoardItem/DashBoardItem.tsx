import styles from "./DashBoard.module.css";
import { Link } from "react-router-dom";

interface DashBoardItemProps {
  dashboardData: {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
    userId: number;
  };
}

function DashBoardItem({ dashboardData }: DashBoardItemProps) {
  return (
    <Link to={`/dashboard/${dashboardData.id}`}>
      <div className={styles.dashBoardItem}>
        <div className={styles.dashBoardItem_name}>
          <div
            className={styles.dashBoardItem_circle}
            style={{ background: `${dashboardData.color}` }}
          ></div>
          <p className={styles.font}>{dashboardData.title}</p>
          {dashboardData.createdByMe && (
            <img src="/Icons/crown_icon.svg" alt="add_dashboard" />
          )}
        </div>
        <img src="/Icons/boardArrow.svg" alt="next" />
      </div>
    </Link>
  );
}

export default DashBoardItem;
