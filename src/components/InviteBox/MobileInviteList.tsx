import React from "react";
import styles from "./MobileInviteList.module.css";

function MobileInviteList() {
  return (
    <div className={styles.inviteList}>
      <div className={styles.inviteItem}>
        <div className={styles.inviteItem_content}>
          <p>이름</p>
          <p>프로덕트 디자인</p>
        </div>
        <div className={styles.inviteItem_content}>
          <p>초대자</p>
          <p>손동희</p>
        </div>
        <div className={styles.inviteItem_buttons}>
          <button className={styles.a_button}>수락</button>
          <button className={styles.c_button}> 거절</button>
        </div>
      </div>
      <div className={styles.inviteItem}>
        <div className={styles.inviteItem_content}>
          <p>이름</p>
          <p>프로덕트 디자인</p>
        </div>
        <div className={styles.inviteItem_content}>
          <p>초대자</p>
          <p>손동희</p>
        </div>
        <div className={styles.inviteItem_buttons}>
          <button className={styles.a_button}>수락</button>
          <button className={styles.c_button}> 거절</button>
        </div>
      </div>
    </div>
  );
}

export default MobileInviteList;
