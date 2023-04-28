import { useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import { useCommentContext } from "./store/commentContext";

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState("");
  const { addCommentBlogPost } = useCommentContext();

  const handleSubmit = event => {
    event.preventDefault();

    addCommentBlogPost(blogId, { comment });

    setComment("");
  };

  return (
    <Form onSubmit={handleSubmit} className="mx-3" key={blogId}>
      <Form.Label className="mb-0">Leave a comment</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={comment}
        onChange={event => setComment(event.target.value)}
        style={{ backgroundColor: "#D0D0D0" }}
      />
      <Button type="submit" variant="secondary" className="my-2">
        Submit
      </Button>
    </Form>
  );
};

export default CommentForm;
