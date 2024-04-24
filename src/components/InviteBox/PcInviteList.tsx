import useInfiniteHook from "../../hooks/useInfiniteHook";
import { InviteDataType } from "../../interface/DashboardType";
import InviteItem from "./InviteItem";
import styles from "./PcInvite.module.css";

function PcInviteList({ inviteData }: { inviteData: InviteDataType[] }) {
  const { ref } = useInfiniteHook();
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
            invitationId={invite.id}
          />
        ))}
        {inviteData.length > 6 && (
          <div ref={ref} className={styles.observer}></div>
        )}
      </div>
    </>
  );
}

export default PcInviteList;
