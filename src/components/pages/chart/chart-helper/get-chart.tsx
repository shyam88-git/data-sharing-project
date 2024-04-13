import { ChartData, ChartOptions } from "chart.js";
import { ChartTypeEnum } from "../../../../utils/interfaces/chart-type";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

export function getCartComponent(
  type: ChartTypeEnum,
  data: ChartData,
  option: ChartOptions
) {
  switch (type) {
    case ChartTypeEnum.BAR:
      return (
        <Bar
          options={option as ChartOptions<"bar">}
          width={700}
          height={700}
          data={data as ChartData<"bar">}
        />
      );
    case ChartTypeEnum.LINE:
      return (
        <Line
          options={option as ChartOptions<"line">}
          width={700}
          height={700}
          data={data as ChartData<"line">}
        />
      );
    case ChartTypeEnum.PIE:
      return (
        <Pie
          options={option as ChartOptions<"pie">}
          width={700}
          height={700}
          data={data as ChartData<"pie">}
        />
      );
    case ChartTypeEnum.DOUGHNUT:
      return (
        <Doughnut
          options={option as ChartOptions<"doughnut">}
          width={700}
          height={700}
          data={data as ChartData<"doughnut">}
        />
      );
  }

  // return (
  //   <Chart
  //     type="bar"
  //     options={option as ChartOptions<"bar">}
  //     width={700}
  //     height={700}
  //     data={data as ChartData<"bar">}
  //   />
  // );
}
