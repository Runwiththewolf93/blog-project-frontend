import React, { useReducer, useContext, useState } from "react";
import { useLocalStorageContext } from "./localStorageContext";
import commentReducer from "./commentReducer";
import createAuthFetch from "./createAuthFetch";
import { errorHandler, filterNewItems } from "../utils/helper";
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
  GET_MORE_FILTERED_COMMENTS_BEGIN,
  GET_MORE_FILTERED_COMMENTS_SUCCESS,
  GET_MORE_FILTERED_COMMENTS_ERROR,
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
import { userInfoFromLocalStorage, useAppContextState } from "./appContext";
import { commentFilterFromLocalStorage } from "./blogContext";

// commentContext initialState object
const initialState = {
  userInfo: userInfoFromLocalStorage,
  isLoadingComment: true,
  commentFilter: commentFilterFromLocalStorage,
  commentInfo: [],
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
  const [hasMoreComments, setHasMoreComments] = useState({});
  const { commentFilterLocalStorage, setCommentFilterLocalStorage } =
    useLocalStorageContext();
  const { userInfo } = useAppContextState();

  // console.log("comment hook commentContext", commentFilterLocalStorage);

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    localStorage.clear();
  };

  // axios
  const authFetch = createAuthFetch(userInfo, logoutUser);

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
    } catch (error) {
      errorHandler(error, dispatch, GET_ALL_COMMENTS_ERROR);
    } finally {
      dispatch({ type: RESET_COMMENT_LOADING });
    }
  };

  // addCommentBlogPost dispatch function
  const addCommentBlogPost = async (blogId, comment) => {
    dispatch({ type: ADD_COMMENT_BLOG_POST_BEGIN });

    try {
      const { data } = await authFetch.post(
        `/comment/blogId/${blogId}`,
        comment
      );

      console.log("Received data:", data);
      console.log("state commentFilter", state.commentFilter);

      const updatedCommentFilter = [...commentFilterLocalStorage, data];

      console.log("Modified data:", updatedCommentFilter);
      console.log("state commentFilter", state.commentFilter);

      dispatch({
        type: ADD_COMMENT_BLOG_POST_SUCCESS,
        payload: updatedCommentFilter,
      });

      // Update localStorage with the new commentFilter array
      setCommentFilterLocalStorage(updatedCommentFilter);
    } catch (error) {
      errorHandler(error, dispatch, ADD_COMMENT_BLOG_POST_ERROR);
    }
  };

  // editCommentBlogPost dispatch function
  const editCommentBlogPost = async (blogId, commentId, editedComment) => {
    dispatch({ type: EDIT_COMMENT_BLOG_POST_BEGIN });

    try {
      const { data } = await authFetch.patch(
        `/comment/blogId/${blogId}/commentId/${commentId}`,
        editedComment
      );

      console.log("Received data:", data);
      console.log("state commentFilter", state.commentFilter);

      // Update the state with the new comment
      const updatedCommentFilter = commentFilterLocalStorage.map(comment =>
        comment._id === commentId ? data : comment
      );

      console.log("Modified data:", updatedCommentFilter);
      console.log("state commentFilter", state.commentFilter);

      dispatch({
        type: EDIT_COMMENT_BLOG_POST_SUCCESS,
        payload: updatedCommentFilter,
      });

      // Update localStorage with the new commentFilter array
      setCommentFilterLocalStorage(updatedCommentFilter);
    } catch (error) {
      errorHandler(error, dispatch, EDIT_COMMENT_BLOG_POST_ERROR);
    }
  };

  // deleteCommentBlogPost dispatch function
  const deleteCommentBlogPost = async (blogId, commentId) => {
    dispatch({ type: DELETE_COMMENT_BLOG_POST_BEGIN });

    try {
      await authFetch.delete(
        `/comment/blogId/${blogId}/commentId/${commentId}`
      );

      console.log("state commentFilter", state.commentFilter);

      // Update the state by removing the deleted comment
      const updatedCommentFilter = commentFilterLocalStorage.filter(
        comment => comment._id !== commentId
      );

      console.log("Modified data:", updatedCommentFilter);
      console.log("state commentFilter", state.commentFilter);

      dispatch({
        type: DELETE_COMMENT_BLOG_POST_SUCCESS,
        payload: updatedCommentFilter,
      });

      // Update localStorage with the new commentFilter array
      setCommentFilterLocalStorage(updatedCommentFilter);
    } catch (error) {
      errorHandler(error, dispatch, DELETE_COMMENT_BLOG_POST_ERROR);
    }
  };

  // deleteAllCommentsBlogPost dispatch function
  const deleteAllCommentsBlogPost = async blogId => {
    dispatch({ type: DELETE_ALL_COMMENTS_BLOG_POST_BEGIN });

    try {
      await authFetch.delete(`/comment/blogId/${blogId}`);

      console.log("state commentFilter", state.commentFilter);

      const updatedCommentFilter = commentFilterLocalStorage.filter(
        comment => comment.blog !== blogId
      );

      dispatch({
        type: DELETE_ALL_COMMENTS_BLOG_POST_SUCCESS,
        payload: updatedCommentFilter,
      });

      console.log("Modified data:", updatedCommentFilter);
      console.log("state commentFilter", state.commentFilter);

      // Update localStorage with the new commentFilter array
      setCommentFilterLocalStorage(updatedCommentFilter);
    } catch (error) {
      errorHandler(error, dispatch, DELETE_ALL_COMMENTS_BLOG_POST_ERROR);
    }
  };

  // resetCommentError dispatch function
  const resetCommentError = () => {
    dispatch({ type: RESET_COMMENT_ERROR });
  };

  // getMoreFilteredComments dispatch function
  const getMoreFilteredComments = async (
    blogId,
    commentIds,
    limit = 5,
    sort = "createdAt",
    order = "asc"
  ) => {
    dispatch({ type: GET_MORE_FILTERED_COMMENTS_BEGIN });
    console.log({ sort });
    console.log({ order });

    try {
      const { data } = await authFetch.post("/comment/more", {
        blogId,
        commentIds,
        limit,
        sort,
        order,
      });
      console.log(
        "server data",
        data.map(i => i._id)
      );

      // Filter out any comments that are already in the commentFilter state
      const newComments = filterNewItems(data, state.commentFilter);
      console.log(
        "newComments",
        newComments.map(c => c._id)
      );
      console.log(
        "state.commentFilter",
        state.commentFilter.map(c => c._id)
      );

      // If there are no new comments, there are no more comments
      setHasMoreComments(prevState => ({
        ...prevState,
        [blogId]: newComments.length === limit,
      }));

      dispatch({
        type: GET_MORE_FILTERED_COMMENTS_SUCCESS,
        payload: newComments,
      });

      console.log("localStorage state", [
        ...state.commentFilter.map(c => c._id),
        ...newComments.map(c => c._id),
      ]);

      // Update localStorage with the new commentFilter array
      setCommentFilterLocalStorage([...state.commentFilter, ...newComments]);

      // Return newComments
      return newComments;
    } catch (error) {
      errorHandler(error, dispatch, GET_MORE_FILTERED_COMMENTS_ERROR);
    }
  };

  return (
    <CommentContextState.Provider
      value={{
        ...state,
        commentFilterLocalStorage,
        hasMoreComments,
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
          getMoreFilteredComments,
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
