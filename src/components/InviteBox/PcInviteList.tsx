import InviteItem from "./InviteItem";
import styles from "./PcInvite.module.css";

function PcInviteList() {
  return (
    <>
      <ul className={styles.inviteBox_entry}>
        <li>이름</li>
        <li>초대자</li>
        <li>수락 여부</li>
      </ul>
      <div className={styles.inviteBox_invitList}>
        <InviteItem />
        <InviteItem />
      </div>
    </>
  );
}

export default PcInviteList;
