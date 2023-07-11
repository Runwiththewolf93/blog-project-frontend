import { Spinner, Alert, Form, Button } from "react-bootstrap";
import { useCommentContextDispatch } from "../../store/commentContext";
import { useVoteContextDispatch } from "../../store/voteContext";
import {
  setEditCommentId,
  setEditedComment,
  setLoadingCommentId,
  setErrorCommentId,
  setErrorMessage,
} from "./CommentsReducer";

// CommentItemControls component
const CommentItemControls = ({ comment, blogId, state, dispatch }) => {
  const { editCommentBlogPost, deleteCommentBlogPost } =
    useCommentContextDispatch();
  const { deleteCommentVoteCount } = useVoteContextDispatch();

  /**
   * Handles canceling the edit of a comment.
   *
   * @return {undefined} No return value.
   */
  const handleCancelEditComment = () => {
    dispatch(setEditCommentId(null));
    dispatch(setEditedComment(""));
  };

  /**
   * Handles dismissing an error.
   *
   * @return {undefined} No return value.
   */
  const handleDismissError = () => {
    dispatch(setErrorCommentId(null));
    dispatch(setErrorMessage(""));
  };

  /**
   * Handles saving a comment by editing it.
   *
   * @param {string} commentId - The ID of the comment to be edited.
   * @param {string} editedComment - The edited content of the comment.
   * @return {void} Returns nothing.
   */
  const handleSaveComment = async (commentId, editedComment) => {
    dispatch(setLoadingCommentId(commentId));
    try {
      await editCommentBlogPost(blogId, commentId, { editedComment });
    } catch (error) {
      dispatch(setErrorCommentId(commentId));
      dispatch(setErrorMessage(error.message));
    } finally {
      dispatch(setLoadingCommentId(null));
    }
    dispatch(setEditCommentId(null));
    dispatch(setEditedComment(""));
  };

  return state.loadingCommentId === comment._id ? (
    <Spinner data-testid="spinner" />
  ) : state.errorCommentId === comment._id ? (
    <Alert
      variant="danger"
      dismissible
      onClose={handleDismissError}
      style={{ maxWidth: "400px" }}
      data-testid="alert"
    >
      {state.errorMessage}
    </Alert>
  ) : state.editCommentId === comment._id ? (
    <Form className="mx-3">
      <Form.Group controlId="editComment">
        <Form.Label className="mb-0">Edit a comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={state.editedComment}
          onChange={event => dispatch(setEditedComment(event.target.value))}
          style={{ backgroundColor: "#D0D0D0" }}
          data-testid="edit-comment-textarea"
        />
      </Form.Group>
      <Button
        type="button"
        variant="secondary"
        className="my-2"
        onClick={() => handleSaveComment(comment._id, state.editedComment)}
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
        onClick={() => dispatch(setEditCommentId(comment._id))}
      >
        Edit Comment
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="my-2 ms-2"
        onClick={() => {
          deleteCommentVoteCount(comment._id);
          deleteCommentBlogPost(blogId, comment._id);
        }}
      >
        Delete Comment
      </Button>
    </>
  );
};

export default CommentItemControls;
