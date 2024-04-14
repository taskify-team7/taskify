import { useEffect } from "react";
import client from "./api/axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";

export default function LoginRedirector({ children }: { children: any }) {
  const navigate = useNavigate();
  const { getUser, contextLogout } = useAuth();

  useEffect(() => {
    const requestInterceptor = client.interceptors.request.use(function (
      config
    ) {
      const token = localStorage.getItem("token");
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    });
    const responseInterceptor = client.interceptors.response.use(
      function (response: any) {
        return response;
      },
      function (error: any) {
        const status = error.response?.status;
        if (status === 401) {
          contextLogout();
          console.log(
            "server responded with 401 status. redirecting to login page."
          );
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
    return () => {
      client.interceptors.response.eject(requestInterceptor);
      client.interceptors.response.eject(responseInterceptor);
    };
  }, [contextLogout, navigate]);
  if (!getUser()) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
