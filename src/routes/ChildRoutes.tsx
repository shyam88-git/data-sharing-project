import { Navigate } from "react-router-dom";
import ChartPage from "../pages/chart/ChartPage";
import FormsPage from "../pages/forms";
import InfoPage from "../pages/info/InfoPage";
import TablePage from "../pages/table/TablePage";
import DynamicFormPage from "../pages/form";
import MapPage from "../pages/gis-map/MapPage";
import DynamicFormUpdatePage from "../pages/form/DynamicFormUpdate";
import Dashboard from "../pages/dashboard/Dashboard";
import GisFormDataList from "../components/pages/forms/gis-form-data/GisFormDataList";
import DynamicForm from "../components/pages/forms/gis-form/DynamicForm";
import UpdateDynamicForm from "../components/pages/forms/gis-form/UpdateDynamicForm";

const ChildRoutes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "map",
    element: <MapPage />,
  },

  {
    path: "table",
    element: <TablePage />,
  },
  {
    path: "chart",
    element: <ChartPage />,
  },
  {
    path: "info",
    element: <InfoPage />,
  },
  {
    path: "forms",
    element: <FormsPage />,
  },
  {
    path: "forms/:id",
    element: <GisFormDataList />,
  },
  {
    path: "forms/:id/create",
    element: <DynamicFormPage />,
  },
  {
    path: "forms/:id/update",
    element: <DynamicFormUpdatePage />,
  },

  {
    path: "forms/create",
    element: <DynamicForm />,
  },
  {
    path: "forms/update/:id",
    element: <UpdateDynamicForm />,
  },
];

export default ChildRoutes;
