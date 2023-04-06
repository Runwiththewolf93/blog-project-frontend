import React, { useReducer, useContext } from "react";

import reducer from "./reducers";
import axios from "axios";
import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from "./actions";

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  isLoading: false,
  userInfo: userInfoFromLocalStorage,
  error: null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // dispatching below
  const registerUser = async ({ name, email, password }) => {
    dispatch({ type: REGISTER_USER_BEGIN });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/auth/register",
        { name, email, password },
        config
      );

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
      dispatch({ type: LOGIN_USER_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: REGISTER_USER_ERROR, payload: errorMessage });
      }
    }
  };

  const loginUser = async ({ email, password }) => {
    dispatch({ type: LOGIN_USER_BEGIN });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/auth/login",
        { email, password },
        config
      );

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: LOGIN_USER_ERROR, payload: errorMessage });
      }
    }
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    localStorage.removeItem("userInfo");
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        // dispatch functions
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
