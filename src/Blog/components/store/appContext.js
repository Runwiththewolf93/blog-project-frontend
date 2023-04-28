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
  RESET_BLOG_POST,
  RESET_USER_ERROR,
  RESET_USER_SUCCESS,
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

const blogInfoFromLocalStorage =
  JSON.parse(localStorage.getItem("blogInfo")) || [];

const blogPostFromLocalStorage =
  JSON.parse(localStorage.getItem("blogPost")) || null;

const initialState = {
  isLoading: false,
  userInfo: userInfoFromLocalStorage,
  error: null,
  success: false,
  isLoadingBlog: false,
  blogInfo: blogInfoFromLocalStorage,
  errorBlog: null,
  blogPost: blogPostFromLocalStorage,
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

      dispatch({ type: LOGIN_USER_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
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
    localStorage.removeItem("blogInfo");
    localStorage.removeItem("blogPost");
    localStorage.removeItem("commentInfo");
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

  const getAllBlogPosts = async () => {
    dispatch({ type: GET_ALL_BLOG_POSTS_BEGIN });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      };

      const { data } = await axios.get("/api/v1/blog", config);

      dispatch({ type: GET_ALL_BLOG_POSTS_SUCCESS, payload: data });
      localStorage.setItem("blogInfo", JSON.stringify(data));
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: GET_ALL_BLOG_POSTS_ERROR, payload: errorMessage });
        if (errorMessage === "Authentication Invalid, token failed") {
          logoutUser();
          alert("Session expired, please log in again to view the blog.");
        }
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
        const errorMessage = error.response.data.msg;
        dispatch({ type: GET_SINGLE_BLOG_POST_ERROR, payload: errorMessage });
      }
    }
  };

  const addBlogPost = async newPostData => {
    dispatch({ type: ADD_BLOG_POST_BEGIN });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      };

      const { data } = await axios.post("/api/v1/blog", newPostData, config);

      dispatch({ type: ADD_BLOG_POST_SUCCESS, payload: data });

      const updatedBlogInfo = [...blogInfoFromLocalStorage, data];
      localStorage.setItem("blogInfo", JSON.stringify(updatedBlogInfo));
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: ADD_BLOG_POST_ERROR, payload: errorMessage });
        if (errorMessage === "Authentication Invalid, token failed") {
          logoutUser();
          alert("Session expired, please log in again to view the blog.");
        }
      }
    }
  };

  const editBlogPost = async ({ id, updatedValues }) => {
    dispatch({ type: EDIT_BLOG_POST_BEGIN });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      };

      const { data } = await axios.patch(
        `/api/v1/blog/${id}`,
        updatedValues,
        config
      );

      dispatch({ type: EDIT_BLOG_POST_SUCCESS, payload: data });

      const updatedBlogInfo = blogInfoFromLocalStorage.map(post =>
        post._id === id ? data : post
      );
      localStorage.setItem("blogInfo", JSON.stringify(updatedBlogInfo));
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: EDIT_BLOG_POST_ERROR, payload: errorMessage });
        if (errorMessage === "Authentication Invalid, token failed") {
          logoutUser();
          alert("Session expired, please log in again to view the blog.");
        }
      }
    }
  };

  const deleteBlogPost = async id => {
    dispatch({ type: DELETE_BLOG_POST_BEGIN });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      };

      await axios.delete(`/api/v1/blog/${id}`, config);

      dispatch({ type: DELETE_BLOG_POST_SUCCESS, payload: id });

      const updatedBlogInfo = blogInfoFromLocalStorage.filter(
        post => post._id !== id
      );
      localStorage.setItem("blogInfo", JSON.stringify(updatedBlogInfo));
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: DELETE_BLOG_POST_ERROR, payload: errorMessage });
        if (errorMessage === "Authentication Invalid, token failed") {
          logoutUser();
          alert("Session expired, please log in again to view the blog.");
        }
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
        logoutUser,
        resetBlogPost,
        resetUserError,
        resetUserSuccess,
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
