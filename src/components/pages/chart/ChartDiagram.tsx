import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ChartTypeEnum,
  chartTypeFinder,
} from "../../../utils/interfaces/chart-type";
import ChartWrapper from "./chart-helper/ChartWrapper";
import { useRetrieveChartQuery } from "../../../store/modules/chart/chartApi";
import { useEffect, useState } from "react";
import { ChartData } from "chart.js";
import Button from "../../ui/button/Button";
import { dummyChartData } from "./dummy/Data";
import { createBackgroundColor } from "../../../utils/helpers/random-color-generator";
import LoadingSpinner from "../../spinner/LoadingSpinner";

const ChartDiagram = () => {
  const [searchParams] = useSearchParams();
  const chartId = searchParams.get("id");
  const navigate = useNavigate();

  // STATE
  const [chartDataSet, setChartDataSet] = useState<ChartData>(dummyChartData);
  const [chartType, setChartType] = useState<ChartTypeEnum>(ChartTypeEnum.BAR);

  // REDUX
  const { data: chartData, isLoading } = useRetrieveChartQuery({
    chartId: chartId || "",
  });

  // USE EFFECT
  useEffect(() => {
    if (chartData?.total) {
      const dataSet: ChartData = {
        labels: chartData.results.map((data) => data.label),
        datasets: [
          {
            label: chartData.chart_details.title,
            data: chartData.results.map((data) => data.data),
            backgroundColor: createBackgroundColor(
              chartType,
              chartData.results.length
            ),
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      };

      setChartDataSet(dataSet);
      if (chartData.chart_details.chart)
        setChartType(chartTypeFinder(chartData.chart_details.chart));
    }
  }, [chartData]);

  return (
    <>
      <Button.Group otherStyles="justify-end text-white">
        <Button
          variant="focus"
          rounded="rounded-full"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </Button.Group>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full flex flex-wrap gap-24 p-8">
          <ChartWrapper
            type={ChartTypeEnum.BAR}
            data={chartDataSet}
            title={chartData?.chart_details.form_field || "Demo"}
          />
          <ChartWrapper
            type={ChartTypeEnum.LINE}
            data={chartDataSet}
            title={chartData?.chart_details.form_field || "Demo"}
          />
          <ChartWrapper
            type={ChartTypeEnum.DOUGHNUT}
            data={chartDataSet}
            title={chartData?.chart_details.form_field || "Demo"}
          />
          <ChartWrapper
            type={ChartTypeEnum.PIE}
            data={chartDataSet}
            title={chartData?.chart_details.form_field || "Demo"}
          />
        </div>
      )}
    </>
  );
};

export default ChartDiagram;
