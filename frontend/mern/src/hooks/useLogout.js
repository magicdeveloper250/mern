import usePublicAxios from "./usePublicAxios";

function useLogout() {
  const publicAxios = usePublicAxios();
  const logout = async () => {
    await publicAxios.post("/auth/logout");
  };
  return logout;
}

export default useLogout;
