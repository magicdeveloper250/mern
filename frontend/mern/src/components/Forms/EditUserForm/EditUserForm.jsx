import { useNavigate, useParams } from "react-router-dom";
import "../UserRegistrationForm/UserRegistrationForm.css";
import { useEffect, useState } from "react";

function EditUserForm() {
  const userId = new URLSearchParams(useParams()).get("id");
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState({
    username: "",
    password: "",
    roles: [],
    active: false,
  });
  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleChangeStatus = () => {
    setEditUser({ ...editUser, active: !editUser?.active });
  };
  const handleAddRoles = (e) => {
    const role = e.target.name;
    if (editUser.roles.indexOf(role) !== -1) {
      const roles = editUser.roles.filter((item) => item != role);
      setEditUser({ ...editUser, roles: roles });
    } else {
      setEditUser({ ...editUser, roles: [...editUser.roles, role] });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:3500/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editUser),
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

  useEffect(() => {
    const getUser = async () => {
      try {
        const resp = await fetch(`http://localhost:3500/users/${userId}`);
        const data = await resp.json();
        if (resp.ok) {
          setEditUser(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {}
    };
    getUser();
  }, []);

  return (
    <div className="user-form">
      <form className="form" onSubmit={handleUpdate}>
        <div className="user-form__header">
          <h3 className="user-form__title">Edit author</h3>
          <button>
            {" "}
            <i className="bi bi-floppy"></i>
          </button>
        </div>
        <div className="user-form__inputs">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            required
            defaultValue={editUser?.username}
            onChange={handleChange}
          />
        </div>
        <div className="user-form__inputs">
          <label htmlFor="password">Password</label>
          <span>["" = no change]</span>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <div className="user-form__inputs">
          <label htmlFor="status">Active</label>
          <input
            type="checkbox"
            checked={editUser?.active}
            onChange={handleChangeStatus}
          />
        </div>
        <label htmlFor="roles"> Assigned roles</label>
        <fieldset>
          <div>
            <div className="user-form__inputs">
              <label htmlFor="regular">regular</label>
              <input
                type="checkbox"
                name="regular"
                checked={editUser?.roles.indexOf("regular") !== -1}
                onChange={handleAddRoles}
              />
            </div>
            <div className="user-form__inputs">
              <label htmlFor="moderator">moderator</label>
              <input
                type="checkbox"
                name="moderator"
                checked={editUser?.roles.indexOf("moderator") !== -1}
                onChange={handleAddRoles}
              />
            </div>
            <div className="user-form__inputs">
              <label htmlFor="admin">admin</label>
              <input
                type="checkbox"
                name="admin"
                checked={editUser?.roles.indexOf("admin") !== -1}
                onChange={handleAddRoles}
              />
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default EditUserForm;
