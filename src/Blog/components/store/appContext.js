import React, { useReducer, useContext } from "react";

import appReducer from "./appReducer";
import axios from "axios";
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
  errorBlog: null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

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
      if (error.response) {
        dispatch({
          type: REGISTER_USER_ERROR,
          payload: error.response.data.msg,
        });
      }
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
    } catch (error) {
      if (error.response) {
        dispatch({
          type: LOGIN_USER_ERROR,
          payload: error.response.data.msg,
        });
      }
    }
  };

  const getAllUsers = async () => {
    dispatch({ type: GET_ALL_USERS_BEGIN });

    try {
      const { data } = await authFetch.get("auth/users");
      dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: GET_ALL_USERS_ERROR,
          payload: error.response.data.msg,
        });
      }
    }
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
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

  const getAllBlogPosts = async () => {
    dispatch({ type: GET_ALL_BLOG_POSTS_BEGIN });

    try {
      const { data } = await authFetch.get("/blog");

      dispatch({ type: GET_ALL_BLOG_POSTS_SUCCESS, payload: data });
      localStorage.setItem("blogInfo", JSON.stringify(data));
    } catch (error) {
      if (error.response) {
        dispatch({
          type: GET_ALL_BLOG_POSTS_ERROR,
          payload: error.response.data.msg,
        });
      }
    }
  };

  const getSingleBlogPost = async id => {
    dispatch({ type: GET_SINGLE_BLOG_POST_BEGIN });

    try {
      const { data } = await axios.get(`/api/v1/blog/${id}`);

      dispatch({ type: GET_SINGLE_BLOG_POST_SUCCESS, payload: data });
      localStorage.setItem("blogPost", JSON.stringify(data));
    } catch (error) {
      if (error.response) {
        dispatch({
          type: GET_SINGLE_BLOG_POST_ERROR,
          payload: error.response.data.msg,
        });
      }
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
      if (error.response) {
        dispatch({
          type: ADD_BLOG_POST_ERROR,
          payload: error.response.data.msg,
        });
      }
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
      if (error.response) {
        dispatch({
          type: EDIT_BLOG_POST_ERROR,
          payload: error.response.data.msg,
        });
      }
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
      if (error.response) {
        dispatch({
          type: DELETE_BLOG_POST_ERROR,
          payload: error.response.data.msg,
        });
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        // dispatch functions
        registerUser,
        loginUser,
        getAllUsers,
        logoutUser,
        resetBlogPost,
        resetUserError,
        resetUserSuccess,
        resetBlogError,
        getAllBlogPosts,
        getSingleBlogPost,
        addBlogPost,
        editBlogPost,
        deleteBlogPost,
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
