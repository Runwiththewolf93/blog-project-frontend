import { Card } from "react-bootstrap";

const CardWrapper = ({ children }) => {
  return (
    <Card className="mb-1">
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default CardWrapper;
