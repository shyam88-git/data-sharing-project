import { useAppSelector } from "../../../store/hook";
import { useGetFormsAndFieldsQuery } from "../../../store/modules/chart/chartApi";
import NewChartForm from "./NewChartForm";

const ChartForm = () => {
  // REDUX
  const activeGis = useAppSelector((state) => state.gisFile.activeGis);
  const { data: formListData } = useGetFormsAndFieldsQuery({
    gisId: activeGis?.id.toString() || "",
  });
  return (
    <>
      <NewChartForm
        formList={formListData || []}
        gisId={activeGis?.id.toString() || ""}
      />
    </>
  );
};

export default ChartForm;
