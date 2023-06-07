import { Spinner, Alert, Button } from "react-bootstrap";

const ModalFooterContent = ({ isLoading, error, onClose, buttonText }) => {
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" size="sm" />
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
