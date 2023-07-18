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
import { userInfoFromLocalStorage, useAppContextState } from "./appContext";

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

/**
 * Renders the BlogProvider component, which wraps the children components with the BlogContext state and dispatch providers.
 *
 * @param {object} children - The children components.
 * @returns {JSX.Element} - The rendered component.
 */
const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);
  const [postUpdated, setPostUpdated] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  // set this back to asc
  const [order, setOrder] = useState("desc");
  const [isStateReset, setIsStateReset] = useState(false);
  const { userInfo } = useAppContextState();

  const {
    blogFilterLocalStorage,
    setBlogFilterLocalStorage,
    setCommentFilterLocalStorage,
    setVoteFilterLocalStorage,
  } = useLocalStorageContext();

  /**
   * Logs out the user and clears the local storage.
   *
   * @param {function} dispatch - The dispatch function from the Redux store.
   * @return {void} This function does not return a value.
   */
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    localStorage.clear();
  };

  // axios
  const authFetch = createAuthFetch(userInfo, logoutUser);

  // dispatching below

  /**
   * Resets the blog post and removes it from localStorage.
   *
   * @param {void}
   * @return {void}
   */
  const resetBlogPost = () => {
    dispatch({ type: RESET_BLOG_POST });
    localStorage.removeItem("blogPost");
  };

  /**
   * Resets the blog error.
   *
   * @param {void}
   * @return {void}
   */
  const resetBlogError = () => {
    dispatch({ type: RESET_BLOG_ERROR });
  };

  /**
   * The function `resetFilteredBlogPosts` resets filters for blog posts by removing them from local
   * storage and dispatching a reset action.
   */
  // resetFilteredBlogPosts dispatch function
  const resetFilteredBlogPosts = async callback => {
    try {
      console.log("Resetting filters...");

      // remove filters from local storage
      localStorage.removeItem("blogFilter");
      localStorage.removeItem("commentFilter");
      localStorage.removeItem("voteFilter");

      dispatch({ type: RESET_FILTERED_BLOG_POSTS });

      // console.log("state after reset", state);
      // console.log(
      //   "local storage after reset",
      //   localStorage.getItem("blogFilter"),
      //   localStorage.getItem("commentFilter"),
      //   localStorage.getItem("voteFilter")
      // );
      if (callback) {
        await callback();
      }
      console.log("Resolving promise...");
    } catch (error) {
      console.error("Error in resetFilteredBlogPosts:", error);
      throw error;
    }
  };

  /**
   * Resets the error filter.
   *
   * @param {void}
   * @return {void}
   */
  const resetErrorFilter = () => {
    dispatch({ type: RESET_ERROR_FILTER });
  };

  /**
   * Retrieves all blog posts.
   *
   * @return {Promise} - The data representing all blog posts.
   */
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

  /**
   * Retrieves filtered blog posts based on the specified parameters.
   *
   * @param {Array} blogFilterIds - An array of blog filter IDs.
   * @param {number} page - The page number (default: 1).
   * @param {string} sort - The sort key (default: "createdAt").
   * @param {number} limit - The maximum number of posts to retrieve (default: 5).
   * @param {string} order - The sort order (default: "desc").
   * @return {Promise} A promise that resolves to the filtered blog posts.
   */
  // getFilteredBlogPosts dispatch function
  const getFilteredBlogPosts = async (
    blogFilterIds,
    page = 1,
    sort = "createdAt",
    limit = 5,
    // order should be asc, we are setting desc for now only.
    order = "desc"
  ) => {
    console.log("getFilteredBlogPosts called");
    console.log("state.userInfo", state.userInfo);

    dispatch({ type: GET_FILTERED_BLOG_POSTS_BEGIN });

    try {
      console.log(
        "blogFilter",
        state.blogFilter.map(b => b._id)
      );
      const { data: blogsData } = await authFetch.post("/blog/filtered", {
        blogIds: blogFilterIds,
        limit,
        sort,
        order,
      });

      // Extract ids and fetch data blogs
      const blogIds = blogsData.map(post => post._id);

      console.log(
        "commentFilter",
        state.commentFilter.map(c => c._id)
      );
      const { data: commentsData } = await authFetch.post("/comment/filter", {
        blogIds,
      });

      // Extract ids and fetch data comments
      const commentIds = commentsData.map(comment => comment._id);

      // Combine blogIds and commentIds into a single array
      const postIds = [...blogIds, ...commentIds];

      console.log(
        "voteFilter",
        state.voteFilter.map(v => v._id)
      );
      const { data: votesData } = await authFetch.post("/vote/filter", {
        postIds,
      });

      console.log(
        "blogsData",
        blogsData.map(b => b._id)
      );
      console.log(
        "commentsData",
        commentsData.map(c => c._id)
      );
      console.log(
        "votesData",
        votesData.map(v => v._id)
      );
      console.log("isStateReset", isStateReset);

      // Filter out any posts that are already in the blogFilter, commentFilter or voteFilter state
      const newPosts = filterNewItems(
        blogsData,
        isStateReset ? [] : state.blogFilter
      );
      const newComments = filterNewItems(
        commentsData,
        isStateReset ? [] : state.commentFilter
      );
      const newVotes = filterNewItems(
        votesData,
        isStateReset ? [] : state.voteFilter
      );
      console.log(
        "newPosts",
        newPosts.map(p => p._id)
      );
      console.log(
        "newComments",
        newComments.map(c => c._id)
      );
      console.log(
        "newVotes",
        newVotes.map(v => v._id)
      );

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

      // Set hasMore before filtering the posts and dispatching actions
      setHasMore(newPosts.length === limit || isStateReset);
      console.log("newPosts.length", newPosts.length);
      console.log("limit", limit);
      // Set the isStateReset flag back to false
      setIsStateReset(false);
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

  /**
   * Fetches a single blog post by ID and dispatches the result to the state.
   * @param {string} id - The ID of the blog post to fetch.
   * @returns {Promise<void>}
   */
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

  /**
   * @function addBlogPost
   * @description Adds a new blog post to the blog filter.
   * @param {Object} newPostData The data for the new blog post.
   * @returns {Promise} A promise that resolves with the updated blog filter.
   */
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

  /**
   * Uploads blog images using the provided form data and dispatches the result to the state.
   * @param {FormData} formData - The form data containing the images to upload.
   * @returns {Promise<{avatar: string, images: string[]}>} - The avatar URL and an array of image URLs.
   */
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

  /**
   * Edits a blog post.
   *
   * @param {Object} param - The parameters for editing the blog post.
   * @param {string} param.id - The ID of the blog post to edit.
   * @param {Object} param.updatedValues - The updated values for the blog post.
   * @return {Promise} A promise that resolves to the edited blog post.
   */
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

  /**
   * Deletes a blog post by ID and updates the state and local storage accordingly.
   * @param {string} id - The ID of the blog post to delete.
   * @returns {Promise<void>}
   */
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
          setIsStateReset,
        }}
      >
        {children}
      </BlogContextDispatch.Provider>
    </BlogContextState.Provider>
  );
};

/**
 * Returns the state object from the BlogContext.
 *
 * @return {Object} The state object from the BlogContext.
 */
const useBlogContextState = () => {
  return useContext(BlogContextState);
};

/**
 * Returns the context dispatcher for the BlogContext.
 *
 * @return {function} The context dispatcher.
 */
const useBlogContextDispatch = () => {
  return useContext(BlogContextDispatch);
};

export {
  BlogProvider,
  initialState,
  useBlogContextState,
  useBlogContextDispatch,
  BlogContextState,
  BlogContextDispatch,
};
