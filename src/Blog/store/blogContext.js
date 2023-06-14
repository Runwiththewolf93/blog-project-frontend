import React, { useReducer, useContext, useState } from "react";

import blogReducer from "./blogReducer";
import axios from "axios";
import createAuthFetch from "./createAuthFetch";
import { errorHandler, filterNewItems } from "../utils/helper";
import {
  RESET_BLOG_POST,
  RESET_BLOG_ERROR,
  RESET_BLOG_LOADING,
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
  UPLOAD_BLOG_IMAGES_BEGIN,
  UPLOAD_BLOG_IMAGES_SUCCESS,
  UPLOAD_BLOG_IMAGES_ERROR,
  LOGOUT_USER,
} from "./actions";
import { userInfoFromLocalStorage } from "./appContext";

export const blogFilterFromLocalStorage =
  JSON.parse(localStorage.getItem("blogFilter")) || [];

const blogPostFromLocalStorage =
  JSON.parse(localStorage.getItem("blogPost")) || {};

// blogContext initialState object
const initialState = {
  userInfo: userInfoFromLocalStorage,
  isLoadingBlog: true,
  blogInfo: [],
  blogPost: blogPostFromLocalStorage,
  errorBlog: null,
  isLoadingFilter: true,
  blogFilter: blogFilterFromLocalStorage,
  commentFilter: [],
  voteFilter: [],
  errorFilter: null,
};

const BlogContextState = React.createContext();
const BlogContextDispatch = React.createContext();

