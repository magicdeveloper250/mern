import { Outlet, useNavigate } from "react-router-dom";
import DashboardNavbar from "../../DashboardNavbar/DashboardNavbar";
function DashboardLayout() {
  const navigate = useNavigate();
  return (
    <>
      <DashboardNavbar navigate={navigate} />
      <div className="dash-container">
        <Outlet />
      </div>
    </>
  );
}

export default DashboardLayout;
