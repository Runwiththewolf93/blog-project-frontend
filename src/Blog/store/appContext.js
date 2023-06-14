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

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const logoutUser = (manualLogout = false) => {
    dispatch({ type: LOGOUT_USER, manualLogout });
    localStorage.clear();
  };

  // axios
  const authFetch = createAuthFetch(state.userInfo, logoutUser);

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

  const getAllUsers = async () => {
    dispatch({ type: GET_ALL_USERS_BEGIN });

    try {
      const { data } = await authFetch.get("auth/users");
      dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
    } catch (error) {
      errorHandler(error, dispatch, GET_ALL_USERS_ERROR);
    }
  };

  const resetUserError = () => {
    dispatch({ type: RESET_USER_ERROR });
  };

  const resetUserSuccess = () => {
    dispatch({ type: RESET_USER_SUCCESS });
  };

  const resetSuccessMessage = () => {
    dispatch({ type: RESET_SUCCESS_MESSAGE });
  };

  const resetErrorMessage = () => {
    dispatch({ type: RESET_ERROR_MESSAGE });
  };

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

const useAppContextState = () => {
  return useContext(AppContextState);
};

const useAppContextDispatch = () => {
  return useContext(AppContextDispatch);
};

export { AppProvider, initialState, useAppContextState, useAppContextDispatch };
