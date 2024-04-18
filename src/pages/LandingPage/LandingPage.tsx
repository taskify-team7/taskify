import React from "react";
import styles from "./LandingPage.module.css";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import Footer from "../../components/LandingFooter/Footer";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className={styles.bodyWrapper}>
      <LandingNavbar />
      <div className={styles.mainBlock}>
        <div className={styles.mainImage} />
        <div className={styles.titleWrapper}>
          <div className={styles.titleText1}>새로운 일정 관리</div>
          <div className={styles.titleText2}>Taskify</div>
        </div>
        <div className={styles.subText}>서비스의 메인 설명 들어갑니다.</div>
        <Link to="/login">
          <button className={styles.loginButton}>로그인하기</button>
        </Link>
      </div>
      <div className={styles.infoBlockBox}>
        <div className={styles.infoBlock1}>
          <div className={styles.infoTextBox}>
            <div className={styles.pointText}>Point 1</div>
            <div className={styles.pointDescription}>
              일의 우선순위를
              <br />
              관리하세요
            </div>
          </div>
          <div className={styles.subImageWrapper1}>
            <div className={styles.subImage1}></div>
          </div>
        </div>
        <div className={styles.infoBlock2}>
          <div className={styles.subImageWrapper2}>
            <div className={styles.subImage2}></div>
          </div>
          <div className={styles.infoTextBox}>
            <div className={styles.pointText}>Point 2</div>
            <div className={styles.pointDescription}>
              해야 할 일을
              <br />
              등록하세요
            </div>
          </div>
        </div>
      </div>
      <div className={styles.settingWrapper}>
        <div className={styles.textBox}>생산성을 높이는 다양한 설정⚡</div>
        <div className={styles.listWrapper}>
          <div className={styles.listBlock}>
            <div className={styles.imageContainer1} />
            <div className={styles.imageDescription}>
              <div className={styles.descriptionTitle}>대시보드 설정</div>
              <div className={styles.descriptionText}>
                대시보드 사진과 이름을 변경할 수 있어요.
              </div>
            </div>
          </div>
          <div className={styles.listBlock}>
            <div className={styles.imageContainer2} />
            <div className={styles.imageDescription}>
              <div className={styles.descriptionTitle}>초대</div>
              <div className={styles.descriptionText}>
                새로운 팀원을 초대할 수 있어요.
              </div>
            </div>
          </div>
          <div className={styles.listBlock}>
            <div className={styles.imageContainer3} />
            <div className={styles.imageDescription}>
              <div className={styles.descriptionTitle}>구성원</div>
              <div className={styles.descriptionText}>
                구성원을 초대하고 내보낼 수 있어요.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
