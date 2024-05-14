import { useNavigate } from "react-router-dom";
import "../Form.css";
import { useState } from "react";

function UserRegistrationForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    roles: [],
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAddRoles = (e) => {
    const role = e.target.name;
    if (user.roles.indexOf(role) !== -1) {
      const roles = user.roles.filter((item) => item != role);
      setUser({ ...user, roles: roles });
    } else {
      setUser({ ...user, roles: [...user.roles, role] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:3500/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await resp.json();
      if (resp.ok) {
        navigate(-1);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="user-form__header">
          <h3 className="user-form__title">New author</h3>
          <button>
            <i className="bi bi-floppy"></i>
          </button>
        </div>
        <div className="user-form__inputs">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" required onChange={handleChange} />
        </div>
        <div className="user-form__inputs">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
          />
        </div>
        <label htmlFor="roles">Assigned Roles</label>
        <fieldset>
          <div>
            <div className="user-form__inputs">
              <label htmlFor="regular">regular</label>
              <input
                type="checkbox"
                name="regular"
                checked={user.roles.indexOf("regular") !== -1}
                onChange={handleAddRoles}
              />
            </div>
            <div className="user-form__inputs">
              <label htmlFor="moderator">moderator</label>
              <input
                type="checkbox"
                name="moderator"
                checked={user.roles.indexOf("moderator") !== -1}
                onChange={handleAddRoles}
              />
            </div>
            <div className="user-form__inputs">
              <label htmlFor="admin">admin</label>
              <input
                type="checkbox"
                name="admin"
                checked={user.roles.indexOf("admin") !== -1}
                onChange={handleAddRoles}
              />
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default UserRegistrationForm;
