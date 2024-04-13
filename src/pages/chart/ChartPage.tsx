import { useSearchParams } from "react-router-dom";
import { NavMenuI } from "../../components/Navbar/NavMenu";
import SideNavbar from "../../components/Navbar/SideNavbar";
import DashboardLayout from "../../layouts/DashboardLayout";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineTableChart } from "react-icons/md";
import ChartList from "../../components/pages/chart/ChartList";
import ChartForm from "../../components/pages/chart/ChartForm";
import ChartDiagram from "../../components/pages/chart/ChartDiagram";

const navMenu: NavMenuI[] = [
  {
    icon: MdOutlineTableChart,
    name: "Charts",
    path: "?charts=show-all",
  },
  {
    icon: IoMdAddCircleOutline,
    name: "Create",
    path: "?create=new",
  },
];

const ChartPage = () => {
  const [searchParams] = useSearchParams();

  const showChartList = !!searchParams.get("charts");
  const creactNewChart = !!searchParams.get("create");
  const showChartDiagram = !!searchParams.get("diagram");

  return (
    <div className="flex h-full">
      <SideNavbar navMenu={navMenu} />
      <DashboardLayout title="Chart">
        <section className="bg-white py-8 px-14 overflow-hidden">
          {showChartList && <ChartList />}
          {creactNewChart && <ChartForm />}
          {showChartDiagram && <ChartDiagram />}
        </section>
      </DashboardLayout>
    </div>
  );
};

export default ChartPage;
