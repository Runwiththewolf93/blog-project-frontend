import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContextDispatch } from "../../store/appContext";
import { Card, Form, Button, Alert } from "react-bootstrap";

const ForgotPasswordForm = ({ isLoadingReset, successMessage, errorReset }) => {
  const { forgotUserPassword, resetSuccessMessage } = useAppContextDispatch();
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(true);
  const [showErrorAlert, setShowErrorAlert] = useState(true);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate("/confirmation");
        resetSuccessMessage();
      }, 3000);
      // Cleanup function to clear the timeout if the component unmounts before the timeout finishes
      return () => clearTimeout(timer);
    }
  }, [navigate, successMessage, resetSuccessMessage]);

  const validateEmail = value => {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };

  const handleEmailChange = e => {
    const inputValue = e.target.value;
    setEmailAddress(inputValue);
    setIsValidEmail(validateEmail(inputValue));
    setShowEmailError(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isValidEmail) {
      setShowEmailError(true);
      return;
    }
    await forgotUserPassword(emailAddress);
    setEmailAddress("");
  };

  const handleClear = () => {
    setEmailAddress("");
  };

  return (
    <Card className="p-5 border border-dark rounded-5">
      <Form onSubmit={handleSubmit}>
        <h3 className="mb-0">Enter Your Email</h3>
        <p>We will send you a link to reset your password.</p>

        <Form.Group controlId="formCurrentPassword" className="mb-3">
          <Form.Label className="mb-0">Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            value={emailAddress}
            onChange={handleEmailChange}
          />
        </Form.Group>

        {!isValidEmail && showEmailError && (
          <Alert variant="danger" className="my-3">
            Please enter a valid email address.
          </Alert>
        )}
        {successMessage && (
          <Alert
            variant="success"
            dismissible
            show={showSuccessAlert}
            onClose={() => setShowSuccessAlert(false)}
            className="my-3"
          >
            {successMessage}
          </Alert>
        )}
        {errorReset && (
          <Alert
            variant="danger"
            dismissible
            show={showErrorAlert}
            onClose={() => setShowErrorAlert(false)}
            className="my-3"
          >
            {errorReset}
          </Alert>
        )}

        <div className="d-flex justify-content-between">
          <Button
            variant="secondary"
            type="button"
            onClick={handleClear}
            disabled={isLoadingReset}
          >
            Clear
          </Button>
          <Button variant="secondary" type="submit" disabled={isLoadingReset}>
            Send
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default ForgotPasswordForm;
