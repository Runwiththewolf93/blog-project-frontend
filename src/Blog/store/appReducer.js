import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  GET_ALL_USERS_BEGIN,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR,
  LOGOUT_USER,
  RESET_BLOG_POST,
  RESET_USER_ERROR,
  RESET_USER_SUCCESS,
  RESET_BLOG_ERROR,
  RESET_BLOG_LOADING,
  RESET_WAS_LOGGED_OUT,
  RESET_SUCCESS_MESSAGE,
  RESET_ERROR_MESSAGE,
  RESET_FILTERED_BLOG_POSTS,
  RESET_ERROR_FILTER,
  GET_ALL_BLOG_POSTS_BEGIN,
  GET_ALL_BLOG_POSTS_SUCCESS,
  GET_ALL_BLOG_POSTS_ERROR,
  GET_FILTERED_BLOG_POSTS_BEGIN,
  GET_FILTERED_BLOG_POSTS_SUCCESS,
  ADD_FILTERED_BLOG_POSTS_SUCCESS,
  GET_FILTERED_COMMENTS_SUCCESS,
  ADD_FILTERED_COMMENTS_SUCCESS,
  GET_FILTERED_VOTES_SUCCESS,
  ADD_FILTERED_VOTES_SUCCESS,
  GET_FILTERED_BLOG_POSTS_ERROR,
  GET_FILTERED_COMMENTS_ERROR,
  GET_FILTERED_VOTES_ERROR,
  GET_SINGLE_BLOG_POST_BEGIN,
  GET_SINGLE_BLOG_POST_SUCCESS,
  GET_SINGLE_BLOG_POST_ERROR,
  ADD_BLOG_POST_BEGIN,
  ADD_BLOG_POST_SUCCESS,
  ADD_BLOG_POST_ERROR,
  EDIT_BLOG_POST_BEGIN,
  EDIT_BLOG_POST_SUCCESS,
  EDIT_BLOG_POST_ERROR,
  DELETE_BLOG_POST_BEGIN,
  DELETE_BLOG_POST_SUCCESS,
  DELETE_BLOG_POST_ERROR,
  UPDATE_USER_PASSWORD_BEGIN,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_ERROR,
  FORGOT_USER_PASSWORD_BEGIN,
  FORGOT_USER_PASSWORD_SUCCESS,
  FORGOT_USER_PASSWORD_ERROR,
  RESET_USER_PASSWORD_BEGIN,
  RESET_USER_PASSWORD_SUCCESS,
  RESET_USER_PASSWORD_ERROR,
  UPLOAD_BLOG_IMAGES_BEGIN,
  UPLOAD_BLOG_IMAGES_SUCCESS,
  UPLOAD_BLOG_IMAGES_ERROR,
} from "./actions";

import { initialState } from "./appContext";

