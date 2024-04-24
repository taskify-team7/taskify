import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DashBoardMember } from '../../interface/DashboardType';
import { deleteMember, getMemberList } from '../../api/dashboard';
import { useParams } from 'react-router-dom';
import BaseButton from '../BaseButton/BaseButton';
import style from './DashboardMember.module.css';

function DashboardMember() {
  const { id } = useParams();
  const [page, setPage] = useState<number>(1);
  const size = 4;

  const { data } = useQuery({
    queryKey: ['memberList', { id, page, size }],
    queryFn: () => {
      if (!id) {
        return Promise.resolve([]);
      } else {
        return getMemberList(id, page, size);
      }
    },
    enabled: id !== null,
  });

  const memberList = data?.members;

  const totalPage = Math.ceil((data?.totalCount || 0) / size);

  const nextPageHandler = () => {
    setPage((currentPage) => {
      if (currentPage < totalPage) {
        return currentPage + 1;
      } else {
        // 페이지가 totalPage에 도달한 경우에는 현재 페이지를 유지
        return currentPage;
      }
    });
  };

  const prevPageHandler = () => {
    setPage((currentPage) => {
      if (currentPage > 1) {
        return currentPage - 1;
      } else {
        // 페이지가 1보다 작거나 같은 경우에는 현재 페이지를 유지
        return currentPage;
      }
    });
  };

  const handleDeleteMember = (id: number) => async () => {
    try {
      await deleteMember(id);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.titleNPageContainer}>
        <h2>구성원</h2>
        <div className={style.pagenationBtn}>
          <p>{`${totalPage}페이지 중 ${page}`}</p>
          <button
            className={style.leftBtn}
            type="button"
            onClick={prevPageHandler}
          >
            <img src="/Icons/pagination_prev.svg" alt="prev" />
          </button>
          <button
            className={style.rightBtn}
            type="button"
            onClick={nextPageHandler}
          >
            <img src="/Icons/pagination_next.svg" alt="next" />
          </button>
        </div>
      </div>
      <div className={style.explanation}>이름</div>
      <div>
        {memberList?.map((member: DashBoardMember) => (
          <div key={member.id} className={style.memberList}>
            <div className={style.profileContainer}>
              <div className={style.profileImg}>
                <img src={member.profileImageUrl} alt="유저프로필이미지" />
              </div>
              <div className={style.profileName}>{member.nickname}</div>
            </div>
            <BaseButton
              styleType="delete"
              text="삭제"
              onClick={handleDeleteMember(member.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardMember;
