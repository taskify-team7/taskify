import { Outlet } from 'react-router-dom';
import LoginRedirector from './LoginRedirector';
import Sidebar from './components/Sidebar/Sidebar';
import { useQuery } from '@tanstack/react-query';
import { getDashboardList } from './api/dashboard';
import Header from './components/Header/Header';
import { DashBoardsType } from './interface/DashboardType';
import { useState } from 'react';

export default function Layout() {
  const [page, setPage] = useState<number>(1);

  const { isLoading, error, data } = useQuery<DashBoardsType>({
    queryKey: ['dashboards', page],
    queryFn: () =>
      getDashboardList({
        navigationMethod: 'pagination',
        cursorId: null,
        page,
        size: 10,
      }),
  });
  const totalPage = Math.ceil((data?.totalCount || 0) / 10);
  const nextPage = () => setPage((current) => current + 1);
  const prevPage = () => setPage((current) => current - 1);

  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    console.log(error);
    return <div>errors</div>;
  }
  return (
    <LoginRedirector>
      <Sidebar
        dashboards={data?.dashboards || null}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPage = {totalPage}
      >
        <Header dashboards={data?.dashboards || null}>
          <Outlet />
        </Header>
      </Sidebar>
    </LoginRedirector>
  );
}
