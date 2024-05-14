import useCurrentUser from "../../hooks/useCurrentUser";

function DashWelcome() {
  const user = useCurrentUser();
  return (
    <div className="hero">
      <h3 className="hero__title">Welcome, {user?.username}.</h3>
    </div>
  );
}

export default DashWelcome;
