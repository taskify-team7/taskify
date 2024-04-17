import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingNavbar.module.css";

const LandingNavbar: React.FC = () => {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.mainLogoContainer}>
        <Link to="/">
          <img src="/Icons/mainLogo.svg" alt="mainLogo.svg" />
          <img
            className={styles.logoTitle}
            src="/Icons/mainLogoText.svg"
            alt="mainLogoText.svg"
          />
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>
          <Link to="/login">로그인</Link>
        </button>
        <button className={styles.button}>
          <Link to="/signup">회원가입</Link>
        </button>
      </div>
    </nav>
  );
};

export default LandingNavbar;
