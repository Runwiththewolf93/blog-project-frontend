import {
  LOGOUT_USER,
  RESET_BLOG_POST,
  RESET_BLOG_ERROR,
  RESET_BLOG_LOADING,
  RESET_FILTERED_BLOG_POSTS,
  RESET_ERROR_FILTER,
  SET_DATA_LOADED,
  GET_ALL_BLOG_POSTS_BEGIN,
  GET_ALL_BLOG_POSTS_SUCCESS,
  GET_ALL_BLOG_POSTS_ERROR,
  GET_FILTERED_BLOG_POSTS_BEGIN,
  GET_FILTERED_BLOG_POSTS_SUCCESS,
  ADD_FILTERED_BLOG_POSTS_SUCCESS,
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
  UPLOAD_BLOG_IMAGES_BEGIN,
  UPLOAD_BLOG_IMAGES_SUCCESS,
  UPLOAD_BLOG_IMAGES_ERROR,
} from "./actions";

import { initialState } from "./blogContext";

/**
 * Reducer function for the blog state.
 *
 * @param {object} state - The current state of the blog.
 * @param {object} action - The action object that contains the type and payload.
 * @return {object} The new state of the blog after applying the action.
 */
const blogReducer = (state, action) => {
  // logout reducer
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userInfo: null,
      isLoadingBlog: false,
      errorBlog: null,
      isLoadingFilter: false,
      errorFilter: false,
    };
  }
  // reset blogPost state
  if (action.type === RESET_BLOG_POST) {
    return { ...state, blogPost: {} };
  }
  // reset blog error
  if (action.type === RESET_BLOG_ERROR) {
    return { ...state, errorBlog: null };
  }
  // reset blog loading
  if (action.type === RESET_BLOG_LOADING) {
    return { ...state, isLoadingBlog: false };
  }
  // reset filtered blog posts
  if (action.type === RESET_FILTERED_BLOG_POSTS) {
    return { ...state, blogFilter: [], commentFilter: [], voteFilter: [] };
  }
  // reset errorFilter state
  if (action.type === RESET_ERROR_FILTER) {
    return { ...state, errorFilter: null };
  }
  // set isLoadingFilter to false if data loaded
  if (action.type === SET_DATA_LOADED) {
    return { ...state, isLoadingFilter: false };
  }
  // list available blog posts - keep blogInfo here
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
      blogFilter: action.payload.newPosts,
      commentFilter: action.payload.newComments,
      voteFilter: action.payload.newVotes,
      isLoadingFilter: false,
      errorFilter: null,
    };
  }
  if (action.type === ADD_FILTERED_BLOG_POSTS_SUCCESS) {
    return {
      ...state,
      blogFilter: [...state.blogFilter, ...action.payload.newPosts],
      commentFilter: [...state.commentFilter, ...action.payload.newComments],
      voteFilter: [...state.voteFilter, ...action.payload.newVotes],
      isLoadingFilter: false,
      errorFilter: null,
    };
  }
  if (
    action.type === GET_FILTERED_BLOG_POSTS_ERROR ||
    action.type === GET_FILTERED_COMMENTS_ERROR ||
    action.type === GET_FILTERED_VOTES_ERROR
  ) {
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
      blogFilter: action.payload,
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
    return {
      ...state,
      isLoadingBlog: false,
      blogFilter: action.payload,
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
    console.log("delete post action payload", action.payload);
    return {
      ...state,
      isLoadingBlog: false,
      blogFilter: action.payload,
      errorBlog: null,
    };
  }
  if (action.type === DELETE_BLOG_POST_ERROR) {
    return { ...state, isLoadingBlog: false, errorBlog: action.payload };
  }
  // upload images to cloudinary
  if (action.type === UPLOAD_BLOG_IMAGES_BEGIN) {
    return { ...state, isLoadingBlog: true };
  }
  if (action.type === UPLOAD_BLOG_IMAGES_SUCCESS) {
    return { ...state, isLoadingBlog: false, errorBlog: null };
  }
  if (action.type === UPLOAD_BLOG_IMAGES_ERROR) {
    return { ...state, isLoadingBlog: false, errorBlog: action.payload };
  }
  return { ...state, isLoadingBlog: false };
};

export default blogReducer;
