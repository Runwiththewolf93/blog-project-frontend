import { useState } from "react";
import { useVoteContextDispatch } from "../../store/voteContext";

// useVoteActions hook
/**
 * Custom hook for handling voting actions. Provides utility functions for handling upvote, downvote, and dismissal of any errors during voting.
 *
 * @param {string} type - A string which determines if the voting action is for a blog post or a comment.
 * @param {string} itemId - The _id property of either a blog post or a comment, used to identify the specific item.
 * @param {number} currVote - The current vote of the user on the item. -1 for a downvote, 1 for an upvote, and 0 if the user decides to remove their vote.
 * @returns {object} An object containing:
 * - {number} currentVote - The state of the current vote, managed by the hook.
 * - {Function} handleUpVoteClick - Function to handle the upvote action.
 * - {Function} handleDownVoteClick - Function to handle the downvote action.
 * - {Function} handleDismissError - Function to handle dismissal of errors.
 * - {boolean} isLoading - State of the loading process, managed by the hook.
 * - {string} error - Any error occurred during the voting process, managed by the hook.
 */
const useVoteActions = (type, itemId, currVote) => {
  const { updateBlogVoteCount, updateCommentVoteCount } =
    useVoteContextDispatch();

  const updateVoteCount =
    type === "blog" ? updateBlogVoteCount : updateCommentVoteCount;

  const [currentVote, setCurrentVote] = useState(currVote || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Updates the vote count of an item when the upvote button is clicked.
   *
   * This function does not take any parameters.
   *
   * @return {Promise<void>} A promise that resolves when the vote count is updated.
   */
  const handleUpVoteClick = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (currentVote === 1) {
        await updateVoteCount(itemId, 0);
        setCurrentVote(0);
      } else {
        await updateVoteCount(itemId, 1);
        setCurrentVote(1);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Updates the vote count of an item when the downvote button is clicked.
   *
   * This function does not take any parameters.
   *
   * @return {Promise<void>} A promise that resolves when the vote count is updated.
   */
  const handleDownVoteClick = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (currentVote === -1) {
        await updateVoteCount(itemId, 0);
        setCurrentVote(0);
      } else {
        await updateVoteCount(itemId, -1);
        setCurrentVote(-1);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the dismissal of an error.
   *
   * @param {}
   * @return {}
   */
  const handleDismissError = () => {
    setError(null);
  };

  return {
    currentVote,
    handleUpVoteClick,
    handleDownVoteClick,
    handleDismissError,
    isLoading,
    error,
  };
};

export default useVoteActions;
