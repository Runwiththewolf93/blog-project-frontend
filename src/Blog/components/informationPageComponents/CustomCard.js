import { Card } from "react-bootstrap";

/**
 * Renders a custom card component with a title and children.
 *
 * @param {string} title - The title of the card.
 * @param {ReactNode} children - The content of the card.
 * @return {ReactNode} The custom card component.
 */
// CustomCard component
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
