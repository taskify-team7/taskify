import React from "react";
import styles from "./InviteBox.module.css";
import InviteItem from "./InviteItem";

function InviteBox() {
  const test = true;
  return (
    <div className={styles.inviteBox}>
      <h2 className={styles.inviteBox_title}>초대받은 대시보드</h2>
      {test ? (
        <>
          <div className={styles.inviteBox_searchbar}>
            <img src="/Icons/search.svg" alt="search" />
            <input type="text" placeholder="검색" />
          </div>
          <ul className={styles.inviteBox_entry}>
            <li>이름</li>
            <li>초대자</li>
            <li>수락 여부</li>
          </ul>
          <div className={styles.inviteBox_invitList}>
            <InviteItem />
          </div>
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
