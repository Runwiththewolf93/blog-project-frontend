import { useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  CloseButton,
  Button,
} from "react-bootstrap";
import ModalAdd from "./modals/ModalAdd";
import { capitalizeName } from "../utils/helper";

function Message({ userInfo, getAllBlogPosts, toggleShowMyPosts }) {
  const [showCard, setShowCard] = useState(false);

  const handleCloseCard = () => {
    setShowCard(true);
  };

  const handleRefresh = () => {
    getAllBlogPosts();
  };

  return (
    <Container className="my-3">
      <Row>
        <Col md={2} />
        <Col md={10}>
          <Card.Header className="h1 mb-3">Welcome to my Blog</Card.Header>
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
            </Card.Body>
          </Card>
          {userInfo && (
            <div className="d-flex justify-content-between">
              <div>
                <Button
                  className="mt-3"
                  variant="light"
                  onClick={() => {
                    handleRefresh();
                    // temporary solution
                    window.location.reload();
                  }}
                >
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
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Message;
