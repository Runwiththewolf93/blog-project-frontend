import {
  Dropdown,
  Card,
  Alert,
  CloseButton,
  Button,
  Col,
} from "react-bootstrap";
import { capitalizeName } from "../../utils/helper";
import ModalAdd from "../modals/ModalAdd";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";

/**
 * Renders a component that displays dropdown menus for sorting and ordering.
 *
 * @param {Object} onSortChange - A callback function to handle sort changes.
 * @param {Object} onOrderChange - A callback function to handle order changes.
 * @return {JSX.Element} The rendered dropdown component.
 */
export function Dropdowns({ onSortChange, onOrderChange }) {
  const isTabletOrMobileDevice = useMediaQuery({ query: "(max-width: 992px" });

  return (
    <Col
      className={
        isTabletOrMobileDevice
          ? "d-flex flex-column align-items-center mb-3 mt-2 gap-2"
          : "d-flex align-items-center mb-4 pb-3 pt-1"
      }
    >
      <Dropdown className={isTabletOrMobileDevice ? "ms-2" : "me-2"}>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          Sort By
        </Dropdown.Toggle>

        <Dropdown.Menu align={isTabletOrMobileDevice ? "end" : "start"}>
          <Dropdown.Item
            onClick={() => onSortChange && onSortChange("createdAt")}
          >
            Created At
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => onSortChange && onSortChange("updatedAt")}
          >
            Updated At
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => onSortChange && onSortChange("totalVotes")}
          >
            Total Votes
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {isTabletOrMobileDevice && <div className="flex-grow-1" />}

      <Dropdown className={isTabletOrMobileDevice ? "mb-4 pb-3" : "me-3"}>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Order
        </Dropdown.Toggle>

        <Dropdown.Menu align="end">
          <Dropdown.Item onClick={() => onOrderChange && onOrderChange("asc")}>
            Ascending
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onOrderChange && onOrderChange("desc")}>
            Descending
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
}

Dropdowns.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
};

/**
 * Renders a WelcomeCard component.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - {Object} userInfo: The user information object.
 *   - {boolean} showCard: Determines whether to show the card or not.
 *   - {function} handleCloseCard: The function to handle closing the card.
 *   - {boolean} show: Determines whether to show something.
 *   - {function} setShow: The function to set the show state.
 *   - {string} errorFilter: The error filter.
 *   - {function} resetErrorFilter: The function to reset the error filter.
 * @return {JSX.Element} The rendered WelcomeCard component.
 */
// WelcomeCard component
export function WelcomeCard({
  userInfo,
  showCard,
  handleCloseCard,
  show,
  setShow,
  errorFilter,
  resetErrorFilter,
}) {
  return (
    <Card style={{ display: showCard ? "none" : "flex" }}>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title>
            {userInfo && userInfo.name
              ? `Welcome back, ${capitalizeName(userInfo.name)}`
              : "See what's new"}
          </Card.Title>
          <div className="d-flex justify-content-end">
            <CloseButton onClick={handleCloseCard} data-testid="close-btn" />
          </div>
        </div>
        <Card.Text>
          {userInfo && userInfo._id
            ? "Check below some of the blog posts we have curated for you:"
            : "Container for showing application messages"}
        </Card.Text>
        {show && errorFilter && (
          <Alert
            variant="danger"
            onClose={() => {
              setShow(false);
              resetErrorFilter();
            }}
            dismissible
            className="w-25 mb-0"
            data-testid="alert"
          >
            {errorFilter}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

/**
 * Renders a group of buttons for refreshing posts and toggling between showing all posts and showing only the user's posts.
 *
 * @param {function} handleRefresh - The function to be called when the refresh button is clicked.
 * @param {function} toggleShowMyPosts - The function to be called when the toggle button is clicked to show only the user's posts.
 * @return {JSX.Element} - The JSX element representing the buttons group.
 */
// ButtonsGroup component
export function ButtonsGroup({ handleRefresh, toggleShowMyPosts }) {
  return (
    <div className="d-flex justify-content-between">
      <div>
        <Button className="mt-3" variant="light" onClick={handleRefresh}>
          Refresh Post
        </Button>
        <Button
          className="ms-3 mt-3"
          variant="secondary"
          onClick={toggleShowMyPosts}
        >
          Your Posts
        </Button>
      </div>
      <ModalAdd />
    </div>
  );
}
