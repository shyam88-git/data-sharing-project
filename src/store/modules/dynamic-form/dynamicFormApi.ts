import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../../config/baseUrl";
import {
  SelectTypeI,
  SearchParamsI,
  DynamicObjectArrayType,
} from "../../../utils/interfaces/common";
import { getAuthorizationHeader } from "../../../utils/helpers/storage";

export interface DynamicFormFieldI {
  name: string;
  form_type: string;
  required: boolean;
  select_field: SelectTypeI[] | null;
}

export interface DynamicFormI {
  id?: string;
  gis_file: string;
  feature_ids?: any;
  name: string;
  form_fields: DynamicFormFieldI[];
}

interface GetAllDynamicFormResponseI {
  current_page: number;
  total: number;
  per_page: number;
  total_pages: number;
  results: DynamicFormI[];
}

interface DynamicFormDTO {
  id?: string;
  name: string;
  form_fields: DynamicFormFieldI[];
}
interface DynamicFormUpdateDTO {
  id: string;
  data: DynamicFormI;
}

export interface AllDynamicFormDataResponseI {
  current_page: number;
  total: number;
  per_page: number;
  total_pages: number;
  results: DynamicObjectArrayType;
}

export interface FilterFieldI {
  value: string;
  label: string;
  type: string;
  options: [
    {
      value: string;
    }
  ];
}

export const dynamicFormApi = createApi({
  reducerPath: "dynamicFormApi",
  tagTypes: ["dynamicForm"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  }),
  endpoints: (builder) => ({
    getAllDynamicForm: builder.query<
      GetAllDynamicFormResponseI,
      { id?: string; feature?: string; params: SearchParamsI }
    >({
      query: ({ id, feature, params: { search, page, per_page } }) => ({
        url: `/custom-form/?${id ? "gis_file=" + id : ""}${
          feature ? "&feature=" + feature : ""
        }&search=${search}&page=${page}&per_page=${per_page}`,
      }),
      providesTags: ["dynamicForm"],
    }),
    getDynamicFormById: builder.query<DynamicFormI, { id: string }>({
      query: ({ id }) => ({
        url: `/custom-form/${id}`,

        providesTags: ["dynamicForm"],
      }),
    }),
    postDynamicForm: builder.mutation<DynamicFormI, DynamicFormDTO>({
      query: (data) => ({
        url: `/custom-form/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["dynamicForm"],
    }),

    updateDynamicForm: builder.mutation<any, DynamicFormUpdateDTO>({
      query: ({ id, data }) => ({
        url: `/custom-form/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["dynamicForm"],
    }),

    deleteDynamicForm: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/custom-form/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["dynamicForm"],
    }),
    getAllDynamicFormData: builder.query<
      AllDynamicFormDataResponseI,
      { id: string; params: SearchParamsI; propertyId?: string }
    >({
      query: ({
        id,
        propertyId,
        params: { search, page, per_page, filter },
      }) => ({
        url: `/custom-form/${id}/dynamic-form-data/?search=${search}&page=${page}&per_page=${per_page}${
          propertyId ? "&property=" + propertyId : ""
        }${
          filter
            ? "&" +
              filter
                .map((field) =>
                  Object.entries(field)
                    .map(([key, value]) => `${key}=${value}`)
                    .join(", ")
                )
                .join("&")
            : ""
        }`,
      }),
      providesTags: ["dynamicForm"],
    }),
    getDynamicFormDataById: builder.query<any, { id: string; formId: string }>({
      query: ({ id, formId }) => ({
        url: `/custom-form/${id}/dynamic-form-data/${formId}/`,
      }),
      providesTags: ["dynamicForm"],
    }),
    addDynamicFormData: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/custom-form/${id}/dynamic-form-data/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["dynamicForm"],
    }),
    updateDynamicFormData: builder.mutation<
      any,
      { id: string; formId: string; data: any }
    >({
      query: ({ id, formId, data }) => ({
        url: `/custom-form/${id}/dynamic-form-data/${formId}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["dynamicForm"],
    }),
    deleteDynamicFormData: builder.mutation<
      any,
      { id: string; formId: string }
    >({
      query: ({ id, formId }) => ({
        url: `/custom-form/${id}/dynamic-form-data/${formId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["dynamicForm"],
    }),
    getFilterableFields: builder.query<
      { fields: FilterFieldI[] },
      { formId: string }
    >({
      query: ({ formId }) => ({
        url: `/custom-form/${formId}/filter-fields/`,
      }),
      providesTags: ["dynamicForm"],
    }),
    uploadExcel: builder.mutation<any, { formId: string; data: FormData }>({
      query: ({ formId, data }) => ({
        url: `/custom-form/${formId}/upload-excel/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["dynamicForm"],
    }),
  }),
});

export const {
  useGetAllDynamicFormQuery,
  useGetDynamicFormByIdQuery,
  usePostDynamicFormMutation,
  useUpdateDynamicFormMutation,
  useDeleteDynamicFormMutation,
  useAddDynamicFormDataMutation,
  useUpdateDynamicFormDataMutation,
  useDeleteDynamicFormDataMutation,
  useGetAllDynamicFormDataQuery,
  useGetDynamicFormDataByIdQuery,
  useGetFilterableFieldsQuery,
} = dynamicFormApi;
