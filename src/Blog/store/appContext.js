import React, { useReducer, useContext } from "react";
import appReducer from "./appReducer";
import axios from "axios";
import createAuthFetch from "./createAuthFetch";
import { errorHandler } from "../utils/helper";
import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  GET_ALL_USERS_BEGIN,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR,
  LOGOUT_USER,
  RESET_USER_ERROR,
  RESET_USER_SUCCESS,
  RESET_WAS_LOGGED_OUT,
  RESET_SUCCESS_MESSAGE,
  RESET_ERROR_MESSAGE,
  UPDATE_USER_PASSWORD_BEGIN,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_ERROR,
  FORGOT_USER_PASSWORD_BEGIN,
  FORGOT_USER_PASSWORD_SUCCESS,
  FORGOT_USER_PASSWORD_ERROR,
  RESET_USER_PASSWORD_BEGIN,
  RESET_USER_PASSWORD_SUCCESS,
  RESET_USER_PASSWORD_ERROR,
} from "./actions";

export const userInfoFromLocalStorage =
  JSON.parse(localStorage.getItem("userInfo")) || null;

// appContext initialState object
const initialState = {
  isLoading: false,
  userInfo: userInfoFromLocalStorage,
  users: [],
  success: false,
  error: null,
  wasLoggedOut: false,
  isLoadingReset: false,
  successMessage: "",
  errorReset: null,
};

const AppContextState = React.createContext();
const AppContextDispatch = React.createContext();

