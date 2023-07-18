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

import { initialState } from "./voteContext";

/**
 * Reduces the state based on the given action.
 *
 * @param {Object} state - The current state.
 * @param {Object} action - The action to be performed.
 * @return {Object} The updated state.
 */
const voteReducer = (state, action) => {
  // get all votes
  if (action.type === GET_ALL_VOTES_BEGIN) {
    return { ...state, isLoadingVote: true };
  }
  if (action.type === GET_ALL_VOTES_SUCCESS) {
    return {
      ...state,
      isLoadingVote: false,
      voteInfo: action.payload,
      errorVote: null,
    };
  }
  if (action.type === GET_ALL_VOTES_ERROR) {
    return {
      ...state,
      isLoadingVote: false,
      errorVote: action.payload,
    };
  }
  // update vote and blog vote count
  if (action.type === UPDATE_BLOG_VOTE_COUNT_BEGIN) {
    return { ...state, isLoadingVote: true };
  }
  if (action.type === UPDATE_BLOG_VOTE_COUNT_SUCCESS) {
    return {
      ...state,
      isLoadingVote: false,
      voteFilter: action.payload.updatedVoteFilter,
      blogFilter: action.payload.updatedBlogFilter,
      errorVote: null,
    };
  }
  if (action.type === UPDATE_BLOG_VOTE_COUNT_ERROR) {
    return { ...state, isLoadingVote: false, errorVote: action.payload };
  }
  // update vote and comment vote count
  if (action.type === UPDATE_COMMENT_VOTE_COUNT_BEGIN) {
    return { ...state, isLoadingVote: true };
  }
  if (action.type === UPDATE_COMMENT_VOTE_COUNT_SUCCESS) {
    return {
      ...state,
      isLoadingVote: false,
      voteFilter: action.payload.updatedVoteFilter,
      blogFilter: action.payload.updatedCommentFilter,
      errorVote: null,
    };
  }
  if (action.type === UPDATE_COMMENT_VOTE_COUNT_ERROR) {
    return { ...state, isLoadingVote: false, errorVote: action.payload };
  }
  // delete vote and blog vote count
  if (action.type === DELETE_BLOG_VOTE_COUNT_BEGIN) {
    return { ...state, isLoadingVote: true };
  }
  if (action.type === DELETE_BLOG_VOTE_COUNT_SUCCESS) {
    return {
      ...state,
      isLoadingVote: false,
      voteFilter: action.payload.updatedVoteFilter,
      blogFilter: action.payload.updatedBlogFilter,
      errorVote: null,
    };
  }
  if (action.type === DELETE_BLOG_VOTE_COUNT_ERROR) {
    return { ...state, isLoadingVote: false, errorVote: action.payload };
  }
  // delete vote and comment vote count
  if (action.type === DELETE_COMMENT_VOTE_COUNT_BEGIN) {
    return { ...state, isLoadingVote: true };
  }
  if (action.type === DELETE_COMMENT_VOTE_COUNT_SUCCESS) {
    return {
      ...state,
      isLoadingVote: false,
      voteFilter: action.payload.updatedVoteFilter,
      commentFilter: action.payload.updatedCommentFilter,
      errorVote: null,
    };
  }
  if (action.type === DELETE_COMMENT_VOTE_COUNT_ERROR) {
    return {
      ...state,
      isLoadingVote: false,
      errorVote: action.payload,
    };
  }
  // delete all comment vote objects for a blog post
  if (action.type === DELETE_ALL_COMMENT_VOTES_FOR_BLOG_POST_BEGIN) {
    return { ...state, isLoadingVote: true };
  }
  if (action.type === DELETE_ALL_COMMENT_VOTES_FOR_BLOG_POST_SUCCESS) {
    return {
      ...state,
      isLoadingVote: false,
      voteFilter: action.payload.updatedVoteFilter,
      errorVote: null,
    };
  }
  if (action.type === DELETE_ALL_COMMENT_VOTES_FOR_BLOG_POST_ERROR) {
    return {
      ...state,
      isLoadingVote: false,
      errorVote: action.payload,
    };
  }
  // reset isLoadingVote
  if (action.type === RESET_VOTE_LOADING) {
    return { ...state, isLoadingVote: false };
  }
  // logout user vote
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userInfo: null,
      isLoadingVote: false,
      errorVote: null,
    };
  }
  return { ...state, isLoadingVote: false };
};

export default voteReducer;
