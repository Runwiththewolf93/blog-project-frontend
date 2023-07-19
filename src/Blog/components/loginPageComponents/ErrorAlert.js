import { Alert } from "react-bootstrap";

/**
 * Renders an error alert component.
 *
 * @param {object} error - The error object to be displayed.
 * @param {boolean} showError - A flag indicating whether the error should be shown.
 * @param {function} setShowError - A function to toggle the visibility of the error.
 * @return {JSX.Element} The rendered error alert component.
 */
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
