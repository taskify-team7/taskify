import React from "react";
import styles from "./InviteItem.module.css";
import { UserType } from "../../interface/DashboardType";
import { updateInvitations } from "../../api/dashboard";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const invitationsHandle = async (inviteAccepted: boolean) => {
    await updateInvitations(invitationId, inviteAccepted);

    if (inviteAccepted) {
      toast.success("수락 했습니다");
    } else {
      toast.success("거절 했습니다");
    }
    queryClient.invalidateQueries({ queryKey: ["invite"] });
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
