import React from "react";
import styles from "./InviteBox.module.css";
import useBrowserSize from "../../hooks/useBrowserSize";
import MobileInviteList from "./MobileInviteList";
import PcInviteList from "./PcInviteList";

function InviteBox() {
  const test = true;
  const { windowWidth } = useBrowserSize();

  return (
    <div className={styles.inviteBox}>
      <h2 className={styles.inviteBox_title}>초대받은 대시보드</h2>
      {test ? (
        <>
          <div className={styles.inviteBox_searchbar}>
            <img src="/Icons/search.svg" alt="search" />
            <input type="text" placeholder="검색" />
          </div>
          {windowWidth <= 375 ? <MobileInviteList /> : <PcInviteList />}
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
