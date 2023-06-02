import { useState, useEffect } from "react";
import { useAppContextDispatch } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "./UpdatePasswordForm.module.css";

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

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

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

  const handleClear = () => {
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <Card className="p-5 border border-dark rounded-5">
      <Form onSubmit={handleSubmit}>
        <h3 className="mb-0">Update Your Password</h3>
        <p>Please enter your current password and your new password.</p>

        <Form.Group controlId="formCurrentPassword" className="mb-3">
          <Form.Label className="mb-0">Current Password</Form.Label>
          <div className={styles["password-input-group"]}>
            <Form.Control
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter current password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
            <FontAwesomeIcon
              icon={showCurrentPassword ? faEyeSlash : faEye}
              className={styles["password-icon"]}
              onClick={toggleCurrentPasswordVisibility}
            />
          </div>
        </Form.Group>

        <Form.Group controlId="formNewPassword">
          <Form.Label className="mb-0">New Password</Form.Label>
          <div className={styles["password-input-group"]}>
            <Form.Control
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <FontAwesomeIcon
              icon={showNewPassword ? faEyeSlash : faEye}
              className={styles["password-icon"]}
              onClick={toggleNewPasswordVisibility}
            />
          </div>
        </Form.Group>

        {successMessage && (
          <Alert
            variant="success"
            dismissible
            show={showSuccessAlert}
            onClose={() => setShowSuccessAlert(false)}
            className="mt-3 mb-0"
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
            className="mt-3 mb-0"
          >
            {errorReset}
          </Alert>
        )}

        <div className="d-flex justify-content-between">
          <Button
            variant="secondary"
            type="button"
            className="mt-3"
            onClick={handleClear}
            disabled={isLoadingReset}
          >
            Clear
          </Button>
          <Button
            variant="secondary"
            type="submit"
            className="mt-3"
            disabled={isLoadingReset}
          >
            Update Password
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default UpdatePasswordForm;
