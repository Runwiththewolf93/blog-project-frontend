import { useState } from "react";
import { useAppContextState } from "../store/appContext";
import { useCommentContextState } from "../store/commentContext";
import {
  useVoteContextState,
  useVoteContextDispatch,
} from "../store/voteContext";

const useVoteHandler = (type, itemId, userInfo) => {
  const { blogInfo } = useAppContextState();
  const { commentInfo } = useCommentContextState();
  const { voteInfo } = useVoteContextState();
  const { updateBlogVoteCount, updateCommentVoteCount } =
    useVoteContextDispatch();

  const info = type === "blog" ? blogInfo : commentInfo;
  const updateVoteCount =
    type === "blog" ? updateBlogVoteCount : updateCommentVoteCount;

  const item = info?.find(post => post._id === itemId);

  // Find the Vote object for the logged-in user
  const currentUserVote =
    item &&
    voteInfo?.filter(
      vote => vote.post === item._id && vote.user === userInfo._id
    );
  const currVote = currentUserVote?.reduce((acc, curr) => acc + curr.vote, 0);

  // Calculate the totalVotes per blog / comment
  const itemVotes = item && voteInfo?.filter(vote => vote.post === item._id);
  const totalVotes = itemVotes?.reduce((acc, curr) => acc + curr.vote, 0);
  const [currentVote, setCurrentVote] = useState(currVote);
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
    totalVotes,
    handleUpVoteClick,
    handleDownVoteClick,
    handleDismissError,
    isLoading,
    error,
  };
};

export default useVoteHandler;
