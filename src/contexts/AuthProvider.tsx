import { toast } from "react-toastify";
import { logIn } from "../api/auth";
import { createContext, useContext } from "react";

const AuthContext = createContext<{
  getUser: () => any;
  contextLogin: (arg0: any) => void;
  contextLogout: () => void;
}>({
  getUser: () => null,
  contextLogin: () => {},
  contextLogout: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  function getUser() {
    const item = localStorage.getItem("user");
    if (!item || item === "undefined") {
      return null;
    }
    const parsed = JSON.parse(item);
    return parsed;
  }

  async function contextLogin(data: { email: string; password: string }) {
    const result = await logIn(data);
    if (typeof result === "string") {
      toast.error(result);
    }
    localStorage.setItem("user", JSON.stringify(result.user));
    localStorage.setItem("token", result.accessToken);
    toast.success(result.user.nickname + "님 반갑습니다");
  }

  async function contextLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ getUser, contextLogin, contextLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("context 안에서 사용하세요");
  }
  return context;
}
