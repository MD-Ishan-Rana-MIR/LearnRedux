import { createBrowserRouter } from "react-router-dom";
import Loyout from "../layout/Loyout";
import LoginFrom from "../components/login/LoginFrom";
import RegisterForm from "../components/register/RegisterForm";
import OtpVerify from "../components/register/OtpVerify";
import UserProfile from "../page/user-profile/UserProfile";
import ProtectedRoute from "./ProtectedRoute";
import TodoCreateFrom from "../page/todo/TodoCreateFrom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Loyout></Loyout>,
        children: [
            {
                path: "login",
                element: <LoginFrom></LoginFrom>
            },
            {
                path: "register",
                element: <RegisterForm></RegisterForm>
            },
            {
                path: "otp-verify",
                element: <OtpVerify></OtpVerify>
            },
            {
                path: "profile",
                element: <ProtectedRoute><UserProfile></UserProfile></ProtectedRoute>
            },
            {
                path : "create-todo",
                element : <ProtectedRoute> <TodoCreateFrom></TodoCreateFrom> </ProtectedRoute>
            }
        ]
    }
])