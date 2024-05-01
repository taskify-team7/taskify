import { useNavigate, useParams } from "react-router-dom";
import style from "./DashBoardEditPage.module.css";
import backArrow from "../../assets/backButton.svg";
import DashboardModify from "../../components/DashboardModify/DashboardModify";
import DashboardMember from "../../components/DashboardMember/DashboardMember";
import DashboardInvite from "../../components/DashboardInvite/DashboardInvite";
import BaseButton from "../../components/BaseButton/BaseButton";
import { deleteDashboard } from "../../api/dashboard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function DashBoardEditPage() {
  const navigate = useNavigate();

  const { id } = useParams();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => deleteDashboard(Number(id)),
    onSettled: () => {
      return (
        queryClient.invalidateQueries({ queryKey: ["dashboardList", 1] }),
        queryClient.invalidateQueries({ queryKey: ["dashboards", 1] })
      );
    },
  });

  const handleDashboardDelete = async () => {
    try {
      mutate();
      toast.success("대시보드가 삭제되었습니다.");
      navigate("/dashboard");
    } catch (error) {}
  };

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
      <div className={style.dashboardDeleteBtn} onClick={handleDashboardDelete}>
        <BaseButton styleType="dashboardDelete" text="대쉬보드 삭제하기" />
      </div>
    </div>
  );
}

export default DashBoardEditPage;
