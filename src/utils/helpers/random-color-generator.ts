import { ChartTypeEnum } from "../interfaces/chart-type";

export const randomRgbColorGenerator = () => {
  const R = Math.floor(Math.random() * 256);
  const G = Math.floor(Math.random() * 256);
  const B = Math.floor(Math.random() * 256);

  return `rgb(${R},${G},${B})`;
};

export const createBackgroundColor = (type: ChartTypeEnum, length: number) => {
  if (type === ChartTypeEnum.DOUGHNUT || type === ChartTypeEnum.PIE) {
    const colorArray = [];
    for (let i = 0; i < length; i++) {
      colorArray.push(randomRgbColorGenerator());
    }
    return colorArray;
  } else return randomRgbColorGenerator();
};
