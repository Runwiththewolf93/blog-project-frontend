import { Card } from "react-bootstrap";

/**
 * Renders a wrapper component for a card.
 *
 * @param {Object} props - The properties for the component.
 * @param {ReactNode} props.children - The child components to render inside the card wrapper.
 * @return {ReactElement} The rendered card wrapper component.
 */
const CardWrapper = ({ children }) => {
  return (
    <Card className="mb-1">
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default CardWrapper;
