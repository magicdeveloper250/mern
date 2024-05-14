import { useEffect, useState } from "react";
import User from "../../../components/User/User";
import { Link, useNavigate } from "react-router-dom";
import "./UsersList.css";
import usePrivateAxios from "../../../hooks/usePrivateAxios";
function UsersList() {
  const [users, setUsers] = useState([]);
  const privateAxios = usePrivateAxios();
  const handleDeleteUser = async (userId) => {
    try {
      const resp = await privateAxios.delete(
        "/users",
        JSON.stringify({ id: userId })
      );
      setUsers([...users.filter((user) => user._id !== userId)]);
    } catch (error) {}
  };
  useEffect(() => {
    const getUsers = async () => {
      try {
        const resp = await privateAxios.get("/users");
        setUsers(resp.data.reverse());
      } catch (error) {
        if (error.request) console.log(error);
        else {
          console.log(error);
        }
      }
    };
    getUsers();
  }, []);
  return (
    <div className="users">
      <section className="users__header">
        <h3>All Authors</h3>
        <Link className="users__header__button" to={"./new"}>
          <i className="bi bi-plus-square"></i>
        </Link>
      </section>
      {users.map((user, index) => {
        return <User user={user} key={index} onDelete={handleDeleteUser} />;
      })}
    </div>
  );
}

export default UsersList;
