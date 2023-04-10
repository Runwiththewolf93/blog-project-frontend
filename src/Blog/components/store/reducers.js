import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  RESET_USER_ERROR,
  RESET_USER_SUCCESS,
  GET_ALL_BLOG_POSTS_BEGIN,
  GET_ALL_BLOG_POSTS_SUCCESS,
  GET_ALL_BLOG_POSTS_ERROR,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  // register reducer
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      userInfo: action.payload,
      error: null,
      success: true,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
      success: false,
    };
  }
  // login reducer
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      userInfo: action.payload,
      error: null,
      success: true,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
      success: false,
    };
  }
  // logout reducer
  if (action.type === LOGOUT_USER) {
    return { ...initialState, userInfo: null, error: null };
  }
  // reset error state
  if (action.type === RESET_USER_ERROR) {
    return { ...state, error: null };
  }
  // reset success state
  if (action.type === RESET_USER_SUCCESS) {
    return { ...state, success: false };
  }
  if (action.type === GET_ALL_BLOG_POSTS_BEGIN) {
    return { ...state, isLoadingBlog: true };
  }
  if (action.type === GET_ALL_BLOG_POSTS_SUCCESS) {
    return { ...state, blogInfo: action.payload, errorBlog: null };
  }
  if (action.type === GET_ALL_BLOG_POSTS_ERROR) {
    return { ...state, isLoadingBlog: false, errorBlog: action.payload };
  }
  return state;
};

export default reducer;
