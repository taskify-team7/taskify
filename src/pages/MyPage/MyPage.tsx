import React from 'react';
import style from './MyPage.module.css';
import backArrow from '../../assets/backButton.svg';
import ProfileModify from '../../components/ProfileModify/ProfileModify';
import ChangePW from '../../components/ChangePW/ChangePW';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
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
        <span>뒤로가기</span>
      </button>
      <ProfileModify />
      <ChangePW />
    </div>
  );
}
