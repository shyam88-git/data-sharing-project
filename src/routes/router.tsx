import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import { ProtectedLayout } from "../layouts/ProtectLayout";
import ChildRoutes from "./ChildRoutes";
import AuthLayout from "../layouts/AuthLayout";
import NotFoundPage from "../pages/NotFoundPage";
import LandingPage from "../pages/landing/LandingPage";
import Signup from "../pages/auth/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedLayout>
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      </ProtectedLayout>
    ),
    errorElement: <NotFoundPage />,
    children: ChildRoutes,
  },
  {
    path: "/home",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
