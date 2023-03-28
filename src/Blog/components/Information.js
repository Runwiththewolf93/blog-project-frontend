import { Card, ListGroup } from "react-bootstrap";

const Information = ({ userProfile }) => {
  return (
    <Card className="mt-4">
      <Card.Header>Biography</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates,
          porro quisquam nisi alias pariatur esse sequi accusamus libero ratione
          perferendis ipsam dolorem in, minus itaque quibusdam recusandae ex
          cumque exercitationem.
        </ListGroup.Item>
        <Card.Header>Location</Card.Header>
        <ListGroup.Item>
          {userProfile.location?.city} {userProfile.location?.country}
        </ListGroup.Item>
        <Card.Header>Other interests</Card.Header>
        <ListGroup.Item>Lorem, ipsum, dolor, sit, amet</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Information;
