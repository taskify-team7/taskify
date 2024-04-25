import React from "react";
import styles from "./ProfileCircle.module.css";

interface ProfileCircleProps {
  profileImageUrl: string | null;
  nickname: string;
  type?: string;
}

function ProfileCircle({
  profileImageUrl,
  nickname,
  type,
}: ProfileCircleProps) {
  return (
    <div className={`${styles.profile} ${type ? styles.card : ""}`}>
      {profileImageUrl ? (
        <img
          className={styles.profile_image}
          src={profileImageUrl}
          alt="profile"
        />
      ) : (
        nickname[0]
      )}
    </div>
  );
}

export default ProfileCircle;
