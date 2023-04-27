import {
  GET_ALL_COMMENTS_BLOG_POST_BEGIN,
  GET_ALL_COMMENTS_BLOG_POST_SUCCESS,
  GET_ALL_COMMENTS_BLOG_POST_ERROR,
  GET_ALL_COMMENTS_USER_BEGIN,
  GET_ALL_COMMENTS_USER_SUCCESS,
  GET_ALL_COMMENTS_USER_ERROR,
  ADD_COMMENT_BLOG_POST_BEGIN,
  ADD_COMMENT_BLOG_POST_SUCCESS,
  ADD_COMMENT_BLOG_POST_ERROR,
} from "./actions";

import { initialState } from "./commentContext";

const commentReducer = (state, action) => {
  // list comments for a blog post
  if (action.type === GET_ALL_COMMENTS_BLOG_POST_BEGIN) {
    return { ...state, isLoadingComment: true };
  }
  if (action.type === GET_ALL_COMMENTS_BLOG_POST_SUCCESS) {
    return {
      ...state,
      isLoadingComment: false,
      commentInfo: action.payload,
      errorComment: null,
    };
  }
  if (action.type === GET_ALL_COMMENTS_BLOG_POST_ERROR) {
    return { ...state, isLoadingComment: false, errorComment: action.payload };
  }
  // list comments for logged in user
  if (action.type === GET_ALL_COMMENTS_USER_BEGIN) {
    return { ...state, isLoadingUserComment: true };
  }
  if (action.type === GET_ALL_COMMENTS_USER_SUCCESS) {
    return {
      ...state,
      isLoadingUserComment: false,
      userCommentInfo: action.payload,
      errorUserComment: null,
    };
  }
  if (action.type === GET_ALL_COMMENTS_USER_ERROR) {
    return {
      ...state,
      isLoadingUserComment: false,
      errorUserComment: action.payload,
    };
  }
  // add comments to existing blog post
  if (action.type === ADD_COMMENT_BLOG_POST_BEGIN) {
    return { ...state, isLoadingComment: true };
  }
  if (action.type === ADD_COMMENT_BLOG_POST_SUCCESS) {
    return {
      ...state,
      commentInfo: [...state.commentInfo, action.payload],
      isLoadingComment: false,
      errorComment: null,
    };
  }
  if (action.type === ADD_COMMENT_BLOG_POST_ERROR) {
    return { ...state, isLoadingComment: false, errorComment: action.payload };
  }
  return state;
};

export default commentReducer;
