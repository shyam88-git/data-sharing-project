import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hook";
import useToastHook from "../utils/hooks/toast/useToastHook";

interface DashboardLayoutProps {
  title: string;
  children: React.ReactNode;
}
const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const { pathname } = useLocation();
  const { showToast } = useToastHook();

  // REDUX
  const activeGis = useAppSelector((state) => state.gisFile.activeGis);

  if (!activeGis?.id && pathname !== "/dashboard") {
    showToast("Please select GIS file", { type: "info" });
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="h-full w-full overflow-y-auto hidden-scrollbar bg-primary-gray-150 py-6 px-12 ">
      <p className="font-semibold text-2xl leading-4xl">{title}</p>
      <div className="mt-2 w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
