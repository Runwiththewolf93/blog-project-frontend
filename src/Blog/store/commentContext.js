import React, { useReducer, useContext } from "react";

import commentReducer from "./commentReducer";
import createAuthFetch from "./createAuthFetch";
import { errorHandler } from "../utils/helper";
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

// commentContext initialState object
const initialState = {
  userInfo: userInfoFromLocalStorage,
  isLoadingComment: true,
  commentInfo: commentInfoFromLocalStorage,
  blogCommentInfo: [],
  errorComment: null,
  isLoadingUserComment: true,
  userCommentInfo: [],
  errorUserComment: null,
};

const CommentContextState = React.createContext();
const CommentContextDispatch = React.createContext();

const CommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, initialState);

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    localStorage.clear();
  };

  // axios
  const authFetch = createAuthFetch(state?.userInfo, logoutUser);

  // dispatching below
  const getAllCommentsBlogPost = async blogId => {
    dispatch({ type: GET_ALL_COMMENTS_BLOG_POST_BEGIN });
    try {
      const { data } = await authFetch.get(`/comment/blogId/${blogId}`);

      dispatch({ type: GET_ALL_COMMENTS_BLOG_POST_SUCCESS, payload: data });
    } catch (error) {
      errorHandler(error, dispatch, GET_ALL_COMMENTS_BLOG_POST_ERROR);
    }
  };

  const getAllCommentsUser = async () => {
    dispatch({ type: GET_ALL_COMMENTS_USER_BEGIN });

    try {
      const { data } = await authFetch.get("/comment/user");

      dispatch({ type: GET_ALL_COMMENTS_USER_SUCCESS, payload: data });
    } catch (error) {
      errorHandler(error, dispatch, GET_ALL_COMMENTS_USER_ERROR);
    } finally {
      dispatch({ type: RESET_GET_ALL_COMMENTS_USER_LOADING });
    }
  };

  const getAllComments = async () => {
    dispatch({ type: GET_ALL_COMMENTS_BEGIN });

    try {
      const { data } = await authFetch.get("/comment");

      dispatch({ type: GET_ALL_COMMENTS_SUCCESS, payload: data });
      localStorage.setItem("commentInfo", JSON.stringify(data));
    } catch (error) {
      errorHandler(error, dispatch, GET_ALL_COMMENTS_ERROR);
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
      errorHandler(error, dispatch, ADD_COMMENT_BLOG_POST_ERROR);
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
      errorHandler(error, dispatch, EDIT_COMMENT_BLOG_POST_ERROR);
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
      errorHandler(error, dispatch, DELETE_COMMENT_BLOG_POST_ERROR);
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
      errorHandler(error, dispatch, DELETE_ALL_COMMENTS_BLOG_POST_ERROR);
    }
  };

  const resetCommentError = () => {
    dispatch({ type: RESET_COMMENT_ERROR });
  };

  return (
    <CommentContextState.Provider
      value={{
        ...state,
      }}
    >
      <CommentContextDispatch.Provider
        value={{
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
      </CommentContextDispatch.Provider>
    </CommentContextState.Provider>
  );
};

const useCommentContextState = () => {
  return useContext(CommentContextState);
};

const useCommentContextDispatch = () => {
  return useContext(CommentContextDispatch);
};

export {
  CommentProvider,
  initialState,
  useCommentContextState,
  useCommentContextDispatch,
};
