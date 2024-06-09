import styles from "./LandingPage.module.css";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import Footer from "../../components/LandingFooter/Footer";
import { Link } from "react-router-dom";
import { useDownload } from "../../hooks/useDownload";

export default function Home() {
  const { handleInstallClick } = useDownload();
  return (
    <div className={styles.container}>
      <LandingNavbar />
      <div className={styles.main_layout}>
        <div className={styles.introBox}>
          <img src="/Image/mainImg.svg" alt="taskify" />
          <h2>
            새로운 일정 관리 <strong>Taskify</strong>
          </h2>
          <p>작업 일정을 손쉽게 관리하세요 !</p>
          <div className={styles.button_list}>
            <button className={styles.login_link} onClick={handleInstallClick}>
              애플리케이션 다운로드
            </button>
            <Link to="/login">
              <button className={styles.login_link}>로그인하기</button>
            </Link>
          </div>
        </div>
        <div className={styles.explanationBox}>
          <div className={styles.explanationBox_text}>
            <p>Point 1</p>
            <p>
              일의 우선순위를 <br />
              관리하세요
            </p>
          </div>
          <div
            className={`${styles.explanationBox_image} ${styles.priorityImg}`}
          >
            <img src="/Image/priorityImg.svg" alt="explanation" />
          </div>
        </div>
        <div className={styles.explanationBox}>
          <div className={`${styles.explanationBox_image} ${styles.todoImg}`}>
            <img src="/Image/todoImg.svg" alt="explanation" />
          </div>
          <div className={styles.explanationBox_text}>
            <p>Point 2</p>
            <p>
              해야할 일을
              <br /> 등록하세요
            </p>
          </div>
        </div>
        <div className={styles.settingBox}>
          <h3>생산성을 높이는 다양한 설정 ⚡</h3>
          <div className={styles.settingList}>
            <div className={styles.settingItem}>
              <div className={styles.settingItem_image}>
                <img src="Image/settingImg1.svg" alt="setting_image" />
              </div>
              <div className={styles.settingItem_text}>
                <p>대시보드 설정</p>
                <p>대시보드 사진과 이름을 변경할 수 있어요.</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <div className={styles.settingItem_image}>
                <img src="Image/settingImg2.svg" alt="setting_image" />
              </div>
              <div className={styles.settingItem_text}>
                <p>초대</p>
                <p>새로운 팀원을 초대할 수 있어요.</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <div className={styles.settingItem_image}>
                <img src="Image/settingImg3.svg" alt="setting_image" />
              </div>
              <div className={styles.settingItem_text}>
                <p>구성원</p>
                <p>구성원을 초대하고 내보낼 수 있어요</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
