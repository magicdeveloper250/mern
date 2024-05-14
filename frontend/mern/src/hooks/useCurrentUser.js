import useAuth from "./useAuth";
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";
function useCurrentUser() {
  const { auth } = useAuth();
  const currentUser = useMemo(() => {
    try {
      return jwtDecode(auth);
    } catch (error) {
      return null;
    }
  }, [auth]);
  return currentUser;
}

export default useCurrentUser;
