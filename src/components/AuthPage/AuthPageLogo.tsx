import styles from "./AuthPage.module.css";
import LogoImageSvg from "../../assets/largeLogo.svg";
import { useNavigate } from "react-router-dom";

export default function AuthPageLogo({ welcomeText }: { welcomeText: string }) {
  const navigate = useNavigate();
  return (
    <div className={styles.imageBox}>
      <img
        className={styles.logoImage}
        src={LogoImageSvg}
        alt="logo"
        onClick={() => navigate("/")}
      />
      <div className={styles.welcomeText}>{welcomeText}</div>
    </div>
  );
}
