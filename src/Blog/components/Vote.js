import React, { useState } from "react";
import { useVoteContext } from "./store/voteContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Alert, Spinner } from "react-bootstrap";

const Vote = ({ itemId, userInfo, info, voteInfo, updateVoteCount }) => {
  const { isLoadingVote, errorVote } = useVoteContext();
  const item = info?.find(post => post._id === itemId);

  // Find the Vote object for the logged-in user
  const currentUserVote = voteInfo?.filter(
    vote => vote.post === item._id && vote.user === userInfo._id
  );
  const currVote = currentUserVote?.reduce((acc, curr) => acc + curr.vote, 0);

  // Calculate the totalVotes per blog / comment
  const itemVotes = voteInfo?.filter(vote => vote.post === item._id);
  const totalVotes = itemVotes?.reduce((acc, curr) => acc + curr.vote, 0);
  const [currentVote, setCurrentVote] = useState(currVote);

  const handleUpVoteClick = () => {
    if (currentVote === 1) {
      updateVoteCount(itemId, 0);
      setCurrentVote(0);
    } else {
      updateVoteCount(itemId, 1);
      setCurrentVote(1);
    }
  };

  const handleDownVoteClick = () => {
    if (currentVote === -1) {
      updateVoteCount(itemId, 0);
      setCurrentVote(0);
    } else {
      updateVoteCount(itemId, -1);
      setCurrentVote(-1);
    }
  };

  return isLoadingVote ? (
    <Spinner />
  ) : errorVote ? (
    <Alert variant="danger">Error</Alert>
  ) : (
    <div className="d-flex align-items-center">
      <FontAwesomeIcon
        icon={faArrowUp}
        className={`me-2 ${currentVote === 1 ? "text-primary" : ""}`}
        size="2x"
        onClick={handleUpVoteClick}
        cursor="pointer"
      />
      <h5 className="fw-bold mt-1">{totalVotes}</h5>
      <FontAwesomeIcon
        icon={faArrowDown}
        className={`ms-2 ${currentVote === -1 ? "text-danger" : ""}`}
        size="2x"
        onClick={handleDownVoteClick}
        cursor="pointer"
      />
    </div>
  );
};

export default Vote;
