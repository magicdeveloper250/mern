import useCurrentUser from "../../../hooks/useCurrentUser";
import { Outlet, Navigate, useLocation } from "react-router-dom";

function ProtectedLayout() {
  const user = useCurrentUser();
  const location = useLocation();
  return user?.roles.length ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} />
  );
}

export default ProtectedLayout;
