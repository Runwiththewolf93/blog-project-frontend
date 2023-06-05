import { Card, Form, Alert, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "./UpdatePasswordForm.module.css";

// FormCard Component
const FormCard = ({ children }) => (
  <Card className="p-5 border border-dark rounded-5">{children}</Card>
);

// PasswordField Component
const PasswordField = ({
  label,
  placeholder,
  value,
  showPassword,
  togglePasswordVisibility,
  onChange,
}) => (
  <Form.Group controlId={`form${label.split(" ")[0]}Password`}>
    <Form.Label className="mb-0">{label}</Form.Label>
    <div className={styles["password-input-group"]}>
      <Form.Control
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        className={styles["password-icon"]}
        onClick={togglePasswordVisibility}
      />
    </div>
  </Form.Group>
);

// AlertMessage Component
const AlertMessage = ({ variant, message, showAlert, onClose }) => (
  <Alert
    variant={variant}
    dismissible
    show={showAlert}
    onClose={onClose}
    className="mt-3 mb-0"
  >
    {message}
  </Alert>
);

// ClearSubmitButtonGroup Component
const ClearSubmitButtonGroup = ({
  clearLabel,
  submitLabel,
  handleClear,
  isLoading,
}) => (
  <div className="d-flex justify-content-between">
    <Button
      variant="secondary"
      type="button"
      className="mt-3"
      onClick={handleClear}
      disabled={isLoading}
    >
      {clearLabel}
    </Button>
    <Button
      variant="secondary"
      type="submit"
      className="mt-3"
      disabled={isLoading}
    >
      {submitLabel}
    </Button>
  </div>
);

export { FormCard, PasswordField, AlertMessage, ClearSubmitButtonGroup };