/**
 * A function that creates the AppProvider component and defines various helper functions for user authentication and management.
 *
 * @param {Object} children - The child components to be rendered inside the AppProvider component.
 * @return {JSX.Element} The rendered AppProvider component.
 */
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  /**
   * Logs out the user and clears the local storage.
   *
   * @param {boolean} manualLogout - Indicates if the logout was triggered manually.
   * @return {undefined}
   */
  const logoutUser = (manualLogout = false) => {
    dispatch({ type: LOGOUT_USER, manualLogout });
    localStorage.clear();
  };

  // axios
  const authFetch = createAuthFetch(state.userInfo, logoutUser);

  /**
   * Registers a user with the given name, email, and password.
   *
   * @param {Object} user - The user object containing the name, email, and password.
   * @param {string} user.name - The name of the user.
   * @param {string} user.email - The email of the user.
   * @param {string} user.password - The password of the user.
   * @returns {Promise} A promise that resolves to the result of the registration.
   */
  // dispatching below
  const registerUser = async ({ name, email, password }) => {
    dispatch({ type: REGISTER_USER_BEGIN });

    try {
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
      });

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      errorHandler(error, dispatch, REGISTER_USER_ERROR);
    }
  };

  /**
   * Logs in a user with the provided email and password.
   *
   * @param {Object} param - An object containing the user's email and password.
   *   @param {string} param.email - The user's email.
   *   @param {string} param.password - The user's password.
   * @return {Promise<void>} A promise that resolves when the login is successful.
   */
  const loginUser = async ({ email, password }) => {
    dispatch({ type: LOGIN_USER_BEGIN });

    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Reset the wasLoggedOut flag
      dispatch({ type: RESET_WAS_LOGGED_OUT });
    } catch (error) {
      errorHandler(error, dispatch, LOGIN_USER_ERROR);
    }
  };

  /**
   * Retrieves all users from the server.
   *
   * @return {Promise<void>} - A promise that resolves when the operation is complete.
   */
  const getAllUsers = async () => {
    dispatch({ type: GET_ALL_USERS_BEGIN });

    try {
      const { data } = await authFetch.get("auth/users");
      dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
    } catch (error) {
      errorHandler(error, dispatch, GET_ALL_USERS_ERROR);
    }
  };

  /**
   * Resets the user error by dispatching a RESET_USER_ERROR action.
   * @returns {void}
   */
  const resetUserError = () => {
    dispatch({ type: RESET_USER_ERROR });
  };
  /**
   * Resets the user success state.
   * @returns {void}
   */
  const resetUserSuccess = () => {
    dispatch({ type: RESET_USER_SUCCESS });
  };
  /**
   * Resets the success message.
   * @returns {void}
   */
  const resetSuccessMessage = () => {
    dispatch({ type: RESET_SUCCESS_MESSAGE });
  };
  /**
   * Resets the error message.
   * @returns {void}
   */
  const resetErrorMessage = () => {
    dispatch({ type: RESET_ERROR_MESSAGE });
  };

  /**
   * Updates the user's password.
   *
   * @param {Object} param - The object containing the current and new passwords.
   * @param {string} param.currentPassword - The user's current password.
   * @param {string} param.newPassword - The user's new password.
   * @return {Promise} A promise that resolves when the password is successfully updated, or rejects with an error.
   */
  const updateUserPassword = async ({ currentPassword, newPassword }) => {
    dispatch({ type: UPDATE_USER_PASSWORD_BEGIN });

    try {
      await authFetch.patch("/auth/updateUserPassword", {
        currentPassword,
        newPassword,
      });

      dispatch({
        type: UPDATE_USER_PASSWORD_SUCCESS,
        payload: "Password updated successfully",
      });
    } catch (error) {
      errorHandler(error, dispatch, UPDATE_USER_PASSWORD_ERROR);
    }
  };

  /**
   * Sends a forgot password request to the server and dispatches the result to the state.
   * @param {string} email - The email address of the user.
   * @returns {Promise<void>}
   */
  const forgotUserPassword = async email => {
    dispatch({ type: FORGOT_USER_PASSWORD_BEGIN });

    try {
      await axios.patch("/api/v1/auth/forgotPassword", { email });
      dispatch({
        type: FORGOT_USER_PASSWORD_SUCCESS,
        payload: "Email sent successfully",
      });
    } catch (error) {
      errorHandler(error, dispatch, FORGOT_USER_PASSWORD_ERROR);
    }
  };

  /**
   * Resets the user's password using the provided password and token.
   *
   * @param {Object} param - An object containing the password and token.
   * @param {string} param.password - The new password to be set.
   * @param {string} param.token - The token used for password reset.
   * @return {Promise} A promise that resolves with the updated user data.
   */
  const resetUserPassword = async ({ password, token }) => {
    dispatch({ type: RESET_USER_PASSWORD_BEGIN });

    try {
      const { data } = await axios.patch(
        `/api/v1/auth/resetPassword/${token}`,
        {
          password,
        }
      );

      dispatch({
        type: RESET_USER_PASSWORD_SUCCESS,
        payload: data.msg,
      });

      dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user });
      localStorage.setItem("userInfo", JSON.stringify(data.user));
    } catch (error) {
      errorHandler(error, dispatch, RESET_USER_PASSWORD_ERROR);
    }
  };

  return (
    <AppContextState.Provider
      value={{
        ...state,
      }}
    >
      <AppContextDispatch.Provider
        value={{
          // dispatch functions
          registerUser,
          loginUser,
          getAllUsers,
          logoutUser,
          resetUserError,
          resetUserSuccess,
          resetSuccessMessage,
          resetErrorMessage,
          updateUserPassword,
          forgotUserPassword,
          resetUserPassword,
        }}
      >
        {children}
      </AppContextDispatch.Provider>
    </AppContextState.Provider>
  );
};

/**
 * Returns the state from the AppContext.
 *
 * @return {Object} The state from the AppContext.
 */
const useAppContextState = () => {
  return useContext(AppContextState);
};

/**
 * Returns the AppContextDispatch from the AppContext.
 *
 * @return {AppContextDispatch} The AppContextDispatch object.
 */
const useAppContextDispatch = () => {
  return useContext(AppContextDispatch);
};

export { AppProvider, initialState, useAppContextState, useAppContextDispatch };
