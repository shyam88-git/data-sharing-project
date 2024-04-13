import { useLocation } from "react-router-dom";
import AuthNavbar from "../components/Navbar/AuthNavbar";
import MainLayout from "./MainLayout";

interface PropsI {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: PropsI) => {
  const { pathname } = useLocation();
  const height = `calc(100vh - 107px)`;

  // REDUX

  if (pathname === "/") return <>{children}</>;

  return (
    <MainLayout>
      <AuthNavbar />
      <div className="relative w-full " style={{ height }}>
        {children}
      </div>
    </MainLayout>
  );
};

export default AuthLayout;
