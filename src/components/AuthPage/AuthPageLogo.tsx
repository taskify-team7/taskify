import styles from "./AuthPage.module.css";
import LogoImageSvg from "../../assets/logo-image.svg";
import LogoTextSvg from "../../assets/logo-text.svg";
import { useNavigate } from "react-router-dom";

export default function AuthPageLogo({ welcomeText }: { welcomeText: string }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container} onClick={() => navigate("/")}>
        <img className={styles.logoImage} src={LogoImageSvg} alt="logo" />
        <img className={styles.logoText} src={LogoTextSvg} alt="logo" />
      </div>
      <div className={styles.welcomeText}>{welcomeText}</div>
    </>
  );
}
