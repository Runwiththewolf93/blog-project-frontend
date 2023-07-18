import { Card } from "react-bootstrap";

/**
 * Renders a user comment component.
 *
 * @param {Object} comment - The comment object.
 * @param {string} comment.blog.title - The title of the blog associated with the comment.
 * @param {string} comment.createdAt - The creation date of the comment.
 * @param {string} comment.comment - The content of the comment.
 * @return {ReactElement} The rendered user comment component.
 */
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
