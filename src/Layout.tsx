import { Outlet } from "react-router-dom";
import LoginRedirector from "./LoginRedirector";
import Sidebar from "./components/Sidebar/Sidebar";

import { useQuery } from "@tanstack/react-query";
import { getDashboardList } from "./api/dashboard";
import Header from "./components/Header/Header";
import { DashBoardsType } from "./interface/DashboardType";

export default function Layout() {
  const { isLoading, error, data } = useQuery<DashBoardsType>({
    queryKey: ["dashboards"],
    queryFn: () =>
      getDashboardList({
        navigationMethod: "infiniteScroll",
        cursorId: null,
        page: null,
        size: 100,
      }),
  });

  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    console.log(error);
    return <div>errors</div>;
  }
  return (
    <LoginRedirector>
      <Sidebar dashboards={data?.dashboards || null}>
        <Header dashboards={data?.dashboards || null}>
          <Outlet />
        </Header>
      </Sidebar>
    </LoginRedirector>
  );
}
