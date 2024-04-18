import styles from "./DashBoardPage.module.css";
import Columns from "../../components/Column/Columns";

export default function DashBoardPage() {
  return (
    <div className={styles.container}>
      <Columns />
    </div>
  );
}
