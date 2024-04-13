import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./modules/auth/authApi";
import { dynamicFormApi } from "./modules/dynamic-form/dynamicFormApi";
import { gisFormApi } from "./modules/gis-file/gisFileApi";
import gisFileReducer from "./modules/gis-file/gisFileSlice";
import { chartApi } from "./modules/chart/chartApi";
import { ExcelFileApi } from "./modules/excel/excelFileApi";

const rootReducer = combineReducers({
  gisFile: gisFileReducer,
  [authApi.reducerPath]: authApi.reducer,
  [dynamicFormApi.reducerPath]: dynamicFormApi.reducer,
  [gisFormApi.reducerPath]: gisFormApi.reducer,
  [chartApi.reducerPath]: chartApi.reducer,
  [ExcelFileApi.reducerPath]:ExcelFileApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
