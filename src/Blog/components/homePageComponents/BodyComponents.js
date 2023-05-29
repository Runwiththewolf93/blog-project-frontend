import { Alert } from "react-bootstrap";
import Spinner from "../shared/Spinner";

// Loading.js
export const Loading = () => (
  <div className="d-flex justify-content-center mb-3">
    <Spinner />
  </div>
);

// Error.js
export const Error = ({ message }) => (
  <div className="d-flex justify-content-center mb-3">
    <Alert variant="danger">{message}</Alert>
  </div>
);

// NoPosts.js
export const NoPosts = () => (
  <div className="d-flex justify-content-center mb-3">
    <Alert variant="danger">No blog posts match your query</Alert>
  </div>
);