const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);
  const [postUpdated, setPostUpdated] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    localStorage.clear();
  };

  // axios
  const authFetch = createAuthFetch(state?.userInfo, logoutUser);

  // dispatching below
  const resetBlogPost = () => {
    dispatch({ type: RESET_BLOG_POST });
    localStorage.removeItem("blogPost");
  };

  const resetBlogError = () => {
    dispatch({ type: RESET_BLOG_ERROR });
  };

  const resetFilteredBlogPosts = () => {
    dispatch({ type: RESET_FILTERED_BLOG_POSTS });
  };

  const resetErrorFilter = () => {
    dispatch({ type: RESET_ERROR_FILTER });
  };

  // getAllBlogPosts dispatch function
  const getAllBlogPosts = async () => {
    dispatch({ type: GET_ALL_BLOG_POSTS_BEGIN });

    try {
      const { data } = await authFetch.get("/blog");

      dispatch({ type: GET_ALL_BLOG_POSTS_SUCCESS, payload: data });
      return data;
    } catch (error) {
      errorHandler(error, dispatch, GET_ALL_BLOG_POSTS_ERROR);
    } finally {
      dispatch({ type: RESET_BLOG_LOADING });
    }
  };

  // getFilteredBlogPosts dispatch function
  const getFilteredBlogPosts = async (
    page = 1,
    sort = "createdAt",
    limit = 5,
    order = "asc"
  ) => {
    // don't run dispatch function if user hasn't logged in
    if (!state.userInfo) return;

    dispatch({ type: GET_FILTERED_BLOG_POSTS_BEGIN });

    try {
      const { data: blogsData } = await authFetch.get(
        `/blog/filtered/?page=${page}&sort=${sort}&limit=${limit}&order=${order}`
      );

      // Extract blogIds from the response
      const blogIds = blogsData.posts.map(post => post._id);

      // Fetch comments
      const { data: commentsData } = await authFetch.post("/comment/filter", {
        blogIds,
      });

      // Extract commentIds from the response
      const commentIds = commentsData.map(comment => comment._id);

      // Combine blogIds and commentIds into a single array
      const postIds = [...blogIds, ...commentIds];

      // Fetch votes
      const { data: votesData } = await authFetch.post("/vote/filter", {
        postIds,
      });

      // Set hasMore before filtering the posts and dispatching actions
      setHasMore(blogsData.hasMore);

      // Filter out any posts that are already in the blogFilter, commentFilter or voteFilter state
      const newPosts = filterNewItems(blogsData.posts, state.blogFilter);
      const newComments = filterNewItems(commentsData, state.commentFilter);
      const newVotes = filterNewItems(votesData, state.voteFilter);

      if (newPosts.length > 0) {
        if (page === 1) {
          dispatch({
            // If this is the first page, replace the blogFilter state with the fetched posts
            type: GET_FILTERED_BLOG_POSTS_SUCCESS,
            payload: newPosts,
          });
          localStorage.setItem("blogFilter", JSON.stringify(newPosts));
          dispatch({
            type: GET_FILTERED_COMMENTS_SUCCESS,
            payload: newComments,
          });
          dispatch({ type: GET_FILTERED_VOTES_SUCCESS, payload: newVotes });
        } else {
          dispatch({
            // If this is not the first page, add the fetched posts to the blogFilter state
            type: ADD_FILTERED_BLOG_POSTS_SUCCESS,
            payload: newPosts,
          });
          localStorage.setItem("blogFilter", JSON.stringify(newPosts));
          dispatch({
            type: ADD_FILTERED_COMMENTS_SUCCESS,
            payload: newComments,
          });
          dispatch({ type: ADD_FILTERED_VOTES_SUCCESS, payload: newVotes });
        }
      }
    } catch (error) {
      // get the error to not trigger if the user isn't logged in.
      if (error.request?.url?.includes("/comment/filter")) {
        errorHandler(error, dispatch, GET_FILTERED_COMMENTS_ERROR);
      } else if (error.request?.url?.includes("/vote/filter")) {
        errorHandler(error, dispatch, GET_FILTERED_VOTES_ERROR);
      } else {
        errorHandler(error, dispatch, GET_FILTERED_BLOG_POSTS_ERROR);
      }
    }
  };

  const getSingleBlogPost = async id => {
    dispatch({ type: GET_SINGLE_BLOG_POST_BEGIN });

    try {
      const { data } = await axios.get(`/api/v1/blog/${id}`);

      dispatch({ type: GET_SINGLE_BLOG_POST_SUCCESS, payload: data });
      localStorage.setItem("blogPost", JSON.stringify(data));
    } catch (error) {
      errorHandler(error, dispatch, GET_SINGLE_BLOG_POST_ERROR);
    }
  };

  const addBlogPost = async newPostData => {
    dispatch({ type: ADD_BLOG_POST_BEGIN });

    try {
      const { data } = await authFetch.post("/blog", newPostData);

      dispatch({ type: ADD_BLOG_POST_SUCCESS, payload: data });

      const updatedBlogInfo = [...blogFilterFromLocalStorage, data];
      localStorage.setItem("blogFilter", JSON.stringify(updatedBlogInfo));
    } catch (error) {
      errorHandler(error, dispatch, ADD_BLOG_POST_ERROR);
    }
  };

  const uploadBlogImages = async formData => {
    dispatch({ type: UPLOAD_BLOG_IMAGES_BEGIN });

    try {
      const { data } = await authFetch.post("/blog/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({ type: UPLOAD_BLOG_IMAGES_SUCCESS });
      console.log(data);
      return { avatar: data.avatar, images: data.images };
    } catch (error) {
      errorHandler(error, dispatch, UPLOAD_BLOG_IMAGES_ERROR);
    }
  };

  // editBlogPost dispatch function
  const editBlogPost = async ({ id, updatedValues }) => {
    dispatch({ type: EDIT_BLOG_POST_BEGIN });

    try {
      const { data } = await authFetch.patch(`/blog/${id}`, updatedValues);

      dispatch({ type: EDIT_BLOG_POST_SUCCESS, payload: data });
      console.log(data);

      const updatedBlogInfo = blogFilterFromLocalStorage.map(post =>
        post._id === id ? data : post
      );
      localStorage.setItem("blogFilter", JSON.stringify(updatedBlogInfo));
    } catch (error) {
      errorHandler(error, dispatch, EDIT_BLOG_POST_ERROR);
    }
  };

  const deleteBlogPost = async id => {
    dispatch({ type: DELETE_BLOG_POST_BEGIN });

    try {
      await authFetch.delete(`/blog/${id}`);

      dispatch({ type: DELETE_BLOG_POST_SUCCESS, payload: id });

      const updatedBlogInfo = blogFilterFromLocalStorage.filter(
        post => post._id !== id
      );
      localStorage.setItem("blogFilter", JSON.stringify(updatedBlogInfo));
    } catch (error) {
      errorHandler(error, dispatch, DELETE_BLOG_POST_ERROR);
    }
  };

  // scrollToBlogPost dispatch function
  const scrollToBlogPost = postId => {
    const blogPostElement = document.getElementById(postId);
    if (blogPostElement) {
      blogPostElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <BlogContextState.Provider
      value={{
        ...state,
        postUpdated,
        hasMore,
      }}
    >
      <BlogContextDispatch.Provider
        value={{
          // dispatch functions
          logoutUser,
          resetBlogPost,
          resetBlogError,
          resetFilteredBlogPosts,
          resetErrorFilter,
          getAllBlogPosts,
          getFilteredBlogPosts,
          getSingleBlogPost,
          addBlogPost,
          editBlogPost,
          deleteBlogPost,
          uploadBlogImages,
          // state functions
          setPostUpdated,
          scrollToBlogPost,
        }}
      >
        {children}
      </BlogContextDispatch.Provider>
    </BlogContextState.Provider>
  );
};

const useBlogContextState = () => {
  return useContext(BlogContextState);
};

const useBlogContextDispatch = () => {
  return useContext(BlogContextDispatch);
};

export {
  BlogProvider,
  initialState,
  useBlogContextState,
  useBlogContextDispatch,
};
