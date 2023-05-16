import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Alert, Spinner } from "react-bootstrap";

const Vote = ({ itemId, userInfo, info, voteInfo, updateVoteCount }) => {
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
      setError(error);
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
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
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
