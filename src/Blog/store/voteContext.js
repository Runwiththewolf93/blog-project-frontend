import React, { useReducer, useContext } from "react";
import { useLocalStorageContext } from "./localStorageContext";
import voteReducer from "./voteReducer";
import createAuthFetch from "./createAuthFetch";
import { errorHandler } from "../utils/helper";
import {
  GET_ALL_VOTES_BEGIN,
  GET_ALL_VOTES_SUCCESS,
  GET_ALL_VOTES_ERROR,
  UPDATE_BLOG_VOTE_COUNT_BEGIN,
  UPDATE_BLOG_VOTE_COUNT_SUCCESS,
  UPDATE_BLOG_VOTE_COUNT_ERROR,
  UPDATE_COMMENT_VOTE_COUNT_BEGIN,
  UPDATE_COMMENT_VOTE_COUNT_SUCCESS,
  UPDATE_COMMENT_VOTE_COUNT_ERROR,
  DELETE_BLOG_VOTE_COUNT_BEGIN,
  DELETE_BLOG_VOTE_COUNT_SUCCESS,
  DELETE_BLOG_VOTE_COUNT_ERROR,
  DELETE_COMMENT_VOTE_COUNT_BEGIN,
  DELETE_COMMENT_VOTE_COUNT_SUCCESS,
  DELETE_COMMENT_VOTE_COUNT_ERROR,
  DELETE_ALL_COMMENT_VOTES_FOR_BLOG_POST_BEGIN,
  DELETE_ALL_COMMENT_VOTES_FOR_BLOG_POST_SUCCESS,
  DELETE_ALL_COMMENT_VOTES_FOR_BLOG_POST_ERROR,
  RESET_VOTE_LOADING,
  LOGOUT_USER,
} from "./actions";
import { userInfoFromLocalStorage, useAppContextState } from "./appContext";
import {
  blogFilterFromLocalStorage,
  commentFilterFromLocalStorage,
  voteFilterFromLocalStorage,
} from "./blogContext";

// voteContext initialState object
const initialState = {
  userInfo: userInfoFromLocalStorage,
  blogFilter: blogFilterFromLocalStorage,
  commentFilter: commentFilterFromLocalStorage,
  voteFilter: voteFilterFromLocalStorage,
  isLoadingVote: true,
  voteInfo: [],
  errorVote: null,
};

const VoteContextState = React.createContext();
const VoteContextDispatch = React.createContext();

/**
 * Render the VoteProvider component.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The children elements.
 * @return {ReactNode} The rendered component.
 */
const VoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(voteReducer, initialState);
  const {
    blogFilterLocalStorage,
    setBlogFilterLocalStorage,
    commentFilterLocalStorage,
    setCommentFilterLocalStorage,
    voteFilterLocalStorage,
    setVoteFilterLocalStorage,
  } = useLocalStorageContext();
  const { userInfo } = useAppContextState();

  /**
   * Logs out the user.
   *
   * @param {type} dispatch - The dispatch function.
   * @return {type} No return value.
   */
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    localStorage.clear();
  };

  // axios
  const authFetch = createAuthFetch(userInfo, logoutUser);

  /**
   * Retrieves all votes from the server.
   *
   * @return {Promise<void>} No return value.
   */
  // getAllVotes dispatch function
  const getAllVotes = async () => {
    dispatch({ type: GET_ALL_VOTES_BEGIN });

    try {
      const { data } = await authFetch.get("/vote");

      dispatch({ type: GET_ALL_VOTES_SUCCESS, payload: data });
    } catch (error) {
      errorHandler(error, dispatch, GET_ALL_VOTES_ERROR);
    } finally {
      dispatch({ type: RESET_VOTE_LOADING });
    }
  };

  /**
   * Updates the vote count of a blog.
   *
   * @param {string} blogId - The ID of the blog to update the vote count for.
   * @param {number} voteCount - The new vote count for the blog.
   * @return {Promise<void>} A promise that resolves when the vote count is updated successfully.
   */
  // updateBlogVoteCount dispatch function
  const updateBlogVoteCount = async (blogId, voteCount) => {
    dispatch({ type: UPDATE_BLOG_VOTE_COUNT_BEGIN });

    try {
      const { data } = await authFetch.post(
        `/vote/blogId/${blogId}?vote=${voteCount}`
      );

      // Parse the data received from the backend
      const { vote, totalVotes } = data;

      // Get the existing vote object from the voteFilter array
      const existingVote = voteFilterLocalStorage.find(
        v => v.post === vote.post && v.user === vote.user
      );

      // Update the totalVotes property of the blogFilter object
      const updatedBlogFilter = blogFilterLocalStorage.map(blog => {
        if (blog._id === blogId) {
          return { ...blog, totalVotes };
        }
        return blog;
      });

      if (existingVote) {
        // If the existing vote has the same value as the new vote, throw an error
        if (existingVote.vote === vote.vote) {
          throw new Error("You have already voted with the same value!");
        }

        // Update the voteFilter object with the existing vote
        const updatedVoteFilter = voteFilterLocalStorage.map(v =>
          v === existingVote ? { ...v, ...vote } : v
        );

        // Add updated blogFilter and voteFilter objects to state
        dispatch({
          type: UPDATE_BLOG_VOTE_COUNT_SUCCESS,
          payload: { updatedBlogFilter, updatedVoteFilter },
        });

        // Save the updated voteFilter to localStorage
        setVoteFilterLocalStorage(updatedVoteFilter);
      } else {
        // Add new vote to existing voteFilter object
        const updatedVoteFilter = [...voteFilterLocalStorage, vote];

        // Add updated blogFilter and voteFilter objects to state
        dispatch({
          type: UPDATE_BLOG_VOTE_COUNT_SUCCESS,
          payload: { updatedBlogFilter, updatedVoteFilter },
        });

        // Save the updated voteFilter to localStorage
        setVoteFilterLocalStorage(updatedVoteFilter);
      }

      // Save the updated blogFilter to localStorage
      setBlogFilterLocalStorage(updatedBlogFilter);
    } catch (error) {
      errorHandler(error, dispatch, UPDATE_BLOG_VOTE_COUNT_ERROR);
    }
  };

  /**
   * Updates the vote count of a comment.
   *
   * @param {string} commentId - The ID of the comment.
   * @param {number} voteCount - The new vote count for the comment.
   * @return {Promise<void>} A promise that resolves when the vote count is updated.
   */
  // updateCommentVoteCount dispatch function
  const updateCommentVoteCount = async (commentId, voteCount) => {
    dispatch({ type: UPDATE_COMMENT_VOTE_COUNT_BEGIN });

    try {
      const { data } = await authFetch.post(
        `/vote/commentId/${commentId}?vote=${voteCount}`
      );

      // Parse the data received from the backend
      const { vote, totalVotes } = data;

      // Get the existing vote object from the voteFilter array
      const existingVote = voteFilterLocalStorage.find(
        v => v.post === vote.post && v.user === vote.user
      );

      // Update the totalVotes property of the commentFilter object
      const updatedCommentFilter = commentFilterLocalStorage.map(comment => {
        if (comment._id === commentId) {
          return { ...comment, totalVotes };
        }
        return comment;
      });

      if (existingVote) {
        // If the existing vote has the same value as the new vote, throw an error
        if (existingVote.vote === vote.vote) {
          throw new Error("You have already voted with the same value!");
        }

        // Update the voteFilter object with the existing vote
        const updatedVoteFilter = voteFilterLocalStorage.map(v =>
          v === existingVote ? { ...v, ...vote } : v
        );

        // Add updated commentFilter and voteFilter objects to state
        dispatch({
          type: UPDATE_COMMENT_VOTE_COUNT_SUCCESS,
          payload: { updatedCommentFilter, updatedVoteFilter },
        });

        // Save the updated voteFilter to localStorage
        setVoteFilterLocalStorage(updatedVoteFilter);
      } else {
        // Add new vote to existing voteFilter object
        const updatedVoteFilter = [...voteFilterLocalStorage, vote];

        // Add updated commentFilter and voteFilter objects to state
        dispatch({
          type: UPDATE_COMMENT_VOTE_COUNT_SUCCESS,
          payload: { updatedCommentFilter, voteFilterLocalStorage },
        });

        // Save the updated voteFilter to localStorage
        setVoteFilterLocalStorage(updatedVoteFilter);
      }

      // Save the updated commentFilter to localStorage
      setCommentFilterLocalStorage(updatedCommentFilter);
    } catch (error) {
      errorHandler(error, dispatch, UPDATE_COMMENT_VOTE_COUNT_ERROR);
    }
  };

  /**
   * The `deleteBlogVoteCount` function is an asynchronous function that deletes a vote count for a
   * blog post and updates the corresponding blog and vote filters in the state.
   */
  const deleteBlogVoteCount = async blogId => {
    dispatch({ type: DELETE_BLOG_VOTE_COUNT_BEGIN });

    try {
      const { data } = await authFetch.delete(`/vote/blogId/${blogId}`);

      // Parse the data received from the backend
      const { vote, totalVotes } = data;

      // Update the totalVotes property of the blogFilter object
      const updatedBlogFilter = blogFilterLocalStorage.map(blog => {
        if (blog._id === blogId) {
          return { ...blog, totalVotes };
        }
        return blog;
      });

      // Remove the deleted vote from the voteFilter array
      const updatedVoteFilter = voteFilterLocalStorage.filter(
        v => !(v.post === vote.post && v.user === vote.user)
      );

      // Add updated blogFilter and voteFilter objects to state
      dispatch({
        type: DELETE_BLOG_VOTE_COUNT_SUCCESS,
        payload: { updatedBlogFilter, updatedVoteFilter },
      });

      // Save the updated voteFilter to localStorage
      setVoteFilterLocalStorage(updatedVoteFilter);

      // Save the updated blogFilter to localStorage
      setBlogFilterLocalStorage(updatedBlogFilter);
    } catch (error) {
      errorHandler(error, dispatch, DELETE_BLOG_VOTE_COUNT_ERROR);
    }
  };

  /**
   * The function `deleteCommentVoteCount` is an asynchronous function that deletes a comment vote and
   * updates the comment and vote filters in the state.
   */
  const deleteCommentVoteCount = async commentId => {
    dispatch({ type: DELETE_COMMENT_VOTE_COUNT_BEGIN });

    try {
      const { data } = await authFetch.delete(`/vote/commentId/${commentId}`);

      // Parse the data received from the backend
      const { vote, totalVotes } = data;

      // Update the totalVotes property of the commentFilter object
      const updatedCommentFilter = commentFilterLocalStorage.map(comment => {
        if (comment._id === commentId) {
          return { ...comment, totalVotes };
        }
        return comment;
      });

      // Remove the deleted vote from the voteFilter array
      const updatedVoteFilter = voteFilterLocalStorage.filter(
        v => !(v.post === vote.post && v.user === vote.user)
      );

      // Add updated commentFilter and voteFilter objects to state
      dispatch({
        type: DELETE_COMMENT_VOTE_COUNT_SUCCESS,
        payload: { updatedCommentFilter, updatedVoteFilter },
      });

      // Save the updated voteFilter to localStorage
      setVoteFilterLocalStorage(updatedVoteFilter);

      // Save the updated commentFilter to localStorage
      setCommentFilterLocalStorage(updatedCommentFilter);
    } catch (error) {
      errorHandler(error, dispatch, DELETE_COMMENT_VOTE_COUNT_ERROR);
    }
  };

  /**
   * The function `deleteAllCommentVotesForBlogPost` deletes all comment votes associated with a
   * specific blog post.
   */
  const deleteAllCommentVotesForBlogPost = async blogId => {
    dispatch({ type: DELETE_ALL_COMMENT_VOTES_FOR_BLOG_POST_BEGIN });

    try {
      await authFetch.delete(`/vote/blogId/${blogId}/comments`);

      // Remove the deleted votes from the voteFilter array
      const updatedVoteFilter = voteFilterLocalStorage.filter(vote => {
        // Only keep the votes that are not related to the deleted blog
        return !commentFilterLocalStorage.some(
          comment => comment.blog === blogId && comment._id === vote.post
        );
      });

      // Add updated voteFilter object to state
      dispatch({
        type: DELETE_ALL_COMMENT_VOTES_FOR_BLOG_POST_SUCCESS,
        payload: { updatedVoteFilter },
      });

      // Save the updated voteFilter to localStorage
      setVoteFilterLocalStorage(updatedVoteFilter);
    } catch (error) {
      errorHandler(
        error,
        dispatch,
        DELETE_ALL_COMMENT_VOTES_FOR_BLOG_POST_ERROR
      );
    }
  };

  return (
    <VoteContextState.Provider
      value={{
        ...state,
        voteFilterLocalStorage,
      }}
    >
      <VoteContextDispatch.Provider
        value={{
          // dispatch functions
          getAllVotes,
          updateBlogVoteCount,
          updateCommentVoteCount,
          deleteBlogVoteCount,
          deleteCommentVoteCount,
          deleteAllCommentVotesForBlogPost,
        }}
      >
        {children}
      </VoteContextDispatch.Provider>
    </VoteContextState.Provider>
  );
};

/**
 * Returns the state value from the VoteContext.
 *
 * @return {VoteContextState} The state value from the VoteContext.
 */
const useVoteContextState = () => {
  return useContext(VoteContextState);
};

/**
 * Returns the VoteContextDispatch from the current VoteContext.
 *
 * @return {VoteContextDispatch} The VoteContextDispatch from the current VoteContext.
 */
const useVoteContextDispatch = () => {
  return useContext(VoteContextDispatch);
};

export {
  VoteProvider,
  initialState,
  useVoteContextState,
  useVoteContextDispatch,
  VoteContextState,
  VoteContextDispatch,
};
