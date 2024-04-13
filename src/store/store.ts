import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "./modules/auth/authApi";
import { dynamicFormApi } from "./modules/dynamic-form/dynamicFormApi";
import { gisFormApi } from "./modules/gis-file/gisFileApi";
import { chartApi } from "./modules/chart/chartApi";
import { ExcelFileApi } from "./modules/excel/excelFileApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(dynamicFormApi.middleware)
      .concat(gisFormApi.middleware)
      .concat(chartApi.middleware)
      .concat(ExcelFileApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
