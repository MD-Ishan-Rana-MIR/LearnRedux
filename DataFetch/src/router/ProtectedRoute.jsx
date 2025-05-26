import { Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token; // returns true if token exists
};

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;
