import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContextDispatch } from "../../store/appContext";
import { Form, Alert } from "react-bootstrap";
import {
  FormCard,
  AlertMessage,
  ClearSubmitButtonGroup,
} from "./FormComponents";

/**
 * Renders a form for resetting password.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - isLoadingReset (boolean): Indicates if the reset process is in progress.
 *   - successMessage (string): The success message to display.
 *   - errorReset (string): The error message to display.
 * @return {JSX.Element} The rendered form.
 */
// ForgotPasswordForm component
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

  /**
   * Clears the email address.
   *
   * @param {void}
   * @return {void}
   */
  const handleClear = () => {
    setEmailAddress("");
  };

  return (
    <FormCard>
      <Form onSubmit={handleSubmit}>
        <h3 className="mb-0">Enter Your Email</h3>
        <p>We will send you a link to reset your password.</p>

        <Form.Group controlId="formEmailAddress">
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
          <AlertMessage
            variant="success"
            message={successMessage}
            showAlert={showSuccessAlert}
            onClose={() => setShowSuccessAlert(false)}
          />
        )}
        {errorReset && (
          <AlertMessage
            variant="danger"
            message={errorReset}
            showAlert={showErrorAlert}
            onClose={() => setShowErrorAlert(false)}
          />
        )}

        <ClearSubmitButtonGroup
          clearLabel="Clear"
          submitLabel="Send"
          handleClear={handleClear}
          isLoading={isLoadingReset}
        />
      </Form>
    </FormCard>
  );
};

export default ForgotPasswordForm;
