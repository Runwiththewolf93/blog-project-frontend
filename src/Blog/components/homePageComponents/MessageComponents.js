import { Dropdown, Card, Alert, CloseButton, Button } from "react-bootstrap";
import { capitalizeName } from "../../utils/helper";
import ModalAdd from "../modals/ModalAdd";

export function Dropdowns({ onSortChange, onOrderChange }) {
  return (
    <div className="d-flex justify-content-center align-items-center mb-4 pb-1">
      <Dropdown className="me-3">
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          Sort By
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onSortChange("createdAt")}>
            Created At
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onSortChange("updatedAt")}>
            Updated At
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onSortChange("totalVotes")}>
            Total Votes
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Order
        </Dropdown.Toggle>

        <Dropdown.Menu align="end">
          <Dropdown.Item onClick={() => onOrderChange("asc")}>
            Ascending
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onOrderChange("desc")}>
            Descending
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

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
            <CloseButton onClick={handleCloseCard} />
          </div>
        </div>
        <Card.Text>
          {userInfo
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
          >
            {errorFilter}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

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
          Your posts
        </Button>
      </div>
      <ModalAdd />
    </div>
  );
}
