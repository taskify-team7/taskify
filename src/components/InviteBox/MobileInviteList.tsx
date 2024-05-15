import React from "react";
import styles from "./MobileInviteList.module.css";
import { InviteDataType } from "../../interface/DashboardType";
import { updateInvitations } from "../../api/dashboard";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

function MobileInviteList({ inviteData }: { inviteData: InviteDataType[] }) {
  const queryClient = useQueryClient();

  const invitationsHandle = async (
    invitationId: number,
    inviteAccepted: boolean
  ) => {
    await updateInvitations(invitationId, inviteAccepted);
    if (inviteAccepted) {
      toast.success("수락 했습니다");
    } else {
      toast.success("거절 했습니다");
    }
    queryClient.invalidateQueries({ queryKey: ["invite"] });
  };

  return (
    <div className={styles.inviteList}>
      {inviteData.map((invite) => (
        <div className={styles.inviteItem} key={invite.id}>
          <div className={styles.inviteItem_content}>
            <p>이름</p>
            <p>{invite.dashboard.title}</p>
          </div>
          <div className={styles.inviteItem_content}>
            <p>초대자</p>
            <p>{invite.inviter.nickname}</p>
          </div>
          <div className={styles.inviteItem_buttons}>
            <button
              className={styles.a_button}
              onClick={() => invitationsHandle(invite.id, true)}
            >
              수락
            </button>
            <button
              className={styles.c_button}
              onClick={() => invitationsHandle(invite.id, false)}
            >
              거절
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MobileInviteList;
