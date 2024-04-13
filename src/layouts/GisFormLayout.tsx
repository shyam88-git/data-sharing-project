import DashboardLayout from "./DashboardLayout";

interface GisFormLayoutProps {
  children: React.ReactNode;
}
const GisFormLayout = ({ children }: GisFormLayoutProps) => {
  return <DashboardLayout title="Gis Form">{children}</DashboardLayout>;
};

export default GisFormLayout;
