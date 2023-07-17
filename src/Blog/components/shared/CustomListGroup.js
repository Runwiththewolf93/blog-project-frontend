import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

/**
 * Renders a custom list group component with a given margin bottom and text.
 *
 * @param {number} mb - The margin bottom value for the list group.
 * @param {string} text - The text to be displayed within the list group item.
 * @return {ReactNode} The custom list group component.
 */
const CustomListGroup = ({ mb, text }) => (
  <ListGroup className={`mb-${mb}`}>
    <ListGroup.Item variant="secondary" className="fs-5">
      {text} <Link to="/">now</Link>!
    </ListGroup.Item>
  </ListGroup>
);

export default CustomListGroup;
