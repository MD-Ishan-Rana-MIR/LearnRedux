import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        user: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            console.log("Setting credentials:", action.payload); // Debug log
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;
            localStorage.setItem("token", `${token}`);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
