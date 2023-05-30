import { useAppContextState } from "../../store/appContext";
import { useCommentContextState } from "../../store/commentContext";
import { useVoteContextState } from "../../store/voteContext";

const useVoteData = (type, itemId, userInfo) => {
  const { blogInfo } = useAppContextState();
  const { commentInfo } = useCommentContextState();
  const { voteInfo } = useVoteContextState();

  const info = type === "blog" ? blogInfo : commentInfo;

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

  return { currVote, totalVotes };
};

export default useVoteData;
