import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import styles from "./Profile.module.css";

export default function Profile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { getUser, contextLogout } = useAuth();
  const navigate = useNavigate();
  const user = getUser();

  const colorList = ["#F9EEE3", "#E7F7DB", "#F7DBF0", "#DBE6F7"];
  const randomColorIndex = Math.floor(Math.random() * colorList.length);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <div
        // src={user?.profileImageUrl || defaultProfile}
        style={
          user.profileImageUrl
            ? {
                backgroundImage: `url(${user.profileImageUrl})`,
                backgroundSize: "cover",
              }
            : {
                backgroundColor: `${colorList[randomColorIndex]}`,
              }
        }
        className={styles.profile}
      >
        {user.profileImageUrl ? "" : user.nickname.substring(0, 1)}
      </div>
      <span className={styles.nickname}>{user?.nickname}</span>
      {isDropdownOpen && (
        <ul className={styles.dropdown}>
          <li>
            <button onClick={() => navigate("/myPage")}>마이페이지</button>
          </li>
          <li>
            <button
              onClick={() => {
                contextLogout();
                navigate("/login");
              }}
            >
              로그아웃
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
