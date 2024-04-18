import styles from "./DashBoardsPage.module.css";
import InviteBox from "../../components/InviteBox/InviteBox";
import DashBoardList from "../../components/DashBoardList/DashBoardList";

export default function DashBoardsPage() {
  return (
    <div className={styles.body}>
      <DashBoardList />
      <InviteBox />
    </div>
  );
}
