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
  ADD_BLOG_POST_BEGIN,
  ADD_BLOG_POST_SUCCESS,
  ADD_BLOG_POST_ERROR,
  EDIT_BLOG_POST_BEGIN,
  EDIT_BLOG_POST_SUCCESS,
  EDIT_BLOG_POST_ERROR,
  DELETE_BLOG_POST_BEGIN,
  DELETE_BLOG_POST_SUCCESS,
  DELETE_BLOG_POST_ERROR,
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
  // list available blog posts
  if (action.type === GET_ALL_BLOG_POSTS_BEGIN) {
    return { ...state, isLoadingBlog: true };
  }
  if (action.type === GET_ALL_BLOG_POSTS_SUCCESS) {
    return { ...state, blogInfo: action.payload, errorBlog: null };
  }
  if (action.type === GET_ALL_BLOG_POSTS_ERROR) {
    return { ...state, isLoadingBlog: false, errorBlog: action.payload };
  }
  // add a new blog post
  if (action.type === ADD_BLOG_POST_BEGIN) {
    return { ...state, isLoadingBlog: true, errorBlog: null };
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
    return { ...state, isLoadingBlog: true, errorBlog: null };
  }
  if (action.type === EDIT_BLOG_POST_SUCCESS) {
    const updatedBlogInfo = state.blogInfo.map(post => {
      if (post._id === action.payload.id) {
        return { ...post, ...action.payload.updatedValues };
      } else {
        return post;
      }
    });
    return { ...state, blogInfo: updatedBlogInfo };
  }
  if (action.type === EDIT_BLOG_POST_ERROR) {
    return { ...state, isLoadingBlog: false, errorBlog: action.payload };
  }
  // delete an existing blog post
  if (action.type === DELETE_BLOG_POST_BEGIN) {
    return { ...state, isLoadingBlog: true, errorBlog: null };
  }
  if (action.type === DELETE_BLOG_POST_SUCCESS) {
    const updatedBlogInfo = state.blogInfo.filter(
      post => post._id !== action.payload
    );
    return { ...state, blogInfo: updatedBlogInfo };
  }
  if (action.type === DELETE_BLOG_POST_ERROR) {
    return { ...state, isLoadingBlog: false, errorBlog: action.payload };
  }
  return state;
};

export default reducer;
