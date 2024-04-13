import { useParams } from "react-router-dom";
import styles from "./DashBoardPage.module.css";
import InviteBox from "../../components/InviteBox/InviteBox";
import DashBoardList from "../../components/DashBoardList/DashBoardList";

export default function DashboardPage() {
  const { dashboardId } = useParams();

  return (
    <div className={styles.body}>
      <DashBoardList />
    </div>
  );
}
