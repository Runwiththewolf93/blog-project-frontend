import { Card } from "react-bootstrap";

const UserComment = ({ comment }) => (
  <Card className="mb-3">
    <Card.Body>
      <Card.Title>{comment.blog.title}</Card.Title>
      <Card.Subtitle className="mb-3 text-muted">
        {new Date(comment.createdAt).toLocaleString()}
      </Card.Subtitle>
      <Card.Text>{comment.comment}</Card.Text>
    </Card.Body>
  </Card>
);

export default UserComment;
