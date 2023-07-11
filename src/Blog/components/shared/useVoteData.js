import { useBlogContextState } from "../../store/blogContext";
import { useCommentContextState } from "../../store/commentContext";
import { useVoteContextState } from "../../store/voteContext";

// useVoteData hook
/**
 * Custom hook for managing voting data. Provides utility for fetching current vote status and the total votes for a given item.
 *
 * @param {string} type - A string which determines if the voting action is for a blog post or a comment.
 * @param {string} itemId - The _id property of either a blog post or a comment, used to identify the specific item.
 * @param {object} userInfo - An object containing information about the currently logged-in user.
 * @param {string} userInfo._id - The MongoDB assigned unique identifier for the user.
 * @param {string} userInfo.name - The name of the user.
 * @param {string} userInfo.email - The email of the user.
 * @param {boolean} userInfo.isAdmin - A boolean indicating if the user has admin privileges.
 * @param {string} userInfo.token - The authentication token for the user.
 *
 * @returns {object} An object containing:
 * - {number} currVote - The current vote status of the user on the item. It can be -1 for a downvote, 1 for an upvote, or 0 if the user decides to remove their vote.
 * - {number} totalVotes - The total number of votes for the given item, calculated from all users.
 */
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
