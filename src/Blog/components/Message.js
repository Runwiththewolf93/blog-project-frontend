import { useState } from "react";
import { Card, Container, Row, Col, CloseButton } from "react-bootstrap";
import ModalElement from "./ModalElement";

function Message({ onAddPost }) {
  const [showCard, setShowCard] = useState(false);

  const handleCloseCard = () => {
    setShowCard(true);
  };

  return (
    <Container>
      <Row className="my-3">
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
            <ModalElement onAddPost={onAddPost} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Message;
