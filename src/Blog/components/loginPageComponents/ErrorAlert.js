import { Alert } from "react-bootstrap";

export const ErrorAlert = ({ error, showError, setShowError }) => (
  <>
    {error && (
      <Alert
        variant="danger"
        className="text-center fs-5 mb-0"
        dismissible
        show={showError}
        onClose={() => setShowError(false)}
      >
        {error}
      </Alert>
    )}
  </>
);

export default ErrorAlert;
