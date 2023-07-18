import { Card, Form, Alert, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "./UpdatePasswordForm.module.css";

/**
 * A function that renders a form card component.
 *
 * @param {Object} children - The child components to be rendered inside the form card.
 * @return {JSX.Element} - The form card component.
 */
// FormCard Component
const FormCard = ({ children }) => (
  <Card className="p-5 border border-dark rounded-5">{children}</Card>
);

/**
 * Renders a password field component.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.label - The label for the password field.
 * @param {string} props.placeholder - The placeholder for the password field.
 * @param {string} props.value - The value of the password field.
 * @param {boolean} props.showPassword - Flag indicating whether the password is visible.
 * @param {function} props.togglePasswordVisibility - Function to toggle the visibility of the password.
 * @param {function} props.onChange - Function to handle the onChange event of the password field.
 * @returns {ReactElement} The rendered password field component.
 */
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

/**
 * Render an alert message component.
 *
 * @param {string} variant - The variant of the alert message.
 * @param {string} message - The message to be displayed in the alert.
 * @param {boolean} showAlert - Indicates whether the alert should be shown.
 * @param {function} onClose - The function to be called when the alert is closed.
 * @return {ReactElement} The rendered Alert component.
 */
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

/**
 * Generates a function comment for the given function body.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - {string} clearLabel - The label for the clear button.
 *   - {string} submitLabel - The label for the submit button.
 *   - {function} handleClear - The callback function for the clear button click event.
 *   - {boolean} isLoading - Indicates whether the function is currently loading.
 * @return {JSX.Element} The JSX element representing the ClearSubmitButtonGroup component.
 */
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
