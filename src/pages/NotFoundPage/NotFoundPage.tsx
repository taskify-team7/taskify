import React from "react";
import styles from "./NotFoundPage.module.css";
import mainLogo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.mainLogoContainer}>
          <img className={styles.logoImage} src={mainLogo} alt="Logo.svg" />
          <div className={styles.errorTextBox}>
            <div className={styles.errorCode}>404</div>
            <div className={styles.mainLogoText}>Page Not Found...</div>
          </div>
        </div>
        <div className={styles.pageExplain}>
          존재하지 않는 주소를 입력하셨거나 <br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </div>
        <Link to="/">
          <button className={styles.homeButton}>Home</button>
        </Link>
      </div>
    </>
  );
}
