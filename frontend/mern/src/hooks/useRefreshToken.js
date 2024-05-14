import useAuth from "./useAuth";
import usePublicAxios from "./usePublicAxios";

function useRefreshToken() {
  const { setAuth } = useAuth();
  const publicAxios = usePublicAxios();
  const refresh = async () => {
    try {
      const resp = await publicAxios.get("/auth/refresh");
      setAuth(resp.data.accessToken);
      return resp.data.accessToken;
    } catch (error) {
      if (error.response) {
        console.log(error.resp.data.message);
      }
    }
  };
  return refresh;
}

export default useRefreshToken;
