import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../../config/baseUrl";
import { getAuthorizationHeader } from "../../../utils/helpers/storage";

const apiBaseUrl = baseUrl;

export const ExcelFileApi = createApi({
  reducerPath: "ExcelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  }),
  endpoints: (builder) => ({
    uploadExcel: builder.mutation<Blob, { customFormId: string, data: FormData }>({
      query: ({ customFormId, data }) => ({
        url: `/custom-form/${customFormId}/upload-excel/`,
        method: "POST",
        body: data,
      }),
    }),
    downloadExcel: builder.query<Blob, string|undefined>({
      query: (customFormId) => ({
        url: `/custom-form/${customFormId}/sample-excel/`,
        method: "GET",
        responseType: "blob",
      }),
    }),
  }),
});

export const { useUploadExcelMutation, useDownloadExcelQuery, useLazyDownloadExcelQuery } = ExcelFileApi;
