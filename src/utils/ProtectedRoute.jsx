import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const { userInfo } = useSelector((state) => state.auth);

    console.log("🔍 Checking access for role:", userInfo?.role);

    // Redirect to login if no user is logged in
    if (!userInfo || !userInfo.role) {
        return <Navigate to="/login" replace />;
    }

    // Check if user's role is allowed
    if (!allowedRoles.includes(userInfo.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
