import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ReactNode } from "react";
import styles from "./Header.module.css";
import { DashBoardType } from "../../interface/DashboardType";
import { useQuery } from "@tanstack/react-query";
import { getDashboard, getMembers } from "../../api/dashboard";
import Crown from "../../assets/crown.svg";
import Profile from "./Profile";
import { useAuth } from "../../contexts/AuthProvider";

import defaultProfile from "../../assets/deafultProfile.svg";
import useBrowserSize from "../../hooks/useBrowserSize";

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

  if (members) {
    if (windowWidth > 1200) {
      members = members.slice(0, 3);
      howManyMoreMembers -= 4;
    } else {
      members = members.slice(0, 1);
      howManyMoreMembers -= 2;
    }
  }

  if (id && error) {
    console.log("wrong id provided");
    navigate("/dashboard");
  }

  return (
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
              <div className={styles.button}>
                <img src="/Icons/settings.svg" alt="invite" />
                <span>관리</span>
              </div>
              <div className={styles.button}>
                <img src="/Icons/inviteButton.svg" alt="invite" />
                <span>초대하기</span>
              </div>
              <div className={styles.invitees}>
                {members.map((member: any) => (
                  <div key={member.id}>
                    <div
                      style={{
                        backgroundImage: `url(${
                          member?.profileImageUrl || defaultProfile
                        })`,
                        backgroundSize: "cover",
                      }}
                      className={styles.profile}
                    />
                    {howManyMoreMembers > 0 ? (
                      <div
                        className={`${styles.profile} ${styles.howManyMore}`}
                      >
                        +{howManyMoreMembers}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.verticalBar} />
            </>
          )}
          <Profile />
        </div>
      </div>
      {children}
    </div>
  );
}
