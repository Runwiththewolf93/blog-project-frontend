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
      blogCommentInfo: action.payload,
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
  // list all comments
  if (action.type === GET_ALL_COMMENTS_BEGIN) {
    return { ...state, isLoadingComment: true };
  }
  if (action.type === GET_ALL_COMMENTS_SUCCESS) {
    return {
      ...state,
      isLoadingComment: false,
      commentInfo: action.payload,
      errorComment: null,
    };
  }
  if (action.type === GET_ALL_COMMENTS_ERROR) {
    return { ...state, isLoadingComment: false, errorComment: action.payload };
  }
  // add comments to existing blog post
  if (action.type === ADD_COMMENT_BLOG_POST_BEGIN) {
    return { ...state, isLoadingComment: true };
  }
  if (action.type === ADD_COMMENT_BLOG_POST_SUCCESS) {
    console.log("Updated comments:", action.payload);
    return {
      ...state,
      isLoadingComment: false,
      commentFilter: action.payload,
      errorComment: null,
    };
  }
  if (action.type === ADD_COMMENT_BLOG_POST_ERROR) {
    return { ...state, isLoadingComment: false, errorComment: action.payload };
  }
  // edit comment on existing blog post
  if (action.type === EDIT_COMMENT_BLOG_POST_BEGIN) {
    return { ...state, isLoadingComment: true };
  }
  if (action.type === EDIT_COMMENT_BLOG_POST_SUCCESS) {
    console.log("Updated comments:", action.payload);
    return {
      ...state,
      isLoadingComment: false,
      commentFilter: action.payload,
      errorComment: null,
    };
  }
  if (action.type === EDIT_COMMENT_BLOG_POST_ERROR) {
    return { ...state, isLoadingComment: false, errorComment: action.payload };
  }
  // delete comment on existing blog post
  if (action.type === DELETE_COMMENT_BLOG_POST_BEGIN) {
    return { ...state, isLoadingComment: true };
  }
  if (action.type === DELETE_COMMENT_BLOG_POST_SUCCESS) {
    console.log("Updated comments:", action.payload);
    return {
      ...state,
      isLoadingComment: false,
      commentFilter: action.payload,
      errorComment: null,
    };
  }
  if (action.type === DELETE_COMMENT_BLOG_POST_ERROR) {
    return { ...state, isLoadingComment: false, errorComment: action.payload };
  }
  // delete comments from an existing blog post
  if (action.type === DELETE_ALL_COMMENTS_BLOG_POST_BEGIN) {
    return { ...state, isLoadingComment: true };
  }
  if (action.type === DELETE_ALL_COMMENTS_BLOG_POST_SUCCESS) {
    console.log("Updated comments:", action.payload);
    return {
      ...state,
      isLoadingComment: false,
      commentFilter: action.payload,
      errorComment: null,
    };
  }
  if (action.type === DELETE_ALL_COMMENTS_BLOG_POST_ERROR) {
    return { ...state, isLoadingComment: false, errorComment: action.payload };
  }
  // reset error comment
  if (action.type === RESET_COMMENT_ERROR) {
    return { ...state, errorComment: null };
  }
  // reset isLoadingUserComment
  if (action.type === RESET_GET_ALL_COMMENTS_USER_LOADING) {
    return { ...state, isLoadingUserComment: false };
  }
  // reset isLoadingComment
  if (action.type === RESET_COMMENT_LOADING) {
    return { ...state, isLoadingComment: false };
  }
  // logout user comment
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userInfo: null,
      isLoadingComment: false,
      isLoadingUserComment: false,
      errorComment: null,
      errorUserComment: null,
    };
  }
  // get more filtered comments
  if (action.payload === GET_MORE_FILTERED_COMMENTS_BEGIN) {
    return { ...state, isLoadingUserComment: true };
  }
  if (action.payload === GET_MORE_FILTERED_COMMENTS_SUCCESS) {
    return {
      ...state,
      isLoadingUserComment: false,
      commentFilter: action.payload,
      errorUserComment: null,
    };
  }
  if (action.payload === GET_MORE_FILTERED_COMMENTS_ERROR) {
    return {
      ...state,
      isLoadingUserComment: false,
      errorUserComment: action.payload,
    };
  }
  return { ...state, isLoadingComment: false };
};

export default commentReducer;
