import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SingupPage/SignupPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MyPage from "./pages/MyPage/MyPage";
import Layout from "./Layout";
import DashBoardsPage from "./pages/DashBoardsPage/DashBoardsPage";
import DashBoardPage from "./pages/DashBoardPage/DashBoardPage";
import DashBoardRedirector from "./DashBoardRedirector";
import DashBoardEditPage from "./pages/DashBoardEditPage/DashBoardEditPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashBoardRedirector />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <DashBoardsPage />,
      },
      {
        path: "dashboard/:id",
        element: <DashBoardPage />,
      },
      {
        path: "dashboard/:id/edit",
        element: <DashBoardEditPage />
      }, 
      {
        path: "mypage",
        element: <MyPage />,
      },
    ],
  },
]);

const Router = () => (
  <>
    <RouterProvider router={router} />
  </>
);

export default Router;
