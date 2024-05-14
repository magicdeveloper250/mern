import React from "react";
import { Link } from "react-router-dom";
import "./DashboardNavbar.css";
import useCurrentUser from "../../hooks/useCurrentUser";
import useLogout from "../../hooks/useLogout";
function DashboardNavbar({ navigate }) {
  const user = useCurrentUser();
  const logout = useLogout();
  const handleLogoutUser = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div className="dash-navbar">
      <section className="nav__logo">
        <Link to={"/dash"}>
          <h3>impano Blogs</h3>
        </Link>
      </section>
      <ul className="dash-navbar__links">
        <li>
          <Link to={"/dash"}>
            <i className="bi bi-house"></i> Home
          </Link>
        </li>
        <li>
          <Link to={"/dash/posts"}>
            <i className="bi bi-chat-left-text"></i> Posts
          </Link>
        </li>
        <li>
          <Link to={"/dash/authors"}>
            {" "}
            <i className="bi bi-people"></i> Authors
          </Link>
        </li>
        <li>
          <h3>{user?.username}</h3>
        </li>
        <li>
          <button
            className="button button-secondary"
            onClick={handleLogoutUser}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default DashboardNavbar;
