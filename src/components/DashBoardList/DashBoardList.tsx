import React, { useEffect, useState } from "react";
import styles from "./DashBoardList.module.css";
import CreateBoardButton from "../CreateBoardButton/CreateBoardButton";
import DashBoardItem from "../DashBoardItem/DashBoardItem";
import { getDashboardList } from "../../api/DashboardPageAPI";
import { useQuery } from "@tanstack/react-query";

interface DashboardList {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

interface DashBoardDataType {
  cursorId: number | null;
  totalCount: number;
  dashboards: DashboardList[];
}

const test = {
  navigationMethod: "pagination",
  cursorId: 1,
  page: 1,
  size: 5,
};

function DashBoardList() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboardList(test),
  });

  return (
    <div className={styles.dashboardList}>
      <CreateBoardButton />
      {data?.dashboards.map((dashboard: DashboardList) => (
        <DashBoardItem
          key={dashboard.id}
          dashboardData={dashboard}
        ></DashBoardItem>
      ))}
    </div>
  );
}

export default DashBoardList;
