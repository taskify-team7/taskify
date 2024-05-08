import { Outlet } from "react-router-dom";
import LoginRedirector from "./LoginRedirector";
import Sidebar from "./components/Sidebar/Sidebar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDashboardList } from "./api/dashboard";
import Header from "./components/Header/Header";
import { DashBoardsType } from "./interface/DashboardType";
import { useEffect, useState } from "react";
import Loading from "./components/Loading/Loading";
import RouteChangeTracker from "./RouteChangeTracker";

export default function Layout() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);

  const { isLoading, error, data } = useQuery<DashBoardsType>({
    queryKey: ["dashboardList", page],
    queryFn: () =>
      getDashboardList({
        navigationMethod: "pagination",
        cursorId: null,
        page,
        size: 10,
      }),
  });
  const totalPage = Math.ceil((data?.totalCount || 0) / 10);
  const nextPage = () => setPage((current) => current + 1);
  const prevPage = () => setPage((current) => current - 1);

  useEffect(() => {
    if (page < totalPage) {
      const nextPage = page + 1;
      queryClient.prefetchQuery({
        queryKey: ["dashboardList", nextPage],
        queryFn: () =>
          getDashboardList({
            navigationMethod: "pagination",
            cursorId: null,
            page,
            size: 10,
          }),
      });
    }
  }, [page, queryClient, totalPage]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return <div>errors</div>;
  }
  return (
    <LoginRedirector>
      <RouteChangeTracker />
      <Sidebar
        dashboards={data?.dashboards || null}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPage={totalPage}
      >
        <Header dashboards={data?.dashboards || null}>
          <Outlet />
        </Header>
      </Sidebar>
    </LoginRedirector>
  );
}
