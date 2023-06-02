import React, { useReducer, useContext } from "react";

import voteReducer from "./voteReducer";
import axios from "axios";
import axiosRetry from "axios-retry";
import { errorHandler } from "../utils/helper";
import {
  GET_ALL_VOTES_BEGIN,
  GET_ALL_VOTES_SUCCESS,
  GET_ALL_VOTES_ERROR,
  UPDATE_BLOG_VOTE_COUNT_BEGIN,
  UPDATE_BLOG_VOTE_COUNT_SUCCESS,
  UPDATE_BLOG_VOTE_COUNT_ERROR,
  UPDATE_COMMENT_VOTE_COUNT_BEGIN,
  UPDATE_COMMENT_VOTE_COUNT_SUCCESS,
  UPDATE_COMMENT_VOTE_COUNT_ERROR,
  DELETE_BLOG_VOTE_COUNT_BEGIN,
  DELETE_BLOG_VOTE_COUNT_SUCCESS,
  DELETE_BLOG_VOTE_COUNT_ERROR,
  DELETE_COMMENT_VOTE_COUNT_BEGIN,
  DELETE_COMMENT_VOTE_COUNT_SUCCESS,
  DELETE_COMMENT_VOTE_COUNT_ERROR,
  DELETE_ALL_COMMENT_VOTES_FOR_BLOG_POST_BEGIN,
  DELETE_ALL_COMMENT_VOTES_FOR_BLOG_POST_SUCCESS,
  DELETE_ALL_COMMENT_VOTES_FOR_BLOG_POST_ERROR,
  RESET_VOTE_LOADING,
  LOGOUT_USER,
} from "./actions";
import {
  userInfoFromLocalStorage,
  blogInfoFromLocalStorage,
} from "./appContext";
import { commentInfoFromLocalStorage } from "./commentContext";

const voteInfoFromLocalStorage =
  JSON.parse(localStorage.getItem("voteInfo")) || [];

const initialState = {
  userInfo: userInfoFromLocalStorage,
  blogInfo: blogInfoFromLocalStorage,
  commentInfo: commentInfoFromLocalStorage,
  isLoadingVote: false,
  voteInfo: voteInfoFromLocalStorage,
  errorVote: null,
};

const VoteContextState = React.createContext();
const VoteContextDispatch = React.createContext();

const VoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(voteReducer, initialState);

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

  const getAllVotes = async () => {
    dispatch({ type: GET_ALL_VOTES_BEGIN });

    try {
      const { data } = await authFetch.get("/vote");

      dispatch({ type: GET_ALL_VOTES_SUCCESS, payload: data });
      localStorage.setItem("voteInfo", JSON.stringify(data));
    } catch (error) {
      errorHandler(error, dispatch, GET_ALL_VOTES_ERROR);
    } finally {
      dispatch({ type: RESET_VOTE_LOADING });
    }
  };

  const updateBlogVoteCount = async (blogId, voteCount) => {
    dispatch({ type: UPDATE_BLOG_VOTE_COUNT_BEGIN });

    try {
      const { data } = await authFetch.post(
        `/vote/blogId/${blogId}?vote=${voteCount}`
      );

      // Parse the data received from the backend
      const { vote, totalVotes } = data;

      // Get the existing vote object from the voteInfo array
      const existingVote = state.voteInfo.find(
        v => v.post === vote.post && v.user === vote.user
      );

      // Update the totalVotes property of the blogInfo object
      const updatedBlogInfo = state.blogInfo.map(blog => {
        if (blog._id === blogId) {
          return { ...blog, totalVotes };
        }
        return blog;
      });

      if (existingVote) {
        // If the existing vote has the same value as the new vote, throw an error
        if (existingVote.vote === vote.vote) {
          throw new Error("You have already voted with the same value!");
        }

        // Update the voteInfo object with the existing vote
        const updatedVoteInfo = state.voteInfo.map(v =>
          v === existingVote ? { ...v, ...vote } : v
        );

        // Add updated blogInfo and voteInfo objects to state
        dispatch({
          type: UPDATE_BLOG_VOTE_COUNT_SUCCESS,
          payload: { updatedBlogInfo, updatedVoteInfo },
        });

        // Save the updated voteInfo to localStorage
        localStorage.setItem("voteInfo", JSON.stringify(updatedVoteInfo));
      } else {
        // Add new vote to existing voteInfo object
        const updatedVoteInfo = [...state.voteInfo, vote];

        // Add updated blogInfo and voteInfo objects to state
        dispatch({
          type: UPDATE_BLOG_VOTE_COUNT_SUCCESS,
          payload: { updatedBlogInfo, updatedVoteInfo },
        });

        // Save the updated voteInfo to localStorage
        localStorage.setItem("voteInfo", JSON.stringify(updatedVoteInfo));
      }

      // Save the updated blogInfo to localStorage
      localStorage.setItem("blogInfo", JSON.stringify(updatedBlogInfo));
    } catch (error) {
      errorHandler(error, dispatch, UPDATE_BLOG_VOTE_COUNT_ERROR);
    }
  };

  const updateCommentVoteCount = async (commentId, voteCount) => {
    dispatch({ type: UPDATE_COMMENT_VOTE_COUNT_BEGIN });

    try {
      const { data } = await authFetch.post(
        `/vote/commentId/${commentId}?vote=${voteCount}`
      );

      // Parse the data received from the backend
      const { vote, totalVotes } = data;

      // Get the existing vote object from the voteInfo array
      const existingVote = state.voteInfo.find(
        v => v.post === vote.post && v.user === vote.user
      );

      // Update the totalVotes property of the blogInfo object
      const updatedCommentInfo = state.commentInfo.map(comment => {
        if (comment._id === commentId) {
          return { ...comment, totalVotes };
        }
        return comment;
      });

      if (existingVote) {
        // If the existing vote has the same value as the new vote, throw an error
        if (existingVote.vote === vote.vote) {
          throw new Error("You have already voted with the same value!");
        }

        // Update the voteInfo object with the existing vote
        const updatedVoteInfo = state.voteInfo.map(v =>
          v === existingVote ? { ...v, ...vote } : v
        );

        // Add updated commentInfo and voteInfo objects to state
        dispatch({
          type: UPDATE_COMMENT_VOTE_COUNT_SUCCESS,
          payload: { updatedCommentInfo, updatedVoteInfo },
        });

        // Save the updated voteInfo to localStorage
        localStorage.setItem("voteInfo", JSON.stringify(updatedVoteInfo));
      } else {
        // Add new vote to existing voteInfo object
        const updatedVoteInfo = [...state.voteInfo, vote];

        // Add updated commentInfo and voteInfo objects to state
        dispatch({
          type: UPDATE_COMMENT_VOTE_COUNT_SUCCESS,
          payload: { updatedCommentInfo, updatedVoteInfo },
        });

        // Save the updated voteInfo to localStorage
        localStorage.setItem("voteInfo", JSON.stringify(updatedVoteInfo));
      }

      // Save the updated commentInfo to localStorage
      localStorage.setItem("commentInfo", JSON.stringify(updatedCommentInfo));
    } catch (error) {
      errorHandler(error, dispatch, UPDATE_COMMENT_VOTE_COUNT_ERROR);
    }
  };

  const deleteBlogVoteCount = async blogId => {
    dispatch({ type: DELETE_BLOG_VOTE_COUNT_BEGIN });

    try {
      const { data } = await authFetch.delete(`/vote/blogId/${blogId}`);

      // Parse the data received from the backend
      const { vote, totalVotes } = data;

      // Update the totalVotes property of the blogInfo object
      const updatedBlogInfo = state.blogInfo.map(blog => {
        if (blog._id === blogId) {
          return { ...blog, totalVotes };
        }
        return blog;
      });

      // Remove the deleted vote from the voteInfo array
      const updatedVoteInfo = state.voteInfo.filter(
        v => !(v.post === vote.post && v.user === vote.user)
      );

      // Add updated blogInfo and voteInfo objects to state
      dispatch({
        type: DELETE_BLOG_VOTE_COUNT_SUCCESS,
        payload: { updatedBlogInfo, updatedVoteInfo },
      });

      // Save the updated voteInfo to localStorage
      localStorage.setItem("voteInfo", JSON.stringify(updatedVoteInfo));

      // Save the updated blogInfo to localStorage
      localStorage.setItem("blogInfo", JSON.stringify(updatedBlogInfo));
    } catch (error) {
      errorHandler(error, dispatch, DELETE_BLOG_VOTE_COUNT_ERROR);
    }
  };

  const deleteCommentVoteCount = async commentId => {
    dispatch({ type: DELETE_COMMENT_VOTE_COUNT_BEGIN });

    try {
      const { data } = await authFetch.delete(`/vote/commentId/${commentId}`);

      // Parse the data received from the backend
      const { vote, totalVotes } = data;

      // Update the totalVotes property of the commentInfo object
      const updatedCommentInfo = state.commentInfo.map(comment => {
        if (comment._id === commentId) {
          return { ...comment, totalVotes };
        }
        return comment;
      });

      // Remove the deleted vote from the voteInfo array
      const updatedVoteInfo = state.voteInfo.filter(
        v => !(v.post === vote.post && v.user === vote.user)
      );

      // Add updated commentInfo and voteInfo objects to state
      dispatch({
        type: DELETE_COMMENT_VOTE_COUNT_SUCCESS,
        payload: { updatedCommentInfo, updatedVoteInfo },
      });

      // Save the updated voteInfo to localStorage
      localStorage.setItem("voteInfo", JSON.stringify(updatedVoteInfo));

      // Save the updated commentInfo to localStorage
      localStorage.setItem("commentInfo", JSON.stringify(updatedCommentInfo));
    } catch (error) {
      errorHandler(error, dispatch, DELETE_COMMENT_VOTE_COUNT_ERROR);
    }
  };

  const deleteAllCommentVotesForBlogPost = async blogId => {
    dispatch({ type: DELETE_ALL_COMMENT_VOTES_FOR_BLOG_POST_BEGIN });

    try {
      await authFetch.delete(`/vote/blogId/${blogId}/comments`);

      // Remove the deleted votes from the voteInfo array
      const updatedVoteInfo = state.voteInfo.filter(vote => {
        // Only keep the votes that are not related to the deleted blog
        return !state.commentInfo.some(
          comment => comment.blog === blogId && comment._id === vote.post
        );
      });

      // Add updated voteInfo object to state
      dispatch({
        type: DELETE_ALL_COMMENT_VOTES_FOR_BLOG_POST_SUCCESS,
        payload: { updatedVoteInfo },
      });

      // Save the updated voteInfo to localStorage
      localStorage.setItem("voteInfo", JSON.stringify(updatedVoteInfo));
    } catch (error) {
      errorHandler(
        error,
        dispatch,
        DELETE_ALL_COMMENT_VOTES_FOR_BLOG_POST_ERROR
      );
    }
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    localStorage.clear();
  };

  return (
    <VoteContextState.Provider
      value={{
        ...state,
      }}
    >
      <VoteContextDispatch.Provider
        value={{
          // dispatch functions
          getAllVotes,
          updateBlogVoteCount,
          updateCommentVoteCount,
          deleteBlogVoteCount,
          deleteCommentVoteCount,
          deleteAllCommentVotesForBlogPost,
        }}
      >
        {children}
      </VoteContextDispatch.Provider>
    </VoteContextState.Provider>
  );
};

const useVoteContextState = () => {
  return useContext(VoteContextState);
};

const useVoteContextDispatch = () => {
  return useContext(VoteContextDispatch);
};

export {
  VoteProvider,
  initialState,
  useVoteContextState,
  useVoteContextDispatch,
};
