import { SelectTypeI } from "./common";

export const ChartTypes: SelectTypeI[] = [
  { label: "Bar Chart", value: "BAR" },
  { label: "Pie Chart", value: "PIE" },
];
export const OperationTypes: SelectTypeI[] = [
  { label: "Count", value: "Count" },
];

export enum ChartTypeEnum {
  BAR = "bar",
  LINE = "line",
  PIE = "pie",
  DOUGHNUT = "doughnut",
}

export const chartTypeFinder = (keyword: string) => {
  const upperCaseKeyword = keyword.toUpperCase();
  switch (upperCaseKeyword) {
    case "BAR":
      return ChartTypeEnum.BAR;
    case "LINE":
      return ChartTypeEnum.LINE;
    case "PIE":
      return ChartTypeEnum.PIE;
    case "DOUGHNUT":
      return ChartTypeEnum.DOUGHNUT;
    default:
      return ChartTypeEnum.BAR;
  }
};
