import { ChartOptions, ChartTypeRegistry } from "chart.js";

export const initialChartOptions: ChartOptions<keyof ChartTypeRegistry> = {
  responsive: true,
  maintainAspectRatio: true,
  indexAxis: "x" as const,
  scales: {
    x: {
      stacked: false,
      border: {
        color: "#050B22",
        width: 2,
      },
    },
    y: {
      stacked: false,
      border: {
        color: "#050B22",
        width: 2,
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};
