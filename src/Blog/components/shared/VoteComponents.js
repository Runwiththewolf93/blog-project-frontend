import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Vote components
/**
 * VoteButton is a functional component that renders a clickable Font Awesome icon.
 * The button's appearance and behavior can be configured by passing various props.
 *
 * @component
 * @param {Object} props - The properties that define the behavior and appearance of the VoteButton.
 * @param {Object} props.icon - The SVG icon from Font Awesome that the VoteButton will display
 * @param {string} props.className - The CSS class to apply to the VoteButton. Helps in styling the button.
 * @param {Function} props.onClick - The handler function that gets called when the VoteButton is clicked.
 * @param {boolean} props.disabled - If true, the VoteButton will be disabled and the cursor will be set to "not-allowed". Otherwise, the cursor is set to "pointer".
 * @param {string} props.testId - The testID to be applied to the VoteButton. Useful for targeting the component during testing with Jest.
 *
 * @example
 * <VoteButton icon={faThumbsUp} className="upvote" onClick={handleUpvote} disabled={false} testId="upvote-button" />
 */
const VoteButton = ({ icon, className, onClick, disabled, testId }) => (
  <FontAwesomeIcon
    icon={icon}
    className={`${className} ${disabled ? "text-muted" : ""}`}
    size="2x"
    onClick={onClick}
    cursor="pointer"
    style={disabled ? { cursor: "not-allowed" } : {}}
    data-testid={testId}
  />
);

/**
 * Renders the vote count component.
 *
 * @param {Object} props - The props object containing the totalVotes property.
 * @return {JSX.Element} - The rendered vote count component.
 */
const VoteCount = ({ totalVotes }) => (
  <h5 className="fw-bold mt-1">{totalVotes}</h5>
);

export { VoteButton, VoteCount };
