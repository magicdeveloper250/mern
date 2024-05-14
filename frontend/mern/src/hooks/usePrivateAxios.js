import { useEffect } from "react";
import { privateAxios } from "../API/axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

function usePrivateAxios() {
  const refreshToken = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    const controller = new AbortController();
    privateAxios.defaults.signal = controller.signal;
    const requestInterceptor = privateAxios.interceptors.request.use(
      // Do something before request sent
      function (config) {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth}`;
        }
        return config;
      },
      // Do something with rrequest error
      function (error) {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = privateAxios.interceptors.response.use(
      // any status code that lie within the range of 2xx cause this to trigger
      // Do something with response data
      (response) => response,
      // any status code that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      async function (error) {
        const request = error.config;
        if (error?.response?.status === 403 && !request.sent) {
          // means token expired and we need new access token
          request.sent = true;
          const accessToken = await refreshToken();
          request.headers["Authorization"] = `Bearer ${accessToken}`;
          return privateAxios(request);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      privateAxios.interceptors.request.eject(requestInterceptor);
      privateAxios.interceptors.request.eject(responseInterceptor);
      controller.abort();
    };
  }, []);
  return privateAxios;
}

export default usePrivateAxios;
