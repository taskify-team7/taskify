import styles from "./SignupPage.module.css";
import AuthPageLogo from "../../components/AuthPage/AuthPageLogo";
import AuthPageRedirector from "../../components/AuthPage/AuthPageRedirector";
import SignupForm from "../../components/AuthPage/SignupForm";
import { signUp } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignUpRequestbody } from "../../api/schema/requestType";

export default function SignupPage() {
  const navigate = useNavigate();

  async function handleSignup(data: SignUpRequestbody) {
    const response = await signUp(data);
    if (typeof response === "string") {
      toast.error(response);
    } else {
      toast.success("회원가입 되었습니다.");
      navigate("/login");
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
