import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Vote components
const VoteButton = ({ icon, className, onClick, disabled }) => (
  <FontAwesomeIcon
    icon={icon}
    className={`${className} ${disabled ? "text-muted" : ""}`}
    size="2x"
    onClick={onClick}
    cursor="pointer"
    style={disabled ? { cursor: "not-allowed" } : {}}
  />
);

const VoteCount = ({ totalVotes }) => (
  <h5 className="fw-bold mt-1">{totalVotes}</h5>
);

export { VoteButton, VoteCount };
