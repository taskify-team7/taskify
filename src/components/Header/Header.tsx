import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ReactNode } from "react";
import styles from "./Header.module.css";
import { DashBoardType } from "../../interface/DashboardType";
import { useQuery } from "@tanstack/react-query";
import { getDashboard, getMembers } from "../../api/dashboard";
import Crown from "../../assets/crown.svg";
import Profile from "./Profile";
import { useAuth } from "../../contexts/AuthProvider";

import useBrowserSize from "../../hooks/useBrowserSize";
import { useModal } from "../../hooks/useModal";
import InviteModal from "../Modal/InviteModal";
import { createPortal } from "react-dom";

export default function Header({
  children,
  dashboards,
}: {
  children: ReactNode;
  dashboards: DashBoardType[] | null;
}) {
  const { getUser } = useAuth();
  const { id = null } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { windowWidth } = useBrowserSize();
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  const { error, data } = useQuery<DashBoardType | null>({
    queryKey: ["dashboard", id],
    queryFn: id ? () => getDashboard(id) : () => null,
    enabled: id !== null,
    retry: false,
    initialData: dashboards?.find((dashboard) => dashboard.id === Number(id)),
  });

  let { data: members } = useQuery({
    queryKey: ["members", id],
    queryFn: id ? () => getMembers(id) : () => null,
    enabled: id !== null,
    retry: false,
    initialData: [getUser()],
  });

  let howManyMoreMembers = members?.length;

  const colorList = ["#F9EEE3", "#E7F7DB", "#F7DBF0", "#DBE6F7"];
  const randomColorIndex = Math.floor(Math.random() * colorList.length);

  if (members) {
    if (windowWidth > 1200) {
      members = members.slice(0, 3);
      howManyMoreMembers -= 4;
    } else {
      members = members.slice(0, 1);
      howManyMoreMembers -= 2;
    }
  }

  const inviteModalOpen = () => {
    handleModalOpen();
  };

  if (id && error) {
    console.log("wrong id provided");
    navigate("/dashboard");
  }

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
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            {location.pathname === "/mypage"
              ? "계정관리"
              : id
              ? data?.title
              : "내 대시보드"}
            {data?.createdByMe && (
              <img src={Crown} alt="crown" className={styles.crown} />
            )}
          </div>


          <div className={styles.contents}>
            {data && (
              <>
                <div className={styles.button} onClick={() => {
                navigate(`/dashboard/${id}/edit`, {state: {data: {data}}})
              }}>
                  <img src="/Icons/settings.svg" alt="invite" />
                  <span>관리</span>
                </div>
                <div className={styles.button} onClick={inviteModalOpen}>
                  <img src="/Icons/inviteButton.svg" alt="invite" />
                  <span>초대하기</span>
                </div>
                <div className={styles.invitees}>
                  {members.map((member: any) => (
                    <div
                      key={member.id}
                      style={
                        member.profileImageUrl
                          ? {
                              backgroundImage: `url(${member.profileImageUrl})`,
                              backgroundSize: "cover",
                            }
                          : {
                              backgroundColor: `${colorList[randomColorIndex]}`,
                            }
                      }
                      className={styles.profile}
                    >
                      {member.profileImageUrl
                        ? ""
                        : member.nickname.substring(0, 1)}
                    </div>
                  ))}
                  {howManyMoreMembers > 0 ? (
                    <div className={`${styles.profile} ${styles.howManyMore}`}>
                      +{howManyMoreMembers}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className={styles.verticalBar} />
              </>
            )}
            <Profile />
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
