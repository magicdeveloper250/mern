import useCurrentUser from "../../../hooks/useCurrentUser";
import { Outlet, Navigate } from "react-router-dom";
function AdminLayout() {
  const user = useCurrentUser();
  return user?.roles?.includes("admin") ? (
    <Outlet />
  ) : (
    <Navigate to={"/unauthorized"} replace={true} />
  );
}

export default AdminLayout;
