import axios from "axios";
import axiosRetry from "axios-retry";

/**
 * Creates an authenticated fetch function.
 *
 * @param {Object} userInfo - The user information object.
 * @param {Function} logoutUser - The function to logout the user.
 * @return {Function} The authenticated fetch function.
 */
const createAuthFetch = (userInfo, logoutUser) => {
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  // Set up axios-retry
  axiosRetry(authFetch, { retries: 3 });

  // request
  authFetch.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // response
  authFetch.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response && error.response.status === 401) {
        logoutUser();
        window.location.href = "/";
      }
      return Promise.reject(error);
    }
  );

  return authFetch;
};

export default createAuthFetch;
