import { useState, useEffect } from "react";
import { useAppContextDispatch } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import {
  FormCard,
  PasswordField,
  AlertMessage,
  ClearSubmitButtonGroup,
} from "./FormComponents";

const ResetPasswordForm = ({
  isLoadingReset,
  successMessage,
  errorReset,
  token,
}) => {
  const { resetUserPassword, resetSuccessMessage } = useAppContextDispatch();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(true);
  const [showErrorAlert, setShowErrorAlert] = useState(true);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate("/");
        resetSuccessMessage();
      }, 3000);
      // Cleanup function to clear the timeout if the component unmounts before the timeout finishes
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate, resetSuccessMessage]);

  const handleNewPasswordChange = e => setNewPassword(e.target.value);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert("Passwords should have a length of at least six characters!");
      return;
    }
    await resetUserPassword({ password: newPassword, token });
    setNewPassword("");
  };

  const handleClear = () => {
    setNewPassword("");
  };

  return (
    <FormCard>
      <Form onSubmit={handleSubmit}>
        <h3 className="mb-0">Update Your Password</h3>
        <p>Please enter your new password.</p>

        <PasswordField
          label="New Password"
          placeholder="Enter new password"
          showPassword={showNewPassword}
          value={newPassword}
          onChange={handleNewPasswordChange}
          togglePasswordVisibility={toggleNewPasswordVisibility}
        />

        {successMessage && (
          <AlertMessage
            variant="success"
            message={successMessage}
            show={showSuccessAlert}
            onClose={() => setShowSuccessAlert(false)}
          />
        )}
        {errorReset && (
          <AlertMessage
            variant="danger"
            message={errorReset}
            show={showErrorAlert}
            onClose={() => setShowErrorAlert(false)}
          />
        )}

        <ClearSubmitButtonGroup
          clearLabel="Clear"
          submitLabel="Update"
          handleClear={handleClear}
          handleSubmit={handleSubmit}
          isLoading={isLoadingReset}
        />
      </Form>
    </FormCard>
  );
};

export default ResetPasswordForm;
