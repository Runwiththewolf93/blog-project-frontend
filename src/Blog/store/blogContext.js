import React, { useReducer, useContext, useState } from "react";
import { useLocalStorageContext } from "./localStorageContext";
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
  LOGOUT_USER,
} from "./actions";
import { userInfoFromLocalStorage } from "./appContext";

export const blogFilterFromLocalStorage =
  JSON.parse(localStorage.getItem("blogFilter")) || [];

export const commentFilterFromLocalStorage =
  JSON.parse(localStorage.getItem("commentFilter")) || [];

export const voteFilterFromLocalStorage =
  JSON.parse(localStorage.getItem("voteFilter")) || [];

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
  commentFilter: commentFilterFromLocalStorage,
  voteFilter: voteFilterFromLocalStorage,
  errorFilter: null,
};

const BlogContextState = React.createContext();
const BlogContextDispatch = React.createContext();

const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);
  const [postUpdated, setPostUpdated] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("asc");

  const {
    blogFilterLocalStorage,
    setBlogFilterLocalStorage,
    setCommentFilterLocalStorage,
    setVoteFilterLocalStorage,
  } = useLocalStorageContext();

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

  // resetFilteredBlogPosts dispatch function
  const resetFilteredBlogPosts = async callback => {
    console.log("Resetting filters...");
    dispatch({ type: RESET_FILTERED_BLOG_POSTS });

    // remove filters from local storage
    localStorage.removeItem("blogFilter");
    localStorage.removeItem("commentFilter");
    localStorage.removeItem("voteFilter");

    console.log("state after reset", state);
    console.log(
      "local storage after reset",
      localStorage.getItem("blogFilter"),
      localStorage.getItem("commentFilter"),
      localStorage.getItem("voteFilter")
    );
    if (callback) {
      await callback();
    }
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
    if (!state.userInfo) return;

    dispatch({ type: GET_FILTERED_BLOG_POSTS_BEGIN });

    try {
      console.log("blogFilter", state.blogFilter);
      const { data: blogsData } = await authFetch.get(
        `/blog/filtered/?page=${page}&sort=${sort}&limit=${limit}&order=${order}`
      );

      // Extract ids and fetch data blogs
      const blogIds = blogsData.posts.map(post => post._id);

      console.log("commentFilter", state.commentFilter);
      const { data: commentsData } = await authFetch.post("/comment/filter", {
        blogIds,
      });

      // Extract ids and fetch data comments
      const commentIds = commentsData.map(comment => comment._id);

      // Combine blogIds and commentIds into a single array
      const postIds = [...blogIds, ...commentIds];

      console.log("voteFilter", state.voteFilter);
      const { data: votesData } = await authFetch.post("/vote/filter", {
        postIds,
      });

      // Set hasMore before filtering the posts and dispatching actions
      setHasMore(blogsData.hasMore);
      console.log("blogsData", blogsData);
      console.log("commentsData", commentsData);
      console.log("votesData", votesData);

      // Filter out any posts that are already in the blogFilter, commentFilter or voteFilter state
      const newPosts = filterNewItems(blogsData.posts, state.blogFilter);
      const newComments = filterNewItems(commentsData, state.commentFilter);
      const newVotes = filterNewItems(votesData, state.voteFilter);
      console.log("newPosts", newPosts);
      console.log("newComments", newComments);
      console.log("newVotes", newVotes);

      // Construct payload
      const payload = {
        newPosts,
        newComments,
        newVotes,
      };

      console.log(payload);

      // Save to local storage and dispatch
      if (newPosts.length > 0) {
        if (page === 1) {
          setBlogFilterLocalStorage(newPosts);
          setCommentFilterLocalStorage(newComments);
          setVoteFilterLocalStorage(newVotes);

          dispatch({
            type: GET_FILTERED_BLOG_POSTS_SUCCESS,
            payload,
          });
        } else {
          setBlogFilterLocalStorage([...state.blogFilter, ...newPosts]);
          setCommentFilterLocalStorage([
            ...state.commentFilter,
            ...newComments,
          ]);
          setVoteFilterLocalStorage([...state.voteFilter, ...newVotes]);

          dispatch({
            type: ADD_FILTERED_BLOG_POSTS_SUCCESS,
            payload,
          });
        }
      }
    } catch (error) {
      console.log("getFilteredBlogPosts error", error);
      if (error.request?.url?.includes("/comment/filter")) {
        errorHandler(error, dispatch, GET_FILTERED_COMMENTS_ERROR);
      } else if (error.request?.url?.includes("/vote/filter")) {
        errorHandler(error, dispatch, GET_FILTERED_VOTES_ERROR);
      } else {
        errorHandler(error, dispatch, GET_FILTERED_BLOG_POSTS_ERROR);
      }
    } finally {
      dispatch({ type: SET_DATA_LOADED });
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

  // addBlogPost dispatch function
  const addBlogPost = async newPostData => {
    dispatch({ type: ADD_BLOG_POST_BEGIN });

    try {
      const { data } = await authFetch.post("/blog", newPostData);

      // Update the blogFilterLocalStorage with the new post
      let updatedBlogFilter;
      if (order === "asc") {
        updatedBlogFilter = [...blogFilterLocalStorage, data];
      } else {
        updatedBlogFilter = [data, ...blogFilterLocalStorage];
      }

      // Dispatch the updated blogFilter
      dispatch({ type: ADD_BLOG_POST_SUCCESS, payload: updatedBlogFilter });

      // Save the updated blogFilter to localStorage
      setBlogFilterLocalStorage(updatedBlogFilter);
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
      console.log("image urls", data);
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

      // Update the blogFilterLocalStorage with the edited post
      const updatedBlogFilter = blogFilterLocalStorage.map(post =>
        post._id === id ? data : post
      );

      // Dispatch the updated blogFilter
      dispatch({ type: EDIT_BLOG_POST_SUCCESS, payload: data });
      console.log("edited blog post", data);

      // Save the updated blogFilter to localStorage
      setBlogFilterLocalStorage(updatedBlogFilter);
    } catch (error) {
      errorHandler(error, dispatch, EDIT_BLOG_POST_ERROR);
    }
  };

  // deleteBlogPost dispatch function
  const deleteBlogPost = async id => {
    dispatch({ type: DELETE_BLOG_POST_BEGIN });

    try {
      await authFetch.delete(`/blog/${id}`);

      // Update the blogFilterLocalStorage with the deleted post
      const updatedBlogFilter = blogFilterLocalStorage.filter(
        post => post._id !== id
      );

      // dispatch the updated blogFilter
      dispatch({ type: DELETE_BLOG_POST_SUCCESS, payload: updatedBlogFilter });

      // Save the updated blogFilter to localStorage
      setBlogFilterLocalStorage(updatedBlogFilter);
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
        blogFilterLocalStorage,
        page,
        order,
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
          setPage,
          setOrder,
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
