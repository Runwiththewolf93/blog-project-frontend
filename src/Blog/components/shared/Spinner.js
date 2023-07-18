import Spinner from "react-bootstrap/Spinner";

/**
 * Renders a loader component.
 *
 * @return {JSX.Element} The loader component.
 */
function Loader() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loader;
