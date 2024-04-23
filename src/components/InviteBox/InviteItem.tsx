import React from "react";
import styles from "./InviteItem.module.css";
import { UserType } from "../../interface/DashboardType";
import { updateInvitations } from "../../api/dashboard";

interface InviteItemProps {
  dashboarData: {
    id: number;
    title: string;
  };
  inviterData: UserType;
  invitationId: number;
}

function InviteItem({
  dashboarData,
  inviterData,
  invitationId,
}: InviteItemProps) {
  const invitationsHandle = async (inviteAccepted: boolean) => {
    const res = await updateInvitations(invitationId, inviteAccepted);
  };

  return (
    <div className={styles.inviteBox_invitItem}>
      <p>{dashboarData?.title}</p>
      <p>{inviterData.nickname}</p>
      <div className={styles.inviteBox_invitList_buttons}>
        <button
          className={styles.a_button}
          onClick={() => invitationsHandle(true)}
        >
          수락
        </button>
        <button
          className={styles.c_button}
          onClick={() => invitationsHandle(false)}
        >
          거절
        </button>
      </div>
    </div>
  );
}

export default InviteItem;
