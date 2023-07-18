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

/**
 * Renders the UpdatePasswordForm component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isLoadingReset - Indicates whether the reset operation is in progress.
 * @param {string} props.successMessage - The success message to display.
 * @param {string} props.errorReset - The error message to display.
 * @param {Object} props.userInfo - The user information.
 * @return {JSX.Element} The rendered UpdatePasswordForm component.
 */
const UpdatePasswordForm = ({
  isLoadingReset,
  successMessage,
  errorReset,
  userInfo,
}) => {
  const { updateUserPassword, resetSuccessMessage, resetErrorMessage } =
    useAppContextDispatch();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
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

  useEffect(() => {
    if (userInfo) {
      resetErrorMessage();
    }
    // eslint-disable-next-line
  }, [JSON.stringify(userInfo)]);

  const handleCurrentPasswordChange = e => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = e => setNewPassword(e.target.value);

  /**
   * Toggles the visibility of the current password.
   *
   * @return {void} No return value.
   */
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  /**
   * Toggles the visibility of the new password.
   *
   * @return {void} No return value.
   */
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (currentPassword.length < 6 || newPassword.length < 6) {
      alert("Passwords should have a length of at least six characters!");
      return;
    }
    await updateUserPassword({ currentPassword, newPassword });
    setCurrentPassword("");
    setNewPassword("");
  };

  /**
   * Clear the current password and new password.
   *
   * @return {void}
   */
  const handleClear = () => {
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <FormCard>
      <Form onSubmit={handleSubmit}>
        <h3 className="mb-0">Update Your Password</h3>
        <p>Please enter your current password and your new password.</p>

        <PasswordField
          label="Current Password"
          placeholder="Enter current password"
          value={currentPassword}
          showPassword={showCurrentPassword}
          togglePasswordVisibility={toggleCurrentPasswordVisibility}
          onChange={handleCurrentPasswordChange}
        />
        <div className="mb-3" />
        <PasswordField
          label="New Password"
          placeholder="Enter new password"
          value={newPassword}
          showPassword={showNewPassword}
          togglePasswordVisibility={toggleNewPasswordVisibility}
          onChange={handleNewPasswordChange}
        />

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
          submitLabel="Update"
          handleClear={handleClear}
          handleSubmit={handleSubmit}
          isLoading={isLoadingReset}
        />
      </Form>
    </FormCard>
  );
};

export default UpdatePasswordForm;
