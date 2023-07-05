import { useState } from "react";
import { useVoteContextDispatch } from "../../store/voteContext";

// useVoteActions hook
const useVoteActions = (type, itemId, currVote) => {
  const { updateBlogVoteCount, updateCommentVoteCount } =
    useVoteContextDispatch();

  const updateVoteCount =
    type === "blog" ? updateBlogVoteCount : updateCommentVoteCount;

  const [currentVote, setCurrentVote] = useState(currVote || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
