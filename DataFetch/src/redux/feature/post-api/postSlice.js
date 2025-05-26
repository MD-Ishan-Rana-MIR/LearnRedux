import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `https://jsonplaceholder.typicode.com`
    }),
    tagTypes : ["Posts"],
    endpoints: (build) => ({
        getAllTodo: build.query({
            query: () => `/todos`
        }),
        
    })
})


export const { useGetAllTodoQuery } = todoApi;
