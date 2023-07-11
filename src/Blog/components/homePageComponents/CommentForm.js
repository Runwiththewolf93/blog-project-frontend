import { useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import { useCommentContextDispatch } from "../../store/commentContext";

/**
 * Renders a comment form component.
 *
 * @param {object} props - The properties object.
 * @param {string} props.blogId - The ID of the blog.
 * @return {JSX.Element} The rendered comment form component.
 */
// CommentForm component
const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState("");
  const { addCommentBlogPost } = useCommentContextDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    if (comment.trim() !== "") {
      addCommentBlogPost(blogId, { comment });
    }

    setComment("");
  };

  return (
    <ListGroup>
      <ListGroup.Item className="mb-1">
        <Form onSubmit={handleSubmit} className="mx-3" key={blogId}>
          <Form.Label htmlFor="commentField" className="mb-0">
            Leave a comment
          </Form.Label>
          <Form.Control
            as="textarea"
            id="commentField"
            rows={3}
            value={comment}
            onChange={event => setComment(event.target.value)}
            style={{ backgroundColor: "#D0D0D0" }}
          />
          <Button type="submit" variant="secondary" className="my-2">
            Submit
          </Button>
        </Form>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default CommentForm;
