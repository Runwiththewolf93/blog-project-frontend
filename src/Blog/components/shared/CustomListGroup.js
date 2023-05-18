import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const CustomListGroup = ({ mb, text }) => (
  <ListGroup className={`mb-${mb}`}>
    <ListGroup.Item variant="secondary" className="fs-5">
      {text} <Link to="/">now</Link>!
    </ListGroup.Item>
  </ListGroup>
);

export default CustomListGroup;
