import styles from "./SignupPage.module.css";
import AuthPageLogo from "../../components/AuthPage/AuthPageLogo";
import AuthPageRedirector from "../../components/AuthPage/AuthPageRedirector";
import SignupForm from "../../components/AuthPage/SignupForm";

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <AuthPageLogo welcomeText="첫 방문을 환영합니다!" />
      <SignupForm />
      <AuthPageRedirector
        text="이미 가입하셨나요?"
        redirectText="로그인하기"
        redirectLink="/login"
      />
    </div>
  );
}
