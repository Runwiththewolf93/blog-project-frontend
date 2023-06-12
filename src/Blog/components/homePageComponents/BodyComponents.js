import { Alert } from "react-bootstrap";
import Spinner from "../shared/Spinner";

// Loading.js
export const LoadingComponent = () => (
  <>
    <div className="d-flex justify-content-center mb-3">
      <Spinner />
    </div>
    <div className="vh-100"></div>
  </>
);

// Error.js
export const ErrorComponent = ({ message }) => (
  <>
    <div className="d-flex justify-content-center mb-3">
      <Alert variant="danger">{message}</Alert>
    </div>
    <div className="vh-100"></div>
  </>
);

// NoPosts.js
export const NoPosts = () => (
  <>
    <div className="d-flex justify-content-center mb-3">
      <Alert variant="danger">No blog posts match your query</Alert>
    </div>
    <div className="vh-100"></div>
  </>
);
