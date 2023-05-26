import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VoteButton = ({ icon, className, onClick }) => (
  <FontAwesomeIcon
    icon={icon}
    className={className}
    size="2x"
    onClick={onClick}
    cursor="pointer"
  />
);

const VoteCount = ({ totalVotes }) => (
  <h5 className="fw-bold mt-1">{totalVotes}</h5>
);

export { VoteButton, VoteCount };
