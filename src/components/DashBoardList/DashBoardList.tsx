import { useState } from "react";
import styles from "./DashBoardList.module.css";
import CreateBoardButton from "../CreateBoardButton/CreateBoardButton";
import DashBoardItem from "../DashBoardItem/DashBoardItem";
import { getDashboardList } from "../../api/dashboard";
import { useQuery } from "@tanstack/react-query";
import { DashBoardsType } from "../../interface/DashboardType";

function DashBoardList() {
  const [params, setParams] = useState({
    navigationMethod: "pagination",
    cursorId: 1,
    page: 1,
    size: 5,
  });

  const { isLoading, error, data } = useQuery<DashBoardsType>({
    queryKey: ["dashboards", params.page],
    queryFn: () => getDashboardList(params),
  });

  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>errors</div>;
  }

  const totalPage = Math.ceil((data?.totalCount || 0) / 5);

  const nextPageHandler = () => {
    setParams((prev) => {
      if (prev.page < totalPage) {
        return {
          ...prev,
          page: prev.page + 1,
        };
      } else {
        // 페이지가 MAX_PAGE에 도달한 경우에는 그대로 반환
        return prev;
      }
    });
  };

  const prevPageHandler = () => {
    setParams((prev) => {
      if (prev.page > 1) {
        return {
          ...prev,
          page: prev.page - 1,
        };
      } else {
        // 페이지가 1보다 작은 경우에는 그대로 반환
        return prev;
      }
    });
  };

  return (
    <>
      <div className={styles.dashboardList}>
        <CreateBoardButton />
        {data?.dashboards.map((dashboard) => (
          <DashBoardItem key={dashboard.id} dashboardData={dashboard} />
        ))}
        <div className={styles.pagenationBtn}>
          <p>{`${totalPage}페이지 중 ${params.page}`}</p>
          <button type="button" onClick={prevPageHandler}>
            <img src="/Icons/pagination_prev.svg" alt="prev" />
          </button>
          <button type="button" onClick={nextPageHandler}>
            <img src="/Icons/pagination_next.svg" alt="next" />
          </button>
        </div>
      </div>
    </>
  );
}

export default DashBoardList;