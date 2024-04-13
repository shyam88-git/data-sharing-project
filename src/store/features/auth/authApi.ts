import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { initAuthUser, initVerifyUser, logout } from "./authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    login: builder.mutation<any, { username_or_phone: string; password: string }>({
      query: (body) => ({
        url: "/login/token/",
        method: "POST",
        body,
      }),
      onQueryStarted(_args, { dispatch, queryFulfilled }) {
        queryFulfilled.then((data) => {
          dispatch(initAuthUser(data.data));
        });
      },
    }),
    verifyToken: builder.mutation<VerifyUserPayload, { token: string }>({
      query: (body) => ({
        url: "/token/verify/",
        method: "POST",
        headers: {},
        body,
      }),
      onQueryStarted(_args, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((data) => {
            dispatch(initVerifyUser(data.data));
          })
          .catch(() => {
            dispatch(logout());
          });
      },
    }),
    signup: builder.mutation<SignupSuccessPayload, SignupPayload>({
      query: (data) => ({
        url: `/user/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyTokenMutation,
  useSignupMutation,
} = authApi;