import React from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = ({ heading, paragraph }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Alert variant="secondary rounded-3">
        <Alert.Heading className="text-center fs-3 fw-bold">
          {heading}
        </Alert.Heading>
        <p className="fs-5">{paragraph}</p>
      </Alert>
      <Button variant="secondary" onClick={handleGoHome}>
        Go to Home Page
      </Button>
    </Container>
  );
};

export default ConfirmationPage;
