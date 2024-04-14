import React, { useRef } from "react";
import styles from "./InviteBox.module.css";
import useBrowserSize from "../../hooks/useBrowserSize";
import MobileInviteList from "./MobileInviteList";
import PcInviteList from "./PcInviteList";
import { getInviteList } from "../../api/DashboardPageAPI";
import { useQuery } from "@tanstack/react-query";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { InviteListDataType } from "../../interface/DashboardType";

function InviteBox() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { windowWidth } = useBrowserSize();
  const pageRef = useIntersectionObserver(ref, {});

  const { isLoading, error, data } = useQuery<InviteListDataType>({
    queryKey: ["invite"],
    queryFn: () => getInviteList(),
  });

  if (isLoading) {
    return <div>loding</div>;
  }

  if (error) {
    return <div>errors</div>;
  }

  return (
    <div className={styles.inviteBox}>
      <h2 className={styles.inviteBox_title}>초대받은 대시보드</h2>
      {data && data?.invitations.length > 0 ? (
        <>
          <div className={styles.inviteBox_searchbar}>
            <img src="/Icons/search.svg" alt="search" />
            <input type="text" placeholder="검색" />
          </div>
          {windowWidth <= 375 ? (
            <MobileInviteList inviteData={data?.invitations} />
          ) : (
            <PcInviteList inviteData={data?.invitations} />
          )}
          <div ref={ref}></div>
        </>
      ) : (
        <div className={styles.inviteBox_null}>
          <img src="/Icons/no_invite.svg" alt="no_invite" />
          <p>아직 초대받은 대시보드가 없어요</p>
        </div>
      )}
    </div>
  );
}

export default InviteBox;
