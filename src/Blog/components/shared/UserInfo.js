import { Card } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { truncateContent } from "../../utils/helper";

const UserInfo = ({ title, date, name }) => {
  const isLessThan1400px = useMediaQuery({ query: "(max-width: 1400px)" });

  return (
    <div>
      <Card.Title className="mb-1">
        {isLessThan1400px ? truncateContent(title, 12) : title}
      </Card.Title>
      <Card.Subtitle className="text-muted mt-0 mb-1">
        {date.slice(0, 10)}
      </Card.Subtitle>
      <Card.Subtitle className="text-muted">
        {isLessThan1400px ? truncateContent(name, 20) : name}
      </Card.Subtitle>
    </div>
  );
};

export default UserInfo;
