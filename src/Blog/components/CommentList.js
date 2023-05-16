import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useCommentContext } from "./store/commentContext";
import CommentSort from "./CommentSort";
import CommentItem from "./CommentItem";

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
            <CommentItem
              key={comment._id}
              {...{
                comment,
                loadingCommentId,
                errorCommentId,
                editCommentId,
                handleSaveComment,
                handleCancelEditComment,
                handleDismissError,
                handleEditComment,
                handleDeleteComment,
                userInfo,
                commentInfo,
                voteInfo,
                updateCommentVoteCount,
                editedComment,
                setEditedComment,
                errorMessage,
              }}
            />
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default CommentList;
