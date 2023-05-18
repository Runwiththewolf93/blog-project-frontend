import { Spinner, Alert, Form, Button } from "react-bootstrap";
import { useVoteContext } from "../../store/voteContext";

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
  const { deleteCommentVoteCount } = useVoteContext();

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
        onClick={() => {
          deleteCommentVoteCount(comment._id);
          handleDeleteComment(comment._id);
        }}
      >
        Delete Comment
      </Button>
    </>
  );
};

export default CommentItemControls;
