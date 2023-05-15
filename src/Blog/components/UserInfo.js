import { Card } from "react-bootstrap";

const UserInfo = ({ title, date, name }) => (
  <div>
    <Card.Title className="mb-1">{title}</Card.Title>
    <Card.Subtitle className="text-muted mt-0 mb-1">
      {date.slice(0, 10)}
    </Card.Subtitle>
    <Card.Subtitle className="text-muted">{name}</Card.Subtitle>
  </div>
);

export default UserInfo;
