import { InviteDataType } from "../../interface/DashboardType";
import InviteItem from "./InviteItem";
import styles from "./PcInvite.module.css";

function PcInviteList({ inviteData }: { inviteData: InviteDataType[] }) {
  return (
    <>
      <ul className={styles.inviteBox_entry}>
        <li>이름</li>
        <li>초대자</li>
        <li>수락 여부</li>
      </ul>
      <div className={styles.inviteBox_invitList}>
        {inviteData.map((invite) => (
          <InviteItem
            key={invite.id}
            dashboarData={invite?.dashboard}
            inviterData={invite?.inviter}
          />
        ))}
      </div>
    </>
  );
}

export default PcInviteList;
