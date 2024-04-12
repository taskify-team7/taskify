import styles from "./LoginPage.module.css";
import AuthPageLogo from "../../components/AuthPage/AuthPageLogo";
import AuthPageRedirector from "../../components/AuthPage/AuthPageRedirector";
import LoginForm from "../../components/AuthPage/LoginForm";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <AuthPageLogo welcomeText="오늘도 만나서 반가워요!" />
      <LoginForm />
      <AuthPageRedirector
        text="회원이 아니신가요?"
        redirectText="회원가입하기"
        redirectLink="/signup"
      />
    </div>
  );
}
