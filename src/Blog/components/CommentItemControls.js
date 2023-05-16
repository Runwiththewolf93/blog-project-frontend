import { Spinner, Alert, Form, Button } from "react-bootstrap";

const CommentItemControls = ({
  comment,
  loadingCommentId,
  errorCommentId,
  editCommentId,
  handleSaveComment,
  handleCancelEditComment,
  handleDismissError,
  handleEditComment,
  handleDeleteComment,
  editedComment,
  setEditedComment,
  errorMessage,
}) => {
  return loadingCommentId === comment._id ? (
    <Spinner />
  ) : errorCommentId === comment._id ? (
    <Alert
      variant="danger"
      dismissible
      onClose={handleDismissError}
      style={{ maxWidth: "400px" }}
    >
      {errorMessage}
    </Alert>
  ) : editCommentId === comment._id ? (
    <Form className="mx-3">
      <Form.Label className="mb-0">Edit a comment</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={editedComment}
        onChange={event => setEditedComment(event.target.value)}
        style={{ backgroundColor: "#D0D0D0" }}
      />
      <Button
        type="button"
        variant="secondary"
        className="my-2"
        onClick={() => handleSaveComment(comment._id, editedComment)}
      >
        Save
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="my-2 mx-2"
        onClick={handleCancelEditComment}
      >
        Cancel
      </Button>
    </Form>
  ) : (
    <>
      <Button
        type="button"
        variant="secondary"
        className="my-2"
        onClick={() => handleEditComment(comment._id)}
      >
        Edit Comment
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="my-2 ms-2"
        onClick={() => handleDeleteComment(comment._id)}
      >
        Delete Comment
      </Button>
    </>
  );
};

export default CommentItemControls;

// need to make two controllers on the backend - one for deleting all votes relating to a comment, second one for deleting all votes relating to a blog post. When deleting a blog post, we also have to delete the vote comments object as well. Sort components per page, to messy.
