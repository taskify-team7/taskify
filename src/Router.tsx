import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SingupPage/SignupPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "dashboard/:id",
        element: <DashboardPage />,
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
]);

const Router = () => (
  <>
    <RouterProvider router={router} />
  </>
);

export default Router;
