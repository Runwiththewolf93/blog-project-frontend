import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";
import useVoteHandler from "./useVoteHandler";
import { VoteButton, VoteCount } from "./VoteComponents";

const Vote = ({ type, itemId, userInfo }) => {
  const {
    currentVote,
    totalVotes,
    handleUpVoteClick,
    handleDownVoteClick,
    handleDismissError,
    isLoading,
    error,
  } = useVoteHandler(type, itemId, userInfo);

  return isLoading ? (
    <Spinner />
  ) : error ? (
    <FontAwesomeIcon
      icon={faExclamationCircle}
      className="text-danger"
      size="2x"
      onClick={handleDismissError}
      cursor="pointer"
      title={error}
    />
  ) : (
    <div className="d-flex align-items-center">
      <VoteButton
        icon={faArrowUp}
        className={`me-2 ${currentVote === 1 ? "text-primary" : ""}`}
        onClick={handleUpVoteClick}
      />
      <VoteCount totalVotes={totalVotes} />
      <VoteButton
        icon={faArrowDown}
        className={`ms-2 ${currentVote === -1 ? "text-danger" : ""}`}
        onClick={handleDownVoteClick}
      />
    </div>
  );
};

export default Vote;
