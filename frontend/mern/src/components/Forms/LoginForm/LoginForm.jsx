import { useLocation, useNavigate } from "react-router-dom";
import "../Form.css";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import usePublicAxios from "../../../hooks/usePublicAxios";
function LoginForm() {
  const { setAuth } = useAuth();
  const publicAxios = usePublicAxios();
  const navigate = useNavigate();
  const from = useLocation()?.state?.from?.pathname || "/dash";
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await publicAxios.post(
        "http://localhost:3500/auth/login",
        JSON.stringify(user)
      );
      setAuth(resp.data.accessToken);
      navigate(from);
    } catch (error) {
      if (error.response) alert(error.response.data.message);
      else {
        console.log(error);
      }
    }
  };
  return (
    <div className="hero">
      <h3 className="hero__title">Login to access Blogs</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__inputs">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" required onChange={handleChange} />
        </div>
        <div className="form__inputs">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
          />
        </div>

        <div className="form__inputs">
          <button className="button button-primary"> Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
