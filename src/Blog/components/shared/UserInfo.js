import { Card } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { truncateContent } from "../../utils/helper";

/**
 * Renders user information with a title, date, and name.
 *
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the user information.
 * @param {string} props.date - The date of the user information.
 * @param {string} props.name - The name of the user information.
 * @return {JSX.Element} - The rendered user information component.
 */
const UserInfo = ({ title = "", date = "", name = "" }) => {
  const isLessThan1400px = useMediaQuery({ query: "(max-width: 1400px)" });

  return (
    <div>
      <Card.Title className="mb-1" data-testid="user-title">
        {isLessThan1400px ? truncateContent(title, 12) : title}
      </Card.Title>
      <Card.Subtitle className="text-muted mt-0 mb-1">
        {date.slice(0, 10)}
      </Card.Subtitle>
      <Card.Subtitle className="text-muted" data-testid="user-name">
        {isLessThan1400px ? truncateContent(name, 20) : name}
      </Card.Subtitle>
    </div>
  );
};

export default UserInfo;
