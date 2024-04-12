import { useParams } from "react-router-dom";
import CreateBoardButton from "../../components/CreateBoardButton/CreateBoardButton";
import styles from "./DashBoardPage.module.css";
import DashBoardItem from "../../components/DashBoardItem/DashBoardItem";
import InviteBox from "../../components/InviteBox/InviteBox";

export default function DashboardPage() {
  const { dashboardId } = useParams();
  const testData = {
    id: 0,
    title: "string",
    color: "#760DDE",
    createdAt: "2024-04-12T09:35:34.434Z",
    updatedAt: "2024-04-12T09:35:34.434Z",
    createdByMe: true,
    userId: 0,
  };

  return (
    <div className={styles.body}>
      <div className={styles.dashboardList}>
        <CreateBoardButton />
        <DashBoardItem dashboardData={testData}></DashBoardItem>
        <DashBoardItem dashboardData={testData}></DashBoardItem>
        <DashBoardItem dashboardData={testData}></DashBoardItem>
        <DashBoardItem dashboardData={testData}></DashBoardItem>
        <DashBoardItem dashboardData={testData}></DashBoardItem>
      </div>
      <InviteBox />
    </div>
  );
}
