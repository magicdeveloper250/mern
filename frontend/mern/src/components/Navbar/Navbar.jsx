import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">
      <section className="nav__logo">
        <h3>impano Blogs</h3>
      </section>
      <ul className="nav__links">
        <li>
          <Link to={"/login"}> Login</Link>
        </li>
        <li>
          <Link to={"/Register"}> Register</Link>
        </li>
        <li>
          <Link to={"/about"}> About us</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
