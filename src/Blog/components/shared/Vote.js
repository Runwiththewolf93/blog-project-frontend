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
const Vote = ({ type, itemId, userInfo }) => {
  // console.log("type", type);
  // console.log("itemId", itemId);
  // console.log("userInfo", userInfo);

  const { currVote, totalVotes } = useVoteData(type, itemId, userInfo);
  // console.log("currVote", currVote);
  // console.log("totalVotes", totalVotes);
  const {
    currentVote,
    handleUpVoteClick,
    handleDownVoteClick,
    handleDismissError,
    isLoading,
    error,
  } = useVoteActions(type, itemId, currVote);
  // console.log("currentVote", currentVote);
  // console.log("handleUpVoteClick", handleUpVoteClick);
  // console.log("handleDownVoteClick", handleDownVoteClick);
  // console.log("handleDismissError", handleDismissError);
  // console.log("isLoading", isLoading);
  // console.log("errorr", error);

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
