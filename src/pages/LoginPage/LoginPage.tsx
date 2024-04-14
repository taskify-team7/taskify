import styles from "./LoginPage.module.css";
import AuthPageLogo from "../../components/AuthPage/AuthPageLogo";
import AuthPageRedirector from "../../components/AuthPage/AuthPageRedirector";
import LoginForm from "../../components/AuthPage/LoginForm";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { contextLogin } = useAuth();
  const navigate = useNavigate();
  async function handleLogin(data: { email: string; password: string }) {
    try {
      await contextLogin(data);
      navigate("/dashboard");
    } catch (error: any) {}
  }
  return (
    <div className={styles.container}>
      <AuthPageLogo welcomeText="오늘도 만나서 반가워요!" />
      <LoginForm handleLogin={handleLogin} />
      <AuthPageRedirector
        text="회원이 아니신가요?"
        redirectText="회원가입하기"
        redirectLink="/signup"
      />
    </div>
  );
}
