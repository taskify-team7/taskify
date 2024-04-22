import { useNavigate } from 'react-router-dom';
import style from './DashBoardEditPage.module.css';
import backArrow from '../../assets/backButton.svg';
import DashboardModify from '../../components/DashboardModify/DashboardModify';
import DashboardMember from '../../components/DashboardMember/DashboardMember';
import DashboardInvite from '../../components/DashboardInvite/DashboardInvite';

function DashBoardEditPage() {
  const navigate = useNavigate();

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
