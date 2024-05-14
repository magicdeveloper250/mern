import { Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useRefreshToken from "../../../hooks/useRefreshToken";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useEffect, useState } from "react";
function StayLogin() {
  const [refreshing, setRefreshing] = useState(true);
  const currentUser = useCurrentUser();
  const refresh = useRefreshToken();
  const refreshToken = async () => {
    try {
      await refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    if (!currentUser?.roles?.length) {
      refreshToken();
    } else {
      setRefreshing(false);
    }
  }, []);
  return refreshing ? <center>Refreshing ...</center> : <Outlet />;
}

export default StayLogin;
