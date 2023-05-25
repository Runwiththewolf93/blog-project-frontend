import { Card } from "react-bootstrap";

const CustomCard = ({ title, children }) => {
  return (
    <Card className="rounded-4">
      <Card.Body>
        <Card.Title className="text-center">{title}</Card.Title>
        {children}
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
