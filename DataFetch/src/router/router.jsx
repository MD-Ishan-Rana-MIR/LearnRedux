import { createBrowserRouter } from "react-router-dom";
import TodoPage from "../page/TodoPage";

export  const router = createBrowserRouter([
    {
        path : "/",
        element : <TodoPage></TodoPage>
    }
])