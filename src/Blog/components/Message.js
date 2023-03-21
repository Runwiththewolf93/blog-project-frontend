import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row, Col, CloseButton } from "react-bootstrap";

function Message() {
  const [showCard, setShowCard] = useState(false);

  const handleCloseCard = () => {
    setShowCard(true);
  };

  return (
    <Row className="m-3">
      <Col md={2} />
      <Col md={10}>
        <Card.Header className="h1 mb-3">Welcome to my Blog</Card.Header>
        <Card style={{ display: showCard ? "none" : "flex" }}>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <Card.Title>See what's new</Card.Title>
              <div className="d-flex justify-content-end">
                <CloseButton onClick={handleCloseCard} />
              </div>
            </div>
            <Card.Text>Container for showing application messages</Card.Text>
          </Card.Body>
        </Card>
        <div className="d-flex justify-content-end">
          <Button variant="light" className="ml-auto mt-3">
            Add Post
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default Message;
