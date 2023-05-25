import React, { useReducer, useContext } from "react";

import commentReducer from "./commentReducer";
import axios from "axios";
import {
  GET_ALL_COMMENTS_BLOG_POST_BEGIN,
  GET_ALL_COMMENTS_BLOG_POST_SUCCESS,
  GET_ALL_COMMENTS_BLOG_POST_ERROR,
  GET_ALL_COMMENTS_USER_BEGIN,
  GET_ALL_COMMENTS_USER_SUCCESS,
  GET_ALL_COMMENTS_USER_ERROR,
  GET_ALL_COMMENTS_BEGIN,
  GET_ALL_COMMENTS_SUCCESS,
  GET_ALL_COMMENTS_ERROR,
  ADD_COMMENT_BLOG_POST_BEGIN,
  ADD_COMMENT_BLOG_POST_SUCCESS,
  ADD_COMMENT_BLOG_POST_ERROR,
  EDIT_COMMENT_BLOG_POST_BEGIN,
  EDIT_COMMENT_BLOG_POST_SUCCESS,
  EDIT_COMMENT_BLOG_POST_ERROR,
  DELETE_COMMENT_BLOG_POST_BEGIN,
  DELETE_COMMENT_BLOG_POST_SUCCESS,
  DELETE_COMMENT_BLOG_POST_ERROR,
  DELETE_ALL_COMMENTS_BLOG_POST_BEGIN,
  DELETE_ALL_COMMENTS_BLOG_POST_SUCCESS,
  DELETE_ALL_COMMENTS_BLOG_POST_ERROR,
  RESET_COMMENT_ERROR,
  RESET_GET_ALL_COMMENTS_USER_LOADING,
  RESET_COMMENT_LOADING,
  LOGOUT_USER,
} from "./actions";
import { userInfoFromLocalStorage } from "./appContext";

export const commentInfoFromLocalStorage =
  JSON.parse(localStorage.getItem("commentInfo")) || [];

const initialState = {
  userInfo: userInfoFromLocalStorage,
  isLoadingComment: false,
  commentInfo: commentInfoFromLocalStorage,
  blogCommentInfo: [],
  errorComment: null,
  isLoadingUserComment: false,
  userCommentInfo: [],
  errorUserComment: null,
};

const CommentContext = React.createContext();

const CommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, initialState);

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
  const getAllCommentsBlogPost = async blogId => {
    dispatch({ type: GET_ALL_COMMENTS_BLOG_POST_BEGIN });
    try {
      const { data } = await authFetch.get(`/comment/blogId/${blogId}`);

      dispatch({ type: GET_ALL_COMMENTS_BLOG_POST_SUCCESS, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: GET_ALL_COMMENTS_BLOG_POST_ERROR,
          payload: error.response.data.msg,
        });
      }
    }
  };

  const getAllCommentsUser = async () => {
    dispatch({ type: GET_ALL_COMMENTS_USER_BEGIN });

    try {
      const { data } = await authFetch.get("/comment/user");

      dispatch({ type: GET_ALL_COMMENTS_USER_SUCCESS, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: GET_ALL_COMMENTS_USER_ERROR,
          payload: error.response.data.msg,
        });
      }
    } finally {
      dispatch({ type: RESET_GET_ALL_COMMENTS_USER_LOADING });
    }
  };

  const getAllComments = async () => {
    dispatch({ type: GET_ALL_COMMENTS_BEGIN });

    try {
      console.log("fetching...");
      const { data } = await authFetch.get("/comment");
      console.log("fetching done!");

      dispatch({ type: GET_ALL_COMMENTS_SUCCESS, payload: data });
      localStorage.setItem("commentInfo", JSON.stringify(data));
    } catch (error) {
      if (error.response) {
        dispatch({
          type: GET_ALL_COMMENTS_ERROR,
          payload: error.response.data.msg,
        });
      }
      dispatch({
        type: GET_ALL_COMMENTS_ERROR,
        payload: error.response.data.msg,
      });
    } finally {
      dispatch({ type: RESET_COMMENT_LOADING });
    }
  };

  const addCommentBlogPost = async (blogId, comment) => {
    dispatch({ type: ADD_COMMENT_BLOG_POST_BEGIN });

    try {
      const { data } = await authFetch.post(
        `/comment/blogId/${blogId}`,
        comment
      );

      dispatch({ type: ADD_COMMENT_BLOG_POST_SUCCESS, payload: data });

      const updatedCommentInfo = [...commentInfoFromLocalStorage, data];
      localStorage.setItem("commentInfo", JSON.stringify(updatedCommentInfo));
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ADD_COMMENT_BLOG_POST_ERROR,
          payload: error.response.data.msg,
        });
      }
    }
  };

  const editCommentBlogPost = async (blogId, commentId, editedComment) => {
    dispatch({ type: EDIT_COMMENT_BLOG_POST_BEGIN });

    try {
      const { data } = await authFetch.patch(
        `/comment/blogId/${blogId}/commentId/${commentId}`,
        editedComment
      );

      dispatch({ type: EDIT_COMMENT_BLOG_POST_SUCCESS, payload: data });

      const updatedCommentInfo = commentInfoFromLocalStorage.map(comment =>
        comment._id === commentId ? data : comment
      );
      localStorage.setItem("commentInfo", JSON.stringify(updatedCommentInfo));
    } catch (error) {
      if (error.response) {
        dispatch({
          type: EDIT_COMMENT_BLOG_POST_ERROR,
          payload: error.response.data.msg,
        });
      }
    }
  };

  const deleteCommentBlogPost = async (blogId, commentId) => {
    dispatch({ type: DELETE_COMMENT_BLOG_POST_BEGIN });

    try {
      await authFetch.delete(
        `/comment/blogId/${blogId}/commentId/${commentId}`
      );

      dispatch({ type: DELETE_COMMENT_BLOG_POST_SUCCESS, payload: commentId });

      const updatedCommentInfo = commentInfoFromLocalStorage.filter(
        comment => comment._id !== commentId
      );
      localStorage.setItem("commentInfo", JSON.stringify(updatedCommentInfo));
    } catch (error) {
      if (error.response) {
        dispatch({
          type: DELETE_COMMENT_BLOG_POST_ERROR,
          payload: error.response.data.msg,
        });
      }
    }
  };

  const deleteAllCommentsBlogPost = async blogId => {
    dispatch({ type: DELETE_ALL_COMMENTS_BLOG_POST_BEGIN });

    try {
      await authFetch.delete(`/comment/blogId/${blogId}`);

      dispatch({
        type: DELETE_ALL_COMMENTS_BLOG_POST_SUCCESS,
        payload: blogId,
      });

      const updatedCommentInfo = commentInfoFromLocalStorage.filter(
        comment => comment.blog !== blogId
      );
      localStorage.setItem("commentInfo", JSON.stringify(updatedCommentInfo));
    } catch (error) {
      if (error.response) {
        dispatch({
          type: DELETE_ALL_COMMENTS_BLOG_POST_ERROR,
          payload: error.response.data.msg,
        });
      }
    }
  };

  const resetCommentError = () => {
    dispatch({ type: RESET_COMMENT_ERROR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    localStorage.clear();
  };

  return (
    <CommentContext.Provider
      value={{
        ...state,
        // dispatch functions
        getAllCommentsBlogPost,
        getAllCommentsUser,
        getAllComments,
        addCommentBlogPost,
        editCommentBlogPost,
        deleteCommentBlogPost,
        resetCommentError,
        deleteAllCommentsBlogPost,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

const useCommentContext = () => {
  return useContext(CommentContext);
};

export { CommentProvider, initialState, useCommentContext };
