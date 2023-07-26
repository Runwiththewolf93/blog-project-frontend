import { Spinner, Alert, Button } from "react-bootstrap";

/**
 * Renders the content for the modal footer based on the given props.
 *
 * @param {boolean} isLoading - Indicates whether the content is currently loading.
 * @param {string} error - The error message to display, if any.
 * @param {function} onClose - The function to call when the modal is closed.
 * @param {string} buttonText - The text to display on the button.
 * @return {ReactNode} The rendered content for the modal footer.
 */
// ModalFooterContent component
const ModalFooterContent = ({ isLoading, error, onClose, buttonText }) => {
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" size="sm" data-testid="loading-spinner" />
      </div>
    );
  } else if (error) {
    return (
      <div className="d-flex justify-content-center">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-between">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="secondary">
          {buttonText}
        </Button>
      </div>
    );
  }
};

export default ModalFooterContent;
