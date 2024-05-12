import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { InviteDataType } from "../../interface/DashboardType";
import { deleteInvite, getDashboardInvite } from "../../api/dashboard";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { useModal } from "../../hooks/useModal";
import InviteModal from "../Modal/InviteModal";
import style from "./DashboardInvite.module.css";
import plus_white from "../../assets/plus_white.svg";
import { toast } from "react-toastify";
import Button from "../Button/BaseButton/BaseButton";

function DashboardInvite() {
  const { id } = useParams();
  const [page, setPage] = useState<number>(1);
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  const size = 5;

  const { data } = useQuery({
    queryKey: ["inviteList", { id, page, size }],
    queryFn: () => {
      if (!id) {
        return Promise.resolve([]);
      } else {
        return getDashboardInvite(Number(id), page, size);
      }
    },
    enabled: id !== null,
  });

  const inviteList = data?.invitations;

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

  const handleDeleteInvite = (inviteId: number) => async () => {
    const response = await deleteInvite(Number(id), inviteId);
    if (typeof response === "string") {
      toast.error(response);
    } else {
      toast.success("초대가 취소되었습니다.");
    }
  };

  return (
    <>
      {createPortal(
        isModalOpen && (
          <InviteModal
            handleModalClose={handleModalClose}
            dashboardId={Number(id)}
          />
        ),
        document.body
      )}
      <div className={style.container}>
        <div className={style.titleNPageContainer}>
          <h2>초대 내역</h2>
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
            <button
              className={style.inviteBtn}
              type="button"
              onClick={handleModalOpen}
            >
              <img src={plus_white} alt="plusBtn" />
              <span>초대하기</span>
            </button>
          </div>
        </div>
        <div className={style.explanation}>이메일</div>
        <div>
          {inviteList?.map((member: InviteDataType) => (
            <div key={member.id} className={style.memberList}>
              <div className={style.profileContainer}>
                <div className={style.profileEmail}>{member.invitee.email}</div>
              </div>
              <Button.Delete
                type="button"
                onClick={handleDeleteInvite(member.id)}
              >
                삭제
              </Button.Delete>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DashboardInvite;
