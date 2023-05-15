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
  LOGOUT_USER,
} from "./actions";

import { initialState } from "./voteContext";

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
      voteInfo: action.payload.updatedVoteInfo,
      blogInfo: action.payload.updatedBlogInfo,
      errorVote: false,
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
      voteInfo: action.payload.updatedVoteInfo,
      commentInfo: action.payload.updatedCommentInfo,
      errorVote: false,
    };
  }
  if (action.type === UPDATE_COMMENT_VOTE_COUNT_ERROR) {
    return { ...state, isLoadingVote: false, errorVote: action.payload };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userInfo: null,
      isLoadingVote: false,
      errorVote: null,
    };
  }
  return state;
};

export default voteReducer;
