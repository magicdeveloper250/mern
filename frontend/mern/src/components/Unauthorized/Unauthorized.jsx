import { useNavigate } from "react-router-dom";
import "./Unauthorized.css";
function Unauthorized() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="unauthorized-container">
      <h3>You are not authorized to access this page</h3>
      <button className="button button-primary" onClick={handleGoBack}>
        Go back
      </button>
    </div>
  );
}

export default Unauthorized;
