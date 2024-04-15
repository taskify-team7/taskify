import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

export default function Navbar() {
  const { contextLogout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    contextLogout();
    navigate("/login");
  }
  return (
    <div>
      나브바
      <button onClick={handleLogout}>로그아웃버튼</button>
    </div>
  );
}
