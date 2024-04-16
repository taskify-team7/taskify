import { Outlet } from "react-router-dom";
import LoginRedirector from "./LoginRedirector";
import Sidebar from "./components/Sidebar/Sidebar";

import { useQuery } from "@tanstack/react-query";
import { getDashboardList } from "./api/dashboard";
import { DashBoardsType } from "./interface/DashboardType";
import Header from "./components/Header/Header";

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
  console.log(data);
  return (
    <LoginRedirector>
      <Sidebar dashboards={data?.dashboards || null}>
        <Header>
          <Outlet />
        </Header>
      </Sidebar>
    </LoginRedirector>
  );
}
