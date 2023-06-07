import React, { useReducer, useContext, useState } from "react";

import appReducer from "./appReducer";
import axios from "axios";
import axiosRetry from "axios-retry";
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
  RESET_BLOG_POST,
  RESET_USER_ERROR,
  RESET_USER_SUCCESS,
  RESET_BLOG_ERROR,
  RESET_BLOG_LOADING,
  RESET_WAS_LOGGED_OUT,
  RESET_SUCCESS_MESSAGE,
  RESET_ERROR_MESSAGE,
  GET_ALL_BLOG_POSTS_BEGIN,
  GET_ALL_BLOG_POSTS_SUCCESS,
  GET_ALL_BLOG_POSTS_ERROR,
  GET_SINGLE_BLOG_POST_BEGIN,
  GET_SINGLE_BLOG_POST_SUCCESS,
  GET_SINGLE_BLOG_POST_ERROR,
  ADD_BLOG_POST_BEGIN,
  ADD_BLOG_POST_SUCCESS,
  ADD_BLOG_POST_ERROR,
  EDIT_BLOG_POST_BEGIN,
  EDIT_BLOG_POST_SUCCESS,
  EDIT_BLOG_POST_ERROR,
  DELETE_BLOG_POST_BEGIN,
  DELETE_BLOG_POST_SUCCESS,
  DELETE_BLOG_POST_ERROR,
  UPDATE_USER_PASSWORD_BEGIN,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_ERROR,
  FORGOT_USER_PASSWORD_BEGIN,
  FORGOT_USER_PASSWORD_SUCCESS,
  FORGOT_USER_PASSWORD_ERROR,
  RESET_USER_PASSWORD_BEGIN,
  RESET_USER_PASSWORD_SUCCESS,
  RESET_USER_PASSWORD_ERROR,
  UPLOAD_BLOG_IMAGES_BEGIN,
  UPLOAD_BLOG_IMAGES_SUCCESS,
  UPLOAD_BLOG_IMAGES_ERROR,
} from "./actions";

export const userInfoFromLocalStorage =
  JSON.parse(localStorage.getItem("userInfo")) || null;

export const blogInfoFromLocalStorage =
  JSON.parse(localStorage.getItem("blogInfo")) || [];

const blogPostFromLocalStorage =
  JSON.parse(localStorage.getItem("blogPost")) || {};

const initialState = {
  isLoading: false,
  userInfo: userInfoFromLocalStorage,
  users: [],
  error: null,
  success: false,
  isLoadingBlog: false,
  blogInfo: blogInfoFromLocalStorage,
  blogPost: blogPostFromLocalStorage,
  images: {},
  errorBlog: null,
  wasLoggedOut: false,
  isLoadingReset: false,
  successMessage: "",
  errorReset: null,
};