const appReducer = (state, action) => {
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
  // get all users reducer
  if (action.type === GET_ALL_USERS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_ALL_USERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      users: action.payload,
      error: null,
    };
  }
  if (action.type === GET_ALL_USERS_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  }
  // logout reducer
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userInfo: null,
      isLoading: false,
      isLoadingBlog: false,
      error: null,
      errorBlog: null,
      wasLoggedOut: action.manualLogout,
    };
  }
  // reset blogPost state
  if (action.type === RESET_BLOG_POST) {
    return { ...state, blogPost: {} };
  }
  // reset error state
  if (action.type === RESET_USER_ERROR) {
    return { ...state, error: null };
  }
  // reset success state
  if (action.type === RESET_USER_SUCCESS) {
    return { ...state, success: false };
  }
  // reset blog error
  if (action.type === RESET_BLOG_ERROR) {
    return { ...state, errorBlog: null };
  }
  // reset blog loading
  if (action.type === RESET_BLOG_LOADING) {
    return { ...state, isLoadingBlog: false };
  }
  // reset wasLoggedOut state
  if (action.type === RESET_WAS_LOGGED_OUT) {
    return { ...state, wasLoggedOut: false };
  }
  // reset successMessage state
  if (action.type === RESET_SUCCESS_MESSAGE) {
    return { ...state, successMessage: "" };
  }
  // reset errorReset state
  if (action.type === RESET_ERROR_MESSAGE) {
    return { ...state, errorReset: null };
  }
  // reset filtered blog posts
  if (action.type === RESET_FILTERED_BLOG_POSTS) {
    return { ...state, blogFilter: [] };
  }
  // reset errorFilter state
  if (action.type === RESET_ERROR_FILTER) {
    return { ...state, errorFilter: null };
  }
  // list available blog posts
  if (action.type === GET_ALL_BLOG_POSTS_BEGIN) {
    return { ...state, isLoadingBlog: true };
  }
  if (action.type === GET_ALL_BLOG_POSTS_SUCCESS) {
    return {
      ...state,
      isLoadingBlog: false,
      blogInfo: action.payload,
      errorBlog: null,
    };
  }
  if (action.type === GET_ALL_BLOG_POSTS_ERROR) {
    return { ...state, isLoadingBlog: false, errorBlog: action.payload };
  }
  // list filtered blog posts, comments, and votes
  if (action.type === GET_FILTERED_BLOG_POSTS_BEGIN) {
    return { ...state, isLoadingFilter: true };
  }
  if (action.type === GET_FILTERED_BLOG_POSTS_SUCCESS) {
    return {
      ...state,
      isLoadingFilter: false,
      blogFilter: action.payload,
      errorFilter: null,
    };
  }
  if (action.type === ADD_FILTERED_BLOG_POSTS_SUCCESS) {
    return {
      ...state,
      isLoadingFilter: false,
      blogFilter: [...state.blogFilter, ...action.payload],
      errorFilter: null,
    };
  }
  if (action.type === GET_FILTERED_COMMENTS_SUCCESS) {
    return {
      ...state,
      isLoadingFilter: false,
      commentFilter: action.payload,
      errorFilter: null,
    };
  }
  if (action.type === ADD_FILTERED_COMMENTS_SUCCESS) {
    return {
      ...state,
      isLoadingFilter: false,
      commentFilter: [...state.commentFilter, ...action.payload],
      errorFilter: null,
    };
  }
  if (action.type === GET_FILTERED_VOTES_SUCCESS) {
    return {
      ...state,
      isLoadingFilter: false,
      voteFilter: action.payload,
      errorFilter: null,
    };
  }
  if (action.type === ADD_FILTERED_VOTES_SUCCESS) {
    return {
      ...state,
      isLoadingFilter: false,
      voteFilter: [...state.voteFilter, ...action.payload],
      errorFilter: null,
    };
  }
  if (action.type === GET_FILTERED_BLOG_POSTS_ERROR) {
    return { ...state, isLoadingFilter: false, errorFilter: action.payload };
  }
  if (action.type === GET_FILTERED_COMMENTS_ERROR) {
    return { ...state, isLoadingFilter: false, errorFilter: action.payload };
  }
  if (action.type === GET_FILTERED_VOTES_ERROR) {
    return { ...state, isLoadingFilter: false, errorFilter: action.payload };
  }
  // get single blog post
  if (action.type === GET_SINGLE_BLOG_POST_BEGIN) {
    return { ...state, isLoadingBlog: true };
  }
  if (action.type === GET_SINGLE_BLOG_POST_SUCCESS) {
    return {
      ...state,
      isLoadingBlog: false,
      blogPost: action.payload,
      errorBlog: null,
    };
  }
  if (action.type === GET_SINGLE_BLOG_POST_ERROR) {
    return { ...state, isLoadingBlog: false, errorBlog: action.payload };
  }
  // add a new blog post
  if (action.type === ADD_BLOG_POST_BEGIN) {
    return { ...state, isLoadingBlog: true };
  }
  if (action.type === ADD_BLOG_POST_SUCCESS) {
    return {
      ...state,
      isLoadingBlog: false,
      blogInfo: [...state.blogInfo, action.payload],
      errorBlog: null,
    };
  }
  if (action.type === ADD_BLOG_POST_ERROR) {
    return { ...state, isLoadingBlog: false, errorBlog: action.payload };
  }
  // edit an existing blog post
  if (action.type === EDIT_BLOG_POST_BEGIN) {
    return { ...state, isLoadingBlog: true };
  }
  if (action.type === EDIT_BLOG_POST_SUCCESS) {
    const updatedBlogInfo = state.blogInfo.map(post => {
      if (post._id === action.payload.id) {
        return { ...post, ...action.payload.updatedValues };
      } else {
        return post;
      }
    });
    return {
      ...state,
      isLoadingBlog: false,
      blogInfo: updatedBlogInfo,
      errorBlog: null,
    };
  }
  if (action.type === EDIT_BLOG_POST_ERROR) {
    return { ...state, isLoadingBlog: false, errorBlog: action.payload };
  }
  // delete an existing blog post
  if (action.type === DELETE_BLOG_POST_BEGIN) {
    return { ...state, isLoadingBlog: true };
  }
  if (action.type === DELETE_BLOG_POST_SUCCESS) {
    const updatedBlogInfo = state.blogInfo.filter(
      post => post._id !== action.payload
    );
    return {
      ...state,
      isLoadingBlog: false,
      blogInfo: updatedBlogInfo,
      errorBlog: null,
    };
  }
  if (action.type === DELETE_BLOG_POST_ERROR) {
    return { ...state, isLoadingBlog: false, errorBlog: action.payload };
  }
  // update logged in user password
  if (action.type === UPDATE_USER_PASSWORD_BEGIN) {
    return { ...state, isLoadingReset: true };
  }
  if (action.type === UPDATE_USER_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoadingReset: false,
      successMessage: action.payload,
      errorReset: null,
    };
  }
  if (action.type === UPDATE_USER_PASSWORD_ERROR) {
    return {
      ...state,
      isLoadingReset: false,
      errorReset: action.payload,
    };
  }
  // send email to user that forgot password
  if (action.type === FORGOT_USER_PASSWORD_BEGIN) {
    return { ...state, isLoadingReset: true };
  }
  if (action.type === FORGOT_USER_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoadingReset: false,
      successMessage: action.payload,
      errorReset: null,
    };
  }
  if (action.type === FORGOT_USER_PASSWORD_ERROR) {
    return {
      ...state,
      isLoadingReset: false,
      errorReset: action.payload,
    };
  }
  // send email and reset user password
  if (action.type === RESET_USER_PASSWORD_BEGIN) {
    return { ...state, isLoadingReset: true };
  }
  if (action.type === RESET_USER_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoadingReset: false,
      successMessage: action.payload,
      errorReset: null,
    };
  }
  if (action.type === RESET_USER_PASSWORD_ERROR) {
    return { ...state, isLoadingReset: false, errorReset: action.payload };
  }
  // upload images to cloudinary
  if (action.type === UPLOAD_BLOG_IMAGES_BEGIN) {
    return { ...state, isLoadingBlog: true };
  }
  if (action.type === UPLOAD_BLOG_IMAGES_SUCCESS) {
    return {
      ...state,
      isLoadingBlog: false,
      images: action.payload,
      errorBlog: null,
    };
  }
  if (action.type === UPLOAD_BLOG_IMAGES_ERROR) {
    return { ...state, isLoadingBlog: false, errorBlog: action.payload };
  }
  return { ...state, isLoadingBlog: false };
};
export default appReducer;
