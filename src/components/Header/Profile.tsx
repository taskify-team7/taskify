import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import styles from "./Profile.module.css";
import defaultProfile from "../../assets/deafultProfile.svg";

export default function Profile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { getUser, contextLogout } = useAuth();
  const navigate = useNavigate();
  const user = getUser();

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <div
        // src={user?.profileImageUrl || defaultProfile}
        style={{
          backgroundImage: `url(${user?.profileImageUrl || defaultProfile})`,
          backgroundSize: "cover",
        }}
        className={styles.profile}
      />
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
