import { ChartTypeEnum } from "../../../../utils/interfaces/chart-type";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJs,
  // Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { getCartComponent } from "./get-chart";
import { initialChartOptions } from "./chart-option";

ChartJs.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  // Legend,
  Tooltip,
  ArcElement
);
interface PropsI {
  type: ChartTypeEnum;
  data: ChartData;
  title: string;
}
const ChartWrapper = ({ type, data, title }: PropsI) => {
  return (
    <div className="w-[600px] h-[560px] mb-16">
      <h1 className="text-center font-bold">
        <span className="uppercase">{type}</span> Chart for
        <span className="capitalize">{title}</span>
      </h1>
      <div className="w-full border border-solid border-slate-200 rounded-md shadow-md flex justify-center items-center p-8">
        {getCartComponent(type, data, initialChartOptions)}
      </div>
    </div>
  );
};

export default ChartWrapper;
