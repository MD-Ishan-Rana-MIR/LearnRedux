import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../../base-url/baseUrl";



export const userTodoApi = createApi({
    reducerPath: "userTodoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.token || localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: [`todo`],
    endpoints: (builder) => ({
        todoCreateApi: builder.mutation({
            query: (data) => ({
                url: "/todo/createTodo",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["todo"]
        })
    })
});

export const { useTodoCreateApiMutation } = userTodoApi