import { useState } from "react";
import { ListGroup, Form, Button } from "react-bootstrap";
import { useCommentContext } from "./store/commentContext";
import Spinner from "./Spinner";
import CommentSort from "./CommentSort";

const CommentList = ({
  blogId,
  editCommentBlogPost,
  deleteCommentBlogPost,
  userInfo,
}) => {
  const { isLoadingComment, commentInfo, errorComment } = useCommentContext();
  const commentsPerBlogPost = commentInfo.filter(
    comment => comment.blog === blogId
  );
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [sortedComments, setSortedComments] = useState(commentsPerBlogPost);

  const handleEditComment = commentId => {
    setEditCommentId(commentId);
  };

  const handleCancelEditComment = () => {
    setEditCommentId(null);
    setEditedComment("");
  };

  const handleSaveComment = (commentId, editedComment) => {
    editCommentBlogPost(blogId, commentId, { editedComment });
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
      {isLoadingComment && <Spinner />}
      {errorComment && (
        <ListGroup className="mb-1">
          <ListGroup.Item variant="danger">{errorComment}</ListGroup.Item>
        </ListGroup>
      )}
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
                <h5>{comment.user.name || userInfo.name}</h5>
                {editCommentId === comment._id ? (
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
                    <p className="mb-1">{comment.comment}</p>
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
