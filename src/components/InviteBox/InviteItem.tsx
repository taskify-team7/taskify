import React from "react";
import styles from "./InviteItem.module.css";
import { UserType } from "../../interface/DashboardType";

interface InviteItemProps {
  dashboarData: {
    id: number;
    title: string;
  };
  inviterData: UserType;
}

function InviteItem({ dashboarData, inviterData }: InviteItemProps) {
  return (
    <div className={styles.inviteBox_invitItem}>
      <p>{dashboarData?.title}</p>
      <p>{inviterData.nickname}</p>
      <div className={styles.inviteBox_invitList_buttons}>
        <button className={styles.a_button}>수락</button>
        <button className={styles.c_button}> 거절</button>
      </div>
    </div>
  );
}

export default InviteItem;
