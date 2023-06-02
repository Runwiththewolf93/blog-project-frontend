import React from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Alert variant="success">
        <Alert.Heading className="text-center fs-3 fw-bold">
          Check your email!
        </Alert.Heading>
        <p className="fs-5">
          We've sent you an email with a link to reset your password. If you
          don't see it, check your spam folder.
        </p>
      </Alert>
      <Button variant="primary" onClick={handleGoHome}>
        Go to Home Page
      </Button>
    </Container>
  );
};

export default ConfirmationPage;
