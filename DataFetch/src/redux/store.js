import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "./feature/post-api/postSlice";
import { api } from "./feature/post-api/authApi";
import authSlice from "../redux/feature/post-api/authSlice"
import { userTodoApi } from "./feature/todo-api/todoApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [todoApi.reducerPath]: todoApi.reducer,
    [api.reducerPath]: api.reducer,
    [userTodoApi.reducerPath]: userTodoApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware, api.middleware, userTodoApi.middleware),
});

