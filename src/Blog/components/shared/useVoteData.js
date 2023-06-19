import { useBlogContextState } from "../../store/blogContext";
import { useCommentContextState } from "../../store/commentContext";
import { useVoteContextState } from "../../store/voteContext";

// useVoteData hook
const useVoteData = (type, itemId, userInfo) => {
  const { blogFilterLocalStorage } = useBlogContextState();
  const { commentFilterLocalStorage } = useCommentContextState();
  const { voteFilterLocalStorage } = useVoteContextState();

  const info =
    type === "blog" ? blogFilterLocalStorage : commentFilterLocalStorage;

  const item = info?.find(post => post._id === itemId);

  // Find the Vote object for the logged-in user
  const currentUserVote =
    item &&
    voteFilterLocalStorage?.filter(vote => {
      return vote.post === item._id && vote.user === userInfo._id;
    });
  const currVote = currentUserVote?.reduce((acc, curr) => acc + curr.vote, 0);

  // Calculate the totalVotes per blog / comment
  const itemVotes =
    item && voteFilterLocalStorage?.filter(vote => vote.post === item._id);
  const totalVotes = itemVotes?.reduce((acc, curr) => acc + curr.vote, 0);

  return { currVote, totalVotes };
};

export default useVoteData;
