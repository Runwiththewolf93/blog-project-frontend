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
  // edit comment on existing blog post
  if (action.type === EDIT_COMMENT_BLOG_POST_BEGIN) {
    return { ...state, isLoadingComment: true };
  }
  if (action.type === EDIT_COMMENT_BLOG_POST_SUCCESS) {
    const updatedComment = action.payload;
    const updatedComments = state.commentInfo.map(comment =>
      comment._id === updatedComment._id ? updatedComment : comment
    );
    return {
      ...state,
      isLoadingComment: false,
      commentInfo: updatedComments,
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
    const id = action.payload;
    const updatedComments = state.commentInfo.filter(
      comment => comment._id !== id
    );
    return {
      ...state,
      isLoadingComment: false,
      commentInfo: updatedComments,
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
    const id = action.payload;
    const updatedComments = state.commentInfo.filter(
      comment => comment.blog !== id
    );
    return {
      ...state,
      isLoadingComment: false,
      commentInfo: updatedComments,
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
  return { ...state, isLoadingComment: false };
};

export default commentReducer;
