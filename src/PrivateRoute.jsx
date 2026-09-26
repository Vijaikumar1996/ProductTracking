import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");

    const { user } = useSelector((state) => state.auth);

    // Not logged in
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Check role-based access if allowedRoles is provided
    if (allowedRoles && allowedRoles.length > 0) {
        const userRoles = user?.roles || [];

        const hasAccess = allowedRoles.some((role) =>
            userRoles.includes(role)
        );

        if (!hasAccess) {
            return <Navigate to="/home" replace />;
        }
    }

    return <Outlet />;
};

export default PrivateRoute;