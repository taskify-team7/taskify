import styles from "./SignupPage.module.css";
import AuthPageLogo from "../../components/AuthPage/AuthPageLogo";
import AuthPageRedirector from "../../components/AuthPage/AuthPageRedirector";
import SignupForm from "../../components/AuthPage/SignupForm";
import { signUp } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  async function handleSignup(data: object) {
    try {
      await signUp(data);
      alert("회원가입 완료");
      navigate("/login");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  }
  return (
    <div className={styles.container}>
      <AuthPageLogo welcomeText="첫 방문을 환영합니다!" />
      <SignupForm handleSignup={handleSignup} />
      <AuthPageRedirector
        text="이미 가입하셨나요?"
        redirectText="로그인하기"
        redirectLink="/login"
      />
    </div>
  );
}
