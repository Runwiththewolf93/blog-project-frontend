import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import useVoteData from "./useVoteData";
import useVoteActions from "./useVoteActions";
import { VoteButton, VoteCount } from "./VoteComponents";

// Vote component
/**
 * A React component that displays a voting interface with upvote and downvote buttons, vote count display, and an error icon for displaying error messages.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.type - A string which determines if the voting action is for a blog post or a comment.
 * @param {string} props.itemId - The _id property of either a blog post or a comment, used to identify the specific item.
 * @param {object} props.userInfo - An object containing information about the currently logged-in user.
 * @param {string} props.userInfo._id - The MongoDB assigned unique identifier for the user.
 * @param {string} props.userInfo.name - The name of the user.
 * @param {string} props.userInfo.email - The email of the user.
 * @param {boolean} props.userInfo.isAdmin - A boolean indicating if the user has admin privileges.
 * @param {string} props.userInfo.token - The authentication token for the user.
 *
 * @returns {JSX.Element} A voting interface with two voting buttons (upvote and downvote), a vote count display, and an error icon for displaying error messages.
 */
const Vote = ({ type, itemId, userInfo }) => {
  const { currVote, totalVotes } = useVoteData(type, itemId, userInfo);

  const {
    currentVote,
    handleUpVoteClick,
    handleDownVoteClick,
    handleDismissError,
    isLoading,
    error,
  } = useVoteActions(type, itemId, currVote);

  return (
    <div className="d-flex align-items-center">
      <VoteButton
        icon={faArrowUp}
        className={`me-2 ${currentVote === 1 ? "text-primary" : ""}`}
        onClick={isLoading ? null : handleUpVoteClick}
        disabled={isLoading}
        testId="upvote-button"
      />
      <VoteCount totalVotes={totalVotes || 0} />
      <VoteButton
        icon={faArrowDown}
        className={`ms-2 ${currentVote === -1 ? "text-danger" : ""}`}
        onClick={isLoading ? null : handleDownVoteClick}
        disabled={isLoading}
        testId="downvote-button"
      />
      {error && (
        <FontAwesomeIcon
          icon={faExclamationCircle}
          className="text-danger"
          size="2x"
          onClick={handleDismissError}
          cursor="pointer"
          title={error}
        />
      )}
    </div>
  );
};

export default Vote;
