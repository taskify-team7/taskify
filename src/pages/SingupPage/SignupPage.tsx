import styles from "./SignupPage.module.css";
import AuthPageLogo from "../../components/AuthPage/AuthPageLogo";
import AuthPageRedirector from "../../components/AuthPage/AuthPageRedirector";

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <AuthPageLogo welcomeText="첫 방문을 환영합니다!" />
      <div>내용</div>
      <div>내용</div>
      <div>내용</div>
      <AuthPageRedirector
        text="이미 가입하셨나요?"
        redirectText="로그인하기"
        redirectLink="/login"
      />
    </div>
  );
}
