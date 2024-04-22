import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DashBoardType } from '../../interface/DashboardType';
import style from './DashBoardEditPage.module.css';
import backArrow from '../../assets/backButton.svg';
import DashboardModify from '../../components/DashboardModify/DashboardModify';
import DashboardMember from '../../components/DashboardMember/DashboardMember';
import DashboardInvite from '../../components/DashboardInvite/DashboardInvite';

function DashBoardEditPage() {
  const { id } = useParams();
  // queryClient.getQueryData를 사용해 구현하려했으나 undefined가 나오며 실패해 다른 방법 사용함
  const location = useLocation();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashBoardType | null>();

  // 리렌더 이슈가있어 useEffect로 방지
  useEffect(() => {
    // 해당 id의 대쉬보드 정보를 받아오는 data
    const { data } = location.state?.data as { data: DashBoardType };
    setDashboardData(data);
  }, [id]);

  return (
    <div className={style.container}>
      <button
        className={style.goBack}
        onClick={() => {
          navigate(-1);
        }}
      >
        <div>
          <img src={backArrow} alt="go back button" />
        </div>
        <span>돌아가기</span>
      </button>
      <DashboardModify />
      <DashboardMember />
      <DashboardInvite />
    </div>
  );
}

export default DashBoardEditPage;
