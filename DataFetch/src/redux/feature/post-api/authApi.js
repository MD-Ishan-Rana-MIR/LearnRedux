// services/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../../base-url/baseUrl";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.token || localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["auth"],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: "/auth/loginUser",
                method: "POST",
                body: data,
            }),
        }),

        registrationUser: builder.mutation({
            query: (data) => ({
                url: "/auth/registration",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["auth"],
        }),

        getProfile: builder.query({
            query: () => "/auth/profile",
        }),
        otpVerify: builder.mutation({
            query: (data) => ({
                url: "/auth/otpVerify",
                method: "POST",
                body: data

            }),
            invalidatesTags: ["auth"]
        })
    }),
});

export const {
    useLoginUserMutation,
    useGetProfileQuery,
    useRegistrationUserMutation,
    useOtpVerifyMutation
} = api;
