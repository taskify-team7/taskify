import React from "react";
import styles from "./DashBoardList.module.css";
import CreateBoardButton from "../CreateBoardButton/CreateBoardButton";
import DashBoardItem from "../DashBoardItem/DashBoardItem";

const testData = {
  id: 0,
  title: "string",
  color: "#760DDE",
  createdAt: "2024-04-12T09:35:34.434Z",
  updatedAt: "2024-04-12T09:35:34.434Z",
  createdByMe: true,
  userId: 0,
};

function DashBoardList() {
  return (
    <div className={styles.dashboardList}>
      <CreateBoardButton />
      <DashBoardItem dashboardData={testData}></DashBoardItem>
      <DashBoardItem dashboardData={testData}></DashBoardItem>
      <DashBoardItem dashboardData={testData}></DashBoardItem>
      <DashBoardItem dashboardData={testData}></DashBoardItem>
      <DashBoardItem dashboardData={testData}></DashBoardItem>
    </div>
  );
}

export default DashBoardList;
