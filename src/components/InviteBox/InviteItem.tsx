import React from "react";
import styles from "./InviteItem.module.css";

function InviteItem() {
  return (
    <div className={styles.inviteBox_invitItem}>
      <p>프로적트 디자인</p>
      <p>손동희</p>
      <div className={styles.inviteBox_invitList_buttons}>
        <button className={styles.a_button}>수락</button>
        <button className={styles.c_button}> 거절</button>
      </div>
    </div>
  );
}

export default InviteItem;
