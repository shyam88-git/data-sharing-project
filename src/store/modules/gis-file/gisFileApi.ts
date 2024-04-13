import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../../config/baseUrl";
import { getAuthorizationHeader } from "../../../utils/helpers/storage";
import { GeoJsonI } from "../../../utils/interfaces/geoJson";
import { SearchParamsI } from "../../../utils/interfaces/common";

export interface GisFileI {
  id: number;
  name: string;
  geojson?: GeoJsonI;
}

export interface IGisProperties {
  _id: string;
  name: string | null;
  rd_name: string | null;
  ref_num: string | null;
  ward_no: string | null;
  feature_id: string;
  data_count:string;
}

export interface IGisPropertiesResponse {
  current_page: number;
  total: number;
  per_page: number;
  total_pages: number;
  results: IGisProperties[];
}

export interface GisAllFileResponseI {
  current_page: number;
  total: number;
  per_page: number;
  total_pages: number;
  results: GisFileI[];
}

export const gisFormApi = createApi({
  reducerPath: "gisFormApi",
  tagTypes: ["gisForm"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  }),
  endpoints: (builder) => ({
    getAllGisFile: builder.query<
      GisAllFileResponseI,
      { params: SearchParamsI }
    >({
      query: ({ params: { search, page, per_page } }) => ({
        url: `/gis-file-upload/?search=${search}&page=${page}&per_page=${per_page}`,
        method: "GET",
      }),
      providesTags: ["gisForm"],
    }),
    getGisFileById: builder.query<GisFileI, { id: string }>({
      query: ({ id }) => ({
        url: `/gis-file-upload/${id}/`,
      }),
      providesTags: ["gisForm"],
    }),
    postGisFile: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `/gis-file-upload/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["gisForm"],
    }),
    deleteGisFile: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/gis-file-upload/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["gisForm"],
    }),
    updateGisFile: builder.mutation<any, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/gis-file-upload/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["gisForm"],
    }),
    getGisProperties: builder.query<
      IGisPropertiesResponse,
      { id: string; params: SearchParamsI }
    >({
      query: ({ id, params: { search, page, per_page } }) => ({
        url: `/gis-file-upload/${id}/properties/?search=${search}&page=${page}&per_page=${per_page}`,
      }),
      providesTags: ["gisForm"],
    }),
  }),
});

export const {
  useGetAllGisFileQuery,
  useGetGisFileByIdQuery,
  usePostGisFileMutation,
  useDeleteGisFileMutation,
  useUpdateGisFileMutation,
  useGetGisPropertiesQuery,
} = gisFormApi;
