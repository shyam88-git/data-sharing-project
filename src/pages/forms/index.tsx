import { useGetAllDynamicFormQuery } from "../../store/modules/dynamic-form/dynamicFormApi";

import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import { useAppSelector } from "../../store/hook";
import { Navigate } from "react-router-dom";
import GisFormPage from "../../components/pages/forms/gis-form/GisFormPage";
import GisFormEmptyPage from "../../components/pages/forms/gis-form/GisFormEmptyPage";

const FormsPage = () => {
  const activeGis = useAppSelector((store) => store.gisFile.activeGis);
  const { data: dynamicFormList, isLoading } = useGetAllDynamicFormQuery({
    id: activeGis?.id?.toString() || "",
    params: {
      page: 1,
      per_page: 1000,
    },
  });

  if (!activeGis?.id) return <Navigate to="/dashboard" />;
  if (isLoading) return <LoadingSpinner />;
  if (!dynamicFormList?.results?.length) return <GisFormEmptyPage />;
  return <GisFormPage formData={dynamicFormList?.results || []} />;
};

export default FormsPage;
