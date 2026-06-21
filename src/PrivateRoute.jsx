import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const token = localStorage.getItem("token"); // or from redux

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;