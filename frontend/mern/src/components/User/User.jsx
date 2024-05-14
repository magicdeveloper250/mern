import { Link } from "react-router-dom";
import "./User.css";
function User({ user, onDelete }) {
  return (
    <div className="user">
      <section className="user__profile">
        {/* <img src="/images/user.png" alt="user placeholder image" /> */}
        <i
          className="bi bi-person-circle"
          style={{ fontSize: "3rem", opacity: "0.6" }}
        ></i>
      </section>
      <section className="user__info">
        <div className="user__username">
          <h3>{user?.username}</h3>
          <p>{user?.active ? "🟢" : "🔴"}</p>
        </div>
        <ul>
          {user?.roles.map((role, index) => {
            return <li key={index}>{role}</li>;
          })}
        </ul>
        <section className="user__actions">
          <Link className="button button-secondary" to={`./${user?._id}`}>
            <i className="bi bi-pen"></i>
          </Link>
          <button
            className="button button-secondary"
            onClick={() => onDelete(user?._id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </section>
      </section>
    </div>
  );
}

export default User;
