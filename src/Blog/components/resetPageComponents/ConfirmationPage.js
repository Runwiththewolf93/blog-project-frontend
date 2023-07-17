import React from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * Renders a confirmation page with a heading and paragraph.
 *
 * @param {string} heading - The heading for the confirmation page.
 * @param {string} paragraph - The paragraph content for the confirmation page.
 * @return {JSX.Element} The rendered confirmation page.
 */
// Confirmation Page component
const ConfirmationPage = ({ heading, paragraph }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      role="alert"
    >
      <Alert variant="secondary rounded-3">
        <Alert.Heading
          className="text-center fs-3 fw-bold"
          data-testid="heading"
        >
          {heading}
        </Alert.Heading>
        <p className="fs-5" data-testid="paragraph">
          {paragraph}
        </p>
      </Alert>
      <Button variant="secondary" onClick={handleGoHome}>
        Go to Home Page
      </Button>
    </Container>
  );
};

export default ConfirmationPage;
