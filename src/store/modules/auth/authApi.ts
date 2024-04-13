import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../../config/baseUrl";

export interface LoginI {
  username_or_phone: string;
  password: string;
}

interface AuthDTO {
  data: LoginI;
}

interface LoginResponseI {
  status: number;
  Success: string;
  data: {
    refresh: string;
    access: string;
  };
  user: {
    id: string;
    username: string;
    email: string;
    mobile_number: string | null;
    first_name: string;
    middle_name: string | null;
    last_name: string;
  };
}

interface SingupDTO {
  data: SignupI;
}

export interface SignupI {
  username: string;
  email: string;
  last_name: string;
  first_name: string;
  mobile_number: string;
  password: string;
  confirm_password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["auth"],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponseI, AuthDTO>({
      query: ({ data }) => ({
        url: "/login/token/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    signupUser: builder.mutation<any, SingupDTO>({
      query: ({ data }) => ({
        url: `/user/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useSignupUserMutation } = authApi;
