import { useState, useEffect } from "react";
import { ListGroup, Form, Button, Alert } from "react-bootstrap";
import { useCommentContext } from "./store/commentContext";
import Spinner from "./Spinner";
import CommentSort from "./CommentSort";
import Vote from "./Vote";

const CommentList = ({
  blogId,
  editCommentBlogPost,
  deleteCommentBlogPost,
  userInfo,
  voteInfo,
  updateCommentVoteCount,
}) => {
  const { commentInfo } = useCommentContext();
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [sortedComments, setSortedComments] = useState([]);
  const [loadingCommentId, setLoadingCommentId] = useState(null);
  const [errorCommentId, setErrorCommentId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const commentsPerBlogPost = commentInfo.filter(
      comment => comment.blog === blogId
    );
    setSortedComments(commentsPerBlogPost);
  }, [commentInfo, blogId]);

  const handleEditComment = commentId => {
    setEditCommentId(commentId);
  };

  const handleCancelEditComment = () => {
    setEditCommentId(null);
    setEditedComment("");
  };

  const handleDismissError = () => {
    setErrorCommentId(null);
    setErrorMessage("");
  };

  const handleSaveComment = async (commentId, editedComment) => {
    setLoadingCommentId(commentId);
    try {
      await editCommentBlogPost(blogId, commentId, { editedComment });
    } catch (error) {
      setErrorCommentId(commentId);
      setErrorMessage(error.message);
    } finally {
      setLoadingCommentId(null);
    }
    setEditCommentId(null);
    setEditedComment("");
  };

  const handleDeleteComment = commentId => {
    deleteCommentBlogPost(blogId, commentId);
  };

  const handleSortComments = comments => {
    setSortedComments(comments);
  };

  return (
    <>
      {sortedComments.length === 0 ? (
        <ListGroup className="mb-1">
          <ListGroup.Item>
            No comments? Be the first to comment on this post!
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <ListGroup className="mb-1">
          <CommentSort
            sortedComments={sortedComments}
            setSortedComments={handleSortComments}
          />
          {sortedComments.map(comment => (
            <ListGroup.Item key={comment._id}>
              <div>
                <div className="d-flex align-items-center">
                  <Vote
                    itemId={comment._id}
                    userInfo={userInfo}
                    info={commentInfo}
                    voteInfo={voteInfo}
                    updateVoteCount={updateCommentVoteCount}
                  />
                  <div className="ms-3">
                    <h5>{comment.user.name || userInfo.name}</h5>
                    <p className="mb-1">{comment.comment}</p>
                  </div>
                </div>
                {loadingCommentId === comment._id ? (
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
                  <Form className="mx-3" key={blogId}>
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
                      onClick={() =>
                        handleSaveComment(comment._id, editedComment)
                      }
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
                )}
              </div>
              <small>
                createdAt: {new Date(comment.createdAt).toLocaleString()}
              </small>
              <br />
              <small>
                updatedAt: {new Date(comment.updatedAt).toLocaleString()}
              </small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default CommentList;