const AppContextState = React.createContext();
const AppContextDispatch = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const setPostUpdated = useState(false)[1];

  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  // Set up axios-retry
  axiosRetry(authFetch, { retries: 3 });

  // request
  authFetch.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${state.userInfo.token}`;
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

  const logoutUser = (manualLogout = false) => {
    dispatch({ type: LOGOUT_USER, manualLogout });
    localStorage.clear();
  };

  const resetBlogPost = () => {
    dispatch({ type: RESET_BLOG_POST });
    localStorage.removeItem("blogPost");
  };

  const resetUserError = () => {
    dispatch({ type: RESET_USER_ERROR });
  };

  const resetUserSuccess = () => {
    dispatch({ type: RESET_USER_SUCCESS });
  };

  const resetBlogError = () => {
    dispatch({ type: RESET_BLOG_ERROR });
  };

  const resetSuccessMessage = () => {
    dispatch({ type: RESET_SUCCESS_MESSAGE });
  };

  const resetErrorMessage = () => {
    dispatch({ type: RESET_ERROR_MESSAGE });
  };

  const getAllBlogPosts = async () => {
    dispatch({ type: GET_ALL_BLOG_POSTS_BEGIN });

    try {
      const { data } = await authFetch.get("/blog");

      dispatch({ type: GET_ALL_BLOG_POSTS_SUCCESS, payload: data });
      localStorage.setItem("blogInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      errorHandler(error, dispatch, GET_ALL_BLOG_POSTS_ERROR);
    } finally {
      dispatch({ type: RESET_BLOG_LOADING });
    }
  };

  const getSingleBlogPost = async id => {
    dispatch({ type: GET_SINGLE_BLOG_POST_BEGIN });

    try {
      const { data } = await axios.get(`/api/v1/blog/${id}`);

      dispatch({ type: GET_SINGLE_BLOG_POST_SUCCESS, payload: data });
      localStorage.setItem("blogPost", JSON.stringify(data));
    } catch (error) {
      errorHandler(error, dispatch, GET_SINGLE_BLOG_POST_ERROR);
    }
  };

  const addBlogPost = async newPostData => {
    dispatch({ type: ADD_BLOG_POST_BEGIN });

    try {
      const { data } = await authFetch.post("/blog", newPostData);

      dispatch({ type: ADD_BLOG_POST_SUCCESS, payload: data });

      const updatedBlogInfo = [...blogInfoFromLocalStorage, data];
      localStorage.setItem("blogInfo", JSON.stringify(updatedBlogInfo));
    } catch (error) {
      errorHandler(error, dispatch, ADD_BLOG_POST_ERROR);
    }
  };

  const uploadBlogImages = async formData => {
    dispatch({ type: UPLOAD_BLOG_IMAGES_BEGIN });

    try {
      const { data } = await authFetch.post("/blog/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({ type: UPLOAD_BLOG_IMAGES_SUCCESS, payload: data });
      console.log(data);
      return { avatar: data.avatar, images: data.images };
    } catch (error) {
      errorHandler(error, dispatch, UPLOAD_BLOG_IMAGES_ERROR);
    }
  };

  const editBlogPost = async ({ id, updatedValues }) => {
    dispatch({ type: EDIT_BLOG_POST_BEGIN });

    try {
      const { data } = await authFetch.patch(`/blog/${id}`, updatedValues);

      dispatch({ type: EDIT_BLOG_POST_SUCCESS, payload: data });

      const updatedBlogInfo = blogInfoFromLocalStorage.map(post =>
        post._id === id ? data : post
      );
      localStorage.setItem("blogInfo", JSON.stringify(updatedBlogInfo));
    } catch (error) {
      errorHandler(error, dispatch, EDIT_BLOG_POST_ERROR);
    }
  };

  const deleteBlogPost = async id => {
    dispatch({ type: DELETE_BLOG_POST_BEGIN });

    try {
      await authFetch.delete(`/blog/${id}`);

      dispatch({ type: DELETE_BLOG_POST_SUCCESS, payload: id });

      const updatedBlogInfo = blogInfoFromLocalStorage.filter(
        post => post._id !== id
      );
      localStorage.setItem("blogInfo", JSON.stringify(updatedBlogInfo));
    } catch (error) {
      errorHandler(error, dispatch, DELETE_BLOG_POST_ERROR);
    }
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

  const scrollToBlogPost = postId => {
    const blogPostElement = document.getElementById(postId);
    if (blogPostElement) {
      blogPostElement.scrollIntoView({ behavior: "smooth" });
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
          resetBlogPost,
          resetUserError,
          resetUserSuccess,
          resetBlogError,
          resetSuccessMessage,
          resetErrorMessage,
          getAllBlogPosts,
          getSingleBlogPost,
          addBlogPost,
          editBlogPost,
          deleteBlogPost,
          updateUserPassword,
          forgotUserPassword,
          resetUserPassword,
          uploadBlogImages,
          // state functions
          setPostUpdated,
          scrollToBlogPost,
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
