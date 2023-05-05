import React, { useReducer, useContext } from "react";

import commentReducer from "./commentReducers";
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
  RESET_COMMENT_ERROR,
  LOGOUT_USER,
} from "./actions";
import { userInfoFromLocalStorage } from "./appContext";

const commentInfoFromLocalStorage =
  JSON.parse(localStorage.getItem("commentInfo")) || [];

const clearLocalStorage = () => {
  const keysToRemove = ["userInfo", "blogInfo", "blogPost", "commentInfo"];
  keysToRemove.forEach(key => localStorage.removeItem(key));
};

const initialState = {
  isLoadingComment: false,
  commentInfo: commentInfoFromLocalStorage,
  errorComment: null,
  userInfo: userInfoFromLocalStorage,
  blogCommentInfo: [],
  isLoadingUserComment: false,
  userCommentInfo: [],
  errorUserComment: null,
};

const CommentContext = React.createContext();

const CommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, initialState);

  // dispatching below
  const getAllCommentsBlogPost = async blogId => {
    dispatch({ type: GET_ALL_COMMENTS_BLOG_POST_BEGIN });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/v1/comment/blogId/${blogId}`,
        config
      );

      dispatch({ type: GET_ALL_COMMENTS_BLOG_POST_SUCCESS, payload: data });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        dispatch({
          type: GET_ALL_COMMENTS_BLOG_POST_ERROR,
          payload: errorMessage,
        });
      }
    }
  };

  const getAllCommentsUser = async () => {
    dispatch({ type: GET_ALL_COMMENTS_USER_BEGIN });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      };

      const { data } = await axios.get("/api/v1/comment/user", config);

      dispatch({ type: GET_ALL_COMMENTS_USER_SUCCESS, payload: data });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        dispatch({
          type: GET_ALL_COMMENTS_USER_ERROR,
          payload: errorMessage,
        });
        if (errorMessage === "Authentication Invalid, token failed") {
          dispatch({ type: LOGOUT_USER });
          clearLocalStorage();
          alert("Session expired, please log in again to view the blog.");
        }
      }
    }
  };

  const getAllComments = async () => {
    dispatch({ type: GET_ALL_COMMENTS_BEGIN });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      };

      const { data } = await axios.get("/api/v1/comment", config);

      dispatch({ type: GET_ALL_COMMENTS_SUCCESS, payload: data });
      localStorage.setItem("commentInfo", JSON.stringify(data));
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        dispatch({
          type: GET_ALL_COMMENTS_ERROR,
          payload: errorMessage,
        });
        if (errorMessage === "Authentication Invalid, token failed") {
          dispatch({ type: LOGOUT_USER });
          clearLocalStorage();
          alert("Session expired, please log in again to view the blog.");
        }
      }
    }
  };

  const addCommentBlogPost = async (blogId, comment) => {
    dispatch({ type: ADD_COMMENT_BLOG_POST_BEGIN });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/v1/comment/blogId/${blogId}`,
        comment,
        config
      );

      dispatch({ type: ADD_COMMENT_BLOG_POST_SUCCESS, payload: data });

      const updatedCommentInfo = [...commentInfoFromLocalStorage, data];
      localStorage.setItem("commentInfo", JSON.stringify(updatedCommentInfo));
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        dispatch({
          type: ADD_COMMENT_BLOG_POST_ERROR,
          payload: errorMessage,
        });
      }
    }
  };

  const editCommentBlogPost = async (blogId, commentId, editedComment) => {
    dispatch({ type: EDIT_COMMENT_BLOG_POST_BEGIN });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      };

      const { data } = await axios.patch(
        `/api/v1/comment/blogId/${blogId}/commentId/${commentId}`,
        editedComment,
        config
      );

      dispatch({ type: EDIT_COMMENT_BLOG_POST_SUCCESS, payload: data });

      const updatedCommentInfo = commentInfoFromLocalStorage.map(comment =>
        comment._id === commentId ? data : comment
      );
      localStorage.setItem("commentInfo", JSON.stringify(updatedCommentInfo));
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: EDIT_COMMENT_BLOG_POST_ERROR, payload: errorMessage });
      }
    }
  };

  const deleteCommentBlogPost = async (blogId, commentId) => {
    dispatch({ type: DELETE_COMMENT_BLOG_POST_BEGIN });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      };

      await axios.delete(
        `/api/v1/comment/blogId/${blogId}/commentId/${commentId}`,
        config
      );

      dispatch({ type: DELETE_COMMENT_BLOG_POST_SUCCESS, payload: commentId });

      const updatedCommentInfo = commentInfoFromLocalStorage.filter(
        comment => comment._id !== commentId
      );
      localStorage.setItem("commentInfo", JSON.stringify(updatedCommentInfo));
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        dispatch({
          type: DELETE_COMMENT_BLOG_POST_ERROR,
          payload: errorMessage,
        });
      }
    }
  };

  const resetCommentError = () => {
    dispatch({ type: RESET_COMMENT_ERROR });
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
